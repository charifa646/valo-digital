"use client";

import { useEffect, useRef } from "react";

const group = new Intl.NumberFormat("fr-FR");

/**
 * A figure that counts up once when it comes on screen, its digits grouped the French way (« 1 000 », « 70 000 »).
 * The page is rendered with the figure as written, kept invisible underneath so the line never changes width while
 * it counts; without JavaScript, with reduced motion and for screen readers, the figure simply stays as written.
 */
export function Counter({
  value,
  to,
  prefix = "",
  suffix = "",
  className = "",
}: {
  value: string;
  to: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const shown = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = shown.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const show = (n: number) => (el.textContent = prefix + group.format(n) + suffix);
    let frame = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const step = (t: number) => {
          const p = Math.min(1, (t - start) / 1900);
          show(Math.round(to * (1 - Math.pow(1 - p, 4))));
          if (p < 1) frame = requestAnimationFrame(step);
          else el.textContent = value;
        };
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );
    show(0);
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, to, prefix, suffix]);

  return (
    <span className={`inline-grid tabular-nums ${className}`}>
      <span aria-hidden className="invisible [grid-area:1/1]">
        {value}
      </span>
      <span ref={shown} aria-hidden className="[grid-area:1/1]">
        {value}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
