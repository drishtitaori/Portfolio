/**
 * Site-level content. Edit this file to re-aim the whole portfolio.
 *
 * The positioning is deliberately two layers:
 *   - `thesis` is durable and role-agnostic. It’s what a generalist
 *     Senior/Staff hiring manager needs to read.
 *   - `proof` is swappable per application. It’s what makes you rare
 *     right now. Swap it for a fintech or platform role; the rest of
 *     the site still holds.
 */

export const site = {
  /**
   * Canonical origin. Used for sitemap.xml, robots.txt, and the JSON-LD
   * structured data. Change this once when you deploy - nothing else needs
   * to know the domain.
   */
  url: "https://drishtitaori.com",

  name: "Drishti Taori",
  role: "Senior Product Designer",
  location: "Seattle, WA",
  years: 6,

  // --- Layer 1: durable identity -------------------------------
  thesis: "I work in the part of a product where nobody has decided what’s right yet.",

  // --- Layer 2: current proof (swap per application) -----------
  proof:
    "Most recently: deciding how much an AI agent should do on someone’s behalf — across AutoCAD, Revit, and Fusion.",

  metaDescription:
    "Drishti Taori is a Senior Product Designer working on ambiguous, high-consequence product problems — most recently agentic and conversational AI at Autodesk.",

  // Kept narrow on purpose. Claiming five industries reads as
  // generalist; claiming depth in two reads as specialist.
  focus: ["Complex enterprise & SMB SaaS", "AI-native and agentic products"],

  intro: [
    "Six years designing products where the requirements arrive incomplete — enterprise tooling, financial workflows, and for the last three years, AI systems that act on a customer’s behalf.",
    "I do my best work at the point where a problem is still a paragraph of disagreement rather than a brief. My job there is to make it decidable: find the real constraint, put a shape on the tradeoff, and give a room of people something concrete enough to argue with.",
  ],

  contact: {
    email: "drishtitaori57@gmail.com",
    linkedin: "https://linkedin.com/in/drishti-taori",
    linkedinLabel: "linkedin.com/in/drishti-taori",
    phone: "(215) 980-9065",
    resume: "/Drishti-Taori-Resume.pdf",
  },

  nav: [
    { href: "/v2/", label: "Work" },
    { href: "/v2/approach/", label: "Approach" },
    { href: "/v2/about/", label: "About" },
  ],
};

export const currently = {
  title: "Currently",
  items: [
    {
      label: "At Autodesk",
      text: "Leading design for the signed-in account experience for small-business customers — subscription, billing, and account management.",
    },
    {
      label: "Thinking about",
      text: "How you earn the right to let software act without asking, and what the interface owes a person when it gets that wrong.",
    },
    {
      label: "Open to",
      text: "Senior and Staff product design roles on hard, ambiguous surfaces. AI-native teams especially.",
    },
  ],
};
