import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { ArticleChart } from "@/components/article-chart";
import { Shell } from "@/components/shell";
import { Panel, buttonClass } from "@/components/ui";
import { getArticle, siblingArticle } from "@/lib/articles";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/articles/$slug")({ component: ArticlePage });

function ArticlePage() {
  const { slug } = Route.useParams();
  const article = getArticle(slug);
  const markRead = useProgress((state) => state.markRead);

  useEffect(() => {
    if (article) markRead(article.slug);
  }, [article, markRead]);

  if (!article) {
    return (
      <Shell>
        <div className="mx-auto max-w-3xl px-4 py-16">
          <h1 className="font-display text-3xl">That article is not on the shelf.</h1>
          <Link to="/articles" className="mt-4 inline-flex min-h-11 items-center underline">
            All articles
          </Link>
        </div>
      </Shell>
    );
  }

  const next = siblingArticle(article.slug, 1);
  const [opening, ...rest] = article.sections;

  return (
    <Shell>
      <article className="mx-auto max-w-3xl px-4 py-8 md:py-12">
        <p className="text-sm text-muted">
          <Link
            to="/articles"
            className="underline decoration-line-strong underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Articles
          </Link>
          <span>
            {" · "}
            {article.theme === "danger" ? "Danger" : article.theme === "news" ? "This week" : "Daily life"}
          </span>
          <span className="tabular-nums"> · {article.minutes} min</span>
        </p>
        <h1 className="mt-3 font-display text-4xl tracking-tight text-balance">{article.title}</h1>
        <p className="mt-4 text-lg text-muted">{article.dek}</p>
        {opening ? (
          <section className="mt-8">
            <h2 className="font-display text-2xl tracking-tight">{opening.heading}</h2>
            {opening.body.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="mt-3 max-w-2xl text-pretty">
                {paragraph}
              </p>
            ))}
          </section>
        ) : null}
        <Panel className="mt-8">
          <h2 className="font-display text-xl tracking-tight">Move the chart</h2>
          <div className="mt-4">
            <ArticleChart slug={article.slug} />
          </div>
        </Panel>
        {rest.map((section) => (
          <section key={section.heading} className="mt-8">
            <h2 className="font-display text-2xl tracking-tight">{section.heading}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="mt-3 max-w-2xl text-pretty">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
        <div className="mt-10 flex flex-wrap gap-3">
          {next ? (
            <Link to="/articles/$slug" params={{ slug: next.slug }} className={buttonClass()}>
              Next article
            </Link>
          ) : (
            <Link to="/dashboard" className={buttonClass()}>
              Open the dashboard
            </Link>
          )}
          <Link to="/articles" className={buttonClass("secondary")}>
            All articles
          </Link>
        </div>
      </article>
    </Shell>
  );
}
