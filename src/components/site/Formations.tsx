"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { formations } from "@/lib/content";
import { useSheet } from "./Sheet";
import { Words } from "@/components/ui/Words";
import { BtnInner, btn } from "@/components/ui/Action";
import { ArrowUpRight } from "@/components/ui/Icons";

/**
 * « Apprenez. Appliquez. Progressez. »: the catalogue, one card per training,
 * each with a real photo, its format (from the catalogue) and its price. A card
 * opens the panel on that training.
 */
/** One photo per training (file names change when a photo is replaced, so no cache can show the old one). */
const photos: Record<string, string> = {
  ads: "ads",
  vente: "boutique",
  marketing: "marketing",
  ia: "ia",
  contenu: "contenu",
  cm: "cm",
  cohorte: "cohorte",
  prive: "prive",
};

export function Formations() {
  const { open } = useSheet();

  return (
    <section id="formations" aria-labelledby="formations-title" className="relative bg-white">
      <div className="gutter mx-auto max-w-page py-24 lg:py-32">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[40rem]">
            <p data-reveal="rule" className="tag">
              {formations.label}
            </p>
            <h2 id="formations-title" data-reveal="words" className="h2 balance mt-5 text-ink">
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
          <button type="button" onClick={() => open("formations")} aria-haspopup="dialog" className={btn("ghost", "self-start lg:self-auto")}>
            <BtnInner>{formations.cta}</BtnInner>
          </button>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-14 lg:grid-cols-4 lg:gap-5">
          {formations.items.map((f, i) => (
            <li key={f.id} data-reveal="photo" style={{ ["--d" as string]: `${(i % 4) * 0.09}s` } as CSSProperties}>
              <button
                type="button"
                onClick={() => open("formations", f.id)}
                aria-haspopup="dialog"
                className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-hair bg-white text-left transition duration-300 hover:-translate-y-1 hover:border-electric/25 hover:shadow-panel"
              >
                <span className="relative block aspect-[4/3] overflow-hidden bg-soft">
                  <Image
                    src={`/images/formations/${photos[f.id] ?? f.id}.webp`}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 290px, 46vw"
                    className="object-cover transition duration-700 [transition-timing-function:var(--ease)] group-hover:scale-[1.04]"
                  />
                </span>
                <span className="flex flex-1 flex-col p-3.5 sm:p-5">
                  <span className="text-[14.5px] font-bold leading-snug tracking-[-0.01em] text-ink sm:text-[16.5px]">{f.name}</span>
                  {f.tag ? (
                    <span className="mt-2 inline-flex self-start rounded-full bg-sun px-2.5 py-1 text-[11.5px] font-bold leading-none text-navy">
                      {f.format}
                    </span>
                  ) : (
                    <span className="mt-1.5 text-[12.5px] font-medium text-mute sm:text-[13.5px]">{f.format}</span>
                  )}
                  <span className="mt-auto flex items-end justify-between gap-2 pt-4 sm:pt-5">
                    <span className="text-[13.5px] font-bold leading-tight text-ink sm:text-[15px]">{f.price}</span>
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-hair text-ink transition duration-300 group-hover:border-electric group-hover:bg-electric group-hover:text-white">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
