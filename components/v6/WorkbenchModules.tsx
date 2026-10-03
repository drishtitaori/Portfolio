"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { profile, selectedExperience, speakingProof, startingPaths, studies, workshopPractice } from "@/content/v6";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

type SeattleWeather = {
  temperature_2m?: number;
  weather_code?: number;
  wind_speed_10m?: number;
  is_day?: number;
};

const seattleMoment = (date: Date) => {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    weekday: "long",
    hour: "numeric",
    hourCycle: "h23",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === type)?.value ?? "";
  return {
    weekday: get("weekday"),
    hour: Number(get("hour")),
    year: Number(get("year")),
    month: Number(get("month")),
    date: Number(get("day")),
  };
};

const weatherLabel = (code: number | undefined, windSpeed: number | undefined) => {
  if ([95, 96, 99].includes(code ?? -1)) return "stormy";
  if ((windSpeed ?? 0) >= 22) return "windy";
  if (code === 0) return "clear";
  if ([1, 2, 3].includes(code ?? -1)) return "cloudy";
  if ([45, 48].includes(code ?? -1)) return "misty";
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code ?? -1)) return "rainy";
  if ([71, 73, 75, 77, 85, 86].includes(code ?? -1)) return "snowy";
  return "changeable";
};

const nearFullMoon = (year: number, month: number, date: number) => {
  const lunarCycle = 29.530588853;
  const referenceNewMoon = Date.UTC(2000, 0, 6, 18, 14);
  const age = ((Date.UTC(year, month - 1, date) - referenceNewMoon) / 86_400_000) % lunarCycle;
  const normalizedAge = age < 0 ? age + lunarCycle : age;
  return normalizedAge > 12.8 && normalizedAge < 16.7;
};

const fieldNote = (weather: string, day: string, hour: number, moonNoteIsSuitable: boolean) => {
  const weekend = day === "Saturday" || day === "Sunday";
  const time = hour < 11 ? "morning" : hour < 17 ? "afternoon" : "evening";
  if (weather === "clear" && moonNoteIsSuitable) {
    return "Clear evening ahead. I’m hoping to catch the moon and a few stars.";
  }
  const weekendNotes: Record<string, Record<string, string[]>> = {
    clear: {
      morning: ["A bright Seattle weekend morning. I’m thinking gardening or a trail.", "The weather is good this morning. I might start the day near the water."],
      afternoon: ["A clear Seattle afternoon. Kayaking or a longer walk sounds lovely.", "The sun is out today. I’m thinking of making the most of it outdoors."],
      evening: ["A clear Seattle evening. I’m looking forward to the last bit of light.", "The weekend is settling into a bright Seattle evening."],
    },
    rainy: {
      morning: ["Seattle rain on a weekend morning. I’m thinking slow coffee and something warm.", "A rainy Seattle start. The city feels especially quiet today."],
      afternoon: ["A soft rainy afternoon in Seattle. I’m enjoying the slower pace.", "Seattle rain today. I’m thinking a book and an unhurried afternoon."],
      evening: ["A rainy Seattle weekend evening. I’m grateful for a warm place to be.", "The rain is settling in tonight. It has its own calm charm."],
    },
    cloudy: {
      morning: ["Soft clouds over Seattle this weekend morning. I’m tempted by a walk near the water.", "A cloudy Seattle start. A neighborhood coffee feels about right."],
      afternoon: ["Soft Seattle clouds today. I’m still tempted by a walk near the water.", "A cloudy weekend afternoon. I’m thinking of a neighborhood walk and a good coffee."],
      evening: ["Clouds over Seattle tonight. The city feels pleasantly quiet.", "A soft Seattle weekend evening. I’m enjoying the slower rhythm."],
    },
    misty: {
      morning: ["Misty Seattle weather this morning. I’m thinking a gentle walk somewhere green.", "The city is soft around the edges today. It suits a quiet weekend start."],
      afternoon: ["Misty Seattle light this afternoon. I’m enjoying the calm of it.", "A soft, misty afternoon here. The city feels a little more still."],
      evening: ["A misty Seattle evening. I’m looking forward to a calm night.", "Seattle is fading gently into the weekend evening."],
    },
    snowy: {
      morning: ["A rare snowy Seattle weekend morning. I’m enjoying the surprise.", "Seattle snow today. The whole city feels a little different."],
      afternoon: ["Snow in Seattle this afternoon. I’m grateful for the small bit of wonder.", "A bright, snowy Seattle weekend. It feels like a change of scene."],
      evening: ["A snowy Seattle evening. I’m looking forward to the quiet of it.", "A rare snowy night here. The city feels especially peaceful."],
    },
    windy: {
      morning: ["The wind is up in Seattle this morning. I’m keeping the coffee close.", "A breezy weekend start. The trees are doing all the talking today."],
      afternoon: ["Windy in Seattle this afternoon. I’m thinking warm layers and a good view.", "The wind has picked up today. It makes the city feel awake."],
      evening: ["A breezy Seattle evening. I’m looking forward to something cozy indoors.", "The wind is moving through the city tonight. A warm corner sounds especially good."],
    },
    stormy: {
      morning: ["Seattle is having a lively weather morning. I’m grateful for a warm place to begin the day.", "Stormy weather today. A little extra calm feels welcome."],
      afternoon: ["A stormy Seattle afternoon. I’m keeping the day gentle where I can.", "The weather is putting on a show today. I’m grateful for the pause."],
      evening: ["Stormy Seattle evening. I’m looking forward to a warm, quiet night.", "The storm is moving through Seattle tonight. A calm corner feels just right."],
    },
    changeable: {
      morning: ["Seattle is keeping the weather interesting this morning. I’m curious what the day brings.", "A little of everything in Seattle today. I’m keeping the weekend plans open."],
      afternoon: ["Seattle is changing its mind about the weather today. I’m enjoying the surprise.", "An in-between Seattle afternoon. It feels like the day could go anywhere."],
      evening: ["The day is shifting in Seattle tonight. I’m grateful for a quieter moment.", "An in-between Seattle evening. A gentle close to the weekend day."],
    },
  };
  const weekdayNotes: Record<string, Record<string, string[]>> = {
    clear: {
      morning: ["The weather looks good this morning. I’m already thinking of a walk between meetings.", "A bright Seattle start. I might find a little outside time later."],
      afternoon: ["A clear Seattle afternoon. I’m thinking about the long way home.", "The weather is good today. I’m hoping to get outside after the work is done."],
      evening: ["A clear Seattle evening. I’m grateful for a little light at the end of the day.", "The sky is clear over Seattle tonight. A lovely finish to the day."],
    },
    rainy: {
      morning: ["Seattle rain this morning. It has its own quiet charm.", "A rainy Seattle start. I’m grateful for coffee and a little calm."],
      afternoon: ["Rain on the window in Seattle. I’m looking forward to a warm, quiet evening.", "A rainy Seattle afternoon. The city feels softer today."],
      evening: ["Rainy evening in Seattle. I’m glad to be somewhere warm.", "Seattle is winding down in the rain. A calm end to the day."],
    },
    cloudy: {
      morning: ["Classic Seattle light this morning. I like how it keeps the city soft.", "Clouds over Seattle today. A calm way to begin."],
      afternoon: ["Soft clouds over Seattle this afternoon. It feels pleasantly steady.", "A cloudy Seattle afternoon. I’m glad for the pause between busy things."],
      evening: ["A quiet Seattle evening under the clouds. Thanks for being here.", "Clouds settling over Seattle tonight. It feels calm out there."],
    },
    misty: {
      morning: ["Misty Seattle weather this morning. The city is taking its time coming into focus.", "A soft, misty start in Seattle. I like the slower pace."],
      afternoon: ["Misty Seattle light this afternoon. Everything feels a little gentler.", "The city is still soft around the edges today. I’m enjoying the quiet."],
      evening: ["A misty Seattle evening. I’m grateful for a slower kind of night.", "Seattle is fading gently into the evening tonight."],
    },
    snowy: {
      morning: ["A rare snowy Seattle morning. I’m enjoying the surprise.", "Seattle snow today. A small change that makes the whole city feel different."],
      afternoon: ["Snow in Seattle this afternoon. I’m grateful for the little bit of wonder.", "A bright, snowy Seattle day. The city feels new for a moment."],
      evening: ["A snowy Seattle evening. I’m looking forward to the quiet of it.", "A rare snowy night in Seattle. It feels especially peaceful."],
    },
    windy: {
      morning: ["The wind is up in Seattle this morning. I’m keeping the coffee close.", "A breezy Seattle start. The trees are doing all the talking today."],
      afternoon: ["Windy in Seattle this afternoon. I’m glad for a warm corner to work from.", "The wind has picked up today. It makes the city feel awake."],
      evening: ["A breezy Seattle evening. I’m looking forward to a quieter night indoors.", "The wind is moving through the city tonight. A warm evening feels especially good."],
    },
    stormy: {
      morning: ["Seattle is having a lively weather morning. I’m grateful for a warm place to begin the day.", "Stormy weather in Seattle today. A little extra calm feels welcome."],
      afternoon: ["A stormy Seattle afternoon. I’m keeping the day gentle where I can.", "The weather is putting on a show today. I’m grateful for the pause."],
      evening: ["Stormy Seattle evening. I’m looking forward to a warm, quiet night.", "The storm is moving through Seattle tonight. A calm corner feels just right."],
    },
    changeable: {
      morning: ["Seattle is keeping the weather interesting this morning. I’m curious what the day brings.", "A little of everything in Seattle today. I’m keeping the plans open."],
      afternoon: ["Seattle is changing its mind about the weather today. I’m enjoying the surprise.", "An in-between Seattle afternoon. It feels like the day could go anywhere."],
      evening: ["The day is shifting in Seattle tonight. I’m grateful for a quieter moment.", "An in-between Seattle evening. A gentle close to the day."],
    },
  };
  const optionsForWeather = weekend
    ? weekendNotes[weather]?.[time] ?? weekendNotes.changeable[time]
    : weekdayNotes[weather]?.[time] ?? weekdayNotes.changeable[time];
  return optionsForWeather[(day.length + hour) % optionsForWeather.length];
};

export function StartWithQuestion() {
  const begin = (path: (typeof startingPaths)[number]) => {
    if (path.filter) {
      window.location.assign(`${BASE_PATH}/v6/?filter=${encodeURIComponent(path.filter)}#work`);
      return;
    }
    if (path.href?.startsWith("#")) {
      document.querySelector(path.href)?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
      return;
    }
    document.querySelector("#work")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  return <section className="v6-start" id="start" aria-labelledby="start-title">
    <span className="v6-kicker">Start with your question</span><h2 id="start-title">What would be most useful to see?</h2>
    <div className="v6-startGrid">{startingPaths.map((path) => path.href?.startsWith("/v6/") ? <Link href={path.href} className="v6-startCard" key={path.id}><strong>{path.label}</strong><span>{path.description}</span><small>{path.preview} →</small></Link> : <button type="button" className="v6-startCard" key={path.id} onClick={() => begin(path)}><strong>{path.label}</strong><span>{path.description}</span><small>{path.preview} →</small></button>)}</div>
  </section>;
}

export function WorkIndex() {
  const [filter, setFilter] = useState("All");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const categories = ["All", "AI", "Enterprise", "Fintech"];
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("filter");
    if (requested && categories.includes(requested)) {
      setFilter(requested);
      window.setTimeout(() => headingRef.current?.focus({ preventScroll: true }), 0);
    }
  }, []);
  const updateFilter = (nextFilter: string) => {
    setFilter(nextFilter);
    const url = new URL(window.location.href);
    if (nextFilter === "All") url.searchParams.delete("filter");
    else url.searchParams.set("filter", nextFilter);
    url.hash = "work";
    window.history.replaceState(null, "", url);
  };
  const filtered = studies.filter((study) => filter === "All" || (filter === "AI" ? study.category.includes("AI") : study.category.includes(filter)));
  return <section className="v6-section" id="work"><span className="v6-kicker">Selected work</span><h2 ref={headingRef} tabIndex={-1}>Cases behind the decisions.</h2>
    <div className="v6-filterBar"><div className="v6-filters" aria-label="Filter work">{categories.map((item) => <button type="button" aria-pressed={filter === item} className={filter === item ? "is-active" : ""} key={item} onClick={() => updateFilter(item)}>{item}</button>)}</div><output aria-live="polite">{filtered.length} {filtered.length === 1 ? "case" : "cases"} shown</output></div>
    <div className="v6-workGrid">{filtered.map((study, index) => <Link href={`/v6/work/${study.slug}/`} className={`v6-workCard v6-card${index + 1}`} key={study.slug}>
      <figure className="v6-workImage" style={{ aspectRatio: study.cover.ratio }}>
        {study.cover.src ? <img src={study.cover.src} alt={study.cover.alt} /> : <>
          <span className="v6-workImageGrid" aria-hidden="true" />
          <figcaption><b>Case image</b><span>{study.cover.note}</span></figcaption>
        </>}
      </figure>
      <span>{study.category}</span><h3>{study.title.join(" ")}</h3><p>{study.deck}</p><footer><span>{study.role} · {study.platform}</span><b>Explore →</b></footer>
    </Link>)}</div>
  </section>;
}

export function EvidenceBoard() {
  return <section className="v6-evidence" id="evidence"><span className="v6-kicker">Evidence practice</span><h2>Keep the proof connected to its limits.</h2><div className="v6-metrics">
    <article><strong>01</strong><span>State the decision</span><small>Make the question and trade-off visible before discussing the interface.</small></article>
    <article><strong>02</strong><span>Name the boundary</span><small>Separate what a case can show publicly from what belongs in a private walkthrough.</small></article>
    <article><strong>03</strong><span>Qualify the claim</span><small>Use evidence to guide a conversation, not to overstate causality or certainty.</small></article>
  </div><aside className="v6-trace"><b>Private walkthroughs add context.</b><p>Case studies describe the decision work at a high level. The relevant constraints, source material, and open questions can be discussed directly.</p></aside></section>;
}

export function SpeakingProof() {
  const { techX } = speakingProof;
  return <section className="v6-speaking" id="speaking" aria-labelledby="speaking-title">
    <div className="v6-speakingIntro"><span className="v6-kicker">In the room</span><h2 id="speaking-title">A session record and selected facilitation practice.</h2><p>Speaking and workshop work that makes product decisions easier to discuss.</p></div>
    <div className="v6-speakingBoard">
      <Link className="v6-speakingCard" href="/v6/speaking/techx/" aria-labelledby="techx-title">
        <span className="v6-kicker">Research & influence · {techX.event}</span>
        <h3 id="techx-title">{techX.title}</h3>
        <p className="v6-speakingPremise">Dashboards do not help simply because they show more data. They help when the data has the right context for the decision a person is trying to make.</p>
        <strong className="v6-speakingCTA">Explore the session story →</strong>
        <small className="v6-speakingProvenance">A public summary of the session’s decision-support perspective.</small>
      </Link>
      <aside className="v6-workshopNote">
        <span className="v6-kicker">Facilitation practice</span>
        <p>I use workshops to make uncertain work discussable: align on the question, make trade-offs visible, and leave with a next step people can act on.</p>
      </aside>
    </div>
    <div className="v6-workshopList" aria-label="Workshop and facilitation practice">{workshopPractice.map((item) => {
      const ctaText = item.status === "approved-proposal" ? "Explore research planning →" : "Explore the practice →";
      return item.href ? <Link href={item.href} className="v6-workshopCard" key={item.title} data-status={item.status}><span>{item.context}</span><h3>{item.title}</h3><p>{item.body}</p><small className="v6-attribution">{item.attribution}</small><strong className="v6-exploreAffordance">{ctaText}</strong></Link> : <article key={item.title} data-status={item.status}><span>{item.context}</span><h3>{item.title}</h3><p>{item.body}</p><small className="v6-attribution">{item.attribution}</small></article>;
    })}</div>
  </section>;
}

export function Conditions() {
  const [weather, setWeather] = useState<SeattleWeather | null>(null);
  const [temperature, setTemperature] = useState<number | null>(null);
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    let active = true;
    const loadSeattleWeather = async () => {
      const controller = new AbortController();
      try {
        const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=47.6062&longitude=-122.3321&current=temperature_2m,weather_code,wind_speed_10m,is_day&temperature_unit=fahrenheit&wind_speed_unit=mph", { signal: controller.signal });
        if (!response.ok) throw new Error("Seattle forecast unavailable");
        const data = await response.json() as { current?: SeattleWeather };
        if (!data.current) throw new Error("Seattle forecast unavailable");
        if (!active) return;
        setWeather(data.current);
        if (Number.isFinite(data.current.temperature_2m)) setTemperature(data.current.temperature_2m!);
      } catch {
        // The portrait annotation falls back to a non-weather greeting below.
      }
    };
    void loadSeattleWeather();
    const weatherRefresh = window.setInterval(() => void loadSeattleWeather(), 15 * 60 * 1000);
    const clockRefresh = window.setInterval(() => setNow(Date.now()), 5 * 60 * 1000);
    return () => {
      active = false;
      window.clearInterval(weatherRefresh);
      window.clearInterval(clockRefresh);
    };
  }, []);
  const { weekday, hour, year, month, date } = seattleMoment(new Date(now));
  const label = weatherLabel(weather?.weather_code, weather?.wind_speed_10m);
  const note = weather
    ? fieldNote(label, weekday, hour, weather.is_day === 0 && nearFullMoon(year, month, date))
    : "A small hello from Seattle.";
  return <div className="v6-portraitWeather"><span>Seattle, WA{temperature !== null ? ` · ${Math.round(temperature)}°F` : ""}</span><p>{note}</p><small>Grateful to be here—close to nature, and able to do work I love.</small></div>;
}

export function DecisionApproach() {
  const caseForPractice = ["self-serve-billing", "agent-autonomy", "conversational-assistant"];
  return <section className="v6-approach" id="approach"><span className="v6-kicker">How decisions get made</span><h2>Useful work starts before the interface.</h2><div className="v6-principles">{profile.practice.map((principle, index) => {
    const study = studies.find((item) => item.slug === caseForPractice[index]);
    return <article key={principle.title}><h3>{principle.title}</h3><p>{principle.body}</p>{study && <Link href={`/v6/work/${study.slug}/`}>In practice: {study.brief.decision} →</Link>}</article>;
  })}</div></section>;
}

export function CollaboratorNotes() {
  if (!profile.testimonials.length) return null;
  return <section className="v6-collaborators" aria-labelledby="collaborator-title"><span className="v6-kicker">Collaborator notes</span><h2 id="collaborator-title">What teammates noticed in the work.</h2><div className="v6-drawer">{profile.testimonials.map((testimonial, index) => <figure className="v6-collaboratorNote" key={testimonial.name}><span className="v6-noteIndex" aria-hidden="true">Note {String(index + 1).padStart(2, "0")}</span><blockquote>{testimonial.quote.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</blockquote><figcaption>{testimonial.name} · {testimonial.role}</figcaption></figure>)}</div></section>;
}

export function ExperienceTimeline() {
  return <section className="v6-experience" aria-labelledby="experience-title"><span className="v6-kicker">Selected experience</span><h2 id="experience-title">The teams and systems that shaped the work.</h2><ol>{selectedExperience.map((experience) => <li key={`${experience.company}-${experience.dates}`}><span>{experience.dates}</span><div><h3>{experience.company}</h3><p>{experience.role}</p><small>{experience.focus}</small></div></li>)}</ol></section>;
}

export function ShortcutFooter() {
  return <footer className="v6-footer"><a href={`mailto:${profile.contact.email}`}>Email Drishti</a><a href={`${BASE_PATH}${profile.contact.resume}`} target="_blank" rel="noopener noreferrer">Résumé</a><a href={profile.contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a><span><kbd>⌘ / Ctrl K</kbd> explore the portfolio</span></footer>;
}
