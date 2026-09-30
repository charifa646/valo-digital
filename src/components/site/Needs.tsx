"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { needs } from "@/lib/content";
import { Anchor } from "./Scroll";
import { BtnInner, btn } from "@/components/ui/Action";
import { ArrowUpRight, Cap, Handoff, Rocket, Scan } from "@/components/ui/Icons";

const icons = [Cap, Scan, Handoff, Rocket];

/** « De quoi avez-vous besoin aujourd'hui ? »: four doors, one lit at a time, each opening onto its offer. */
export function Needs() {
  const [active, setActive] = useState(0);
  const cards = useRef<(HTMLAnchorElement | null)[]>([]);

  // on phones the door in the middle of the screen lights up
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
      <div className="gutter mx-auto max-w-page pb-24 pt-20 lg:pb-32 lg:pt-24">
        <p className="label relative z-10 flex items-center justify-center text-center text-electric">
          <span className="mr-3 inline-block h-[3px] w-6 rounded-full bg-sun" aria-hidden />
          {needs.label}
        </p>
        <h2 id="besoin-title" data-reveal className="h2 balance mx-auto mt-5 max-w-[15ch] text-center text-ink sm:mt-8">
          {needs.title}
        </h2>

        <div className="relative mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-5">
          {/* the light that slides from door to door (computers) */}
          <div
            aria-hidden
            className="absolute inset-y-0 left-0 z-0 hidden overflow-hidden rounded-2xl bg-[linear-gradient(160deg,#3551ff_0%,#0714d8_45%,#040b52_120%)] shadow-glow transition-transform duration-700 lg:block"
            style={{
              width: "calc((100% - 60px) / 4)",
              transform: `translateX(calc(${active} * (100% + 20px)))`,
              transitionTimingFunction: "cubic-bezier(.16,1,.3,1)",
            }}
          >
            <div className="curtain opacity-60" />
          </div>

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
                style={{ ["--d" as string]: `${i * 0.08}s` } as CSSProperties}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className={`group relative z-[1] flex min-h-[200px] flex-col rounded-2xl p-6 transition-colors duration-500 sm:min-h-[250px] lg:min-h-[300px] lg:p-7 ${on ? "text-white" : "text-ink"}`}
              >
                <span
                  aria-hidden
                  className={`absolute inset-0 -z-[1] rounded-2xl bg-white shadow-card transition-opacity duration-500 ${on ? "opacity-0" : "opacity-100"}`}
                />
                <span
                  aria-hidden
                  className={`absolute inset-0 -z-[2] overflow-hidden rounded-2xl bg-[linear-gradient(160deg,#3551ff_0%,#0714d8_45%,#040b52_120%)] shadow-glow transition-opacity duration-500 lg:hidden ${on ? "opacity-100" : "opacity-0"}`}
                >
                  <span className="curtain opacity-60" />
                </span>

                <span className="flex items-start justify-between">
                  <span
                    className={`grid h-12 w-12 place-items-center rounded-[10px] transition-colors duration-500 ${on ? "bg-white/15 text-white" : "bg-frost text-electric"}`}
                  >
                    <Icon className="h-6 w-6" />
                  </span>
                  <span
                    className={`grid h-10 w-10 place-items-center rounded-full border transition-all duration-500 group-hover:rotate-45 ${on ? "border-white/30 bg-white text-electric" : "border-line text-ink"}`}
                  >
                    <ArrowUpRight className="h-[18px] w-[18px]" />
                  </span>
                </span>
                <span className="mt-auto pt-8">
                  <span className="block text-[21px] font-extrabold tracking-[-0.02em] lg:text-[22px]">{d.name}</span>
                  <span className={`mt-3 block text-[15px] font-medium leading-relaxed transition-colors duration-500 ${on ? "text-white/80" : "text-body"}`}>
                    {d.text}
                  </span>
                </span>
              </Anchor>
            );
          })}
        </div>

        <div className="mt-12 flex justify-center lg:mt-14">
          <Anchor to="prestations" className={btn("electric")}>
            <BtnInner>{needs.cta}</BtnInner>
          </Anchor>
        </div>
      </div>
    </section>
  );
}
