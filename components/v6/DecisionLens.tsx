"use client";

import Link from "next/link";
import { useState } from "react";
import { lensRecommendations } from "@/content/v6";

const actionPresets = [
  { label: "Send a draft", reversible: true, wide: true },
  { label: "Change account access", reversible: false, wide: false },
  { label: "Publish to a shared team", reversible: false, wide: true },
] as const;

const cells = [
  { key: "irreversible-wide", label: "Suggest the next step", helper: "Hard to undo · shared impact" },
  { key: "irreversible-small", label: "Ask before changing it", helper: "Hard to undo · limited impact" },
  { key: "reversible-wide", label: "Prepare a draft for review", helper: "Easy to undo · shared impact" },
  { key: "reversible-small", label: "Act with an obvious undo", helper: "Easy to undo · limited impact" },
] as const;

export default function DecisionLens() {
  const [reversible, setReversible] = useState(true);
  const [wide, setWide] = useState(false);
  const key = `${reversible ? "reversible" : "irreversible"}-${wide ? "wide" : "small"}` as keyof typeof lensRecommendations;
  const recommendation = lensRecommendations[key];

  return <section className="v6-lens" id="lens" aria-labelledby="lens-title">
    <div className="v6-lensCopy">
      <span className="v6-kicker">A small product decision exercise</span><h2 id="lens-title">Try the decision policy.</h2>
      <p>Choose a product action. The policy shows when it deserves human review—and what the product should do before and after that checkpoint.</p>
      <fieldset className="v6-presets">
        <legend>Choose an example action</legend>
        {actionPresets.map((preset) => <button type="button" key={preset.label} onClick={() => { setReversible(preset.reversible); setWide(preset.wide); }}>{preset.label}</button>)}
      </fieldset>
      <div className="v6-choiceGroup">
        <fieldset><legend>Can someone undo this?</legend><label><input type="radio" checked={reversible} onChange={() => setReversible(true)} name="reversibility" /> Yes, without much cost</label><label><input type="radio" checked={!reversible} onChange={() => setReversible(false)} name="reversibility" /> No, or not cleanly</label></fieldset>
        <fieldset><legend>Who will it affect?</legend><label><input type="radio" checked={!wide} onChange={() => setWide(false)} name="radius" /> One person or a small group</label><label><input type="radio" checked={wide} onChange={() => setWide(true)} name="radius" /> A shared team or many people</label></fieldset>
      </div>
      <aside className="v6-policyResult" aria-live="polite"><span className="v6-kicker">Recommendation</span><h3>{recommendation.title}</h3><dl><div><dt>System behavior</dt><dd>{recommendation.behavior}</dd></div><div><dt>Human checkpoint</dt><dd>{recommendation.checkpoint}</dd></div><div><dt>Recovery</dt><dd>{recommendation.recovery}</dd></div></dl><Link href="/v6/work/agent-autonomy/">See the matched autonomy policy case →</Link></aside>
      <p className="v6-policyDisclosure">This small rules-based example uses the same inputs to give the same result. It does not learn from you or send your choices anywhere.</p>
    </div>
    <section className="v6-policyMap" aria-labelledby="v6-policy-map-title">
      <h3 id="v6-policy-map-title" className="v6-srOnly">Policy map: undoability by who is affected</h3>
      <div className="v6-mapAxes"><span>Harder to undo ↑</span><span>More people affected →</span></div>
      <div className="v6-mapGrid">{cells.map((cell) => <button type="button" key={cell.key} className={cell.key === key ? "is-selected" : ""} onClick={() => { const [undo, scope] = cell.key.split("-"); setReversible(undo === "reversible"); setWide(scope === "wide"); }}><strong>{cell.label}</strong><span>{cell.helper}</span></button>)}</div>
      <p>The highlighted cell is the policy for the choices above.</p>
    </section>
  </section>;
}
