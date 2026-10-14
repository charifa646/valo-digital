"use client";

import { useEffect } from "react";

/**
 * The colour of the page changing as on instrument.com, from the parts that already have one (Charifa, 8 October
 * 2026): while an element marked `data-teinte` holds the middle of the screen (the first one in the page when two are
 * nested), the whole page takes its colour in a slow fade (`html[data-teinte]`), and is light again after. A margin
 * on each side of the middle keeps the colour from flickering when the page stops right at the edge of a part. The
 * fades are only switched on (`html[data-teintes]`) after the first frame, so a page opened on a coloured part does not
 * fade into it under the eyes. The colours are in globals.css. The header is told, so its glass turns dark.
 *
 * The words turn light only in the part that holds the colour and the one before and after it (`data-teinte-on`), the
 * only ones on screen then: the whole page restyled at once made a slowed phone stop for 190 ms (14 October 2026).
 */
export function Teintes() {
  useEffect(() => {
    const root = document.documentElement;
    const marks = Array.from(document.querySelectorAll<HTMLElement>("#contenu [data-teinte]"));
    let frame = 0;
    let current: HTMLElement | undefined;
    let zone: Element[] = [];
    let zoneDe: HTMLElement | undefined;
    // the part that holds the colour and the two sections before and after it (two, not one: on « À propos » the sections are short and
    // a screen shows several)
    const setZone = (mark: HTMLElement | undefined) => {
      zone.forEach((z) => z.removeAttribute("data-teinte-on"));
      const part = mark?.closest("#contenu > section");
      zone = [];
      if (part) {
        const all = Array.from(part.parentElement!.children).filter((e) => e.matches("section"));
        const i = all.indexOf(part);
        zone = all.slice(Math.max(0, i - 2), i + 3);
      }
      zone.forEach((z) => z.setAttribute("data-teinte-on", ""));
      zoneDe = mark;
    };
    const update = () => {
      frame = 0;
      const mid = window.innerHeight / 2;
      const margin = window.innerHeight * 0.06;
      // the part on stays on until its edge is clearly past the middle; a new one needs to clearly hold it
      const holds = (m: HTMLElement, slack: number) => {
        const r = m.getBoundingClientRect();
        return r.top <= mid + slack && r.bottom >= mid - slack;
      };
      if (!current || !holds(current, margin)) current = marks.find((m) => holds(m, -margin));
      const t = current?.dataset.teinte;
      // the zone follows the part, not only the colour: going from one blue part to the next blue one changes no colour but
      // the words of the new part still have to turn light (Charifa, 14 October 2026: the figures of « À propos » were dark on the blue)
      if (zoneDe !== (t ? current : undefined)) setZone(t ? current : undefined);
      if (root.dataset.teinte === t) return;
      if (t) root.dataset.teinte = t;
      else delete root.dataset.teinte;
      window.dispatchEvent(new Event("teinte"));
    };
    const soon = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    const start = requestAnimationFrame(() => (root.dataset.teintes = ""));
    window.addEventListener("scroll", soon, { passive: true });
    window.addEventListener("resize", soon);
    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(start);
      window.removeEventListener("scroll", soon);
      window.removeEventListener("resize", soon);
      setZone(undefined);
      delete root.dataset.teintes;
      delete root.dataset.teinte;
    };
  }, []);
  return null;
}
