import { createFileRoute } from "@tanstack/react-router";
import { LongPageView } from "@/components/long-page";
import { privacy } from "@/content/pages";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () => pageHead(privacy.title, privacy.dek),
  component: () => <LongPageView page={privacy} />,
});
