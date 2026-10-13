import Image from "next/image";
import type { CSSProperties } from "react";
import { final, fondateur, footer } from "@/lib/content";
import { Monogram } from "@/components/brand/Logo";
import { DemandeButton } from "../Sheet";
import { BtnInner, btn } from "@/components/ui/Action";
import { Words, count } from "@/components/ui/Words";
import { Bas, Colonnes, Contacts, Marque } from "./Liens";

const cut = final.title.indexOf("votre");
const line1 = final.title.slice(0, cut).trim();
const line2 = final.title.slice(cut);

/** VALO's four trades, twice over so the loop has no seam, one in two drawn in outline, the VD mark in yellow between them. */
function Bande() {
  const words = [...footer.tags, ...footer.tags];
  return (
    <div aria-hidden className="relative overflow-hidden py-8 sm:py-10 lg:py-12">
      <div className="marquee flex w-max items-center">
        {words.map((t, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-[0.35em] pr-[0.35em] text-[clamp(3.2rem,1.6rem+6vw,8.5rem)] font-semibold leading-none tracking-[-0.045em]"
          >
            <span className={i % 2 ? "text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,.7)]" : "text-white"}>{t}</span>
            <Monogram className="h-[0.42em] w-auto shrink-0 text-sun" />
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * Proposal B for the foot of the page, « le grand appel » (7 October 2026): one blue sheet with rounded top corners
 * that slides over the page (held in place behind it), the last call's title very large with Valentin in his armchair
 * beside it, then VALO's four trades passing in very large letters (as The Alien
 * does with its own words), then the numbers written large, the services, the trainings and the menu.
 */
export function Appel() {
  return (
    <div data-dark className="feuille on-dark isolate overflow-hidden bg-[linear-gradient(180deg,#0714D8_0%,#0A15C2_45%,#050E78_100%)] text-white">
      <div
        aria-hidden
        className="absolute right-[-10%] top-[-12%] -z-10 h-[680px] w-[680px] rounded-full bg-[radial-gradient(closest-side,rgba(143,163,255,.35),transparent)]"
      />
      <section
        id="contact"
        aria-labelledby="contact-title"
        className="gutter relative mx-auto grid max-w-page gap-6 pt-12 sm:pt-16 lg:grid-cols-12 lg:items-end lg:gap-8 lg:pt-20"
      >
        <div className="lg:col-span-7 lg:pb-20">
          <h2 id="contact-title" data-reveal="words" className="text-[clamp(2.5rem,1rem+4.6vw,5.6rem)] font-medium leading-[0.98] tracking-[-0.045em]">
            <span className="block">
              <Words>{line1}</Words>
            </span>
            <span className="block text-sun">
              <Words from={count(line1)}>{line2}</Words>
            </span>
          </h2>
          <div data-reveal style={{ ["--d" as string]: "0.35s" } as CSSProperties}>
            <p className="pretty mt-7 max-w-[28rem] text-[17px] font-medium leading-relaxed text-white/80 sm:text-[18px]">{final.text}</p>
            <DemandeButton className={btn("white", "mt-7")}>
              <BtnInner>{final.cta}</BtnInner>
            </DemandeButton>
          </div>
        </div>
        <div data-reveal="zoom" className="relative mx-auto -mb-px w-full max-w-[520px] origin-bottom self-end lg:col-span-5 lg:mr-0">
          <div
            aria-hidden
            className="absolute bottom-[4%] left-1/2 h-[80%] w-[90%] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(232,238,255,.45),rgba(143,163,255,.18)_60%,transparent)]"
          />
          <Image
            src="/images/v3/valentin-assis.webp"
            alt={`${fondateur.name}, ${fondateur.roles[2]}`}
            width={990}
            height={1131}
            sizes="(min-width: 1024px) 520px, 90vw"
            className="fade-left relative h-auto w-full"
          />
        </div>
      </section>

      <div className="relative bg-[#050E8C]">
        <Bande />
      </div>

      <footer className="gutter relative mx-auto max-w-page">
        <div className="grid gap-12 pt-14 sm:pt-16 lg:grid-cols-12 lg:gap-10 lg:pt-20">
          <Contacts className="lg:col-span-6" />
          <Colonnes className="lg:col-span-6" />
          <Marque className="lg:col-span-6" />
        </div>
        <Bas className="mt-12 lg:mt-16" />
      </footer>
    </div>
  );
}
