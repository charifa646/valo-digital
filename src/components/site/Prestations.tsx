"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { prestations, type Offer } from "@/lib/content";
import { useSheet } from "./Sheet";
import { ArrowRight } from "@/components/ui/Icons";
import { BtnInner, btn } from "@/components/ui/Action";
import { Price } from "@/components/ui/Price";
import { Suite } from "@/components/ui/Suite";
import { WaveSpace } from "@/components/ui/Wave";
import { Words } from "@/components/ui/Words";
import { GrandTitre } from "@/components/ui/GrandTitre";
import { Calendrier } from "@/components/previews/Calendrier";
import { Campagnes } from "@/components/previews/Campagnes";
import { Montage } from "@/components/previews/Montage";
import { Pilotage } from "@/components/previews/Pilotage";

const previews: Record<string, () => JSX.Element> = { reseaux: Calendrier, publicite: Campagnes, video: Montage, direction: Pilotage };

/** Two rows, the wide card changing sides. */
const spans = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];

/** `still`: drawn under the glimpse of the homepage, without its button; `anchor`: on the page of all the services, where the menu leads to each offer. */
function OfferCard({ o, i, still = false, anchor = false }: { o: Offer; i: number; still?: boolean; anchor?: boolean }) {
  const { open } = useSheet();
  const Preview = previews[o.id];
  const lead = o.id === "direction"; // the complete offer, in blue
  const link = `group/link inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-[13.5px] font-semibold transition duration-300 ${
    lead
      ? "border-white bg-white text-electric hover:border-sun hover:bg-sun hover:text-navy"
      : "border-electric/15 bg-frost text-electric hover:border-electric hover:bg-electric hover:text-white"
  }`;
  const label = (
    <>
      {o.link}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-0.5" />
    </>
  );

  return (
    <article
      id={anchor ? o.id : undefined}
      data-pulse={anchor || undefined}
      data-reveal="wipe"
      style={{ ["--d" as string]: `${(i % 2) * 0.14}s` } as CSSProperties}
      className={`flex flex-col overflow-hidden rounded-2xl ${spans[i]} ${
        lead ? "bg-[linear-gradient(160deg,#3551FF_0%,#0714D8_46%,#0A12A8_100%)] text-white" : "border border-hair bg-white text-ink"
      }`}
    >
      <div
        aria-hidden
        className={`@container relative h-[262px] overflow-hidden px-4 pt-5 sm:px-6 sm:pt-6 ${lead ? "" : "m-2 mb-0 rounded-[4px] bg-[linear-gradient(180deg,#EDF1FF_0%,#F6F8FF_100%)]"}`}
      >
        <Preview />
      </div>
      <div className="flex flex-1 flex-col px-6 pb-6 pt-5 sm:px-7 sm:pb-7">
        <h3 className="text-[19px] font-bold leading-snug tracking-[-0.02em] sm:text-[21px]">{o.name}</h3>
        <p className={`pretty mt-2 max-w-[34rem] text-[14.5px] font-medium leading-relaxed ${lead ? "text-white/75" : "text-body"}`}>{o.text}</p>
        <div className="mt-auto flex flex-wrap items-end justify-between gap-x-6 gap-y-4 pt-6">
          <Price price={o.price} note={o.note} light={lead} />
          {still ? (
            <span className={link}>{label}</span>
          ) : o.sheet ? (
            <button type="button" onClick={() => open(o.sheet!)} className={link} aria-haspopup="dialog">
              {label}
            </button>
          ) : (
            <button type="button" onClick={() => open("demande-prestation", "responsable")} className={link} aria-haspopup="dialog">
              {label}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

/**
 * « Vous préférez déléguer ? »: the offers in a bento, each with a small window of its work. On the homepage only the
 * first row is whole; the second shows through a blur that fades out, with the button to the page of all the services
 * (Charifa, 7 October 2026: the homepage says less, and the visitor sees there is more). `full`: that page, every
 * offer whole.
 */
export function Prestations({ full = false }: { full?: boolean }) {
  const offers = prestations.offers;
  return (
    <section id="prestations" aria-labelledby="prestations-title" className={`paper relative ${full ? "" : "halo-tl"}`}>
      <div className="gutter mx-auto max-w-page pb-14 pt-8 lg:pb-20 lg:pt-10">
        {/* on the homepage the part opens on a very large title; the page of all the services has its own */}
        {!full && <GrandTitre id="prestations-title">{prestations.grand}</GrandTitre>}
        <div className={`max-w-[40rem] ${full ? "" : "mt-8 lg:mt-12"}`}>
          {full ? (
            <h2 id="prestations-title" data-reveal="words" className="h2 balance text-ink">
              <Words>{prestations.title}</Words>
            </h2>
          ) : (
            <h3 data-reveal="words" className="h2 balance text-ink">
              <Words>{prestations.title}</Words>
            </h3>
          )}
          <p
            data-reveal
            className="pretty mt-4 text-[16.5px] font-medium leading-relaxed text-body lg:text-[17.5px]"
            style={{ ["--d" as string]: "0.3s" } as CSSProperties}
          >
            {prestations.lead}
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:mt-14 lg:grid-cols-12 lg:gap-5">
          {(full ? offers : offers.slice(0, 2)).map((o, i) => (
            <OfferCard key={o.id} o={o} i={i} anchor={full} />
          ))}
        </div>

        {!full && (
          <Suite
            className="mt-4 h-[210px] sm:h-[250px] lg:mt-5"
            action={
              <Link href="/services" className={btn("electric")}>
                <BtnInner>{prestations.all}</BtnInner>
              </Link>
            }
          >
            <div className="grid gap-4 lg:grid-cols-12 lg:gap-5">
              {offers.slice(2).map((o, i) => (
                <OfferCard key={o.id} o={o} i={i + 2} still />
              ))}
            </div>
          </Suite>
        )}
      </div>
      {!full && <WaveSpace />}
    </section>
  );
}
