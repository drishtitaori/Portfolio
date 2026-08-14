import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { Section, Callout, Ledger, PullQuote, Wide, Fill } from "@/components/ui";
import { pillarLabels } from "@/content/caseStudies";

export const metadata: Metadata = {
  title: "Approach",
  description:
    "How Drishti Taori works on ambiguous product problems, collaborates across functions, and contributes to design practice.",
};

export default function Page() {
  return (
    <>
      <PageHero
        label="Approach"
        title="How I work, including the parts that are inconvenient"
        lead="Written for someone deciding whether I’d be useful on their team. I’ve tried to make it specific enough to be falsifiable rather than a list of adjectives every designer claims."
      />

      <div className="frame">
        <Reveal>
          <Section label="01" title="What I’m useful for, and what I’m not">
            <Ledger
              columns={["Bring me in for", "Don’t bring me in for"]}
              rows={[
                [
                  "A problem space where the brief is still a paragraph of disagreement. Framing is the part I’m best at.",
                  "A well-specified backlog that needs execution velocity above all else. I’ll slow you down asking why.",
                ],
                [
                  "AI features where somebody needs to decide how much the system does on a person’s behalf, and what happens when it’s wrong.",
                  "Pure visual or brand expression work. My craft is solid and it isn’t my differentiator; you’d be underusing me and overpaying.",
                ],
                [
                  "Complex, high-consequence workflows — billing, licensing, enterprise tooling, anything where being wrong costs a user something real.",
                  "Consumer growth optimisation. I have no meaningful track record there and I’d be learning on your budget.",
                ],
                [
                  "A room that can’t agree, where the useful move is one artifact everyone can argue with productively.",
                  "A team that wants a designer to arrive with the answer already decided. I work by narrowing options in public.",
                ],
              ]}
            />
          </Section>
        </Reveal>

        <Reveal>
          <Section label="02" title="Four moves, in roughly this order">
            <p>
              I don’t have a process diagram. I have four moves I keep making,
              and the order matters more than the labels.
            </p>

            <div style={{ display: "grid", gap: "var(--s-5)" }}>
              <Callout kind="note" title="1 · Find out what the disagreement actually is">
                <p>
                  Ambiguous briefs are almost always the residue of an unresolved
                  argument. Before research design, I find out who disagrees with
                  whom and about what. It changes what evidence would be persuasive,
                  and occasionally reveals that the problem is organisational and no
                  amount of design will fix it — which is worth knowing in week one
                  rather than month four.
                </p>
              </Callout>

              <Callout kind="note" title="2 · Get the problem to a sentence someone can reject">
                <p>
                  Not a vision statement. A specific, falsifiable claim about what’s
                  wrong and for whom. If nobody in the room can construct a
                  counter-argument, the statement is too vague to design against.
                  This is the step teams most often skip and most often pay for.
                </p>
              </Callout>

              <Callout kind="note" title="3 · Build the smallest thing that resolves the biggest uncertainty">
                <p>
                  Usually a prototype in code, sometimes a storyboard, sometimes a
                  one-page framework. The artifact is chosen by which uncertainty is
                  most expensive, not by what stage of the process we’re
                  nominally in. A storyboard was right for a twelve-month
                  relationship; a working prototype was right for a conversational
                  interface.
                </p>
              </Callout>

              <Callout kind="note" title="4 · Decide how we’ll know, before we ship">
                <p>
                  What would prove this wrong, and is it instrumented? I’ve
                  learned this one the hard way — twice I’ve shipped work whose
                  impact I genuinely could not separate from concurrent changes, and
                  both times the fix was available months earlier and I didn’t
                  push for it.
                </p>
              </Callout>
            </div>
          </Section>
        </Reveal>

        <Reveal>
          <Section label="03" title="Working across functions">
            <p>
              Most of what I do is not drawing. It’s making decisions legible to
              people whose incentives differ from mine. Concretely:
            </p>

            <Wide label="Collaboration · what I bring to each function">
              <Ledger
                columns={["Function", "What they need from me", "What I’ve learned to do differently"]}
                rows={[
                  [
                    "Product management",
                    "Options with costs attached, not a single recommendation. And a clear read on which uncertainties are worth spending time on.",
                    "Show the option I rejected and why. PMs make better calls with the discarded branch visible, and it stops design looking like taste.",
                  ],
                  [
                    "Engineering",
                    "Specificity early on the hard cases, and honesty about what’s still undecided.",
                    "Give them a working prototype plus a list of open questions, rather than a spec that implies everything is settled. Flag the parts I’m unsure about explicitly.",
                  ],
                  [
                    "UX research",
                    "A partner, not a requester. I run sessions and read transcripts myself.",
                    "Bring my hypotheses in writing beforehand so the researcher can attack my framing before it contaminates the study.",
                  ],
                  [
                    "Data science and applied AI",
                    "Design constraints expressed in terms they can act on — thresholds, classes, failure behaviours, not adjectives.",
                    "Learn enough about how the system actually fails to argue specifically. ‘Make it more confident’ is not a design requirement; ‘do not act on this action class below this threshold’ is.",
                  ],
                  [
                    "Content design",
                    "Early involvement, because in conversational products the words are the interface.",
                    "Stop treating copy as a late-stage pass. On the agentic work, content design was in the framing conversations and the product was better for it.",
                  ],
                  [
                    "Leadership",
                    "A narrative they can repeat accurately without me in the room.",
                    "Optimise for repeatability over completeness. If a VP can’t restate the direction in two sentences, I haven’t finished the work.",
                  ],
                ]}
              />
            </Wide>

            <PullQuote>
              The test of an alignment artifact isn’t whether people nod. It’s
              whether they describe it correctly six weeks later, in a meeting you
              weren’t invited to.
            </PullQuote>
          </Section>
        </Reveal>

        <Reveal>
          <Section label="04" title="The practice, beyond my own projects">
            <p>
              At senior level a meaningful part of the job is raising the ceiling for
              people who aren’t you. What I’ve actually done, rather than
              what I’d like to claim:
            </p>

            <Ledger
              columns={["Contribution", "Detail"]}
              rows={[
                [
                  "Shared vocabulary that outlived the project",
                  "The autonomy ladder and consequence classes from the agentic work are now the standing frame for autonomy arguments across three Autodesk product teams. The next designer doesn’t have to win that argument from scratch.",
                ],
                [
                  "Speaking to the wider org",
                  "Autodesk TechX 2026 — ‘Context-Driven Dashboards in an AI-Native World’, 200+ attendees including directors, VPs, and SVPs.",
                ],
                [
                  "Customer-facing facilitation",
                  "Led customer-feedback workshops at Autodesk University in 2024, 2025, and 2026.",
                ],
                [
                  "Mentoring",
                  <>
                    <Fill>
                      [Name the specifics: how many designers, over what period,
                      formal or informal, and one concrete thing that changed for
                      them. This row is currently the weakest evidence on the page and
                      a Staff interviewer will probe it.]
                    </Fill>
                  </>,
                ],
                [
                  "Prototyping practice",
                  <>
                    <Fill>
                      [If you have shared your code-prototyping workflow with other
                      designers — a lunch-and-learn, a template, a written guide —
                      name it here. Practice improvement is a Staff-level signal and
                      this is your strongest available example.]
                    </Fill>
                  </>,
                ],
                [
                  "Design systems",
                  "Built the design system for a food-servicing platform at Fuzzy Math and the brand style guide and system for Accenture’s Data Intelligence Suite; worked inside the American Express Design Language System at enterprise scale.",
                ],
              ]}
            />
          </Section>
        </Reveal>

        <Reveal>
          <Section label="05" title="How to read the case studies">
            <p>
              Each piece is written to show specific things. If you’re
              interviewing me, these are the four I’d want you to test:
            </p>
            <Ledger
              columns={["What I’m claiming", "Where to push"]}
              rows={[
                [
                  pillarLabels.framing,
                  "Ask me about a time the reframe was wrong. It has happened; the customer success planning study is the closest thing to it on this site.",
                ],
                [
                  pillarLabels.depth,
                  "Ask why rung 03 exists in the autonomy ladder, or what breaks if you remove it. That’s where the real design thinking is.",
                ],
                [
                  pillarLabels.influence,
                  "Ask how I’ve handled being overruled. The centralised-ownership mistake in the agentic study is the honest version of that answer.",
                ],
                [
                  pillarLabels.honesty,
                  "Ask me which number on this site I trust least. I’ll tell you it’s the 91%, and I’ve written down why.",
                ],
              ]}
            />
          </Section>
        </Reveal>
      </div>
    </>
  );
}
