import { createFileRoute } from "@tanstack/react-router";
import { allPaths } from "@/content";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const origin = new URL(request.url).origin;
        const urls = allPaths()
          .map(
            (path) =>
              `  <url><loc>${origin}${path}</loc><lastmod>2026-11-09</lastmod><changefreq>monthly</changefreq></url>`,
          )
          .join("\n");
        const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
        return new Response(body, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
