import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/shell";
import { tracks } from "@/lib/curriculum";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/paths")({ component: PathsPage });

function PathsPage() {
  const completed = useProgress((state) => state.completed);

  return (
    <Shell>
      <div className="mx-auto max-w-5xl px-4 py-10 md:py-14">
        <h1 className="font-display text-4xl tracking-tight">Paths</h1>
        <p className="mt-3 max-w-2xl text-lg text-muted">
          Start where the learner is. Blocks need no typing. The other three paths assume you can read a short paragraph.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {tracks.map((track) => {
            const done = track.lessons.filter((lesson) => completed[lesson.id]).length;
            const first = track.lessons[0];
            return (
              <article key={track.id} className="flex flex-col rounded-xl border border-line bg-surface p-4">
                <p className="text-sm text-muted">{track.audience}</p>
                <h2 className="mt-1 font-display text-2xl tracking-tight">{track.title}</h2>
                <p className="mt-2 flex-1 text-muted">{track.blurb}</p>
                <p className="mt-4 tabular-nums text-sm text-muted">
                  {done} of {track.lessons.length} finished
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    to="/learn/$track"
                    params={{ track: track.id }}
                    className="inline-flex min-h-11 items-center text-sm font-medium underline decoration-line-strong underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    Lesson list
                  </Link>
                  {first ? (
                    <Link
                      to="/lesson/$track/$id"
                      params={{ track: track.id, id: first.id }}
                      className="inline-flex min-h-11 items-center text-sm font-medium underline decoration-line-strong underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      {done > 0 ? "Continue" : "Start"}
                    </Link>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </Shell>
  );
}
