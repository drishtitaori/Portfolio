import Link from "next/link";
import { profile, speakingProof, techXCase } from "@/content/v6";
import { ShortcutFooter } from "@/components/v6/WorkbenchModules";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata = {
  title: "Context-Driven Dashboards: From Metrics to Meaning — Drishti Taori",
  description: "A public summary of Drishti Taori's TechX session on making dashboard data more useful for decisions.",
  robots: { index: false, follow: false },
};

export default function TechXStoryPage() {
  const { techX } = speakingProof;

  return <main className="v6-studyPage" id="v6-main">
    <article className="v6-study">
      <Link className="v6-back" href="/v6/#speaking">← Back to speaking</Link>
      <header>
        <span className="v6-kicker">{techX.event} · Public session summary</span>
        <h1>{techX.title}</h1>
        <p className="v6-studyDeck">{techXCase.premise}</p>
        <ul><li>Decision support</li><li>Dashboard design</li><li>Public session summary</li></ul>
      </header>
      <nav className="v6-readingOutline" aria-label="In this session story"><span className="v6-kicker">Reading outline</span><ol><li><a href="#session-summary">Session summary</a></li><li><a href="#comparison">Comparative analysis</a></li><li><a href="#proposal">Design proposal</a></li><li><a href="#validation">Measurement approach</a></li></ol></nav>

      <section className="v6-ownership" id="session-summary">
        <span className="v6-kicker">60-second session summary</span>
        <div>
          <article><b>Question</b><p>How can dashboards help people move from metrics to a useful next decision?</p></article>
          <article><b>Perspective</b><p>{techXCase.premise}</p></article>
          <article><b>Public boundary</b><p>This page is a public session summary, not a reconstruction of internal research or product strategy.</p></article>
        </div>
      </section>
      <figure className="v6-sessionPhoto">
        <img src={`${BASE_PATH}/techx-session.jpg`} alt="Drishti Taori at the lectern during her TechX session" width="768" height="1024" />
        <figcaption><span className="v6-kicker">Session record</span><p>At the lectern for <em>Context-Driven Dashboards: From Metrics to Meaning.</em></p></figcaption>
      </figure>

      <section className="v6-caseSection">
        <span className="v6-kicker">The question</span>
        <div><h2>Why do dashboards so often create more work?</h2>
          <p>{techXCase.study}</p>
          <p>The comparison was not between a good dashboard and a bad one. It was between the same data presented without a decision context and the same data shaped around the work someone needed to do next.</p>
        </div>
      </section>

      <section className="v6-caseSection" id="comparison">
        <span className="v6-kicker">Comparative analysis</span>
        <div><h2>One platform, two different jobs to be done.</h2>
          <div className="v6-techxComparison">
            {techXCase.comparison.map((item) => <article key={item.audience}>
              <span>{item.audience}</span>
              <h3>{item.question}</h3>
              <ul>{item.needs.map((need) => <li key={need}>{need}</li>)}</ul>
            </article>)}
          </div>
        </div>
      </section>

      <section className="v6-caseSection" id="proposal">
        <span className="v6-kicker">The design proposal</span>
        <div><h2>Make the dashboard a decision-support surface.</h2>
          <div className="v6-techxMoves">
            {techXCase.recommendation.map((item, index) => <article key={item.title}>
              <span aria-hidden="true">0{index + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>)}
          </div>
        </div>
      </section>

      <section className="v6-caseSection">
        <span className="v6-kicker">What that means in practice</span>
        <div><h2>Start with clarity; build toward adaptation.</h2>
          <div className="v6-techxRoadmap">
            {techXCase.roadmap.map((item) => <article key={item.label}><span>{item.label}</span><p>{item.body}</p></article>)}
          </div>
        </div>
      </section>

      <section className="v6-caseSection" id="validation">
        <span className="v6-kicker">How I would measure it</span>
        <div><h2>Less cognitive load has to be observable.</h2>
          <ul>{techXCase.validation.map((item) => <li key={item}>{item}</li>)}</ul>
          <aside><b>Public-session boundary</b><p>This summary uses abstracted comparative examples to explain the design proposal. It does not reproduce internal research, product artifacts, or roadmap material.</p></aside>
        </div>
      </section>

      <footer className="v6-studyFooter">
        <a href={`mailto:${profile.contact.email}`}>Email Drishti about this session</a>
        <Link href="/v6/#speaking">Back to speaking →</Link>
      </footer>
    </article><ShortcutFooter />
  </main>;
}
