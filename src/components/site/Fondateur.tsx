import Image from "next/image";
import type { CSSProperties } from "react";
import { fondateur } from "@/lib/content";
import { Monogram } from "@/components/brand/Logo";
import { Cap } from "@/components/ui/Icons";
import { Wave } from "@/components/ui/Wave";
import { Words } from "@/components/ui/Words";

/** Valentin, standing out of a light card, his name and his two titles beside him. */
export function Fondateur() {
  return (
    <section id="fondateur" aria-labelledby="fondateur-title" className="relative isolate bg-white">
      <div aria-hidden className="light-lines" />
      <div className="gutter mx-auto grid max-w-page items-center gap-14 pb-24 pt-20 lg:grid-cols-[1fr_1.08fr] lg:gap-20 lg:pb-32 lg:pt-28">
        <figure data-reveal="tilt" className="relative mx-auto w-full max-w-[440px] pt-[84px] sm:pt-[100px]">
          {/* the card, and Valentin coming out of its top edge */}
          <div className="relative aspect-[1/1.06] w-full">
            <div className="absolute inset-0 overflow-hidden rounded-2xl bg-[linear-gradient(170deg,#EEF2FF_0%,#D8E0FF_62%,#C3CFFF_100%)]">
              <div className="absolute -bottom-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-white/60 blur-3xl" />
            </div>
            <div className="absolute inset-x-0 bottom-0 top-[-84px] [clip-path:inset(-100%_0_0_0_round_16px)] sm:top-[-100px]">
              <Image
                src="/images/v3/valentin-debout.webp"
                alt={`${fondateur.name}, ${fondateur.roles[1]}`}
                width={774}
                height={1445}
                sizes="(min-width: 1024px) 360px, 76vw"
                className="absolute bottom-[-16%] left-1/2 h-auto w-[76%] -translate-x-1/2"
              />
            </div>
          </div>
        </figure>

        <div>
          <p data-reveal="rule" className="tag">
            {fondateur.label}
          </p>
          <h2 id="fondateur-title" data-reveal="words" className="h2 balance mt-5 text-ink">
            <Words>{fondateur.title}</Words>
          </h2>
          <p
            data-reveal="blur"
            style={{ ["--d" as string]: "0.2s" } as CSSProperties}
            className="mt-6 text-[clamp(1.35rem,2.4vw,1.75rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-electric"
          >
            {fondateur.name}
          </p>
          <ul data-reveal="slide-left" style={{ ["--d" as string]: "0.3s" } as CSSProperties} className="mt-6 grid gap-3">
            <li className="flex items-center gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-frost text-electric">
                <Cap className="h-[18px] w-[18px]" />
              </span>
              <span className="text-[15.5px] font-semibold text-ink">{fondateur.roles[0]}</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-electric text-white">
                <Monogram className="h-3 w-auto" />
              </span>
              <span className="text-[15.5px] font-semibold text-ink">{fondateur.roles[1]}</span>
            </li>
          </ul>
          <p
            data-reveal
            style={{ ["--d" as string]: "0.4s" } as CSSProperties}
            className="pretty mt-7 max-w-[36rem] border-t border-hair pt-7 text-[16.5px] font-medium leading-[1.75] text-body sm:text-[17.5px]"
          >
            {fondateur.text}
          </p>
        </div>
      </div>
      <Wave shape="swell" flip back="text-electric/25" front="text-electric" className="-mb-px" />
    </section>
  );
}
