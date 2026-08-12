import { profile } from "@/content/v2";
import { Reveal, Kinetic, Counter } from "@/components/v2/motion";
import DimensionLine from "@/components/v2/DimensionLine";
import Plate from "@/components/v2/Plate";
import WorkRail from "@/components/v2/WorkRail";
import { Marquee } from "@/components/v2/chrome";

export default function V2Home() {
  return (
    <>
      {/* ------------------------------------------------------------------
          MASTHEAD
          The hero is the thesis, set as the largest thing on the page, with
          the dimension line measuring it underneath. Words rise into place on
          load rather than on scroll — this block is already in view, so
          waiting for an intersection would just mean a beat of nothing.
         ------------------------------------------------------------------ */}
      <header className="sheetInner masthead">
        <div className="mastheadMeta">
          <span className="mono">{profile.role}</span>
          <span className="mono">{profile.location}</span>
          <span className="mono">{profile.years} years</span>
          <span className="mono mastheadStatus">{profile.status}</span>
        </div>

        <h1 className="mastheadTitle">
          {profile.masthead.map((line, i) => (
            <span
              className={`mastheadLine${i === 2 ? " mastheadLine--accent" : ""}`}
              key={line}
            >
              <Kinetic
                text={line}
                trigger="load"
                stagger={60}
                delay={140 + i * 130}
              />
            </span>
          ))}
        </h1>

        <div className="mastheadDim">
          <DimensionLine
            label={`${profile.years} yrs · 4 case studies`}
          />
        </div>

        <div className="mastheadBody">
          <Reveal delay={120}>
            <p className="mastheadStandfirst">{profile.standfirst}</p>
            <span className="scrollCue">
              Scroll <span aria-hidden="true">↓</span>
            </span>
          </Reveal>

          <Reveal delay={220} className="mastheadPortrait">
            <Plate slot={profile.portrait} priority />
          </Reveal>
        </div>
      </header>

      <Marquee />

      {/* ------------------------------------------------------------------
          THESIS
          One long sentence, revealed word by word as it scrolls. The words
          also brighten from graphite to full ink, so reading it feels like
          the sentence resolving rather than a block fading in.
         ------------------------------------------------------------------ */}
      <section className="sheetInner section">
        <Kinetic
          as="p"
          className="thesis"
          stagger={26}
          text={profile.thesis}
        />
      </section>

      {/* ------------------------------------------------------------------
          WORK
         ------------------------------------------------------------------ */}
      <section className="section" id="work">
        <div className="sheetInner">
          <Reveal className="sectionHead">
            <h2 className="sectionTitle">Selected work</h2>
            <span className="mono">Four, not fourteen</span>
          </Reveal>
        </div>

        <WorkRail />
      </section>

      {/* ------------------------------------------------------------------
          IMPACT
          Numbers count up, and every one carries its qualifier underneath in
          mono. A number without its limits is a liability in a design review,
          so the caveat is part of the component, not an optional extra.
         ------------------------------------------------------------------ */}
      <section className="sheetInner section" id="impact">
        <Reveal className="sectionHead">
          <h2 className="sectionTitle">What it added up to</h2>
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
      </section>

      {/* ------------------------------------------------------------------
          PRACTICE
         ------------------------------------------------------------------ */}
      <section className="sheetInner section" id="practice">
        <Reveal className="sectionHead">
          <h2 className="sectionTitle">How I work</h2>
          <span className="mono">Three positions</span>
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
          CLOSER
         ------------------------------------------------------------------ */}
      <section className="sheetInner closer" id="contact">
        <Reveal>
          <h2 className="closerTitle">
            <Kinetic text="If you're staffing a problem nobody has framed yet, I'd like to hear about it." />
          </h2>

          <a className="closerMail" href={`mailto:${profile.contact.email}`}>
            {profile.contact.email} <i aria-hidden="true">→</i>
          </a>

          <div className="mastheadDim">
            <DimensionLine label={profile.status} />
          </div>
        </Reveal>
      </section>
    </>
  );
}
