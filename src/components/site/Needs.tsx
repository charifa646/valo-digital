"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { needs } from "@/lib/content";
import { Anchor } from "./Scroll";
import { Filigrane } from "@/components/ui/Filigrane";
import { Words } from "@/components/ui/Words";
import { BtnInner, btn } from "@/components/ui/Action";
import { ArrowUpRight, Cap, Handoff, Rocket, Scan } from "@/components/ui/Icons";

const icons = [Cap, Scan, Handoff, Rocket];
const lit = "bg-[linear-gradient(160deg,#3551FF_0%,#0714D8_52%,#0A12A8_100%)] shadow-[0_22px_40px_-26px_rgba(7,20,216,.45)]";

/**
 * « De quoi avez-vous besoin aujourd'hui ? »: four ways in, each opening onto its offer. On computers four
 * doors with a light sliding to the one under the mouse; on phones and tablets an index, the line in the
 * middle of the screen lit.
 */
export function Needs() {
  const [active, setActive] = useState(0);
  const cards = useRef<(HTMLAnchorElement | null)[]>([]);

  // on phones and tablets the door in the middle of the screen lights up
  useEffect(() => {
    if (window.matchMedia("(min-width: 1024px)").matches) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
      },
      { rootMargin: "-42% 0px -42% 0px" },
    );
    cards.current.forEach((c) => c && io.observe(c));
    return () => io.disconnect();
  }, []);

  return (
    <section id="besoin" aria-labelledby="besoin-title" className="paper relative isolate">
      <Filigrane word={needs.filigrane} className="left-1/2 top-[0.02em] -translate-x-1/2" />
      <div className="gutter mx-auto max-w-page pb-20 pt-16 lg:pb-28 lg:pt-20">
        <div className="text-center">
          {/* the title alone: « BESOIN » is already written large behind it (the small label above was dropped, 7 October 2026) */}
          <h2 id="besoin-title" data-reveal="words" className="h2 balance mx-auto max-w-[18ch] text-ink">
            <Words>{needs.title}</Words>
          </h2>
        </div>

        {/* phones and tablets: an index, 01 to 04, the verb large, its line below, an arrow; computers: four doors and a sliding light */}
        <div className="relative mt-8 border-t border-hair sm:grid sm:grid-cols-2 sm:gap-x-10 lg:mt-14 lg:grid-cols-4 lg:gap-4 lg:border-t-0">
          {/* the light that slides from door to door (computers) */}
          <div
            aria-hidden
            className={`absolute inset-y-0 left-0 z-0 hidden rounded-2xl transition-transform duration-700 lg:block ${lit}`}
            style={{
              width: "calc((100% - 48px) / 4)",
              transform: `translateX(calc(${active} * (100% + 16px)))`,
              transitionTimingFunction: "cubic-bezier(.16,1,.3,1)",
            }}
          />

          {needs.doors.map((d, i) => {
            const on = active === i;
            const Icon = icons[i];
            return (
              <Anchor
                key={d.id}
                to={d.target}
                ref={(el: HTMLAnchorElement | null) => {
                  cards.current[i] = el;
                }}
                data-i={i}
                data-reveal="flip"
                style={{ ["--d" as string]: `${i * 0.1}s` } as CSSProperties}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className={`group relative z-[1] flex items-center gap-4 border-b border-hair py-5 text-ink transition-colors duration-500 lg:min-h-[220px] lg:flex-col lg:items-stretch lg:gap-0 lg:rounded-2xl lg:border-b-0 lg:p-6 ${on ? "lg:text-white" : ""}`}
              >
                {/* the door at rest (computers: the sliding light shows through when it is lit) */}
                <span
                  aria-hidden
                  className={`absolute inset-0 -z-[1] hidden rounded-2xl border border-hair bg-white transition-opacity duration-500 lg:block ${on ? "opacity-0" : "opacity-100"}`}
                />

                {/* the number of the index (phones, tablets) */}
                <span
                  aria-hidden
                  className={`w-7 shrink-0 self-start pt-[5px] text-[13px] font-semibold tabular-nums transition-colors duration-500 lg:hidden ${on ? "text-electric" : "text-mute"}`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* the door's icon and arrow (computers) */}
                <span className="hidden shrink-0 items-start justify-between lg:flex lg:w-full">
                  <span
                    className={`grid h-11 w-11 place-items-center rounded-full transition-colors duration-500 ${on ? "bg-white/15 text-white" : "bg-frost text-electric"}`}
                  >
                    <Icon className="h-[22px] w-[22px]" />
                  </span>
                  <span
                    className={`grid h-9 w-9 place-items-center rounded-full border transition-all duration-500 group-hover:rotate-45 ${on ? "border-white bg-white text-electric" : "border-hair text-ink"}`}
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </span>

                <span className="min-w-0 flex-1 lg:mt-auto lg:flex-none lg:pt-10">
                  <span className="block text-[18px] font-semibold tracking-[0.05em] sm:text-[19px] lg:text-[14px] lg:font-bold lg:tracking-[0.06em]">
                    {d.name}
                  </span>
                  <span
                    className={`pretty mt-1 block text-[14.5px] font-medium leading-relaxed transition-colors duration-500 lg:mt-2.5 ${on ? "text-body lg:text-white/80" : "text-body"}`}
                  >
                    {d.text}
                  </span>
                </span>

                {/* the arrow at the end of the line (phones, tablets) */}
                <span
                  aria-hidden
                  className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-all duration-500 lg:hidden ${on ? "border-electric bg-electric text-white" : "border-hair text-ink"}`}
                >
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </Anchor>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center lg:mt-12">
          <Anchor to="prestations" className={btn("ghost")}>
            <BtnInner>{needs.cta}</BtnInner>
          </Anchor>
        </div>
      </div>
    </section>
  );
}
