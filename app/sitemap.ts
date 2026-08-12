import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { caseStudies } from "@/content/caseStudies";

/**
 * Emitted as /sitemap.xml at build time. Static export friendly.
 * Case studies rank above the about/approach pages because they carry the
 * evidence a screener is looking for.
 */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${site.url}/`, priority: 1, changeFrequency: "monthly" },
    ...caseStudies.map((c) => ({
      url: `${site.url}/work/${c.slug}/`,
      priority: c.kind === "deep" ? 0.9 : 0.7,
      changeFrequency: "monthly" as const,
    })),
    { url: `${site.url}/approach/`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${site.url}/about/`, priority: 0.8, changeFrequency: "monthly" },
  ];
}
