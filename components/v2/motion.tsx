"use client";

import { useEffect, useRef, useState } from "react";

/* ============================================================================
   Scroll choreography for v2.
   ----------------------------------------------------------------------------
   Everything here is progressive enhancement. The hiding rules in v2.css are
   gated on `html.js`, which the boot script in app/layout.tsx sets before first
   paint — so with JavaScript off nothing is invisible, and with
   prefers-reduced-motion nothing moves.
   ========================================================================== */

/**
 * Fires once, when the element has crossed far enough into the viewport that
 * the reveal will finish before the reader reaches it.
 */
function useInView<T extends HTMLElement>(rootMargin = "0px 0px -12% 0px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin, threshold: 0.15 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return { ref, inView };
}

const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* -------------------------------------------------------------------------- */

type Tag = "div" | "section" | "li" | "article" | "figure" | "header" | "p";

/** Fades a block up as it enters. `delay` staggers siblings. */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
  id,
}: {
  children: React.ReactNode;
  delay?: number;
  as?: Tag;
  className?: string;
  id?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <Tag
      id={id}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={`rv ${className}`.trim()}
      data-in={inView}
      style={{ "--rv-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}

/* -------------------------------------------------------------------------- */

/**
 * Word-by-word kinetic type. Each word rides up from behind a clipping mask,
 * staggered left to right.
 *
 * Wrap a word in asterisks to set it in the accent colour:
 *   "make it *decidable* — find the constraint"
 *
 * `trigger="load"` runs the animation on mount (for the masthead, which is
 * already in view); `trigger="scroll"` waits for the element to enter.
 */
export function Kinetic({
  text,
  as: Tag = "span",
  className = "",
  stagger = 34,
  delay = 0,
  trigger = "scroll",
}: {
  text: string;
  as?: "span" | "h1" | "h2" | "p" | "div";
  className?: string;
  /** ms between consecutive words */
  stagger?: number;
  /** ms before the first word moves */
  delay?: number;
  trigger?: "load" | "scroll";
}) {
  const { ref, inView } = useInView<HTMLElement>();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // One frame's grace so the initial transform paints before it animates out.
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const on = trigger === "load" ? mounted : inView;
  const words = text.split(/\s+/).filter(Boolean);

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={`kin ${className}`.trim()}
      data-in={on}
    >
      {words.map((word, i) => {
        const accent = word.startsWith("*") || word.endsWith("*");
        const clean = word.replace(/\*/g, "");
        const Inner = accent ? "em" : "span";

        return (
          <span key={`${clean}-${i}`}>
            <span
              className="kinWord"
              style={{ "--kin-delay": `${delay + i * stagger}ms` } as React.CSSProperties}
            >
              <Inner>{clean}</Inner>
            </span>
            {i < words.length - 1 ? " " : null}
          </span>
        );
      })}
    </Tag>
  );
}

/* -------------------------------------------------------------------------- */

/**
 * Counts up to a number when it scrolls into view. Falls straight to the final
 * value under reduced motion — a number ticking is decoration, not information.
 */
export function Counter({
  value,
  suffix = "",
  duration = 1100,
}: {
  value: string;
  suffix?: string;
  duration?: number;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const target = Number.parseInt(value, 10);
  const numeric = Number.isFinite(target);
  const [shown, setShown] = useState(numeric ? 0 : target);

  useEffect(() => {
    if (!inView || !numeric) return;

    if (reduced()) {
      setShown(target);
      return;
    }

    let raf = 0;
    const start = performance.now();

    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // Ease-out cubic: fast off the line, settles precisely on the value.
      const eased = 1 - Math.pow(1 - t, 3);
      setShown(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, numeric, target, duration]);

  return (
    <span ref={ref}>
      {numeric ? shown : value}
      {suffix ? <i>{suffix}</i> : null}
    </span>
  );
}
