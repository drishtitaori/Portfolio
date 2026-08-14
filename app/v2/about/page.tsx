import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { Section, Ledger, FactList } from "@/components/ui";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name} — ${site.role} in ${site.location}.`,
};

const ROLES = [
  {
    org: "Autodesk",
    title: "Senior UX Designer, Product Design",
    when: "Aug 2022 – present",
    where: "Remote · Seattle, WA",
    what: "Conversational and agentic AI for support and presales; the signed-in account experience for small-business customers; customer success planning for mid-market.",
  },
  {
    org: "American Express (via IntraEdge)",
    title: "UX Designer",
    when: "Dec 2021 – Aug 2022",
    where: "Phoenix, AZ",
    what: "Global Commercial Services client-access portal and corporate products, inside the American Express Design Language System.",
  },
  {
    org: "Fuzzy Math",
    title: "UX Designer",
    when: "Oct 2021 – Dec 2021",
    where: "Chicago, IL",
    what: "Consultancy. UX, visual design, and a design system for a food-servicing platform; accessibility-focused heuristic evaluation of a health-services portal.",
  },
  {
    org: "Amtrak",
    title: "Customer Experience Design Intern",
    when: "Jan 2021 – May 2021",
    where: "Washington, DC",
    what: "Mobile lock-screen experiences for Android and iOS; usability testing, a COVID-19 form, and a ticket-booking flow.",
  },
  {
    org: "Design Science Group",
    title: "Design Co-op, Usability Testing",
    when: "Aug 2020 – Dec 2020",
    where: "Philadelphia, PA",
    what: "Usability testing across 10 medical-device test cases with human-factors engineers; authored compliant Instructions-for-Use.",
  },
  {
    org: "Accenture",
    title: "UX Design Analyst",
    when: "Jul 2018 – Jun 2019",
    where: "Bengaluru, India",
    what: "UX for Data Intelligence Suite, an ML-powered analytics product. Built its brand style guide and design system. Where I first worked alongside data scientists.",
  },
];

export default function Page() {
  return (
    <>
      <PageHero
        label="About"
        title="Drishti Taori"
        lead={
          <>
            {site.role} in {site.location}. Six years across enterprise tooling,
            financial workflows, and — for the last three — AI systems that act on
            a customer’s behalf.
          </>
        }
      />

      <div className="frame">
        <Reveal>
          <Section label="01" title="The short version">
            <p>
              I started in graphic design in Pune, moved into UX at Accenture working
              on an ML-powered analytics product, and then to the US for a master’s
              in User Experience and Interaction Design. The through-line since then
              has been products where the stakes are real and the requirements
              aren’t written down yet.
            </p>
            <p>
              At Autodesk I’ve spent most of the last three years on AI: an
              LLM-powered conversational assistant for support and presales, then
              in-product agentic assistance across AutoCAD, Revit, and Fusion. That
              work is where I developed the thing I care most about professionally —
              how a product earns the right to do something without asking, and what
              it owes a person when it gets that wrong.
            </p>
            <p>
              The rest of my time goes to the signed-in account experience for
              small-business customers. Less glamorous, and a genuinely good
              counterweight: nothing keeps you honest about clarity like a
              five-person company trying to understand a billing change at 11pm.
            </p>
          </Section>
        </Reveal>

        <Reveal>
          <Section label="02" title="Where I’ve worked">
            <div style={{ display: "grid", gap: "var(--s-6)" }}>
              {ROLES.map((r) => (
                <div key={r.org + r.when} style={{ display: "grid", gap: "var(--s-2)" }}>
                  <span className="label label--accent">{r.when}</span>
                  <h3 style={{ fontSize: "1.1875rem" }}>
                    {r.title} · {r.org}
                  </h3>
                  <p
                    style={{
                      fontSize: "var(--t-small)",
                      lineHeight: 1.55,
                      color: "var(--ink-secondary)",
                    }}
                  >
                    {r.what}
                  </p>
                  <span className="label">{r.where}</span>
                </div>
              ))}
            </div>
          </Section>
        </Reveal>

        <Reveal>
          <Section label="03" title="Education and recognition">
            <FactList
              items={[
                {
                  label: "M.S.",
                  value: "User Experience & Interaction Design — Thomas Jefferson University, Philadelphia · 2019–2021",
                },
                {
                  label: "B.Des",
                  value: "Graphic Design — MIT ADT University, Institute of Design, Pune · 2014–2018",
                },
                {
                  label: "Speaking",
                  value: "Autodesk TechX 2026 — ‘Context-Driven Dashboards in an AI-Native World’, 200+ attendees",
                },
                {
                  label: "Facilitation",
                  value: "Customer-feedback workshops at Autodesk University 2024, 2025, 2026",
                },
                {
                  label: "Recognition",
                  value: "Nominated for Autodesk’s ‘Trend Setter’ award as a Senior Designer",
                },
              ]}
            />
          </Section>
        </Reveal>

        <Reveal>
          <Section label="04" title="What I’m looking for">
            <Ledger
              columns={["I’m looking for", "Specifically"]}
              rows={[
                [
                  "Senior or Staff IC product design",
                  "A role where framing ambiguous problems is the expectation, not a thing I have to justify spending time on.",
                ],
                [
                  "Problems with real consequence",
                  "Enterprise tooling, financial and billing workflows, AI systems that act. Products where being wrong costs a user something they care about.",
                ],
                [
                  "A team that measures things",
                  "I’d rather work somewhere that argues about attribution than somewhere that reports whatever number went up.",
                ],
                [
                  "Engineers I can prototype alongside",
                  "The best work I’ve done came from short loops with engineers who were willing to argue with me early.",
                ],
              ]}
            />

            <p style={{ marginBlockStart: "var(--s-6)" }}>
              The fastest way to reach me is{" "}
              <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>. My
              résumé is{" "}
              <a href={site.contact.resume} target="_blank" rel="noopener">
                here
              </a>
              , and I’m on{" "}
              <a href={site.contact.linkedin} target="_blank" rel="noopener">
                LinkedIn
              </a>
              .
            </p>
          </Section>
        </Reveal>
      </div>
    </>
  );
}
