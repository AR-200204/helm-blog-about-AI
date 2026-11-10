import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArticleBody } from "@/components/article-body";
import { MissingPage } from "@/components/missing-page";
import { agentsByTopic, briefingsByTopic, composite, getTopic } from "@/content";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/topics/$slug")({
  loader: ({ params }) => {
    const topic = getTopic(params.slug);
    if (!topic) throw notFound();
    return { topic };
  },
  head: ({ loaderData }) =>
    loaderData ? pageHead(loaderData.topic.name, loaderData.topic.dek) : pageHead("Topic", "A Helm Review desk."),
  notFoundComponent: MissingPage,
  component: TopicPage,
});

function TopicPage() {
  const { topic } = Route.useLoaderData();
  const seated = agentsByTopic(topic.slug);
  const notes = briefingsByTopic(topic.slug);

  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <p className="text-xs font-semibold tracking-widest text-oxide uppercase">Desk</p>
      <h1 className="mt-3 font-serif text-5xl">{topic.name}</h1>
      <p className="mt-4 text-xl text-ink">{topic.dek}</p>
      <ArticleBody sections={topic.sections} />
      <section className="mt-12">
        <h2 className="font-serif text-3xl">In the ranking</h2>
        <ol className="mt-4 divide-y divide-rule border-y border-ink">
          {seated.map((agent) => (
            <li key={agent.slug} className="flex items-baseline justify-between gap-4 py-3">
              <div>
                <Link to="/agents/$slug" params={{ slug: agent.slug }} className="font-serif text-2xl hover:text-oxide">
                  {agent.name}
                </Link>
                <p className="text-sm text-muted">{agent.vendor}</p>
              </div>
              <p className="font-serif text-2xl tabular-nums">{composite(agent).toFixed(1)}</p>
            </li>
          ))}
        </ol>
      </section>
      {notes.length > 0 ? (
        <section className="mt-10">
          <h2 className="font-serif text-3xl">Briefings</h2>
          <ul className="mt-4 divide-y divide-rule border-y border-rule">
            {notes.map((briefing) => (
              <li key={briefing.slug} className="py-3">
                <Link to="/briefings/$slug" params={{ slug: briefing.slug }} className="font-semibold hover:text-oxide">
                  {briefing.title}
                </Link>
                <p className="text-sm text-muted">{briefing.dek}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
