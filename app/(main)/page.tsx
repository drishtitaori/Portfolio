import Link from "next/link";
import { profile } from "@/content/v2";
import { Reveal, Kinetic, Counter } from "@/components/v2/motion";
import Plate from "@/components/v2/Plate";
import WorkGrid from "@/components/v2/WorkGrid";

/**
 * Renders `**bold**` spans in the hero subline as accent-coloured emphasis.
 * Small enough not to justify a markdown dependency, and it keeps the copy in
 * content/v2.ts readable as plain prose.
 */
function withEmphasis(text: string) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? <b key={i}>{part}</b> : part,
  );
}

export default function V2Home() {
  return (
    <>
      {/* ------------------------------------------------------------------
          HERO
          An introduction, not a slogan: who I am, then what I care about,
          with the portrait sitting between two offset planes. Type is
          deliberately restrained — the warmth is carried by colour and
          roundness rather than scale.
         ------------------------------------------------------------------ */}
      <header className="sheetInner hero">
        <div>
          <Kinetic
            as="h1"
            className="heroTitle"
            text={profile.heroTitle}
            trigger="load"
            stagger={30}
            delay={120}
          />

          <Reveal delay={260}>
            <p className="heroSub">{withEmphasis(profile.heroSub)}</p>

            <div className="heroActions">
              <a className="btn btn--primary" href="#work">
                See the work <i aria-hidden="true">→</i>
              </a>
              <a className="btn btn--ghost" href={`mailto:${profile.contact.email}`}>
                Get in touch
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200} className="heroArt">
          <Plate slot={profile.portrait} priority />
        </Reveal>
      </header>

      {/* ------------------------------------------------------------------
          WORK
         ------------------------------------------------------------------ */}
      <section className="sheetInner section" id="work">
        <Reveal className="sectionHead">
          <div>
            <span className="mono mono--accent sectionKicker">Selected work</span>
            <h2 className="sectionTitle">Four projects, not fourteen</h2>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <WorkGrid />
        </Reveal>
      </section>

      {/* ------------------------------------------------------------------
          PULL QUOTE
          Placed here, straight after the work, because it is the sentence
          that separates you from other designers applying to AI teams — it
          should not need a click to find. The long form lives on /about.
         ------------------------------------------------------------------ */}
      <section className="pull">
        <div className="sheetInner pullInner">
          <span className="pullMark" aria-hidden="true">
            &ldquo;
          </span>
          <Reveal>
            <p className="pullText">{profile.pullQuote}</p>
            <span className="mono pullAttr">
              <Link href="/about/">More on how I work &rarr;</Link>
            </span>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------------
          IMPACT
          Numbers count up, and every one carries its qualifier underneath.
          A number without its limits is a liability in a design review, so
          the caveat is part of the component rather than an optional extra.
         ------------------------------------------------------------------ */}
      <section className="band" id="impact">
        <div className="sheetInner section">
          <Reveal className="sectionHead">
            <div>
              <span className="mono mono--accent sectionKicker">Impact</span>
              <h2 className="sectionTitle">What it added up to</h2>
            </div>
            <span className="mono">Every number is qualified</span>
          </Reveal>

          <div className="impactGrid">
            {profile.impact.map((m, i) => (
              <Reveal key={m.label} className="impactCell" delay={i * 70}>
                <span className="impactValue">
                  <Counter value={m.value} suffix={m.suffix} />
                </span>
                <span className="impactLabel">{m.label}</span>
                <span className="impactCaveat">{m.caveat}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------
          PRACTICE
         ------------------------------------------------------------------ */}
      <section className="sheetInner section" id="practice">
        <Reveal className="sectionHead">
          <div>
            <span className="mono mono--accent sectionKicker">How I work</span>
            <h2 className="sectionTitle">Three positions</h2>
          </div>
        </Reveal>

        <div className="practice">
          {profile.practice.map((p, i) => (
            <Reveal key={p.title} className="practiceItem" delay={i * 90}>
              <span className="mono mono--accent">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="practiceTitle">{p.title}</h3>
              <p className="practiceBody">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------------
          TESTIMONIALS
          Sits immediately before the contact CTA: social proof, then the ask.
          These are the only verified words on the page, so they get the
          quietest treatment on it — white cards on the tinted band, no tint of
          their own. The work tiles are meant to be the loud thing; borrowing
          their pastels here would flatten the hierarchy.
         ------------------------------------------------------------------ */}
      <section className="band" id="testimonials">
        <div className="sheetInner section">
          <Reveal className="sectionHead">
            <div>
              <span className="mono mono--accent sectionKicker">Testimonials</span>
              <h2 className="sectionTitle">What people I&rsquo;ve worked with say</h2>
            </div>
          </Reveal>

          <ul className="quotes">
            {profile.testimonials.map((q, i) => (
              <Reveal as="li" key={q.name} className="quoteItem" delay={i * 90}>
                {/* figure/blockquote/figcaption is the correct structure for an
                    attributed quote, and figcaption is only valid inside a
                    figure — so the card is the figure, not the list item. */}
                <figure className="quoteCard">
                  <span className="quoteMark" aria-hidden="true">
                    &ldquo;
                  </span>

                  <blockquote className="quoteBody">
                    {q.quote.map((para) => (
                      <p key={para.slice(0, 40)}>{para}</p>
                    ))}
                  </blockquote>

                  <figcaption className="quoteAttr">
                    <span className="quoteName">{q.name}</span>
                    <span className="quoteRole">{q.role}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------------------------
          CLOSER
         ------------------------------------------------------------------ */}
      <section className="sheetInner closer" id="contact">
        <Reveal>
          <h2 className="closerTitle">
            Staffing a problem nobody has framed yet?
          </h2>
          <p className="closerNote">
            {profile.status}. The fastest way to reach me is email — I answer
            everything.
          </p>
          <a className="closerMail" href={`mailto:${profile.contact.email}`}>
            {profile.contact.email} <i aria-hidden="true">→</i>
          </a>
        </Reveal>
      </section>
    </>
  );
}
