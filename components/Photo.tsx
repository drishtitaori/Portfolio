import s from "./Photo.module.css";

/**
 * A real photograph, served responsively.
 *
 * Static export means there's no build-time image optimisation, so the sizes
 * and WebP variants are pre-generated in public/img and selected here with a
 * <picture> element. WebP first, JPEG fallback.
 */

export default function Photo({
  base,
  widths,
  alt,
  sizes,
  caption,
  ratio = "3 / 4",
  priority = false,
  className = "",
  maxWidth,
}: {
  /** e.g. "/img/portrait" for /img/portrait-700.webp etc. */
  base: string;
  widths: number[];
  alt: string;
  sizes: string;
  caption?: React.ReactNode;
  ratio?: string;
  priority?: boolean;
  className?: string;
  /** CSS max-width of the rendered slot. Keep `sizes` consistent with it. */
  maxWidth?: string;
}) {
  const srcset = (ext: string) =>
    widths.map((w) => `${base}-${w}.${ext} ${w}w`).join(", ");

  return (
    <figure
      className={`${s.figure} ${className}`.trim()}
      style={maxWidth ? { maxWidth } : undefined}
    >
      <div className={s.frame} style={{ aspectRatio: ratio }}>
        <picture>
          <source type="image/webp" srcSet={srcset("webp")} sizes={sizes} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${base}-${widths[widths.length - 1]}.jpg`}
            srcSet={srcset("jpg")}
            sizes={sizes}
            alt={alt}
            className={s.img}
            loading={priority ? "eager" : "lazy"}
            decoding={priority ? "sync" : "async"}
            fetchPriority={priority ? "high" : "auto"}
          />
        </picture>
      </div>
      {caption ? <figcaption className={s.caption}>{caption}</figcaption> : null}
    </figure>
  );
}
