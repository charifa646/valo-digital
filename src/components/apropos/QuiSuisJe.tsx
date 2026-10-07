import Image from "next/image";
import type { CSSProperties } from "react";
import { apropos, fondateur } from "@/lib/content";
import { Rich } from "@/components/ui/Rich";
import { waveTop } from "@/components/ui/Wave";
import { Words } from "@/components/ui/Words";

/**
 * « Qui suis-je ? »: Valentin seated in the light, his name on a card at the
 * foot of the photo, and the portfolio's two paragraphs with its bold words.
 * The section keeps its #fondateur anchor. His whole letter follows on the same light blue (`Mot.tsx`, #mot), where the
 * homepage's « En savoir plus » leads.
 */
export function QuiSuisJe() {
  const f = apropos.fondateur;
  return (
    <section id="fondateur" aria-labelledby="fondateur-title" className={`paper halo-tr relative isolate bg-ice ${waveTop("rise", false, true)}`}>
      <div className="gutter mx-auto grid max-w-page items-center gap-14 pb-20 pt-24 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20 lg:pb-28 lg:pt-32">
        <figure data-reveal="tilt" className="relative mx-auto w-full max-w-[440px]">
          <div className="overflow-hidden rounded-2xl bg-night">
            <Image
              src="/images/apropos/valentin-portrait.webp"
              alt={`${fondateur.name}, ${fondateur.roles[2]}`}
              width={1000}
              height={1255}
              sizes="(min-width: 1024px) 440px, 88vw"
              className="h-auto w-full"
            />
          </div>
          <figcaption className="absolute inset-x-4 bottom-4 rounded-xl bg-white px-5 py-4 shadow-float">
            <span className="block text-[15.5px] font-semibold tracking-[-0.01em] text-ink">{fondateur.name}</span>
            <span className="mt-0.5 block text-[13.5px] font-medium text-body">{fondateur.roles[1]}</span>
          </figcaption>
        </figure>

        <div>
          <h2 id="fondateur-title" data-reveal="words" className="h2 text-ink">
            <Words>{f.title}</Words>
          </h2>
          {f.text.map((t, i) => (
            <p
              key={i}
              data-reveal
              style={{ ["--d" as string]: `${0.15 + i * 0.12}s` } as CSSProperties}
              className="pretty mt-6 max-w-[38rem] text-[16.5px] font-medium leading-[1.8] text-body sm:text-[17.5px]"
            >
              <Rich text={t} />
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
