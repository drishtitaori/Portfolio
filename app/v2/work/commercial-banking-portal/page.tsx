import type { Metadata } from "next";
import { bySlug, neighbours } from "@/content/caseStudies";
import StudyHeader from "@/components/StudyHeader";
import { WorkSchema } from "@/components/StructuredData";
import Reveal from "@/components/Reveal";
import { Section, Figure, Callout, PullQuote, Ledger, NextPrev, Fill } from "@/components/ui";

const SLUG = "commercial-banking-portal";
const study = bySlug(SLUG)!;
const { prev, next } = neighbours(SLUG);

export const metadata: Metadata = {
  title: study.title,
  description: study.hook,
  alternates: { canonical: "/work/commercial-banking-portal/" },
};

export default function Page() {
  return (
    <>
      <WorkSchema study={study} />
      <StudyHeader
        slug={SLUG}
        team="Digital Experience team, product, engineering; design system governance at the ADLS level"
        contribution="I designed the client-access dashboard and supporting flows — status, reports, payments, statements — and ran the heuristic and workshop-based work that produced the pain point reduction. I was one designer on a large enterprise programme, not its lead."
      />

      <div className="frame">
        <Reveal>
          <Section label="01" title="Enterprise clients moving real money">
            <p>
              American Express Global Commercial Services serves corporate clients —
              the people inside a company who reconcile statements, chase payments,
              and pull reports that other people then make decisions on. I designed
              their client-access dashboard: status, reports, payments, statements.
            </p>
            <p>
              The user in this context is not exploring. They arrived with a specific
              question, usually under time pressure, usually because someone else
              asked them for a number. Any part of the interface that is
              interesting rather than legible is actively costing them.
            </p>
          </Section>
        </Reveal>

        <Reveal>
          <Section label="02" title="What I learned about trust here, and still use">
            <p>
              I came into financial services with a consumer designer’s instinct:
              reduce, simplify, hide complexity behind progressive disclosure. That
              instinct was wrong in a specific, useful way.
            </p>

            <PullQuote>
              In consumer products, showing less builds confidence. In financial
              products, showing your work does.
            </PullQuote>

            <p>
              When someone is going to be held responsible for a number, they need to
              be able to audit it. A clean summary card that hides the date range, the
              exclusions, and the last-updated timestamp isn’t simpler — it’s
              unusable, because the user can’t defend it to their own finance
              team. The design move that improved things most was consistently
              surfacing provenance: what this figure covers, when it was calculated,
              what it excludes.
            </p>
            <p>
              That principle transferred directly to designing AI experiences a few
              years later, which I didn’t expect. An agent’s answer and a
              statement figure have the same requirement — a person who will be held
              accountable for it needs to see where it came from.
            </p>

            <Figure
              shot="The client-access dashboard — ideally a state showing a report with visible provenance (date range, last updated, exclusions). Fully redact all client names and figures; this is Amex client data."
              ratio="16 / 10"
              caption="Shot list placeholder. Check with Amex/IntraEdge before publishing any real screen from this work."
            />
          </Section>
        </Reveal>

        <Reveal>
          <Section label="03" title="A design system is an argument, not a folder">
            <p>
              This work sat inside the American Express Design Language System, and
              it was the first time I’d worked at a scale where the system was
              genuinely non-negotiable.
            </p>
            <p>
              What that taught me: a design system’s value is almost entirely in
              the arguments it prevents, not the components it provides. Every hour I
              didn’t spend deciding on a table style was an hour spent on whether
              the reconciliation flow made sense. The times it hurt were the times it
              had no opinion about something genuinely novel to our domain — and the
              correct response there was to propose an addition to the system rather
              than a local exception, which is slower and the only thing that keeps a
              system honest.
            </p>
            <p>
              I also ran design-thinking workshops with the Digital Experience team
              that cut identified pain points on Client Access Reporting and Bank
              Statements by around 40%.
            </p>

            <Callout kind="honest" title="What that 40% actually was">
              <p>
                It was a reduction in <em>identified</em> pain points — a count of
                issues from a structured evaluation, re-run after changes. It is a
                measure of how much of a known list we addressed. It is not a measure
                of customer satisfaction, task time, or business outcome, and I
                didn’t have access to those.
              </p>
              <p>
                Similarly, the 30% engagement increase on the corporate products work
                is a real reported figure whose attribution I can’t verify at
                this distance. I include both because they were my results; I’d
                rather explain their limits than drop them or oversell them.
              </p>
            </Callout>
          </Section>
        </Reveal>

        <Reveal>
          <Section label="04" title="What I’d question now">
            <Ledger
              columns={["Then", "Now"]}
              rows={[
                [
                  "I optimised individual screens well and never mapped the whole reconciliation job end to end.",
                  "I’d map the job first. Several of the improvements I made were local fixes to a sequence that shouldn’t have had that many steps.",
                ],
                [
                  "I accepted the metrics I was handed without asking how they were constructed.",
                  "I’d ask what the number is a count of before I put it in a deck — which is most of why the measurement sections on this site read the way they do.",
                ],
                [
                  "I treated accessibility as a compliance check at the end.",
                  "For a product finance staff use for hours a day, it’s a core requirement, not a gate. My Fuzzy Math work on a health-services portal changed how I think about this.",
                ],
              ]}
            />

            <p className="quiet" style={{ fontSize: "var(--t-small)" }}>
              Earlier work not written up here: UX and design system for a
              food-servicing platform and an accessibility-focused heuristic
              evaluation of a health-services portal (Fuzzy Math); mobile lock-screen
              experiences at Amtrak; usability testing across 10
              medical-device test cases at Design Science Group; and
              UX for an ML-powered analytics product at Accenture, which is where I
              first worked alongside data scientists. Happy to talk through any of it.
            </p>
          </Section>
        </Reveal>

        <NextPrev prev={prev} next={next} />
      </div>
    </>
  );
}
