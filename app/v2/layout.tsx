import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import { profile } from "@/content/v2";
import Nav from "@/components/v2/Nav";
import { Footer } from "@/components/v2/chrome";
import "./v2.css";

/* ----------------------------------------------------------------------------
   Two voices, strictly divided.

   Plus Jakarta Sans does all the reading: hero, body, nav, labels, buttons.
   It's a geometric grotesque with a tall x-height and slightly narrow
   proportions — the closest freely-licensed stand-in for Calibre, which is
   what the reference site licenses from Klim and which we can't use here.

   Playfair Display appears only on project titles, the impact figures and the
   closing line. Restricting the serif to where the work is means it reads as a
   byline rather than as decoration, and it's the pairing that keeps a white
   page from looking like a template.
   -------------------------------------------------------------------------- */

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--v2-sans",
  display: "swap",
});

const serif = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--v2-serif",
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
    <div className={`v2 ${sans.variable} ${serif.variable}`}>
      <a href="#v2main" className="skipV2">
        Skip to content
      </a>
      <Nav />
      <div id="v2main">{children}</div>
      <Footer />
    </div>
  );
}
