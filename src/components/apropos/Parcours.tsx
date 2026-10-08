import type { CSSProperties } from "react";
import { apropos } from "@/lib/content";
import { Chiffres } from "@/components/site/Chiffres";
import { Rich } from "@/components/ui/Rich";
import { WaveSpace, waveTop } from "@/components/ui/Wave";

/**
 * « Mon parcours digital »: Valentin's own sentence, large, its figures lit in
 * yellow as in the portfolio, then the three key figures below it, as on the homepage.
 */
export function Parcours() {
  const p = apropos.parcours;
  return (
    <section aria-labelledby="parcours-title" className="relative">
      <div
        data-dark
        data-teinte="bleu"
        data-teinte-plat
        className={`on-dark relative isolate overflow-hidden bg-[linear-gradient(180deg,#0714D8_0%,#0A15C2_55%,#0610A6_100%)] text-white ${waveTop("swell")}`}
      >
        <div className="gutter mx-auto max-w-page pb-20 pt-12 lg:pb-28 lg:pt-16">
          <h2 id="parcours-title" data-reveal="rule" className="tag text-white/85">
            {p.label}
          </h2>
          <blockquote
            data-reveal="words"
            style={{ ["--step" as string]: "26ms" } as CSSProperties}
            className="mt-8 max-w-[52rem] text-[clamp(1.5rem,1.05rem+1.9vw,2.5rem)] font-medium leading-[1.3] tracking-[-0.02em]"
          >
            <Rich text={p.text} words mark="text-sun" />
          </blockquote>
          <Chiffres className="mt-14 lg:mt-20" />
        </div>
        <WaveSpace />
      </div>
    </section>
  );
}
