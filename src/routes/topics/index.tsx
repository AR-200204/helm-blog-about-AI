import { createFileRoute, Link } from "@tanstack/react-router";
import { agentsByTopic, topics } from "@/content";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/topics/")({
  head: () =>
    pageHead("Topics", "Six desks inside Helm Review: general, coding, research, workplace, customer, and personal agents."),
  component: TopicsIndex,
});

function TopicsIndex() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <p className="text-xs font-semibold tracking-widest text-oxide uppercase">Desks</p>
      <h1 className="mt-3 font-serif text-5xl">Topics</h1>
      <p className="mt-4 text-lg text-muted">
        The ranking is one list. The work is not. Start from the job, not from the loudest launch.
      </p>
      <ul className="mt-8 divide-y divide-rule border-y border-ink">
        {topics.map((topic) => (
          <li key={topic.slug} className="py-5">
            <h2 className="font-serif text-3xl">
              <Link to="/topics/$slug" params={{ slug: topic.slug }} className="hover:text-oxide">
                {topic.name}
              </Link>
            </h2>
            <p className="mt-2 text-ink">{topic.dek}</p>
            <p className="mt-2 text-sm text-muted">{agentsByTopic(topic.slug).length} agents in this issue</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
