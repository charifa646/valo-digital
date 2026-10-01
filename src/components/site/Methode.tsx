import type { CSSProperties } from "react";
import { methode } from "@/lib/content";
import { ArrowUpRight } from "@/components/ui/Icons";
import { GrowthCurve } from "./GrowthCurve";
import { Wave } from "@/components/ui/Wave";

/** Each step is a stair, a little higher and a little bluer than the one before. */
const stairs = [
  { h: "h-[118px] md:h-[150px]", fill: "bg-frost", ink: "text-electric" },
  { h: "h-[176px] md:h-[232px]", fill: "bg-[#C9D3FF]", ink: "text-electric" },
  { h: "h-[234px] md:h-[314px]", fill: "bg-azure", ink: "text-white" },
  { h: "h-[292px] md:h-[396px]", fill: "bg-electric", ink: "text-white" },
];

/**
 * « Une méthode simple. Des actions concrètes. »: the four steps climb like a
 * staircase, each verb standing on its own stair. When it comes on screen the
 * stairs rise one after the other, then the words step onto them, then a
 * growth curve draws itself above them. On phones the staircase slides
 * sideways under the finger.
 */
export function Methode() {
  return (
    <section id="methode" aria-labelledby="methode-title" className="relative bg-white">
      <div className="gutter mx-auto max-w-page pb-14 pt-24 lg:pb-20 lg:pt-32">
        <div className="max-w-[40rem]">
          <p className="tag">{methode.label}</p>
          <h2 id="methode-title" data-reveal className="h2 mt-5 text-ink">
            <span className="block">{methode.title[0]}</span>
            <span className="block text-electric">{methode.title[1]}</span>
          </h2>
        </div>

        <div className="-mx-[var(--gutter)] mt-2 snap-x snap-mandatory overflow-x-auto px-[var(--gutter)] [scroll-padding-inline:var(--gutter)] [scrollbar-width:none] md:mx-0 md:mt-4 md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden">
          {/* room above the stairs for the growth curve */}
          <div data-reveal className="relative w-max pt-[76px] md:w-auto md:pt-[96px]">
            <ol className="flex w-max items-end gap-2.5 md:grid md:w-auto md:grid-cols-4 md:gap-3">
              {methode.steps.map((s, i) => (
                <li key={s.n} className="flex w-[226px] shrink-0 snap-start flex-col md:w-auto">
                  <div data-step className="stair-text pb-4 pr-4" style={{ transitionDelay: `${0.45 + i * 0.2}s` } as CSSProperties}>
                    <h3 className="text-[15px] font-bold tracking-[0.06em] text-ink">{s.name}</h3>
                    <p className="pretty mt-1.5 text-[14.5px] font-medium leading-relaxed text-body">{s.text}</p>
                  </div>
                  <div className={`relative flex items-end p-5 ${stairs[i].h}`}>
                    <span
                      aria-hidden
                      className={`stair absolute inset-0 rounded-t-2xl ${stairs[i].fill}`}
                      style={{ transitionDelay: `${i * 0.2}s` } as CSSProperties}
                    />
                    <span
                      className={`stair-text relative text-[54px] font-bold leading-none tracking-[-0.05em] md:text-[68px] ${stairs[i].ink}`}
                      style={{ transitionDelay: `${0.3 + i * 0.2}s` } as CSSProperties}
                    >
                      {s.n}
                    </span>
                    {i === stairs.length - 1 && (
                      <span
                        aria-hidden
                        className="stair-text absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-sun text-navy"
                        style={{ transitionDelay: `${0.4 + i * 0.2}s` } as CSSProperties}
                      >
                        <ArrowUpRight className="h-5 w-5" />
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ol>
            <GrowthCurve />
          </div>
        </div>
      </div>
      <Wave shape="ripple" flip back="text-frost" front="text-ice" className="-mb-px" />
    </section>
  );
}
