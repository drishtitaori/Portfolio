import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { studies, studyBySlug } from "@/content/v2";
import { Reveal, Kinetic } from "@/components/v2/motion";
import Plate from "@/components/v2/Plate";

/**
 * Case study template.
 *
 * The order is deliberate and matches how these actually get read in a hiring
 * loop: title → spec block → 30-second brief → metrics → the long version.
 * A hiring manager who reads only the brief should still come away with the
 * decision and the outcome, because many of them will read only the brief.
 *
 * Next 16 note: `params` is a promise. Synchronous access was removed.
 */

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return studies.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = studyBySlug(slug);
  if (!study) return {};

  return {
    title: `${study.title.join(" ")} — ${study.org}`,
    description: study.deck,
  };
}

export default async function StudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const study = studyBySlug(slug);
  if (!study) notFound();

  const i = studies.findIndex((s) => s.slug === slug);
  const prev = i > 0 ? studies[i - 1] : null;
  const next = i < studies.length - 1 ? studies[i + 1] : null;

  const specs = [
    { label: "Role", value: study.role },
    { label: "Team", value: study.team },
    { label: "Duration", value: study.duration },
    { label: "Platform", value: study.platform },
  ];

  return (
    <article>
      {/* ---------------------------------------------------------------- */}
      <header className="sheetInner studyHead">
        <Link href="/#work" className="studyBack">
          <i aria-hidden="true">←</i> All work
        </Link>

        <div className="studyMeta">
          <span className="mono">
            {String(i + 1).padStart(2, "0")} / {String(studies.length).padStart(2, "0")}
          </span>
          <span className="mono">{study.org}</span>
          <span className="mono">{study.year}</span>
        </div>

        <h1 className="studyTitle">
          <Kinetic text={study.title[0]} trigger="load" stagger={55} delay={100} />{" "}
          <Kinetic text={study.title[1]} trigger="load" stagger={55} delay={260} />
        </h1>

        <p className="studyDeck">{study.deck}</p>

        <ul className="tags">
          {study.tags.map((t) => (
            <li className="tag" key={t}>
              {t}
            </li>
          ))}
        </ul>

        <div className="specs">
          {specs.map((s) => (
            <div className="specCell" key={s.label}>
              <span className="mono">{s.label}</span>
              <span className="specValue">{s.value}</span>
            </div>
          ))}
        </div>
      </header>

      {/* ---------------------------------------------------------------- */}
      <div className="sheetInner">
        <Reveal>
          <Plate slot={study.cover} priority />
        </Reveal>
      </div>

      {/* ----------------------------------------------------------------
          THE 30-SECOND READ
          Situation, decision, outcome. Assume this is all that gets read.
         ---------------------------------------------------------------- */}
      <section className="sheetInner section">
        <Reveal className="sectionHead">
          <h2 className="sectionTitle">The short version</h2>
          <span className="mono">30 seconds</span>
        </Reveal>

        <Reveal className="brief">
          <div className="briefItem">
            <span className="mono mono--accent">Situation</span>
            <p className="briefText">{study.brief.situation}</p>
          </div>
          <div className="briefItem">
            <span className="mono mono--accent">What I decided</span>
            <p className="briefText">{study.brief.decision}</p>
          </div>
          <div className="briefItem">
            <span className="mono mono--accent">Outcome</span>
            <p className="briefText">{study.brief.outcome}</p>
          </div>
        </Reveal>

        <Reveal className="metrics" delay={100}>
          {study.metrics.map((m) => (
            <div className="metric" key={m.label}>
              <span className="metricValue">{m.value}</span>
              <span className="impactLabel">{m.label}</span>
              <span className="impactCaveat">{m.caveat}</span>
            </div>
          ))}
        </Reveal>
      </section>

      {/* ----------------------------------------------------------------
          THE LONG VERSION
         ---------------------------------------------------------------- */}
      {study.sections.map((section, si) => (
        <section className="sheetInner studySection" key={section.heading}>
          <div className="studyGrid">
            <Reveal>
              <span className="mono">{section.kind}</span>
            </Reveal>

            <Reveal className="studyBody" delay={60}>
              <h2 className="studyHeading">{section.heading}</h2>
              {section.body.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}

              {/* The only place rust appears on the whole site. Naming what
                  went wrong is the most attackable claim in a portfolio, so
                  it gets its own container rather than a buried sentence. */}
              {section.honest ? (
                <div className="honest">
                  <span className="honestLabel">What went wrong</span>
                  <p>{section.honest}</p>
                </div>
              ) : null}
            </Reveal>

            {section.image ? (
              <Reveal as="figure" className="figure" delay={80}>
                <Plate slot={section.image} />
                {/* `alt` describes the image to a visitor; `note` is the
                    instruction to whoever fills the slot. Captioning with the
                    note just prints the placeholder text twice. */}
                <figcaption className="figureCaption">
                  Fig. {String(si + 1).padStart(2, "0")} — {section.image.alt}
                </figcaption>
              </Reveal>
            ) : null}
          </div>
        </section>
      ))}

      {/* ---------------------------------------------------------------- */}
      <section className="sheetInner closer">
        <Reveal>
          <h2 className="closerTitle">Want the version with the messy middle?</h2>
          <a className="closerMail" href="mailto:drishtitaori57@gmail.com">
            Ask me to walk you through it <i aria-hidden="true">→</i>
          </a>
        </Reveal>
      </section>

      {/* ---------------------------------------------------------------- */}
      <nav className="pager" aria-label="More case studies">
        {prev ? (
          <Link className="pagerLink" href={`/work/${prev.slug}/`}>
            <span className="mono">← Previous</span>
            <span className="pagerTitle">
              {prev.title[0]} {prev.title[1]}
            </span>
          </Link>
        ) : (
          <span className="pagerLink" />
        )}
        {next ? (
          <Link className="pagerLink pagerLink--next" href={`/work/${next.slug}/`}>
            <span className="mono">Next →</span>
            <span className="pagerTitle">
              {next.title[0]} {next.title[1]}
            </span>
          </Link>
        ) : (
          <span className="pagerLink" />
        )}
      </nav>
    </article>
  );
}
