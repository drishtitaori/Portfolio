"use client";

import { useEffect, useState } from "react";
import s from "./ThemeRail.module.css";

type Mode = "light" | "auto" | "dark";

const MODES: { id: Mode; label: string; icon: React.ReactNode }[] = [
  {
    id: "light",
    label: "Light",
    icon: (
      <svg viewBox="0 0 20 20" aria-hidden="true">
        <circle cx="10" cy="10" r="3.6" />
        <g strokeLinecap="round">
          <path d="M10 2.4v2M10 15.6v2M2.4 10h2M15.6 10h2M4.6 4.6l1.4 1.4M14 14l1.4 1.4M15.4 4.6L14 6M6 14l-1.4 1.4" />
        </g>
      </svg>
    ),
  },
  {
    id: "auto",
    label: "System",
    icon: (
      <svg viewBox="0 0 20 20" aria-hidden="true">
        <circle cx="10" cy="10" r="6.4" />
        <path d="M10 3.6a6.4 6.4 0 000 12.8z" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    id: "dark",
    label: "Dark",
    icon: (
      <svg viewBox="0 0 20 20" aria-hidden="true">
        <path d="M15.4 12.6A6 6 0 017.4 4.6a6.2 6.2 0 108 8z" />
      </svg>
    ),
  },
];

/**
 * Light / system / dark. Writes `data-theme` on <html> and persists the
 * choice; `auto` removes the attribute so the OS preference applies via
 * the media query. The no-flash initialiser lives in layout.tsx so the
 * correct theme is set before first paint.
 */
export default function ThemeRail() {
  const [mode, setMode] = useState<Mode>("auto");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    setMode(stored === "light" || stored === "dark" ? stored : "auto");
    setMounted(true);
  }, []);

  function choose(next: Mode) {
    setMode(next);
    const root = document.documentElement;
    if (next === "auto") {
      root.removeAttribute("data-theme");
      localStorage.removeItem("theme");
    } else {
      root.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
    }
  }

  return (
    <div
      className={s.rail}
      role="radiogroup"
      aria-label="Colour theme"
      // Avoid showing a wrong selection for one frame before hydration
      data-ready={mounted ? "true" : "false"}
    >
      {MODES.map((m) => (
        <button
          key={m.id}
          type="button"
          role="radio"
          aria-checked={mode === m.id}
          aria-label={m.label}
          title={m.label}
          className={s.button}
          onClick={() => choose(m.id)}
        >
          {m.icon}
        </button>
      ))}
    </div>
  );
}
