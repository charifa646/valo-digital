"use client";

import { useRef, type PointerEvent } from "react";

const word = { x: 500, y: 192, textAnchor: "middle", textLength: 960, lengthAdjust: "spacingAndGlyphs" } as const;
const type = { fontFamily: "var(--font-montserrat)", fontWeight: 800, fontSize: 250 };

/**
 * The name at the foot of the page, drawn in outline and cut by the bottom
 * edge; it traces itself the first time it comes on screen. Under the mouse a light passes through the letters and fills them
 * (21st.dev « Hover Footer »). On touch screens it simply stays outlined.
 */
export function FooterWordmark() {
  const box = useRef<HTMLDivElement>(null);
  const follow = (e: PointerEvent<HTMLDivElement>) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    box.current!.style.setProperty("--x", `${e.clientX - r.left}px`);
    box.current!.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  return (
    <div ref={box} onPointerMove={follow} aria-hidden data-wordmark data-reveal="draw" className="group relative -mb-[2.5%] select-none [--x:50%] [--y:50%]">
      <svg viewBox="0 0 1000 200" className="block w-full">
        <text {...word} style={type} className="draw-stroke" fill="none" stroke="rgba(255,255,255,.2)" strokeWidth="1.4">
          VALO
        </text>
      </svg>
      <svg
        viewBox="0 0 1000 200"
        className="absolute inset-0 block w-full opacity-0 transition-opacity duration-500 [-webkit-mask-image:radial-gradient(260px_circle_at_var(--x)_var(--y),#000_0%,transparent_100%)] [mask-image:radial-gradient(260px_circle_at_var(--x)_var(--y),#000_0%,transparent_100%)] group-hover:opacity-100"
      >
        <defs>
          <linearGradient id="wordmark-light" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#FDEC05" />
            <stop offset="0.5" stopColor="#ffffff" />
            <stop offset="1" stopColor="#8FA3FF" />
          </linearGradient>
        </defs>
        <text {...word} style={type} fill="url(#wordmark-light)" stroke="rgba(255,255,255,.6)" strokeWidth="1.4">
          VALO
        </text>
      </svg>
    </div>
  );
}
