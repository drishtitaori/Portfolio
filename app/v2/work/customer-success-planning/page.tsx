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
import Reframe from "@/components/diagrams/Reframe";

const SLUG = "customer-success-planning";
const study = bySlug(SLUG)!;
const { prev, next } = neighbours(SLUG);

export const metadata: Metadata = {
  title: study.title,
  description: study.hook,
  alternates: { canonical: "/work/customer-success-planning/" },
};

export default function Page() {
  return (
    <>
      <WorkSchema study={study} />
      <StudyHeader
        slug={SLUG}
        team="Product management, UX research, customer success leadership, engineering"
        contribution="End-to-end design: discovery, framing, workshop facilitation, MVP definition, and the shipped experience. I ran the JTBD interviews jointly with a UX researcher, who owned the study design and analysis rigour."
      />

      <div className="frame">
        <Reveal>
          <Section label="01" title="The ask was a solution wearing a problem’s clothes">
            <p>
              “Build a customer success planning tool for mid-market
              customers.” That was the brief. It arrived with executive backing,
              a rough timeline, and no definition of a success plan.
            </p>
            <p>
              I asked six people what a success plan was and got six answers. A
              shared document. A quarterly business review deck. A field in the CRM
              that nobody filled in. A checklist for onboarding. An account strategy.
              A renewal forecast. Every one of those was a different product.
            </p>
            <p>
              A brief that vague usually gets handled one of two ways: build the
              intersection of everyone’s definition, which produces something no
              one uses, or pick the loudest stakeholder’s definition and hope.
              I didn’t want either, and I said so — which meant I had to come
              back with something better than an objection.
            </p>

            <PullQuote>
              Nobody was wrong about what a success plan was. They were describing
              different moments in the same broken loop.
            </PullQuote>
          </Section>
        </Reveal>

        <Reveal>
          <Section label="02" title="Six weeks of asking what the job actually was">
            <p>
              I ran jobs-to-be-done discovery with a UX researcher —{" "}
              <Fill>[n]</Fill> interviews across customer success managers, account
              teams, and <Fill>[n]</Fill> mid-market customers themselves. That last
              group mattered disproportionately, because everyone internally was
              designing a tool for CSMs and nobody had asked what the customer got
              out of a success plan.
            </p>
            <p>
              The finding that changed the project: <strong>the plan was never the
              point</strong>. Every CSM we spoke to could produce a success plan
              document. Almost none could point to a moment where the document
              changed a customer’s behaviour. What did change behaviour was the
              conversation the document forced — the one where a CSM and a customer
              sat down and disagreed out loud about what success meant, and left with
              a shared answer.
            </p>
            <p>
              The plans were failing because they were being written <em>at</em>
              customers, not <em>with</em> them. Building a better document editor
              would have made that faster and no more effective.
            </p>

            <Wide
              label="Reframe · the brief I argued for"
              caption="This diagram is the case study. Everything downstream — scope, MVP, what we cut — follows from the right-hand column."
            >
              <Reframe
                before="Build a tool for CSMs to author and store customer success plans."
                beforeConsequences={[
                  "Feature set converges on a document editor with templates and reminders.",
                  "Success metric becomes plans created — which we can hit while changing nothing.",
                  "Customer never sees the artifact. The loop stays one-sided.",
                  "Competes with the tools CSMs already use, and loses.",
                ]}
                after="Help a CSM and a customer reach a written agreement about what success means, and make that agreement hard to ignore for the next twelve months."
                afterConsequences={[
                  "Feature set converges on the shared conversation: joint definition, visible commitments, scheduled revisits.",
                  "Success metric becomes plans that are revisited and updated — a behaviour that actually correlates with renewal.",
                  "Customer is a participant, so the artifact has a second reader who can hold it to account.",
                  "Doesn’t compete with the CRM. Sits in the gap the CRM was never for.",
                ]}
              />
            </Wide>

            <Callout kind="decision" title="I brought the reframe as a question, not a conclusion">
              <p>
                Telling a room with executive backing that their brief is wrong is a
                fast way to be excluded from the decision. I presented the finding as
                a fork — here are two products we could build, here is the evidence
                for each, here is what each one costs — and let the room pick.
              </p>
              <p>
                They picked the reframe. I’m fairly sure they would have rejected
                the same content delivered as a verdict.
              </p>
            </Callout>
          </Section>
        </Reveal>

        <Reveal>
          <Section label="03" title="Making the disagreement happen in a room instead of in the backlog">
            <p>
              The reframe was accepted in principle and immediately started drifting
              back in practice, because “shared agreement” is abstract and
              “add a template picker” is concrete. So I ran design-thinking
              workshops with product, customer success leadership, and engineering to
              force the specifics.
            </p>
            <p>
              The structure that worked: I didn’t open with ideation. I opened
              with the interview evidence, then a single exercise — write the sentence
              a customer would say twelve months after using this well. People wrote
              wildly different sentences. That gap, visible on a wall, did more to
              produce alignment than any amount of me explaining the reframe.
            </p>

            <Figure
              shot="A workshop artifact — the wall of ‘what the customer would say in twelve months’ sentences, clustered. Redact company and customer names. This is worth including even as a photo of sticky notes; it’s evidence of facilitation, not craft."
              ratio="16 / 9"
              caption="Shot list placeholder."
            />

            <p>
              We left with three things I could design against: a definition of a
              success plan we all shared, a ranked list of the moments in the loop
              that mattered most, and — most useful — an explicit list of what this
              product was <em>not</em>.
            </p>
          </Section>
        </Reveal>

        <Reveal>
          <Section label="04" title="Storyboards, not screens">
            <p>
              For the MVP I deliberately produced storyboards rather than high
              fidelity comps, and had to defend that choice more than once.
            </p>
            <p>
              The reasoning: the risk on this project was never visual or
              interaction-level. It was whether the sequence of moments held together
              over a twelve-month relationship — does the revisit actually happen,
              does the customer show up, does the commitment survive a change of
              contact. Comps can’t interrogate that. A storyboard spanning four
              quarters can, and it can be argued with by people who don’t read
              interfaces fluently — which described most of the stakeholders whose
              agreement I needed.
            </p>

            <Callout kind="honest" title="Where that backfired">
              <p>
                Engineering needed screens sooner than I gave them. My storyboards
                were persuasive to leadership and under-specified for the team
                building it, and there was a stretch around{" "}
                <Fill>[when]</Fill> where they were blocked on decisions I
                hadn’t made yet.
              </p>
              <p>
                What I’d do now: run both tracks in parallel from week one, and
                accept that a storyboard for stakeholders and a spec for engineers
                are two deliverables, not one artifact used twice.
              </p>
            </Callout>

            <Figure
              shot="Two or three storyboard frames from the twelve-month arc — ideally the joint definition moment and the quarterly revisit. Line-art or low-fidelity is fine and arguably better here."
              ratio="16 / 9"
              caption="Shot list placeholder."
            />
          </Section>
        </Reveal>

        <Reveal>
          <Section label="05" title="The scope argument">
            <p>
              MVP definition was the hardest week. Here is the ledger, including the
              cut I regret.
            </p>

            <Ledger
              columns={["Decision", "What we did", "Reasoning"]}
              rows={[
                [
                  "Joint definition of success",
                  "Shipped",
                  "The core of the reframe. Without a customer-visible, customer-editable definition, this becomes a document editor again.",
                ],
                [
                  "Scheduled revisit with a visible history",
                  "Shipped",
                  "The mechanism that makes the agreement hard to ignore. Also the behaviour we could measure honestly.",
                ],
                [
                  "Template library",
                  "Cut",
                  "Highest-demand request from CSMs, and the thing most likely to pull the product back toward authoring. We shipped two rigid starting structures instead of a library.",
                ],
                [
                  "Automated health-score integration",
                  "Deferred",
                  "Genuinely valuable and genuinely a different project. Bolting a score onto an unproven loop would have made both harder to evaluate.",
                ],
                [
                  "Customer-side notifications",
                  "Cut — and I was wrong",
                  "I cut this to protect scope. Without it, the revisit relied entirely on the CSM remembering. That was the weakest link in the loop and I removed its only support.",
                ],
              ]}
            />
          </Section>
        </Reveal>

        <Reveal>
          <Section label="06" title="What launched, and what the numbers are worth">
            <p>
              It shipped in July 2025. First year post-launch, the cohort using it
              showed 71.8% retention and a 19.2% renewal rate.
            </p>

            <Callout kind="honest" title="Read those numbers carefully — I do">
              <p>
                Retention and renewal in mid-market are shaped by pricing, account
                management, product roadmap, macro conditions, and the specific
                humans on the account. This tool is one input among many, and the
                cohort was not randomly assigned — accounts that got a success plan
                were, by definition, accounts someone had decided to invest in.
                That is selection bias, and it points in the flattering direction.
              </p>
              <p>
                <strong>The number I’d actually defend:</strong> the rate at
                which plans were revisited rather than written once and abandoned,
                which was <Fill>[figure]</Fill>. That is the behaviour the reframe
                predicted, it is directly downstream of a design decision, and it is
                measurable without a control group. If I could only keep one metric
                from this project, it would be that one — not the retention figure
                that looks better on a résumé.
              </p>
            </Callout>
          </Section>
        </Reveal>

        <Reveal>
          <Section label="07" title="What I’d do differently">
            <Ledger
              columns={["What happened", "What I’d change"]}
              rows={[
                [
                  "I cut customer-side notifications to protect scope.",
                  "Protect the mechanism, cut the surface area. I trimmed the thing that made the loop work and kept things that were easier to build.",
                ],
                [
                  "Storyboards served stakeholders and starved engineering.",
                  "Two artifacts, two audiences, from week one.",
                ],
                [
                  "Success metrics were agreed after launch.",
                  "Get the team to commit to the behavioural metric — revisit rate — before build, so nobody is tempted to report the flattering lagging indicator instead.",
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
