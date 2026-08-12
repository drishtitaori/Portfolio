import s from "./diagrams.module.css";

/**
 * Vision decomposed into a shippable sequence.
 *
 * A vision deck that can’t be cut into fundable pieces is a mood
 * board. This diagram is the artifact that made the vision
 * survivable — each horizon names the bet and what would falsify it.
 */

export type Horizon = {
  when: string;
  scope: string;
  title: string;
  bet: string;
  falsifier: string;
};

export default function HorizonMap({ horizons }: { horizons: Horizon[] }) {
  return (
    <div className={s.horizon}>
      {horizons.map((h) => (
        <div className={s.horizonRow} key={h.title}>
          <div className={s.horizonWhen}>
            <span className="label label--accent">{h.when}</span>
            <span className={s.tlOwner}>{h.scope}</span>
          </div>
          <div className={s.horizonBody}>
            <p className={s.horizonTitle}>{h.title}</p>
            <p>
              <strong style={{ color: "var(--ink)", fontWeight: 500 }}>The bet: </strong>
              {h.bet}
            </p>
            <p>
              <span className={s.horizonProof}>What would prove us wrong</span>
              <br />
              {h.falsifier}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
