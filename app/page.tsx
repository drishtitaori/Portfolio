import Link from "next/link";
import { site, currently } from "@/content/site";
import { caseStudies } from "@/content/caseStudies";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import KeyArt from "@/components/KeyArt";
import Photo from "@/components/Photo";
import { HomeSchema } from "@/components/StructuredData";
import s from "./page.module.css";

const CLIENTS = ["Autodesk", "American Express", "Accenture", "Amtrak", "Fuzzy Math"];

const IMPACT = [
  { value: "91%", label: "Instant digital resolution", note: "Agentic support, three products" },
  { value: "87%", label: "Self-service resolution", note: "Conversational assistant" },
  { value: "3", label: "Products, one autonomy policy", note: "AutoCAD · Revit · Fusion" },
  { value: "200+", label: "Attendees at my TechX talk", note: "Directors, VPs, SVPs" },
];

export default function Home() {
  return (
    <>
      <HomeSchema />
      <Hero />

      {/* ---------------- Where I've worked ---------------- */}
      <section className={s.clientBand} aria-label="Organisations I've worked with">
        <div className={`frame ${s.clientInner}`}>
          <span className="label">Six years, shipping at</span>
          <ul className={s.clients}>
            {CLIENTS.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- Positioning ---------------- */}
      <Reveal as="section" className={`frame ${s.pitch}`}>
        <div className={s.pitchText}>
          <p className={s.pitchLead}>
            I do my best work where a problem is still a paragraph of
            disagreement rather than a brief.
          </p>
          <div className={s.pitchBody}>
            <p>
              My job there is to make it decidable: find the real constraint, put
              a shape on the tradeoff, and give a room of people something
              concrete enough to argue with.
            </p>
            <p>
              Six years across enterprise tooling, financial workflows, and — for
              the last three — AI systems that act on a customer’s behalf.
            </p>
          </div>
        </div>

        <Photo
          base="/img/portrait"
          widths={[700, 1000]}
          alt="Drishti Taori sitting on a granite boulder at the edge of an alpine lake, feet in the shallows, looking out toward a pine treeline."
          maxWidth="22rem"
          sizes="(max-width: 56rem) min(100vw, 20rem), 22rem"
          ratio="3 / 4"
          className={s.pitchPhoto}
        />
      </Reveal>

      {/* ---------------- Impact ---------------- */}
      <section className={s.impact}>
        <div className={`frame ${s.impactInner}`}>
          {IMPACT.map((m, i) => (
            <Reveal key={m.label} delay={i * 70}>
              <div className={s.impactItem}>
                <span className={s.impactValue}>{m.value}</span>
                <span className={s.impactLabel}>{m.label}</span>
                <span className={s.impactNote}>{m.note}</span>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="frame">
          <p className={s.impactCaveat}>
            Every one of these numbers is qualified inside the case studies —
            baselines, confounders, and the one I trust least.
          </p>
        </div>
      </section>

      {/* ---------------- Work ---------------- */}
      <section className="frame" id="work">
        <div className={s.workHead}>
          <h2 className={s.workTitle}>Selected work</h2>
          <p className={s.workNote}>
            Five pieces, not fifteen. Three full case studies, two shorter.
            Each one names what it got wrong.
          </p>
        </div>

        <ul className={s.grid}>
          {caseStudies.map((c, i) => (
            <Reveal as="li" key={c.slug} delay={(i % 2) * 80} className={s.gridItem}>
              <Link href={`/work/${c.slug}/`} className={s.card}>
                <KeyArt kind={c.art} />

                <div className={s.cardMeta}>
                  <span className="label label--accent">{c.index}</span>
                  <span className="label">
                    {c.kind === "deep" ? "Case study" : "Short"} · {c.readingTime}
                  </span>
                </div>

                <h3 className={s.cardTitle}>{c.title}</h3>
                <p className={s.cardDeck}>{c.deck}</p>

                <div className={s.cardStats}>
                  {c.metrics.slice(0, 2).map((m) => (
                    <span key={m.label} className={s.stat}>
                      <b>{m.value}</b>
                      {m.label}
                    </span>
                  ))}
                </div>

                <span className={s.cardCta}>
                  {c.org} <span aria-hidden="true">→</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* ---------------- Currently ---------------- */}
      <Reveal as="section" className={`frame ${s.currently}`}>
        <span className="label">{currently.title}</span>
        <div className={s.currentlyBody}>
          {currently.items.map((item) => (
            <div key={item.label} className={s.currentlyItem}>
              <span className="label label--accent">{item.label}</span>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* ---------------- Closing CTA ---------------- */}
      <Reveal as="section" className={`frame ${s.closer}`}>
        <h2 className={s.closerTitle}>
          If you’re staffing a problem nobody has framed yet, I’d like
          to hear about it.
        </h2>
        <div className={s.closerActions}>
          <a href={`mailto:${site.contact.email}`} className={s.closerPrimary}>
            {site.contact.email} <span aria-hidden="true">→</span>
          </a>
          <Link href="/approach/" className={s.closerSecondary}>
            How I work <span aria-hidden="true">→</span>
          </Link>
        </div>
      </Reveal>
    </>
  );
}
