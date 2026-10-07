import type { CSSProperties } from "react";
import { fondateur } from "@/lib/content";
import { WaveSpace } from "@/components/ui/Wave";
import { Words } from "@/components/ui/Words";

/**
 * « Mot du fondateur », the whole letter from the 2026 catalogue (the homepage shows its beginning and its
 * « En savoir plus » leads here, #mot; 7 October 2026). Set like a letter: one column, the greeting large, the
 * paragraphs, the welcome in blue, then Valentin's name and his three titles as the catalogue signs it. It follows
 * « Qui suis-je ? » on the same light blue, so the two read as one chapter about him.
 */
export function Mot() {
  return (
    <section id="mot" aria-labelledby="mot-title" className="paper relative bg-ice">
      <div className="gutter mx-auto max-w-page pb-16 pt-6 lg:pb-24 lg:pt-10">
        <div className="mx-auto max-w-[44rem]">
          <h2 id="mot-title" data-reveal="rule" className="tag">
            {fondateur.label}
          </h2>
          <p data-reveal="words" className="balance mt-6 text-[clamp(1.6rem,1.1rem+1.6vw,2.4rem)] font-medium leading-[1.15] tracking-[-0.025em] text-ink">
            <Words>{fondateur.greeting}</Words>
          </p>
          <div
            data-reveal
            style={{ ["--d" as string]: "0.2s" } as CSSProperties}
            className="mt-8 space-y-5 text-[16.5px] font-medium leading-[1.8] text-body sm:text-[17.5px]"
          >
            {fondateur.letter.map((p) => (
              <p key={p.slice(0, 24)} className="pretty">
                {p}
              </p>
            ))}
          </div>
          <p data-reveal className="mt-8 text-[19px] font-semibold tracking-[-0.01em] text-electric">
            {fondateur.closing}
          </p>
          <p data-reveal className="mt-8">
            <span className="block text-[17px] font-semibold tracking-[-0.015em] text-ink">{fondateur.name}</span>
            {fondateur.roles.map((r) => (
              <span key={r} className="mt-1 block text-[14.5px] font-medium leading-snug text-body">
                {r}
              </span>
            ))}
          </p>
        </div>
      </div>
      <WaveSpace />
    </section>
  );
}
