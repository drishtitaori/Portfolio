import Link from "next/link";
import { profile } from "@/content/v6";
import { ShortcutFooter } from "@/components/v6/WorkbenchModules";

export const metadata = {
  title: "Customer Success Planning Facilitation — Drishti Taori",
  description: "A public account of Drishti Taori's discovery and facilitation work on customer success planning.",
  robots: { index: false, follow: false },
};

export default function CustomerSuccessPlanningPage() {
  return <main className="v6-studyPage" id="v6-main">
    <article className="v6-study">
      <Link className="v6-back" href="/v6/#speaking">← Back to speaking</Link>
      <header>
        <span className="v6-kicker">Customer success planning · Discovery facilitation</span>
        <h1>Facilitating a shared definition of customer success planning</h1>
        <p className="v6-studyDeck">A public account of the discovery and workshop process used to turn an ambiguous request for a planning tool into a shared, customer-centered problem frame.</p>
        <ul><li>JTBD discovery</li><li>Cross-functional workshops</li><li>MVP framing</li></ul>
      </header>
      <nav className="v6-readingOutline" aria-label="In this facilitation story"><span className="v6-kicker">Reading outline</span><ol><li><a href="#facilitation-summary">Contribution summary</a></li><li><a href="#discovery">Discovery</a></li><li><a href="#facilitation">Facilitation</a></li><li><a href="#handoff">Design handoff</a></li></ol></nav>

      <section className="v6-ownership" id="facilitation-summary">
        <span className="v6-kicker">60-second contribution</span>
        <div>
          <article><b>Situation</b><p>The request was to build a customer success planning tool, but partners held materially different definitions of what a success plan should do.</p></article>
          <article><b>Contribution</b><p>Drishti collaborated on discovery with a UX researcher, then facilitated design-thinking workshops with product, customer-success leadership, and engineering partners.</p></article>
          <article><b>Process result</b><p>The group aligned on a customer-centered definition, a ranked set of moments to address, and explicit boundaries for the initial product scope.</p></article>
        </div>
      </section>

      <section className="v6-confidential">
        <span className="v6-kicker">Reading boundary</span>
        <h2>Process, not a claim of solo ownership.</h2>
        <div><span>Collaborative discovery</span><span>Evidence-led framing</span><span>Workshop facilitation</span><span>Shared scope decisions</span></div>
        <p>This public summary describes Drishti's facilitation and design contribution. Research study design and analysis rigor were owned jointly with the UX research partner; it does not disclose internal participants, customer data, or product artifacts.</p>
      </section>

      <section className="v6-caseSection" id="discovery">
        <span className="v6-kicker">Discovery</span>
        <div>
          <h2>Start with the job, not the requested tool.</h2>
          <p>Discovery with customer success managers, account teams, and mid-market customers surfaced a useful reframe: a success plan mattered less as a document than as a way for a customer and a customer success manager to reach a shared agreement about what success meant.</p>
          <p>That evidence was brought back to the team as a decision fork with different implications, rather than as a conclusion imposed on the group.</p>
        </div>
      </section>

      <section className="v6-caseSection" id="facilitation">
        <span className="v6-kicker">Facilitation</span>
        <div>
          <h2>Make disagreement visible before it becomes backlog churn.</h2>
          <p>Drishti facilitated workshops with product, customer-success leadership, and engineering partners. The sessions began with discovery evidence and used a focused exercise: write the sentence a customer should be able to say after using the experience well.</p>
          <p>The differences among those statements made the competing assumptions discussable. The group used that conversation to define a shared success-plan concept, rank the most important moments in the loop, and name what the product would not be.</p>
        </div>
      </section>

      <section className="v6-caseSection" id="handoff">
        <span className="v6-kicker">Design handoff</span>
        <div>
          <h2>Give each audience an artifact it can use.</h2>
          <p>Storyboards helped partners reason about the sequence of conversations and revisits over a customer relationship. They were not a substitute for the implementation detail engineering needed.</p>
          <aside><b>Process learning</b><p>Stakeholder-facing storyboards and build-ready specifications serve different audiences. Both should be developed in parallel when the product direction is still being shaped.</p></aside>
        </div>
      </section>

      <footer className="v6-studyFooter">
        <a href={`mailto:${profile.contact.email}`}>Email Drishti about this work</a>
        <Link href="/v6/#speaking">Back to speaking →</Link>
      </footer>
    </article><ShortcutFooter />
  </main>;
}
