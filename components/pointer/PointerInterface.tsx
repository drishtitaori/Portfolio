"use client";

import { useEffect, useRef } from "react";

type PointerSkin = "iris" | "halo" | "tiles" | "reticle" | "lens";

type PointerInterfaceProps = {
  skin: PointerSkin;
};

const interactiveSelector =
  "a, button, input, select, textarea, summary, [role='button'], [data-pointer-target], .v4-workCard";

export default function PointerInterface({ skin }: PointerInterfaceProps) {
  const pointerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const pointer = pointerRef.current;
    const scope = pointer?.parentElement;
    if (!pointer || !scope) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let enabled = false;
    let visible = false;
    let frame = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const hide = () => {
      visible = false;
      pointer.dataset.visible = "false";
      pointer.dataset.hot = "false";
    };

    const render = () => {
      currentX += (targetX - currentX) * 0.22;
      currentY += (targetY - currentY) * 0.22;
      pointer.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;

      if (Math.abs(targetX - currentX) + Math.abs(targetY - currentY) > 0.1) {
        frame = requestAnimationFrame(render);
      } else {
        frame = 0;
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!enabled || event.pointerType !== "mouse") return;

      targetX = event.clientX;
      targetY = event.clientY;
      if (!visible) {
        currentX = targetX;
        currentY = targetY;
        visible = true;
        pointer.dataset.visible = "true";
      }

      const target = event.target instanceof Element ? event.target : null;
      pointer.dataset.hot = target?.closest(interactiveSelector) ? "true" : "false";
      if (!frame) frame = requestAnimationFrame(render);
    };

    const onPointerOut = (event: PointerEvent) => {
      if (!event.relatedTarget) hide();
    };

    const magneticListeners: Array<{
      element: HTMLElement;
      move: (event: PointerEvent) => void;
      leave: () => void;
    }> = [];

    const attachMagneticElements = () => {
      for (const element of scope.querySelectorAll<HTMLElement>("[data-magnetic]")) {
        const strength = Number(element.dataset.magnetic) || 0.2;
        const move = (event: PointerEvent) => {
          if (!enabled || event.pointerType !== "mouse") return;
          const bounds = element.getBoundingClientRect();
          const x = (event.clientX - (bounds.left + bounds.width / 2)) * strength;
          const y = (event.clientY - (bounds.top + bounds.height / 2)) * strength;
          element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        };
        const leave = () => {
          element.style.transform = "";
        };

        element.addEventListener("pointermove", move, { passive: true });
        element.addEventListener("pointerleave", leave);
        magneticListeners.push({ element, move, leave });
      }
    };

    const removeMagneticElements = () => {
      for (const { element, move, leave } of magneticListeners) {
        element.removeEventListener("pointermove", move);
        element.removeEventListener("pointerleave", leave);
        element.style.transform = "";
      }
      magneticListeners.length = 0;
    };

    const updateEnabled = () => {
      const nextEnabled = finePointer.matches && !reducedMotion.matches;
      if (enabled === nextEnabled) return;

      enabled = nextEnabled;
      if (enabled) {
        attachMagneticElements();
      } else {
        hide();
        removeMagneticElements();
        if (frame) cancelAnimationFrame(frame);
        frame = 0;
      }
    };

    updateEnabled();
    finePointer.addEventListener("change", updateEnabled);
    reducedMotion.addEventListener("change", updateEnabled);
    document.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", hide);
    window.addEventListener("pointerout", onPointerOut);
    window.addEventListener("blur", hide);

    return () => {
      finePointer.removeEventListener("change", updateEnabled);
      reducedMotion.removeEventListener("change", updateEnabled);
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", hide);
      window.removeEventListener("pointerout", onPointerOut);
      window.removeEventListener("blur", hide);
      removeMagneticElements();
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <span
      ref={pointerRef}
      aria-hidden="true"
      className="pointer-interface"
      data-hot="false"
      data-pointer-skin={skin}
      data-visible="false"
    >
      <span className="pointer-interface__core" />
      <span className="pointer-interface__ring" />
      <span className="pointer-interface__accent pointer-interface__accent--one" />
      <span className="pointer-interface__accent pointer-interface__accent--two" />
    </span>
  );
}
