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
import AutonomyLadder from "@/components/diagrams/AutonomyLadder";
import ConsequenceMatrix from "@/components/diagrams/ConsequenceMatrix";
import EscalationSeam from "@/components/diagrams/EscalationSeam";
import ConfounderTimeline from "@/components/diagrams/ConfounderTimeline";

const SLUG = "agentic-support";
const study = bySlug(SLUG)!;
const { prev, next } = neighbours(SLUG);

export const metadata: Metadata = {
  title: study.title,
  description: study.hook,
  alternates: { canonical: "/work/agentic-support/" },
};

export default function Page() {
  return (
    <>
      <WorkSchema study={study} />
      <StudyHeader
        slug={SLUG}
        team="Product, applied AI / data science, support operations, content design, engineering across three product teams"
        contribution="I owned the interaction model and the autonomy policy — the framework deciding which actions the agent could take alone, what it had to stage for approval, and what it had to hand to a person. I did not build the model, tune retrieval, or own the support routing changes that ran concurrently."
      />

      <div className="frame">
        {/* ---------------------------------------------------- */}
        <Reveal>
          <Section label="01" title="A working chat window was the easy part">
            <p>
              Before this project I had shipped Autodesk Assistant — an LLM-powered
              conversational assistant on the web, handling presales and support
              questions. It worked. Around 87% of conversations resolved without a
              person, and it settled a question we had genuinely been unsure about:
              customers were willing to talk to an assistant about licensing,
              billing, and product problems instead of filing a case.
            </p>
            <p>
              So the next ask seemed obvious. Put it inside the products — AutoCAD,
              Revit, Fusion — where the assistant can see what the person is
              actually doing, and where it can do more than talk. Change a setting.
              Repair a corrupted file reference. Reassign a seat.
            </p>
            <p>
              That last sentence is where the project stopped being a chat project.
              An assistant that <em>answers</em> is wrong in a way that costs
              someone thirty seconds. An assistant that <em>acts</em> is wrong in a
              way that costs someone their afternoon, or their model, or their
              trust — permanently, and usually silently.
            </p>

            <PullQuote>
              The moment an assistant can change something, its interface stops
              being a conversation and starts being a permissions system.
            </PullQuote>
          </Section>
        </Reveal>

        {/* ---------------------------------------------------- */}
        <Reveal>
          <Section label="02" title="The disagreement I walked into">
            <p>
              There were two positions in the room and both were defensible.
            </p>
            <p>
              Engineering and applied AI wanted a confidence threshold: if the model
              is more than <Fill>[threshold]</Fill> confident, let it act. It is
              measurable, tunable, and it ships. Support operations wanted approval
              on everything, because they are the ones who take the call when
              software does something a customer didn’t ask for.
            </p>
            <p>
              Both were arguing about the same missing thing — nobody had written
              down what the agent was allowed to do. The product decision was being
              made implicitly, one ticket at a time, by whoever implemented the next
              action. My read was that this wasn’t a UI question at all: it was
              a policy question that would express itself as UI, and if design
              didn’t own it, it would get decided by default.
            </p>

            <Callout kind="decision" title="I stopped designing screens for six weeks">
              <p>
                Instead of mocking up the panel, I spent that time on{" "}
                <Fill>[n]</Fill> support transcripts and{" "}
                <Fill>[n]</Fill> sessions with support agents and customers, looking
                for one thing: when software did something on a customer’s
                behalf, what made them angry versus grateful? The answer was almost
                never the quality of the action. It was whether they could see it
                coming and undo it afterwards.
              </p>
              <p>
                It was an uncomfortable six weeks — there was pressure for visible
                design output. What made it survivable was showing partial findings
                weekly rather than disappearing and returning with a framework.
              </p>
            </Callout>
          </Section>
        </Reveal>

        {/* ---------------------------------------------------- */}
        <Reveal>
          <Section label="03" title="Autonomy is a ladder, not a switch">
            <p>
              The first useful move was refusing the binary. “Does the agent act
              or not” had no good answer. “How much of the decision does
              the agent hold” had four.
            </p>
            <p>
              Naming the rungs changed the conversation immediately. Engineers
              stopped arguing for autonomy in the abstract and started arguing about
              which rung a specific action belonged on — which is a question you can
              actually resolve with evidence.
            </p>

            <Wide
              label="Framework · the autonomy ladder"
              caption="Four postures, not two. Every action the agent could take had to be assigned a rung, and the rung determined the interface — not the other way round. Rung 03 turned out to carry the most weight: doing the work but not committing it is where most of the value lived without most of the risk."
            >
              <AutonomyLadder />
            </Wide>

            <p>
              Rung 03 — <strong>Stage</strong> — was the one nobody had asked for and
              the one that mattered most. It let the agent do genuinely useful
              multi-step work while keeping the commit with the person. In a CAD
              product, where the artifact is the whole point, showing a diff before
              committing is not a compromise; it is the feature.
            </p>
          </Section>
        </Reveal>

        {/* ---------------------------------------------------- */}
        <Reveal>
          <Section label="04" title="Confidence does not license action">
            <p>
              The confidence-threshold proposal had a specific flaw, and once I could
              draw it, the argument ended in one meeting.
            </p>
            <p>
              A confidence gate treats a wrong answer about a keyboard shortcut and a
              wrong answer about a shared Revit model as the same event, because the
              model is equally sure about both. But the cost of being wrong is not
              symmetric, and the model has no access to that asymmetry. Confidence
              is a property of the model. Consequence is a property of the world.
              Only one of them belongs in the gate on its own.
            </p>

            <Wide
              label="Framework · the gate"
              caption="The dashed line is the proposal we rejected. A confidence-only threshold ships the entire top half as ‘Act’, including the top-right quadrant — high confidence, high consequence. That quadrant is where a confident, plausible, wrong action does real damage, and it is precisely where confidence gives you the least protection."
            >
              <ConsequenceMatrix />
            </Wide>

            <Callout kind="decision" title="Consequence is assessed at design time, not runtime">
              <p>
                We didn’t try to make the model reason about consequence. Every
                action the agent could take was classified once, by humans — me,
                product, and an engineer per product — into reversible, shared, or
                permanent. That classification lives in the action registry, not in
                a prompt.
              </p>
              <p>
                This is slower to extend, and I’d make the same call again. A
                model’s judgment about how much damage it can do is the last
                thing you should take on trust.
              </p>
            </Callout>
          </Section>
        </Reveal>

        {/* ---------------------------------------------------- */}
        <Reveal>
          <Section label="05" title="I designed the failure before the success">
            <p>
              Most of the detailed design work on this project went into the
              handoff, not the conversation. The reasoning is simple: at 91%
              resolution, one in eleven people still end up with a human. Those are
              disproportionately the hardest problems and the most frustrated
              customers, and they are the ones who write the reviews.
            </p>
            <p>
              The existing escalation pattern threw everything away at the seam. The
              agent had done six turns of real diagnostic work; the human agent
              inherited a ticket that said the assistant had failed, and opened with
              “how can I help you today?” The customer had to re-explain
              everything, having just been told the smart software couldn’t
              handle it. That is a worse experience than never offering the assistant
              at all.
            </p>

            <Wide
              label="Interaction · the escalation seam"
              caption="The rule we shipped: the agent may not escalate until it can state what it tried and what it ruled out. Writing the summary is the cost of giving up. This also had a useful side effect — it gave us a readable corpus of the agent’s own failures, which became the best input we had for improving it."
            >
              <EscalationSeam />
            </Wide>

            <p>
              Three details in that seam did most of the work, and all three were
              contested:
            </p>

            <Ledger
              columns={["Decision", "Why it was argued about", "Where it landed"]}
              rows={[
                [
                  "The customer can edit the agent’s summary before it sends",
                  "Adds a step at the exact moment someone is already frustrated.",
                  "Shipped. In testing it was read as respect rather than friction — people corrected the summary far less often than they said it made them trust the handoff.",
                ],
                [
                  "The agent names what it ruled out, not just that it failed",
                  "Exposes the agent’s reasoning, including when that reasoning was poor.",
                  "Shipped. This was the single biggest lever on human agent handling time, per support operations.",
                ],
                [
                  "No apology copy at the handoff",
                  "Content design’s instinct, reasonably, was to soften it.",
                  "Shipped without the apology. An agent that apologises for its limits reads as evasive; one that states them reads as competent. We tested both.",
                ],
              ]}
            />
          </Section>
        </Reveal>

        {/* ---------------------------------------------------- */}
        <Reveal>
          <Section label="06" title="One policy, three products, different thresholds">
            <p>
              Rolling this across AutoCAD, Revit, and Fusion is where the framework
              earned its keep — and where I got something wrong.
            </p>
            <p>
              My first instinct was a single global mapping: this action type always
              sits on this rung. It was clean and it was incorrect. The same action
              carries different consequence in each product. Changing a unit setting
              in Fusion affects one person’s sketch. The equivalent change in
              Revit can propagate through a federated model that four disciplines are
              working in simultaneously. Same action, same model confidence,
              completely different blast radius.
            </p>

            <Callout kind="honest" title="The version I shipped first was too centralised">
              <p>
                I initially owned the rung assignments centrally, which meant every
                new action needed me. That does not scale across three product teams
                and it made me a bottleneck within{" "}
                <Fill>[timeframe]</Fill>.
              </p>
              <p>
                What replaced it: the <em>ladder and the consequence classes</em> are
                shared and non-negotiable; the <em>threshold per product</em> is
                owned by each product team, documented, and reviewed together.
                Central framework, local calibration. I should have designed it that
                way from the start — the signal was there in the first Revit
                conversation and I argued past it.
              </p>
            </Callout>

            <Figure
              shot="The staged-action review UI in Revit: the agent’s proposed change shown as a reviewable diff, with the affected model elements highlighted and a single-step reject. This is the highest-value screenshot on the site — it makes Rung 03 concrete."
              ratio="16 / 10"
              caption="Shot list placeholder. Replace with the real interface once cleared."
            />
          </Section>
        </Reveal>

        {/* ---------------------------------------------------- */}
        <Reveal>
          <Section label="07" title="What the numbers do and don’t say">
            <p>
              The headline is 91% instant digital resolution and a 60% improvement in
              support effectiveness. Those are real, reported internally, and I am
              not going to present them as mine.
            </p>
            <p>
              Four things changed in the same window. My design work was one of them.
            </p>

            <Wide
              label="Measurement · concurrent changes"
              caption="Bars show when each change was in flight, not how large its effect was. This is the honest picture of the measurement window."
            >
              <ConfounderTimeline />
            </Wide>

            <Callout kind="honest" title="What I can and can’t claim">
              <p>
                <strong>What I can claim:</strong> the escalation redesign was the
                one piece we managed to isolate, because it rolled out on a staggered
                schedule against a holdback on{" "}
                <Fill>[product]</Fill>. Human agent handling time on escalated
                conversations moved <Fill>[figure]</Fill>, and that comparison is
                clean.
              </p>
              <p>
                <strong>What I can’t claim:</strong> the 91% figure. A model
                upgrade and a knowledge-base rewrite landed inside the same window.
                Anyone telling you they can decompose that number without an
                experiment designed up front is guessing.
              </p>
              <p>
                <strong>What I’d insist on next time:</strong> agreeing the
                measurement design before the first rollout, not after the number
                arrives. I raised instrumentation late — around{" "}
                <Fill>[when]</Fill> — and by then the release trains were already
                overlapping. That was my miss, and it cost us the ability to prove
                the thing I most wanted to prove.
              </p>
            </Callout>

            <p>
              There is one number I trust more than the headline, because it was
              built to be trustworthy: the rate at which people <em>reversed</em> an
              action the agent took alone. We instrumented undo from day one and
              treated it as the real safety metric — a rising undo rate means the
              rung assignment is wrong, regardless of what resolution says.
            </p>
          </Section>
        </Reveal>

        {/* ---------------------------------------------------- */}
        <Reveal>
          <Section label="08" title="What I’d do differently">
            <Ledger
              columns={["What happened", "What I’d change"]}
              rows={[
                [
                  "I owned rung assignment centrally at launch and became the bottleneck.",
                  "Ship the framework with local ownership and a review forum from day one. Shared vocabulary, distributed calibration.",
                ],
                [
                  "Instrumentation was designed after the interaction model.",
                  "Write the measurement plan in the same document as the framework. If a design decision can’t be falsified, say so explicitly rather than discovering it later.",
                ],
                [
                  "We under-designed the second failure — the agent staging something wrong and the person approving it anyway.",
                  "Approval fatigue is real and we saw early signs of it. I’d design for the case where the human rubber-stamps, because a review step that is always approved is not a safety mechanism.",
                ],
                [
                  "The undo affordance was visually quiet.",
                  "Give reversibility the same visual weight as the action. If undo is the thing that makes autonomy acceptable, it shouldn’t be the smallest element on screen.",
                ],
              ]}
            />

            <p className="quiet" style={{ fontSize: "var(--t-small)" }}>
              The framework outlived the feature, which is the outcome I actually
              care about. The ladder and the consequence classes are now the shared
              vocabulary for these arguments across the three product teams — which
              means the next designer doesn’t have to win this argument again.
            </p>
          </Section>
        </Reveal>

        <NextPrev prev={prev} next={next} />
      </div>
    </>
  );
}
