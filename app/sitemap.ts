import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { studies } from "@/content/v2";

/**
 * Emitted as /sitemap.xml at build time. Static export friendly.
 *
 * Describes the main site (the current "Sheet" design at the root). The
 * previous build at /v2 is deliberately left out — it's marked noindex — so it
 * doesn't compete with these pages in search.
 */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${site.url}/`, priority: 1, changeFrequency: "monthly" },
    ...studies.map((s) => ({
      url: `${site.url}/work/${s.slug}/`,
      priority: 0.9,
      changeFrequency: "monthly" as const,
    })),
    { url: `${site.url}/about/`, priority: 0.8, changeFrequency: "monthly" },
  ];
}
