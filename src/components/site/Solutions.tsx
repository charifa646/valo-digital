"use client";

import type { CSSProperties } from "react";
import { solutions } from "@/lib/content";
import { hello, wa } from "@/lib/links";
import { useSheet } from "./Sheet";
import { BtnInner, btn } from "@/components/ui/Action";
import { ArrowUpRight } from "@/components/ui/Icons";
import { GrowthPath, ScanRadar, Timeline } from "@/components/visuals/Visuals";

const visuals: Record<string, (p: { dark?: boolean }) => JSX.Element> = {
  diagnostic: ScanRadar,
  accompagnement: GrowthPath,
  "content-video": Timeline,
};

export function Solutions() {
  const { open } = useSheet();
  return (
    <section id="solutions" aria-labelledby="solutions-title" className="relative">
      <div className="gutter mx-auto max-w-page py-24 lg:py-32">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="label flex items-center gap-2.5 text-electric">
              <span className="relative flex h-2.5 w-2.5">
                <span data-anim className="absolute inset-0 rounded-full bg-electric/60" style={{ animation: "ping-ring 2s ease-out infinite" }} />
                <span className="relative h-2.5 w-2.5 rounded-full bg-electric" />
              </span>
              {solutions.label}
            </p>
            <h2 id="solutions-title" data-reveal className="h2 balance mt-5 max-w-[16ch] text-ink">
              {solutions.title}
            </h2>
          </div>
          <a href={wa(hello)} target="_blank" rel="noopener noreferrer" className={btn("electric", "self-start lg:mb-2 lg:self-auto")}>
            <BtnInner>{solutions.cta}</BtnInner>
          </a>
        </div>

        <div className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-3">
          {solutions.items.map((s, i) => {
            const hot = i === 1;
            const Visual = visuals[s.id];
            return (
              <article
                key={s.id}
                id={s.id}
                data-pulse
                data-reveal
                style={{ ["--d" as string]: `${i * 0.1}s` } as CSSProperties}
                className={`play-when-in group relative flex flex-col overflow-hidden rounded-[32px] p-2.5 transition-transform duration-500 hover:-translate-y-1 ${
                  hot ? "bg-[linear-gradient(165deg,#3551ff_0%,#0714d8_45%,#040b52_110%)] text-white shadow-glow" : "bg-white text-ink shadow-card"
                }`}
              >
                <div className="flex items-start justify-between gap-4 px-4 pt-4 sm:px-5 sm:pt-5">
                  <h3 className="text-[18px] font-extrabold leading-snug tracking-[-0.01em] sm:text-[19px]">
                    <button
                      type="button"
                      onClick={() => open(s.sheet)}
                      aria-haspopup="dialog"
                      className="text-left after:absolute after:inset-0 after:rounded-[32px]"
                    >
                      {s.name}
                    </button>
                  </h3>
                  <span
                    aria-hidden
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-full transition duration-500 group-hover:rotate-45 ${hot ? "bg-white text-electric" : "bg-frost text-electric group-hover:bg-electric group-hover:text-white"}`}
                  >
                    <ArrowUpRight className="h-[18px] w-[18px]" />
                  </span>
                </div>
                <p className={`pretty px-4 pt-3 text-[15px] font-medium leading-relaxed sm:px-5 ${hot ? "text-white/75" : "text-body"}`}>{s.text}</p>
                <div className={`relative mt-6 min-h-[200px] flex-1 overflow-hidden rounded-[24px] sm:min-h-[220px] ${hot ? "bg-white/[0.07]" : "bg-ice"}`}>
                  <Visual dark={hot} />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
