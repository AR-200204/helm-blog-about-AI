import { createFileRoute } from "@tanstack/react-router";
import { RichText } from "@/components/rich-text";
import { glossary } from "@/content";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/glossary")({
  head: () =>
    pageHead(
      "Glossary",
      "A working glossary of agent terms: tools, memory, computer use, grounding, and the words vendors blur.",
    ),
  component: GlossaryPage,
});

function GlossaryPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <p className="text-xs font-semibold tracking-widest text-oxide uppercase">Language</p>
      <h1 className="mt-3 font-serif text-5xl">Glossary</h1>
      <p className="mt-4 text-lg text-muted">
        The words the rest of the issue uses without stopping. If a vendor uses one differently, prefer this page.
      </p>
      <ul className="mt-6 flex flex-wrap gap-2">
        {glossary.map((entry) => (
          <li key={entry.slug}>
            <a
              href={`#${entry.slug}`}
              className="inline-flex min-h-11 items-center border border-rule bg-card px-3 text-sm font-semibold hover:border-ink"
            >
              {entry.term}
            </a>
          </li>
        ))}
      </ul>
      <div className="article mt-10 flex flex-col gap-8">
        {glossary.map((entry) => (
          <section key={entry.slug} id={entry.slug} className="border-t border-rule pt-6">
            <h2 className="font-serif text-3xl">{entry.term}</h2>
            <p className="mt-3 max-w-prose text-lg">
              <RichText text={entry.body} />
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}
