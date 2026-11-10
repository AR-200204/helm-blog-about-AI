import { ArticleBody } from "@/components/article-body";
import type { LongPage } from "@/content/pages";

export function LongPageView({ page }: { page: LongPage }) {
  return (
    <article className="mx-auto max-w-3xl px-5 py-10">
      <p className="text-xs font-semibold tracking-widest text-oxide uppercase">{page.kicker}</p>
      <h1 className="mt-3 font-serif text-4xl text-ink md:text-5xl">{page.title}</h1>
      <p className="mt-4 text-xl text-ink">{page.dek}</p>
      <p className="mt-3 text-sm text-muted">Updated {page.updated}</p>
      <ArticleBody sections={page.sections} />
    </article>
  );
}
