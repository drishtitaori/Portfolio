import { profile } from "@/content/v2";

/**
 * Static furniture. A server component — nothing here needs state, and keeping
 * it out of the client bundle keeps the page cheap.
 *
 * The "Sheet" direction's margin rails and client marquee were removed with
 * that design; the clients now appear in the hero subline instead, which is
 * where a reader actually looks for them.
 */
export function Footer() {
  return (
    <footer className="footer">
      <div className="sheetInner footerInner">
        <span className="mono">
          © {new Date().getFullYear()} {profile.name} · Designed and built from scratch
        </span>
        <ul className="footerLinks">
          <li>
            <a className="mono" href={`mailto:${profile.contact.email}`}>
              Email
            </a>
          </li>
          <li>
            <a className="mono" href={profile.contact.linkedin}>
              LinkedIn
            </a>
          </li>
          <li>
            <a className="mono" href={profile.contact.resume}>
              Résumé
            </a>
          </li>
          <li>
            <a className="mono" href="/v2/">
              v1 of this site
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
