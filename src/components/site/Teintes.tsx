"use client";

import { useEffect } from "react";

/**
 * The colour of the page changing from one part to the next, as instrument.com does (Charifa, 8 October 2026): when a
 * part marked `data-teinte` reaches the middle of the screen, the whole page takes its colour in a short fade (`soleil`,
 * VALO's yellow, for « Nos services »; `nuit`, its night blue, for the method), and goes back to its light blue in the
 * other parts. The colours are in globals.css, under `html[data-teintes]`. Without the script the page stays light.
 */
export function Teintes() {
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.teintes = "";
    const parts = Array.from(document.querySelectorAll<HTMLElement>("#contenu > section"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) root.dataset.teinte = (e.target as HTMLElement).dataset.teinte ?? "";
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    parts.forEach((p) => io.observe(p));
    return () => {
      io.disconnect();
      delete root.dataset.teintes;
      delete root.dataset.teinte;
    };
  }, []);
  return null;
}
