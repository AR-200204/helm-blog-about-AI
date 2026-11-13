import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/shell";
import { buttonClass } from "@/components/ui";
import { lessonTotal, tracks } from "@/lib/curriculum";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/progress")({ component: ProgressPage });

function ProgressPage() {
  const completed = useProgress((state) => state.completed);
  const xp = useProgress((state) => state.xp);
  const streak = useProgress((state) => state.streak);
  const ids = Object.keys(completed);
  const done = new Set(ids);
  const started = tracks.filter((track) => track.lessons.some((lesson) => done.has(lesson.id))).length;
  const blocksDone = tracks[0]?.lessons.every((lesson) => done.has(lesson.id)) ?? false;

  const badges = [
    { title: "First lesson", detail: "Finish any lesson.", earned: ids.length >= 1 },
    { title: "Five lessons", detail: "Finish five lessons.", earned: ids.length >= 5 },
    { title: "Block path", detail: "Finish every block lesson.", earned: blocksDone },
    { title: "Three paths", detail: "Finish a lesson on three paths.", earned: started >= 3 },
    { title: "Two-day streak", detail: "Finish a lesson on two different days.", earned: streak >= 2 },
    { title: "Whole primer", detail: "Finish every lesson.", earned: ids.length >= lessonTotal },
  ];

  return (
    <Shell>
      <div className="mx-auto max-w-5xl px-4 py-10 md:py-14">
        <h1 className="font-display text-4xl tracking-tight">Progress</h1>
        <p className="mt-3 max-w-2xl text-lg text-muted">
          Stored in this browser. Clearing site data resets it.
        </p>
        <dl className="mt-8 grid grid-cols-3 gap-3">
          <Stat label="Lessons" value={`${ids.length}/${lessonTotal}`} />
          <Stat label="Points" value={String(xp)} />
          <Stat label="Streak" value={String(streak)} />
        </dl>
        <section className="mt-10">
          <h2 className="font-display text-2xl">Paths</h2>
          <ul className="mt-4 grid gap-3">
            {tracks.map((track) => {
              const count = track.lessons.filter((lesson) => done.has(lesson.id)).length;
              const pct = Math.round((count / track.lessons.length) * 100);
              return (
                <li key={track.id} className="rounded-xl border border-line bg-surface p-4">
                  <div className="flex items-baseline justify-between gap-3">
                    <Link
                      to="/learn/$track"
                      params={{ track: track.id }}
                      className="font-medium underline decoration-line-strong underline-offset-4"
                    >
                      {track.title}
                    </Link>
                    <span className="tabular-nums text-sm text-muted">
                      {count}/{track.lessons.length}
                    </span>
                  </div>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-line" aria-hidden>
                    <div className="h-full bg-accent" style={{ width: `${pct}%` }} />
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
        <section className="mt-10">
          <h2 className="font-display text-2xl">Marks</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {badges.map((badge) => (
              <li key={badge.title} className="rounded-xl border border-line bg-surface p-4">
                <p className="text-sm text-muted">{badge.earned ? "Earned" : "Not yet"}</p>
                <h3 className="mt-1 font-medium">{badge.title}</h3>
                <p className="mt-1 text-sm text-muted">{badge.detail}</p>
              </li>
            ))}
          </ul>
        </section>
        {ids.length === 0 ? (
          <div className="mt-10">
            <Link to="/lesson/$track/$id" params={{ track: "blocks", id: "blocks-forward" }} className={buttonClass()}>
              Start the first lesson
            </Link>
          </div>
        ) : null}
      </div>
    </Shell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-line bg-surface p-4">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="mt-1 font-display text-3xl tabular-nums tracking-tight">{value}</dd>
    </div>
  );
}
