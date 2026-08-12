import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Sans, Martian_Mono } from "next/font/google";
import { profile } from "@/content/v2";
import Nav from "@/components/v2/Nav";
import { Rails, Footer } from "@/components/v2/chrome";
import "./v2.css";

/* ----------------------------------------------------------------------------
   Three faces, three jobs.

   Bricolage Grotesque is the display face and the reason the type system
   works: its variable `opsz` axis means a 10rem masthead and a 1.4rem card
   title are drawn as genuinely different cuts — looser aperture and thinner
   joins at large sizes, sturdier at small — rather than one drawing scaled up
   and down. Every display rule in v2.css sets `font-variation-settings: opsz`
   to match its own size.

   Instrument Sans carries body copy and gets out of the way. Martian Mono is
   the annotation voice: it reads as an instrument readout, which is the whole
   conceit of the sheet.
   -------------------------------------------------------------------------- */

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--v2-display",
  display: "swap",
});

const body = Instrument_Sans({
  subsets: ["latin"],
  variable: "--v2-body",
  display: "swap",
});

const mono = Martian_Mono({
  subsets: ["latin"],
  variable: "--v2-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s — ${profile.name}`,
  },
  description:
    "Senior product designer working on ambiguous, high-consequence product problems — agent autonomy, enterprise billing, commercial banking.",
  /**
   * v2 is a draft full of placeholder copy and empty image slots, and it is
   * not in sitemap.xml. Keep it out of the index until it is promoted —
   * a half-written second copy of the site is the worst possible search
   * result for this domain. Delete this when v2 becomes the site.
   */
  robots: { index: false, follow: false },
};

/**
 * v2 lives inside the v1 root layout, so it cannot own <html> or <body>. It
 * instead scopes an entire design system to a single `.v2` wrapper: every rule
 * in v2.css is prefixed, and the token block redefines the aliases that v1's
 * globals.css reads (--accent, --paper, --ink) so inherited rules like focus
 * rings and ::selection resolve against this palette instead of that one.
 *
 * The id is `v2main`, not `main` — the root layout already renders a <main>,
 * and nesting landmarks would be invalid.
 */
export default function V2Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`v2 ${display.variable} ${body.variable} ${mono.variable}`}>
      <a href="#v2main" className="skipV2">
        Skip to content
      </a>
      <Rails />
      <Nav />
      <div id="v2main">{children}</div>
      <Footer />
    </div>
  );
}
