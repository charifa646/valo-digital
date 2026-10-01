"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { needs } from "@/lib/content";
import { Anchor } from "./Scroll";
import { BtnInner, btn } from "@/components/ui/Action";
import { ArrowUpRight, Cap, Handoff, Rocket, Scan } from "@/components/ui/Icons";

const icons = [Cap, Scan, Handoff, Rocket];
const lit = "bg-[linear-gradient(160deg,#3551FF_0%,#0714D8_52%,#0A12A8_100%)] shadow-[0_22px_40px_-26px_rgba(7,20,216,.45)]";

/** « De quoi avez-vous besoin aujourd'hui ? »: four doors, one lit at a time, each opening onto its offer. */
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
    <section id="besoin" aria-labelledby="besoin-title" className="relative">
      <div className="gutter mx-auto max-w-page pb-20 pt-16 lg:pb-28 lg:pt-20">
        <div className="text-center">
          <p className="tag">{needs.label}</p>
          <h2 id="besoin-title" data-reveal className="h2 balance mx-auto mt-5 max-w-[18ch] text-ink">
            {needs.title}
          </h2>
        </div>

        <div className="relative mt-10 grid gap-3 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-4">
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
                data-reveal
                style={{ ["--d" as string]: `${i * 0.06}s` } as CSSProperties}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className={`group relative z-[1] flex items-start gap-4 rounded-2xl p-5 transition-colors duration-500 sm:min-h-[220px] sm:flex-col sm:gap-0 lg:p-6 ${on ? "text-white" : "text-ink"}`}
              >
                {/* the door at rest, and lit (phones, tablets: computers have the sliding light) */}
                <span
                  aria-hidden
                  className={`absolute inset-0 -z-[1] rounded-2xl border border-hair bg-white transition-opacity duration-500 ${on ? "opacity-0" : "opacity-100"}`}
                />
                <span
                  aria-hidden
                  className={`absolute inset-0 -z-[2] rounded-2xl transition-opacity duration-500 lg:hidden ${lit} ${on ? "opacity-100" : "opacity-0"}`}
                />

                <span className="flex shrink-0 items-start justify-between sm:w-full">
                  <span
                    className={`grid h-11 w-11 place-items-center rounded-full transition-colors duration-500 ${on ? "bg-white/15 text-white" : "bg-frost text-electric"}`}
                  >
                    <Icon className="h-[22px] w-[22px]" />
                  </span>
                  <span
                    className={`hidden h-9 w-9 place-items-center rounded-full border transition-all duration-500 group-hover:rotate-45 sm:grid ${on ? "border-white bg-white text-electric" : "border-hair text-ink"}`}
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </span>
                <span className="min-w-0 sm:mt-auto sm:pt-10">
                  <span className="block text-[14px] font-bold tracking-[0.06em]">{d.name}</span>
                  <span
                    className={`mt-1.5 block text-[14.5px] font-medium leading-relaxed transition-colors duration-500 sm:mt-2.5 ${on ? "text-white/80" : "text-body"}`}
                  >
                    {d.text}
                  </span>
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
