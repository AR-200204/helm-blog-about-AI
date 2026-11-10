import { createFileRoute } from "@tanstack/react-router";
import { LongPageView } from "@/components/long-page";
import { about } from "@/content/pages";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => pageHead(about.title, about.dek),
  component: () => <LongPageView page={about} />,
});
