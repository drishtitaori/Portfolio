"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { studies } from "@/content/v2";
import DimensionLine from "./DimensionLine";
import Plate from "./Plate";

/**
 * Selected work, laid out sideways.
 *
 * Three things are happening here and they are deliberately separate:
 *
 *   scroll   — native overflow with x scroll-snap. Works with a trackpad, a
 *              shift-wheel, arrow keys, and touch, with no JavaScript at all.
 *   drag     — pointer events add click-and-throw for mouse users, who
 *              otherwise have no good way to move a horizontal scroller.
 *   scale    — pure CSS scroll-driven animation (see `@keyframes v2-card`),
 *              so the cards swelling toward centre never touches the main
 *              thread and degrades to "all cards same size" where unsupported.
 *
 * The dimension line above the rail is its scrollbar. That reuse is the point:
 * the measurement device that annotates the masthead is the same object that
 * controls the work section.
 */
export default function WorkRail() {
  const scroller = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [index, setIndex] = useState(1);

  // Drag state. Kept in a ref so a pointermove never triggers a render.
  const drag = useRef({ active: false, startX: 0, startLeft: 0, moved: 0 });
  const [dragging, setDragging] = useState(false);

  const onScroll = useCallback(() => {
    const el = scroller.current;
    if (!el) return;

    const span = el.scrollWidth - el.clientWidth;
    const p = span > 0 ? el.scrollLeft / span : 0;
    setProgress(p);
    // Which card is nearest the centre of the viewport.
    setIndex(Math.min(studies.length, Math.round(p * (studies.length - 1)) + 1));
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Touch already has momentum scrolling; hijacking it makes things worse.
    if (e.pointerType === "touch") return;
    const el = scroller.current;
    if (!el) return;

    drag.current = {
      active: true,
      startX: e.clientX,
      startLeft: el.scrollLeft,
      moved: 0,
    };
    setDragging(true);
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scroller.current;
    if (!el || !drag.current.active) return;

    const dx = e.clientX - drag.current.startX;
    drag.current.moved = Math.max(drag.current.moved, Math.abs(dx));
    el.scrollLeft = drag.current.startLeft - dx;
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scroller.current;
    if (!el || !drag.current.active) return;

    drag.current.active = false;
    setDragging(false);
    if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
  };

  /**
   * A drag that ends over a card would otherwise fire that card's click and
   * navigate. Anything past a few pixels was a drag, not a tap.
   */
  const onClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (drag.current.moved > 6) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = 0;
    }
  };

  const counter = `${String(index).padStart(2, "0")} / ${String(studies.length).padStart(2, "0")}`;

  return (
    <div className="railWrap">
      <div className="railDim">
        <DimensionLine label={counter} progress={progress} />
      </div>

      <div
        ref={scroller}
        className="scroller"
        data-dragging={dragging}
        onScroll={onScroll}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
        role="region"
        aria-label="Selected work. Scroll sideways to browse."
        tabIndex={0}
      >
        {studies.map((study, i) => (
          <Link
            key={study.slug}
            href={`/v2/work/${study.slug}/`}
            className="card"
            // Dragging over a link shows the browser's ghost image otherwise.
            draggable={false}
          >
            <div className="cardPlate">
              <span className="cardIndex">{String(i + 1).padStart(2, "0")}</span>
              <Plate slot={study.cover} priority={i === 0} />
            </div>

            <div className="cardMeta">
              <span className="mono">
                {study.org} · {study.year}
              </span>
              <span className="mono">{study.platform.split(" · ")[0]}</span>
            </div>

            <h3 className="cardTitle">
              {study.title[0]} {study.title[1]}
            </h3>
            <p className="cardDeck">{study.deck}</p>

            <div className="cardStats">
              {study.metrics.slice(0, 2).map((m) => (
                <span key={m.label} className="cardStat">
                  <b>{m.value}</b> {m.label}
                </span>
              ))}
            </div>

            <span className="cardGo">
              Read the case study <i aria-hidden="true">→</i>
            </span>
          </Link>
        ))}
      </div>

      <div className="railHint">
        <p className="mono">Drag, scroll sideways, or tab through</p>
      </div>
    </div>
  );
}
