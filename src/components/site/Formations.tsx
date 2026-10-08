"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { formations, type Formation } from "@/lib/content";
import { useSheet } from "./Sheet";
import { Words } from "@/components/ui/Words";
import { BtnInner, btn } from "@/components/ui/Action";
import { ArrowUpRight } from "@/components/ui/Icons";
import { Suite } from "@/components/ui/Suite";
import { GrandTitre } from "@/components/ui/GrandTitre";
import { waveTop } from "@/components/ui/Wave";

/** One photo per training (file names change when a photo is replaced, so no cache can show the old one). */
export const formationPhotos: Record<string, string> = {
  ads: "ads",
  vente: "boutique",
  marketing: "marketing",
  ia: "ia",
  contenu: "contenu",
  cm: "cm",
  cohorte: "cohorte",
  prive: "prive",
};

const card =
  "group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-hair bg-white text-left transition duration-300 hover:-translate-y-1 hover:border-electric/25 hover:shadow-panel";

/** A training's card: its photo, its name, its format and its price. It opens the catalogue on it; `still`: under the glimpse, a picture only. */
function Card({ f, still = false }: { f: Formation; still?: boolean }) {
  const { open } = useSheet();
  const inner = (
    <>
      <span className="relative block aspect-[4/3] overflow-hidden bg-soft">
        <Image
          src={`/images/formations/${formationPhotos[f.id] ?? f.id}.webp`}
          alt=""
          fill
          sizes="(min-width: 1024px) 290px, 46vw"
          className="object-cover transition duration-700 [transition-timing-function:var(--ease)] group-hover:scale-[1.04]"
        />
      </span>
      <span className="flex flex-1 flex-col p-3.5 sm:p-5">
        <span className="text-[14.5px] font-bold leading-snug tracking-[-0.01em] text-ink sm:text-[16.5px]">{f.name}</span>
        {f.tag ? (
          <span className="mt-2 inline-flex self-start rounded-full bg-sun px-2.5 py-1 text-[11.5px] font-bold leading-none text-navy">{f.format}</span>
        ) : (
          <span className="mt-1.5 text-[12.5px] font-medium text-mute sm:text-[13.5px]">{f.format}</span>
        )}
        <span className="mt-auto flex items-end justify-between gap-2 pt-4 sm:pt-5">
          <span className="text-[13.5px] font-bold leading-tight text-ink sm:text-[15px]">{f.price}</span>
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-electric text-white transition duration-300 group-hover:bg-deep">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </span>
      </span>
    </>
  );
  if (still) return <span className={card}>{inner}</span>;
  return (
    <button type="button" onClick={() => open("formations", f.id)} aria-haspopup="dialog" className={card}>
      {inner}
    </button>
  );
}

/**
 * « Apprenez. Appliquez. Progressez. »: four trainings whole, each with a real photo, its format and its price, then
 * the others through a blur that fades out, with the button to the page of all the trainings (Charifa, 7 October
 * 2026). A card opens the catalogue on that training, in the panel.
 */
export function Formations() {
  const items = formations.items;
  return (
    <section id="formations" aria-labelledby="formations-title" className={`paper halo-tr relative bg-white ${waveTop("swell", false, true)}`}>
      <div className="gutter mx-auto max-w-page pb-20 pt-24 lg:pb-28 lg:pt-32">
        <GrandTitre id="formations-title">{formations.grand}</GrandTitre>
        <div className="mt-8 max-w-[40rem] lg:mt-12">
          <h3 data-reveal="words" className="h2 balance text-ink">
            {formations.title.map((w, i) => (
              <span key={w}>
                <Words from={i} className={i === 2 ? "text-electric" : ""}>
                  {w}
                </Words>
                {i < formations.title.length - 1 ? " " : ""}
              </span>
            ))}
          </h3>
          <p
            data-reveal
            className="pretty mt-4 text-[16.5px] font-medium leading-relaxed text-body lg:text-[17.5px]"
            style={{ ["--d" as string]: "0.3s" } as CSSProperties}
          >
            {formations.lead}
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-14 lg:grid-cols-4 lg:gap-5">
          {items.slice(0, 4).map((f, i) => (
            <li key={f.id} data-reveal="photo" style={{ ["--d" as string]: `${i * 0.09}s` } as CSSProperties}>
              <Card f={f} />
            </li>
          ))}
        </ul>

        <Suite
          className="mt-3 h-[190px] sm:mt-4 sm:h-[230px] lg:mt-5"
          action={
            <Link href="/formations" className={btn("electric")}>
              <BtnInner>{formations.cta}</BtnInner>
            </Link>
          }
        >
          <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
            {items.slice(4).map((f) => (
              <li key={f.id}>
                <Card f={f} still />
              </li>
            ))}
          </ul>
        </Suite>
      </div>
    </section>
  );
}
