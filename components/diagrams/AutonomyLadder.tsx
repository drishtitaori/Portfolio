import s from "./diagrams.module.css";

type Rung = {
  step: string;
  name: string;
  agentDoes: string;
  personDoes: string;
  /** 0–100, share of the decision the agent holds */
  agentShare: number;
  usedFor: string;
};

const RUNGS: Rung[] = [
  {
    step: "Rung 01",
    name: "Answer",
    agentDoes: "Explains, points to the right place, cites where it got that.",
    personDoes: "Everything. The agent has changed nothing.",
    agentShare: 15,
    usedFor: "Anything unfamiliar, and every question about licensing or billing terms.",
  },
  {
    step: "Rung 02",
    name: "Suggest",
    agentDoes: "Proposes a specific next action and shows what it would change.",
    personDoes: "Chooses, or ignores it. One click either way.",
    agentShare: 40,
    usedFor: "Settings, preferences, and anything a person can undo in one step.",
  },
  {
    step: "Rung 03",
    name: "Stage",
    agentDoes: "Does the work, stops short of committing it, presents the diff.",
    personDoes: "Reviews and approves. Can edit before committing.",
    agentShare: 70,
    usedFor: "Multi-step fixes, and anything touching a shared or versioned file.",
  },
  {
    step: "Rung 04",
    name: "Act",
    agentDoes: "Completes the task, then reports what it did and how to reverse it.",
    personDoes: "Nothing up front. Retains a visible, single-step undo.",
    agentShare: 92,
    usedFor: "Reversible, low-consequence, high-confidence tasks only.",
  },
];

export default function AutonomyLadder() {
  return (
    <div>
      <div className={s.ladder}>
        <div className={s.ladderHead}>
          <span className="label">Posture</span>
          <span className="label">What the agent does</span>
          <span className="label">What the person does</span>
          <span className="label">Decision held by</span>
        </div>

        {RUNGS.map((r) => (
          <div className={s.ladderRow} key={r.name}>
            <div className={s.ladderRung}>
              <span className={s.ladderStep}>{r.step}</span>
              <span className={s.ladderName}>{r.name}</span>
            </div>
            <p className={s.ladderCell}>{r.agentDoes}</p>
            <p className={s.ladderCell}>{r.personDoes}</p>
            <div>
              <div
                className={s.share}
                role="img"
                aria-label={`Agent holds roughly ${r.agentShare} percent of the decision, person holds the rest`}
              >
                <span className={s.shareAgent} style={{ width: `${r.agentShare}%` }} />
                <span className={s.shareHuman} style={{ width: `${100 - r.agentShare}%` }} />
              </div>
              <p className={s.ladderCell} style={{ marginBlockStart: "var(--s-2)", fontSize: "0.8125rem" }}>
                {r.usedFor}
              </p>
            </div>
          </div>
        ))}
      </div>

      <ul className={s.shareKey}>
        <li>
          <span className={`${s.swatch} ${s.swatchAgent}`} /> Agent
        </li>
        <li>
          <span className={`${s.swatch} ${s.swatchHuman}`} /> Person
        </li>
      </ul>
    </div>
  );
}
