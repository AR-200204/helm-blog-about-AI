import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArticleBody } from "@/components/article-body";
import { MissingPage } from "@/components/missing-page";
import {
  composite,
  getAgent,
  getAuthor,
  readingMinutes,
  relatedAgents,
  topics,
} from "@/content";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/agents/$slug")({
  loader: ({ params }) => {
    const agent = getAgent(params.slug);
    if (!agent) throw notFound();
    return { agent };
  },
  head: ({ loaderData }) =>
    loaderData
      ? pageHead(loaderData.agent.name, loaderData.agent.dek)
      : pageHead("Profile", "An agent profile from Helm Review."),
  notFoundComponent: MissingPage,
  component: AgentPage,
});

const LABELS = [
  ["task", "Task"],
  ["tools", "Tools"],
  ["reliability", "Reliability"],
  ["control", "Control"],
  ["value", "Value"],
] as const;

function AgentPage() {
  const { agent } = Route.useLoaderData();
  const author = getAuthor(agent.author);
  const topic = topics.find((item) => item.slug === agent.topic);
  const related = relatedAgents(agent.slug);

  return (
    <article className="mx-auto max-w-3xl px-5 py-10">
      <p className="text-xs font-semibold tracking-widest text-oxide uppercase">
        Rank {agent.rank} · {topic?.name}
      </p>
      <h1 className="mt-3 font-serif text-5xl text-ink md:text-6xl">{agent.name}</h1>
      <p className="mt-3 text-sm text-muted">{agent.vendor}</p>
      <p className="mt-4 text-xl text-ink">{agent.dek}</p>
      <p className="mt-5 border-l-2 border-oxide pl-4 font-serif text-2xl text-ink italic">{agent.pull}</p>
      <p className="mt-6 text-sm text-muted">
        {author ? (
          <Link to="/authors/$slug" params={{ slug: author.slug }} className="font-semibold text-ink hover:text-oxide">
            {author.name}
          </Link>
        ) : null}{" "}
        · {agent.updated} · {readingMinutes(agent.sections)} min read
      </p>

      <div className="mt-8 border border-rule bg-card p-4">
        <div className="flex items-baseline justify-between">
          <p className="text-xs font-semibold tracking-widest text-muted uppercase">Desk composite</p>
          <p className="font-serif text-4xl tabular-nums">{composite(agent).toFixed(1)}</p>
        </div>
        <ul className="mt-4 flex flex-col gap-3">
          {LABELS.map(([key, label]) => (
            <li key={key} className="grid grid-cols-12 items-center gap-3 text-sm">
              <span className="col-span-4 text-muted">{label}</span>
              <span className="col-span-6 h-1.5 bg-rule">
                <span className="block h-1.5 bg-oxide" style={{ width: `${agent.scores[key] * 10}%` }} />
              </span>
              <span className="col-span-2 text-right tabular-nums">{agent.scores[key]}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-ink">
          <span className="font-semibold">Best for. </span>
          {agent.bestFor}
        </p>
        <p className="mt-2 text-sm text-ink">
          <span className="font-semibold">Skip if. </span>
          {agent.skipIf}
        </p>
      </div>

      <ArticleBody sections={agent.sections} />

      <aside className="mt-12 border-t border-ink pt-6">
        <h2 className="font-serif text-2xl">Continue</h2>
        <ul className="mt-3 divide-y divide-rule border-y border-rule">
          {related.map((item) => (
            <li key={item.slug} className="py-3">
              <Link to="/agents/$slug" params={{ slug: item.slug }} className="font-semibold hover:text-oxide">
                {item.rank}. {item.name}
              </Link>
              <p className="text-sm text-muted">{item.dek}</p>
            </li>
          ))}
        </ul>
      </aside>
    </article>
  );
}
