"use client";

import { useEffect } from "react";

/**
 * One observer for the whole page: every [data-reveal] element eases in once,
 * and the little animated visuals (.play-when-in) only run while on screen.
 *
 * The states live in attributes, never in classes: React rewrites the whole
 * class list whenever a component changes one of its classes (a door lighting
 * up, say), which would wipe a class added here and hide the element again for
 * good. « Seen once » (data-in) and « on screen now » (data-play) stay apart, so
 * a card that pauses its little scene off screen never fades out with it.
 */
export function RevealObserver() {
  useEffect(() => {
    const reveal = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal], [data-words]"));
    const play = Array.from(document.querySelectorAll<HTMLElement>(".play-when-in"));
    if (!("IntersectionObserver" in window)) {
      reveal.forEach((el) => el.setAttribute("data-in", ""));
      play.forEach((el) => el.setAttribute("data-play", ""));
      return;
    }
    const once = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.setAttribute("data-in", "");
            once.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 },
    );
    const live = new IntersectionObserver((entries) => {
      for (const e of entries) e.target.toggleAttribute("data-play", e.isIntersecting);
    });
    reveal.forEach((el) => once.observe(el));
    play.forEach((el) => live.observe(el));
    // the very last elements (the footer's name) may never reach the trigger line on short screens: show them at the end of the page
    const atEnd = () => {
      if (innerHeight + scrollY < document.documentElement.scrollHeight - 2) return;
      for (const el of reveal) if (!el.hasAttribute("data-in") && el.getBoundingClientRect().top < innerHeight) el.setAttribute("data-in", "");
    };
    addEventListener("scroll", atEnd, { passive: true });
    return () => {
      once.disconnect();
      live.disconnect();
      removeEventListener("scroll", atEnd);
    };
  }, []);
  return null;
}
