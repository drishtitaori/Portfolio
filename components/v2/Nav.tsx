"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { profile } from "@/content/v2";

const LINKS = [
  { href: "/v2/", label: "Work" },
  { href: "/v2/#practice", label: "Practice" },
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
          <span className="navDot" aria-hidden="true" />
          {profile.name}
        </Link>

        <ul className="navLinks">
          {LINKS.map((l) => {
            const current = l.href === "/v2/" && path === "/v2";
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
