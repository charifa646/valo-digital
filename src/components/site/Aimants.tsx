"use client";

import { useEffect } from "react";

/**
 * The buttons that draw the mouse a little (Charifa, 8 October 2026, idea 5b): under the pointer a pill button leans
 * towards it by a few pixels, its arrow a little further, and comes back to its place on a spring when the pointer
 * leaves (stiffness 100, damping 20, the site's springs). Computers only, never with « reduce motion », never inside
 * the phone of the order demo. Moved with `translate`, which leaves the buttons' own `transform` (the arrow's turn) alone.
 */
const K = 100;
const C = 20;
const PULL = { x: 6, y: 5 };
const DOT = 0.8;

type Body = { el: HTMLElement; dot: HTMLElement | null; x: number; y: number; vx: number; vy: number; tx: number; ty: number };

export function Aimants() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const live = new Map<HTMLElement, Body>();
    let frame = 0;
    let last = 0;
    let current: HTMLElement | null = null;

    const step = (now: number) => {
      const dt = Math.min(0.032, (now - last) / 1000);
      last = now;
      for (const b of live.values()) {
        b.vx += (K * (b.tx - b.x) - C * b.vx) * dt;
        b.vy += (K * (b.ty - b.y) - C * b.vy) * dt;
        b.x += b.vx * dt;
        b.y += b.vy * dt;
        const rest = Math.abs(b.tx - b.x) + Math.abs(b.ty - b.y) < 0.05 && Math.abs(b.vx) + Math.abs(b.vy) < 0.05;
        if (rest && !b.tx && !b.ty) {
          b.el.style.translate = "";
          if (b.dot) b.dot.style.translate = "";
          live.delete(b.el);
          continue;
        }
        b.el.style.translate = `${b.x.toFixed(2)}px ${b.y.toFixed(2)}px`;
        if (b.dot) b.dot.style.translate = `${(b.x * DOT).toFixed(2)}px ${(b.y * DOT).toFixed(2)}px`;
      }
      frame = live.size ? requestAnimationFrame(step) : 0;
    };
    const wake = () => {
      if (frame) return;
      last = performance.now();
      frame = requestAnimationFrame(step);
    };
    const release = (el: HTMLElement | null) => {
      const b = el && live.get(el);
      if (!b) return;
      b.tx = 0;
      b.ty = 0;
      wake();
    };

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const target = e.target instanceof Element ? e.target.closest<HTMLElement>(".btn") : null;
      const el = target && !target.closest("[inert]") ? target : null;
      if (current && current !== el) release(current);
      current = el;
      if (!el) return;
      const b = live.get(el) ?? { el, dot: el.querySelector<HTMLElement>(".dot"), x: 0, y: 0, vx: 0, vy: 0, tx: 0, ty: 0 };
      // measured where the button stands at rest, so that its lean does not move the point it leans to
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left - b.x + r.width / 2)) / (r.width / 2);
      const dy = (e.clientY - (r.top - b.y + r.height / 2)) / (r.height / 2);
      b.tx = Math.max(-1, Math.min(1, dx)) * PULL.x;
      b.ty = Math.max(-1, Math.min(1, dy)) * PULL.y;
      live.set(el, b);
      wake();
    };
    const away = () => {
      release(current);
      current = null;
    };

    document.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", away);
    window.addEventListener("blur", away);
    return () => {
      document.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", away);
      window.removeEventListener("blur", away);
      cancelAnimationFrame(frame);
      for (const b of live.values()) {
        b.el.style.translate = "";
        if (b.dot) b.dot.style.translate = "";
      }
    };
  }, []);

  return null;
}
