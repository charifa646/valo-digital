"use client";

import type { CSSProperties } from "react";
import { prestations, type Offer } from "@/lib/content";
import { ask, wa } from "@/lib/links";
import { useSheet } from "./Sheet";
import { GoInner } from "@/components/ui/Action";
import { AdTarget, PilotBoard, SocialGrid, VideoFour } from "@/components/visuals/Visuals";

const visuals: Record<string, () => JSX.Element> = { reseaux: SocialGrid, publicite: AdTarget, video: VideoFour, direction: PilotBoard };

/** The bento: two wide, two narrow, the premium one in night blue. */
const spans = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];

function OfferCard({ o, i }: { o: Offer; i: number }) {
  const { open } = useSheet();
  const Visual = visuals[o.id];
  const dark = o.id === "direction";
  const link = dark
    ? "text-white [&_.go-ring]:border-white/30 [&_.go-ring]:bg-white [&_.go-ring]:text-electric"
    : "text-ink [&_.go-ring]:border-line group-hover:[&_.go-ring]:border-electric group-hover:[&_.go-ring]:bg-electric group-hover:[&_.go-ring]:text-white";

  return (
    <article
      data-reveal
      style={{ ["--d" as string]: `${(i % 2) * 0.1}s` } as CSSProperties}
      className={`play-when-in group relative flex flex-col overflow-hidden rounded-[32px] transition-transform duration-500 hover:-translate-y-1 ${dark ? "bg-night text-white shadow-lift" : "bg-white text-ink shadow-card"} ${spans[i]}`}
    >
      <div className={`relative h-[230px] sm:h-[250px] lg:h-[270px] ${dark ? "" : "bg-gradient-to-b from-ice to-white"}`}>
        <Visual />
      </div>
      <div className="flex flex-1 flex-col px-6 pb-7 pt-5 sm:px-8 sm:pb-8">
        <h3 className="text-[22px] font-extrabold leading-tight tracking-[-0.025em] sm:text-[25px]">{o.name}</h3>
        <p className={`pretty mt-2.5 max-w-[34rem] text-[15px] font-medium leading-relaxed ${dark ? "text-white/70" : "text-body"}`}>{o.text}</p>
        <div className="mt-auto flex flex-wrap items-end justify-between gap-x-6 gap-y-5 pt-7">
          <p>
            <span className={`block text-[19px] font-extrabold leading-tight tracking-[-0.02em] sm:text-[21px] ${dark ? "text-white" : "text-electric"}`}>
              {o.price}
            </span>
            {o.note && <span className={`mt-1 block text-[13px] font-semibold ${dark ? "text-white/60" : "text-body"}`}>{o.note}</span>}
          </p>
          {o.sheet ? (
            <button type="button" onClick={() => open(o.sheet!)} className={`go ${link}`} aria-haspopup="dialog">
              <GoInner>{o.link}</GoInner>
            </button>
          ) : (
            <a href={wa(ask(o.name, o.price))} target="_blank" rel="noopener noreferrer" className={`go ${link}`}>
              <GoInner>{o.link}</GoInner>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export function Prestations() {
  return (
    <section id="prestations" aria-labelledby="prestations-title" className="relative">
      <div className="gutter mx-auto max-w-page pb-24 pt-6 lg:pb-32">
        {/* the section's name, drawn large and hollow */}
        <p
          data-reveal
          className="select-none text-center text-[clamp(2.6rem,11vw,9rem)] font-extrabold leading-[0.9] tracking-[-0.01em] text-transparent [-webkit-text-stroke:1.2px_rgba(7,20,216,.32)] sm:[-webkit-text-stroke:2px_rgba(7,20,216,.24)]"
        >
          {prestations.label}
        </p>
        <div className="mt-8 grid gap-6 lg:mt-12 lg:grid-cols-[1.15fr_1fr] lg:items-end lg:gap-16">
          <h2 id="prestations-title" data-reveal className="h2 balance text-ink">
            {prestations.title}
          </h2>
          <p data-reveal className="pretty max-w-[30rem] text-[17px] font-medium leading-relaxed text-body lg:justify-self-end lg:pb-2 lg:text-[18px]">
            {prestations.lead}
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-12">
          {prestations.offers.map((o, i) => (
            <OfferCard key={o.id} o={o} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
