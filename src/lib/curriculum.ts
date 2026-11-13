import type { BlockKind, StepDraft, WorldSpec } from "@/lib/blocks";

export type TrackId = "blocks" | "javascript" | "python" | "web";

type LessonBase = {
  id: string;
  track: TrackId;
  title: string;
  minutes: number;
  idea: string;
  task: string;
  success: string;
};

export type BlockLesson = LessonBase & {
  kind: "blocks";
  world: WorldSpec;
  allowed: BlockKind[];
  mustSay?: string;
  requireRepeat?: boolean;
  miss: string;
  solution: StepDraft[];
};

export type CodeLesson = LessonBase & {
  kind: "javascript" | "python";
  starter: string;
  solution: string;
  check: (output: string[], code: string) => { ok: boolean; hint: string };
};

export type WebLesson = LessonBase & {
  kind: "web";
  starterHtml: string;
  starterCss: string;
  solutionHtml: string;
  solutionCss: string;
  check: (html: string, css: string) => { ok: boolean; hint: string };
};

export type Lesson = BlockLesson | CodeLesson | WebLesson;

export type Track = {
  id: TrackId;
  title: string;
  audience: string;
  blurb: string;
  lessons: Lesson[];
};

const pass = { ok: true, hint: "" };

function line(output: string[], index = 0) {
  return (output[index] ?? "").trim();
}

export const tracks: Track[] = [
  {
    id: "blocks",
    title: "Blocks",
    audience: "Children",
    blurb: "Tap steps into a list. No typing. This is the path for a first program.",
    lessons: [
      {
        kind: "blocks",
        id: "blocks-forward",
        track: "blocks",
        title: "Three steps",
        minutes: 4,
        idea: "A program is a list. The computer starts at the top and does one step, then the next. It does not guess.",
        task: "The arrow starts on the left. The ring is three squares to the right. Add Forward until the arrow lands in the ring.",
        success: "You wrote a sequence. Order is the whole idea: step one, then step two, then step three.",
        miss: "Count the empty squares between the arrow and the ring. You need that many Forward steps.",
        world: {
          cols: 5,
          rows: 3,
          walls: [],
          gems: [],
          paintTargets: [],
          start: { x: 0, y: 1, dir: 1 },
          goal: [3, 1],
        },
        allowed: ["forward"],
        solution: [{ kind: "forward" }, { kind: "forward" }, { kind: "forward" }],
      },
      {
        kind: "blocks",
        id: "blocks-corner",
        track: "blocks",
        title: "The corner",
        minutes: 5,
        idea: "Forward only moves the way the arrow points. Turn left or turn right to change that way. Walls cannot be crossed.",
        task: "Walk around the wall and stop inside the ring.",
        success: "Turning is not moving. A turn changes direction, and the next Forward uses the new direction.",
        miss: "Stand beside the wall, turn to face down the open side, walk past it, then turn toward the ring.",
        world: {
          cols: 5,
          rows: 4,
          walls: [
            [2, 0],
            [2, 1],
          ],
          gems: [],
          paintTargets: [],
          start: { x: 0, y: 1, dir: 1 },
          goal: [2, 3],
        },
        allowed: ["forward", "left", "right"],
        solution: [
          { kind: "forward" },
          { kind: "right" },
          { kind: "forward" },
          { kind: "forward" },
          { kind: "left" },
          { kind: "forward" },
        ],
      },
      {
        kind: "blocks",
        id: "blocks-speak",
        track: "blocks",
        title: "Say, then move",
        minutes: 4,
        idea: "Not every step moves the arrow. Say is a step too. The computer still runs the list from top to bottom.",
        task: "Make the arrow say Hello, and land in the ring.",
        success: "Speaking and moving are both instructions. The list can mix them. Nothing in the list is skipped.",
        miss: "Add a Say step with the word Hello, and two Forward steps. The Say can sit anywhere in the list.",
        mustSay: "Hello",
        world: {
          cols: 5,
          rows: 3,
          walls: [],
          gems: [],
          paintTargets: [],
          start: { x: 0, y: 1, dir: 1 },
          goal: [2, 1],
        },
        allowed: ["forward", "say"],
        solution: [{ kind: "say", text: "Hello" }, { kind: "forward" }, { kind: "forward" }],
      },
      {
        kind: "blocks",
        id: "blocks-repeat",
        track: "blocks",
        title: "The same step, four times",
        minutes: 5,
        idea: "When a step should happen again and again, put it inside Repeat. The number is how many times the inside runs.",
        task: "Reach the ring four squares away. Use Repeat, not four separate Forward steps.",
        success: "Repeat is a loop. The steps inside run, then they run again, until the number is used up.",
        miss: "Add Repeat, set it to 4, and put one Forward inside it.",
        requireRepeat: true,
        world: {
          cols: 6,
          rows: 3,
          walls: [],
          gems: [],
          paintTargets: [],
          start: { x: 0, y: 1, dir: 1 },
          goal: [4, 1],
        },
        allowed: ["forward", "repeat"],
        solution: [{ kind: "repeat", times: 4, body: [{ kind: "forward" }] }],
      },
      {
        kind: "blocks",
        id: "blocks-gems",
        track: "blocks",
        title: "Pick up the gem",
        minutes: 6,
        idea: "Walking onto a gem collects it. The ring only counts after the gem is collected. You may leave the straight line.",
        task: "Collect the gem, then stand in the ring.",
        success: "You combined turns and a goal that is not only the last square. Programs can have more than one thing to finish.",
        miss: "The gem is one square above the path. Turn toward it, step onto it, then find your way to the ring.",
        world: {
          cols: 5,
          rows: 3,
          walls: [],
          gems: [[2, 0]],
          paintTargets: [],
          start: { x: 0, y: 1, dir: 1 },
          goal: [4, 1],
        },
        allowed: ["forward", "left", "right"],
        solution: [
          { kind: "forward" },
          { kind: "forward" },
          { kind: "left" },
          { kind: "forward" },
          { kind: "right" },
          { kind: "forward" },
          { kind: "forward" },
          { kind: "right" },
          { kind: "forward" },
        ],
      },
      {
        kind: "blocks",
        id: "blocks-paint",
        track: "blocks",
        title: "Paint three squares",
        minutes: 6,
        idea: "Paint colors the square you are standing on. It does not move you. Forward moves you. Repeat can hold both.",
        task: "Paint each dashed square. Use Repeat so you do not write the pair of steps three times.",
        success: "A loop can hold more than one step. Paint, then Forward, then that pair runs again.",
        miss: "Put Paint and then Forward inside Repeat, and set the number to 3.",
        requireRepeat: true,
        world: {
          cols: 5,
          rows: 3,
          walls: [],
          gems: [],
          paintTargets: [
            [0, 1],
            [1, 1],
            [2, 1],
          ],
          start: { x: 0, y: 1, dir: 1 },
          goal: null,
        },
        allowed: ["paint", "forward", "repeat"],
        solution: [
          {
            kind: "repeat",
            times: 3,
            body: [{ kind: "paint" }, { kind: "forward" }],
          },
        ],
      },
    ],
  },
  {
    id: "javascript",
    title: "JavaScript",
    audience: "Everyone",
    blurb: "The language browsers run. Six lessons, one idea each, with a runner that shows what printed.",
    lessons: [
      {
        kind: "javascript",
        id: "js-print",
        track: "javascript",
        title: "Print a line",
        minutes: 5,
        idea: "console.log sends a value to the output. Text sits inside quotes. The computer prints exactly the characters you give it.",
        task: "Print a single line that says Hello.",
        success: "Quotes make text. Without them, Hello would be read as a name, not as a word to print.",
        starter: `// Print exactly: Hello\nconsole.log("");\n`,
        solution: `console.log("Hello");\n`,
        check: (output) =>
          line(output) === "Hello" && output.length === 1
            ? pass
            : { ok: false, hint: "The output should be one line: Hello. Check the capital H and the quotes." },
      },
      {
        kind: "javascript",
        id: "js-vars",
        track: "javascript",
        title: "Names for numbers",
        minutes: 6,
        idea: "const gives a name to a value. After that, you can use the name instead of repeating the number. Plus adds numbers.",
        task: "snacks is 2 and extra is 3. Print how many there are together.",
        success: "A name holds a value. snacks + extra is 5 because the names stand for 2 and 3.",
        starter: `const snacks = 2;\nconst extra = 3;\n// Print the total.\nconsole.log(snacks);\n`,
        solution: `const snacks = 2;\nconst extra = 3;\nconsole.log(snacks + extra);\n`,
        check: (output) =>
          line(output) === "5"
            ? pass
            : { ok: false, hint: "Print snacks + extra. The line should be 5, not 2." },
      },
      {
        kind: "javascript",
        id: "js-strings",
        track: "javascript",
        title: "Text and a name",
        minutes: 6,
        idea: "A name can hold text. Plus joins text onto text. Use the name so the sentence follows the value.",
        task: "Print I am Ada by using the variable name. Do not type the whole sentence as one fixed string.",
        success: "The variable is the part that can change. The sentence is built from a fixed piece plus that name.",
        starter: `const name = "Ada";\n// Print: I am Ada\nconsole.log("I am");\n`,
        solution: `const name = "Ada";\nconsole.log("I am " + name);\n`,
        check: (output, code) => {
          const bare = code.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
          const usesName = /\bname\b/.test(bare.replace(/const\s+name[\s\S]*?;/, ""));
          if (line(output) === "I am Ada" && usesName && !bare.includes("I am Ada")) return pass;
          return {
            ok: false,
            hint: 'Join "I am " (with a space) to name, and print that. The output line should be I am Ada.',
          };
        },
      },
      {
        kind: "javascript",
        id: "js-if",
        track: "javascript",
        title: "A choice",
        minutes: 7,
        idea: "if runs a block only when a test is true. else runs when the test is false. >= means greater than or equal.",
        task: "score is 8. If score is 7 or more, print pass. Otherwise print try.",
        success: "The test score >= 7 is true for 8, so only the first branch runs. The other branch is skipped.",
        starter: `const score = 8;\n// Print pass or try.\n\n`,
        solution: `const score = 8;\nif (score >= 7) {\n  console.log("pass");\n} else {\n  console.log("try");\n}\n`,
        check: (output, code) =>
          line(output) === "pass" && /\bif\b/.test(code)
            ? pass
            : { ok: false, hint: "Use if and else. With score at 8, the printed line should be pass." },
      },
      {
        kind: "javascript",
        id: "js-loop",
        track: "javascript",
        title: "Add 1 through 4",
        minutes: 8,
        idea: "A for loop repeats a block. You can add into a total on each pass instead of writing the sum by hand.",
        task: "Using a loop, add 1, 2, 3, and 4 into total. Print total. It should be 10.",
        success: "The loop visits each number and folds it into total. That pattern is how programs handle long lists of work.",
        starter: `let total = 0;\n// Use a loop. Then print total.\nconsole.log(total);\n`,
        solution: `let total = 0;\nfor (let n = 1; n <= 4; n++) {\n  total = total + n;\n}\nconsole.log(total);\n`,
        check: (output, code) =>
          line(output) === "10" && /\b(for|while)\b/.test(code)
            ? pass
            : { ok: false, hint: "A for or while loop should add 1+2+3+4. Print 10, and don't just write the answer." },
      },
      {
        kind: "javascript",
        id: "js-function",
        track: "javascript",
        title: "A function named double",
        minutes: 8,
        idea: "A function is a named recipe. return sends a value back to the line that called it. The caller can print that value.",
        task: "Write function double so it returns its number times 2. Print double(6). The line should be 12.",
        success: "double(6) jumps into the function with n set to 6, returns 12, and console.log prints that result.",
        starter: `// function double(n) should return n * 2\n// Print double(6)\n\n`,
        solution: `function double(n) {\n  return n * 2;\n}\nconsole.log(double(6));\n`,
        check: (output, code) =>
          line(output) === "12" && /function\s+double\b/.test(code)
            ? pass
            : {
                ok: false,
                hint: "Declare function double, return the number times 2, and console.log(double(6)).",
              },
      },
    ],
  },
  {
    id: "python",
    title: "Python",
    audience: "Everyone",
    blurb: "A calm language for first programs. Indentation is part of the grammar. The lessons stay small on purpose.",
    lessons: [
      {
        kind: "python",
        id: "py-print",
        track: "python",
        title: "Print a line",
        minutes: 5,
        idea: "print shows a value. Text needs quotes. Python reads the line and does it. There is no extra punctuation at the end.",
        task: "Print a single line that says Hello.",
        success: "print is a function call. The parentheses hold what you want to show.",
        starter: `# Print exactly: Hello\nprint("")\n`,
        solution: `print("Hello")\n`,
        check: (output) =>
          line(output) === "Hello" && output.length === 1
            ? pass
            : { ok: false, hint: "One line of output: Hello. Keep the capital H inside quotes." },
      },
      {
        kind: "python",
        id: "py-vars",
        track: "python",
        title: "Names for numbers",
        minutes: 6,
        idea: "A single = stores a value under a name. The name can be used later. + adds numbers.",
        task: "snacks is 2 and extra is 3. Print the total.",
        success: "The names are not the numbers themselves. They point at the values you stored.",
        starter: `snacks = 2\nextra = 3\n# Print the total.\nprint(snacks)\n`,
        solution: `snacks = 2\nextra = 3\nprint(snacks + extra)\n`,
        check: (output) =>
          line(output) === "5"
            ? pass
            : { ok: false, hint: "Print snacks + extra. You should see 5." },
      },
      {
        kind: "python",
        id: "py-if",
        track: "python",
        title: "A choice",
        minutes: 7,
        idea: "if runs the indented lines only when the test is true. else runs when it is not. The colon starts the block.",
        task: "score is 8. If score is 7 or more, print pass. Otherwise print try.",
        success: "The indent shows which lines belong to the choice. Those lines are the branch.",
        starter: `score = 8\n# Print pass or try.\n`,
        solution: `score = 8\nif score >= 7:\n    print("pass")\nelse:\n    print("try")\n`,
        check: (output, code) =>
          line(output) === "pass" && /\bif\b/.test(code)
            ? pass
            : { ok: false, hint: "Write if score >= 7: then an indented print(\"pass\"), and an else that prints try." },
      },
      {
        kind: "python",
        id: "py-loop",
        track: "python",
        title: "Add 1 through 4",
        minutes: 8,
        idea: "for walks through every value in a list. range(1, 5) is the numbers 1, 2, 3, and 4. The end number is not included.",
        task: "Add those numbers into total with a for loop. Print total. It should be 10.",
        success: "range stops before the end number. That is why 5 produces 1 through 4, and the sum is 10.",
        starter: `total = 0\n# Loop with range, then print total.\nprint(total)\n`,
        solution: `total = 0\nfor n in range(1, 5):\n    total = total + n\nprint(total)\n`,
        check: (output, code) =>
          line(output) === "10" && /\bfor\b/.test(code)
            ? pass
            : { ok: false, hint: "Use for n in range(1, 5): and add n into total. Print 10." },
      },
      {
        kind: "python",
        id: "py-function",
        track: "python",
        title: "A function named double",
        minutes: 8,
        idea: "def names a function. The indented lines are the body. return hands a value back to the caller.",
        task: "Define double so it returns its number times 2. Print double(6). The line should be 12.",
        success: "Calling double(6) sets n to 6 inside the function, returns 12, and print shows it.",
        starter: `# def double(n): should return n * 2\n# Print double(6)\n`,
        solution: `def double(n):\n    return n * 2\n\nprint(double(6))\n`,
        check: (output, code) =>
          line(output) === "12" && /\bdef\s+double\b/.test(code)
            ? pass
            : { ok: false, hint: "def double(n): then an indented return n * 2. After the function, print(double(6))." },
      },
    ],
  },
  {
    id: "web",
    title: "Web pages",
    audience: "Everyone",
    blurb: "HTML is the structure. CSS is how it looks. You see the page while you write it.",
    lessons: [
      {
        kind: "web",
        id: "web-hello",
        track: "web",
        title: "A heading and a paragraph",
        minutes: 5,
        idea: "HTML tags wrap a piece of the page. h1 is the main heading. p is a paragraph. The browser uses the tags, not the way you space the lines.",
        task: "Make a heading that says My first page, and a paragraph of at least a short sentence.",
        success: "Tags describe the job of the text. A heading is not just big text. The browser knows it is the title of the page.",
        starterHtml: `<!-- heading: My first page -->\n<!-- then a paragraph -->\n`,
        starterCss: `/* Nothing to style yet. */\n`,
        solutionHtml: `<h1>My first page</h1>\n<p>This is a real paragraph.</p>\n`,
        solutionCss: ``,
        check: (html) => {
          const h1 = /<h1[^>]*>([\s\S]*?)<\/h1>/i.exec(html);
          const p = /<p[^>]*>([\s\S]*?)<\/p>/i.exec(html);
          const heading = (h1?.[1] ?? "").replace(/<[^>]+>/g, "").trim();
          const paragraph = (p?.[1] ?? "").replace(/<[^>]+>/g, "").trim();
          if (heading === "My first page" && paragraph.replace(/[^A-Za-z]/g, "").length >= 8) return pass;
          return {
            ok: false,
            hint: "Use <h1>My first page</h1> and a <p> with a real sentence inside it.",
          };
        },
      },
      {
        kind: "web",
        id: "web-color",
        track: "web",
        title: "Give the paragraph a color",
        minutes: 6,
        idea: "CSS rules choose elements and set properties. color changes text color. A rule needs a selector, a property, and a value.",
        task: "Set the paragraph’s text color to a dark color of your choice. Leave the words readable.",
        success: "The selector p means every paragraph. The property color is separate from the words in the HTML.",
        starterHtml: `<h1>My first page</h1>\n<p>Color belongs to this sentence.</p>\n`,
        starterCss: `p {\n  \n}\n`,
        solutionHtml: `<h1>My first page</h1>\n<p>Color belongs to this sentence.</p>\n`,
        solutionCss: `p {\n  color: #243044;\n}\n`,
        check: (_html, css) =>
          /p\s*\{[^}]*color\s*:\s*[^;}\s]+/i.test(css)
            ? pass
            : { ok: false, hint: "Inside p { }, add a color property, for example color: #243044;" },
      },
      {
        kind: "web",
        id: "web-list",
        track: "web",
        title: "A list of three",
        minutes: 6,
        idea: "ul is an unordered list. Each li is one item. Lists tell the browser these lines belong together, in no special rank.",
        task: "Add a list with three items. Any three words you like.",
        success: "The list is a parent with three children. That shape — a container and items — shows up everywhere on the web.",
        starterHtml: `<h1>Three words</h1>\n<!-- ul with three li elements -->\n`,
        starterCss: ``,
        solutionHtml: `<h1>Three words</h1>\n<ul>\n  <li>ink</li>\n  <li>paper</li>\n  <li>type</li>\n</ul>\n`,
        solutionCss: ``,
        check: (html) => {
          const items = html.match(/<li\b[^>]*>[\s\S]*?<\/li>/gi) ?? [];
          if (/<ul\b/i.test(html) && items.length >= 3) return pass;
          return { ok: false, hint: "Add <ul> with at least three <li> items inside it." };
        },
      },
      {
        kind: "web",
        id: "web-card",
        track: "web",
        title: "A card",
        minutes: 7,
        idea: "A class is a name you invent. CSS finds it with a dot. padding is space inside the box. border draws the edge.",
        task: "The div already has class card. Give .card some padding and a border so it reads as a card.",
        success: "HTML holds the class name. CSS does the looking. You can restyle the card without touching the words.",
        starterHtml: `<div class="card">\n  <h1>Today</h1>\n  <p>A short note.</p>\n</div>\n`,
        starterCss: `/* Style .card with padding and a border. */\n`,
        solutionHtml: `<div class="card">\n  <h1>Today</h1>\n  <p>A short note.</p>\n</div>\n`,
        solutionCss: `.card {\n  padding: 16px;\n  border: 1px solid #243044;\n}\n`,
        check: (html, css) =>
          /class\s*=\s*["']card["']/i.test(html) &&
          /\.card\s*\{[^}]*padding\s*:/i.test(css) &&
          /\.card\s*\{[^}]*border\s*:/i.test(css)
            ? pass
            : {
                ok: false,
                hint: "Keep class=\"card\" on the div. In CSS, .card { } needs both padding and border.",
              },
      },
    ],
  },
];

export function getTrack(id: string) {
  return tracks.find((track) => track.id === id) ?? null;
}

export function getLesson(trackId: string, lessonId: string) {
  return getTrack(trackId)?.lessons.find((lesson) => lesson.id === lessonId) ?? null;
}

export function sibling(lesson: Lesson, delta: number) {
  const track = getTrack(lesson.track);
  if (!track) return null;
  const index = track.lessons.findIndex((item) => item.id === lesson.id);
  return track.lessons[index + delta] ?? null;
}

export function lessonPosition(lesson: Lesson) {
  const track = getTrack(lesson.track);
  const index = track?.lessons.findIndex((item) => item.id === lesson.id) ?? 0;
  return { index, count: track?.lessons.length ?? 0, track };
}

export const lessonTotal = tracks.reduce((sum, track) => sum + track.lessons.length, 0);

export function nextTrackId(id: TrackId): TrackId {
  if (id === "blocks") return "javascript";
  if (id === "javascript") return "python";
  if (id === "python") return "web";
  return "blocks";
}
