import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MissingPage } from "@/components/missing-page";
import { byAuthor, getAuthor } from "@/content";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/authors/$slug")({
  loader: ({ params }) => {
    const author = getAuthor(params.slug);
    if (!author) throw notFound();
    return { author };
  },
  head: ({ loaderData }) =>
    loaderData
      ? pageHead(loaderData.author.name, `${loaderData.author.role} at Helm Review.`)
      : pageHead("Author", "A Helm Review byline."),
  notFoundComponent: MissingPage,
  component: AuthorPage,
});

function AuthorPage() {
  const { author } = Route.useLoaderData();
  const work = byAuthor(author.slug);

  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <p className="text-xs font-semibold tracking-widest text-oxide uppercase">{author.role}</p>
      <h1 className="mt-3 font-serif text-5xl">{author.name}</h1>
      <div className="article mt-6 flex max-w-prose flex-col gap-4">
        {author.bio.map((paragraph) => (
          <p key={paragraph.slice(0, 32)} className="text-lg">
            {paragraph}
          </p>
        ))}
      </div>
      <section className="mt-10">
        <h2 className="font-serif text-3xl">Profiles</h2>
        <ul className="mt-3 divide-y divide-rule border-y border-rule">
          {work.agents.map((agent) => (
            <li key={agent.slug} className="py-3">
              <Link to="/agents/$slug" params={{ slug: agent.slug }} className="font-semibold hover:text-oxide">
                {agent.name}
              </Link>
              <p className="text-sm text-muted">{agent.dek}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className="mt-8">
        <h2 className="font-serif text-3xl">Briefings</h2>
        <ul className="mt-3 divide-y divide-rule border-y border-rule">
          {work.briefings.map((briefing) => (
            <li key={briefing.slug} className="py-3">
              <Link to="/briefings/$slug" params={{ slug: briefing.slug }} className="font-semibold hover:text-oxide">
                {briefing.title}
              </Link>
              <p className="text-sm text-muted">{briefing.dek}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
