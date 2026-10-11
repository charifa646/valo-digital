"use client";

import { useEffect, useRef, type PointerEvent } from "react";

/**
 * The band of dots that closes the foot of the page, after the « Dithered Footer » of 21st.dev (Charifa, 12 October
 * 2026). The dots thicken towards the bottom, the name is the gap left in them (see `.df-band` in globals.css), and
 * they drift slowly: that stops when the band leaves the screen, and with « reduce motion ». With a mouse the dots
 * around the pointer keep their strength and the others dim; a finger or a pen gets the plain field. Decorative only.
 */
export function Trame({ nom }: { nom: string }) {
  const band = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  // the drift only runs while the band is on screen
  useEffect(() => {
    const el = band.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => el.classList.toggle("df-hors", !e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const move = (e: PointerEvent<HTMLDivElement>) => {
    const el = field.current;
    if (e.pointerType !== "mouse" || !el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.style.setProperty("--df-x", `${x}px`);
      el.style.setProperty("--df-y", `${y}px`);
      el.classList.add("df-lit");
    });
  };
  const leave = () => {
    cancelAnimationFrame(frame.current);
    field.current?.classList.remove("df-lit");
  };

  return (
    <div ref={band} aria-hidden className="df-band" onPointerMove={move} onPointerLeave={leave}>
      <div ref={field} className="df-field">
        <div className="df-dots" />
      </div>
      <p className="df-mark">{nom}</p>
    </div>
  );
}
