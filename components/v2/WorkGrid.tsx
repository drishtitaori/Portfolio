import Link from "next/link";
import { studies } from "@/content/v2";
import Plate from "./Plate";

/**
 * Selected work, as a two-up grid of tinted tiles.
 *
 * Each tile gets its own pastel from `content/v2.ts` and sets it as a local
 * `--tile` custom property. Every colour inside the tile is then derived from
 * `--ink` with `color-mix`, so a tile works on any tint without a second set of
 * rules — change a project's `tint` and the whole card re-tunes.
 *
 * The image is deliberately not contained: `.tileArt` uses negative inline
 * margins and the tile clips it, so the screenshot runs off the bottom edge.
 * That's what makes the tile read as a window onto the work rather than a card
 * with a picture in it.
 *
 * No client JavaScript — hover lift, image parallax and the arrow slide are all
 * CSS. The reveal-on-scroll wrapper lives in the page, not here.
 */
export default function WorkGrid() {
  return (
    <ul className="tiles">
      {studies.map((study) => (
        <li key={study.slug} style={{ "--tile": `var(${study.tint})` } as React.CSSProperties}>
          <Link href={`/v2/work/${study.slug}/`} className="tile">
            <span className="mono tileCat">{study.category}</span>

            <h3 className="tileTitle">
              {study.title[0]} {study.title[1]}
            </h3>

            <p className="tileDeck">{study.deck}</p>

            <span className="tileGo">
              Read the case study <i aria-hidden="true">→</i>
            </span>

            <div className="tileArt">
              <Plate slot={study.cover} />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
