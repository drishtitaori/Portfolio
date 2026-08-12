import { site } from "@/content/site";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`frame ${styles.inner}`}>
        <div className={styles.pitch}>
          <p className={styles.thesis}>{site.thesis}</p>
          <p className="quiet" style={{ fontSize: "var(--t-small)" }}>
            Open to Senior and Staff product design roles. The fastest way to
            reach me is email.
          </p>
        </div>

        <ul className={styles.links}>
          <li>
            <span className="label">Email</span>
            <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
          </li>
          <li>
            <span className="label">LinkedIn</span>
            <a href={site.contact.linkedin} target="_blank" rel="noopener">
              {site.contact.linkedinLabel}
            </a>
          </li>
          <li>
            <span className="label">Résumé</span>
            <a href={site.contact.resume} target="_blank" rel="noopener">
              PDF
            </a>
          </li>
        </ul>
      </div>

      <div className={`frame ${styles.base}`}>
        <span className="mono">
          {site.name} · {site.location}
        </span>
        <span className="mono">
          Designed and built by me. Next.js, hand-written CSS, no template.
        </span>
      </div>
    </footer>
  );
}
