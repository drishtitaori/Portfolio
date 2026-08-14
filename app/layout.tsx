import type { Metadata } from "next";
import {
  Roboto,
  IBM_Plex_Mono,
  Plus_Jakarta_Sans,
  Playfair_Display,
} from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

/**
 * Minimal root shell.
 *
 * Two distinct sites live in this one app: the current site (the "Sheet"
 * design) at `/`, wired up in app/(main)/layout.tsx, and the previous editorial
 * build at `/v2`, wired up in app/v2/layout.tsx. Each of those owns its own
 * chrome; this root only provides <html>/<body>, the boot script, and the font
 * CSS variables both designs read.
 *
 * All four font families are declared here and their CSS variables placed on
 * <html> so every variable resolves regardless of which site is rendering.
 * The current site reads --v2-sans / --v2-serif; the /v2 build reads
 * --font-sans / --font-mono.
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

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--v2-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--v2-serif",
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
      className={`${sans.variable} ${mono.variable} ${jakarta.variable} ${playfair.variable}`}
      // Tells Next the smooth scrolling in globals.css is intentional, so
      // it doesn't fight it during route transitions
      data-scroll-behavior="smooth"
      // The boot script below sets .js and data-theme before hydration
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
