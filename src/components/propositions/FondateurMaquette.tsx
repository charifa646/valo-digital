import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { fondateur } from "@/lib/content";
import { Words } from "@/components/ui/Words";
import { PiluleInner, pilule } from "@/components/ui/Action";

/**
 * The founder's word laid out as in Charifa's ChatGPT mock-up (14 October 2026: « reprendre la mise en page que ChatGPT a
 * proposée pour le mot du fondateur »), with her own words only: Valentin's portrait as a card turned slightly, a pale blue
 * card behind it, a night-blue band across its foot with the section's name; then the greeting large, one sentence of his
 * letter set apart as a quote (his words, taken whole from the first paragraph), the next paragraph, his signature under a
 * short blue rule, and « Lire la suite ». The mock-up's own title and quote words are not used: they were not hers.
 */
const citation = (() => {
  const p = fondateur.letter[0];
  const i = p.indexOf("les outils numériques");
  return i < 0 ? "" : p.charAt(i).toUpperCase() + p.slice(i + 1);
})();

export function FondateurMaquette() {
  return (
    <section aria-labelledby="fondateur-maquette" className="paper relative bg-white">
      <div className="gutter mx-auto grid max-w-page items-center gap-14 py-20 lg:grid-cols-12 lg:gap-16 lg:py-28">
        <div className="relative mx-auto w-full max-w-[420px] lg:col-span-5">
          <span aria-hidden className="absolute inset-0 translate-x-4 translate-y-5 rotate-[3deg] rounded-[30px] bg-[#E3EAFB]" />
          <figure data-reveal="photo" className="relative -rotate-[2deg] overflow-hidden rounded-[30px] bg-[#6b3a1c] shadow-[0_40px_80px_-40px_rgba(17, 54, 76,.6)]">
            <Image
              src="/images/v3/valentin-montre.webp"
              alt={`${fondateur.name}, ${fondateur.roles[2]}`}
              width={900}
              height={1166}
              sizes="(min-width: 1024px) 420px, 88vw"
              className="h-auto w-full"
            />
            <figcaption className="absolute inset-x-5 bottom-5 rounded-xl bg-night/95 px-5 py-4 text-center text-[11.5px] font-semibold uppercase tracking-[0.2em] text-white">
              {fondateur.label}
            </figcaption>
          </figure>
        </div>

        <div className="lg:col-span-7">
          <h2 id="fondateur-maquette" data-reveal="words" className="balance max-w-[20ch] text-[clamp(1.9rem,1.2rem+2.2vw,3.1rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-ink">
            <Words>{fondateur.greeting}</Words>
          </h2>
          {citation && (
            <blockquote data-reveal style={{ ["--d" as string]: "0.2s" } as CSSProperties} className="pretty mt-8 border-l-2 border-electric pl-6 text-[clamp(1.15rem,0.95rem+0.6vw,1.45rem)] font-medium leading-snug tracking-[-0.015em] text-ink">
              « {citation.replace(/\.$/, "")}. »
            </blockquote>
          )}
          <p data-reveal style={{ ["--d" as string]: "0.3s" } as CSSProperties} className="pretty mt-7 max-w-[38rem] text-[16.5px] leading-[1.75] text-body">
            {fondateur.letter[1]}
          </p>
          <div data-reveal style={{ ["--d" as string]: "0.4s" } as CSSProperties} className="mt-9 flex items-start gap-5">
            <span aria-hidden className="mt-3 h-[2px] w-12 shrink-0 bg-electric" />
            <span>
              <span className="block text-[17px] font-semibold tracking-[-0.01em] text-ink">{fondateur.name}</span>
              <span className="mt-1.5 block text-[14px] leading-relaxed text-body">{fondateur.roles.join(" · ")}</span>
            </span>
          </div>
          <Link href="/a-propos#mot" className={pilule("night", "mt-10 max-w-[22rem]")}>
            <PiluleInner>{fondateur.cta}</PiluleInner>
          </Link>
        </div>
      </div>
    </section>
  );
}
