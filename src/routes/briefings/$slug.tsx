import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArticleBody } from "@/components/article-body";
import { MissingPage } from "@/components/missing-page";
import { getAuthor, getBriefing, readingMinutes, relatedBriefings } from "@/content";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/briefings/$slug")({
  loader: ({ params }) => {
    const briefing = getBriefing(params.slug);
    if (!briefing) throw notFound();
    return { briefing };
  },
  head: ({ loaderData }) =>
    loaderData
      ? pageHead(loaderData.briefing.title, loaderData.briefing.dek)
      : pageHead("Briefing", "A Helm Review briefing."),
  notFoundComponent: MissingPage,
  component: BriefingPage,
});

function BriefingPage() {
  const { briefing } = Route.useLoaderData();
  const author = getAuthor(briefing.author);
  const related = relatedBriefings(briefing.slug);

  return (
    <article className="mx-auto max-w-3xl px-5 py-10">
      <p className="text-xs font-semibold tracking-widest text-oxide uppercase">{briefing.kicker}</p>
      <h1 className="mt-3 font-serif text-4xl text-ink md:text-5xl">{briefing.title}</h1>
      <p className="mt-4 text-xl text-ink">{briefing.dek}</p>
      <p className="mt-5 text-sm text-muted">
        {author ? (
          <Link to="/authors/$slug" params={{ slug: author.slug }} className="font-semibold text-ink hover:text-oxide">
            {author.name}
          </Link>
        ) : null}{" "}
        · {briefing.date} · {readingMinutes(briefing.sections)} min read
      </p>
      <ArticleBody sections={briefing.sections} />
      <aside className="mt-12 border-t border-ink pt-6">
        <h2 className="font-serif text-2xl">More from the desk</h2>
        <ul className="mt-3 divide-y divide-rule border-y border-rule">
          {related.map((item) => (
            <li key={item.slug} className="py-3">
              <Link to="/briefings/$slug" params={{ slug: item.slug }} className="font-semibold hover:text-oxide">
                {item.title}
              </Link>
              <p className="text-sm text-muted">{item.dek}</p>
            </li>
          ))}
        </ul>
      </aside>
    </article>
  );
}
