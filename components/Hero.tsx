import Link from "next/link";
import { site } from "@/content/site";
import Landscape from "./Landscape";
import s from "./Hero.module.css";

/**
 * Full-bleed atmospheric hero.
 *
 * Everything here is generated — CSS gradient sky, an SVG landscape,
 * CSS particles. No image assets, so it responds to theme and viewport
 * and stays editable. Positions are hard-coded rather than random so
 * server and client render identically.
 */

// Ambient particles. Fixed values on purpose — Math.random() here would
// cause a hydration mismatch.
const MOTES = [
  { l: 8, t: 22, d: 0, s: 2.4, dur: 7 },
  { l: 17, t: 58, d: 1.4, s: 1.6, dur: 9 },
  { l: 26, t: 12, d: 2.1, s: 2, dur: 8 },
  { l: 34, t: 40, d: 0.6, s: 1.4, dur: 11 },
  { l: 42, t: 68, d: 3.2, s: 2.6, dur: 7.5 },
  { l: 51, t: 18, d: 1.1, s: 1.8, dur: 10 },
  { l: 58, t: 50, d: 2.6, s: 1.4, dur: 8.5 },
  { l: 64, t: 30, d: 0.3, s: 2.2, dur: 9.5 },
  { l: 71, t: 62, d: 1.8, s: 1.6, dur: 7 },
  { l: 78, t: 24, d: 3.6, s: 2.8, dur: 12 },
  { l: 85, t: 46, d: 0.9, s: 1.5, dur: 8 },
  { l: 91, t: 16, d: 2.3, s: 2, dur: 10.5 },
  { l: 95, t: 60, d: 1.5, s: 1.7, dur: 9 },
  { l: 12, t: 78, d: 2.8, s: 1.5, dur: 11.5 },
  { l: 46, t: 84, d: 0.4, s: 1.3, dur: 9 },
  { l: 88, t: 76, d: 3.1, s: 1.9, dur: 8 },
];

// The autonomy ladder, drifting. Decoration that states the thesis.
const POSTURES = [
  { label: "answer", l: 56, t: 20, dur: 13, d: 0 },
  { label: "suggest", l: 70, t: 33, dur: 16, d: 1.5 },
  { label: "stage", l: 62, t: 49, dur: 14, d: 3 },
  { label: "act", l: 79, t: 61, dur: 17, d: 0.8 },
];

export default function Hero() {
  return (
    <section className={s.hero}>
      {/* Sky */}
      <div className={s.sky} aria-hidden="true">
        <div className={s.glow} />
        <div className={s.cloudA} />
        <div className={s.cloudB} />

        {MOTES.map((m, i) => (
          <span
            key={i}
            className={s.mote}
            style={{
              left: `${m.l}%`,
              top: `${m.t}%`,
              width: `${m.s}px`,
              height: `${m.s}px`,
              animationDuration: `${m.dur}s`,
              animationDelay: `${m.d}s`,
            }}
          />
        ))}

        {POSTURES.map((p, i) => (
          <span
            key={p.label}
            className={s.posture}
            style={{
              left: `${p.l}%`,
              top: `${p.t}%`,
              animationDuration: `${p.dur}s`,
              animationDelay: `${p.d}s`,
            }}
          >
            <i className={s.postureDot} />
            {p.label}
            <em className={s.postureRung}>0{i + 1}</em>
          </span>
        ))}
      </div>

      {/* Landscape */}
      <Landscape className={s.landscape} />

      {/* Copy */}
      <div className={`frame ${s.inner}`}>
        <p className={s.greeting}>
          <span className={s.wave}>✦</span> hi, I’m Drishti
        </p>

        <h1 className={s.title}>
          <span className={s.line}>I design what</span>{" "}
          <span className={s.line}>AI does on its own.</span>
        </h1>

        <p className={s.lead}>
          Senior product designer, {site.years} years. I work in the part of a
          product where nobody has decided what’s right yet — most recently
          deciding how much an AI agent should do on someone’s behalf,
          across AutoCAD, Revit, and Fusion.
        </p>

        <div className={s.actions}>
          <Link href="/v2/work/agentic-support/" className={s.primary}>
            See the work <span aria-hidden="true">→</span>
          </Link>
          <a href={`mailto:${site.contact.email}`} className={s.secondary}>
            Let’s talk <span aria-hidden="true">↗</span>
          </a>
          <a
            href={site.contact.resume}
            className={s.secondary}
            target="_blank"
            rel="noopener"
          >
            Résumé <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      <div className={s.scrollCue} aria-hidden="true">
        <span className="label">Scroll</span>
        <span className={s.scrollLine} />
      </div>
    </section>
  );
}
