/**
 * v2 content — "Sheet"
 * ---------------------------------------------------------------------------
 * DRAFT COPY. Everything in this file is written to be replaced. It is
 * plausible rather than true: the shape, length and rhythm are right, the
 * facts are not verified. Read it as a typographic specimen, not a claim.
 *
 * Image slots are declared here with `src: null`. While src is null the
 * <Plate> component renders a labelled placeholder frame telling you the
 * exact path and pixel size to drop in. To fill one:
 *
 *   1. save the export to  public/v2/<slot>.jpg
 *   2. set  src: "/v2/<slot>.jpg"
 *
 * Nothing else needs to change.
 */

export type Slot = {
  /** File name (no extension) this image should be saved as under /public/v2 */
  slot: string;
  /** CSS aspect-ratio for the frame. Keeps layout stable before the image lands. */
  ratio: string;
  /** What this image should show. Written for you, not for the visitor. */
  note: string;
  /** Alt text, shown to screen readers once the image exists. */
  alt: string;
  /** null until you drop the file in. */
  src: string | null;
};

export type Metric = {
  value: string;
  label: string;
  /** Never ship a bare number. This is the qualifier. */
  caveat: string;
};

export type StudySection = {
  /** Mono eyebrow. Short — two words at most. */
  kind: string;
  heading: string;
  body: string[];
  image?: Slot;
  /** Rendered in rust. The thing that did not work. */
  honest?: string;
};

export type Study = {
  slug: string;
  /** Two-line display title. Split deliberately — this sets the line breaks. */
  title: [string, string];
  /** One line on the index card. States the problem, not the solution. */
  deck: string;
  org: string;
  year: string;
  role: string;
  team: string;
  duration: string;
  platform: string;
  tags: string[];
  cover: Slot;
  metrics: Metric[];
  /** The 30-second read. A hiring manager may never scroll past this. */
  brief: { situation: string; decision: string; outcome: string };
  sections: StudySection[];
};

export const profile = {
  name: "Drishti Taori",
  short: "Drishti",
  role: "Senior Product Designer",
  location: "Seattle, WA",
  years: 6,
  status: "Open to Senior & Staff roles",

  /** The masthead. Three lines, big words — this is set as display type. */
  masthead: ["Making the", "ambiguous", "decidable."],

  /** Sits under the masthead at reading size. */
  standfirst:
    "Senior product designer. Six years turning unframed problems — AI agent autonomy, enterprise billing, commercial banking — into something a room full of people can actually argue about and ship.",

  /**
   * Scroll-revealed word by word, one long sentence. Keep it one sentence.
   * Wrap a word in asterisks to set it in volt — one word, not a phrase.
   */
  thesis:
    "I work at the point where a problem is still a paragraph of disagreement rather than a brief, and my job there is to make it *decidable* — find the real constraint, put a shape on the tradeoff, and hand the room something concrete enough to be wrong about.",

  clients: [
    "Autodesk",
    "American Express",
    "Accenture",
    "Amtrak",
    "Fuzzy Math",
    "Comcast",
  ],

  portrait: {
    slot: "portrait",
    ratio: "4 / 5",
    note: "Portrait. Shoulders-up, plain background, looking at camera.",
    alt: "Drishti Taori",
    src: null,
  } satisfies Slot,

  impact: [
    {
      value: "91",
      suffix: "%",
      label: "Resolved without a human",
      caveat: "Agentic support, three products, first two quarters",
    },
    {
      value: "3",
      suffix: "",
      label: "Products, one autonomy policy",
      caveat: "AutoCAD · Revit · Fusion",
    },
    {
      value: "42",
      suffix: "%",
      label: "Fewer billing support tickets",
      caveat: "Self-serve subscription redesign, 6 months post-launch",
    },
    {
      value: "200",
      suffix: "+",
      label: "Attendees at my internal talk",
      caveat: "Directors through SVP",
    },
  ],

  /** How I work. Three positions, not twelve values. */
  practice: [
    {
      title: "Framing before pixels",
      body: "Most briefs I get are a symptom with a solution already attached. The first two weeks are usually spent proving the brief wrong, cheaply, before anyone has drawn a screen.",
    },
    {
      title: "Design the policy, not the screen",
      body: "On AI surfaces the interesting decisions aren't visual. How much can the system do unasked? What does it owe you when it's wrong? I write those as rules first, then the interface falls out of them.",
    },
    {
      title: "Numbers with their caveats attached",
      body: "Every metric on this site has a qualifier under it. Baselines move, launches confound each other, and a number without its limits is a liability in a design review.",
    },
  ],

  contact: {
    email: "drishtitaori57@gmail.com",
    linkedin: "https://linkedin.com/in/drishti-taori",
    linkedinLabel: "in/drishti-taori",
    resume: "/Drishti-Taori-Resume.pdf",
  },
};

export const studies: Study[] = [
  {
    slug: "agent-autonomy",
    title: ["How much should", "the agent decide?"],
    deck: "Three CAD products were each inventing their own answer to the same question. I wrote the one they'd all share.",
    org: "Autodesk",
    year: "2025",
    role: "Design lead",
    team: "2 designers, 6 engineers, 1 PM, 1 researcher",
    duration: "9 months",
    platform: "AutoCAD · Revit · Fusion",
    tags: ["Agentic AI", "Design systems", "Policy design"],
    cover: {
      slot: "agent-autonomy-cover",
      ratio: "16 / 10",
      note: "Hero: the autonomy control in situ inside AutoCAD. Wide crop.",
      alt: "The agent autonomy control shown inside AutoCAD",
      src: null,
    },
    metrics: [
      {
        value: "91%",
        label: "Instant digital resolution",
        caveat: "Across three products. No clean pre-launch baseline for Fusion.",
      },
      {
        value: "4",
        label: "Autonomy levels, shipped",
        caveat: "Down from the 9 the first draft proposed.",
      },
      {
        value: "0",
        label: "Irreversible actions taken unasked",
        caveat: "By policy. Enforced in code review, not in design.",
      },
    ],
    brief: {
      situation:
        "Three products were shipping agents in the same quarter. Each team had independently decided how much their agent could do without asking, and no two answers matched. A user moving between AutoCAD and Fusion would meet two different machines with the same name.",
      decision:
        "Rather than design a shared component, I proposed a shared policy: four named autonomy levels tied to the reversibility and blast radius of an action, not to a confidence score. Teams pick the level per action; the interface is derived from it.",
      outcome:
        "Shipped across all three products behind one rule set. The ladder is now the vocabulary teams use in planning — people argue about which level an action belongs at, which is exactly the argument I wanted them having.",
    },
    sections: [
      {
        kind: "Context",
        heading: "Three teams, three definitions of the word 'automatic'",
        body: [
          "In early 2025 the agentic roadmap arrived at three products at once. Each team had a capable model, a deadline, and no shared answer to the question that actually mattered: when is the agent allowed to just do the thing?",
          "The AutoCAD team had settled on a confidence threshold — above 85%, act. Revit required confirmation for everything, which users had already started clicking through blind. Fusion had shipped an undo-based model where the agent acted freely and offered a rollback.",
          "All three were defensible. Together they were incoherent, and the incoherence was going to land on the same customer.",
        ],
        image: {
          slot: "agent-autonomy-audit",
          ratio: "16 / 9",
          note: "The audit: three products' agent behaviours side by side, annotated.",
          alt: "Side-by-side audit of agent behaviour across three products",
          src: null,
        },
      },
      {
        kind: "Reframe",
        heading: "Confidence is the wrong axis",
        body: [
          "The confidence-threshold model fails on a simple case. An agent can be 99% sure it should delete a layer, and still be wrong in a way that costs someone a day. It can be 60% sure about a snap setting and be harmless either way.",
          "What varies isn't how sure the system is. It's what happens to you if it's wrong. So I threw out confidence as the organising axis and replaced it with two things a designer can actually reason about: can this be undone, and how far does it reach?",
          "That reframe took one diagram and about three weeks of arguing. It was the whole project.",
        ],
        image: {
          slot: "agent-autonomy-matrix",
          ratio: "4 / 3",
          note: "Consequence matrix: reversibility on one axis, blast radius on the other.",
          alt: "A two-axis matrix plotting reversibility against blast radius",
          src: null,
        },
      },
      {
        kind: "The system",
        heading: "Four levels, one ladder",
        body: [
          "Suggest — the agent surfaces an option and waits. Draft — it does the work somewhere you can inspect before it lands. Act with recall — it commits, and the undo is guaranteed and obvious. Act — it commits silently, reserved for the genuinely trivial.",
          "Every action a team wanted to automate had to be placed on the ladder, in writing, with a reason. That document turned out to be more useful than any component I made. It moved the conversation from 'does this feel too aggressive' to 'is this reversible, yes or no'.",
        ],
        image: {
          slot: "agent-autonomy-ladder",
          ratio: "16 / 9",
          note: "The four-level ladder as shipped, with an example action at each rung.",
          alt: "The four-level autonomy ladder with example actions",
          src: null,
        },
      },
      {
        kind: "Outcome",
        heading: "What shipped, and what I got wrong",
        body: [
          "All three products shipped against the ladder. Support resolution without a human reached 91% in the first two quarters, though I'd treat that number carefully — it was measured against a baseline that only AutoCAD had cleanly.",
        ],
        honest:
          "The first draft had nine levels. I was designing for completeness and it was unusable — engineers couldn't hold it in their heads, so they defaulted to the most permissive rung. Cutting it to four lost real nuance around partial actions, and we still don't have a good answer for an agent that's halfway through a multi-step operation when a user interrupts it.",
      },
    ],
  },

  {
    slug: "self-serve-billing",
    title: ["Billing that", "explains itself"],
    deck: "Small-business customers were calling support to find out what they'd already agreed to pay.",
    org: "Autodesk",
    year: "2024",
    role: "Lead designer",
    team: "1 designer, 8 engineers, 2 PMs",
    duration: "11 months",
    platform: "Web · Signed-in account",
    tags: ["Enterprise SaaS", "Subscription", "Service design"],
    cover: {
      slot: "billing-cover",
      ratio: "16 / 10",
      note: "Hero: the redesigned subscription overview. Wide crop, real data.",
      alt: "The redesigned subscription overview screen",
      src: null,
    },
    metrics: [
      {
        value: "42%",
        label: "Fewer billing contacts",
        caveat: "Six months post-launch. A pricing change shipped in the same window.",
      },
      {
        value: "3.1×",
        label: "Self-serve seat changes",
        caveat: "Against a low base — the old flow was nearly unusable.",
      },
      {
        value: "-64%",
        label: "Time to find renewal date",
        caveat: "Moderated task, 18 participants. Small sample.",
      },
    ],
    brief: {
      situation:
        "Account management was the top driver of support contact for small-business customers, and the top question was not a problem — it was 'what am I currently paying for?'. People were phoning a human to read them their own contract.",
      decision:
        "I stopped treating this as a navigation problem. The information existed on the page; it just wasn't legible as a commitment. I rebuilt the account surface around a single plain-language statement of what you have, what it costs, and when it changes — and made every other control subordinate to that.",
      outcome:
        "Billing contacts fell 42% over six months. The caveat matters: a pricing simplification shipped in the same window and I can't cleanly separate the two effects.",
    },
    sections: [
      {
        kind: "Context",
        heading: "The most expensive question in the product",
        body: [
          "Small-business customers don't have a procurement team. The person managing the subscription is usually the person doing the work, checking it between jobs, and they encounter the billing surface maybe twice a year — at renewal, and when something looks wrong.",
          "Both of those are high-anxiety moments, and the existing surface answered them with a table.",
        ],
        image: {
          slot: "billing-before",
          ratio: "16 / 9",
          note: "Before: the original account page. Annotate the three places the answer was technically present.",
          alt: "The original account page before the redesign",
          src: null,
        },
      },
      {
        kind: "Research",
        heading: "Fourteen calls, one sentence",
        body: [
          "I sat in on support calls for two weeks and listened for the sentence the agent said that ended the call. It was almost always the same shape: 'You're on X, you pay Y, it renews Z, and you can change it up to then.'",
          "That sentence was the product. Everything else on the page was infrastructure for producing it, and we had shipped the infrastructure instead.",
        ],
      },
      {
        kind: "Design",
        heading: "Say the sentence, then offer the controls",
        body: [
          "The new surface opens with that sentence, set large, in plain language, with the numbers inline. Underneath it sits a timeline of what changes and when — including the things people fear, like an automatic renewal at a higher rate.",
          "Every control on the page — add seats, change plan, cancel — is framed as an edit to that sentence, and previews how the sentence will read afterwards before you commit.",
        ],
        image: {
          slot: "billing-after",
          ratio: "16 / 9",
          note: "After: the statement-led account page, plus the change-preview state.",
          alt: "The redesigned account page showing the plain-language summary",
          src: null,
        },
      },
      {
        kind: "Outcome",
        heading: "Where it held and where it didn't",
        body: [
          "The single-statement model held up well for customers with one product on one plan, which is most of them.",
        ],
        honest:
          "It degrades badly at the top end. Customers with mixed products, staggered renewal dates and delegated admins get a statement that's three sentences long and reads worse than the table it replaced. I knew this during design and shipped anyway because that segment was under 8% of accounts — a call I'd probably still make, but it left a real group worse off and we never went back for them.",
      },
    ],
  },

  {
    slug: "commercial-banking",
    title: ["A portal three", "banks could share"],
    deck: "Every relationship manager had built their own spreadsheet because the software couldn't hold how they actually worked.",
    org: "American Express",
    year: "2022",
    role: "Product designer",
    team: "3 designers, 12 engineers",
    duration: "14 months",
    platform: "Web · Internal + client-facing",
    tags: ["Fintech", "Complex workflows", "Research"],
    cover: {
      slot: "banking-cover",
      ratio: "16 / 10",
      note: "Hero: the relationship manager dashboard. Blur any client names.",
      alt: "The commercial banking relationship manager dashboard",
      src: null,
    },
    metrics: [
      {
        value: "71%",
        label: "Of RMs abandoned their side spreadsheets",
        caveat: "Self-reported, 90 days after rollout.",
      },
      {
        value: "9",
        label: "Approval steps removed",
        caveat: "Of 23. The remaining 14 are regulatory.",
      },
    ],
    brief: {
      situation:
        "A commercial banking portal that everyone used and nobody trusted. Relationship managers kept a parallel spreadsheet for every client, because the system modelled accounts and they worked in relationships.",
      decision:
        "I argued against the requested feature — a better search — and for a change in the underlying object model, so the portal could represent a relationship as a first-class thing rather than a query across accounts.",
      outcome:
        "Shipped as a phased migration. Most RMs stopped maintaining side spreadsheets within a quarter, which was the only success metric I actually believed in.",
    },
    sections: [
      {
        kind: "Context",
        heading: "The spreadsheet is the requirements document",
        body: [
          "When every expert user has independently built the same workaround, that workaround is the spec. I asked eleven relationship managers to walk me through their spreadsheet instead of the product.",
          "They were all tracking the same six things, and the portal could show exactly none of them on one screen.",
        ],
        image: {
          slot: "banking-spreadsheets",
          ratio: "3 / 2",
          note: "The collected shadow spreadsheets, anonymised, laid out as a grid.",
          alt: "A grid of the shadow spreadsheets relationship managers had built",
          src: null,
        },
      },
      {
        kind: "Influence",
        heading: "Turning down the brief",
        body: [
          "The funded work was 'improve search'. Better search would have made it faster to assemble the spreadsheet by hand, and would have measured well.",
          "I built a clickable prototype of the alternative in a week and put it next to the funded one in a stakeholder review. Not as a proposal — as a way of making the difference in the underlying model visible to people who owned the roadmap but didn't own the model.",
        ],
        image: {
          slot: "banking-prototype",
          ratio: "16 / 9",
          note: "The two prototypes side by side as shown in the review.",
          alt: "Two prototypes compared side by side",
          src: null,
        },
      },
      {
        kind: "Outcome",
        heading: "What it cost",
        body: [
          "The model change was approved and shipped over four releases.",
        ],
        honest:
          "It cost about five months against the original plan, and for the first two releases the portal was measurably worse — half-migrated, with two ways to do everything. I underestimated how bad that interim state would be and didn't design for it at all. If I ran this again I'd spend real design time on the migration period rather than treating it as an engineering concern.",
      },
    ],
  },

  {
    slug: "conversational-assistant",
    title: ["Teaching a bot", "to say I can't"],
    deck: "A support assistant that answered everything confidently, including the things it had no business answering.",
    org: "Autodesk",
    year: "2023",
    role: "Product designer",
    team: "1 designer, 5 engineers, 1 content strategist",
    duration: "7 months",
    platform: "Web · In-product",
    tags: ["Conversational AI", "Content design", "Trust"],
    cover: {
      slot: "assistant-cover",
      ratio: "16 / 10",
      note: "Hero: the assistant mid-conversation, showing a handoff.",
      alt: "The support assistant showing a handoff to a human agent",
      src: null,
    },
    metrics: [
      {
        value: "87%",
        label: "Self-service resolution",
        caveat: "Excludes sessions that never asked a question.",
      },
      {
        value: "-31%",
        label: "Escalations reopened within 7 days",
        caveat: "The number I care about most, and the smallest sample.",
      },
    ],
    brief: {
      situation:
        "The assistant's containment rate was excellent and its reopened-ticket rate was climbing. It was resolving conversations, not problems — answering plausibly, closing the session, and sending people back three days later angrier.",
      decision:
        "I designed the escalation seam as the primary surface rather than the failure state: what the assistant knows it doesn't know, how it says so, and what it hands the human when it gives up.",
      outcome:
        "Resolution held at 87% while reopened escalations fell 31%. Confident wrong answers turned into fast honest handoffs.",
    },
    sections: [
      {
        kind: "Context",
        heading: "A good metric measuring the wrong thing",
        body: [
          "Containment — the share of conversations that end without a human — was the assistant's headline number, and it was going up. So were reopened tickets.",
          "The assistant had learned that the fastest way to end a conversation is to answer it. Nobody had told it that ending a conversation isn't the goal.",
        ],
      },
      {
        kind: "Design",
        heading: "Design the seam, not the answer",
        body: [
          "Most of the work was in the fifteen seconds around a handoff. The assistant now states what it understood, what it's unsure about, and what it's passing on — in the transcript, visible to the customer, before the human arrives.",
          "The customer doesn't have to repeat themselves, and can correct the summary before it's sent. That correction turned out to be the most-used control we shipped.",
        ],
        image: {
          slot: "assistant-seam",
          ratio: "4 / 3",
          note: "The handoff sequence: uncertainty → summary → editable → human.",
          alt: "The four steps of the assistant's handoff to a human",
          src: null,
        },
      },
      {
        kind: "Outcome",
        heading: "The honest version",
        body: [
          "Reopened escalations fell 31% over the following two quarters.",
        ],
        honest:
          "That's the smallest sample on this site and the period overlapped a staffing change in the support org. I believe the direction is right and I would not defend the magnitude. The mechanism I trust more than the number: the editable handoff summary was used in roughly a third of escalations, which is not something a customer does unless the alternative is worse.",
      },
    ],
  },
];

export const studyBySlug = (slug: string) => studies.find((s) => s.slug === slug);
