"use client";

import type { CSSProperties } from "react";
import { prestations, type Offer } from "@/lib/content";
import { ask, wa } from "@/lib/links";
import { useSheet } from "./Sheet";
import { ArrowRight } from "@/components/ui/Icons";
import { Price } from "@/components/ui/Price";
import { Wave } from "@/components/ui/Wave";
import { Words } from "@/components/ui/Words";
import { Calendrier } from "@/components/previews/Calendrier";
import { Campagnes } from "@/components/previews/Campagnes";
import { Montage } from "@/components/previews/Montage";
import { Pilotage } from "@/components/previews/Pilotage";

const previews: Record<string, () => JSX.Element> = { reseaux: Calendrier, publicite: Campagnes, video: Montage, direction: Pilotage };

/** Two rows, the wide card changing sides. */
const spans = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];

function OfferCard({ o, i }: { o: Offer; i: number }) {
  const { open } = useSheet();
  const Preview = previews[o.id];
  const lead = o.id === "direction"; // the complete offer, in blue
  const link = `group/link inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-[13.5px] font-semibold transition duration-300 ${
    lead ? "border-white/30 text-white hover:bg-white hover:text-electric" : "border-hair bg-white text-ink hover:border-electric hover:text-electric"
  }`;
  const label = (
    <>
      {o.link}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-0.5" />
    </>
  );

  return (
    <article
      data-reveal="wipe"
      style={{ ["--d" as string]: `${(i % 2) * 0.14}s` } as CSSProperties}
      className={`flex flex-col overflow-hidden rounded-2xl ${spans[i]} ${
        lead ? "bg-[linear-gradient(160deg,#3551FF_0%,#0714D8_46%,#0A12A8_100%)] text-white" : "border border-hair bg-white text-ink"
      }`}
    >
      <div
        aria-hidden
        className={`@container relative h-[262px] overflow-hidden px-4 pt-5 sm:px-6 sm:pt-6 ${lead ? "" : "m-2 mb-0 rounded-[10px] bg-[linear-gradient(180deg,#EDF1FF_0%,#F6F8FF_100%)]"}`}
      >
        <Preview />
      </div>
      <div className="flex flex-1 flex-col px-6 pb-6 pt-5 sm:px-7 sm:pb-7">
        <h3 className="text-[19px] font-bold leading-snug tracking-[-0.02em] sm:text-[21px]">{o.name}</h3>
        <p className={`pretty mt-2 max-w-[34rem] text-[14.5px] font-medium leading-relaxed ${lead ? "text-white/75" : "text-body"}`}>{o.text}</p>
        <div className="mt-auto flex flex-wrap items-end justify-between gap-x-6 gap-y-4 pt-6">
          <Price price={o.price} note={o.note} light={lead} />
          {o.sheet ? (
            <button type="button" onClick={() => open(o.sheet!)} className={link} aria-haspopup="dialog">
              {label}
            </button>
          ) : (
            <a href={wa(ask(o.name, o.price))} target="_blank" rel="noopener noreferrer" className={link}>
              {label}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export function Prestations() {
  return (
    <section id="prestations" aria-labelledby="prestations-title" className="paper halo-tl relative">
      <div className="gutter mx-auto max-w-page pb-14 pt-8 lg:pb-20 lg:pt-10">
        <div className="max-w-[40rem]">
          <p data-reveal="rule" className="tag">
            {prestations.label}
          </p>
          <h2 id="prestations-title" data-reveal="words" className="h2 balance mt-5 text-ink">
            <Words>{prestations.title}</Words>
          </h2>
          <p
            data-reveal
            className="pretty mt-4 text-[16.5px] font-medium leading-relaxed text-body lg:text-[17.5px]"
            style={{ ["--d" as string]: "0.3s" } as CSSProperties}
          >
            {prestations.lead}
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:mt-14 lg:grid-cols-12 lg:gap-5">
          {prestations.offers.map((o, i) => (
            <OfferCard key={o.id} o={o} i={i} />
          ))}
        </div>
      </div>
      <Wave shape="swell" back="text-frost" front="text-white" className="-mb-px" />
    </section>
  );
}
