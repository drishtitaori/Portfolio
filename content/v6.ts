/**
 * Public content for v6.
 *
 * This module intentionally contains only portfolio-safe framing. It does not
 * publish private product details, metrics, dates, attendance, feedback, or
 * causal claims. Case-study pages describe the decision work and leave room
 * for a private walkthrough where additional context is appropriate.
 */

export type Slot = {
  slot: string;
  ratio: string;
  note: string;
  alt: string;
  src: string | null;
};

export type Metric = {
  value: string;
  label: string;
  caveat: string;
};

export type StudySection = {
  kind: string;
  heading: string;
  body: string[];
  image?: Slot;
  honest?: string;
};

export type Study = {
  slug: string;
  title: [string, string];
  deck: string;
  category: string;
  tint: string;
  org: string;
  year: string;
  role: string;
  team: string;
  duration: string;
  platform: string;
  tags: string[];
  cover: Slot;
  metrics: Metric[];
  brief: {
    situation: string;
    decision: string;
    outcome: string;
  };
  sections: StudySection[];
};

export type Profile = {
  name: string;
  short: string;
  role: string;
  location: string;
  years: number | null;
  status: string;
  heroTitle: string;
  heroSub: string;
  thesis: string;
  pullQuote: string;
  testimonials: Array<{ quote: string[]; name: string; role: string }>;
  clients: string[];
  portrait: Slot;
  impact: Metric[];
  practice: Array<{ title: string; body: string }>;
  contact: {
    email: string;
    linkedin: string;
    linkedinLabel: string;
    resume: string;
  };
};

export const profile: Profile = {
  name: "Drishti Taori",
  short: "Drishti",
  role: "Product Designer",
  location: "Seattle, WA",
  years: null,
  status: "Open to conversation",
  heroTitle: "I’m Drishti, a product designer focused on making complex work easier to inspect.",
  heroSub: "My public portfolio centers on AI, enterprise, and transactional workflows.",
  thesis: "I make complex systems easier to inspect, trust, and move through.",
  pullQuote: "Good product decisions make their constraints and consequences visible.",
  testimonials: [
    {
      quote: ["Drishti was a pleasure to have on our team. The curiosity, thoughtful problem-solving, and collaborative spirit she brought to her work was an asset to our UX group.", "Her willingness to explore, iterate, and seek feedback while bringing new ideas forward enhanced our team's work."],
      name: "Hope Miller Goodell",
      role: "Product Designer + UX Leader",
    },
    {
      quote: ["Drishti is both creative and imaginative. While on our team she inspired fellow team members to explore new avenues for digital interactions.", "Using human-centered design and customer research, she developed a new customer persona. Her forward-thinking capabilities and attention to detail helped the team understand evolving customer needs."],
      name: "Waves Mowatt-Kane",
      role: "CX Transformation Executive",
    },
    {
      quote: ["Drishti is an asset to any design team. I have been consistently impressed with her attitude and productivity.", "She is effective at understanding a problem statement, digesting large volumes of information, and producing designs that capture the essence of the product."],
      name: "Sachendra Yadav",
      role: "UX Leader and Design Professor",
    },
  ],
  clients: [],
  portrait: {
    slot: "portrait",
    ratio: "3 / 4",
    note: "Portfolio portrait.",
    alt: "Drishti Taori",
    src: "/v2/portrait.jpg",
  },
  impact: [],
  practice: [
    {
      title: "Frame the decision",
      body: "Make the question, constraints, and trade-offs visible before deciding how an interface should behave.",
    },
    {
      title: "Design for inspection",
      body: "Help people understand what a system is doing, what it needs from them, and how they can recover.",
    },
    {
      title: "Keep evidence in context",
      body: "Treat research, metrics, and qualitative signals as inputs with limits rather than standalone proof.",
    },
  ],
  contact: {
    email: "drishtitaori57@gmail.com",
    linkedin: "https://linkedin.com/in/drishti-taori",
    linkedinLabel: "in/drishti-taori",
    resume: "/Drishti-Taori-Resume.pdf",
  },
};

export const about = {
  kicker: "About",
  title: "Product decisions people can inspect.",
  intro: [
    "This portfolio focuses on how product decisions are framed, reviewed, and made understandable.",
    "Specific product artifacts and confidential details are reserved for a private walkthrough.",
  ],
  portrait: profile.portrait,
  ai: {
    title: "On AI systems",
    body: [
      "AI experiences need clear boundaries, understandable behavior, and meaningful human checkpoints.",
    ],
  },
  timeline: [],
  offDuty: {
    title: "Outside of work",
    body: "Personal details are kept separate from the public case-study record.",
    image: {
      slot: "about-offduty",
      ratio: "3 / 2",
      note: "Optional personal image.",
      alt: "Personal portfolio image",
      src: null,
    },
  },
  speaking: [],
};

export const v6 = {
  name: profile.name,
  thesis: profile.thesis,
  role: profile.role,
  focus: "AI, enterprise, and transactional workflows",
  meaning:
    "Drishti (दृष्टि) is a Sanskrit word for vision, sight, and perspective. Here it is a reminder to make consequences and constraints visible before asking people to trust a system.",
} as const;

export const selectedExperience = [
  { company: "Autodesk", role: "Senior UX Designer (Product Design)", dates: "2022–present", focus: "AI, account experience, and enterprise products" },
  { company: "American Express", role: "UX Designer · via IntraEdge", dates: "2021–2022", focus: "Commercial and transactional workflows" },
  { company: "Fuzzy Math", role: "UX Designer", dates: "2021", focus: "Service design and accessibility" },
  { company: "Amtrak", role: "Customer Experience Design Intern", dates: "2021", focus: "Mobile journeys and usability" },
  { company: "Design Science Group", role: "Design Co-op · Usability Testing", dates: "2020", focus: "Human factors and medical-device research" },
  { company: "Accenture", role: "UX Design Analyst", dates: "2018–2019", focus: "AI-powered products and design systems" },
] as const;

export type StartingPath = {
  id: string;
  label: string;
  description: string;
  preview: string;
  filter?: string;
  href?: string;
};

export const startingPaths: StartingPath[] = [
  {
    id: "autonomy",
    label: "I'm hiring for AI or autonomy",
    description: "Explore a decision framework for when a system should act, prepare, or ask.",
    preview: "Read: decision policy",
    filter: "AI",
    href: "/v6/work/agent-autonomy/",
  },
  {
    id: "fintech",
    label: "I need fintech or transactional work",
    description: "Explore case framing for billing, subscriptions, and transactional workflows.",
    preview: "Browse: fintech cases",
    filter: "Fintech",
  },
  {
    id: "workflows",
    label: "I'm improving an enterprise workflow",
    description: "Browse work that makes complicated tasks easier to understand and complete.",
    preview: "Browse: enterprise cases",
    filter: "Enterprise",
  },
  {
    id: "facilitation",
    label: "I want workshop or facilitation experience",
    description: "Explore facilitation and research-planning practice.",
    preview: "Read: speaking and facilitation",
    href: "#speaking",
  },
  {
    id: "evidence",
    label: "I want to discuss evidence",
    description: "Start with the decision context and discuss the available evidence in a private walkthrough.",
    preview: "See: evidence approach",
    href: "#evidence",
  },
  {
    id: "practice",
    label: "I want to know how Drishti works",
    description: "See the practical principles and case decisions behind the work.",
    preview: "Read: decision practice",
    href: "#approach",
  },
];

export type CommandItem = {
  id: string;
  label: string;
  aliases: string[];
  href?: string;
  filter?: string;
  action?: "lens";
  note: string;
};

export const commands: CommandItem[] = [
  { id: "work", label: "Browse case studies", aliases: ["work", "cases", "portfolio"], href: "#work", note: "Browse selected product design work." },
  { id: "evidence", label: "See the evidence approach", aliases: ["evidence", "context", "metrics"], href: "#evidence", note: "See how evidence is kept with its context." },
  { id: "approach", label: "See how Drishti works", aliases: ["approach", "practice", "principles", "process"], href: "#approach", note: "Read the decision practices behind the work." },
  { id: "autonomy", label: "Read the autonomy policy case", aliases: ["autonomy", "agent", "ai policy"], href: "/v6/work/agent-autonomy/", note: "Explore a framework for consequential system actions." },
  { id: "billing", label: "Read the billing case", aliases: ["billing", "subscription", "fintech"], href: "/v6/work/self-serve-billing/", note: "Explore a subscription-management decision case." },
  { id: "banking", label: "Read the banking case", aliases: ["banking", "portal", "relationship", "fintech"], href: "/v6/work/commercial-banking/", note: "See an enterprise banking workflow." },
  { id: "trust", label: "Read the support case", aliases: ["support", "assistant", "trust"], href: "/v6/work/conversational-assistant/", note: "See work on a conversational assistant." },
  { id: "marketplace", label: "Read the marketplace recommendations case", aliases: ["marketplace", "plugins", "recommendations", "assistant", "autodesk assistant"], href: "/v6/work/marketplace-recommendations/", note: "See how plugin recommendations fit account and assistant surfaces." },
  { id: "filter-ai", label: "Show AI and autonomy work", aliases: ["ai work", "agentic", "autonomy"], filter: "AI", note: "Filter the workbench to AI and autonomy cases." },
  { id: "filter-fintech", label: "Show fintech work", aliases: ["fintech", "financial", "transactional", "payments"], filter: "Fintech", note: "Filter the workbench to fintech cases." },
  { id: "lens", label: "Try the decision policy", aliases: ["policy", "review", "action"], action: "lens", note: "See when a product action deserves human review." },
  { id: "speaking", label: "Read the TechX session story", aliases: ["techx", "speaking", "workshop", "facilitation", "dashboards", "metrics", "meaning"], href: "/v6/speaking/techx/", note: "Explore the dashboard decision-support proposal." },
  { id: "au-research", label: "Read the AU research planning story", aliases: ["au", "autodesk university", "research planning", "idea exchange"], href: "/v6/speaking/au-research-planning/", note: "Explore research-planning work and proposal status." },
  { id: "customer-success", label: "Read the facilitation story", aliases: ["customer success", "discovery workshops", "facilitation", "workshop"], href: "/v6/speaking/customer-success-planning/", note: "Explore collaborative discovery and facilitation practice." },
  { id: "resume", label: "Download the résumé", aliases: ["resume", "résumé", "cv", "experience", "work history", "background"], href: profile.contact.resume, note: "Open Drishti's résumé PDF." },
  { id: "contact", label: "Start a conversation", aliases: ["contact", "email", "hire", "reach out", "get in touch"], href: `mailto:${profile.contact.email}`, note: "Email Drishti directly." },
];

export const normalizeCommand = (input: string) => {
  const normalized = input.trim().toLowerCase().replace(/[^\w\s%]/g, "").replace(/\s+/g, " ");
  if (!normalized) return [];
  return commands.filter((command) =>
    [command.label.toLowerCase(), ...command.aliases].some((phrase) => phrase.includes(normalized) || normalized.includes(phrase)),
  );
};

export const lensRecommendations = {
  "reversible-small": {
    title: "Act with an obvious undo",
    behavior: "The product can complete the action and immediately show how to reverse it.",
    checkpoint: "No approval before acting; make the undo visible where the action lands.",
    recovery: "Keep the undo available and confirm what was restored.",
  },
  "reversible-wide": {
    title: "Prepare a draft for review",
    behavior: "The product prepares the work but waits before changing a shared space.",
    checkpoint: "One person reviews what will change before it is sent or published.",
    recovery: "Discard or edit the draft without affecting anyone else.",
  },
  "irreversible-small": {
    title: "Ask before changing it",
    behavior: "The product explains the consequence and waits for a clear confirmation.",
    checkpoint: "The person affected confirms the change before it happens.",
    recovery: "Offer a support path or a compensating action when a clean undo is unavailable.",
  },
  "irreversible-wide": {
    title: "Suggest the next step",
    behavior: "The product shows a recommendation and leaves the consequential action to a person.",
    checkpoint: "A responsible person reviews the scope and chooses whether to proceed.",
    recovery: "Nothing changes until that person acts; keep the reasoning visible.",
  },
} as const;

export type ImpactMetric = {
  value: number;
  suffix: string;
  label: string;
  caveat: string;
  attribution: string;
  confidence: "high" | "moderate" | "contextual";
};

export const impact: ImpactMetric[] = [];

export type WorkshopItem = {
  context: string;
  title: string;
  body: string;
  status: "delivered" | "approved-proposal";
  attribution: string;
  href?: string;
};

export const workshopPractice: WorkshopItem[] = [
  {
    context: "Research planning",
    title: "Research planning",
    body: "Research-session proposals for subscription and account-experience questions.",
    status: "approved-proposal",
    attribution: "Status: approved proposal; delivery details are not publicly stated.",
    href: "/v6/speaking/au-research-planning/"
  },
  {
    context: "Facilitation practice",
    title: "Discovery workshops",
    body: "A public case framing facilitation as a way to make uncertain work discussable.",
    status: "delivered",
    attribution: "Collaborative discovery and facilitation practice.",
    href: "/v6/speaking/customer-success-planning/",
  },
  {
    context: "Transactional workflows",
    title: "Design-thinking workshops",
    body: "A public case framing workshops as input to workflow design.",
    status: "delivered",
    attribution: "Status: delivered practice.",
    href: "/v6/work/commercial-banking/"
  },
];

export const speakingProof = {
  techX: {
    event: "TechX",
    title: "Context-Driven Dashboards: From Metrics to Meaning",
    attendees: "Not publicly reported",
    attendeesNote: "Attendance is not published in this portfolio.",
    feedback: "Not publicly reported",
    feedbackNote: "Feedback is not published in this portfolio.",
    feedbackValue: null,
    feedbackScale: "not publicly reported",
    confidence: "public-summary" as const,
  },
} as const;

export const techXCase = {
  premise: "Dashboards do not help simply because they show more data. They help when the data has the right context for the decision a person is trying to make.",
  study: "This public summary considers how people with the same platform data may need different kinds of support for strategic planning and operational follow-through.",
  comparison: [
    {
      audience: "Strategic administrators",
      question: "What should change across the organization?",
      needs: ["Trends and benchmarks over time", "A concise narrative for leadership", "A view across teams and regions"],
    },
    {
      audience: "Operational administrators",
      question: "What needs attention today?",
      needs: ["Clear, timely signals", "A project or team-level breakdown", "A visible next step inside the workflow"],
    },
  ],
  recommendation: [
    { title: "Add contextual intelligence", body: "Pair important metrics with benchmarks, definitions, freshness, and the reason they matter." },
    { title: "Adapt the interface", body: "Use role-aware defaults and progressive disclosure so strategic and operational work each starts in the right place." },
    { title: "Connect the workflow", body: "Let insight lead into the related action instead of sending people to another reporting destination." },
  ],
  roadmap: [
    { label: "Start now", body: "Benchmark comparisons, hierarchy filters, executive summaries, and plain-language metric definitions." },
    { label: "Build toward", body: "An adaptive decision-support layer that connects planning, operational follow-through, and cross-functional data." },
  ],
  validation: [
    "Task completion and error patterns as signals of cognitive load",
    "Usability feedback about whether the information is understandable",
    "Whether people have enough context to choose a next step",
  ],
} as const;

const confidentialCase = (
  slug: string,
  title: [string, string],
  category: string,
  deck: string,
  tags: string[],
  decision: string,
): Study => ({
  slug,
  title,
  deck,
  category,
  tint: "--tint-teal",
  org: "Confidential work",
  year: "Not publicly dated",
  role: "Product design",
  team: "Not publicly stated",
  duration: "Not publicly stated",
  platform: "Not publicly stated",
  tags,
  cover: {
    slot: `${slug}-cover`,
    ratio: "16 / 10",
    note: `${title.join(" ")} image placeholder.`,
    alt: `Abstract representation of the ${title.join(" ")} case study`,
    src: null,
  },
  metrics: [],
  brief: {
    situation: "The public case summarizes a complex product-design question without disclosing confidential product details.",
    decision,
    outcome: "Public outcome details are not stated; the case is available for a contextual walkthrough.",
  },
  sections: [
    {
      kind: "Context",
      heading: "Start with the decision",
      body: [
        "This case focuses on making the underlying question, constraints, and trade-offs explicit before deciding how a product should behave.",
      ],
    },
    {
      kind: "Approach",
      heading: "Make the work inspectable",
      body: [
        "The public summary describes the decision structure rather than reconstructing confidential artifacts, product screens, or internal records.",
      ],
    },
    {
      kind: "Public record",
      heading: "Discuss the relevant context",
      body: [
        "Additional context, including the available evidence and limitations, can be discussed in a private walkthrough.",
      ],
    },
  ],
});

export const studies: Study[] = [
  confidentialCase(
    "agent-autonomy",
    ["How much should", "the system decide?"],
    "Agentic AI",
    "A decision-policy case about system action, review, and recovery.",
    ["Agentic AI", "Decision policy", "Trust"],
    "Frame action behavior around reversibility, scope, and the human checkpoint.",
  ),
  confidentialCase(
    "self-serve-billing",
    ["Billing that", "explains itself"],
    "Enterprise",
    "A subscription-management case about making commitments understandable.",
    ["Enterprise", "Subscription", "Service design"],
    "Organize the experience around clear commitments and the decisions people need to make.",
  ),
  confidentialCase(
    "commercial-banking",
    ["A portal built", "around relationships"],
    "Fintech",
    "A transactional-workflow case about representing the relationships behind account data.",
    ["Fintech", "Complex workflows", "Research"],
    "Use the work people already do to clarify the product model and workflow priorities.",
  ),
  confidentialCase(
    "conversational-assistant",
    ["Teaching a system", "to say I can’t"],
    "Conversational AI",
    "A support-assistant case about uncertainty, handoffs, and recovery.",
    ["Conversational AI", "Content design", "Trust"],
    "Treat uncertainty and handoff as core product behavior instead of an edge-case failure state.",
  ),
  {
    slug: "marketplace-recommendations",
    title: ["The right plugin,", "in the right place"],
    deck: "A recommendations case about surfacing marketplace and third-party plugins where people already work.",
    category: "AI · Marketplace",
    tint: "--tint-teal",
    org: "Autodesk",
    year: "Not publicly dated",
    role: "Product design",
    team: "Not publicly stated",
    duration: "Not publicly stated",
    platform: "Account & assistants",
    tags: ["Recommendations", "AI assistants", "Marketplace", "Trust"],
    cover: {
      slot: "marketplace-recommendations-cover",
      ratio: "16 / 10",
      note: "Marketplace recommendations image placeholder.",
      alt: "Abstract representation of plugin recommendations across Autodesk surfaces",
      src: null,
    },
    metrics: [],
    brief: {
      situation: "Marketplace plugins, including third-party ones, can extend what people do in their products, but they are easiest to act on when they appear in context.",
      decision: "Recommend plugins in Autodesk Account, Autodesk Assistant, and the in-product assistant, shaping each recommendation to the moment that surface represents.",
      outcome: "Public outcome details are not stated; the case is available for a contextual walkthrough.",
    },
    sections: [
      {
        kind: "Context",
        heading: "Start from where people already are",
        body: [
          "The question was how to bring relevant marketplace and third-party plugins into places people already use, rather than relying on them to go looking.",
          "Autodesk Account, Autodesk Assistant, and the in-product assistant each became a possible point of discovery.",
        ],
      },
      {
        kind: "Approach",
        heading: "Three surfaces, three different moments",
        body: [
          "A recommendation in an account space, in answer to a question, and in the middle of a task should not behave the same way.",
          "I treated each surface as its own context: what the person is trying to do there, how much interruption is acceptable, and what a useful next step looks like.",
        ],
      },
      {
        kind: "Trust",
        heading: "Make a recommendation, not an advertisement",
        body: [
          "Suggesting a plugin, especially from a third party, asks people to trust both the product and the recommendation.",
          "The design considered how to make clear who makes a plugin, why it is being suggested, and how to dismiss it or learn more before committing.",
        ],
      },
      {
        kind: "Public record",
        heading: "Discuss the relevant context",
        body: [
          "Product screens, recommendation logic, and outcomes are not shown publicly. They can be discussed in a private walkthrough.",
        ],
      },
    ],
  },
  {
    slug: "prototyping-practice",
    title: ["Prototype to", "learn early"],
    deck: "A design-practice case about making ideas tangible before committing to a direction.",
    category: "Design practice",
    tint: "--tint-teal",
    org: "Design practice",
    year: "Ongoing practice",
    role: "Product design",
    team: "Cross-functional collaborators",
    duration: "Varies by decision",
    platform: "Prototype tools",
    tags: ["Prototyping", "Iteration", "Collaboration"],
    cover: {
      slot: "prototyping-practice-cover",
      ratio: "16 / 10",
      note: "Prototyping practice image placeholder.",
      alt: "Abstract representation of a prototyping practice",
      src: null,
    },
    metrics: [],
    brief: {
      situation: "A team needs a shared way to explore an uncertain interaction before treating a direction as decided.",
      decision: "Use the smallest useful prototype to test assumptions, clarify behavior, and create a concrete review point.",
      outcome: "The next iteration is based on what the prototype surfaced, rather than on an abstract discussion alone.",
    },
    sections: [
      {
        kind: "Starting point",
        heading: "Frame the decision before making screens",
        body: [
          "I start by naming the decision, the open questions, and what would need to become clearer before the team can move forward.",
          "That keeps the prototype focused on learning rather than turning it into a premature final interface.",
        ],
      },
      {
        kind: "Process",
        heading: "Build the smallest useful scenario",
        body: [
          "I sketch one realistic moment in the workflow, then prototype the behavior and key states people need in order to react to it.",
          "The level of fidelity follows the question: a rough flow can test structure, while a more detailed interaction can clarify timing, language, or recovery.",
        ],
      },
      {
        kind: "Review",
        heading: "Use the prototype to make assumptions visible",
        body: [
          "I bring the prototype into conversations with teammates or users so the discussion can center on a shared artifact instead of individual interpretations.",
          "Feedback becomes specific: what is understood, where a state is missing, which assumption needs evidence, and what should change next.",
        ],
      },
      {
        kind: "Iteration",
        heading: "Capture the learning and choose the next move",
        body: [
          "After a review, I record what changed in the team’s understanding and decide whether to iterate, test a different direction, or move into delivery.",
          "The prototype remains a learning record—not proof that a design is finished.",
        ],
      },
    ],
  },
];

export const studyBySlug = (slug: string) => studies.find((study) => study.slug === slug);
