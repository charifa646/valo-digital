import type { ReactNode } from "react";

/**
 * VALO's own small icons for its four trades (Charifa, 12 October 2026: « les icônes sur le header font trop IA… tu n'as
 * pas mieux ? », then « je n'ai pas dit de les retirer, j'ai dit de faire mieux »). Thin outline icons from a stock set
 * all look alike; these are drawn for the site: bold and filled, in two colours of the charte, the shape in the text's
 * colour (electric blue, or white on the blue top) and one accent in the charte's yellow (`--glyphe-accent`, `.glyphe`
 * in globals.css). A megaphone, a target, a bag and a mortarboard, on a 24 px grid; they hold from 13 px up.
 */
const draw: Record<"marketing" | "publicite" | "vente" | "formation", ReactNode> = {
  marketing: (
    <>
      <path d="M1.5 9.6C1.5 8.7 2.2 8 3.1 8h3.4l8.3-4.2c.7-.35 1.4.15 1.4 1v14.4c0 .85-.7 1.35-1.4 1L6.5 16H3.1c-.9 0-1.6-.7-1.6-1.6V9.6Z" />
      <path d="M3.8 16.3h3.5v3.9a1.5 1.5 0 0 1-1.5 1.5H5.3a1.5 1.5 0 0 1-1.5-1.5v-3.9Z" />
      <g className="al">
        <path d="M18.9 9.4a4.2 4.2 0 0 1 0 5.2" />
        <path d="M20.7 6.8a7.6 7.6 0 0 1 0 10.4" />
      </g>
    </>
  ),
  publicite: (
    <>
      <path fillRule="evenodd" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 3.2a6.8 6.8 0 1 1 0 13.6 6.8 6.8 0 0 1 0-13.6Z" />
      <circle className="af" cx="12" cy="12" r="4.3" />
      <circle cx="12" cy="12" r="1.5" />
    </>
  ),
  vente: (
    <>
      <path d="M5.3 8h13.4c.7 0 1.2.5 1.3 1.1l1.1 10.4A2.2 2.2 0 0 1 19 22H5a2.2 2.2 0 0 1-2.1-2.5L4 9.1C4.1 8.5 4.6 8 5.3 8Z" />
      <path className="al" d="M8.6 11.6V7.3a3.4 3.4 0 0 1 6.8 0v4.3" />
    </>
  ),
  formation: (
    <>
      <path className="af" d="M5.9 12.3v4.6c0 1.6 2.7 3.3 6.1 3.3s6.1-1.7 6.1-3.3v-4.6L12 15.6l-6.1-3.3Z" />
      <path d="M12 3 1.6 8.4 12 13.8l10.4-5.4L12 3Z" />
    </>
  ),
};

export type Metier = keyof typeof draw;

export function Glyphe({ metier, className = "" }: { metier: Metier; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={`glyphe ${className}`}>
      {draw[metier]}
    </svg>
  );
}
