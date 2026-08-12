import { bySlug, pillarLabels } from "@/content/caseStudies";
import { Metrics, FactList, TagRow } from "./ui";
import DecisionBrief from "./DecisionBrief";
import s from "./StudyHeader.module.css";

/**
 * Shared header for every case study. Reads its content from the
 * registry so the homepage and the study page can never disagree.
 *
 * `team` and `contribution` are passed per-study because the honest
 * answer to "what was yours" differs every time, and a hiring manager
 * will ask it within the first two minutes.
 */
export default function StudyHeader({
  slug,
  team,
  contribution,
}: {
  slug: string;
  team: string;
  contribution: string;
}) {
  const study = bySlug(slug);
  if (!study) throw new Error(`Unknown case study: ${slug}`);

  return (
    <header className={`frame ${s.header}`}>
      <div className={s.top}>
        <span className="label label--accent">
          {study.index} · {study.kind === "deep" ? "Case study" : "Short"}
        </span>
        <span className="label">{study.readingTime} read</span>
      </div>

      <h1 className={s.title}>{study.title}</h1>
      <p className={s.deck}>{study.deck}</p>

      <div className={s.facts}>
        <FactList
          items={[
            { label: "Organisation", value: study.org },
            { label: "My role", value: study.role || "—" },
            { label: "Timeframe", value: study.timeframe },
            { label: "Team", value: team },
          ]}
        />
      </div>

      <div className={s.contribution}>
        <span className="label">What was mine</span>
        <p>{contribution}</p>
      </div>

      <div className={s.metrics}>
        <Metrics items={study.metrics} />
      </div>

      {study.brief ? (
        <DecisionBrief brief={study.brief} live={study.live} />
      ) : null}

      <div className={s.footer}>
        <TagRow tags={study.tags} />
        <p className={s.pillars}>
          <span className="label">Meant to show</span>{" "}
          {study.pillars.map((p) => pillarLabels[p]).join(" · ")}
        </p>
      </div>
    </header>
  );
}
