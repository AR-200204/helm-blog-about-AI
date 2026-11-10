import { createFileRoute, Link } from "@tanstack/react-router";
import { authors } from "@/content";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/authors/")({
  head: () => pageHead("Authors", "The Helm Review masthead: who edits the ranking and who writes each desk."),
  component: AuthorsIndex,
});

function AuthorsIndex() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <p className="text-xs font-semibold tracking-widest text-oxide uppercase">Masthead</p>
      <h1 className="mt-3 font-serif text-5xl">Authors</h1>
      <p className="mt-4 text-lg text-muted">
        Four bylines. None of them speak for a lab. The standards are on the editorial page.
      </p>
      <ul className="mt-8 divide-y divide-rule border-y border-ink">
        {authors.map((author) => (
          <li key={author.slug} className="py-5">
            <h2 className="font-serif text-3xl">
              <Link to="/authors/$slug" params={{ slug: author.slug }} className="hover:text-oxide">
                {author.name}
              </Link>
            </h2>
            <p className="text-sm text-muted">{author.role}</p>
            <p className="mt-2 max-w-prose text-ink">{author.bio[0]}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
