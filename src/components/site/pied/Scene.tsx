"use client";

import Image from "next/image";
import { forwardRef, useEffect, useRef, type CSSProperties, type PointerEvent } from "react";
import { final } from "@/lib/content";
import { DemandeButton } from "../Sheet";
import { BtnInner, btn } from "@/components/ui/Action";
import { Words, count } from "@/components/ui/Words";
import { waveTop } from "@/components/ui/Wave";
import { Bas, Colonnes, Contacts, Marque } from "./Liens";

const name = ["V", "A", "L", "O"];

const Letters = forwardRef<HTMLDivElement, { className?: string }>(function Letters({ className = "" }, ref) {
  return (
    <div ref={ref} className={`stage-word ${className}`}>
      {name.map((l, i) => (
        <span key={i} className="stage-letter" style={{ ["--i" as string]: i } as CSSProperties}>
          {l}
        </span>
      ))}
    </div>
  );
});

/** The last call's title, cut where the catalogue's sentence breaks: « Prêt à faire avancer » / « votre activité ? ». */
const cut = final.title.indexOf("votre");
const line1 = final.title.slice(0, cut).trim();
const line2 = final.title.slice(cut);

/**
 * Proposal A for the foot of the page, « la scène » (7 October 2026). The last call is a blue curtain: its title very
 * large, the way to write to VALO, its numbers written large, the services and trainings. As the page reaches its end
 * the curtain rises, its hem a wave casting its shadow, and uncovers the stage pinned under it: the name VALO standing
 * on a floor that shines like a mirror, Valentin in his armchair in front, the light coming on as the curtain goes up
 * and the letters rising last. Under the mouse a light passes through the letters. With « reduce motion », all is lit
 * and in place.
 */
export function Scene() {
  const curtain = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);

  // how much of the stage the curtain has uncovered, from 0 to 1: it drives the light and the letters
  useEffect(() => {
    const c = curtain.current;
    const s = stage.current;
    if (!c || !s || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const shown = window.innerHeight - c.getBoundingClientRect().bottom;
      s.style.setProperty("--p", Math.min(1, Math.max(0, shown / s.offsetHeight)).toFixed(3));
    };
    const soon = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", soon, { passive: true });
    window.addEventListener("resize", soon);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", soon);
      window.removeEventListener("resize", soon);
    };
  }, []);

  const follow = (e: PointerEvent<HTMLDivElement>) => {
    const g = glow.current;
    if (!g) return;
    const r = g.getBoundingClientRect();
    g.style.setProperty("--x", `${e.clientX - r.left}px`);
    g.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  return (
    <div data-dark className={`on-dark relative isolate bg-electric text-white ${waveTop("swell", true)}`}>
      {/* the curtain */}
      <div ref={curtain} className="relative z-[1]">
        <div className="relative overflow-hidden bg-[linear-gradient(180deg,#0714D8_0%,#0A15C2_55%,#0712B0_100%)]">
          <div
            aria-hidden
            className="absolute right-[-12%] top-[-18%] -z-10 h-[680px] w-[680px] rounded-full bg-[radial-gradient(closest-side,rgba(143,163,255,.32),transparent)]"
          />
          <section id="contact" aria-labelledby="contact-title" className="gutter relative mx-auto max-w-page pt-12 sm:pt-16 lg:pt-20">
            <h2 id="contact-title" data-reveal="words" className="text-[clamp(2.65rem,0.6rem+5.6vw,6.1rem)] font-medium leading-[0.98] tracking-[-0.045em]">
              <span className="block">
                <Words>{line1}</Words>
              </span>
              <span className="block text-sun">
                <Words from={count(line1)}>{line2}</Words>
              </span>
            </h2>
            <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-12 lg:gap-10">
              <div data-reveal style={{ ["--d" as string]: "0.35s" } as CSSProperties} className="lg:col-span-5">
                <p className="pretty max-w-[26rem] text-[17px] font-medium leading-relaxed text-white/80 sm:text-[18px]">{final.text}</p>
                <DemandeButton className={btn("white", "mt-7")}>
                  <BtnInner>{final.cta}</BtnInner>
                </DemandeButton>
              </div>
              <Contacts className="lg:col-span-6 lg:col-start-7 lg:pt-1" />
            </div>
          </section>

          <footer className="gutter relative mx-auto max-w-page">
            <div className="mt-16 grid gap-12 sm:mt-20 lg:mt-24 lg:grid-cols-12 lg:gap-10">
              <Marque className="lg:col-span-5" />
              <Colonnes className="lg:col-span-6 lg:col-start-7" />
            </div>
            <Bas className="mt-12 lg:mt-16" />
          </footer>
        </div>
        <svg aria-hidden className="hem" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0 0H1440V56C1230 95 1010 86 760 54C500 20 240 25 0 69Z" fill="#0712B0" />
        </svg>
      </div>

      {/* the stage, pinned under the curtain */}
      <div ref={stage} aria-hidden className="stage" onPointerMove={follow}>
        <div className="curtain opacity-60" />
        <div className="stage-beam" />
        <div className="stage-pool" />
        <Letters />
        <Letters className="stage-mirror" />
        <Letters ref={glow} className="stage-glow" />
        <Image src="/images/v3/valentin-assis.webp" alt="" width={990} height={1131} sizes="(min-width: 1024px) 520px, 100vw" className="stage-man fade-left" />
        <div className="stage-veil" />
      </div>
    </div>
  );
}
