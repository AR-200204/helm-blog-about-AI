import { createFileRoute } from "@tanstack/react-router";
import { LongPageView } from "@/components/long-page";
import { disclosure } from "@/content/pages";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/disclosure")({
  head: () => pageHead(disclosure.title, disclosure.dek),
  component: () => <LongPageView page={disclosure} />,
});
