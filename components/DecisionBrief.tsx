import type { DecisionBrief as Brief, LiveProduct } from "@/content/caseStudies";
import s from "./DecisionBrief.module.css";

/**
 * The 60-second version, above the essay.
 *
 * Two things drive this component. First, a growing share of first-round
 * interviews skip the portfolio walkthrough entirely, so the written study is
 * a trailer rather than the test - it has to survive a 90-second skim.
 * Second, roughly three quarters of recruiters now run AI-assisted screening
 * before a human opens the page, so the load-bearing claims need to sit in
 * clean, early, machine-readable prose rather than being buried mid-essay.
 *
 * The four rows are deliberate: situation and decision establish role fit and
 * seniority, "what I'd defend" is the impact delta, and "what went wrong"
 * is the honesty signal. Nothing here is a process diagram.
 */

const ROWS: { key: keyof Brief; label: string }[] = [
  { key: "situation", label: "The situation" },
  { key: "decision", label: "The decision I owned" },
  { key: "defend", label: "What I'd defend" },
  { key: "wrong", label: "What I got wrong" },
];

export default function DecisionBrief({
  brief,
  live,
}: {
  brief: Brief;
  live?: LiveProduct;
}) {
  return (
    <section className={s.wrap} aria-label="Decision brief">
      <div className={s.head}>
        <span className="label label--accent">In 60 seconds</span>
        <span className={s.headNote}>
          The full story is below. This is the part that has to survive a skim.
        </span>
      </div>

      <dl className={s.rows}>
        {ROWS.map((r) => (
          <div key={r.key} className={s.row}>
            <dt className="label">{r.label}</dt>
            <dd className={r.key === "wrong" ? s.valueHonest : s.value}>
              {brief[r.key]}
            </dd>
          </div>
        ))}
      </dl>

      {live ? (
        <div className={s.live}>
          <span className="label">Shipped</span>
          {live.url ? (
            <a href={live.url} target="_blank" rel="noopener" className={s.liveLink}>
              {live.label} <span aria-hidden="true">↗</span>
            </a>
          ) : (
            <span className={s.liveText}>
              {live.label}
              {live.note ? (
                <span className="fill" title="Add a link or remove this note">
                  {live.note}
                </span>
              ) : null}
            </span>
          )}
        </div>
      ) : null}
    </section>
  );
}
