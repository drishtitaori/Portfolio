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

# v2 — "Studio" (draft, at `/v2`)

A second, parallel design running inside the same app. Nothing above this line
changed except three small hooks; v1 is untouched and still the site.

```
http://localhost:3000/v2/                     home
http://localhost:3000/v2/about/               about me
http://localhost:3000/v2/work/agent-autonomy/ a case study
```

## What it is

Friendly, professional, cool-toned. White page, cool near-black ink (`#1F2628`),
a peacock palette, and a two-up grid of pastel tinted tiles that carry the work.

Direction taken from `pratibhajoshi.com` — the structural moves, not the
execution. Her site licenses **Calibre** from Klim, which we can't use, and it's
on the same "top 20 UX portfolios" lists your hiring managers read, so a literal
copy would be recognised. What's borrowed: pastel project tiles, a serif/sans
split, the offset-framed portrait, a single magenta accent. What isn't: her hex
values, her logo, her copy.

| Role   | Face                | Where                                          |
| ------ | ------------------- | ---------------------------------------------- |
| Sans   | Plus Jakarta Sans   | Everything you read. Closest free stand-in for Calibre |
| Serif  | Playfair Display 700 | Project titles, impact figures, the closing line — nowhere else |

Restricting the serif to where the work is makes it read as a byline rather than
decoration. That pairing is what keeps a white page from looking templated.

Display type is deliberately restrained — the hero caps at ~52px, matching the
reference. The warmth comes from colour and roundness (`--r-tile: 1.5rem`), not
scale.

### Colour

A peacock has three hues — teal-blue, emerald, indigo-violet. Teal is the one
that carries type: at 5.5:1 on white it clears AA, where the green is too light
to read and the indigo is too easily mistaken for plain navy.

| Token              | Value     | Use                                     |
| ------------------ | --------- | --------------------------------------- |
| `--ink`            | `#1F2628` | Cool near-black, never pure             |
| `--ink-soft`       | `#556063` | Body copy on white — 6.3:1              |
| `--ink-faint`      | `#6A7477` | Captions and labels — 4.8:1, the floor  |
| `--accent`         | `#0F7480` | Peacock teal. Passes AA as *type*       |
| `--accent-deep`    | `#0A5A63` | Hover, and small type needing weight    |
| `--peacock-green`  | `#12876A` | Gradient only — eye mark, hero frame    |
| `--peacock-indigo` | `#3B3A8C` | Gradient only — eye mark, hero frame    |

The green and indigo are **never flat fills**. They appear only in the two
gradients, which is what keeps a three-hue palette from turning into a rainbow.

The one warm colour on the site is the "what went wrong" block, in bronze
(`#7D5A11` on `#FBF5E9`) — bronze being the fourth colour in a peacock feather.
A caution that shares a hue with links stops reading as a caution.

Six `--tint-*` pastels are assigned per project via `tint` in `content/v2.ts`.
Tile interiors derive every colour from `--ink` with `color-mix`, so changing a
project's tint re-tunes the whole card with no second rule set.

All text on the home page and the case studies clears WCAG AA, verified
programmatically against composited backgrounds including the gradient logo.

### The eye mark

`components/v2/EyeMark.tsx`. *Drishti* is Sanskrit for sight, so the logo isn't
a glyph beside the name — it **is** the name, and it doubles as the claim the
portfolio makes: someone who watches closely.

It blinks. Everything inside the almond is clipped to it; a lid rectangle sits on
top scaled to zero height from its upper edge, and the animation drops it to full
height and lifts it again. That's a real eyelid rather than the whole mark
squashing vertically, which is what `scaleY` on the group gives you and it reads
as a wink. Two fast frames near the end of a 6s cycle — roughly human blink rate,
slow enough not to read as a tic. Hover or focus blinks it once and dilates the
pupil. `prefers-reduced-motion` stops it entirely.

Pure CSS on a `transform`, so it never touches layout. The `id` prop exists
because `clipPath` ids must be document-unique — render two with the same id and
the second clips against the first.

### The hero frame

The portrait sits between two offset planes: an indigo→teal→green gradient block
behind it and a pale indigo block in front of nothing. One of only two gradients
on the site.

It is **not** desaturated, unlike the reference. Theirs is a studio portrait
where colour adds nothing, so mono reads as a choice. This one is a river, a blue
sky and gold hills — the colour is most of the picture, and the water happens to
sit almost exactly on the peacock teal the palette is built from.

Project images are deliberately *not* contained: `.tileArt` uses negative inline
margins and the tile clips them, so each screenshot runs off the bottom-right
edge. That's what makes a tile read as a window onto the work rather than a card
with a picture in it.

## The content is a draft — with one exception

Everything in `content/v2.ts` is written to be replaced. It is plausible, not
true — the shape, length and rhythm are right, the facts are not verified.
**Do not send this to anyone before rewriting it.**

**`profile.testimonials` is real.** Three quotes from Hope Miller Goodell, Waves
Mowatt-Kane and Sachendra Yadav, supplied by Drishti. They are the only verified
words in the file, so don't let a rewrite pass sweep them away with the rest.

They run verbatim with two exceptions, both obvious typos in the source that
would read as carelessness on your own site: Waves wrote "Dhrishti" and "Ai",
corrected to "Drishti" and "AI". Revert if you'd rather run them exactly as
written.

## Filling the image placeholders

Every image is a declared slot rendering a labelled frame that names the file
it wants. To fill one:

1. Save the export to `public/v2/<slot>.jpg`
2. Set `src: "/v2/<slot>.jpg"` on that slot in `content/v2.ts`

The frame already reserves the right aspect ratio, so filling a slot causes no
reflow. **Filled:** `portrait` (home hero). Source was a 3024x4032 phone shot, cropped
to 2400x3200 to bring the figure up in frame — uncropped she was small enough in
a wide scenic shot to be unreadable at 336px — then resampled to 1100px wide,
497KB. No EXIF or GPS in the original; checked before committing.

**Still waiting:** `about-portrait`, `about-offduty`, four `*-cover`, and eight
in-body figures — 14 in total.

`about-portrait` is the informal one: working, sketching, at a whiteboard.

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

## The pull quote

`profile.pullQuote` in `content/v2.ts` is set as a full-width serif pull quote
between the work grid and the numbers, on the home page rather than on About.
That placement is deliberate: it is the sentence that separates you from other
designers applying to AI teams, so it shouldn't need a click to find. The long
form of the same argument is the "Point of view" section on `/about`.

To move it, delete the `<section className="pull">` block in `app/v2/page.tsx`
and render `profile.pullQuote` on the About page instead.

## Known gaps

- Light only, no theme toggle.
- The previous "Sheet" direction (dark, then light, CAD dimension lines, drag
  rail) is committed at `ae1f784` if you want it back:
  `git checkout ae1f784 -- app/v2 components/v2 content/v2.ts`
- Interactions built: scroll-choreographed reveals, kinetic word type, the
  drag rail, count-up metrics, marquee. Not built: custom cursor, hero widget.

## To promote v2 over v1

1. Move `app/v2/*` up to `app/`, `content/v2.ts` to `content/`
2. Delete `ChromeGate.tsx` and its wrappers in `app/layout.tsx`
3. Move the font loading and the `.v2` wrapper into the root layout
4. Drop `robots: noindex`, add the routes to `sitemap.ts`

To abandon it: delete `app/v2/`, `components/v2/`, `content/v2.ts`,
`components/ChromeGate.tsx`, and unwrap `app/layout.tsx`.
