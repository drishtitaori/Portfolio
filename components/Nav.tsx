"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import styles from "./Nav.module.css";

export default function Nav() {
  const path = usePathname();
  const isHome = path === "/";
  const [lifted, setLifted] = useState(false);

  /**
   * On the homepage the nav sits transparently over the hero sky and
   * only picks up a background once you've scrolled past it.
   */
  useEffect(() => {
    if (!isHome) {
      setLifted(true);
      return;
    }
    const onScroll = () => setLifted(window.scrollY > window.innerHeight * 0.72);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  return (
    <header className={styles.header} data-lifted={lifted ? "true" : "false"}>
      <div className={`frame ${styles.inner}`}>
        <Link href="/" className={styles.wordmark}>
          <span className={styles.mark} aria-hidden="true" />
          {site.name}
        </Link>
        <nav aria-label="Primary" className={styles.nav}>
          {site.nav.map((item) => {
            const active =
              item.href === "/" ? path === "/" : path.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={styles.link}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
          <a
            href={site.contact.resume}
            className={styles.link}
            target="_blank"
            rel="noopener"
          >
            Résumé
          </a>
        </nav>
      </div>
    </header>
  );
}
