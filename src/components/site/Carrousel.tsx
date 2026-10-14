"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/**
 * A carousel of image cards, for the services (four) and the trainings (eight), after the models Charifa pointed to on
 * 21st.dev (14 October 2026: « les carousels, le minimum c'est 3 », « des modèles de carousels super stylés »). Their code
 * needs her personal 21st.dev key, which never goes in this public repository, so they are redrawn here from their previews,
 * in VALO's palette, with no library: the row scrolls natively (finger, trackpad, mouse wheel), snaps card by card, and two
 * round arrows move it one card at a time; a thin bar shows where the visitor is. Two looks:
 * - `apple`, after Aceternity's « Apple Cards Carousel » (Manu Arora): tall cards, the photo full-bleed, a dark veil at the
 *   top with the small label and the title in white, the price in a glass pill at the foot;
 * - `galerie`, after Shadcnblocks' « Gallery with image cards »: cards a little less tall, the photo full-bleed, the words at
 *   the foot over a dark veil, a short sentence and the price, the arrows above the row.
 * A card opens its details in the window in the middle of the screen (`onOpen`). `bleu`: on the services' band of electric
 * blue, the bar that shows the progress turns white (in electric blue it vanished into the band).
 */
export type CarteCarrousel = {
  id: string;
  img: string;
  pos?: string;
  label: string;
  title: string;
  text?: string;
  price?: string;
  /** the price as a node (« À partir de » small, the amount large), in place of `price` */
  prix?: ReactNode;
  /** a drawn, animated window in place of the photo (the services' own scenes) */
  visuel?: ReactNode;
  onOpen: () => void;
};

function Fleche({ dir }: { dir: "g" | "d" }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {dir === "g" ? <path d="M15 5l-7 7 7 7" /> : <path d="M9 5l7 7-7 7" />}
    </svg>
  );
}

/**
 * The rail itself: the row that scrolls natively and snaps, the two round arrows and the bar of progress, around any cards
 * (each marked `data-carte-rail`, `shrink-0 snap-start`). The services' carousel on the homepage puts their own cards in it,
 * with their little animated windows (Charifa, 14 October 2026: « garder les animations au niveau des services »).
 */
export function Rail({ label, bleu = false, flechesEnHaut = false, children }: { label: string; bleu?: boolean; flechesEnHaut?: boolean; children: ReactNode }) {
  const rail = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  const [bouts, setBouts] = useState({ debut: true, fin: false });

  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    let frame = 0;
    const lire = () => {
      frame = 0;
      const max = el.scrollWidth - el.clientWidth;
      setP(max > 0 ? el.scrollLeft / max : 0);
      setBouts({ debut: el.scrollLeft < 8, fin: el.scrollLeft > max - 8 });
    };
    const soon = () => {
      if (!frame) frame = requestAnimationFrame(lire);
    };
    lire();
    el.addEventListener("scroll", soon, { passive: true });
    window.addEventListener("resize", soon);
    return () => {
      el.removeEventListener("scroll", soon);
      window.removeEventListener("resize", soon);
      cancelAnimationFrame(frame);
    };
  }, []);

  const avancer = (sens: 1 | -1) => {
    const el = rail.current;
    const carte = el?.querySelector<HTMLElement>("[data-carte-rail]");
    if (!el || !carte) return;
    el.scrollBy({ left: sens * (carte.offsetWidth + 16), behavior: "smooth" });
  };

  const fleches = (
    <div className="flex items-center gap-2.5">
      {(["g", "d"] as const).map((d) => (
        <button
          key={d}
          type="button"
          onClick={() => avancer(d === "g" ? -1 : 1)}
          disabled={d === "g" ? bouts.debut : bouts.fin}
          aria-label={d === "g" ? "Précédent" : "Suivant"}
          className={`grid h-12 w-12 place-items-center rounded-full bg-white text-ink ring-1 transition hover:bg-night hover:text-white hover:ring-night disabled:pointer-events-none ${bleu ? "ring-white/40 disabled:opacity-45" : "ring-hair disabled:opacity-35"}`}
        >
          <Fleche dir={d} />
        </button>
      ))}
    </div>
  );

  return (
    <div role="region" aria-roledescription="carrousel" aria-label={label}>
      {flechesEnHaut && <div className="mb-6 flex justify-end">{fleches}</div>}
      <div
        ref={rail}
        data-lenis-prevent-wheel
        className="-mx-[var(--gutter)] flex snap-x snap-mandatory scroll-px-[var(--gutter)] gap-4 overflow-x-auto px-[var(--gutter)] pb-10 -mb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
      <div className="mt-7 flex items-center gap-6">
        <span aria-hidden className={`relative h-[3px] flex-1 overflow-hidden rounded-full ${bleu ? "bg-white/25" : "bg-hair"}`}>
          <span
            className={`absolute inset-y-0 left-0 rounded-full transition-[width] duration-200 ${bleu ? "bg-white" : "bg-electric"}`}
            style={{ width: `${Math.max(14, Math.round(p * 100))}%` }}
          />
        </span>
        {!flechesEnHaut && fleches}
      </div>
    </div>
  );
}

export function Carrousel({ items, look = "apple", label, bleu = false }: { items: CarteCarrousel[]; look?: "apple" | "galerie"; label: string; bleu?: boolean }) {
  const apple = look === "apple";
  return (
    <Rail label={label} bleu={bleu} flechesEnHaut={!apple}>
      {items.map((it, i) => (
        <button
          key={it.id}
          type="button"
          data-carte-rail
          onClick={it.onOpen}
          aria-haspopup="dialog"
          data-reveal="photo"
          style={{ ["--d" as string]: `${Math.min(i, 4) * 0.08}s` } as CSSProperties}
          className={`group relative shrink-0 snap-start overflow-hidden text-left ${
            apple
              ? "aspect-[3/4.3] w-[76vw] max-w-[360px] rounded-[26px] sm:w-[320px]"
              : "aspect-[4/5] w-[74vw] max-w-[340px] rounded-[24px] sm:w-[300px]"
          } ${apple ? "border border-[#D6DEFB] bg-[#E8EEFF] shadow-[0_24px_50px_-30px_rgba(4,11,82,.35)]" : "bg-night shadow-[0_30px_60px_-34px_rgba(4,11,82,.7)]"}`}
        >
          {!apple && (
            <Image
              src={it.img}
              alt=""
              fill
              sizes="(min-width: 640px) 380px, 80vw"
              className="object-cover transition duration-700 [transition-timing-function:var(--ease)] group-hover:scale-[1.05]"
              style={{ objectPosition: it.pos ?? "50% 40%" }}
            />
          )}
          {apple ? (
            <span className="absolute inset-0 flex flex-col">
              {/* the photo alone at the top, clean, no veil and no words on it; the words under it on white (14 October
                  2026, Charifa: neither the title on the photo nor the night-blue band fading into it, « pas beau ») */}
              <span className={`relative m-2 mb-0 block min-h-0 flex-[1.25] overflow-hidden rounded-[20px] ${it.visuel ? "@container play-when-in bg-white px-3 pt-4 sm:px-4" : "bg-frost"}`}>
                {it.visuel ? (
                  <span aria-hidden className="block">{it.visuel}</span>
                ) : (
                  <Image
                    src={it.img}
                    alt=""
                    fill
                    sizes="(min-width: 640px) 380px, 80vw"
                    className="object-cover transition duration-700 [transition-timing-function:var(--ease)] group-hover:scale-[1.04]"
                    style={{ objectPosition: it.pos ?? "50% 30%" }}
                  />
                )}
              </span>
              <span className="flex flex-1 flex-col px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
                {it.label && <span className="block text-[10.5px] font-semibold uppercase tracking-[0.18em] text-electric">{it.label}</span>}
                <span className="mt-2 block text-[18px] font-semibold leading-[1.2] tracking-[-0.02em] text-ink sm:text-[19px]">{it.title}</span>
                <span className="mt-auto flex items-center justify-between gap-3 pt-4">
                  {it.prix ? <span className="text-ink">{it.prix}</span> : it.price ? <span className="text-[16px] font-bold tracking-[-0.01em] text-ink">{it.price}</span> : <span />}
                  {/* `carte-signe`: when the card comes on screen, a ring leaves the button once and its arrow nudges twice
                      towards the corner, so the visitor sees the card opens (Charifa, 14 October 2026, « signe à
                      l'arrivée »). Once only, never in a loop */}
                  <span aria-hidden className="carte-signe relative grid h-11 w-11 shrink-0 place-items-center rounded-full bg-electric text-white shadow-[0_10px_24px_-12px_rgba(7,20,216,.9)] transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17 17 7M8 7h9v9" />
                    </svg>
                  </span>
                </span>
              </span>
            </span>
          ) : (
            <>
              <span aria-hidden className="absolute inset-x-0 bottom-0 h-[70%] bg-[linear-gradient(0deg,rgba(4,11,82,.92)_0%,rgba(4,11,82,.55)_45%,transparent_100%)]" />
              <span className="absolute inset-x-0 bottom-0 p-6">
                {it.label && <span className="mb-2.5 block text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">{it.label}</span>}
                <span className="block text-[21px] font-semibold leading-[1.15] tracking-[-0.025em] text-white">{it.title}</span>
                {it.text && <span className="mt-2 line-clamp-2 block text-[14px] leading-snug text-white/75">{it.text}</span>}
                <span className="mt-4 flex items-center justify-between gap-3 border-t border-white/20 pt-4">
                  <span className="text-[13.5px] font-semibold text-white">{it.price}</span>
                  <span aria-hidden className="text-white transition duration-300 group-hover:translate-x-1">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </span>
              </span>
            </>
          )}
        </button>
      ))}
    </Rail>
  );
}
