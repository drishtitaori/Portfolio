import type { Metadata } from "next";
import { bySlug, neighbours } from "@/content/caseStudies";
import StudyHeader from "@/components/StudyHeader";
import { WorkSchema } from "@/components/StructuredData";
import Reveal from "@/components/Reveal";
import {
  Section,
  Wide,
  Figure,
  Callout,
  PullQuote,
  Ledger,
  NextPrev,
  Fill,
} from "@/components/ui";
import HorizonMap, { type Horizon } from "@/components/diagrams/HorizonMap";

const SLUG = "account-experience";
const study = bySlug(SLUG)!;
const { prev, next } = neighbours(SLUG);

export const metadata: Metadata = {
  title: study.title,
  description: study.hook,
  alternates: { canonical: "/work/account-experience/" },
};

const HORIZONS: Horizon[] = [
  {
    when: "Horizon 1",
    scope: "Fundable now",
    title: "Make the current experience honest",
    bet: "Most account frustration isn’t missing capability — it’s that customers can’t find out what they already have. Fixing legibility of subscription, seat, and billing state buys trust before we ask anyone to change behaviour.",
    falsifier:
      "If support contact volume about ‘what do I own’ doesn’t fall after the change, the problem was never legibility and the rest of the vision is built on sand.",
  },
  {
    when: "Horizon 2",
    scope: "Next planning cycle",
    title: "Collapse the tasks people dread",
    bet: "The high-frustration moments are a small, known set — reassigning a seat, changing a payment method, understanding a renewal price change. Redesigning those specific flows moves satisfaction more than a broad redesign would.",
    falsifier:
      "If completion rates on those flows improve but satisfaction and renewal-related contacts don’t move, we’re optimising the wrong moments.",
  },
  {
    when: "Horizon 3",
    scope: "Directional",
    title: "The account that manages itself",
    bet: "Once state is legible and the hard tasks are cheap, the account experience can become proactive rather than a place you visit when something is wrong.",
    falsifier:
      "If customers don’t act on proactive prompts in Horizon 2’s smaller experiments, this horizon is a fantasy and should be cut rather than carried.",
  },
];

export default function Page() {
  return (
    <>
      <WorkSchema study={study} />
      <StudyHeader
        slug={SLUG}
        team="UX design, content design, product management, research; senior stakeholders across SMB, billing, and web"
        contribution="On the vision: I co-led the six-week effort with UX and content design, and owned the narrative structure and the horizon decomposition. On execution: I lead end-to-end design for the SMB signed-in account portal and the experiment sequence within it."
      />

      <div className="frame">
        <Reveal>
          <Section label="01" title="Everyone agreed it was broken. That was the problem.">
            <p>
              Autodesk’s signed-in account experience — where customers manage
              subscriptions, seats, billing, and their own product access — had
              accumulated the way these surfaces always do. Different teams had built
              adjacent things over years, each reasonably, and the result was a
              customer having to know which door to enter.
            </p>
            <p>
              Universal agreement that something is broken sounds like a good
              starting position. It isn’t. It means every stakeholder has already
              privately decided what the fix is, and none of those fixes are the same
              size. Billing wanted consolidation. SMB wanted self-service. Web wanted
              a coherent information architecture. Support wanted fewer contacts. Each
              would have produced a defensible and completely different roadmap.
            </p>

            <PullQuote>
              Vision work isn’t about generating a better idea than the room has.
              It’s about building one artifact the room can disagree with
              productively.
            </PullQuote>
          </Section>
        </Reveal>

        <Reveal>
          <Section label="02" title="Six weeks, and why the constraint helped">
            <p>
              We had six weeks to something executive-ready. That is short for a
              vision, and I now think it was the most useful constraint on the
              project. Six weeks is too short to produce a comprehensive redesign,
              which meant we couldn’t hide behind volume. It forced a choice
              about what the deliverable actually needed to do.
            </p>
            <p>
              What it needed to do was resolve a disagreement. So we didn’t build
              a comp set. We built a narrative — a sequence of arguments, each with
              enough visual specificity to be concrete and not so much that people
              started reviewing the button placement.
            </p>

            <Callout kind="decision" title="Deliberately under-designed the visuals">
              <p>
                We kept the concepts at a fidelity where they read as
                “proposals” rather than “designs”. Grey-box
                layouts with real content, real numbers, real customer language.
              </p>
              <p>
                The reason is behavioural: high-fidelity work invites critique of the
                surface, and we needed critique of the direction. Every time
                we’ve shown polished comps at a vision stage, the conversation
                has gone to colour within four minutes.
              </p>
            </Callout>

            <Figure
              shot="Two or three frames from the vision narrative — grey-box concepts with real customer language. The ‘what do I own’ frame is the strongest single image. Redact account data."
              ratio="16 / 9"
              caption="Shot list placeholder."
            />
          </Section>
        </Reveal>

        <Reveal>
          <Section label="03" title="The artifact that did the work">
            <p>
              The piece that actually produced alignment wasn’t the concepts. It
              was a decomposition of the vision into three horizons, each with a
              stated bet and — the part people remembered — a stated falsifier.
            </p>
            <p>
              Naming what would prove us wrong did two things. It gave sceptical
              stakeholders somewhere to put their scepticism other than blocking the
              whole thing. And it made the vision fundable: a horizon with a
              falsifier is an experiment, and organisations know how to fund
              experiments. A vision without one is a mood board.
            </p>

            <Wide
              label="Framework · horizon decomposition"
              caption="Each horizon names the bet and what would kill it. This is what turned a vision presentation into a roadmap conversation — and what let a sceptical stakeholder agree to Horizon 1 without having to endorse Horizon 3."
            >
              <HorizonMap horizons={HORIZONS} />
            </Wide>

            <p>
              It landed. The vision shaped the long-term account roadmap, and I got
              the thing I wanted most from it: senior stakeholders who could describe
              the direction in their own words, in meetings I wasn’t in.
            </p>
          </Section>
        </Reveal>

        <Reveal>
          <Section label="04" title="Then I had to actually ship it">
            <p>
              This is the part most vision case studies skip, and it’s the part I
              find most interesting. I now lead end-to-end design for the SMB
              signed-in account portal — Horizon 1 and 2 territory — through a
              sequence of customer-facing experiments on subscription, billing, and
              account management.
            </p>
            <p>
              Small-business customers are a specific audience for this. They have no
              procurement department, no IT administrator, and no patience. The person
              changing a payment method is usually the person who runs the company,
              doing it at an inconvenient hour, already annoyed. Every ambiguity in a
              billing interface costs that person real anxiety about money.
            </p>

            <Ledger
              columns={["Experiment area", "The design question", "Status"]}
              rows={[
                [
                  "Subscription state legibility",
                  "Can a customer answer ‘what do I own, until when, and what happens next’ without contacting anyone?",
                  <>
                    Shipped and measured. Result: <Fill>[figure]</Fill>
                  </>,
                ],
                [
                  "Renewal price change comprehension",
                  "When the price changes, does the customer understand why before they get angry?",
                  <>
                    Shipped. <Fill>[figure or ‘inconclusive — say so’]</Fill>
                  </>,
                ],
                [
                  "Seat assignment for very small teams",
                  "Does an interface built for IT admins work for a five-person company where nobody is an admin?",
                  <>
                    In flight as of <Fill>[date]</Fill>
                  </>,
                ],
              ]}
              caption="Live work. Where a result is inconclusive, I’d rather write ‘inconclusive’ than pick a favourable slice of it."
            />
          </Section>
        </Reveal>

        <Reveal>
          <Section label="05" title="What vision work actually costs">
            <Callout kind="honest" title="The vision started decaying almost immediately">
              <p>
                Six weeks produced alignment. Roughly <Fill>[timeframe]</Fill> later,
                half the people who had aligned on it had changed roles, and the
                artifact had no owner. New stakeholders inherited the roadmap without
                the reasoning, which meant they inherited conclusions they
                hadn’t agreed to and quite reasonably started re-litigating.
              </p>
              <p>
                I’d treated the vision as a deliverable with an end date. It is
                closer to a piece of infrastructure that needs maintenance. What I do
                now: keep the horizon document alive as the place where the bets get
                updated as evidence arrives, and re-present it on a cadence rather
                than once. It is less satisfying than a launch and considerably more
                useful.
              </p>
            </Callout>

            <Ledger
              columns={["What happened", "What I’d change"]}
              rows={[
                [
                  "Treated the vision as a one-time deliverable.",
                  "Assign an owner and a revisit cadence before presenting it. A vision nobody maintains is a vision nobody follows.",
                ],
                [
                  "The falsifiers were written but not all instrumented.",
                  "A falsifier without a measurement plan is rhetoric. Wire up the check for each horizon as part of committing to it.",
                ],
                [
                  "Horizon 3 was the most exciting part of the presentation and the least examined.",
                  "Spend proportionally less presentation time on the far horizon. It generates enthusiasm and no decisions, and it’s where credibility leaks.",
                ],
              ]}
            />
          </Section>
        </Reveal>

        <NextPrev prev={prev} next={next} />
      </div>
    </>
  );
}
