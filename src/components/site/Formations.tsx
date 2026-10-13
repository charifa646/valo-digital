"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { formations, type Formation } from "@/lib/content";
import { useSheet } from "./Sheet";
import { Words } from "@/components/ui/Words";
import { BtnInner, btn } from "@/components/ui/Action";
import { ArrowUpRight } from "@/components/ui/Icons";
import { Suite } from "@/components/ui/Suite";
import { GrandTitre } from "@/components/ui/GrandTitre";
import { formationPhotos } from "@/lib/photos";
import { Carrousel } from "./Carrousel";

export { formationPhotos };


const card =
  "group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-hair bg-white text-left transition duration-300 hover:-translate-y-1 hover:border-electric/25 hover:shadow-panel";

/** The price in the premium list: on one line, the amount in a calm size, its unit smaller; words never changed. */
function PrixLigne({ price }: { price: string }) {
  const m = /^(.*?)(\s+F\s*CFA.*)$/i.exec(price);
  return (
    <span className="whitespace-nowrap leading-tight text-ink">
      <span className="text-[16.5px] font-semibold tracking-[-0.01em]">{m ? m[1] : price}</span>
      {m && <span className="text-[12px] font-semibold text-mute">{m[2]}</span>}
    </span>
  );
}

/** « 75 000 F CFA » in two sizes: the amount, then its unit smaller. The words themselves are never changed. */
function Prix({ price }: { price: string }) {
  const m = /^(.*?)(\s+F\s*CFA.*)$/i.exec(price);
  if (!m) return <span className="text-[17px] font-bold leading-tight tracking-[-0.01em] text-ink sm:text-[19px]">{price}</span>;
  return (
    <span className="leading-tight text-ink">
      <span className="text-[17px] font-bold tracking-[-0.01em] sm:text-[19px]">{m[1]}</span>
      <span className="text-[12px] font-semibold text-mute sm:text-[13px]">{m[2]}</span>
    </span>
  );
}

/**
 * A training's card: its photo, its name, its format and its price. It opens the catalogue on it; `still`: under the glimpse,
 * a picture only. `etiquette` (a proposal drawn from Airbnb's photo-first cards and Cal's restraint, 13 October 2026): the
 * format as a badge on the photo, the title at a lighter weight, the price as the strongest line, the arrow quiet until the
 * hand comes (blue only at that moment).
 */
function Card({ f, still = false, etiquette = false }: { f: Formation; still?: boolean; etiquette?: boolean }) {
  const { open } = useSheet();
  const inner = etiquette ? (
    <>
      <span className="relative block aspect-[4/3] overflow-hidden bg-soft">
        <Image
          src={`/images/formations/${formationPhotos[f.id] ?? f.id}.webp`}
          alt=""
          fill
          sizes="(min-width: 1024px) 290px, 46vw"
          className="object-cover transition duration-700 [transition-timing-function:var(--ease)] group-hover:scale-[1.04]"
        />
        <span
          className={`absolute left-2.5 top-2.5 inline-flex max-w-[calc(100%-1.25rem)] rounded-[10px] px-2.5 py-1.5 text-[10.5px] font-bold leading-tight shadow-[0_1px_6px_rgba(16, 52, 74,.14)] sm:left-3 sm:top-3 sm:max-w-[calc(100%-1.5rem)] sm:rounded-full sm:py-1 sm:text-[11px] sm:leading-none ${f.tag ? "bg-sun text-navy" : "bg-white text-navy"}`}
        >
          {f.format}
        </span>
      </span>
      <span className="flex flex-1 flex-col p-3.5 sm:p-5">
        <span className="text-[14.5px] font-semibold leading-snug tracking-[-0.01em] text-ink sm:text-[16.5px]">{f.name}</span>
        <span className="mt-auto flex items-end justify-between gap-2 pt-4 sm:pt-5">
          <Prix price={f.price} />
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-soft text-electric transition duration-300 group-hover:bg-electric group-hover:text-white">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </span>
      </span>
    </>
  ) : (
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
/**
 * The premium pass (13 October 2026): the trainings as an editorial list, a layout of their own instead of the card
 * grid the services already use (Charifa's design skill: one layout family per section). Each row is a training, its
 * format and its price, words left as they are; it opens the catalogue on it, as the cards did. On a computer the
 * training's photo rises just above the row under the hand and follows it sideways (written straight into two CSS
 * variables, no re-rendering while the hand moves; kept inside the list so the page never scrolls sideways; above the
 * row so it never hides the title being read); on phones and tablets each row carries a small photo instead. With
 * « reduce motion » the photo does not follow.
 */
function Liste() {
  const { open } = useSheet();
  const items = formations.items;
  const zone = useRef<HTMLDivElement>(null);
  const [actif, setActif] = useState<number | null>(null);

  useEffect(() => {
    const el = zone.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let x = 0;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      // centred on the hand, never past the list's edges
      x = Math.max(0, Math.min(e.clientX - r.left - 140, r.width - 280));
      if (!frame)
        frame = requestAnimationFrame(() => {
          frame = 0;
          el.style.setProperty("--x", `${x}px`);
        });
    };
    el.addEventListener("pointermove", move);
    return () => {
      el.removeEventListener("pointermove", move);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={zone} className="liste-formations relative mt-10 lg:mt-14" onPointerLeave={() => setActif(null)}>
      <ul className="border-t border-hair">
        {items.map((f, i) => (
          <li key={f.id} data-reveal style={{ ["--d" as string]: `${i * 0.05}s` } as CSSProperties}>
            <button
              type="button"
              onClick={() => open("formations", f.id)}
              onPointerEnter={(e) => {
                setActif(i);
                // the photo's lower edge just above the row's top line
                const z = zone.current;
                if (z) z.style.setProperty("--y", `${e.currentTarget.getBoundingClientRect().top - z.getBoundingClientRect().top - 222}px`);
              }}
              onFocus={() => setActif(i)}
              aria-haspopup="dialog"
              className="group grid w-full grid-cols-[3.5rem_minmax(0,1fr)_auto] items-center gap-4 border-b border-hair py-4 text-left sm:py-5 lg:grid-cols-[minmax(0,1fr)_12rem_12.5rem_2.75rem] lg:gap-8 lg:py-7"
            >
              <span className="relative block h-14 w-14 overflow-hidden rounded-md bg-soft lg:hidden">
                <Image src={`/images/formations/${formationPhotos[f.id] ?? f.id}.webp`} alt="" fill sizes="56px" className="object-cover" />
              </span>
              <span className="min-w-0">
                <span className="block text-[16.5px] font-semibold leading-snug tracking-[-0.015em] text-ink transition-colors duration-300 group-hover:text-electric sm:text-[18px] lg:text-[clamp(1.3rem,0.85rem+1vw,1.8rem)] lg:font-medium lg:tracking-[-0.025em]">
                  {f.name}
                </span>
                <span className="mt-1 block text-[13px] font-medium text-mute lg:hidden">
                  {f.format} <span className="whitespace-nowrap">· {f.price}</span>
                </span>
              </span>
              <span className="hidden text-[14px] font-medium text-mute lg:block">{f.format}</span>
              <span className="hidden text-right lg:block">
                <PrixLigne price={f.price} />
              </span>
              {/* the arrow in a ring of the page's blue, visible before the hand comes, filled when it does */}
              <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-electric ring-1 ring-electric/35 transition duration-300 group-hover:bg-electric group-hover:text-white group-hover:ring-electric lg:h-11 lg:w-11">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </button>
          </li>
        ))}
      </ul>
      <div aria-hidden data-on={actif !== null || undefined} className="liste-apercu pointer-events-none absolute left-0 top-0 z-[2] hidden h-[210px] w-[280px] overflow-hidden rounded-lg bg-soft shadow-panel lg:block">
        {items.map((f, i) => (
          <Image
            key={f.id}
            src={`/images/formations/${formationPhotos[f.id] ?? f.id}.webp`}
            alt=""
            fill
            sizes="280px"
            className={`object-cover transition-opacity duration-300 ${actif === i ? "opacity-100" : "opacity-0"}`}
          />
        ))}
      </div>
    </div>
  );
}

/** `grand`: the list under the very large « Nos formations », which fills as it comes (the homepage, 13 October 2026). */
export function Formations({ variante = "actuel", grand = false }: { variante?: "actuel" | "etiquette" | "liste" | "carrousel"; grand?: boolean } = {}) {
  const items = formations.items;
  const { open } = useSheet();
  const etiquette = variante === "etiquette";
  if (variante === "liste" || variante === "carrousel") {
    return (
      <section id="formations" aria-labelledby="formations-title" className="paper relative bg-white">
        <div className="gutter mx-auto max-w-page pb-16 pt-16 lg:pb-28 lg:pt-24">
          {grand && <GrandTitre id="formations-title">{formations.grand}</GrandTitre>}
          <div className={`max-w-[40rem] ${grand ? "mt-8 lg:mt-12" : ""}`}>
            {(() => {
              const Titre = grand ? "h3" : "h2";
              return (
                <Titre id={grand ? undefined : "formations-title"} data-reveal="words" className="h2 balance text-ink">
                  {formations.title.map((w, i) => (
                    <span key={w}>
                      <Words from={i} className={i === 2 ? "text-electric" : ""}>
                        {w}
                      </Words>
                      {i < formations.title.length - 1 ? " " : ""}
                    </span>
                  ))}
                </Titre>
              );
            })()}
            <p data-reveal className="pretty mt-4 text-[16.5px] font-medium leading-relaxed text-body lg:text-[17.5px]" style={{ ["--d" as string]: "0.3s" } as CSSProperties}>
              {formations.lead}
            </p>
          </div>
          {variante === "carrousel" ? (
            <div className="mt-10 lg:mt-14">
              <Carrousel
                label={formations.grand}
                items={items.map((f) => ({
                  id: f.id,
                  img: `/images/formations/${formationPhotos[f.id] ?? f.id}.webp`,
                  label: f.format,
                  title: f.name,
                  text: f.modules,
                  price: f.price,
                  onOpen: () => open("formations", f.id),
                }))}
              />
            </div>
          ) : (
            <Liste />
          )}
          {/* a real button, as the others on the page (14 October 2026, Charifa: the buttons must be seen as buttons) */}
          <div className="mt-10 lg:mt-12">
            <Link href="/formations" className={btn("electric")}>
              <BtnInner>{formations.cta}</BtnInner>
            </Link>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section id="formations" aria-labelledby="formations-title" className="paper halo-tr relative bg-white">
      <div className="gutter mx-auto max-w-page pb-16 pt-16 lg:pb-28 lg:pt-24">
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
              <Card f={f} etiquette={etiquette} />
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
                <Card f={f} still etiquette={etiquette} />
              </li>
            ))}
          </ul>
        </Suite>
      </div>
    </section>
  );
}
