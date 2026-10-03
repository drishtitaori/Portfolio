import { v6, profile } from "@/content/v6";
import DecisionLens from "@/components/v6/DecisionLens";
import { CollaboratorNotes, Conditions, DecisionApproach, EvidenceBoard, ExperienceTimeline, ShortcutFooter, SpeakingProof, StartWithQuestion, WorkIndex } from "@/components/v6/WorkbenchModules";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function V6Home() {
  return <main id="v6-main">
    <header className="v6-hero">
      <div className="v6-heroContent">
        <span className="v6-kicker">Product designer · AI and enterprise systems</span>
        <h1 className="v6-heroTitle">{v6.thesis}</h1>
        <p>I’m a curious design enthusiast, guided by three Ds: <em>discipline, decency, and dedication.</em></p>
        <p className="v6-heroInsight">I believe people trust systems they can inspect—not because the system is perfect, but because the system shows what it's doing and why.</p>
        <a className="v6-techxProof" href="#speaking">TechX · public session summary →</a>
        <div className="v6-heroActions"><a href="#start">View AI & enterprise case studies</a><a href={`${BASE_PATH}${profile.contact.resume}`} target="_blank" rel="noopener noreferrer">Download résumé</a><a href={`mailto:${profile.contact.email}`}>Start a conversation</a></div>
      </div>
      <figure className="v6-portraitStack">
        <div className="v6-portraitFrame">
          <picture>
            <source media="(max-width: 700px)" srcSet={`${BASE_PATH}/v2/portrait.jpg`} />
            <img src={`${BASE_PATH}/v2/portrait.jpg`} alt="Drishti Taori standing beside a river with dry golden hills behind her" width="1100" height="1468" />
          </picture>
        </div>
        <figcaption className="v6-portraitCaption"><Conditions /></figcaption>
      </figure>
    </header>
    <StartWithQuestion />
    <WorkIndex />
    <DecisionLens />
    <SpeakingProof />
    <EvidenceBoard />
    <DecisionApproach />
    <CollaboratorNotes />
    <ExperienceTimeline />
    <section className="v6-contact"><span className="v6-kicker">Human checkpoint</span><h2>The details make more sense in conversation.</h2><p>Want the context, constraints, and messy middle behind a case study?</p><a href={`mailto:${profile.contact.email}`}>Email Drishti →</a></section>
    <ShortcutFooter />
  </main>;
}
