import Image from "next/image";
import type { CSSProperties } from "react";
import { apropos } from "@/lib/content";
import { Words } from "@/components/ui/Words";

/** The eleven skills learnt on his own, as a numbered index beside Valentin in his blue waistcoat (no icons since 7 October 2026). */
export function Competences() {
  const c = apropos.competences;
  return (
    <section aria-labelledby="competences-title" className="paper relative bg-white">
      <div className="gutter mx-auto grid max-w-page items-center gap-14 py-20 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16 lg:py-28">
        <div>
          <h2 id="competences-title" data-reveal="words" className="h2 balance max-w-[22ch] text-ink">
            <Words>{c.title}</Words>
          </h2>
          <ol className="mt-10 grid border-t border-hair sm:grid-cols-2 sm:gap-x-10 lg:mt-12">
            {c.items.map((s, i) => (
              <li
                key={s}
                data-reveal="slide-left"
                style={{ ["--d" as string]: `${(i % 6) * 0.06}s` } as CSSProperties}
                className="flex items-baseline gap-4 border-b border-hair py-4 sm:py-[18px]"
              >
                <span className="w-6 shrink-0 text-[12px] font-bold tabular-nums text-electric">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[16px] font-semibold tracking-[-0.01em] text-ink sm:text-[17px]">{s}</span>
              </li>
            ))}
          </ol>
        </div>

        <figure data-reveal="zoom" className="relative mx-auto w-full max-w-[400px] lg:mx-0 lg:justify-self-end">
          <div className="overflow-hidden rounded-2xl bg-night">
            <Image
              src="/images/apropos/valentin-gilet.webp"
              alt=""
              width={900}
              height={1166}
              sizes="(min-width: 1024px) 400px, 86vw"
              className="h-auto w-full"
            />
          </div>
        </figure>
      </div>
    </section>
  );
}
