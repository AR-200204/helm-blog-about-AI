import { createFileRoute } from "@tanstack/react-router";
import { searchAll } from "@/content";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === "string" ? search.q.slice(0, 80) : "",
  }),
  head: () => ({
    meta: [
      ...pageHead("Search", "Search Helm Review profiles and briefings.").meta,
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const hits = searchAll(q);

  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <p className="text-xs font-semibold tracking-widest text-oxide uppercase">Index</p>
      <h1 className="mt-3 font-serif text-5xl">Search</h1>
      <form action="/search" className="mt-6 flex gap-2">
        <label htmlFor="q" className="sr-only">
          Search
        </label>
        <input
          id="q"
          name="q"
          defaultValue={q}
          className="min-w-0 flex-1 border border-rule bg-card px-3 py-2 text-base"
        />
        <button type="submit" className="inline-flex min-h-11 items-center bg-ink px-4 text-sm font-semibold text-oxide-ink">
          Search
        </button>
      </form>
      {q.trim().length < 2 ? (
        <p className="mt-6 text-muted">Type at least two letters. Try Claude, citation, or support.</p>
      ) : hits.length === 0 ? (
        <p className="mt-6 text-ink">Nothing in this issue matches “{q}”.</p>
      ) : (
        <ul className="mt-6 divide-y divide-rule border-y border-ink">
          {hits.map((hit) => (
            <li key={hit.href} className="py-4">
              <p className="text-xs font-semibold tracking-widest text-oxide uppercase">{hit.kicker}</p>
              <a href={hit.href} className="font-serif text-2xl hover:text-oxide">
                {hit.title}
              </a>
              <p className="text-sm text-muted">{hit.dek}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
