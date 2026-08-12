# Drishti Taori — portfolio

A coded, statically-exported portfolio site. No CMS, no template, no page builder.
Content lives in plain TypeScript files so it can be edited without touching layout.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to ./out
npm run fills    # list every remaining placeholder (see below)
```

---

## The strategy this is built on

The positioning is deliberately **two layers**, both in `content/site.ts`:

- `thesis` — durable and role-agnostic: _"I work in the part of a product where nobody
  has decided what's right yet."_ This is what a generalist Senior/Staff hiring manager
  needs to read. It does not type you as "the agentic AI person".
- `proof` — swappable per application: the AI autonomy line. This is what makes you
  rare right now. **Change this one line** when you apply to a fintech or platform role
  and the whole site re-aims without touching anything else.

Every deep case study is written against four pillars, declared in
`content/caseStudies.ts` and surfaced on each study page under "Meant to show":

| Pillar      | What a Staff loop is checking          |
| ----------- | -------------------------------------- |
| `framing`   | Can she define the problem, not just solve a given one? |
| `depth`     | Would I trust her with our hardest surface? |
| `influence` | Does she move product direction, or take tickets? |
| `honesty`   | Does she know what her design actually caused? |

**Every case study names something that went wrong.** This is intentional, not modesty.
Your unqualified metrics (91%, 71.8%) are the most attackable thing about your résumé —
a senior interviewer will immediately ask about baselines and attribution. Volunteering
the limits converts that liability into your strongest credibility signal. Do not remove
the `Callout kind="honest"` blocks or the `caveat` fields on metrics.

---

## Placeholders: the one thing you must do before publishing

Nothing on this site invents a fact you would have to defend in an interview. Where a
real number was needed and only you have it, there is a visible amber blank instead:

```bash
npm run fills
```

That prints every remaining `<Fill>` with its file and line. Replace the text and delete
the `<Fill>` wrapper:

```tsx
{/* before */}
<Fill>[n]</Fill> interviews across customer success managers
{/* after */}
14 interviews across customer success managers
```

If you genuinely don't have a number, **cut the sentence** rather than softening it into
something vague. A missing detail costs you far less than a number you can't source.

Two placeholders are different in kind — they're prompts, not blanks. Both are on
`/approach` under "The practice, beyond my own projects": mentoring and prototyping
practice. Those rows are currently the weakest evidence on the site and a Staff
interviewer will probe them. Write real specifics or delete the rows.

---

## Adding images

You have no screenshots in yet, and the site is designed to look finished without them —
typography and hand-built diagrams carry it. Every image slot shows a dashed placeholder
that states exactly what to capture, so the slots double as your shot list.

To fill one, drop the file in `public/` and add `src`:

```tsx
<Figure src="/staged-action-revit.png" alt="…" caption="…" />
```

Priority order, highest value first:

1. **The staged-action review UI in Revit** (`/work/agentic-support`) — makes Rung 03
   concrete. Single most valuable image on the site.
2. **The vision narrative frames** (`/work/account-experience`) — the "what do I own" frame.
3. **The workshop wall** (`/work/customer-success-planning`) — a photo of sticky notes is
   fine; it's evidence of facilitation, not craft.
4. **A working portrait (`/about`)** — the lake photo is on the homepage beside the
   positioning statement, but `/about` is currently text-only by choice. Add one there if
   you want it.

**Clearance:** you told me you weren't sure yet what you can publish. Every case study is
written to work with real screens _and_ to still work with none, so nothing breaks if the
answer is no. Check before publishing anything from Autodesk internal tooling, unreleased
vision work, or Amex — the Amex figure is client data and the caption says so.

---

## Structure

```
app/
  page.tsx                    home — hero, work index, currently
  approach/page.tsx           how I work, collaboration, practice
  about/page.tsx              bio, roles, education, what I'm looking for
  work/<slug>/page.tsx        one file per case study, prose + diagrams inline
  globals.css                 design tokens — change the accent in one place
components/
  ui.tsx                      Section, Wide, Figure, Metrics, Callout, Ledger, Fill
  diagrams/                   hand-built SVG/CSS diagrams, token-driven
content/
  site.ts                     positioning, intro, contact
  caseStudies.ts              registry — drives index, metadata, prev/next
public/
  Drishti-Taori-Resume.pdf    replace when you update the résumé
```

Case studies are explicit routes rather than a dynamic `[slug]`, so each one is a single
self-contained file you can edit without understanding the rest.

### Photographs

Real photos live in `public/img` as pre-generated responsive sets, because static export
means there's no build-time image optimisation. The `Photo` component picks the right one
with a `<picture>` element — WebP first, JPEG fallback.

The lake portrait appears once: beside the positioning statement on the homepage, at 22rem.
**Keep `sizes` consistent with `maxWidth`** on that component —
if they disagree the browser picks a file for the wrong slot and the photo either upscales
and goes soft or downloads far more than it needs.

To add another photo, generate the set the same way (from the repo root):

```bash
SRC="/path/to/photo.jpg"
sips --resampleWidth 1000 -s format jpeg -s formatOptions 72 "$SRC" --out public/img/name-1000.jpg
sips --resampleWidth 700  -s format jpeg -s formatOptions 72 "$SRC" --out public/img/name-700.jpg
for f in public/img/name-700 public/img/name-1000; do cwebp -q 76 -m 6 "$f.jpg" -o "$f.webp"; done
```

Then `<Photo base="/img/name" widths={[700, 1000]} alt="…" maxWidth="26rem" sizes="…" />`.

A note on the hero: I deliberately did **not** make the photo the full-bleed hero. A
screener decides role fit, seniority, and relevance in seconds, and a landscape photo
delays all three; the generated SVG landscape also doubles as proof of the
prototyping-in-code claim. If you want the photo as the hero anyway, say so — it's a
contained change to `components/Hero.tsx`, and it needs a legibility scrim because the
headline would sit over bright water.

### Built for how portfolios actually get screened

Three things here exist because of specific hiring-market behaviour, not taste. Don't
strip them without knowing what you're giving up:

- **`DecisionBrief` at the top of every case study** (the "In 60 seconds" block). A growing
  share of first-round interviews skip the portfolio walkthrough and open Figma instead —
  the written study is the trailer, not the test. The format hiring managers now favour is a
  short narrative tracing one decision from ambiguous start to outcome, so each study leads
  with situation / decision / what I'd defend / what I got wrong, and keeps the essay below.
- **JSON-LD structured data** (`components/StructuredData.tsx`), plus `sitemap.xml` and
  `robots.txt`. Roughly three quarters of recruiters run AI-assisted screening before a
  human opens your portfolio. Every claim in the JSON-LD mirrors something already visible
  on the page — including each case study's metrics as `measurementTechnique`, so a parser
  reads the impact delta without having to parse prose. `robots.txt` deliberately allows AI
  crawlers; blocking them would work against the point.
- **The `live` field on each case study.** "Is it live and traceable, and if it's live, is it
  scaling?" is the literal first screen applied to portfolios. Each study states what
  shipped; add the public URL where one exists.

**When you deploy, change `site.url` in `content/site.ts`.** It currently points at
`https://drishtitaori.com`. The sitemap, robots.txt, canonical URLs, and every JSON-LD
`url` field read from that one value.

Also deliberate, and matching what hiring managers say they screen against: no Double
Diamond or process diagram anywhere (framework-as-case-study-structure is now an explicit
red flag), every metric carries its caveat, and the site is hand-built with no template —
AI-assisted portfolios increasingly read as same-y, which is its own red flag.

### Design system notes

- All colour, type, and spacing are CSS custom properties in `app/globals.css`. Changing
  `--accent` re-themes the entire site.
- Type is a single family — Roboto — for both display and body, with IBM Plex Mono for
  labels. Hierarchy comes from weight and size, not a second typeface. `--display` and
  `--body` are still separate tokens, so a distinct display face can be dropped in from
  one place if you want more contrast later.
- Dark mode is handled via `prefers-color-scheme` using the same tokens. If you change a
  colour, change its dark counterpart in the same file.
- Diagrams are CSS/SVG driven by those tokens, not exported images — so they respond to
  dark mode and container width, and stay editable.
- Reveal-on-scroll is progressive enhancement: content is fully visible with JS disabled,
  and the transform is removed under `prefers-reduced-motion`.

---

## Deploying

`npm run build` emits a fully static `./out`. That deploys anywhere:

- **Vercel** — zero config, connect the repo.
- **Spark** (`spark.autodesk.com`) — build folder is `out`.
- **Netlify / Cloudflare Pages / GitHub Pages** — publish directory `out`.

Before you publish:

- [ ] `npm run fills` returns nothing
- [ ] Résumé PDF in `public/` is current
- [ ] Confidentiality cleared on every image you added
- [ ] Update the `resume` filename in `content/site.ts` if you rename the PDF
- [ ] Decide your `proof` line for the roles you're actually applying to

---

## One open inconsistency

Your résumé says "5+ years"; this site says six, per what you told me. Pick one and make
them match — `site.years` in `content/site.ts`. Interviewers do notice.

---

# v2 — "Sheet" (draft, at `/v2`)

A second, parallel design running inside the same app. Nothing above this line
changed except three small hooks; v1 is untouched and still the site.

```
http://localhost:3000/v2/                     home
http://localhost:3000/v2/work/agent-autonomy/ a case study
```

## What it is

Editorial on paper: a cool off-white ground (`#F1F1EC`, paper stock rather than
cream), near-black line work, and oversized display type that animates on load
and on scroll.

The structural device is a **CAD dimension line** — extension ticks, outward
arrowheads, a notched label. You design for AutoCAD, Revit and Fusion, so the
annotation layer from those tools is the site's furniture rather than a generic
rule. It has two jobs: it measures the masthead, and above the work rail *the
same component is the scrollbar*, inking in as you drag.

| Role     | Face                 | Why                                                        |
| -------- | -------------------- | ---------------------------------------------------------- |
| Display  | Bricolage Grotesque  | Variable `opsz`, so the masthead and a card title are different cuts, not one cut scaled |
| Body     | Instrument Sans      | Quiet, slightly narrow, gets out of the way                  |
| Utility  | Martian Mono         | The annotation voice — reads as an instrument readout        |

### The accent has three roles — do not mix them

Volt (`#E4FF4F`) is unreadable as type on paper, about 1.3:1. So it became the
**highlighter**, which is honest to a page built out of annotation marks: it
strikes the masthead's third line, the accent word in the thesis, the email
address on hover, and the card index chip on hover. Nowhere else.

| Token            | Value     | Use                                          |
| ---------------- | --------- | -------------------------------------------- |
| `--accent-fill`  | `#E4FF4F` | Backgrounds and highlights **only**           |
| `--accent-text`  | `#4A5600` | Accent as type — 6.9:1 on paper               |
| `--accent-line`  | `#16161A` | Accent as a rule, border or focus ring        |
| `--on-accent`    | `#14180A` | Type sitting on the fill                      |

Never set `--accent-fill` as a `color`. On paper, emphasis comes from weight and
darkness; the lime is there to mark, not to speak.

Rust (`#A8360F`) appears in exactly one place: the "what went wrong" block on
each case study.

All text on the home page and the case studies clears WCAG AA. `--ink-faint`
(`#67675F`, 4.8:1) is the floor for caveats and captions; `--hairline`
(`#A3A39A`) is a *drawing* colour for the dimension geometry and is never used
for type.

## The content is a draft

Everything in `content/v2.ts` is written to be replaced. It is plausible, not
true — the shape, length and rhythm are right, the facts are not verified.
**Do not send this to anyone before rewriting it.**

## Filling the image placeholders

Every image is a declared slot rendering a labelled frame that names the file
it wants. To fill one:

1. Save the export to `public/v2/<slot>.jpg`
2. Set `src: "/v2/<slot>.jpg"` on that slot in `content/v2.ts`

The frame already reserves the right aspect ratio, so filling a slot causes no
reflow. Slots waiting: `portrait`, four `*-cover`, and eight in-body figures.

## How it coexists with v1

Three hooks, all reversible:

- `components/ChromeGate.tsx` — returns null on `/v2`, so v1's nav, theme rail
  and footer don't render there. Wrapped around them in `app/layout.tsx`.
- `app/v2/v2.css` — every rule prefixed `.v2`. The token block redefines the
  aliases v1's `globals.css` reads (`--accent`, `--paper`, `--ink`) so inherited
  rules resolve against this palette. One global rule (`html:has(.v2) body`)
  stops v1's paper colour showing on overscroll.
- `app/v2/layout.tsx` — loads its own three fonts and sets `robots: noindex`.
  v2 is also absent from `sitemap.ts`.

## Known gaps

- The hero portrait is hidden below 56rem. Mobile hero is type-only by choice.
- Light only. The tokens are role-named, so a dark counterpart is a second
  token block plus a toggle — but there is no theme switch today.
- Card scale-on-scroll uses CSS scroll-driven animation. Chrome, Edge and
  Safari 26 have it; Firefox doesn't, and there the cards are all one size.
- Interactions built: scroll-choreographed reveals, kinetic word type, the
  drag rail, count-up metrics, marquee. Not built: custom cursor, hero widget.

## To promote v2 over v1

1. Move `app/v2/*` up to `app/`, `content/v2.ts` to `content/`
2. Delete `ChromeGate.tsx` and its wrappers in `app/layout.tsx`
3. Move the font loading and the `.v2` wrapper into the root layout
4. Drop `robots: noindex`, add the routes to `sitemap.ts`

To abandon it: delete `app/v2/`, `components/v2/`, `content/v2.ts`,
`components/ChromeGate.tsx`, and unwrap `app/layout.tsx`.
