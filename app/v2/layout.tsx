import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ThemeRail from "@/components/ThemeRail";
import { PersonSchema } from "@/components/StructuredData";

/* ----------------------------------------------------------------------------
   The previous editorial build, kept online at /v2.

   It reads the --font-sans / --font-mono variables that the root layout puts on
   <html>, and the design tokens in globals.css (also imported at the root). It
   owns its own chrome — nav, theme rail, footer — which used to live in the root
   layout back when this was the main site.
   -------------------------------------------------------------------------- */

export const metadata: Metadata = {
  // Archived version: keep it reachable but out of the search index so it
  // doesn't compete with the main site for the same queries.
  robots: { index: false, follow: false },
};

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PersonSchema />
      <a href="#main" className="skip">
        Skip to content
      </a>
      <Nav />
      <ThemeRail />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
