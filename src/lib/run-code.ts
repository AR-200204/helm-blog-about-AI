import { runPython } from "@/lib/python";

export type RunOutput = { output: string[]; error?: string };

export function runJavaScript(code: string): Promise<RunOutput> {
  return new Promise((resolve) => {
    const source = `
const __logs = [];
function __fmt(v) {
  if (typeof v === "string") return v;
  if (typeof v === "number" || typeof v === "boolean" || v == null) return String(v);
  try { return JSON.stringify(v); } catch (e) { return String(v); }
}
const console = { log: (...args) => { __logs.push(args.map(__fmt).join(" ")); } };
try {
${code}
postMessage({ output: __logs });
} catch (e) {
  postMessage({ output: __logs, error: (e && e.message) ? e.message : String(e) });
}
`;
    let settled = false;
    const finish = (result: RunOutput) => {
      if (settled) return;
      settled = true;
      resolve(result);
    };
    let worker: Worker;
    try {
      const blob = new Blob([source], { type: "text/javascript" });
      const url = URL.createObjectURL(blob);
      worker = new Worker(url);
      URL.revokeObjectURL(url);
    } catch (error) {
      finish({
        output: [],
        error: error instanceof Error ? error.message : "Could not run that.",
      });
      return;
    }
    const timer = window.setTimeout(() => {
      worker.terminate();
      finish({
        output: [],
        error: "That ran too long. A loop may never be reaching its end.",
      });
    }, 1200);
    worker.onmessage = (event: MessageEvent<RunOutput>) => {
      window.clearTimeout(timer);
      worker.terminate();
      finish({ output: event.data?.output ?? [], error: event.data?.error });
    };
    worker.onerror = (event) => {
      window.clearTimeout(timer);
      worker.terminate();
      finish({ output: [], error: event.message || "The code hit an error." });
    };
  });
}

export function runPythonSafe(code: string): RunOutput {
  return runPython(code);
}

export function pageSrcDoc(html: string, css: string) {
  if (/<html[\s>]/i.test(html)) return html;
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    body { margin: 16px; font-family: Georgia, "Iowan Old Style", serif; color: #1c1b18; background: #fff; }
    ${css}
  </style></head><body>${html}</body></html>`;
}
