"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { needs, type DetailId } from "@/lib/content";
import { Anchor } from "./Scroll";
import { useSheet } from "./Sheet";
import { Door, panels } from "./Door";
import { Trame } from "./pied/Trame";
import { Filigrane } from "@/components/ui/Filigrane";
import { Words } from "@/components/ui/Words";
import { BtnInner, btn } from "@/components/ui/Action";
import { ArrowUpRight } from "@/components/ui/Icons";

/**
 * « De quoi avez-vous besoin aujourd'hui ? » with the effect of the dithered footer, proposed to Charifa on 12 October
 * 2026 (« je me demande si on va pas leur donner cet effet »), at the hidden address /apercu/besoin: four white cards,
 * each with a short band of blue dots at its foot, thickening towards the bottom, the number of the door left clear in
 * them. The door that is lit has its dots at full strength and, under a mouse, a light that follows the pointer; the
 * others stay at half. On computers the door under the mouse is the lit one (the sliding blue light is gone, the dots
 * take its place); on phones and tablets it is the one in the middle of the screen, as in the index it replaces.
 */
export function NeedsTrame() {
  const [active, setActive] = useState(0);
  const cards = useRef<(HTMLElement | null)[]>([]);
  const { open } = useSheet();

  // on phones and tablets the door in the middle of the screen is the lit one
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
    <section id="besoin" aria-labelledby="besoin-title" className="paper grain relative isolate">
      <Filigrane word={needs.filigrane} className="left-1/2 top-[0.02em] -translate-x-1/2" />
      <div className="gutter mx-auto max-w-page pb-20 pt-16 lg:pb-28 lg:pt-20">
        <div className="text-center">
          <h2 id="besoin-title" data-reveal="words" className="h2 balance mx-auto max-w-[18ch] text-ink">
            <Words>{needs.title}</Words>
          </h2>
        </div>

        <div className="relative mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:mt-14 lg:grid-cols-4">
          {needs.doors.map((d, i) => {
            const on = active === i;
            return (
              <Door
                key={d.id}
                to={d.target}
                onOpen={panels.has(d.target) ? () => open(d.target as DetailId) : undefined}
                set={(el) => {
                  cards.current[i] = el;
                }}
                data-i={i}
                data-on={on ? "" : undefined}
                data-reveal="flip"
                style={{ ["--d" as string]: `${i * 0.1}s` } as CSSProperties}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className={`group relative z-[1] flex flex-col overflow-hidden rounded-2xl border bg-white text-ink shadow-[0_1px_0_rgba(255,255,255,.9)_inset] transition-[border-color,box-shadow] duration-500 ${on ? "border-electric/35 shadow-[0_26px_44px_-30px_rgba(15, 111, 208,.5)]" : "border-hair"}`}
              >
                <span className="flex flex-1 flex-col p-5 pb-4 lg:p-6 lg:pb-5">
                  <span className="flex items-start justify-between gap-3">
                    <span className="block pt-1.5 text-[15px] font-bold tracking-[0.06em]">{d.name}</span>
                    <span
                      aria-hidden
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-500 group-hover:rotate-45 ${on ? "border-electric bg-electric text-white" : "border-hair text-ink"}`}
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </span>
                  <span className="pretty mt-3 block max-w-[28ch] text-[14.5px] font-medium leading-relaxed text-body">{d.text}</span>
                </span>

                {/* the dots, the number of the door left clear in them */}
                <Trame nom={String(i + 1).padStart(2, "0")} className="df-carte" />
              </Door>
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
