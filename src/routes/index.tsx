import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/shell";
import { buttonClass } from "@/components/ui";
import { lessonTotal, tracks } from "@/lib/curriculum";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const minutes = tracks.reduce(
    (sum, track) => sum + track.lessons.reduce((inner, lesson) => inner + lesson.minutes, 0),
    0,
  );

  return (
    <Shell>
      <div className="mx-auto max-w-5xl px-4 py-10 md:py-16">
        <p className="rise text-sm font-medium tracking-wide text-muted">A short school</p>
        <div className="mt-4 grid items-end gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <div>
            <h1 className="rise font-display text-4xl tracking-tight text-balance md:text-5xl">
              Learn a programming language in short lessons.
            </h1>
            <p className="rise mt-5 max-w-xl text-lg text-muted" style={{ animationDelay: "80ms" }}>
              Children start with blocks and never have to type. Everyone else can take JavaScript,
              Python, or web pages. Each lesson is one idea, then you try it.
            </p>
            <div className="rise mt-8 flex flex-wrap gap-3" style={{ animationDelay: "140ms" }}>
              <Link to="/lesson/$track/$id" params={{ track: "blocks", id: "blocks-forward" }} className={buttonClass()}>
                Start with blocks
              </Link>
              <Link to="/paths" className={buttonClass("secondary")}>
                See every path
              </Link>
            </div>
          </div>
          <MiniBoard />
        </div>

        <section className="mt-16 border-t border-line pt-10">
          <h2 className="font-display text-2xl tracking-tight">Four paths, {lessonTotal} lessons</h2>
          <p className="mt-2 max-w-2xl text-muted">
            About {minutes} minutes if you do them all. You do not have to. One path is enough to start.
          </p>
          <ol className="mt-6 divide-y divide-line border-y border-line">
            {tracks.map((track) => (
              <li key={track.id}>
                <Link
                  to="/learn/$track"
                  params={{ track: track.id }}
                  className="flex flex-col gap-1 py-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:flex-row sm:items-baseline sm:justify-between"
                >
                  <span>
                    <span className="font-medium">{track.title}</span>
                    <span className="mt-1 block text-sm text-muted sm:mt-0 sm:ml-3 sm:inline">
                      {track.blurb}
                    </span>
                  </span>
                  <span className="shrink-0 text-sm text-muted">
                    {track.audience} · {track.lessons.length} lessons
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-16 border-t border-line pt-10">
          <h2 className="font-display text-2xl tracking-tight">AI, in plain pieces</h2>
          <p className="mt-2 max-w-2xl text-muted">
            Dangers, daily impact, and a short brief on the Nvidia CEO reports this week. Every article includes a chart you can change. The dashboard weighs what you care about.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/articles" className={buttonClass()}>
              Read the articles
            </Link>
            <Link to="/dashboard" className={buttonClass("secondary")}>
              Open the dashboard
            </Link>
            <Link to="/easing" className={buttonClass("secondary")}>
              How a fade speeds up
            </Link>
          </div>
        </section>

        <section className="mt-16 grid gap-8 md:grid-cols-3">
          <div>
            <h2 className="font-display text-xl">Read one idea</h2>
            <p className="mt-2 text-muted">A few sentences. No video, no chapter. The idea is named in plain language.</p>
          </div>
          <div>
            <h2 className="font-display text-xl">Try it immediately</h2>
            <p className="mt-2 text-muted">Blocks animate on a board. Code runs here. A web page updates as you type.</p>
          </div>
          <div>
            <h2 className="font-display text-xl">Keep going tomorrow</h2>
            <p className="mt-2 text-muted">Finished lessons and a day streak stay on this device. Kids mode only enlarges the type.</p>
          </div>
        </section>
      </div>
    </Shell>
  );
}

function MiniBoard() {
  const cells = [
    "empty",
    "empty",
    "wall",
    "empty",
    "empty",
    "start",
    "empty",
    "wall",
    "empty",
    "goal",
  ];
  return (
    <aside className="rise hidden md:block" style={{ animationDelay: "120ms" }} aria-hidden>
      <div className="rounded-xl border border-line bg-surface p-4">
        <p className="text-sm text-muted">Blocks · lesson 2</p>
        <div className="mt-4 grid grid-cols-5 overflow-hidden rounded-md border border-line-strong">
          {cells.map((cell, index) => (
            <div
              key={index}
              className={`relative aspect-square border border-line bg-elevated ${cell === "wall" ? "wall" : ""}`}
            >
              {cell === "goal" ? (
                <span className="absolute top-1/2 left-1/2 size-3/5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-accent" />
              ) : null}
              {cell === "start" ? (
                <span className="absolute top-1/2 left-1/2 h-3/5 w-3/5 -translate-x-1/2 -translate-y-1/2 rounded-sm bg-accent" />
              ) : null}
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm">Turn, then walk around the wall.</p>
      </div>
    </aside>
  );
}
