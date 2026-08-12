import type { ArtKind } from "@/components/KeyArt";

/**
 * Case study registry.
 *
 * Drives the homepage index, page metadata, and prev/next navigation.
 * The prose for each study lives in its own route file under
 * app/work/<slug>/page.tsx so it can embed diagrams directly.
 *
 * `pillars` is the rubric from the portfolio strategy. Every deep study
 * should visibly hit at least three. If one only hits two, it’s either
 * written wrong or shouldn’t be a deep study.
 */

export type Pillar = "framing" | "depth" | "influence" | "honesty";

export const pillarLabels: Record<Pillar, string> = {
  framing: "Problem framing",
  depth: "Systems & craft depth",
  influence: "Influence without authority",
  honesty: "Measurement honesty",
};

export type Metric = {
  value: string;
  label: string;
  /** Honest qualifier. Rendered smaller. Never ship a bare number. */
  caveat?: string;
};

/**
 * "Is it live and traceable, and if it's live, is it scaling?" is the first
 * question a design hiring manager applies to a portfolio. Give it an answer.
 */
export type LiveProduct = {
  /** Public URL of the shipped thing, if there is one. */
  url?: string;
  label: string;
  /** Set when the work shipped but the link is internal / not public. */
  note?: string;
};

/**
 * The 500-800 word decision narrative is the format hiring managers now
 * favour, and first rounds increasingly skip the portfolio walkthrough
 * entirely. So each study leads with a scannable decision brief and keeps
 * the long-form essay underneath for anyone who wants it.
 */
export type DecisionBrief = {
  situation: string;
  decision: string;
  defend: string;
  wrong: string;
};

export type CaseStudy = {
  slug: string;
  live?: LiveProduct;
  brief?: DecisionBrief;
  /** Which generated key art to show on the index. See components/KeyArt.tsx */
  art: ArtKind;
  index: string;
  kind: "deep" | "short";
  title: string;
  /** One line, on the index. Should state the problem, not the solution. */
  deck: string;
  org: string;
  role: string;
  timeframe: string;
  tags: string[];
  metrics: Metric[];
  pillars: Pillar[];
  /** Shown on the index card as the reason to click. */
  hook: string;
  readingTime: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "agentic-support",
    live: {
      label: "Autodesk Assistant, in-product assistance across AutoCAD / Revit / Fusion",
      note: "Shipped and customer-facing. Add the public URL if there is one you can link.",
    },
    brief: {
      situation:
        "Autodesk wanted in-product AI assistance across three technical products. Engineering wanted a model-confidence threshold to decide when the agent could act alone; support operations wanted approval on everything.",
      decision:
        "I refused the binary and owned the autonomy policy instead: a four-rung ladder (answer / suggest / stage / act), with the rung gated on consequence-of-being-wrong rather than model confidence alone.",
      defend:
        "The escalation redesign, which we isolated against a holdback. Consequence is classified once by humans in the action registry, never inferred by the model at runtime.",
      wrong:
        "I owned rung assignment centrally and became the bottleneck across three product teams. And I raised instrumentation too late to cleanly attribute the headline 91%.",
    },
    art: "ladder",
    index: "01",
    kind: "deep",
    title: "Deciding what the agent does alone",
    deck: "An assistant that can act needs a policy, not just a personality.",
    org: "Autodesk",
    role: "Lead product designer — in-product agentic assistance",
    timeframe: "2024 – 2026",
    tags: ["Agentic AI", "Trust & autonomy", "AutoCAD · Revit · Fusion", "Escalation design"],
    metrics: [
      {
        value: "91%",
        label: "Instant digital resolution",
        caveat: "Across the three products at rollout. Baseline and attribution below.",
      },
      {
        value: "60%",
        label: "Improvement in support effectiveness",
        caveat: "Composite internal measure — I break down what it does and doesn’t include.",
      },
      { value: "3", label: "Products, one autonomy policy" },
    ],
    pillars: ["framing", "depth", "honesty", "influence"],
    hook: "The hard part was never the chat window. It was drawing the line between what the agent resolves and what it hands to a person — and designing for the moment it draws that line wrong.",
    readingTime: "9 min",
  },
  {
    slug: "customer-success-planning",
    live: {
      label: "Customer success planning, mid-market — launched July 2025",
      note: "Internal-facing tool. Add a link or a redacted walkthrough if one can be shared.",
    },
    brief: {
      situation:
        "\u201CBuild a customer success planning tool\u201D arrived with executive backing and no definition of a success plan. Six stakeholders gave six different definitions.",
      decision:
        "I changed the brief. Six weeks of JTBD discovery showed the plan was never the point \u2014 the alignment conversation was. I brought that back as a fork with costs attached, not a verdict, and the room picked it.",
      defend:
        "The revisit rate \u2014 plans updated rather than written once. It is the behaviour the reframe predicted and it needs no control group.",
      wrong:
        "I cut customer-side notifications to protect scope, which removed the only support for the weakest link in the loop. And my storyboards persuaded leadership while under-specifying the build.",
    },
    art: "reframe",
    index: "02",
    kind: "deep",
    title: "A tool for a job nobody had written down",
    deck: "Everyone wanted a success planning tool. Nobody agreed what a success plan was.",
    org: "Autodesk",
    role: "Lead product designer — end to end",
    timeframe: "2024 – 2025 · launched July 2025",
    tags: ["Ambiguous problem space", "JTBD discovery", "Workshop facilitation", "MVP definition"],
    metrics: [
      {
        value: "71.8%",
        label: "Retention, first year post-launch",
        caveat: "A cohort outcome this tool contributed to — not one it caused alone.",
      },
      {
        value: "19.2%",
        label: "Renewal rate, same cohort",
        caveat: "Same caveat. Renewal is priced, sold, and supported by many teams.",
      },
      { value: "Jul 2025", label: "Shipped" },
    ],
    pillars: ["framing", "influence", "honesty"],
    hook: "Six weeks of discovery told me the artifact everyone was asking for wasn’t the thing that mattered. Changing the brief was the design work.",
    readingTime: "8 min",
  },
  {
    slug: "account-experience",
    live: {
      label: "Autodesk signed-in account experience, small business",
      note: "Customer-facing and live. Add the account portal URL if it is publicly reachable.",
    },
    brief: {
      situation:
        "Everyone agreed the signed-in account experience was broken; nobody agreed what fixed looked like. Billing, SMB, web, and support each had a different, defensible roadmap.",
      decision:
        "I built the artifact that resolved the disagreement rather than a comp set: three horizons, each with a stated bet and a stated falsifier \u2014 which turned a vision presentation into a funding conversation.",
      defend:
        "Senior stakeholders could restate the direction accurately in meetings I was not in. That was the goal, and it held.",
      wrong:
        "I treated the vision as a deliverable with an end date. It decayed as people changed roles, and the falsifiers were written but not all instrumented.",
    },
    art: "horizons",
    index: "03",
    kind: "deep",
    title: "Six weeks to a shared picture",
    deck: "Nobody disagreed the account experience was broken. Everybody disagreed about what fixed looked like.",
    org: "Autodesk",
    role: "Product designer — vision, then execution",
    timeframe: "2023 – present",
    tags: ["Product vision", "Executive alignment", "SMB", "Billing & subscription", "Experimentation"],
    metrics: [
      { value: "6 weeks", label: "Ambiguity to executive-ready vision" },
      { value: "Roadmap", label: "Vision shaped the long-term account plan" },
      {
        value: "Ongoing",
        label: "Experiment sequence in the SMB portal",
        caveat: "Live work — results are partial and I say which.",
      },
    ],
    pillars: ["influence", "framing", "depth"],
    hook: "The deliverable that aligned six stakeholders wasn’t a design. It was a sequence of arguments they could each find themselves in.",
    readingTime: "7 min",
  },
  {
    slug: "commercial-banking-portal",
    live: {
      label: "American Express Global Commercial Services client portal",
      note: "Enterprise client product. Screens are Amex client data \u2014 clear before publishing.",
    },
    brief: {
      situation:
        "Corporate clients reconciling statements and pulling reports other people make decisions on. Arriving with a specific question, under time pressure, accountable for the number.",
      decision:
        "I dropped the consumer instinct to simplify and consistently surfaced provenance instead \u2014 what a figure covers, when it was calculated, what it excludes.",
      defend:
        "That principle. It transferred directly to designing AI experiences: an agent\u2019s answer and a statement figure have the same requirement.",
      wrong:
        "I optimised screens well and never mapped the reconciliation job end to end. I also accepted the metrics I was handed without asking how they were constructed.",
    },
    art: "provenance",
    index: "04",
    kind: "short",
    title: "Trust in a financial workflow",
    deck: "Enterprise clients moving real money have a specific relationship with uncertainty.",
    org: "American Express",
    role: "UX designer — Global Commercial Services",
    timeframe: "2021 – 2022",
    tags: ["Financial services", "Complex workflow", "Design system", "Enterprise dashboard"],
    metrics: [
      { value: "+30%", label: "Increase in user engagement" },
      { value: "−40%", label: "Reduction in identified pain points", caveat: "On Client Access Reporting and Bank Statements specifically." },
    ],
    pillars: ["depth"],
    hook: "Where I learned that in financial products, showing your work beats showing less — and that a design system is an argument about consistency, not a folder of components.",
    readingTime: "4 min",
  },
  {
    slug: "working-with-ai",
    live: {
      label: "This site \u2014 hand-built in Next.js and CSS, AI-assisted",
      note: "The clearest live artifact of the prototyping claim. Also link the TechX talk if it can be shared.",
    },
    brief: {
      situation:
        "Every team asks how a designer uses AI, and most answers are either defensive or credulous.",
      decision:
        "I keep a working ledger: I hand over work where I can evaluate output faster than I could produce it, and keep work where evaluating the output is the skill.",
      defend:
        "Reversibility is the price of autonomy. Confidence is a property of the model; consequence is a property of the world. Both are positions I have shipped against.",
      wrong:
        "I have twice gotten attached to a prototype because I built it. Sunk cost applies to your own code with surprising force.",
    },
    art: "ledger",
    index: "05",
    kind: "short",
    title: "How I actually work with AI",
    deck: "A ledger of what I hand to a model, what I refuse to, and why.",
    org: "Practice",
    role: "",
    timeframe: "Current",
    tags: ["Prototyping in code", "AI-assisted practice", "Judgment", "Speaking"],
    metrics: [
      { value: "HTML/CSS/JS", label: "Prototypes I build myself, AI-assisted" },
      { value: "200+", label: "Attendees, Autodesk TechX 2026 talk" },
    ],
    pillars: ["honesty", "depth"],
    hook: "Designing AI products and using AI tools are different skills. This is the honest version of the second one, including where it made my work worse.",
    readingTime: "5 min",
  },
];

export const bySlug = (slug: string) => caseStudies.find((c) => c.slug === slug);

export const deepStudies = caseStudies.filter((c) => c.kind === "deep");
export const shortStudies = caseStudies.filter((c) => c.kind === "short");

export function neighbours(slug: string) {
  const i = caseStudies.findIndex((c) => c.slug === slug);
  return {
    prev: i > 0 ? caseStudies[i - 1] : undefined,
    next: i >= 0 && i < caseStudies.length - 1 ? caseStudies[i + 1] : undefined,
  };
}
