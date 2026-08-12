import { profile } from "@/content/v2";

/**
 * Static furniture for the sheet. All server components — nothing here needs
 * state, and keeping them out of the client bundle keeps the page cheap.
 */

/* -------------------------------------------------------------------------- */

/**
 * The margin rails.
 *
 * A drawing sheet carries its metadata outside the drawing, in the margins.
 * These are fixed hairlines down each side with rotated annotation text and
 * registration ticks at the corners. They collapse below 60rem, where they
 * would cost more reading width than they earn.
 */
export function Rails() {
  return (
    <div className="rails" aria-hidden="true">
      <div className="rail rail--l">
        <span className="railText">
          {profile.name} — Portfolio — Rev. 2
        </span>
        <span className="tick tick--tl" />
        <span className="tick tick--bl" />
      </div>
      <div className="rail rail--r">
        <span className="railText">{profile.location} · Open to work</span>
        <span className="tick tick--tr" />
        <span className="tick tick--br" />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

/**
 * The client band, as a continuous marquee.
 *
 * The track holds two identical groups and translates by exactly -50%, which
 * is what makes the loop seamless. Pausing on hover is not decoration — it is
 * the only way to read a name you recognised as it went past. The duplicate is
 * hidden from screen readers so the list is announced once.
 */
export function Marquee() {
  const group = (
    <div className="marqueeGroup">
      {profile.clients.map((c) => (
        <span className="marqueeItem" key={c}>
          {c}
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee">
      <div className="marqueeTrack">
        {group}
        <div aria-hidden="true" style={{ display: "contents" }}>
          {group}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

export function Footer() {
  return (
    <footer className="footer">
      <div className="sheetInner footerInner">
        <span className="mono">
          © {new Date().getFullYear()} {profile.name} · Built from scratch, no template
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
            <a className="mono" href="/">
              v1 of this site
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
