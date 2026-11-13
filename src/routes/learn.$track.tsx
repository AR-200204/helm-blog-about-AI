import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Shell } from "@/components/shell";
import { getTrack } from "@/lib/curriculum";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/learn/$track")({ component: LearnPage });

function LearnPage() {
  const { track: trackId } = Route.useParams();
  const track = getTrack(trackId);
  const completed = useProgress((state) => state.completed);

  if (!track) {
    return (
      <Shell>
        <div className="mx-auto max-w-5xl px-4 py-16">
          <h1 className="font-display text-3xl">That path is not here.</h1>
          <Link to="/paths" className="mt-4 inline-flex min-h-11 items-center underline">
            Back to paths
          </Link>
        </div>
      </Shell>
    );
  }

  const done = track.lessons.filter((lesson) => completed[lesson.id]).length;

  return (
    <Shell>
      <div className="mx-auto max-w-5xl px-4 py-10 md:py-14">
        <p className="text-sm text-muted">{track.audience}</p>
        <h1 className="mt-2 font-display text-4xl tracking-tight">{track.title}</h1>
        <p className="mt-3 max-w-2xl text-lg text-muted">{track.blurb}</p>
        <p className="mt-4 tabular-nums text-sm text-muted">
          {done} of {track.lessons.length} finished
        </p>
        <ol className="mt-8 divide-y divide-line border-y border-line">
          {track.lessons.map((lesson, index) => {
            const complete = Boolean(completed[lesson.id]);
            return (
              <li key={lesson.id}>
                <Link
                  to="/lesson/$track/$id"
                  params={{ track: track.id, id: lesson.id }}
                  className="flex items-start gap-4 py-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <span
                    className={`mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-sm border ${
                      complete ? "border-accent bg-accent text-accent-fg" : "border-line-strong text-muted"
                    }`}
                    aria-hidden
                  >
                    {complete ? <Check className="size-4" /> : <span className="tabular-nums">{index + 1}</span>}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-medium">{lesson.title}</span>
                    <span className="mt-1 block text-sm text-muted">{lesson.idea}</span>
                    <span className="mt-1 block text-sm text-faint tabular-nums">{lesson.minutes} min</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </Shell>
  );
}
