import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { agents, composite, topics } from "@/content";
import type { TopicSlug } from "@/content";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/rankings")({
  head: () =>
    pageHead(
      "Top 20 AI agents",
      "The Helm Review desk ranking for November 2026: twenty AI agents, five scores each, and a tie-break you can read.",
    ),
  component: RankingsPage,
});

function RankingsPage() {
  const [topic, setTopic] = useState<TopicSlug | "all">("all");
  const visible = topic === "all" ? agents : agents.filter((agent) => agent.topic === topic);

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <p className="text-xs font-semibold tracking-widest text-oxide uppercase">Issue 11</p>
      <h1 className="mt-3 font-serif text-4xl text-ink md:text-6xl">The top 20 AI agents</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">
        Locked 9 November 2026. The number is the mean of task, tools, reliability, control, and value. Ties break
        toward the product whose work is easier to check. The argument is the{" "}
        <Link to="/methodology" className="underline decoration-rule underline-offset-4 hover:decoration-oxide">
          methodology
        </Link>
        .
      </p>
      <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter by desk">
        <FilterButton current={topic} id="all" label="All twenty" onSelect={setTopic} />
        {topics.map((item) => (
          <FilterButton key={item.slug} current={topic} id={item.slug} label={item.name} onSelect={setTopic} />
        ))}
      </div>
      <ol className="mt-8 divide-y divide-rule border-y border-ink">
        {visible.map((agent) => (
          <li key={agent.slug} className="grid gap-3 py-5 md:grid-cols-12 md:items-baseline">
            <p className="font-serif text-3xl tabular-nums text-oxide md:col-span-1">{agent.rank}</p>
            <div className="md:col-span-7">
              <h2 className="font-serif text-3xl">
                <Link to="/agents/$slug" params={{ slug: agent.slug }} className="hover:text-oxide">
                  {agent.name}
                </Link>
              </h2>
              <p className="text-sm text-muted">
                {agent.vendor} · {topics.find((item) => item.slug === agent.topic)?.name}
              </p>
              <p className="mt-2 max-w-prose text-ink">{agent.dek}</p>
            </div>
            <p className="font-serif text-4xl tabular-nums md:col-span-2 md:text-right">
              {composite(agent).toFixed(1)}
            </p>
            <p className="text-sm text-muted md:col-span-2">{agent.bestFor}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function FilterButton({
  current,
  id,
  label,
  onSelect,
}: {
  current: TopicSlug | "all";
  id: TopicSlug | "all";
  label: string;
  onSelect: (id: TopicSlug | "all") => void;
}) {
  const active = current === id;
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={() => onSelect(id)}
      className={`inline-flex min-h-11 items-center border px-3 text-sm font-semibold ${
        active ? "border-ink bg-ink text-oxide-ink" : "border-rule bg-card text-ink"
      }`}
    >
      {label}
    </button>
  );
}
