# Portfolio strategy — decisions and open questions

The reasoning behind the site, so you can argue with it rather than inherit it.
Build and editing instructions are in the [README](../README.md).

---

## The problem this site is solving

You are a strong candidate whose résumé currently under-sells one thing and over-claims
another.

**Under-sold:** you didn't just design an AI feature. You designed *agentic support that
decides when to escalate to a human, across three technical products*. That is a
trust-and-autonomy problem — the most in-demand judgment call in product design right now,
and something most portfolios can only gesture at. It should be the spine of the site, not
one entry among six.

**Over-claimed:** the metrics. 87% self-service resolution, 91% IDR, 71.8% retention. A
senior hiring manager reads those and immediately asks *baseline? attribution? was that you
or the model getting better?* Unqualified, they read as inflated and they hand the
interviewer an easy line of attack. Qualified — with a stated baseline, a named confounder,
and a clear "here's the number I actually trust" — they read as senior.

---

## Positioning: two layers, not one line

You picked **Senior/Staff IC product design**, not AI specialist. That makes a
single AI-forward headline a trap: it types you as *the agentic AI person*, and a manager
staffing a payments or platform team will mentally file you elsewhere. But burying the AI
work would waste your only genuine differentiator.

So the site separates them (`content/site.ts`):

| Layer | Content | Why |
| --- | --- | --- |
| `thesis` — durable | "I work in the part of a product where nobody has decided what's right yet." | What a generalist Staff loop screens for: transferable product judgment. Doesn't expire, doesn't narrow you. |
| `proof` — swappable | "Most recently: deciding how much an AI agent should do on someone's behalf — across AutoCAD, Revit, and Fusion." | What makes you rare in 2026. One line, edited per application. |

**Use this.** For an AI-native role, the proof line does the selling. For a fintech role,
swap in the Amex/billing line and the site re-aims without a rebuild.

---

## The four pillars

Declared in `content/caseStudies.ts` and shown on each study under "Meant to show". Each
deep study must visibly hit at least three; if one hits only two, it's written wrong or
shouldn't be a deep study.

| Pillar | What's being tested | Strongest evidence |
| --- | --- | --- |
| Framing | Can she define the problem, not just solve a given one? | Customer Success Planning — the reframe |
| Depth | Would I trust her with our hardest surface? | The autonomy ladder and the escalation seam |
| Influence | Does she move product direction, or take tickets? | 6-week vision → roadmap; TechX to VPs |
| Honesty | Does she know what her design actually caused? | The confounder timeline |

---

## The deliberate failure content

Every case study names something that went wrong. This is a strategic choice, not modesty:

- A portfolio with zero visible friction reads as either junior work or a sanitised
  retelling. Interviewers probe for it regardless.
- Volunteering it converts your biggest liability (unattributed metrics) into your
  strongest credibility signal.
- It gives you rehearsed, specific answers to the questions you'll actually be asked.

The specific admissions: centralising rung assignment and becoming a bottleneck; cutting
customer-side notifications and removing the mechanism the loop depended on; treating the
vision as a deliverable rather than maintained infrastructure; getting attached to a
prototype because you wrote it; raising instrumentation too late to isolate your own impact.

**Don't soften these.** They are load-bearing.

---

## What I cut, and why

| Cut | Reasoning |
| --- | --- |
| "Finance, healthcare, technology, e-commerce" | Five industries reads generalist. Your résumé supports depth in enterprise/SMB SaaS + AI and thin exposure elsewhere (a 4-month co-op, one food-service project). The site claims two areas and lists the rest as a footnote on `/work/commercial-banking-portal`. |
| Autodesk Assistant as its own case study | Splitting it from the agentic work would have read as "she designed two chatbots at one company". It's now chapter one of the hero study's arc, which makes the arc stronger. |
| Screens galleries | At Staff level these cost you. Nobody is hiring you to produce comps. |
| Discover → Define → Deliver process diagrams | Signals process compliance rather than judgment. Replaced with the four moves on `/approach`, which are specific enough to be argued with. |
| Manager/lead framing | You chose IC. Mentoring and practice work is present on `/approach` as supporting evidence, not as a primary claim. |

---

## Open questions you still need to answer

1. **Confidentiality.** You said "not sure yet". Every case study is written to work with
   real screens *and* with none, so nothing breaks either way — but find out before you
   publish images. The Amex screen is client data; its caption says so.
2. **The mentoring and prototyping-practice rows on `/approach`.** These are the weakest
   evidence on the site and the most likely thing a Staff interviewer probes. They are
   currently prompts, not blanks. Write real specifics — how many designers, over what
   period, what concretely changed — or delete the rows. Thin evidence is worse than none.
3. **Five years or six.** Your résumé says "5+"; the site says six, per what you told me.
   Make them match.
4. **The TechX recording.** If it can be shared publicly, link it. A recording of you
   presenting to VPs and SVPs outweighs any paragraph describing it, and it's the single
   highest-leverage asset you're not using.
5. **The 18 placeholders.** `npm run fills`. If you can't source a number, cut the
   sentence rather than vague it up.

---

## Market check (last-30-days research, run 2026-08-06)

I researched what design hiring managers say they screen for right now, then changed the
site against it. The portfolio was already aligned on four of five findings.

| Finding | Status |
| --- | --- |
| Double Diamond / process diagrams are now an explicit red flag | Already avoided. Replaced by the four moves on `/approach` and per-decision callouts. |
| Missing impact delta collapses a portfolio to surface review | Already covered. Every metric carries a value, a label, and a caveat. |
| Not showing AI in your process is itself a red flag | Already covered by `/work/working-with-ai`. |
| AI-assisted portfolios read as same-y, which is its own red flag | Hand-built, no template. Stated in the footer. |
| Title inflation that the portfolio disproves is hunted | Handled via the pillar rubric - every deep study must show Staff-level framing and influence, not feature execution. |
| ~78% of recruiters run AI screening before a human opens the page | **Was failing.** Added JSON-LD (Person + per-study CreativeWork with metrics as `measurementTechnique`), `sitemap.xml`, `robots.txt` that allows AI crawlers. |
| "Is it live and traceable, and if live, is it scaling?" is the first screen | **Was failing.** Added a `live` field per case study, surfaced in the decision brief. |
| The portfolio is the trailer, not the test; short decision narratives are the favoured format | **Was failing.** ~2,500-word essays with no scannable entry point. Added the "In 60 seconds" `DecisionBrief` to all five studies. |

The one finding I deliberately did **not** act on: shortening the case studies to 500-800
words. The short decision brief now serves the skim, and the essay underneath serves the
person who wants depth. Cutting the essays would trade away the framing evidence that is
your actual differentiator.

## Things I'd push back on if you asked me to change them

- **Removing the metric caveats to make the numbers look stronger.** The caveats are why
  the numbers are believable. Without them you have a résumé, not evidence.
- **Adding a sixth or seventh project.** Five is already at the limit of what a hiring team
  reads. Depth is the differentiator; breadth is available on your résumé.
- **Leading with the AI line for a generalist role.** It's a great line and it narrows you.
  That's what the two-layer positioning is for.
- **Polishing the diagrams into exported images.** They're built in CSS and SVG on purpose:
  they respond to dark mode and container width, they stay editable, and a coded portfolio
  is itself the proof of the prototyping claim on your résumé.
