import type { Section } from "@/content";
import { AdSlot } from "@/components/ad-slot";
import { RichText } from "@/components/rich-text";

export function ArticleBody({ sections }: { sections: Section[] }) {
  return (
    <div className="article mt-8 flex flex-col gap-8">
      {sections.map((section, index) => (
        <section key={section.heading} id={slugify(section.heading)}>
          <h2 className="font-serif text-2xl text-ink md:text-3xl">{section.heading}</h2>
          <div className="mt-3 flex max-w-prose flex-col gap-4">
            {section.paragraphs.map((paragraph, paragraphIndex) => (
              <p key={paragraphIndex} className="text-lg text-ink">
                <RichText text={paragraph} />
              </p>
            ))}
          </div>
          {index === 1 ? <AdSlot /> : null}
        </section>
      ))}
    </div>
  );
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
