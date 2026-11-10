import { createFileRoute, Link } from "@tanstack/react-router";
import { briefings, readingMinutes } from "@/content";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/briefings/")({
  head: () =>
    pageHead(
      "Briefings",
      "Essays from Helm Review on buying, bounding, and refusing AI agents.",
    ),
  component: BriefingsIndex,
});

function BriefingsIndex() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <p className="text-xs font-semibold tracking-widest text-oxide uppercase">The issue</p>
      <h1 className="mt-3 font-serif text-5xl">Briefings</h1>
      <p className="mt-4 text-lg text-muted">
        Shorter than a book, longer than a thread. Each one is meant to be useful on a Tuesday.
      </p>
      <ol className="mt-8 divide-y divide-rule border-y border-ink">
        {briefings.map((briefing) => (
          <li key={briefing.slug} className="py-5">
            <p className="text-xs font-semibold tracking-widest text-oxide uppercase">{briefing.kicker}</p>
            <h2 className="mt-1 font-serif text-3xl">
              <Link to="/briefings/$slug" params={{ slug: briefing.slug }} className="hover:text-oxide">
                {briefing.title}
              </Link>
            </h2>
            <p className="mt-2 text-ink">{briefing.dek}</p>
            <p className="mt-2 text-sm text-muted">
              {briefing.date} · {readingMinutes(briefing.sections)} min
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
