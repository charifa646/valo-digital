"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * The clients' band: its logos are only drawn once the band is about to be seen. The browser's own lazy loading is no use
 * here: the band sits right under the top, inside the distance at which it already fetches everything, so the 37 logos were
 * asked for at startup and shared the phone's line with the top's photo, fonts and scripts (PageSpeed, 14 October 2026).
 * The band keeps its height meanwhile, so nothing moves when the logos arrive.
 */
export function LogosRangs({ className = "", children }: { className?: string; children: ReactNode }) {
  const box = useRef<HTMLDivElement>(null);
  const [pret, setPret] = useState(false);
  useEffect(() => {
    const el = box.current;
    if (!el || !("IntersectionObserver" in window)) return setPret(true);
    // when the band is a tenth of a screen away, or as soon as the visitor starts to scroll (the band is then a few
    // hundred pixels from view and the logos have the time to arrive)
    const montrer = () => {
      setPret(true);
      io.disconnect();
      removeEventListener("scroll", montrer);
    };
    const io = new IntersectionObserver((entries) => entries.some((e) => e.isIntersecting) && montrer(), { rootMargin: "0px 0px 10% 0px" });
    io.observe(el);
    addEventListener("scroll", montrer, { passive: true, once: true });
    return () => {
      io.disconnect();
      removeEventListener("scroll", montrer);
    };
  }, []);
  return (
    <div ref={box} data-reveal className={`min-h-[156px] sm:min-h-[172px] ${className}`}>
      {pret ? children : null}
    </div>
  );
}
