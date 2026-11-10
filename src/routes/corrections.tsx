import { createFileRoute } from "@tanstack/react-router";
import { LongPageView } from "@/components/long-page";
import { corrections } from "@/content/pages";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/corrections")({
  head: () => pageHead(corrections.title, corrections.dek),
  component: () => <LongPageView page={corrections} />,
});
