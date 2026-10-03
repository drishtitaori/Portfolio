import Link from "next/link";
import { profile } from "@/content/v6";
import { ShortcutFooter } from "@/components/v6/WorkbenchModules";

export const metadata = {
  title: "Autodesk University Research Planning — Drishti Taori",
  description: "How Drishti Taori designed research-session proposals for subscription and account-experience needs across enterprise and SMB segments.",
  robots: { index: false, follow: false },
};

export default function AUResearchPlanningPage() {
  return <main className="v6-studyPage" id="v6-main">
    <article className="v6-study">
      <Link className="v6-back" href="/v6/#speaking">← Back to speaking</Link>
      <header>
        <span className="v6-kicker">Autodesk University · Idea Exchange · Research planning</span>
        <h1>Research planning for subscription and account-experience needs</h1>
        <p className="v6-studyDeck">Two approved research-session proposals for the Autodesk University Idea Exchange program, focused on subscription and purchasing needs and on SMB administrator needs in signed-in experiences.</p>
        <ul><li>Approved proposals</li><li>Enterprise + SMB segments</li><li>Research planning</li></ul>
      </header>
      <nav className="v6-readingOutline" aria-label="In this research story"><span className="v6-kicker">Reading outline</span><ol><li><a href="#research-summary">Proposal summary</a></li><li><a href="#program-design">Research-program design</a></li><li><a href="#audiences">Proposed audiences</a></li><li><a href="#practice">Practice context</a></li></ol></nav>

      <section className="v6-ownership" id="research-summary">
        <span className="v6-kicker">60-second ownership</span>
        <div>
          <article><b>Situation</b><p>Existing journey evidence pointed to unresolved subscription, purchasing, and account-experience questions across enterprise and SMB customer segments.</p></article>
          <article><b>Decision</b><p>Frame two research sessions around the decisions product teams needed to make, rather than around a generic discussion of pain points.</p></article>
          <article><b>Outcome</b><p>Two proposals were approved for the Autodesk University Idea Exchange program; approval is not represented here as completed research or product impact.</p></article>
        </div>
      </section>

      <section className="v6-confidential">
        <span className="v6-kicker">Proposal structure</span>
        <h2>What was made inspectable before any session was scheduled</h2>
        <div><span>Target segments</span><span>Decision questions</span><span>Discussion plan</span><span>Intended decision impact</span></div>
        <p>This public account describes planning and approved proposals, not facilitated sessions, participant findings, or product changes.</p>
      </section>

      <section className="v6-caseSection" id="program-design">
        <span className="v6-kicker">Research-program design</span>
        <div>
          <h2>Design the question before designing the session.</h2>
          <p>Research planning defined the questions, target participants, session structure, and intended decision impact before the room was scheduled.</p>
          <p>The proposal work synthesized existing journey evidence, turned it into decision-oriented research questions, and prepared discussion plans and activities for the proposed sessions.</p>
        </div>
      </section>

      <section className="v6-caseSection" id="audiences">
        <span className="v6-kicker">Proposed audiences</span>
        <div>
          <h2>Two distinct needs, two proposed sessions.</h2>
          <p><strong>Subscription and purchasing:</strong> enterprise and SMB customers navigating subscription management, renewal friction, and purchasing workflows.</p>
          <p><strong>SMB administration:</strong> small and medium business administrators managing team access, account settings, and product adoption in signed-in experiences.</p>
        </div>
      </section>

      <section className="v6-caseSection" id="practice">
        <span className="v6-kicker">Practice context</span>
        <div>
          <h2>Make the intended decision visible.</h2>
          <p>The expected output was not a generic set of insights. Each proposal stated what a product team could decide or prioritize differently if the research were conducted.</p>
          <aside><b>Public-account boundary</b><p>This story intentionally omits internal participant identities, account data, roadmap details, and proprietary framework names.</p></aside>
        </div>
      </section>

      <footer className="v6-studyFooter">
        <a href={`mailto:${profile.contact.email}`}>Email Drishti about this work</a>
        <Link href="/v6/#speaking">Back to speaking →</Link>
      </footer>
    </article><ShortcutFooter />
  </main>;
}
