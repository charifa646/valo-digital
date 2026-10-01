import type { CSSProperties } from "react";
import { apropos, confiance } from "@/lib/content";
import { LogoTile } from "@/components/site/Confiance";
import { Rich } from "@/components/ui/Rich";
import { Wave } from "@/components/ui/Wave";
import { Words } from "@/components/ui/Words";

/** « Ils nous ont fait confiance », all the logos at once on white cards, then the mission. */
export function References() {
  return (
    <section aria-labelledby="references-title" className="relative isolate">
      <div aria-hidden className="light-lines" />
      <div className="gutter mx-auto max-w-page pb-20 pt-24 lg:pb-28 lg:pt-32">
        <div className="text-center">
          <p data-reveal="rule" className="tag tag-center">
            {apropos.references.label}
          </p>
          <h2 id="references-title" data-reveal="words" className="h2 mt-5 text-ink">
            <Words>{confiance.title}</Words>
          </h2>
        </div>

        <ul className="mx-auto mt-12 flex max-w-[1080px] flex-wrap justify-center gap-2.5 sm:gap-3 lg:mt-16 lg:gap-4">
          {confiance.logos.map((l, i) => (
            <li
              key={l.src}
              data-reveal="zoom"
              style={{ ["--d" as string]: `${(i % 6) * 0.05}s` } as CSSProperties}
              className="w-[calc((100%-1.25rem)/3)] sm:w-[calc((100%-2.25rem)/4)] lg:w-[calc((100%-5rem)/6)]"
            >
              <LogoTile logo={l} className="h-[76px] w-full sm:h-[96px]" />
            </li>
          ))}
        </ul>

        <p
          data-reveal="blur"
          className="balance mx-auto mt-14 max-w-[30ch] text-center text-[clamp(1.35rem,1rem+1.4vw,1.95rem)] font-medium leading-snug tracking-[-0.02em] text-ink lg:mt-20"
        >
          <Rich text={confiance.mission} mark="text-electric" />
        </p>
      </div>
      <Wave shape="swell" flip back="text-electric/25" front="text-electric" className="-mb-px" />
    </section>
  );
}
