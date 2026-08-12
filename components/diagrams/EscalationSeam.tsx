import s from "./diagrams.module.css";

/**
 * The moment the agent gives up. Most of the design work on this
 * project went into this seam, not into the conversation above it.
 */

type Row = {
  verdict: string;
  verdictClass: string;
  gutterClass: string;
  gutterMark: string;
  agentTitle: string;
  agentBody: string;
  humanTitle: string;
  /** What the human agent actually sees the instant they pick it up. */
  screen: { key: string; value: React.ReactNode }[];
};

const ROWS: Row[] = [
  {
    verdict: "How escalation usually works",
    verdictClass: s.seamVerdictBad,
    gutterClass: s.seamGutterBroken,
    gutterMark: "Context dropped",
    agentTitle: "Agent’s last state",
    agentBody:
      "Six turns of diagnosis. Two fixes already ruled out. Knows the product version, the license type, and what the person already tried.",
    humanTitle: "What the human sees first",
    screen: [
      { key: "Ticket", value: "“Assistant could not resolve.”" },
      { key: "History", value: <span className={s.seamEmpty}>Not attached</span> },
      { key: "Ruled out", value: <span className={s.seamEmpty}>Not attached</span> },
      { key: "First words", value: "“Hi, how can I help you today?”" },
    ],
  },
  {
    verdict: "How we designed it",
    verdictClass: s.seamVerdictGood,
    gutterClass: s.seamGutterOpen,
    gutterMark: "Context carried",
    agentTitle: "Agent’s last state",
    agentBody:
      "Same six turns. But the handoff is a payload, not a status change — the agent has to summarise its own failure before it is allowed to escalate.",
    humanTitle: "What the human sees first",
    screen: [
      { key: "Summary", value: "One paragraph, agent-written, person-editable before it sends." },
      { key: "Ruled out", value: "The two fixes already attempted, and why each failed." },
      { key: "State", value: "Product, version, license, and the file or account in question." },
      { key: "First words", value: "“I’ve read what you tried. Let’s start from the part that failed.”" },
    ],
  },
];

export default function EscalationSeam() {
  return (
    <div className={s.seamSet}>
      {ROWS.map((r, i) => (
        <div key={r.verdict} className={`${s.seamRow} ${i === 1 ? s.seamRowGood : ""}`}>
          <div className={`${s.seamSide} ${s.seamSideAgent}`}>
            <span className={`${s.seamVerdict} ${r.verdictClass}`}>{r.verdict}</span>
            <span className="label">{r.agentTitle}</span>
            <p style={{ fontSize: "0.8125rem", lineHeight: 1.55, color: "var(--ink-secondary)" }}>
              {r.agentBody}
            </p>
          </div>

          <div className={`${s.seamGutter} ${r.gutterClass}`} aria-hidden="true">
            <span className={s.seamGutterMark}>{r.gutterMark}</span>
          </div>

          <div className={s.seamSide}>
            <span className="label">{r.humanTitle}</span>
            <div className={s.firstScreen}>
              {r.screen.map((line) => (
                <div key={line.key} className={s.firstScreenLine}>
                  <span className={s.firstScreenKey}>{line.key}</span>
                  <span className={s.firstScreenVal}>{line.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
