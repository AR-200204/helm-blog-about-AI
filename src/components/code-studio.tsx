import { Link } from "@tanstack/react-router";
import { Play, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import type { CodeLesson } from "@/lib/curriculum";
import { sibling } from "@/lib/curriculum";
import { runJavaScript, runPythonSafe, type RunOutput } from "@/lib/run-code";
import { useHydrated, useProgress } from "@/lib/progress";
import { Button, Panel, buttonClass } from "@/components/ui";

export function CodeStudio({ lesson }: { lesson: CodeLesson }) {
  const hydrated = useHydrated();
  const setCodeDraft = useProgress((state) => state.setCodeDraft);
  const clearDraft = useProgress((state) => state.clearDraft);
  const markComplete = useProgress((state) => state.markComplete);
  const already = useProgress((state) => Boolean(state.completed[lesson.id]));

  const [code, setCode] = useState(lesson.starter);
  const [ready, setReady] = useState(false);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<RunOutput | null>(null);
  const [hint, setHint] = useState<string | null>(null);
  const [won, setWon] = useState(false);
  const [misses, setMisses] = useState(0);

  useEffect(() => {
    if (!hydrated) return;
    setCode(useProgress.getState().codeDrafts[lesson.id] ?? lesson.starter);
    setReady(true);
  }, [hydrated, lesson.id, lesson.starter]);

  useEffect(() => {
    if (!ready) return;
    const timer = window.setTimeout(() => setCodeDraft(lesson.id, code), 250);
    return () => window.clearTimeout(timer);
  }, [code, ready, lesson.id, setCodeDraft]);

  async function run() {
    if (running) return;
    setRunning(true);
    setHint(null);
    const output = lesson.kind === "javascript" ? await runJavaScript(code) : runPythonSafe(code);
    setResult(output);
    setRunning(false);
    if (output.error) {
      setWon(false);
      setMisses((count) => count + 1);
      setHint(output.error);
      return;
    }
    const check = lesson.check(output.output, code);
    if (check.ok) {
      setWon(true);
      setHint(null);
      markComplete(lesson.id);
    } else {
      setWon(false);
      setMisses((count) => count + 1);
      setHint(check.hint);
    }
  }

  const next = sibling(lesson, 1);

  return (
    <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
      <Panel>
        <h2 className="font-display text-xl tracking-tight">Your code</h2>
        <p className="mt-2 text-sm text-muted">{lesson.task}</p>
        {already && !won ? (
          <p className="mt-3 text-sm text-muted">You already finished this one. Change it and run again if you like.</p>
        ) : null}
        <label className="mt-4 block">
          <span className="sr-only">Code</span>
          <textarea
            value={code}
            spellCheck={false}
            disabled={!ready}
            aria-label="Code"
            onChange={(event) => {
              setCode(event.target.value);
              setWon(false);
            }}
            onKeyDown={(event) => {
              if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
                event.preventDefault();
                void run();
              }
              if (event.key === "Tab") {
                event.preventDefault();
                const el = event.currentTarget;
                const start = el.selectionStart;
                const end = el.selectionEnd;
                const nextCode = code.slice(0, start) + "  " + code.slice(end);
                setCode(nextCode);
                requestAnimationFrame(() => {
                  el.selectionStart = el.selectionEnd = start + 2;
                });
              }
            }}
            className="min-h-64 w-full resize-y rounded-sm border border-line bg-elevated p-4 font-mono text-sm leading-relaxed text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          />
        </label>
        <p className="mt-2 text-sm text-muted">Ctrl+Enter runs.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button onClick={() => void run()} disabled={running || !ready}>
            <Play className="size-4" aria-hidden />
            {running ? "Running" : "Run"}
          </Button>
          <Button
            variant="ghost"
            disabled={running}
            onClick={() => {
              clearDraft(lesson.id);
              setCode(lesson.starter);
              setResult(null);
              setWon(false);
              setHint(null);
              setMisses(0);
            }}
          >
            <RotateCcw className="size-4" aria-hidden />
            Start over
          </Button>
          {misses >= 2 && !won ? (
            <Button
              variant="secondary"
              onClick={() => {
                setCode(lesson.solution);
                setHint("One way is filled in. Press Run.");
              }}
            >
              Show one way
            </Button>
          ) : null}
        </div>
      </Panel>
      <Panel>
        <h2 className="font-display text-xl tracking-tight">Output</h2>
        <pre className="mt-4 min-h-32 overflow-x-auto rounded-sm bg-ink p-4 font-mono text-sm leading-relaxed text-accent-fg">
          {result && !result.error && result.output.length > 0 ? (
            result.output.join("\n")
          ) : (
            <span className="opacity-70">
              {result?.error
                ? "The run stopped."
                : result
                  ? "Nothing printed."
                  : "Run the code to see what it prints."}
            </span>
          )}
        </pre>
        {hint ? <p className="mt-4 text-sm text-bad">{hint}</p> : null}
        {won ? (
          <div className="mt-4">
            <p className="font-medium">That works.</p>
            <p className="mt-2 text-muted">{lesson.success}</p>
            <div className="mt-4">
              {next ? (
                <Link
                  to="/lesson/$track/$id"
                  params={{ track: next.track, id: next.id }}
                  className={buttonClass()}
                >
                  Next lesson
                </Link>
              ) : (
                <Link to="/paths" className={buttonClass()}>
                  All paths
                </Link>
              )}
            </div>
          </div>
        ) : null}
      </Panel>
    </div>
  );
}
