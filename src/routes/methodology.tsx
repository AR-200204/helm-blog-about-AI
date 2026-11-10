import { createFileRoute } from "@tanstack/react-router";
import { LongPageView } from "@/components/long-page";
import { methodology } from "@/content/pages";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/methodology")({
  head: () => pageHead(methodology.title, methodology.dek),
  component: () => <LongPageView page={methodology} />,
});
