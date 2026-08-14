import { site } from "@/content/site";
import { caseStudies, type CaseStudy } from "@/content/caseStudies";

/**
 * JSON-LD structured data.
 *
 * Roughly three quarters of recruiters now run AI-assisted screening before a
 * human opens a portfolio, so the machine's read of this site matters as much
 * as the human's. Semantic HTML gets us most of the way; this closes the gap
 * by stating the facts a parser would otherwise have to infer - role,
 * seniority, skills, employers, and one CreativeWork per case study with its
 * actual outcome attached.
 *
 * Everything here mirrors content that is already visible on the page. It is
 * a machine-readable restatement, never a hidden claim.
 */

function json(data: unknown) {
  return {
    __html: JSON.stringify(data).replace(/</g, "\\u003c"),
  };
}

export function PersonSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    description: site.metaDescription,
    url: site.url,
    email: `mailto:${site.contact.email}`,
    telephone: site.contact.phone,
    sameAs: [site.contact.linkedin],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Seattle",
      addressRegion: "WA",
      addressCountry: "US",
    },
    worksFor: { "@type": "Organization", name: "Autodesk" },
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "Thomas Jefferson University",
        description: "M.S., User Experience & Interaction Design",
      },
      {
        "@type": "CollegeOrUniversity",
        name: "MIT ADT University, Institute of Design",
        description: "B.Des, Graphic Design",
      },
    ],
    knowsAbout: [
      "Product design",
      "AI-native product design",
      "Agentic AI experience design",
      "Conversational interface design",
      "Trust and autonomy in AI systems",
      "Design systems",
      "Enterprise SaaS",
      "Billing and subscription workflows",
      "Financial services UX",
      "Prototyping in HTML, CSS and JavaScript",
      "Product vision and strategy",
      "Jobs-to-be-done discovery",
      "Workshop facilitation",
      "Design measurement and experimentation",
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={json(data)} />;
}

/** One CreativeWork per case study, with its outcome as the description. */
export function WorkSchema({ study }: { study: CaseStudy }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: study.title,
    headline: study.deck,
    abstract: study.hook,
    url: `${site.url}/v2/work/${study.slug}/`,
    author: { "@type": "Person", name: site.name, url: site.url },
    creator: { "@type": "Person", name: site.name, url: site.url },
    about: study.tags,
    keywords: study.tags.join(", "),
    // The impact delta, stated so a parser can read it without prose parsing.
    ...(study.metrics.length
      ? {
          measurementTechnique: study.metrics
            .map((m) => `${m.value} ${m.label}`)
            .join("; "),
        }
      : {}),
    ...(study.org ? { sourceOrganization: { "@type": "Organization", name: study.org } } : {}),
    ...(study.live?.url ? { workExample: { "@type": "WebSite", url: study.live.url } } : {}),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={json(data)} />;
}

/** Site-level graph on the homepage: the person plus the work index. */
export function HomeSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: `${site.name} - ${site.role}`,
    url: site.url,
    mainEntity: { "@type": "Person", name: site.name, url: site.url },
    hasPart: caseStudies.map((c) => ({
      "@type": "CreativeWork",
      name: c.title,
      url: `${site.url}/v2/work/${c.slug}/`,
      abstract: c.deck,
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={json(data)} />;
}
