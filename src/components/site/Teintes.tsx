"use client";

import { useEffect } from "react";

/**
 * The colour of the page changing as on instrument.com, from the parts that already have one (Charifa, 8 October
 * 2026): while an element marked `data-teinte` (the night-blue block of the figures) crosses the middle of the screen,
 * the whole page takes its colour in a short fade, and goes back to its light blue after. The colours are in
 * globals.css, under `html[data-teintes]`; the last call's sheet is handled by the veil in `Scroll.tsx`.
 */
export function Teintes() {
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.teintes = "";
    const marks = Array.from(document.querySelectorAll<HTMLElement>("#contenu [data-teinte]"));
    let frame = 0;
    const update = () => {
      frame = 0;
      const mid = window.innerHeight / 2;
      const on = marks.find((m) => {
        const r = m.getBoundingClientRect();
        return r.top <= mid && r.bottom >= mid;
      });
      const t = on?.dataset.teinte ?? "";
      if (root.dataset.teinte !== t) root.dataset.teinte = t;
    };
    const soon = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", soon, { passive: true });
    window.addEventListener("resize", soon);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", soon);
      window.removeEventListener("resize", soon);
      delete root.dataset.teintes;
      delete root.dataset.teinte;
    };
  }, []);
  return null;
}
