"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { profile } from "@/content/v2";
import EyeMark from "./EyeMark";

const LINKS = [
  { href: "/v2/#work", label: "Work" },
  { href: "/v2/about/", label: "About" },
  { href: "/v2/#contact", label: "Contact" },
];

/**
 * Sticky, transparent over the masthead, picking up a hairline rule only once
 * you have scrolled past it — so the top of the page reads as one uninterrupted
 * sheet rather than a header sitting on a page.
 */
export default function Nav() {
  const path = usePathname();
  const [lifted, setLifted] = useState(false);

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="sheetInner">
      <nav className="nav" data-lifted={lifted} aria-label="Primary">
        <Link href="/v2/" className="navMark">
          <EyeMark id="nav-eye" />
          {profile.name}
        </Link>

        <ul className="navLinks">
          {LINKS.map((l) => {
            // Only the real routes can be "current"; the two in-page anchors
            // are not pages, so marking them would be a lie to a screen reader.
            const current =
              (l.href === "/v2/about/" && path.startsWith("/v2/about")) ||
              (l.href === "/v2/#work" && path === "/v2");
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="navLink"
                  aria-current={current ? "page" : undefined}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
          <li>
            <a className="navCta" href={profile.contact.resume}>
              Résumé
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
