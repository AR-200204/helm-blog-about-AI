import { createFileRoute } from "@tanstack/react-router";
import { LongPageView } from "@/components/long-page";
import { terms } from "@/content/pages";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  head: () => pageHead(terms.title, terms.dek),
  component: () => <LongPageView page={terms} />,
});
