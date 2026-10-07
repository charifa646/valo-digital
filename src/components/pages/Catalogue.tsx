"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { demande, formations } from "@/lib/content";
import { useSheet } from "@/components/site/Sheet";
import { formationPhotos } from "@/components/site/Formations";
import { BtnInner, btn } from "@/components/ui/Action";
import { WaveSpace } from "@/components/ui/Wave";
import { Words } from "@/components/ui/Words";

/**
 * The page of all the trainings (Charifa, 7 October 2026: the homepage shows four, « Voir toutes les formations »
 * leads here). Two by two on computers, each with its photo, its format, its main modules and its price from the
 * catalogue, and the button that opens the sign-up form with it chosen. The menu leads to each one (#formation-…).
 */
export function Catalogue() {
  const { open } = useSheet();
  const c = formations.columns;
  return (
    <section id="catalogue" aria-labelledby="catalogue-title" className="paper relative">
      <div className="gutter mx-auto max-w-page pb-20 pt-10 lg:pb-28 lg:pt-14">
        <div className="max-w-[40rem]">
          <h2 id="catalogue-title" data-reveal="words" className="h2 balance text-ink">
            {formations.title.map((w, i) => (
              <span key={w}>
                <Words from={i} className={i === 2 ? "text-electric" : ""}>
                  {w}
                </Words>
                {i < formations.title.length - 1 ? " " : ""}
              </span>
            ))}
          </h2>
          <p
            data-reveal
            className="pretty mt-4 text-[16.5px] font-medium leading-relaxed text-body lg:text-[17.5px]"
            style={{ ["--d" as string]: "0.3s" } as CSSProperties}
          >
            {formations.lead}
          </p>
        </div>

        <ul className="mt-10 grid gap-4 lg:mt-14 lg:grid-cols-2 lg:gap-5">
          {formations.items.map((f, i) => (
            <li
              key={f.id}
              id={`formation-${f.id}`}
              data-pulse
              data-reveal="wipe"
              style={{ ["--d" as string]: `${(i % 2) * 0.12}s` } as CSSProperties}
              className="flex flex-col overflow-hidden rounded-2xl border border-hair bg-white sm:flex-row"
            >
              <div className="relative aspect-[16/10] shrink-0 overflow-hidden bg-soft sm:aspect-auto sm:w-[38%]">
                <Image
                  src={`/images/formations/${formationPhotos[f.id] ?? f.id}.webp`}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 230px, (min-width: 640px) 38vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex min-w-0 flex-1 flex-col p-6 sm:p-7">
                <h3 className="text-[19px] font-bold leading-snug tracking-[-0.02em] text-ink sm:text-[20px]">{f.name}</h3>
                {f.tag ? (
                  <span className="mt-2.5 inline-flex self-start rounded-full bg-sun px-2.5 py-1 text-[12px] font-bold leading-none text-navy">{f.format}</span>
                ) : (
                  <span className="mt-1.5 text-[13.5px] font-semibold text-electric">{f.format}</span>
                )}
                <p className="mt-4 text-[12.5px] font-semibold text-mute">{c.modules}</p>
                <p className="pretty mt-1 text-[14.5px] font-medium leading-relaxed text-body">{f.modules}</p>
                <div className="mt-auto flex flex-wrap items-end justify-between gap-x-5 gap-y-4 pt-6">
                  <p className="text-[17px] font-bold leading-tight tracking-[-0.01em] text-ink">{f.price}</p>
                  <button
                    type="button"
                    onClick={() => open("demande-formation", f.id)}
                    aria-haspopup="dialog"
                    className={btn("ghost", "min-h-[44px] pl-4 text-[13.5px] [&_.dot]:h-8 [&_.dot]:w-8 [&_.dot_svg]:h-4 [&_.dot_svg]:w-4")}
                  >
                    <BtnInner>{demande.enroll}</BtnInner>
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <WaveSpace />
    </section>
  );
}
