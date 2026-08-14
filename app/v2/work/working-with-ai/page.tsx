import type { Metadata } from "next";
import { bySlug, neighbours } from "@/content/caseStudies";
import StudyHeader from "@/components/StudyHeader";
import { WorkSchema } from "@/components/StructuredData";
import Reveal from "@/components/Reveal";
import { Section, Callout, PullQuote, Ledger, NextPrev, Fill, Wide } from "@/components/ui";

const SLUG = "working-with-ai";
const study = bySlug(SLUG)!;
const { prev, next } = neighbours(SLUG);

export const metadata: Metadata = {
  title: study.title,
  description: study.hook,
  alternates: { canonical: "/work/working-with-ai/" },
};

export default function Page() {
  return (
    <>
      <WorkSchema study={study} />
      <StudyHeader
        slug={SLUG}
        team="—"
        contribution="This is a practice note rather than a project. It’s here because every team I talk to asks the question, and most answers are either defensive or credulous."
      />

      <div className="frame">
        <Reveal>
          <Section label="01" title="Two different skills that keep getting conflated">
            <p>
              Designing AI products and using AI tools are unrelated competencies
              that happen to share a noun. I do both, and the second one is the one
              people ask about in interviews, usually looking for a signal about
              whether I’ve outsourced my judgment.
            </p>
            <p>
              So here is the actual ledger. Not the aspirational version.
            </p>
          </Section>
        </Reveal>

        <Reveal>
          <Section label="02" title="What I hand to a model, and what I don’t">
            <Wide label="Practice · the ledger">
              <Ledger
                columns={["I use AI for this", "I don’t, and why"]}
                rows={[
                  [
                    "Building functional prototypes in HTML, CSS, and JavaScript — Claude Code and Cursor. This site is one of them.",
                    "Deciding what to prototype. The value is in choosing which uncertainty is worth resolving, and a model has no stake in that.",
                  ],
                  [
                    "First-pass synthesis of research notes — clustering, surfacing things I’ve under-weighted, arguing against my read.",
                    "Concluding what the research means. I read every transcript myself. A model summarising interviews will smooth exactly the odd, specific detail that turns out to be the finding.",
                  ],
                  [
                    "Interrogating my own framing. I’ll ask a model to attack a problem statement or steelman the option I rejected.",
                    "Producing the framing. The reframes on this site came from talking to customers, not from prompting.",
                  ],
                  [
                    "Volume work: variant copy, edge-case enumeration, checking a flow for states I’ve forgotten.",
                    "Judging which edge cases matter. Enumeration is cheap; prioritisation is the job.",
                  ],
                  [
                    "Writing the boring parts of documentation and specs so I spend that time on the arguable parts.",
                    "Making the argument. If I can’t write why a decision is right, I don’t understand it well enough to defend it in a review.",
                  ],
                  [
                    "Generating throwaway visual directions early, to get past my own defaults.",
                    "Final craft. Model output has a recognisable texture and hiring teams can see it. So can users.",
                  ],
                ]}
              />
            </Wide>

            <p>
              The pattern, if there is one: I hand over work where I can evaluate the
              output faster than I could produce it, and keep work where evaluating
              the output <em>is</em> the skill.
            </p>

            <PullQuote>
              The risk isn’t that a model does the work badly. It’s that it
              does the work plausibly, and plausible is much harder to catch than
              wrong.
            </PullQuote>
          </Section>
        </Reveal>

        <Reveal>
          <Section label="03" title="Why I build prototypes in code">
            <p>
              I build functional front-end prototypes myself — HTML, CSS,
              JavaScript, AI-assisted. Not because I want to be an engineer, but
              because of three things it changes:
            </p>
            <p>
              <strong>Ambiguity dies faster.</strong> A clickable thing in a browser
              settles arguments that a Figma file sustains indefinitely. Especially
              arguments about states, latency, and what happens when data is missing —
              which is most of the interesting design surface in an AI product.
            </p>
            <p>
              <strong>Conversational and agentic interfaces can’t be evaluated
              statically.</strong> You cannot judge an assistant from mockups. The
              quality lives in the turn-taking, the waiting, and the recovery. I
              can’t design that responsibly without something I can actually talk
              to.
            </p>
            <p>
              <strong>Handoff gets shorter.</strong> Engineers get a reference
              implementation and a specific set of questions instead of a spec plus a
              round of interpretation.
            </p>

            <Callout kind="honest" title="Where prototyping in code made my work worse">
              <p>
                Twice now I’ve gotten attached to a prototype because I built it.
                Sunk cost applies to your own code with surprising force, and a
                prototype that works is much harder to throw away than a mockup that
                looks nice. On <Fill>[project]</Fill> I defended a structure for
                about a week longer than the evidence supported, and I’m fairly
                confident the reason was that I’d written it.
              </p>
              <p>
                The habit I built in response: I write down what would make me
                abandon a prototype before I start building it. Same discipline as the
                falsifiers in the account vision work, applied to myself.
              </p>
            </Callout>
          </Section>
        </Reveal>

        <Reveal>
          <Section label="04" title="What I’ve concluded about designing AI products">
            <p>
              Three years of this, condensed. These are the beliefs I’d defend in
              a design review:
            </p>

            <Ledger
              columns={["Position", "Reasoning"]}
              rows={[
                [
                  "Reversibility is the price of autonomy.",
                  "An agent may act without asking in exact proportion to how cheaply a person can undo it. Every autonomy argument I’ve been in resolves faster once framed this way.",
                ],
                [
                  "Confidence is a property of the model. Consequence is a property of the world.",
                  "Gating action on confidence alone is the most common serious mistake I see in agentic products. The model has no access to what it can damage.",
                ],
                [
                  "The failure path deserves more design attention than the happy path.",
                  "The happy path is where the model earns credit. The failure path is where the product either keeps trust or loses it permanently.",
                ],
                [
                  "An AI feature’s real interface is often its undo, its provenance, and its escalation — not its input field.",
                  "Those three are what a person uses to decide whether to rely on it. The input field is where the demo happens.",
                ],
                [
                  "Personality is not trust.",
                  "A warm, apologetic assistant that can’t tell you what it doesn’t know is less trustworthy than a plain one that can.",
                ],
              ]}
            />
          </Section>
        </Reveal>

        <Reveal>
          <Section label="05" title="Talking about it">
            <p>
              I presented <em>Context-Driven Dashboards in an AI-Native World</em> at
              Autodesk TechX 2026, the company-wide technology conference — 200+
              attendees including directors, VPs, and SVPs. The argument was that
              AI-native products make most conventional dashboards worse, not better:
              once a system can answer a question directly, a wall of metrics becomes
              a tax rather than a service, and the design job shifts from displaying
              data to establishing what the person is trying to decide.
            </p>
            <p>
              I’ve also led customer-feedback workshops at Autodesk University in
              2024, 2025, and 2026, and I was nominated for Autodesk’s
              ‘Trend Setter’ award as a Senior Designer.
            </p>
            <p className="quiet" style={{ fontSize: "var(--t-small)" }}>
              If the talk recording or deck can be shared publicly, link it here — a
              recording of you presenting to VPs is worth more than any paragraph
              describing it.
            </p>
          </Section>
        </Reveal>

        <NextPrev prev={prev} next={next} />
      </div>
    </>
  );
}
