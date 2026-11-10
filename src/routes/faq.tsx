import { createFileRoute } from "@tanstack/react-router";
import { LongPageView } from "@/components/long-page";
import { faq } from "@/content/pages";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/faq")({
  head: () => pageHead(faq.title, faq.dek),
  component: () => <LongPageView page={faq} />,
});
