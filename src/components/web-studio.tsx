import { Link } from "@tanstack/react-router";
import { RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import type { WebLesson } from "@/lib/curriculum";
import { sibling } from "@/lib/curriculum";
import { pageSrcDoc } from "@/lib/run-code";
import { useHydrated, useProgress } from "@/lib/progress";
import { Button, Panel, buttonClass } from "@/components/ui";

export function WebStudio({ lesson }: { lesson: WebLesson }) {
  const hydrated = useHydrated();
  const setWebDraft = useProgress((state) => state.setWebDraft);
  const clearDraft = useProgress((state) => state.clearDraft);
  const markComplete = useProgress((state) => state.markComplete);
  const already = useProgress((state) => Boolean(state.completed[lesson.id]));

  const [html, setHtml] = useState(lesson.starterHtml);
  const [css, setCss] = useState(lesson.starterCss);
  const [ready, setReady] = useState(false);
  const [hint, setHint] = useState<string | null>(null);
  const [won, setWon] = useState(false);
  const [misses, setMisses] = useState(0);

  useEffect(() => {
    if (!hydrated) return;
    const draft = useProgress.getState().webDrafts[lesson.id];
    setHtml(draft?.html ?? lesson.starterHtml);
    setCss(draft?.css ?? lesson.starterCss);
    setReady(true);
  }, [hydrated, lesson.id, lesson.starterHtml, lesson.starterCss]);

  useEffect(() => {
    if (!ready) return;
    const timer = window.setTimeout(() => setWebDraft(lesson.id, { html, css }), 250);
    return () => window.clearTimeout(timer);
  }, [html, css, ready, lesson.id, setWebDraft]);

  function check() {
    const result = lesson.check(html, css);
    if (result.ok) {
      setWon(true);
      setHint(null);
      markComplete(lesson.id);
    } else {
      setWon(false);
      setMisses((count) => count + 1);
      setHint(result.hint);
    }
  }

  const next = sibling(lesson, 1);

  return (
    <div className="grid items-start gap-4 lg:grid-cols-2">
      <div className="grid gap-4">
        <Panel>
          <h2 className="font-display text-xl tracking-tight">HTML</h2>
          <p className="mt-2 text-sm text-muted">{lesson.task}</p>
          {already && !won ? (
            <p className="mt-3 text-sm text-muted">You already finished this one.</p>
          ) : null}
          <textarea
            value={html}
            spellCheck={false}
            aria-label="HTML"
            disabled={!ready}
            onChange={(event) => {
              setHtml(event.target.value);
              setWon(false);
            }}
            className="mt-4 min-h-40 w-full resize-y rounded-sm border border-line bg-elevated p-4 font-mono text-sm leading-relaxed text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          />
        </Panel>
        <Panel>
          <h2 className="font-display text-xl tracking-tight">CSS</h2>
          <textarea
            value={css}
            spellCheck={false}
            aria-label="CSS"
            disabled={!ready}
            onChange={(event) => {
              setCss(event.target.value);
              setWon(false);
            }}
            className="mt-4 min-h-32 w-full resize-y rounded-sm border border-line bg-elevated p-4 font-mono text-sm leading-relaxed text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          />
          <div className="mt-4 flex flex-wrap gap-2">
            <Button onClick={check} disabled={!ready}>
              Check page
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                clearDraft(lesson.id);
                setHtml(lesson.starterHtml);
                setCss(lesson.starterCss);
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
                  setHtml(lesson.solutionHtml);
                  setCss(lesson.solutionCss);
                  setHint("One way is filled in. Check the page.");
                }}
              >
                Show one way
              </Button>
            ) : null}
          </div>
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
                  <Link to="/progress" className={buttonClass()}>
                    See progress
                  </Link>
                )}
              </div>
            </div>
          ) : null}
        </Panel>
      </div>
      <Panel className="lg:sticky lg:top-24">
        <h2 className="font-display text-xl tracking-tight">Page</h2>
        <p className="mt-2 text-sm text-muted">This is what a browser shows.</p>
        <iframe
          title="Page preview"
          sandbox=""
          className="mt-4 h-80 w-full rounded-sm border border-line bg-elevated"
          srcDoc={pageSrcDoc(html, css)}
        />
      </Panel>
    </div>
  );
}
