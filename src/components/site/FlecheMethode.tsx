"use client";

import { useEffect, useRef, useState } from "react";

type Pt = { x: number; y: number; r: number };
type Hop = { line: string; head: string };
type Drawing = { hops: Hop[]; w: number; h: number };

/**
 * The curved arrows of the method on a phone (Charifa, 11 October 2026: « une flèche en courbe qui passe d'un point à
 * un autre »; chosen on 12 October among two ways: « de larges arcs en pointillés qui sautent d'un bord de l'écran à
 * l'autre, avec une pointe de flèche »). The numbered points stand at the two edges in turn; a dotted arc leaves the
 * side of each, sweeps across above the words that sit under it and comes down into the next point, ending in a small
 * arrowhead. The arcs are measured from the points themselves (marked `data-point` in the box that holds this drawing),
 * so they follow the text whatever its length, and they are drawn one after the other once the box is on screen
 * (`.curve-draw`, `.curve-dot`). Decorative only.
 */
export function FlecheMethode() {
  const svg = useRef<SVGSVGElement>(null);
  const [d, setD] = useState<Drawing | null>(null);

  useEffect(() => {
    const box = svg.current?.parentElement;
    if (!box) return;
    const draw = () => {
      // hidden (the staircase of computers shows instead): nothing to measure
      if (!box.offsetWidth) return setD(null);
      const b = box.getBoundingClientRect();
      const pts: Pt[] = [...box.querySelectorAll<HTMLElement>("[data-point]")].map((el) => {
        const r = el.getBoundingClientRect();
        return { x: r.left - b.left + r.width / 2, y: r.top - b.top + r.height / 2, r: r.width / 2 };
      });
      if (pts.length < 2) return;
      const n = (v: number) => v.toFixed(1);
      const hops = pts.slice(0, -1).map((a, i) => {
        const z = pts[i + 1];
        // the way in is a little short of the next point, so the head sits on its edge
        const e = { x: z.x, y: z.y - z.r - 5 };
        // out of the side of the first point, towards the other edge, level, then down into the next one: a quarter of an
        // ellipse, wide, passing above the words that sit under the first point
        const s = { x: a.x + (z.x > a.x ? 1 : -1) * (a.r + 4), y: a.y };
        const dx = e.x - s.x;
        const dy = e.y - s.y;
        const line = `M${n(s.x)} ${n(s.y)}C${n(s.x + dx * 0.64)} ${n(s.y)} ${n(e.x)} ${n(e.y - dy * 0.64)} ${n(e.x)} ${n(e.y)}`;
        // the head follows the end of the curve, which comes in straight down
        const head = `M${n(e.x - 5.5)} ${n(e.y - 7)}L${n(e.x)} ${n(e.y)}L${n(e.x + 5.5)} ${n(e.y - 7)}`;
        return { line, head };
      });
      setD({ hops, w: box.offsetWidth, h: box.offsetHeight });
    };
    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(box);
    // the letters' real size, once the font is there, moves the points
    document.fonts?.ready.then(draw);
    return () => ro.disconnect();
  }, []);

  return (
    <svg ref={svg} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
      {d &&
        d.hops.map((h, i) => {
          const delay = 0.5 + i * 0.85;
          return (
            <g key={i}>
              {/* the dotted line is shown through a mask that a plain line draws: a dotted line cannot be drawn by its own dash */}
              <mask id={`fleche-arc-${i}`} maskUnits="userSpaceOnUse" x={-40} y={-40} width={d.w + 80} height={d.h + 80}>
                <path
                  d={h.line}
                  pathLength={1}
                  className="curve-draw"
                  style={{ transitionDuration: "1.15s", transitionDelay: `${delay}s` }}
                  fill="none"
                  stroke="#fff"
                  strokeWidth="14"
                  strokeLinecap="round"
                />
              </mask>
              <path d={h.line} mask={`url(#fleche-arc-${i})`} fill="none" stroke="#0f6fd0" strokeWidth="2.75" strokeLinecap="round" strokeDasharray="0.1 8.5" />
              <path
                d={h.head}
                className="curve-dot"
                style={{ transitionDelay: `${delay + 0.95}s` }}
                fill="none"
                stroke="#0f6fd0"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          );
        })}
    </svg>
  );
}
