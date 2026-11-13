export type RunResult = { output: string[]; error?: string };

type PyFunc = {
  tag: "func";
  params: string[];
  body: Stmt[];
  env: Env;
  line: number;
};

type Value = number | string | boolean | null | Value[] | PyFunc;

type Expr =
  | { t: "num"; v: number }
  | { t: "str"; v: string }
  | { t: "bool"; v: boolean }
  | { t: "none" }
  | { t: "name"; v: string }
  | { t: "list"; items: Expr[] }
  | { t: "index"; obj: Expr; index: Expr }
  | { t: "binop"; op: string; l: Expr; r: Expr }
  | { t: "unary"; op: string; x: Expr }
  | { t: "call"; fn: Expr; args: Expr[] };

type Stmt =
  | { t: "assign"; line: number; name: string; expr: Expr }
  | { t: "expr"; line: number; expr: Expr }
  | { t: "if"; line: number; arms: { cond: Expr | null; body: Stmt[] }[] }
  | { t: "for"; line: number; name: string; iter: Expr; body: Stmt[] }
  | { t: "while"; line: number; cond: Expr; body: Stmt[] }
  | { t: "def"; line: number; name: string; params: string[]; body: Stmt[] }
  | { t: "return"; line: number; expr: Expr | null }
  | { t: "pass"; line: number };

type Budget = { n: number; depth: number };

type Env = {
  vars: Map<string, Value>;
  parent: Env | null;
  budget: Budget;
  output: string[];
};

type ReturnSignal = { __ret: true; value: Value };

const MAX_STEPS = 8000;

class PyError extends Error {}

export function runPython(source: string): RunResult {
  const output: string[] = [];
  try {
    const lines = logicalLines(source);
    const stmts = parseBlock(lines, 0, 0).stmts;
    const env = makeGlobal(output);
    execList(stmts, env);
    return { output };
  } catch (error) {
    if (isReturn(error)) {
      return { output, error: "return only works inside a function." };
    }
    const message = error instanceof Error ? error.message : "Something went wrong.";
    return { output, error: message };
  }
}

function makeGlobal(output: string[]): Env {
  return { vars: new Map(), parent: null, budget: { n: 0, depth: 0 }, output };
}

function nest(parent: Env): Env {
  return { vars: new Map(), parent, budget: parent.budget, output: parent.output };
}

function logicalLines(source: string): { indent: number; text: string; line: number }[] {
  const raw = source.replace(/\t/g, "    ").split(/\r?\n/);
  const result: { indent: number; text: string; line: number }[] = [];
  let acc = "";
  let accIndent = 0;
  let accLine = 1;
  let depth = 0;
  let open = false;

  const push = () => {
    const text = acc.trim();
    if (text) result.push({ indent: accIndent, text, line: accLine });
    acc = "";
    open = false;
    depth = 0;
  };

  for (let li = 0; li < raw.length; li++) {
    const lineNo = li + 1;
    const rawLine = raw[li] ?? "";
    if (!open) {
      if (rawLine.trim() === "") continue;
      accIndent = rawLine.match(/^ */)?.[0].length ?? 0;
      accLine = lineNo;
      acc = "";
      depth = 0;
    }
    const slice = open ? rawLine.trim() : rawLine.slice(accIndent);
    const stripped = stripComment(slice);
    depth += stripped.depthDelta;
    acc = acc ? `${acc} ${stripped.code.trim()}` : stripped.code.trim();
    open = true;
    if (depth <= 0) {
      if (depth < 0) throw new PyError(`Line ${lineNo}: too many closing brackets.`);
      push();
    }
  }
  if (open) throw new PyError("A parenthesis or bracket was never closed.");
  return result;
}

function stripComment(line: string): { code: string; depthDelta: number } {
  let code = "";
  let depthDelta = 0;
  let str: string | null = null;
  for (let i = 0; i < line.length; i++) {
    const c = line[i] ?? "";
    if (str) {
      code += c;
      if (c === "\\") {
        code += line[++i] ?? "";
        continue;
      }
      if (c === str) str = null;
      continue;
    }
    if (c === '"' || c === "'") {
      str = c;
      code += c;
      continue;
    }
    if (c === "#") break;
    if (c === "(" || c === "[") depthDelta++;
    else if (c === ")" || c === "]") depthDelta--;
    code += c;
  }
  if (str) throw new PyError("A string was never closed.");
  return { code, depthDelta };
}

function parseBlock(
  lines: { indent: number; text: string; line: number }[],
  start: number,
  indent: number,
): { stmts: Stmt[]; next: number } {
  const stmts: Stmt[] = [];
  let i = start;
  while (i < lines.length) {
    const line = lines[i];
    if (!line) break;
    if (line.indent < indent) break;
    if (line.indent > indent) {
      throw new PyError(`Line ${line.line}: that line is indented too far.`);
    }
    const text = line.text;
    if (text.endsWith(":")) {
      const head = text.slice(0, -1).trim();
      const word = head.split(/\s+/)[0] ?? "";
      if (word === "elif" || word === "else") {
        if (stmts.length === 0 || stmts[stmts.length - 1]?.t !== "if") {
          throw new PyError(`Line ${line.line}: ${word} needs an if above it.`);
        }
        const iff = stmts[stmts.length - 1] as Extract<Stmt, { t: "if" }>;
        const cond = word === "else" ? null : parseExpr(head.slice(word.length).trim(), line.line);
        if (word === "else" && head !== "else") {
          throw new PyError(`Line ${line.line}: else should stand alone before the colon.`);
        }
        const bodyIndent = expectBodyIndent(lines, i + 1, indent, line.line);
        const body = parseBlock(lines, i + 1, bodyIndent);
        iff.arms.push({ cond, body: body.stmts });
        i = body.next;
        continue;
      }
      const bodyIndent = expectBodyIndent(lines, i + 1, indent, line.line);
      const body = parseBlock(lines, i + 1, bodyIndent);
      stmts.push(parseCompound(head, body.stmts, line.line));
      i = body.next;
      continue;
    }
    stmts.push(parseSimple(text, line.line));
    i++;
  }
  return { stmts, next: i };
}

function expectBodyIndent(
  lines: { indent: number; text: string; line: number }[],
  index: number,
  parent: number,
  lineNo: number,
) {
  const next = lines[index];
  if (!next || next.indent <= parent) {
    throw new PyError(`Line ${lineNo}: add an indented line under the colon.`);
  }
  return next.indent;
}

function parseCompound(head: string, body: Stmt[], line: number): Stmt {
  const word = head.split(/\s+/)[0] ?? "";
  if (word === "if") return { t: "if", line, arms: [{ cond: parseExpr(head.slice(2).trim(), line), body }] };
  if (word === "while") return { t: "while", line, cond: parseExpr(head.slice(5).trim(), line), body };
  if (word === "for") {
    const match = /^for\s+([A-Za-z_]\w*)\s+in\s+([\s\S]+)$/.exec(head);
    if (!match) throw new PyError(`Line ${line}: write for name in range(...):`);
    return { t: "for", line, name: match[1] ?? "i", iter: parseExpr(match[2] ?? "", line), body };
  }
  if (word === "def") {
    const match = /^def\s+([A-Za-z_]\w*)\s*\(([^)]*)\)\s*$/.exec(head);
    if (!match) throw new PyError(`Line ${line}: write def name(arguments):`);
    const params = (match[2] ?? "")
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean);
    for (const param of params) {
      if (!/^[A-Za-z_]\w*$/.test(param)) throw new PyError(`Line ${line}: ‘${param}’ is not a name.`);
    }
    return { t: "def", line, name: match[1] ?? "f", params, body };
  }
  throw new PyError(`Line ${line}: I don't know the line that ends with a colon.`);
}

function parseSimple(text: string, line: number): Stmt {
  if (text === "pass") return { t: "pass", line };
  if (text === "return" || text.startsWith("return ")) {
    const rest = text === "return" ? "" : text.slice(7).trim();
    return { t: "return", line, expr: rest ? parseExpr(rest, line) : null };
  }
  const eq = findAssign(text);
  if (eq >= 0) {
    const name = text.slice(0, eq).trim();
    if (!/^[A-Za-z_]\w*$/.test(name)) {
      throw new PyError(`Line ${line}: the left side of = should be one name.`);
    }
    return { t: "assign", line, name, expr: parseExpr(text.slice(eq + 1).trim(), line) };
  }
  return { t: "expr", line, expr: parseExpr(text, line) };
}

function findAssign(text: string) {
  let str: string | null = null;
  for (let i = 0; i < text.length; i++) {
    const c = text[i] ?? "";
    if (str) {
      if (c === "\\") {
        i++;
        continue;
      }
      if (c === str) str = null;
      continue;
    }
    if (c === '"' || c === "'") {
      str = c;
      continue;
    }
    if (c === "=") {
      const prev = text[i - 1] ?? "";
      const next = text[i + 1] ?? "";
      if (prev !== "=" && prev !== "!" && prev !== "<" && prev !== ">" && next !== "=") return i;
    }
  }
  return -1;
}

type Tok =
  | { k: "num"; v: number }
  | { k: "str"; v: string }
  | { k: "name"; v: string }
  | { k: "op"; v: string }
  | { k: "end" };

function tokenize(input: string, line: number): Tok[] {
  const toks: Tok[] = [];
  let i = 0;
  while (i < input.length) {
    const c = input[i] ?? "";
    if (c === " " || c === "\n" || c === "\t") {
      i++;
      continue;
    }
    if (c === '"' || c === "'") {
      const q = c;
      i++;
      let val = "";
      while (i < input.length && input[i] !== q) {
        if (input[i] === "\\") {
          const n = input[++i];
          val += n === "n" ? "\n" : n === "t" ? "\t" : (n ?? "");
          i++;
          continue;
        }
        val += input[i++] ?? "";
      }
      if (input[i] !== q) throw new PyError(`Line ${line}: a string was never closed.`);
      i++;
      toks.push({ k: "str", v: val });
      continue;
    }
    if (/[0-9]/.test(c) || (c === "." && /[0-9]/.test(input[i + 1] ?? ""))) {
      let j = i + 1;
      while (/[0-9.]/.test(input[j] ?? "")) j++;
      const raw = input.slice(i, j);
      if (raw.split(".").length > 2) throw new PyError(`Line ${line}: ‘${raw}’ is not a number.`);
      toks.push({ k: "num", v: Number(raw) });
      i = j;
      continue;
    }
    if (/[A-Za-z_]/.test(c)) {
      let j = i + 1;
      while (/[A-Za-z0-9_]/.test(input[j] ?? "")) j++;
      toks.push({ k: "name", v: input.slice(i, j) });
      i = j;
      continue;
    }
    const two = input.slice(i, i + 2);
    if (["==", "!=", "<=", ">=", "//"].includes(two)) {
      toks.push({ k: "op", v: two });
      i += 2;
      continue;
    }
    if ("+-*/%<>()[],".includes(c)) {
      toks.push({ k: "op", v: c });
      i++;
      continue;
    }
    throw new PyError(`Line ${line}: I don't know the symbol ‘${c}’.`);
  }
  toks.push({ k: "end" });
  return toks;
}

function parseExpr(input: string, line: number): Expr {
  const toks = tokenize(input, line);
  let p = 0;
  const peek = () => toks[p] ?? { k: "end" as const };
  const eat = () => toks[p++] ?? { k: "end" as const };

  function isOp(v: string) {
    const t = peek();
    return t.k === "op" && t.v === v;
  }
  function isName(v: string) {
    const t = peek();
    return t.k === "name" && t.v === v;
  }

  function parseOr(): Expr {
    let left = parseAnd();
    while (isName("or")) {
      eat();
      left = { t: "binop", op: "or", l: left, r: parseAnd() };
    }
    return left;
  }
  function parseAnd(): Expr {
    let left = parseNot();
    while (isName("and")) {
      eat();
      left = { t: "binop", op: "and", l: left, r: parseNot() };
    }
    return left;
  }
  function parseNot(): Expr {
    if (isName("not")) {
      eat();
      return { t: "unary", op: "not", x: parseNot() };
    }
    return parseCmp();
  }
  function parseCmp(): Expr {
    let left = parseAdd();
    while (
      isOp("==") ||
      isOp("!=") ||
      isOp("<") ||
      isOp(">") ||
      isOp("<=") ||
      isOp(">=")
    ) {
      const op = (eat() as { v: string }).v;
      left = { t: "binop", op, l: left, r: parseAdd() };
    }
    return left;
  }
  function parseAdd(): Expr {
    let left = parseMul();
    while (isOp("+") || isOp("-")) {
      const op = (eat() as { v: string }).v;
      left = { t: "binop", op, l: left, r: parseMul() };
    }
    return left;
  }
  function parseMul(): Expr {
    let left = parseUnary();
    while (isOp("*") || isOp("/") || isOp("//") || isOp("%")) {
      const op = (eat() as { v: string }).v;
      left = { t: "binop", op, l: left, r: parseUnary() };
    }
    return left;
  }
  function parseUnary(): Expr {
    if (isOp("-")) {
      eat();
      return { t: "unary", op: "-", x: parseUnary() };
    }
    if (isOp("+")) {
      eat();
      return parseUnary();
    }
    return parsePost();
  }
  function parsePost(): Expr {
    let expr = parsePrimary();
    while (isOp("(") || isOp("[")) {
      if (isOp("(")) {
        eat();
        const args: Expr[] = [];
        if (!isOp(")")) {
          args.push(parseOr());
          while (isOp(",")) {
            eat();
            args.push(parseOr());
          }
        }
        if (!isOp(")")) throw new PyError(`Line ${line}: missing )`);
        eat();
        expr = { t: "call", fn: expr, args };
      } else {
        eat();
        const index = parseOr();
        if (!isOp("]")) throw new PyError(`Line ${line}: missing ]`);
        eat();
        expr = { t: "index", obj: expr, index };
      }
    }
    return expr;
  }
  function parsePrimary(): Expr {
    const t = peek();
    if (t.k === "num") {
      eat();
      return { t: "num", v: t.v };
    }
    if (t.k === "str") {
      eat();
      return { t: "str", v: t.v };
    }
    if (t.k === "name") {
      eat();
      if (t.v === "True") return { t: "bool", v: true };
      if (t.v === "False") return { t: "bool", v: false };
      if (t.v === "None") return { t: "none" };
      return { t: "name", v: t.v };
    }
    if (isOp("(")) {
      eat();
      const inner = parseOr();
      if (!isOp(")")) throw new PyError(`Line ${line}: missing )`);
      eat();
      return inner;
    }
    if (isOp("[")) {
      eat();
      const items: Expr[] = [];
      if (!isOp("]")) {
        items.push(parseOr());
        while (isOp(",")) {
          eat();
          if (isOp("]")) break;
          items.push(parseOr());
        }
      }
      if (!isOp("]")) throw new PyError(`Line ${line}: missing ]`);
      eat();
      return { t: "list", items };
    }
    if (t.k === "end") throw new PyError(`Line ${line}: this line looks unfinished.`);
    throw new PyError(`Line ${line}: I can't read this expression.`);
  }

  const expr = parseOr();
  if (peek().k !== "end") throw new PyError(`Line ${line}: extra symbols after the expression.`);
  return expr;
}

function execList(stmts: Stmt[], env: Env) {
  for (const stmt of stmts) execOne(stmt, env);
}

function bump(env: Env, line: number) {
  env.budget.n += 1;
  if (env.budget.n > MAX_STEPS) {
    throw new PyError(
      `Line ${line}: this ran too long. A loop may never be reaching its end.`,
    );
  }
}

function execOne(stmt: Stmt, env: Env) {
  bump(env, stmt.line);
  if (stmt.t === "pass") return;
  if (stmt.t === "assign") {
    env.vars.set(stmt.name, evalExpr(stmt.expr, env, stmt.line));
    return;
  }
  if (stmt.t === "expr") {
    evalExpr(stmt.expr, env, stmt.line);
    return;
  }
  if (stmt.t === "return") {
    const value = stmt.expr ? evalExpr(stmt.expr, env, stmt.line) : null;
    const signal: ReturnSignal = { __ret: true, value };
    throw signal;
  }
  if (stmt.t === "def") {
    const fn: PyFunc = { tag: "func", params: stmt.params, body: stmt.body, env, line: stmt.line };
    env.vars.set(stmt.name, fn);
    return;
  }
  if (stmt.t === "if") {
    for (const arm of stmt.arms) {
      if (arm.cond === null || truthy(evalExpr(arm.cond, env, stmt.line))) {
        execList(arm.body, env);
        break;
      }
    }
    return;
  }
  if (stmt.t === "while") {
    let guard = 0;
    while (truthy(evalExpr(stmt.cond, env, stmt.line))) {
      execList(stmt.body, env);
      guard += 1;
      if (guard > MAX_STEPS) {
        throw new PyError(`Line ${stmt.line}: this while loop never stopped.`);
      }
    }
    return;
  }
  if (stmt.t === "for") {
    const iter = evalExpr(stmt.iter, env, stmt.line);
    const values = toIterable(iter, stmt.line);
    for (const value of values) {
      env.vars.set(stmt.name, value);
      execList(stmt.body, env);
    }
  }
}

function toIterable(value: Value, line: number): Value[] {
  if (Array.isArray(value)) return value;
  if (typeof value === "string") return [...value];
  throw new PyError(`Line ${line}: that value can't be looped over. Use range(...) or a list.`);
}

function evalExpr(expr: Expr, env: Env, line: number): Value {
  switch (expr.t) {
    case "num":
      return expr.v;
    case "str":
      return expr.v;
    case "bool":
      return expr.v;
    case "none":
      return null;
    case "name":
      return lookup(env, expr.v, line);
    case "list":
      return expr.items.map((item) => evalExpr(item, env, line));
    case "unary": {
      const v = evalExpr(expr.x, env, line);
      if (expr.op === "not") return !truthy(v);
      if (typeof v !== "number") throw new PyError(`Line ${line}: minus needs a number.`);
      return -v;
    }
    case "binop":
      return evalBinop(expr.op, expr.l, expr.r, env, line);
    case "index":
      return evalIndex(evalExpr(expr.obj, env, line), evalExpr(expr.index, env, line), line);
    case "call":
      return evalCall(expr, env, line);
  }
}

function evalBinop(op: string, l: Expr, r: Expr, env: Env, line: number): Value {
  if (op === "and") {
    const left = evalExpr(l, env, line);
    return truthy(left) ? evalExpr(r, env, line) : left;
  }
  if (op === "or") {
    const left = evalExpr(l, env, line);
    return truthy(left) ? left : evalExpr(r, env, line);
  }
  const lv = evalExpr(l, env, line);
  const rv = evalExpr(r, env, line);
  if (["==", "!=", "<", ">", "<=", ">="].includes(op)) return compare(op, lv, rv, line);
  if (op === "+") {
    if (typeof lv === "string" || typeof rv === "string") {
      if (typeof lv === "string" && typeof rv === "string") return lv + rv;
      throw new PyError(
        `Line ${line}: add text to text, or a number to a number. They don't mix.`,
      );
    }
    if (typeof lv === "number" && typeof rv === "number") return lv + rv;
    throw new PyError(`Line ${line}: those two values can't be added.`);
  }
  if (typeof lv !== "number" || typeof rv !== "number") {
    throw new PyError(`Line ${line}: ${op} is for numbers.`);
  }
  if ((op === "/" || op === "//" || op === "%") && rv === 0) {
    throw new PyError(`Line ${line}: division by zero.`);
  }
  if (op === "-") return lv - rv;
  if (op === "*") return lv * rv;
  if (op === "/") return lv / rv;
  if (op === "//") return Math.floor(lv / rv);
  if (op === "%") return lv - Math.floor(lv / rv) * rv;
  throw new PyError(`Line ${line}: unknown operator ${op}.`);
}

function compare(op: string, l: Value, r: Value, line: number): boolean {
  if (typeof l === "number" && typeof r === "number") {
    if (op === "==") return l === r;
    if (op === "!=") return l !== r;
    if (op === "<") return l < r;
    if (op === ">") return l > r;
    if (op === "<=") return l <= r;
    if (op === ">=") return l >= r;
  }
  if (typeof l === "string" && typeof r === "string") {
    if (op === "==") return l === r;
    if (op === "!=") return l !== r;
    if (op === "<") return l < r;
    if (op === ">") return l > r;
    if (op === "<=") return l <= r;
    if (op === ">=") return l >= r;
  }
  if (op === "==") return pyEqual(l, r);
  if (op === "!=") return !pyEqual(l, r);
  throw new PyError(`Line ${line}: those two values can't be compared that way.`);
}

function pyEqual(a: Value, b: Value): boolean {
  if (Array.isArray(a) || Array.isArray(b)) {
    if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) return false;
    return a.every((item, i) => pyEqual(item, b[i] as Value));
  }
  return a === b;
}

function evalIndex(obj: Value, index: Value, line: number): Value {
  if (typeof index !== "number" || !Number.isInteger(index)) {
    throw new PyError(`Line ${line}: the index inside [ ] should be a whole number.`);
  }
  if (typeof obj === "string" || Array.isArray(obj)) {
    const len = obj.length;
    const i = index < 0 ? len + index : index;
    if (i < 0 || i >= len) throw new PyError(`Line ${line}: that index is outside the value.`);
    return obj[i] as Value;
  }
  throw new PyError(`Line ${line}: only text and lists can use [ ].`);
}

function evalCall(expr: Extract<Expr, { t: "call" }>, env: Env, line: number): Value {
  if (expr.fn.t === "name") {
    const name = expr.fn.v;
    const args = expr.args.map((arg) => evalExpr(arg, env, line));
    if (name === "print") {
      env.output.push(args.map(formatValue).join(" "));
      return null;
    }
    if (name === "range") return builtinRange(args, line);
    if (name === "len") {
      const v = args[0];
      if (args.length !== 1) throw new PyError(`Line ${line}: len takes one value.`);
      if (typeof v === "string" || Array.isArray(v)) return v.length;
      throw new PyError(`Line ${line}: len works on text and lists.`);
    }
    if (name === "str") {
      if (args.length !== 1) throw new PyError(`Line ${line}: str takes one value.`);
      return formatValue(args[0] as Value);
    }
    if (name === "int") {
      if (args.length !== 1) throw new PyError(`Line ${line}: int takes one value.`);
      return builtinInt(args[0] as Value, line);
    }
  }
  const fn = evalExpr(expr.fn, env, line);
  if (!isFunc(fn)) throw new PyError(`Line ${line}: that isn't something you can call.`);
  if (fn.params.length !== expr.args.length) {
    throw new PyError(
      `Line ${line}: that function wants ${fn.params.length} value${fn.params.length === 1 ? "" : "s"}, not ${expr.args.length}.`,
    );
  }
  const local = nest(fn.env);
  expr.args.forEach((arg, i) => {
    local.vars.set(fn.params[i] ?? "", evalExpr(arg, env, line));
  });
  if (env.budget.depth > 32) {
    throw new PyError(`Line ${line}: the functions called each other too many times.`);
  }
  env.budget.depth += 1;
  try {
    execList(fn.body, local);
    return null;
  } catch (error) {
    if (isReturn(error)) return error.value;
    throw error;
  } finally {
    env.budget.depth -= 1;
  }
}

function builtinRange(args: Value[], line: number): number[] {
  let start = 0;
  let stop = 0;
  let step = 1;
  if (args.length === 1) stop = mustNum(args[0], line);
  else if (args.length === 2) {
    start = mustNum(args[0], line);
    stop = mustNum(args[1], line);
  } else if (args.length === 3) {
    start = mustNum(args[0], line);
    stop = mustNum(args[1], line);
    step = mustNum(args[2], line);
  } else throw new PyError(`Line ${line}: range takes 1, 2, or 3 numbers.`);
  if (step === 0) throw new PyError(`Line ${line}: range step cannot be 0.`);
  const out: number[] = [];
  if (step > 0) {
    for (let n = start; n < stop && out.length < 5000; n += step) out.push(n);
  } else {
    for (let n = start; n > stop && out.length < 5000; n += step) out.push(n);
  }
  return out;
}

function builtinInt(value: Value, line: number): number {
  if (typeof value === "number") return Math.trunc(value);
  if (typeof value === "boolean") return value ? 1 : 0;
  if (typeof value === "string" && /^-?\d+$/.test(value.trim())) return Number(value.trim());
  throw new PyError(`Line ${line}: int could not read that as a whole number.`);
}

function mustNum(value: Value | undefined, line: number) {
  if (typeof value !== "number") throw new PyError(`Line ${line}: expected a number.`);
  return value;
}

function lookup(env: Env, name: string, line: number): Value {
  let current: Env | null = env;
  while (current) {
    if (current.vars.has(name)) return current.vars.get(name) as Value;
    current = current.parent;
  }
  if (name === "print" || name === "range" || name === "len" || name === "str" || name === "int") {
    return null;
  }
  throw new PyError(`Line ${line}: ‘${name}’ has no value yet.`);
}

function truthy(value: Value) {
  if (value === null || value === false || value === 0 || value === "") return false;
  if (Array.isArray(value) && value.length === 0) return false;
  return true;
}

function isFunc(value: Value): value is PyFunc {
  return typeof value === "object" && value !== null && !Array.isArray(value) && "tag" in value && value.tag === "func";
}

function isReturn(value: unknown): value is ReturnSignal {
  return typeof value === "object" && value !== null && (value as ReturnSignal).__ret === true;
}

function formatValue(value: Value): string {
  if (value === null) return "None";
  if (typeof value === "boolean") return value ? "True" : "False";
  if (typeof value === "number") {
    if (!Number.isFinite(value)) return "nan";
    if (Number.isInteger(value)) return String(value);
    return String(Number(value.toPrecision(12)));
  }
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return `[${value.map(formatValue).join(", ")}]`;
  if (isFunc(value)) return "<function>";
  return "None";
}
