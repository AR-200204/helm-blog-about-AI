import { createFileRoute, Link } from "@tanstack/react-router";
import { agents, briefings, composite, topics } from "@/content";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead(
      "Helm Review — Independent briefings on AI agents",
      "A dated desk ranking of twenty AI agents, with profiles, briefings, and the method behind the scores.",
    ),
  component: Home,
});

function Home() {
  const [lead, second, third, ...rest] = agents;
  const features = briefings.slice(0, 3);
  const more = briefings.slice(3, 7);

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <p className="text-xs font-semibold tracking-widest text-oxide uppercase">The agent desk</p>
      <h1 className="mt-3 max-w-4xl font-serif text-4xl leading-tight text-ink md:text-6xl">
        Twenty agents worth a seat. The rest can wait.
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-muted">
        Helm Review is a magazine, not a launch recap. Each profile says what the agent is hired for, where it
        fails, and how a cautious team would try it. Scores are judgments. The date is 9 November 2026.
      </p>

      <div className="mt-10 grid gap-10 border-t border-ink pt-8 lg:grid-cols-12">
        <article className="lg:col-span-7">
          <p className="text-xs font-semibold tracking-widest text-oxide uppercase">Rank {lead.rank}</p>
          <h2 className="mt-2 font-serif text-4xl text-ink">
            <Link to="/agents/$slug" params={{ slug: lead.slug }} className="hover:text-oxide">
              {lead.name}
            </Link>
          </h2>
          <p className="mt-3 max-w-prose text-lg text-ink">{lead.dek}</p>
          <p className="mt-4 max-w-prose border-l-2 border-oxide pl-4 font-serif text-xl text-ink italic">
            {lead.pull}
          </p>
          <Link
            to="/agents/$slug"
            params={{ slug: lead.slug }}
            className="mt-6 inline-flex min-h-11 items-center text-sm font-semibold underline decoration-rule underline-offset-4 hover:decoration-oxide"
          >
            Read the profile
          </Link>
        </article>
        <ol className="flex flex-col divide-y divide-rule border-y border-rule lg:col-span-5">
          {[second, third, rest[0], rest[1]].map((agent) => (
            <li key={agent.slug} className="flex items-baseline justify-between gap-4 py-3">
              <div>
                <p className="text-xs text-muted tabular-nums">0{agent.rank}</p>
                <Link to="/agents/$slug" params={{ slug: agent.slug }} className="font-serif text-2xl hover:text-oxide">
                  {agent.name}
                </Link>
                <p className="text-sm text-muted">{agent.vendor}</p>
              </div>
              <p className="font-serif text-2xl tabular-nums">{composite(agent).toFixed(1)}</p>
            </li>
          ))}
          <li className="py-3">
            <Link to="/rankings" className="inline-flex min-h-11 items-center text-sm font-semibold text-oxide">
              The full ranking
            </Link>
          </li>
        </ol>
      </div>

      <section className="mt-14">
        <div className="flex items-end justify-between gap-4 border-b border-ink pb-2">
          <h2 className="font-serif text-3xl">Briefings</h2>
          <Link to="/briefings" className="text-sm font-semibold text-oxide">
            All briefings
          </Link>
        </div>
        <div className="mt-6 grid gap-8 md:grid-cols-3">
          {features.map((briefing) => (
            <article key={briefing.slug}>
              <p className="text-xs font-semibold tracking-widest text-oxide uppercase">{briefing.kicker}</p>
              <h3 className="mt-2 font-serif text-2xl">
                <Link to="/briefings/$slug" params={{ slug: briefing.slug }} className="hover:text-oxide">
                  {briefing.title}
                </Link>
              </h3>
              <p className="mt-2 text-sm text-muted">{briefing.dek}</p>
            </article>
          ))}
        </div>
        <ul className="mt-8 divide-y divide-rule border-y border-rule">
          {more.map((briefing) => (
            <li key={briefing.slug} className="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:justify-between">
              <Link to="/briefings/$slug" params={{ slug: briefing.slug }} className="font-semibold hover:text-oxide">
                {briefing.title}
              </Link>
              <span className="text-sm text-muted">{briefing.kicker}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14 grid gap-8 md:grid-cols-12">
        <div className="md:col-span-4">
          <h2 className="font-serif text-3xl">Desks</h2>
          <p className="mt-2 text-sm text-muted">Six ways to enter the issue, depending on the job in front of you.</p>
        </div>
        <ul className="divide-y divide-rule border-y border-rule md:col-span-8">
          {topics.map((topic) => (
            <li key={topic.slug} className="py-3">
              <Link to="/topics/$slug" params={{ slug: topic.slug }} className="font-serif text-2xl hover:text-oxide">
                {topic.name}
              </Link>
              <p className="text-sm text-muted">{topic.dek}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
