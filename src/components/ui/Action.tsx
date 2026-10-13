import type { ReactNode } from "react";
import { ArrowRight } from "./Icons";

type Variant = "white" | "electric" | "line" | "ghost" | "sun";

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
const variants: Record<Variant, string> = { white: "btn-white", electric: "btn-electric", line: "btn-line", ghost: "btn-ghost", sun: "btn-sun" };
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

/**
 * The wide pill of the ChatGPT mock-up Charifa chose on 14 October 2026: the words on the left, a thin arrow ↗ on the right,
 * the whole width of its place. `tone`: the charte's electric blue, its night blue, or white with a fine edge.
 */
export function pilule(tone: "electric" | "night" | "white" = "electric", extra = "") {
  const tones = {
    electric: "bg-electric text-white shadow-[0_18px_40px_-20px_rgba(15, 111, 208,.75)] hover:bg-deep",
    night: "bg-night text-white shadow-[0_18px_40px_-22px_rgba(17, 54, 76,.8)] hover:bg-[#0A1670]",
    white: "bg-white text-ink ring-1 ring-hair hover:ring-electric/50",
  };
  return `group flex w-full items-center justify-between gap-4 rounded-full px-6 py-[16px] text-left text-[15px] font-semibold leading-tight tracking-[-0.01em] transition duration-300 active:scale-[.985] disabled:opacity-70 sm:px-7 sm:py-[17px] sm:text-[17px] ${tones[tone]} ${extra}`;
}

export function PiluleInner({ children, icon }: { children: ReactNode; icon?: ReactNode }) {
  return (
    <>
      <span>{children}</span>
      <span aria-hidden className="shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
        {icon ?? (
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17 17 7M8 7h9v9" />
          </svg>
        )}
      </span>
    </>
  );
}
