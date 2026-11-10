import { createFileRoute } from "@tanstack/react-router";
import { LongPageView } from "@/components/long-page";
import { editorial } from "@/content/pages";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/editorial")({
  head: () => pageHead(editorial.title, editorial.dek),
  component: () => <LongPageView page={editorial} />,
});
