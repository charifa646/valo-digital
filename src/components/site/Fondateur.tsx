import Link from "next/link";
import type { CSSProperties } from "react";
import { fondateur } from "@/lib/content";
import { waveTop } from "@/components/ui/Wave";
import { Words } from "@/components/ui/Words";
import { BtnInner, btn } from "@/components/ui/Action";
import { Suite } from "@/components/ui/Suite";
import { PhotoZoom } from "@/components/ui/PhotoZoom";

/**
 * « Mot du fondateur », as in the catalogue: Valentin's portrait (the one Charifa chose on 8 October 2026, zooming out
 * as it comes up, `PhotoZoom.tsx`) with his name and his three titles under him, and the beginning of his letter
 * beside him. Since 7 October 2026 the homepage shows its first paragraph, then the next ones through a blur that
 * fades out, and « En savoir plus » opens the whole letter on the « À propos » page (#mot). On phones the greeting comes first, then the portrait, then the letter.
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
          <figure className="mx-auto w-full max-w-[340px] sm:max-w-[400px] lg:mx-0">
            {/* Valentin's portrait, chosen by Charifa on 8 October 2026, zooming out as it comes up */}
            <PhotoZoom
              src="/images/v3/valentin-montre.webp"
              alt={`${fondateur.name}, ${fondateur.roles[2]}`}
              width={900}
              height={1166}
              sizes="(min-width: 1024px) 400px, (min-width: 640px) 400px, 92vw"
              className="aspect-[900/1166] w-full rounded-2xl bg-[#6b3a1c]"
            />
            {/* his name and his titles, the way the catalogue signs the letter */}
            <figcaption data-reveal className="mt-7">
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
    </section>
  );
}
