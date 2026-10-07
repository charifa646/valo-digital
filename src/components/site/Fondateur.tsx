import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { fondateur } from "@/lib/content";
import { WaveSpace, waveTop } from "@/components/ui/Wave";
import { Words } from "@/components/ui/Words";
import { BtnInner, btn } from "@/components/ui/Action";
import { Suite } from "@/components/ui/Suite";

/**
 * « Mot du fondateur », as in the catalogue: Valentin standing out of a light card with his name and his three
 * titles under him, and the beginning of his letter beside him. Since 7 October 2026 the homepage shows its first
 * paragraph, then the next ones through a blur that fades out, and « En savoir plus » opens the whole letter on the
 * « À propos » page (#mot). On phones the greeting comes first, then the portrait, then the letter.
 */
export function Fondateur() {
  const [first, ...rest] = fondateur.letter;
  const text = "max-w-[38rem] space-y-5 text-[16.5px] font-medium leading-[1.75] text-body sm:text-[17px]";
  return (
    <section id="fondateur" aria-labelledby="fondateur-title" className={`paper relative isolate bg-ice ${waveTop("ripple", true, true)}`}>
      <div className="gutter mx-auto grid max-w-page gap-x-20 pb-24 pt-16 [grid-template-areas:'head'_'photo'_'letter'] lg:grid-cols-[0.8fr_1.2fr] lg:grid-rows-[auto_1fr] lg:items-start lg:pb-32 lg:pt-24 lg:[grid-template-areas:'photo_head'_'photo_letter']">
        <div className="[grid-area:head]">
          <h2 id="fondateur-title" data-reveal="rule" className="tag">
            {fondateur.label}
          </h2>
          <p
            data-reveal="words"
            className="balance mt-6 max-w-[24ch] text-[clamp(1.6rem,1.1rem+1.6vw,2.4rem)] font-medium leading-[1.15] tracking-[-0.025em] text-ink"
          >
            <Words>{fondateur.greeting}</Words>
          </p>
        </div>

        <div className="mt-12 [grid-area:photo] lg:mt-0">
          <figure data-reveal="tilt" className="relative mx-auto w-full max-w-[340px] pt-[78px] sm:max-w-[400px] sm:pt-[96px] lg:mx-0">
            {/* the card, and Valentin coming out of its top edge */}
            <div className="relative aspect-[1/1.06] w-full">
              <div className="absolute inset-0 overflow-hidden rounded-2xl bg-[linear-gradient(170deg,#EEF2FF_0%,#D8E0FF_62%,#C3CFFF_100%)]">
                <div className="absolute -bottom-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-white/60 blur-3xl" />
              </div>
              <div className="absolute inset-x-0 bottom-0 top-[-78px] [clip-path:inset(-100%_0_0_0_round_4px)] sm:top-[-96px]">
                <Image
                  src="/images/v3/valentin-debout.webp"
                  alt={`${fondateur.name}, ${fondateur.roles[2]}`}
                  width={774}
                  height={1445}
                  sizes="(min-width: 1024px) 330px, 76vw"
                  className="absolute bottom-[-16%] left-1/2 h-auto w-[76%] -translate-x-1/2"
                />
              </div>
            </div>
            {/* his name and his titles, the way the catalogue signs the letter */}
            <figcaption className="mt-7">
              <span className="block text-[19px] font-semibold leading-snug tracking-[-0.02em] text-ink">{fondateur.name}</span>
              <span aria-hidden className="mt-3 block h-[3px] w-10 rounded-full bg-sun" />
              <span className="mt-3 block text-[14.5px] font-bold text-electric">{fondateur.roles[0]}</span>
              {fondateur.roles.slice(1).map((r) => (
                <span key={r} className="mt-1 block text-[14.5px] font-medium leading-snug text-body">
                  {r}
                </span>
              ))}
            </figcaption>
          </figure>
        </div>

        <div className="mt-12 [grid-area:letter] lg:mt-10">
          <div data-reveal style={{ ["--d" as string]: "0.2s" } as CSSProperties} className={text}>
            <p className="pretty">{first}</p>
          </div>
          <Suite
            text
            className="mt-5 h-[124px] sm:h-[146px]"
            action={
              <Link href="/a-propos#mot" className={btn("electric")}>
                <BtnInner>{fondateur.cta}</BtnInner>
              </Link>
            }
          >
            <div className={text}>
              {rest.slice(0, 2).map((p) => (
                <p key={p.slice(0, 24)} className="pretty">
                  {p}
                </p>
              ))}
            </div>
          </Suite>
        </div>
      </div>
      <WaveSpace />
    </section>
  );
}
