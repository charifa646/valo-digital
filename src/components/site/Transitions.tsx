"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

/**
 * The change of page (Charifa, 8 October 2026, idea 1): the page left lifts and fades, the new one comes up from
 * below, the menu bar stays where it is. From the short menu of « Services » or « Formations » (computers), the name on
 * its blue card travels and grows into the very large title of its page. Done with the browser's own View Transitions:
 * where they are missing, or with « reduce motion », the pages change as before.
 *
 * Every click on a link to another page of the site is taken here, before the page's own handlers and Next.js see it,
 * then given to the router inside the transition, which waits for the new page to be in place.
 */
type Waiting = { path: string; done: () => void };

export function Transitions() {
  const router = useRouter();
  const pathname = usePathname();
  const waiting = useRef<Waiting | null>(null);

  // the new page is in place: the transition can take its picture (at once: while a transition waits, the browser
  // draws no frame, so waiting for the next one would hold the page still until the time limit)
  useEffect(() => {
    const w = waiting.current;
    if (w && w.path === pathname) w.done();
  }, [pathname]);

  useEffect(() => {
    if (!("startViewTransition" in document)) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");

    const click = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || still.matches || waiting.current) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname) return;
      // the page as it is, short menu open, is what lifts away: its own click (which closes it) is not needed, the
      // new page bringing its own menu bar
      e.preventDefault();
      e.stopPropagation();

      // the name that grows into the page's title, when it is on screen
      const from = a.closest("#sous-menu")?.querySelector<HTMLElement>("[data-titre]");
      const seen = from && from.getBoundingClientRect().bottom > 0;
      if (seen) from.style.viewTransitionName = "titre";

      const vt = document.startViewTransition(
        () =>
          new Promise<void>((resolve) => {
            let over = false;
            const done = () => {
              if (over) return;
              over = true;
              waiting.current = null;
              const title = document.getElementById("page-title");
              if (seen && title) {
                title.style.viewTransitionName = "titre";
                // the title arrives by travelling: its own rise would play inside the journey
                title.querySelector<HTMLElement>(".rise")?.style.setProperty("animation", "none");
              }
              resolve();
            };
            waiting.current = { path: url.pathname, done };
            router.push(url.pathname + url.search + url.hash);
            // a page slow to come is not waited for longer than this
            window.setTimeout(done, 2500);
          }),
      );
      vt.finished.finally(() => {
        if (from) from.style.viewTransitionName = "";
        const title = document.getElementById("page-title");
        if (title) title.style.viewTransitionName = "";
      });
    };

    window.addEventListener("click", click, true);
    return () => window.removeEventListener("click", click, true);
  }, [router]);

  return null;
}
