import type { Metadata } from "next";
import { profile } from "@/content/v2";
import Nav from "@/components/v2/Nav";
import { Footer } from "@/components/v2/chrome";
import "./v2.css";

/* ----------------------------------------------------------------------------
   The current site — the "Sheet" design — served at the root.

   Two voices, strictly divided. Plus Jakarta Sans does all the reading; Playfair
   Display appears only on project titles, impact figures and the closing line.
   Both font families are loaded once in the root layout (app/layout.tsx) and
   exposed as CSS variables on <html>; this layout only scopes the design system
   to the `.v2` wrapper, where v2.css redefines the shared token aliases.
   -------------------------------------------------------------------------- */

export const metadata: Metadata = {
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s — ${profile.name}`,
  },
  description:
    "Senior product designer working on ambiguous, high-consequence product problems — agent autonomy, enterprise billing, commercial banking.",
};

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="v2">
      <a href="#v2main" className="skipV2">
        Skip to content
      </a>
      <Nav />
      <main id="v2main">{children}</main>
      <Footer />
    </div>
  );
}
