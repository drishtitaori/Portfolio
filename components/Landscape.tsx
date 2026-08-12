import s from "./Landscape.module.css";

/**
 * The horizon. Layered SVG — far hills, a generated treeline, a meadow
 * band, and foreground wildflowers. All colours are theme tokens, so
 * the same geometry reads as dusk or as night.
 *
 * The treeline is generated from a deterministic sequence rather than
 * Math.random() so server and client output match.
 */

const W = 1600;
const H = 420;

/** Cheap deterministic jitter — stable across renders and environments. */
function wobble(i: number, spread: number) {
  return ((Math.sin(i * 12.9898) * 43758.5453) % 1) * spread;
}

function treeline(baseY: number, count: number, minH: number, maxH: number, seed: number) {
  const step = W / count;
  const points: string[] = [`0,${H}`, `0,${baseY}`];

  for (let i = 0; i <= count; i += 1) {
    const x = i * step;
    const h = minH + Math.abs(wobble(i + seed, maxH - minH));
    // Each conifer: up to a point, back down to the baseline.
    points.push(`${(x - step * 0.42).toFixed(1)},${baseY}`);
    points.push(`${x.toFixed(1)},${(baseY - h).toFixed(1)}`);
    points.push(`${(x + step * 0.42).toFixed(1)},${baseY}`);
  }

  points.push(`${W},${baseY}`, `${W},${H}`);
  return points.join(" ");
}

/**
 * A dandelion head on a thin stem.
 *
 * `i` drives the sway timing. Staggering explicitly beats nth-of-type
 * here — spikes and dandelions are both <g>, so nth-of-type counts
 * across both and the pattern comes out arbitrary.
 */
function Dandelion({
  x,
  y,
  r,
  seedCount,
  i = 0,
}: {
  x: number;
  y: number;
  r: number;
  seedCount: number;
  i?: number;
}) {
  const seeds = Array.from({ length: seedCount }, (_, k) => {
    const a = (k / seedCount) * Math.PI * 2;
    return { x2: x + Math.cos(a) * r, y2: y + Math.sin(a) * r };
  });
  return (
    <g
      className={s.dandelion}
      style={{
        animationDuration: `${5.5 + (i % 4) * 1.1}s`,
        animationDelay: `-${(i % 5) * 1.3}s`,
      }}
    >
      <path d={`M${x},${y + r} V${y + r + 46}`} className={s.stem} />
      {seeds.map((sd, k) => (
        <line key={k} x1={x} y1={y} x2={sd.x2} y2={sd.y2} className={s.seed} />
      ))}
      {seeds.map((sd, k) => (
        <circle key={`d${k}`} cx={sd.x2} cy={sd.y2} r="1.5" className={s.seedTip} />
      ))}
    </g>
  );
}

/** A simple flower spike, like a lupin. */
function Spike({ x, y, h, i = 0 }: { x: number; y: number; h: number; i?: number }) {
  const buds = Math.round(h / 9);
  return (
    <g
      className={s.spike}
      style={{
        animationDuration: `${6.5 + (i % 5) * 0.9}s`,
        animationDelay: `-${(i % 7) * 0.8}s`,
      }}
    >
      <path d={`M${x},${y} V${y - h}`} className={s.stem} />
      {Array.from({ length: buds }, (_, k) => {
        const by = y - h + k * 9 + 4;
        const bw = 3 + (k / buds) * 3;
        return (
          <ellipse
            key={k}
            cx={x + (k % 2 === 0 ? -bw * 0.6 : bw * 0.6)}
            cy={by}
            rx={bw}
            ry={bw * 0.8}
            className={s.bud}
          />
        );
      })}
    </g>
  );
}

export default function Landscape({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`${s.svg} ${className}`.trim()}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      {/* Far hills */}
      <path
        d={`M0,${H} L0,196 C180,150 320,178 470,160 C640,140 760,182 920,166 C1090,150 1250,180 1420,158 C1500,148 1560,158 ${W},150 L${W},${H} Z`}
        className={s.hillFar}
      />

      {/* Mid treeline */}
      <polygon points={treeline(232, 58, 26, 62, 3)} className={s.treeMid} />

      {/* Near treeline, denser and taller */}
      <polygon points={treeline(272, 92, 30, 78, 11)} className={s.treeNear} />

      {/* Meadow. Two overlapping bands with a soft top edge so it reads as
          receding ground rather than a flat strip. */}
      <path
        d={`M0,${H} L0,296 C240,280 420,308 700,296 C960,284 1180,310 ${W},292 L${W},${H} Z`}
        className={s.meadowFar}
      />
      <path
        d={`M0,${H} L0,346 C280,332 520,356 820,344 C1120,332 1360,354 ${W},340 L${W},${H} Z`}
        className={s.meadow}
      />

      {/* Foreground planting. Heads sit above the meadow line so the flowers
          read as standing in it; stems run down into the dark. Varied
          heights on purpose — an even row reads as a repeating pattern. */}
      <g className={s.flora}>
        <Spike x={52} y={404} h={96}  i={1} />
        <Spike x={88} y={412} h={62}  i={2} />
        <Dandelion x={132} y={268} r={14} seedCount={12}  i={3} />
        <Spike x={182} y={408} h={78}  i={4} />
        <Dandelion x={236} y={306} r={10} seedCount={9}  i={5} />
        <Spike x={288} y={416} h={54}  i={6} />
        <Dandelion x={348} y={252} r={13} seedCount={11}  i={7} />
        <Spike x={402} y={406} h={88}  i={8} />
        <Spike x={446} y={414} h={58}  i={9} />
        <Dandelion x={512} y={288} r={11} seedCount={10}  i={10} />
        <Spike x={578} y={410} h={70}  i={11} />
        <Dandelion x={646} y={264} r={12} seedCount={11}  i={12} />
        <Spike x={706} y={418} h={48}  i={13} />
        <Spike x={996} y={412} h={66}  i={14} />
        <Dandelion x={1058} y={276} r={12} seedCount={11}  i={15} />
        <Spike x={1124} y={406} h={92}  i={16} />
        <Dandelion x={1188} y={248} r={14} seedCount={12}  i={17} />
        <Spike x={1248} y={414} h={56}  i={18} />
        <Spike x={1296} y={408} h={80}  i={19} />
        <Dandelion x={1368} y={296} r={10} seedCount={9}  i={20} />
        <Spike x={1428} y={416} h={60}  i={21} />
        <Dandelion x={1492} y={262} r={13} seedCount={11}  i={22} />
        <Spike x={1552} y={410} h={74}  i={23} />
      </g>
    </svg>
  );
}
