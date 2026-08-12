"use client";

import { usePathname } from "next/navigation";

/**
 * Hides the v1 site chrome (nav, theme rail, footer) on /v2 routes.
 *
 * v2 is a parallel design running inside the same app, so it inherits the root
 * layout and cannot remove what that layout renders. A route group with its own
 * root layout would be the tidier fix, but that means moving app/layout.tsx and
 * re-rooting every existing page — too much churn for a draft that may not
 * survive. One client boundary that renders nothing is cheaper and reversible:
 * when v2 is promoted, delete this file and the wrappers in app/layout.tsx.
 */
export default function ChromeGate({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  if (path === "/v2" || path.startsWith("/v2/")) return null;
  return <>{children}</>;
}
