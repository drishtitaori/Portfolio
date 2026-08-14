import type { Metadata } from "next";
import { about, profile } from "@/content/v2";
import { Reveal } from "@/components/v2/motion";
import Plate from "@/components/v2/Plate";

export const metadata: Metadata = {
  title: "About",
  description:
    "Drishti Taori — senior product designer in Seattle, working on ambiguous, high-consequence product problems and on how much an AI agent should do on someone's behalf.",
};

/**
 * About me.
 *
 * Ordered by what a hiring manager is actually trying to find out, in order:
 * who are you, how do you think about the thing you claim to specialise in,
 * where have you done it, and are you someone I'd want in a room. The personal
 * section is last on purpose — it's the reward for reading, not the pitch.
 *
 * The offset portrait frame is mirrored relative to the home page hero, so the
 * two pages share a device without looking like the same layout twice.
 */
export default function AboutPage() {
  return (
    <>
      <header className="sheetInner aboutHead">
        <div>
          <span className="mono mono--accent">{about.kicker}</span>
          <h1 className="aboutTitle">{about.title}</h1>

          <div className="aboutIntro">
            {about.intro.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        </div>

        <Reveal delay={140} className="aboutArt">
          <Plate slot={about.portrait} priority />
        </Reveal>
      </header>

      {/* ------------------------------------------------------------------
          ON DESIGNING FOR AGENTS
          The long form of the claim quoted on the home page.
         ------------------------------------------------------------------ */}
      <section className="band">
        <div className="sheetInner section">
          <Reveal className="sectionHead">
            <div>
              <span className="mono mono--accent sectionKicker">Point of view</span>
              <h2 className="sectionTitle">{about.ai.title}</h2>
            </div>
          </Reveal>

          <Reveal className="aboutProse" delay={80}>
            {about.ai.body.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------------
          TIMELINE
         ------------------------------------------------------------------ */}
      <section className="sheetInner section">
        <Reveal className="sectionHead">
          <div>
            <span className="mono mono--accent sectionKicker">Background</span>
            <h2 className="sectionTitle">Where I&rsquo;ve worked</h2>
          </div>
          <span className="mono">{profile.years} years</span>
        </Reveal>

        <ul className="timeline">
          {about.timeline.map((t, i) => (
            <Reveal as="li" key={t.org} className="timeItem" delay={i * 60}>
              <span className="mono">{t.years}</span>
              <div>
                <h3 className="timeOrg">
                  {t.org}
                  <span className="timeRole">{t.role}</span>
                </h3>
                <p className="timeNote">{t.note}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* ------------------------------------------------------------------
          SPEAKING
         ------------------------------------------------------------------ */}
      <section className="sheetInner section">
        <Reveal className="sectionHead">
          <div>
            <span className="mono mono--accent sectionKicker">Talks</span>
            <h2 className="sectionTitle">Speaking &amp; teaching</h2>
          </div>
        </Reveal>

        <ul className="speaking">
          {about.speaking.map((s, i) => (
            <Reveal as="li" key={s.title} className="speakItem" delay={i * 80}>
              <h3 className="speakTitle">{s.title}</h3>
              <p className="speakNote">{s.note}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* ------------------------------------------------------------------
          AWAY FROM THE SCREEN
         ------------------------------------------------------------------ */}
      <section className="band">
        <div className="sheetInner section">
          <div className="offDuty">
            <Reveal>
              <span className="mono mono--accent sectionKicker">Off duty</span>
              <h2 className="sectionTitle">{about.offDuty.title}</h2>
              <p className="lead" style={{ marginTop: "1rem", maxWidth: "34rem" }}>
                {about.offDuty.body}
              </p>
            </Reveal>

            <Reveal delay={120}>
              <Plate slot={about.offDuty.image} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------
          CLOSER
         ------------------------------------------------------------------ */}
      <section className="sheetInner closer" id="contact">
        <Reveal>
          <h2 className="closerTitle">Want to talk about a hard problem?</h2>
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
