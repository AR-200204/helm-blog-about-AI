import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/shell";
import { articles, type Theme } from "@/lib/articles";
import { cn } from "@/lib/cn";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/articles/")({ component: ArticlesPage });

function ArticlesPage() {
  const reads = useProgress((state) => state.reads);
  const [theme, setTheme] = useState<Theme | "all">("all");
  const shown = articles.filter((article) => theme === "all" || article.theme === theme);

  return (
    <Shell>
      <div className="mx-auto max-w-5xl px-4 py-10 md:py-14">
        <p className="text-sm font-medium text-muted">For teens and adults</p>
        <h1 className="mt-2 font-display text-4xl tracking-tight">AI, danger, and daily life</h1>
        <p className="mt-3 max-w-2xl text-lg text-muted">
          {articles.length} short articles. Each one has a chart you can move. One is a news brief, with figures taken from published reports. The rest are scenarios, not a poll.
        </p>
        <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter">
          {(
            [
              ["all", "All"],
              ["news", "This week"],
              ["danger", "Dangers"],
              ["life", "Daily life"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              aria-pressed={theme === id}
              onClick={() => setTheme(id)}
              className={cn(
                "tap min-h-11 rounded-sm px-3 text-sm font-medium",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                theme === id ? "bg-accent text-accent-fg" : "border border-line-strong bg-surface text-ink",
              )}
            >
              {label}
            </button>
          ))}
        </div>
        <ol className="mt-8 divide-y divide-line border-y border-line">
          {shown.map((article) => (
            <li key={article.slug}>
              <Link
                to="/articles/$slug"
                params={{ slug: article.slug }}
                className="flex flex-col gap-1 py-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:flex-row sm:items-baseline sm:justify-between"
              >
                <span>
                  <span className="font-medium">{article.title}</span>
                  <span className="mt-1 block text-sm text-muted">{article.dek}</span>
                </span>
                <span className="shrink-0 text-sm text-muted">
                  {article.theme === "danger" ? "Danger" : article.theme === "news" ? "This week" : "Daily life"}
                  {" · "}
                  <span className="tabular-nums">{article.minutes} min</span>
                  {reads[article.slug] ? " · Read" : ""}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </Shell>
  );
}
