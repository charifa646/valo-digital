import type { ReactNode } from "react";
import { ArrowRight } from "./Icons";

type Variant = "white" | "electric" | "line";

/** The pill button: the words, then the arrow in its circle (« Parlons de votre projet → »). */
export function BtnInner({ children }: { children: ReactNode }) {
  return (
    <>
      <span>{children}</span>
      <span className="dot" aria-hidden>
        <ArrowRight />
      </span>
    </>
  );
}

// written out in full so Tailwind keeps them
const variants: Record<Variant, string> = { white: "btn-white", electric: "btn-electric", line: "btn-line" };
export const btn = (v: Variant, extra = "") => `btn ${variants[v]} ${extra}`;

/** A WhatsApp link that opens in a new tab. */
export function WaLink({ href, variant, className = "", children }: { href: string; variant: Variant; className?: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={btn(variant, className)}>
      <BtnInner>{children}</BtnInner>
    </a>
  );
}

/** « → Découvrir les offres »: the arrow in a ring, then the words. */
export function GoInner({ children, ring = "" }: { children: ReactNode; ring?: string }) {
  return (
    <>
      <span className={`go-ring ${ring}`} aria-hidden>
        <ArrowRight />
      </span>
      <span>{children}</span>
    </>
  );
}
