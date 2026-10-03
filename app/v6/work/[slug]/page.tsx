import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { profile, studies, studyBySlug } from "@/content/v6";
import { ShortcutFooter } from "@/components/v6/WorkbenchModules";

type Params = { slug: string };
const contextualReads: Record<string, { slug: string; label: string; reason: string }> = {
  "agent-autonomy": {
    slug: "conversational-assistant",
    label: "Teaching a bot to say I can't",
    reason: "Another AI case about making uncertainty and handoffs visible.",
  },
  "conversational-assistant": {
    slug: "agent-autonomy",
    label: "How much should the agent decide?",
    reason: "The policy case behind deciding when an AI system should act.",
  },
  "marketplace-recommendations": {
    slug: "conversational-assistant",
    label: "Teaching a system to say I can't",
    reason: "Another assistant case about behaving well when the answer is uncertain.",
  },
  "self-serve-billing": {
    slug: "commercial-banking",
    label: "A portal three banks could share",
    reason: "A related financial workflow case about making complex relationships legible.",
  },
  "commercial-banking": {
    slug: "self-serve-billing",
    label: "Billing that explains itself",
    reason: "A related financial workflow case about making customer commitments legible.",
  },
};

export function generateStaticParams(): Params[] { return studies.map((study) => ({ slug: study.slug })); }
export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const study = studyBySlug((await params).slug);
  return study ? { title: `${study.title.join(" ")} — Drishti Taori`, description: study.deck } : {};
}

export default async function V6WorkPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const study = studyBySlug(slug);
  if (!study) notFound();
  const nextRead = contextualReads[study.slug] ?? {
    slug: studies.find((item) => item.slug !== study.slug)?.slug ?? study.slug,
    label: studies.find((item) => item.slug !== study.slug)?.title.join(" ") ?? study.title.join(" "),
    reason: "Another case study from the workbench.",
  };
  return <main className="v6-studyPage" id="v6-main"><article className="v6-study">
    <Link className="v6-back" href="/v6/#work">← Bright Workbench</Link>
    <header><span className="v6-kicker">{study.category} · {study.org} · {study.year}</span><h1>{study.title.join(" ")}</h1><p className="v6-studyDeck">{study.deck}</p><ul>{study.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul></header>
    <section aria-label="Case context">
      <span className="v6-kicker">Case context</span>
      <dl>
        <div><dt>Role</dt><dd>{study.role}</dd></div>
        <div><dt>Team</dt><dd>{study.team}</dd></div>
        <div><dt>Duration</dt><dd>{study.duration}</dd></div>
        <div><dt>Platform</dt><dd>{study.platform}</dd></div>
      </dl>
    </section>
    <nav aria-label="In this case study">
      <span className="v6-kicker">Reading outline</span>
      <ol>
        <li><a href="#ownership">60-second ownership</a></li>
        <li><a href="#decision-artifacts">Abstracted decision artifacts</a></li>
        {study.metrics.length > 0 && <li><a href="#evidence">Evidence and caveats</a></li>}
        {study.sections.map((section, index) => <li key={section.heading}><a href={`#section-${index + 1}`}>{section.heading}</a></li>)}
      </ol>
    </nav>
    <section className="v6-ownership" id="ownership"><span className="v6-kicker">60-second ownership</span><div><article><b>Situation</b><p>{study.brief.situation}</p></article><article><b>Decision</b><p>{study.brief.decision}</p></article><article><b>Outcome</b><p>{study.brief.outcome}</p></article></div></section>
    <section className="v6-confidential" id="decision-artifacts"><span className="v6-kicker">Abstracted decision artifacts</span><h2>Reconstructed from the public-safe case narrative</h2><p>These are text-based decision artifacts, not original product screens, internal files, or a record of every detail from the engagement.</p><div><span>Decision statement</span><span>Tradeoff to inspect</span><span>Evidence boundary</span></div><dl>
      <div><dt>Decision statement</dt><dd>{study.brief.decision}</dd></div>
      <div><dt>Tradeoff to inspect</dt><dd>{study.sections[1]?.body[0] ?? study.sections[0]?.body[0]}</dd></div>
      <div><dt>Evidence boundary</dt><dd>{study.metrics[0]?.caveat}</dd></div>
    </dl></section>
    {study.metrics.length > 0 && <section className="v6-studyMetrics" id="evidence" aria-label="Evidence and caveats">{study.metrics.map((metric) => <article key={metric.label}><b>{metric.value}</b><span>{metric.label}</span><small>{metric.caveat}</small></article>)}</section>}
    {study.sections.map((section, index) => <section className="v6-caseSection" id={`section-${index + 1}`} key={section.heading}><span className="v6-kicker">{section.kind}</span><div><h2>{section.heading}</h2>{section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.honest && <aside><b>What I got wrong</b><p>{section.honest}</p></aside>}</div></section>)}
    <footer className="v6-studyFooter"><a href={`mailto:${profile.contact.email}`}>Ask for the walkthrough →</a><Link href={`/v6/work/${nextRead.slug}/`}>Next read: {nextRead.label} — {nextRead.reason} →</Link></footer>
  </article><ShortcutFooter /></main>;
}
