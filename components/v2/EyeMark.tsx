/**
 * The eye mark.
 *
 * "Drishti" is Sanskrit for sight — the gaze, the act of looking. So the logo
 * isn't a decorative glyph next to the name, it *is* the name, and it doubles as
 * the claim the portfolio makes about her: someone who watches closely.
 *
 * HOW THE BLINK WORKS
 * Everything inside the almond is clipped to it. A lid rectangle sits on top,
 * scaled to zero height from its upper edge, so it's invisible at rest. The
 * blink animation scales it to full height and back — the lid sweeps down over
 * the iris and lifts again, while the almond outline stays put. That's a real
 * eyelid rather than the whole mark squashing vertically, which is what you get
 * if you animate `scaleY` on the group and it reads as a wink, not a blink.
 *
 * Done this way it is pure CSS on a `transform`, so it never touches layout and
 * costs nothing on the main thread. `d` interpolation would have been prettier
 * but isn't reliable outside Chromium.
 *
 * The clipPath needs a document-unique id, hence the `id` prop — render this
 * twice with the same id and the second instance clips against the first.
 */
export default function EyeMark({
  id = "eye",
  className = "",
}: {
  id?: string;
  className?: string;
}) {
  const clip = `${id}-clip`;
  const grad = `${id}-grad`;

  // One almond, reused as both the clip and the visible outline, so the stroke
  // can never drift out of register with the fill.
  // Taller than a naturalistic eye on purpose. A flatter almond clips the iris
  // to a thin lens and the peacock gradient stops being readable at logo size.
  const almond = "M2.5 16c3.2-6.9 7.9-10.4 13.5-10.4S26.3 9.1 29.5 16c-3.2 6.9-7.9 10.4-13.5 10.4S5.7 22.9 2.5 16Z";

  return (
    <svg
      className={`eye ${className}`.trim()}
      viewBox="0 0 32 32"
      role="img"
      aria-label="Drishti Taori"
      focusable="false"
    >
      <defs>
        <clipPath id={clip}>
          <path d={almond} />
        </clipPath>
        {/* The three peacock hues, in the one place a gradient is allowed. */}
        <linearGradient id={grad} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--peacock-indigo)" />
          <stop offset="55%" stopColor="var(--accent)" />
          <stop offset="100%" stopColor="var(--peacock-green)" />
        </linearGradient>
      </defs>

      <g clipPath={`url(#${clip})`}>
        <rect x="0" y="0" width="32" height="32" fill="var(--paper)" />
        <circle cx="16" cy="16" r="7.6" fill={`url(#${grad})`} />
        <circle cx="16" cy="16" r="2.9" fill="var(--ink)" />
        {/* Catchlight. Small, off-centre — it's what makes an eye look alive. */}
        <circle cx="18.9" cy="13.1" r="1.25" fill="var(--paper)" opacity="0.92" />
        <rect
          className="eyeLid"
          x="0"
          y="0"
          width="32"
          height="32"
          fill="var(--paper)"
        />
      </g>

      <path
        d={almond}
        fill="none"
        stroke="var(--ink)"
        strokeWidth="1.9"
        strokeLinejoin="round"
      />
    </svg>
  );
}
