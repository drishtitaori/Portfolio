import s from "./diagrams.module.css";

/**
 * The gate. Confidence alone doesn't license action — consequence
 * gates it. The dashed line and the annotation to its right show
 * what a confidence-only threshold would have shipped, which is the
 * whole argument of the diagram.
 *
 * Layout: plot occupies x 110–630, annotation gutter 660–890. The
 * gutter exists so the rejected-proposal note never overlaps a
 * quadrant.
 */

const X0 = 110;
const X1 = 630;
const Y0 = 30;
const Y1 = 370;
const XM = (X0 + X1) / 2;
const YM = (Y0 + Y1) / 2;

const GUTTER = 660;

type Zone = {
  x: number;
  y: number;
  rung: string;
  title: string;
  lines: string[];
  fill: string;
  stroke: string;
};

const ZONES: Zone[] = [
  {
    x: X0,
    y: Y0,
    rung: "Rung 04",
    title: "Act",
    lines: ["Agent completes the task and", "reports it. A single-step undo", "stays visible afterwards."],
    fill: "var(--agent-wash)",
    stroke: "var(--agent)",
  },
  {
    x: XM,
    y: Y0,
    rung: "Rung 03",
    title: "Stage",
    lines: ["Agent does the work but a", "person commits it. The diff", "is the whole interface."],
    fill: "var(--caution-wash)",
    stroke: "var(--caution)",
  },
  {
    x: X0,
    y: YM,
    rung: "Rung 02",
    title: "Suggest",
    lines: ["Agent proposes, person picks.", "Being wrong here is cheap,", "so guessing is allowed."],
    fill: "var(--paper-sunken)",
    stroke: "var(--ink-tertiary)",
  },
  {
    x: XM,
    y: YM,
    rung: "Rung 01, then a person",
    title: "Hand off now",
    lines: ["Straight to a person, carrying", "the full transcript. Don't", "attempt it and then apologise."],
    fill: "var(--human-wash)",
    stroke: "var(--human)",
  },
];

const NOTE = [
  "A confidence-only gate ships",
  "everything above this line as",
  "“Act” — including the top-right",
  "quadrant, which is exactly",
  "where the expensive mistakes",
  "live.",
];

export default function ConsequenceMatrix() {
  const w = XM - X0;
  const h = YM - Y0;

  return (
    <svg
      className={s.svg}
      viewBox="0 0 900 450"
      role="img"
      aria-label="A two-by-two matrix. The vertical axis is model confidence, the horizontal axis is consequence of being wrong. High confidence with low consequence means the agent acts on its own. High confidence with high consequence means the agent stages the work for a person to commit. Low confidence with low consequence means the agent suggests. Low confidence with high consequence means hand off to a person immediately. A dashed horizontal line marks the confidence-only threshold that was rejected, because it would have allowed the agent to act in the high-consequence quadrant."
    >
      {ZONES.map((z) => (
        <g key={z.title}>
          <rect
            x={z.x}
            y={z.y}
            width={w}
            height={h}
            fill={z.fill}
            stroke={z.stroke}
            strokeOpacity="0.35"
          />
          <text x={z.x + 22} y={z.y + 32} className={s.axisLabel}>
            {z.rung}
          </text>
          <text x={z.x + 22} y={z.y + 60} className={s.zoneTitle} style={{ fill: z.stroke }}>
            {z.title.toUpperCase()}
          </text>
          {z.lines.map((line, i) => (
            <text key={i} x={z.x + 22} y={z.y + 90 + i * 18} className={s.zoneBody}>
              {line}
            </text>
          ))}
        </g>
      ))}

      {/* Axes */}
      <line x1={X0} y1={Y0} x2={X0} y2={Y1} className={s.axis} />
      <line x1={X0} y1={Y1} x2={X1} y2={Y1} className={s.axis} />

      {/* The rejected model: a confidence-only threshold. Extends into
          the annotation gutter so the note reads as attached to it. */}
      <line
        x1={X0 - 14}
        y1={YM}
        x2={GUTTER - 14}
        y2={YM}
        stroke="var(--caution)"
        strokeWidth="1.5"
        strokeDasharray="6 4"
      />

      {/* Annotation gutter */}
      <text x={GUTTER} y={YM - 58} className={s.axisLabel} style={{ fill: "var(--caution)" }}>
        What we rejected
      </text>
      {NOTE.map((line, i) => (
        <text key={i} x={GUTTER} y={YM - 30 + i * 18} className={s.annotation}>
          {line}
        </text>
      ))}

      {/* Y axis */}
      <text
        className={s.axisLabel}
        transform={`translate(${X0 - 40}, ${(Y0 + Y1) / 2}) rotate(-90)`}
        textAnchor="middle"
      >
        Model confidence
      </text>
      <text x={X0 - 14} y={Y0 + 10} className={s.axisLabel} textAnchor="end">
        High
      </text>
      <text x={X0 - 14} y={Y1 - 2} className={s.axisLabel} textAnchor="end">
        Low
      </text>

      {/* X axis */}
      <text x={X0} y={Y1 + 24} className={s.axisLabel}>
        Reversible
      </text>
      <text x={X1} y={Y1 + 24} className={s.axisLabel} textAnchor="end">
        Shared, billed, or permanent
      </text>
      <text x={(X0 + X1) / 2} y={Y1 + 50} className={s.axisLabel} textAnchor="middle">
        Consequence of being wrong
      </text>
    </svg>
  );
}
