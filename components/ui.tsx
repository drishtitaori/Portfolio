import Link from "next/link";
import type { Metric } from "@/content/caseStudies";
import styles from "./ui.module.css";

/* ============================================================
   Fill — a visible, honest placeholder.

   Use this anywhere the copy needs a fact only Drishti can supply
   (a baseline, a sample size, a date). It renders as an obvious
   highlighted blank rather than an invented number, so nothing on
   this site is something she can’t defend in an interview.

   Run `npm run fills` to list every remaining one.
   ============================================================ */
export function Fill({ children }: { children: React.ReactNode }) {
  return (
    <span className="fill" title="Placeholder — replace with the real figure">
      {children}
    </span>
  );
}

/* ============================================================
   Prose section with a mono side-label. The label column is what
   makes long-form case studies scannable for a recruiter skimming
   in 90 seconds while still reading as an essay.
   ============================================================ */
export function Section({
  label,
  title,
  children,
  id,
}: {
  label?: string;
  title?: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section className={styles.section} id={id}>
      <div className={styles.sectionAside}>
        {label ? <span className="label">{label}</span> : null}
      </div>
      <div className={styles.sectionBody}>
        {title ? <h2 className={styles.sectionTitle}>{title}</h2> : null}
        {children}
      </div>
    </section>
  );
}

/* Full-bleed-ish container for diagrams that break the reading column. */
export function Wide({
  children,
  caption,
  label,
}: {
  children: React.ReactNode;
  caption?: React.ReactNode;
  label?: string;
}) {
  return (
    <figure className={styles.wide}>
      {/* A <figure> may only contain one <figcaption>, so the eyebrow
          label is a plain element and the caption keeps the semantics. */}
      {label ? <div className={`label ${styles.wideLabel}`}>{label}</div> : null}
      <div className={styles.wideBody}>{children}</div>
      {caption ? <figcaption className={styles.caption}>{caption}</figcaption> : null}
    </figure>
  );
}

/* ============================================================
   Image slot that degrades gracefully.

   With no `src`, it renders a labelled placeholder that states
   exactly what should go there — so the page reads as intentional
   rather than unfinished, and doubles as Drishti’s shot list.
   ============================================================ */
export function Figure({
  src,
  alt,
  shot,
  caption,
  ratio = "16 / 10",
}: {
  src?: string;
  alt?: string;
  /** What to capture. Shown in the placeholder. */
  shot?: string;
  caption?: React.ReactNode;
  ratio?: string;
}) {
  return (
    <figure className={styles.figure}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt ?? ""} className={styles.image} />
      ) : (
        <div className={styles.slot} style={{ aspectRatio: ratio }} role="img" aria-label={shot ? `Placeholder for: ${shot}` : "Image placeholder"}>
          <span className="label">Image slot</span>
          {shot ? <p className={styles.slotShot}>{shot}</p> : null}
        </div>
      )}
      {caption ? <figcaption className={styles.caption}>{caption}</figcaption> : null}
    </figure>
  );
}

/* ============================================================
   Metrics — never a bare number. The caveat is the point.
   ============================================================ */
export function Metrics({ items, compact = false }: { items: Metric[]; compact?: boolean }) {
  return (
    <dl className={`${styles.metrics} ${compact ? styles.metricsCompact : ""}`}>
      {items.map((m) => (
        <div key={m.label} className={styles.metric}>
          <dt className={styles.metricValue}>{m.value}</dt>
          <dd className={styles.metricLabel}>
            {m.label}
            {m.caveat ? <span className={styles.metricCaveat}>{m.caveat}</span> : null}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/* ============================================================
   Callout variants:
   - decision: a call I made and the reasoning
   - honest:   what the data doesn’t support / what went wrong
   - note:     ordinary aside
   ============================================================ */
export function Callout({
  kind = "note",
  title,
  children,
}: {
  kind?: "decision" | "honest" | "note";
  title: string;
  children: React.ReactNode;
}) {
  const kindLabel = {
    decision: "The call I made",
    honest: "Being straight about this",
    note: "Note",
  }[kind];

  return (
    <aside className={`${styles.callout} ${styles[`callout_${kind}`]}`}>
      <span className="label">{kindLabel}</span>
      <h3 className={styles.calloutTitle}>{title}</h3>
      <div className={styles.calloutBody}>{children}</div>
    </aside>
  );
}

export function PullQuote({
  children,
  attribution,
}: {
  children: React.ReactNode;
  attribution?: string;
}) {
  return (
    <blockquote className={styles.pull}>
      <p>{children}</p>
      {attribution ? <cite className={styles.pullCite}>{attribution}</cite> : null}
    </blockquote>
  );
}

/* ============================================================
   Ledger — two- or three-column decision table. Used for
   shipped/cut/deferred, and for the AI "do / don’t" ledger.
   ============================================================ */
export function Ledger({
  columns,
  rows,
  caption,
}: {
  columns: string[];
  rows: React.ReactNode[][];
  caption?: string;
}) {
  return (
    <div className={styles.ledgerWrap}>
      <table className={styles.ledger}>
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c} scope="col" className="label">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {caption ? <p className={styles.caption}>{caption}</p> : null}
    </div>
  );
}

/* Small labelled fact list — role, team, timeframe. */
export function FactList({ items }: { items: { label: string; value: React.ReactNode }[] }) {
  return (
    <dl className={styles.facts}>
      {items.map((f) => (
        <div key={f.label}>
          <dt className="label">{f.label}</dt>
          <dd>{f.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function TagRow({ tags }: { tags: string[] }) {
  return (
    <ul className={styles.tags}>
      {tags.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  );
}

export function NextPrev({
  prev,
  next,
}: {
  prev?: { slug: string; title: string; index: string };
  next?: { slug: string; title: string; index: string };
}) {
  return (
    <nav className={styles.nextPrev} aria-label="More work">
      <div>
        {prev ? (
          <Link href={`/v2/work/${prev.slug}/`} className={styles.nextPrevLink}>
            <span className="label">← {prev.index}</span>
            <span className={styles.nextPrevTitle}>{prev.title}</span>
          </Link>
        ) : null}
      </div>
      <div className={styles.nextPrevRight}>
        {next ? (
          <Link href={`/v2/work/${next.slug}/`} className={styles.nextPrevLink}>
            <span className="label">{next.index} →</span>
            <span className={styles.nextPrevTitle}>{next.title}</span>
          </Link>
        ) : null}
      </div>
    </nav>
  );
}
