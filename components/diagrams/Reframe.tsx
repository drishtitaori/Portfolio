import s from "./diagrams.module.css";

/**
 * Generic before/after problem statement. Reused across studies —
 * the reframe is the part of the work I want a hiring manager to
 * read, so it gets its own visual treatment rather than a sentence
 * buried in a paragraph.
 */

export default function Reframe({
  beforeLabel = "The brief I was given",
  before,
  beforeConsequences,
  afterLabel = "The brief I argued for",
  after,
  afterConsequences,
}: {
  beforeLabel?: string;
  before: string;
  beforeConsequences: string[];
  afterLabel?: string;
  after: string;
  afterConsequences: string[];
}) {
  return (
    <div className={s.reframe}>
      <div className={s.reframePanel}>
        <span className="label">{beforeLabel}</span>
        <p className={s.reframeBrief}>“{before}”</p>
        <span className="label">Where that leads</span>
        <ul className={s.reframeList}>
          {beforeConsequences.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>

      <div className={s.reframeArrow} aria-hidden="true">
        →
      </div>

      <div className={`${s.reframePanel} ${s.reframePanelAfter}`}>
        <span className="label label--accent">{afterLabel}</span>
        <p className={s.reframeBrief}>“{after}”</p>
        <span className="label label--accent">Where that leads</span>
        <ul className={s.reframeList}>
          {afterConsequences.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
