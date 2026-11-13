export type Dir = 0 | 1 | 2 | 3;

export type BlockKind = "forward" | "left" | "right" | "paint" | "say" | "repeat";

export type Step =
  | { id: string; kind: "forward" | "left" | "right" | "paint" }
  | { id: string; kind: "say"; text: string }
  | { id: string; kind: "repeat"; times: number; body: Step[] };

export type StepDraft =
  | { kind: "forward" | "left" | "right" | "paint" }
  | { kind: "say"; text: string }
  | { kind: "repeat"; times: number; body: StepDraft[] };

export type WorldSpec = {
  cols: number;
  rows: number;
  walls: [number, number][];
  gems: [number, number][];
  paintTargets: [number, number][];
  start: { x: number; y: number; dir: Dir };
  goal: [number, number] | null;
};

export type Action = {
  stepId: string;
  op: "forward" | "left" | "right" | "paint" | "say";
  text?: string;
};

export type SimState = {
  x: number;
  y: number;
  dir: Dir;
  collected: string[];
  painted: string[];
  said: string[];
  bubble: string | null;
  bumped: boolean;
};

export function cellKey(x: number, y: number) {
  return `${x},${y}`;
}

export function uid() {
  return `s${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-3)}`;
}

export function withIds(drafts: StepDraft[]): Step[] {
  return drafts.map((draft) => {
    if (draft.kind === "repeat") {
      return { id: uid(), kind: "repeat", times: draft.times, body: withIds(draft.body) };
    }
    if (draft.kind === "say") return { id: uid(), kind: "say", text: draft.text };
    return { id: uid(), kind: draft.kind };
  });
}

export function initialState(spec: WorldSpec): SimState {
  return {
    x: spec.start.x,
    y: spec.start.y,
    dir: spec.start.dir,
    collected: [],
    painted: [],
    said: [],
    bubble: null,
    bumped: false,
  };
}

const DX = [0, 1, 0, -1];
const DY = [-1, 0, 1, 0];

export function unroll(steps: Step[], out: Action[] = []): Action[] {
  for (const step of steps) {
    if (step.kind === "repeat") {
      const times = Math.max(1, Math.min(8, Math.round(step.times)));
      for (let i = 0; i < times; i++) unroll(step.body, out);
    } else if (step.kind === "say") {
      out.push({ stepId: step.id, op: "say", text: step.text });
    } else {
      out.push({ stepId: step.id, op: step.kind });
    }
    if (out.length > 300) {
      throw new Error("That program is too long to run. Shorten the repeats.");
    }
  }
  return out;
}

function wallSet(spec: WorldSpec) {
  return new Set(spec.walls.map(([x, y]) => cellKey(x, y)));
}

function gemSet(spec: WorldSpec) {
  return new Set(spec.gems.map(([x, y]) => cellKey(x, y)));
}

export function apply(spec: WorldSpec, state: SimState, action: Action): SimState {
  if (state.bumped) return state;
  if (action.op === "left") {
    return { ...state, dir: ((state.dir + 3) % 4) as Dir, bubble: null };
  }
  if (action.op === "right") {
    return { ...state, dir: ((state.dir + 1) % 4) as Dir, bubble: null };
  }
  if (action.op === "paint") {
    const key = cellKey(state.x, state.y);
    if (state.painted.includes(key)) return { ...state, bubble: null };
    return { ...state, painted: [...state.painted, key], bubble: null };
  }
  if (action.op === "say") {
    const text = (action.text ?? "").trim();
    return { ...state, said: [...state.said, text], bubble: text || "…" };
  }
  const nx = state.x + DX[state.dir];
  const ny = state.y + DY[state.dir];
  const blocked =
    nx < 0 || ny < 0 || nx >= spec.cols || ny >= spec.rows || wallSet(spec).has(cellKey(nx, ny));
  if (blocked) return { ...state, bumped: true, bubble: null };
  const key = cellKey(nx, ny);
  const collected =
    gemSet(spec).has(key) && !state.collected.includes(key)
      ? [...state.collected, key]
      : state.collected;
  return { ...state, x: nx, y: ny, collected, bubble: null };
}

export function isWon(
  spec: WorldSpec,
  state: SimState,
  opts: { mustSay?: string; requireRepeat?: boolean; program: Step[] },
): boolean {
  if (state.bumped) return false;
  for (const [x, y] of spec.gems) {
    if (!state.collected.includes(cellKey(x, y))) return false;
  }
  for (const [x, y] of spec.paintTargets) {
    if (!state.painted.includes(cellKey(x, y))) return false;
  }
  if (spec.goal && (state.x !== spec.goal[0] || state.y !== spec.goal[1])) return false;
  if (opts.mustSay) {
    const need = opts.mustSay.trim().toLowerCase();
    if (!state.said.some((line) => line.trim().toLowerCase() === need)) return false;
  }
  if (opts.requireRepeat && !programHasRepeat(opts.program)) return false;
  return true;
}

export function programHasRepeat(steps: Step[]): boolean {
  return steps.some((step) => step.kind === "repeat");
}

export function facingLabel(dir: Dir) {
  return ["north", "east", "south", "west"][dir];
}
