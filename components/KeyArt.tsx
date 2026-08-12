import s from "./KeyArt.module.css";

/**
 * Generated key art for the work index.
 *
 * Each one abstracts that case study's actual diagram, so the index reads
 * visually and the visual still means something. No image assets, so they
 * theme and scale with everything else.
 */

export type ArtKind =
  | "ladder"
  | "reframe"
  | "horizons"
  | "provenance"
  | "ledger";

const VB = "0 0 200 130";

function Ladder() {
  // Four rungs, agent share growing left to right.
  const rungs = [0.16, 0.4, 0.7, 0.92];
  return (
    <svg viewBox={VB} className={s.svg} aria-hidden="true">
      {rungs.map((share, i) => {
        const y = 24 + i * 24;
        return (
          <g key={i}>
            <rect x="24" y={y} width="152" height="9" rx="4.5" className={s.trackBg} />
            <rect
              x="24"
              y={y}
              width={152 * share}
              height="9"
              rx="4.5"
              className={s.agentBar}
            />
            <circle cx="14" cy={y + 4.5} r="2.5" className={s.dot} />
          </g>
        );
      })}
      <path d="M24 16 H176" className={s.hair} />
      <path d="M24 118 H176" className={s.hair} />
    </svg>
  );
}

function Reframe() {
  return (
    <svg viewBox={VB} className={s.svg} aria-hidden="true">
      <rect x="14" y="28" width="70" height="74" rx="4" className={s.panelMuted} />
      <rect x="116" y="28" width="70" height="74" rx="4" className={s.panelAccent} />
      {[0, 1, 2, 3].map((i) => (
        <path key={`l${i}`} d={`M26 ${46 + i * 13} H72`} className={s.lineMuted} />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <path key={`r${i}`} d={`M128 ${46 + i * 13} H174`} className={s.lineAccent} />
      ))}
      <path d="M90 65 H108 M102 60 L108 65 L102 70" className={s.arrow} />
    </svg>
  );
}

function Horizons() {
  // Three receding horizons; the nearest is the most committed.
  const bands = [
    { y: 96, w: 168, o: 1 },
    { y: 66, w: 128, o: 0.62 },
    { y: 36, w: 88, o: 0.32 },
  ];
  return (
    <svg viewBox={VB} className={s.svg} aria-hidden="true">
      {bands.map((b, i) => (
        <g key={i} style={{ opacity: b.o }}>
          <rect x="16" y={b.y} width={b.w} height="7" rx="3.5" className={s.agentBar} />
          <path d={`M16 ${b.y + 18} H${16 + b.w}`} className={s.hair} />
        </g>
      ))}
      <circle cx="16" cy="28" r="3" className={s.dotAccent} />
      <path d="M16 28 V96" className={s.spine} />
    </svg>
  );
}

function Provenance() {
  // A data grid where one row shows its sources.
  return (
    <svg viewBox={VB} className={s.svg} aria-hidden="true">
      {[0, 1, 2, 3, 4].map((r) => (
        <g key={r}>
          <path d={`M16 ${28 + r * 19} H184`} className={s.hair} />
          {[0, 1, 2].map((c) => (
            <rect
              key={c}
              x={22 + c * 56}
              y={34 + r * 19}
              width={c === 2 ? 30 : 44}
              height="5"
              rx="2.5"
              className={r === 2 ? s.agentBar : s.trackBg}
            />
          ))}
        </g>
      ))}
      <rect x="16" y="60" width="168" height="19" rx="3" className={s.panelAccentSoft} />
      <path d="M16 123 H184" className={s.hair} />
    </svg>
  );
}

function LedgerArt() {
  // Two columns: what I keep (solid) and what I hand over (dashed).
  return (
    <svg viewBox={VB} className={s.svg} aria-hidden="true">
      <path d="M100 20 V110" className={s.divider} />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect
            x="18"
            y={30 + i * 16}
            width={62 - (i % 3) * 10}
            height="6"
            rx="3"
            className={s.agentBar}
          />
          <rect
            x="112"
            y={30 + i * 16}
            width={66 - (i % 2) * 14}
            height="6"
            rx="3"
            className={s.dashedBar}
          />
        </g>
      ))}
    </svg>
  );
}

const ART: Record<ArtKind, () => React.JSX.Element> = {
  ladder: Ladder,
  reframe: Reframe,
  horizons: Horizons,
  provenance: Provenance,
  ledger: LedgerArt,
};

export default function KeyArt({ kind }: { kind: ArtKind }) {
  const Art = ART[kind];
  return (
    <div className={s.wrap}>
      <div className={s.grid} aria-hidden="true" />
      <Art />
    </div>
  );
}
