import Image from "next/image";
import type { CSSProperties } from "react";
import { fondateur } from "@/lib/content";
import { Monogram } from "@/components/brand/Logo";
import { Cap } from "@/components/ui/Icons";
import { Edge } from "@/components/ui/Edge";

/** Valentin stands out of his card; his two titles float beside him. */
export function Fondateur() {
  return (
    <section id="fondateur" aria-labelledby="fondateur-title" className="relative">
      <div className="gutter mx-auto grid max-w-page items-center gap-16 py-24 lg:grid-cols-[1fr_1.05fr] lg:gap-20 lg:py-36">
        <figure data-reveal="scale" className="relative mx-auto w-full max-w-[460px] pt-[92px] sm:pt-[110px]">
          {/* the card, and Valentin coming out of its top edge */}
          <div className="relative aspect-[1/1.08] w-full">
            <div className="absolute inset-0 overflow-hidden rounded-2xl bg-[linear-gradient(165deg,#3551ff_0%,#0714d8_48%,#040b52_115%)] shadow-lift">
              <div className="curtain opacity-70" />
              <div className="absolute -bottom-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#8fa3ff]/40 blur-3xl" />
            </div>
            <div className="absolute inset-x-0 bottom-0 top-[-92px] [clip-path:inset(-100%_0_0_0_round_16px)] sm:top-[-110px]">
              <Image
                src="/images/v3/valentin-debout.webp"
                alt={`${fondateur.name}, ${fondateur.roles[1]}`}
                width={774}
                height={1445}
                sizes="(min-width: 1024px) 380px, 80vw"
                className="absolute bottom-[-16%] left-1/2 h-auto w-[78%] -translate-x-1/2"
              />
            </div>

            <span className="absolute -left-2 top-7 rotate-[-6deg] rounded-full bg-sun px-4 py-2 text-[11.5px] font-extrabold uppercase tracking-[0.16em] text-navy shadow-[0_14px_30px_-12px_rgba(7,31,120,.6)] sm:-left-5">
              {fondateur.label}
            </span>
          </div>

          <figcaption className="contents">
            <span
              className="float glass absolute -left-3 bottom-[34%] flex max-w-[250px] items-center gap-3 rounded-[10px] p-2.5 pr-4 text-left [--r:-3deg] [--t:8s] sm:-left-10"
              style={{ ["--fd" as string]: "-2s" } as CSSProperties}
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[8px] bg-electric text-white">
                <Cap className="h-5 w-5" />
              </span>
              <span className="text-[13px] font-bold leading-snug text-ink">{fondateur.roles[0]}</span>
            </span>
            <span className="float glass absolute -right-3 bottom-[9%] flex items-center gap-3 rounded-[10px] p-2.5 pr-4 text-left [--r:3deg] [--t:9s] sm:-right-8">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[8px] bg-night text-white">
                <Monogram className="h-3.5 w-auto" />
              </span>
              <span className="text-[13px] font-bold leading-snug text-ink">{fondateur.roles[1]}</span>
            </span>
          </figcaption>
        </figure>

        <div>
          <h2 id="fondateur-title" data-reveal className="h2 balance text-ink">
            {fondateur.title}
          </h2>
          <p data-reveal className="mt-8 text-[clamp(1.5rem,3vw,2.1rem)] font-extrabold leading-[1.15] tracking-[-0.03em] text-electric">
            {fondateur.name}
          </p>
          <div data-reveal className="mt-8 flex gap-5">
            <span aria-hidden className="mt-2 h-auto w-[3px] shrink-0 rounded-full bg-gradient-to-b from-sun to-electric" />
            <p className="pretty text-[17px] font-medium leading-[1.75] text-body sm:text-[18.5px]">{fondateur.text}</p>
          </div>
        </div>
      </div>
      <Edge variant="steps" className="-mb-px text-electric" />
    </section>
  );
}
