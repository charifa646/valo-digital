"use client";

import { useEffect } from "react";

/**
 * One observer for the whole page: every [data-reveal] element eases in once,
 * and the little animated visuals (.play-when-in) only run while on screen.
 */
export function RevealObserver() {
  useEffect(() => {
    const reveal = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal], [data-words]"));
    const play = Array.from(document.querySelectorAll<HTMLElement>(".play-when-in"));
    if (!("IntersectionObserver" in window)) {
      [...reveal, ...play].forEach((el) => el.classList.add("is-in"));
      return;
    }
    const once = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            once.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 },
    );
    const live = new IntersectionObserver((entries) => {
      for (const e of entries) e.target.classList.toggle("is-in", e.isIntersecting);
    });
    reveal.forEach((el) => once.observe(el));
    play.forEach((el) => live.observe(el));
    return () => {
      once.disconnect();
      live.disconnect();
    };
  }, []);
  return null;
}
