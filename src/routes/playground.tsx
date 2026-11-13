import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Shell } from "@/components/shell";
import { Button, Panel } from "@/components/ui";
import { pageSrcDoc, runJavaScript, runPythonSafe, type RunOutput } from "@/lib/run-code";
import { useHydrated, useProgress } from "@/lib/progress";

export const Route = createFileRoute("/playground")({ component: PlaygroundPage });

const JS_START = `const name = "Ada";\nconsole.log("Hello, " + name);\n`;
const PY_START = `name = "Ada"\nprint("Hello, " + name)\n`;
const HTML_START = `<h1>Hello</h1>\n<p>Edit this page.</p>\n`;
const CSS_START = `h1 {\n  font-family: Georgia, serif;\n}\n`;

function PlaygroundPage() {
  const hydrated = useHydrated();
  const [mode, setMode] = useState<"javascript" | "python" | "web">("javascript");

  return (
    <Shell>
      <div className="mx-auto max-w-5xl px-4 py-10 md:py-14">
        <h1 className="font-display text-4xl tracking-tight">Playground</h1>
        <p className="mt-3 max-w-2xl text-lg text-muted">
          No grade here. Try a line, run it, change it. JavaScript and Python print to the output. Web pages draw on the right.
        </p>
        <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Language">
          {(
            [
              ["javascript", "JavaScript"],
              ["python", "Python"],
              ["web", "Web"],
            ] as const
          ).map(([id, label]) => (
            <Button key={id} variant={mode === id ? "primary" : "secondary"} onClick={() => setMode(id)} role="tab" aria-selected={mode === id}>
              {label}
            </Button>
          ))}
        </div>
        <div className="mt-6">
          {hydrated ? (
            mode === "web" ? (
              <WebPlay />
            ) : (
              <CodePlay key={mode} mode={mode} />
            )
          ) : (
            <p className="text-muted">Opening the playground…</p>
          )}
        </div>
      </div>
    </Shell>
  );
}

function CodePlay({ mode }: { mode: "javascript" | "python" }) {
  const id = mode === "javascript" ? "play:js" : "play:py";
  const starter = mode === "javascript" ? JS_START : PY_START;
  const setCodeDraft = useProgress((state) => state.setCodeDraft);
  const [code, setCode] = useState(() => useProgress.getState().codeDrafts[id] ?? starter);
  const [result, setResult] = useState<RunOutput | null>(null);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setCodeDraft(id, code), 250);
    return () => window.clearTimeout(timer);
  }, [code, id, setCodeDraft]);

  async function run() {
    setRunning(true);
    const output = mode === "javascript" ? await runJavaScript(code) : runPythonSafe(code);
    setResult(output);
    setRunning(false);
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Panel>
        <textarea
          value={code}
          aria-label={mode === "javascript" ? "JavaScript" : "Python"}
          spellCheck={false}
          onChange={(event) => setCode(event.target.value)}
          onKeyDown={(event) => {
            if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
              event.preventDefault();
              void run();
            }
            if (event.key === "Tab") {
              event.preventDefault();
              const el = event.currentTarget;
              const start = el.selectionStart;
              const next = code.slice(0, start) + "  " + code.slice(el.selectionEnd);
              setCode(next);
              requestAnimationFrame(() => {
                el.selectionStart = el.selectionEnd = start + 2;
              });
            }
          }}
          className="min-h-64 w-full resize-y rounded-sm border border-line bg-elevated p-4 font-mono text-sm leading-relaxed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        />
        <div className="mt-4">
          <Button onClick={() => void run()} disabled={running}>
            {running ? "Running" : "Run"}
          </Button>
        </div>
      </Panel>
      <Panel>
        <h2 className="font-display text-xl">Output</h2>
        <pre className="mt-4 min-h-32 overflow-x-auto rounded-sm bg-ink p-4 font-mono text-sm text-accent-fg">
          {result?.error ? (
            <span className="opacity-80">{result.error}</span>
          ) : result ? (
            result.output.join("\n") || "Nothing printed."
          ) : (
            "Run to print."
          )}
        </pre>
      </Panel>
    </div>
  );
}

function WebPlay() {
  const setWebDraft = useProgress((state) => state.setWebDraft);
  const initial = useProgress.getState().webDrafts["play:web"];
  const [html, setHtml] = useState(initial?.html ?? HTML_START);
  const [css, setCss] = useState(initial?.css ?? CSS_START);

  useEffect(() => {
    const timer = window.setTimeout(() => setWebDraft("play:web", { html, css }), 250);
    return () => window.clearTimeout(timer);
  }, [html, css, setWebDraft]);

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="grid gap-4">
        <Panel>
          <h2 className="font-display text-xl">HTML</h2>
          <textarea
            value={html}
            aria-label="HTML"
            spellCheck={false}
            onChange={(event) => setHtml(event.target.value)}
            className="mt-4 min-h-36 w-full resize-y rounded-sm border border-line bg-elevated p-4 font-mono text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          />
        </Panel>
        <Panel>
          <h2 className="font-display text-xl">CSS</h2>
          <textarea
            value={css}
            aria-label="CSS"
            spellCheck={false}
            onChange={(event) => setCss(event.target.value)}
            className="mt-4 min-h-36 w-full resize-y rounded-sm border border-line bg-elevated p-4 font-mono text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          />
        </Panel>
      </div>
      <Panel>
        <h2 className="font-display text-xl">Page</h2>
        <iframe
          title="Playground page"
          sandbox=""
          className="mt-4 h-80 w-full rounded-sm border border-line bg-elevated"
          srcDoc={pageSrcDoc(html, css)}
        />
      </Panel>
    </div>
  );
}
