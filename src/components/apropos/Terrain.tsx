import Image from "next/image";
import type { CSSProperties } from "react";
import { apropos } from "@/lib/content";
import { Pin } from "@/components/ui/Icons";
import { Words } from "@/components/ui/Words";

/**
 * « Quelques clichés de nos formations à succès »: eighteen moments from the
 * portfolio, each with its photo, its date and its place as the portfolio gives
 * them. Columns of photos at their own shapes on larger screens; on phones a
 * row that slides under the finger.
 */
export function Terrain() {
  const t = apropos.terrain;
  return (
    <section aria-labelledby="terrain-title" className="relative bg-white">
      <div className="gutter mx-auto max-w-page py-24 lg:py-32">
        <div className="max-w-[44rem]">
          <p data-reveal="rule" className="tag">
            {t.label}
          </p>
          <h2 id="terrain-title" data-reveal="words" className="h2 balance mt-5 text-ink">
            <Words>{t.title}</Words>
          </h2>
        </div>

        <ul className="-mx-[var(--gutter)] mt-10 flex snap-x snap-mandatory items-start gap-3 overflow-x-auto px-[var(--gutter)] pb-4 [scroll-padding-inline:var(--gutter)] [scrollbar-width:none] sm:mx-0 sm:block sm:columns-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:mt-14 lg:columns-3 [&::-webkit-scrollbar]:hidden">
          {t.moments.map((m, i) => (
            <li
              key={m.photo}
              data-reveal="photo"
              style={{ ["--d" as string]: `${(i % 3) * 0.08}s` } as CSSProperties}
              className="w-[78vw] max-w-[330px] shrink-0 snap-start sm:mb-8 sm:w-auto sm:max-w-none sm:break-inside-avoid"
            >
              <figure>
                <div className="overflow-hidden rounded-2xl bg-soft">
                  <Image
                    src={`/images/terrain/${m.photo}.webp`}
                    alt=""
                    width={m.width}
                    height={m.height}
                    sizes="(min-width: 1024px) 380px, (min-width: 640px) 46vw, 78vw"
                    className="h-auto w-full transition-transform duration-700 [transition-timing-function:var(--ease)] hover:scale-[1.03]"
                  />
                </div>
                <figcaption className="mt-3.5 px-0.5">
                  <span className="block text-[11.5px] font-semibold uppercase tracking-[0.14em] text-electric">{m.date}</span>
                  <span className="pretty mt-1.5 block text-[15.5px] font-semibold leading-snug tracking-[-0.01em] text-ink">{m.title}</span>
                  {m.place && (
                    <span className="mt-2 flex items-start gap-1.5 text-[13.5px] font-medium leading-snug text-body">
                      <Pin className="mt-[1px] h-4 w-4 shrink-0 text-mute" />
                      {m.place}
                    </span>
                  )}
                  {m.note && <span className="pretty mt-1.5 block text-[13.5px] font-medium leading-relaxed text-body">{m.note}</span>}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
