/**
 * The signature element.
 *
 * A CAD dimension line: extension ticks at both ends, a hairline between them,
 * arrowheads pointing outward, and a notched label in the middle. It is the
 * annotation vocabulary of the tools this work was designed for — AutoCAD,
 * Revit, Fusion — used as the site's structural device rather than a rule or
 * a divider.
 *
 * It has two jobs:
 *   1. static — measures a block of type and labels the span (masthead, closer)
 *   2. live   — acts as the horizontal scrollbar for the work rail, filling
 *               volt from the left as you drag. Pass `progress` for this.
 *
 * The whole thing is CSS. Arrowheads are borders rather than SVG so they stay
 * crisp at any zoom, and the draw-in animation is declarative so it costs
 * nothing on the main thread.
 */
export default function DimensionLine({
  label,
  progress,
  className = "",
}: {
  label: string;
  /** 0–1. Omit for a static dimension. */
  progress?: number;
  className?: string;
}) {
  const live = typeof progress === "number";
  const clamped = live ? Math.min(1, Math.max(0, progress)) : 0;

  return (
    <div
      className={`dim ${className}`.trim()}
      data-live={live}
      style={{ "--dim-progress": clamped } as React.CSSProperties}
      aria-hidden="true"
    >
      {live ? <span className="dimFill" /> : null}
      <span className="dimTick" />
      <span className="dimArm dimArm--l">
        <span className="dimArrow dimArrow--l" />
      </span>
      <span className="dimLabel">{label}</span>
      <span className="dimArm dimArm--r">
        <span className="dimArrow dimArrow--r" />
      </span>
      <span className="dimTick" />
    </div>
  );
}
