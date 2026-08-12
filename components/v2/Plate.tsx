import type { Slot } from "@/content/v2";

/**
 * An image, or a labelled hole where one goes.
 *
 * While `slot.src` is null this renders a survey-marker frame that names the
 * exact file to save and the path to save it at. It is deliberately legible —
 * you can ship a draft full of these and still show someone — and deliberately
 * loud enough that you would never mistake one for finished work.
 *
 * To fill a slot: save the export to `public/v2/<slot>.jpg`, then set
 * `src: "/v2/<slot>.jpg"` in content/v2.ts. Nothing else changes; the frame
 * already reserves the right aspect ratio, so filling one causes no reflow.
 *
 * Uses a plain <img>, not next/image: this site is a static export with
 * `images.unoptimized`, so next/image would add weight and buy nothing.
 */
export default function Plate({
  slot,
  className = "",
  priority = false,
}: {
  slot: Slot;
  className?: string;
  /** Set on the first image on a page so it isn't lazy-loaded. */
  priority?: boolean;
}) {
  const style = { aspectRatio: slot.ratio } as React.CSSProperties;

  if (slot.src) {
    return (
      <div className={`plate ${className}`.trim()} style={style}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={slot.src}
          alt={slot.alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
        />
      </div>
    );
  }

  return (
    <div
      className={`plate plate--empty ${className}`.trim()}
      style={style}
      role="img"
      aria-label={`Image placeholder: ${slot.note}`}
    >
      <span className="plateBadge">
        <span className="plateKey">Image · {slot.ratio.replace(/\s/g, "")}</span>
        <span className="plateNote">{slot.note}</span>
        <span className="platePath">public/v2/{slot.slot}.jpg</span>
      </span>
    </div>
  );
}
