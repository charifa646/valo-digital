"use client";

import { useEffect, useRef, useState } from "react";

type Pt = [number, number];
type Curve = { w: number; h: number; line: string; dots: Pt[]; tip: Pt; head: string };

/** A smooth line through the points (Catmull-Rom turned into cubic Béziers). */
function smooth(p: Pt[]) {
  let d = `M${p[0][0]} ${p[0][1]}`;
  for (let i = 0; i < p.length - 1; i++) {
    const [a, b, c, e] = [p[Math.max(i - 1, 0)], p[i], p[i + 1], p[Math.min(i + 2, p.length - 1)]];
    const c1: Pt = [b[0] + (c[0] - a[0]) / 6, b[1] + (c[1] - a[1]) / 6];
    const c2: Pt = [c[0] - (e[0] - b[0]) / 6, c[1] - (e[1] - b[1]) / 6];
    d += `C${c1.map((v) => v.toFixed(1)).join(" ")} ${c2.map((v) => v.toFixed(1)).join(" ")} ${c[0].toFixed(1)} ${c[1].toFixed(1)}`;
  }
  return d;
}

/**
 * The growth curve over the method's staircase: a point above the name of
 * each step, rising to an arrow past the last one. It is measured from the steps
 * themselves, so it never touches their words, and drawn once the stairs
 * are up. Decorative only.
 */
export function GrowthCurve() {
  const svg = useRef<SVGSVGElement>(null);
  const [c, setC] = useState<Curve | null>(null);

  useEffect(() => {
    const box = svg.current?.parentElement;
    if (!box) return;
    const draw = () => {
      const steps = [...box.querySelectorAll<HTMLElement>("[data-step]")];
      if (steps.length < 2) return;
      // one point above the start of each step's name: the line rises, so it is lowest there and can never cut a word.
      // Layout positions (offsetTop), so the reveal's little slide does not move the points.
      const dots = steps.map((s) => [s.offsetLeft + 6, s.offsetTop - 18] as Pt);
      const rise = (dots[0][1] - dots[dots.length - 1][1]) / (dots.length - 1);
      const last = dots[dots.length - 1];
      const tip: Pt = [box.offsetWidth - 8, Math.max(last[1] - rise * 0.75, 12)];
      const line = smooth([...dots, tip]);
      // the arrow follows the last stretch of the line
      const a = Math.atan2(tip[1] - last[1], tip[0] - last[0]);
      const wing = (t: number): Pt => [tip[0] - 10 * Math.cos(a + t), tip[1] - 10 * Math.sin(a + t)];
      const [l, r] = [wing(0.5), wing(-0.5)];
      const head = `M${l[0].toFixed(1)} ${l[1].toFixed(1)}L${tip[0].toFixed(1)} ${tip[1].toFixed(1)}L${r[0].toFixed(1)} ${r[1].toFixed(1)}`;
      setC({ w: box.offsetWidth, h: box.offsetHeight, line, dots, tip, head });
    };
    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(box);
    return () => ro.disconnect();
  }, []);

  return (
    <svg ref={svg} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" viewBox={c ? `0 0 ${c.w} ${c.h}` : undefined}>
      {c && (
        <>
          <defs>
            <linearGradient id="curve-ink" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={c.w} y2="0">
              <stop offset="0" stopColor="#AEBBFF" />
              <stop offset="0.55" stopColor="#3551FF" />
              <stop offset="1" stopColor="#0714D8" />
            </linearGradient>
          </defs>
          <path d={c.line} pathLength={1} className="curve-draw" fill="none" stroke="#3551FF" strokeOpacity="0.14" strokeWidth="10" strokeLinecap="round" />
          <path d={c.line} pathLength={1} className="curve-draw" fill="none" stroke="url(#curve-ink)" strokeWidth="2.5" strokeLinecap="round" />
          {c.dots.map(([x, y], i) => (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="5"
              className="curve-dot"
              style={{ transitionDelay: `${1.4 + i * 0.32}s` }}
              fill={i === c.dots.length - 1 ? "#0714D8" : "#fff"}
              stroke="#0714D8"
              strokeWidth="2"
            />
          ))}
          <path
            d={c.head}
            className="curve-dot"
            style={{ transitionDelay: "2.8s" }}
            fill="none"
            stroke="#0714D8"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
    </svg>
  );
}
