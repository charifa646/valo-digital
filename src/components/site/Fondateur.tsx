import Link from "next/link";
import type { CSSProperties } from "react";
import { fondateur } from "@/lib/content";
import { Words } from "@/components/ui/Words";
import { BtnInner, btn } from "@/components/ui/Action";
import { PhotoZoom } from "@/components/ui/PhotoZoom";

/**
 * « Mot du fondateur », as in the catalogue: Valentin's portrait (the one Charifa chose on 8 October 2026, zooming out
 * as it comes up, `PhotoZoom.tsx`) with his name and his three titles under him, and the beginning of his letter
 * beside him. Since 7 October 2026 the homepage shows its first paragraph, then the next ones through a blur that
 * fades out, and « Lire la suite » opens the whole letter on the « À propos » page (#mot). On phones the greeting comes first, then the portrait, then the letter.
 */
/** The beginning of the third paragraph, cut at a word and ended with « … », so the reader sees the letter goes on. */
function debut(p: string, n = 200) {
  if (p.length <= n) return p;
  const c = p.slice(0, n);
  return c.slice(0, c.lastIndexOf(" ")).replace(/[.,;:]$/, "") + "…";
}

/**
 * `premium` (13 October 2026): the portrait with the same soft corners as the rest of the premium page.
 * Since 14 October 2026 (Charifa: « mettre la photo en plus grand », « réorganiser le texte pour que la personne sache qu'il y
 * a une suite »): the portrait large, his name and titles laid on its foot instead of closing the text; the text column ends
 * on the opening of the third paragraph, cut with « … », then « Lire la suite », so the letter visibly goes on.
 */
export function Fondateur({ premium = false }: { premium?: boolean } = {}) {
  const [first, second, third] = fondateur.letter;
  const text = "max-w-[38rem] space-y-5 text-[16.5px] leading-[1.75] text-body sm:text-[17px]";
  return (
    <section id="fondateur" aria-labelledby="fondateur-title" className="paper grain relative isolate bg-ice">
      <div className="gutter mx-auto grid max-w-page gap-x-16 pb-24 pt-16 [grid-template-areas:'head'_'photo'_'letter'] lg:grid-cols-[1fr_1fr] lg:grid-rows-[auto_1fr] lg:items-start lg:pb-32 lg:pt-28 lg:[grid-template-areas:'photo_head'_'photo_letter']">
        <div className="[grid-area:head]">
          <h2 id="fondateur-title" data-reveal="rule" className="tag">
            {fondateur.label}
          </h2>
          <p data-reveal="words" className="balance mt-6 max-w-[24ch] text-[clamp(1.6rem,1.1rem+1.6vw,2.4rem)] font-medium leading-[1.15] tracking-[-0.025em] text-ink">
            <Words>{fondateur.greeting}</Words>
          </p>
        </div>

        <div className="mt-10 [grid-area:photo] lg:mt-0">
          <figure className="relative mx-auto w-full max-w-[520px] lg:mx-0">
            {/* Valentin's portrait, chosen by Charifa on 8 October 2026, zooming out as it comes up; large since 14 October */}
            <PhotoZoom
              src="/images/v3/valentin-montre.webp"
              alt={`${fondateur.name}, ${fondateur.roles[2]}`}
              width={900}
              height={1166}
              sizes="(min-width: 1024px) 520px, 92vw"
              className={`aspect-[900/1166] w-full ${premium ? "rounded-lg" : "rounded-[28px]"} bg-[#6b3a1c]`}
            />
            {/* his name and his titles, the way the catalogue signs the letter, on the foot of the portrait */}
            <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 rounded-b-[28px] bg-[linear-gradient(0deg,rgba(4,11,82,.92)_0%,rgba(4,11,82,.6)_55%,transparent_100%)] px-6 pb-6 pt-20 text-white sm:px-8 sm:pb-8">
              <span className="block text-[19px] font-semibold leading-snug tracking-[-0.02em]">{fondateur.name}</span>
              <span aria-hidden className="mt-3 block h-[3px] w-10 rounded-full bg-sun" />
              <span className="mt-3 block text-[14px] leading-snug text-white/80">{fondateur.roles.join(" · ")}</span>
            </figcaption>
          </figure>
        </div>

        <div className="mt-10 [grid-area:letter] lg:mt-10">
          <div data-reveal style={{ ["--d" as string]: "0.2s" } as CSSProperties} className={text}>
            <p className="pretty">{first}</p>
            <p className="pretty">{second}</p>
            {third && <p className="pretty text-mute">{debut(third)}</p>}
          </div>
          <div className="mt-8">
            <Link href="/a-propos#mot" className={btn("electric")}>
              <BtnInner>{fondateur.cta}</BtnInner>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
