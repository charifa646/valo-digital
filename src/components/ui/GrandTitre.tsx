"use client";

import { useEffect, useRef } from "react";

/**
 * A very large title opening a part of the homepage (« Nos services », « Nos formations », Charifa, 8 October 2026):
 * the first word full, the others in outline, rising from below their line when they come on screen, then drifting a
 * little sideways while the page goes by, as RNO1 and The Alien move their large words. Still for « reduce motion ».
 *
 * The outline fills from the left: under the mouse on computers (`.grand-titre:hover`), and on phones and tablets, which
 * have no mouse, with the scroll (`--fill`, from 0 to 1 as the title comes up the screen; Charifa, 12 October 2026:
 * « fais le même effet sur mobile »).
 */
export function GrandTitre({ id, children, className = "" }: { id: string; children: string; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [first, ...rest] = children.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let shown = false;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const t = (window.innerHeight - r.top) / (window.innerHeight + r.height);
      el.style.setProperty("--drift", (Math.min(1, Math.max(0, t)) * 2 - 1).toFixed(3));
      // the outline is filled by the time the title has come a little past the lower third of the screen
      el.style.setProperty("--fill", Math.min(1, Math.max(0, (t - 0.1) / 0.3)).toFixed(3));
    };
    const soon = () => {
      if (shown && !frame) frame = requestAnimationFrame(update);
    };
    const io = new IntersectionObserver(([e]) => {
      shown = e.isIntersecting;
      if (shown) soon();
    });
    io.observe(el);
    window.addEventListener("scroll", soon, { passive: true });
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", soon);
    };
  }, []);

  return (
    <h2 ref={ref} id={id} data-reveal="rise" className={`grand-titre text-electric ${className}`}>
      <span className="line-mask">
        <span className="rise-in block">
          <span className="grand-titre-ligne">
            {first} <span className="contour">{rest.join(" ")}</span>
          </span>
        </span>
      </span>
    </h2>
  );
}
