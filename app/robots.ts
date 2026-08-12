import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/**
 * Emitted as /robots.txt at build time.
 *
 * Deliberately open, including to AI crawlers. A portfolio's job is to be
 * found and read - and since recruiters increasingly screen with AI before a
 * human opens the page, blocking those agents would work against the whole
 * point of the site.
 */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
