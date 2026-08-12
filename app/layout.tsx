import type { Metadata } from "next";
import { Roboto, IBM_Plex_Mono } from "next/font/google";
import { site } from "@/content/site";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ThemeRail from "@/components/ThemeRail";
import ChromeGate from "@/components/ChromeGate";
import { PersonSchema } from "@/components/StructuredData";
import "./globals.css";

/**
 * One sans family, not two.
 *
 * Roboto covers both display and body — contrast comes from weight and
 * size rather than a second typeface. Pairing two near-identical
 * grotesques reads as indecision. The CSS keeps separate --display and
 * --body tokens (see globals.css) so a distinct display face can be
 * swapped back in from one place.
 */
const sans = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  alternates: { canonical: "/" },
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.metaDescription,
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: site.metaDescription,
    type: "website",
  },
};

/**
 * Runs before first paint: adds `.js` so reveal animations never flash
 * content for JS users (and never hide it for non-JS users), and applies
 * a stored theme choice so there's no light-to-dark flicker.
 */
const BOOT = `
document.documentElement.classList.add('js');
try {
  var t = localStorage.getItem('theme');
  if (t === 'light' || t === 'dark') document.documentElement.setAttribute('data-theme', t);
} catch (e) {}
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable}`}
      // Tells Next the smooth scrolling in globals.css is intentional, so
      // it doesn't fight it during route transitions
      data-scroll-behavior="smooth"
      // The boot script below sets .js and data-theme before hydration
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
        <PersonSchema />
      </head>
      <body>
        {/* ChromeGate renders nothing on /v2, which runs its own parallel
            design system inside this same root layout. See ChromeGate.tsx. */}
        <ChromeGate>
          <a href="#main" className="skip">
            Skip to content
          </a>
          <Nav />
          <ThemeRail />
        </ChromeGate>
        <main id="main">{children}</main>
        <ChromeGate>
          <Footer />
        </ChromeGate>
      </body>
    </html>
  );
}
