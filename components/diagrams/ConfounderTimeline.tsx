import s from "./diagrams.module.css";

/**
 * The metric-honesty diagram.
 *
 * Four things changed in the same window as the number I get credit
 * for. Drawing them overlapping makes the attribution problem
 * self-evident, which is a more credible move than a confident
 * pie chart of "design impact".
 *
 * Percentages here are positions on a shared timeline, not measured
 * effect sizes. Nothing on this diagram claims a magnitude.
 */

const TICKS = ["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"];

type Track = {
  name: string;
  owner: string;
  start: number;
  width: number;
  mine?: boolean;
};

const TRACKS: Track[] = [
  { name: "Autonomy policy + escalation redesign", owner: "My work", start: 4, width: 62, mine: true },
  { name: "Underlying model upgrade", owner: "Applied AI team", start: 30, width: 24 },
  { name: "Knowledge-base and retrieval rewrite", owner: "Content + data science", start: 18, width: 46 },
  { name: "Support routing and staffing change", owner: "Support operations", start: 52, width: 40 },
];

export default function ConfounderTimeline() {
  return (
    <div className={s.timeline}>
      <div className={s.tlHead}>
        <span className="label">What changed</span>
        <div className={s.tlScale}>
          {TICKS.map((t) => (
            <span key={t} className={s.tlTick}>
              {t}
            </span>
          ))}
        </div>
      </div>

      {TRACKS.map((t) => (
        <div className={s.tlRow} key={t.name}>
          <div className={s.tlName}>
            {t.name}
            <span className={s.tlOwner}>{t.owner}</span>
          </div>
          <div className={s.tlTrack}>
            <div
              className={`${s.tlBar} ${t.mine ? s.tlBarMine : s.tlBarOther}`}
              style={{ left: `${t.start}%`, width: `${t.width}%` }}
              role="img"
              aria-label={`${t.name}, owned by ${t.owner}, ran from roughly ${t.start} percent to ${t.start + t.width} percent of the measurement window`}
            />
          </div>
        </div>
      ))}

      <div className={s.tlRow}>
        <div className={s.tlName}>
          <strong>91% instant digital resolution</strong>
          <span className={s.tlOwner}>Measured here</span>
        </div>
        <div className={s.tlTrack}>
          <div className={s.tlMarker} style={{ left: "88%" }}>
            <span className={s.tlMarkerLabel}>Reported</span>
          </div>
        </div>
      </div>

      <ul className={s.tlLegend}>
        <li>
          <span className={`${s.swatch} ${s.swatchMine}`} /> Design work I owned
        </li>
        <li>
          <span className={`${s.swatch} ${s.swatchOther}`} /> Concurrent change by another team
        </li>
        <li>
          <span className={`${s.swatch} ${s.swatchAgent}`} /> Point of measurement
        </li>
      </ul>
    </div>
  );
}
