import type { CSSProperties } from "react";
import { methode } from "@/lib/content";
import { ArrowUpRight } from "@/components/ui/Icons";
import { GrowthCurve } from "./GrowthCurve";
import { Filigrane } from "@/components/ui/Filigrane";
import { Words, count } from "@/components/ui/Words";
import { WaveSpace } from "@/components/ui/Wave";

/** Each step is a stair, a little higher and a little bluer than the one before. */
const stairs = [
  { h: "h-[76px] md:h-[150px]", w: "w-[46%]", fill: "bg-frost", ink: "text-electric" },
  { h: "h-[76px] md:h-[232px]", w: "w-[64%]", fill: "bg-[#C9D3FF]", ink: "text-electric" },
  { h: "h-[76px] md:h-[314px]", w: "w-[82%]", fill: "bg-azure", ink: "text-white" },
  { h: "h-[76px] md:h-[396px]", w: "w-full", fill: "bg-electric", ink: "text-white" },
];

/**
 * « Une méthode simple. Des actions concrètes. »: the four steps climb like a
 * staircase, each verb standing on its own stair. When it comes on screen the
 * stairs rise one after the other, then the words step onto them, then a
 * growth curve draws itself above them. On phones the four steps are stacked, each stair a longer bar than the one
 * before (8 October 2026: the staircase that slid sideways showed only two steps, the second cut at the edge, and
 * nothing said the others were there).
 */
export function Methode() {
  return (
    <section id="methode" aria-labelledby="methode-title" className="paper relative bg-white">
      <Filigrane word={methode.filigrane} className="-left-[0.04em] top-[0.15em] md:-right-[0.06em] md:left-auto" />
      <div className="gutter mx-auto max-w-page pb-14 pt-24 lg:pb-20 lg:pt-32">
        <div className="max-w-[40rem]">
          <h2 id="methode-title" data-reveal="words" className="h2 text-ink">
            <span className="block">
              <Words>{methode.title[0]}</Words>
            </span>
            <span className="block text-electric">
              <Words from={count(methode.title[0])}>{methode.title[1]}</Words>
            </span>
          </h2>
        </div>

        <div className="mt-8 md:mt-4">
          {/* room above the stairs for the growth curve */}
          <div data-reveal className="relative md:pt-[96px]">
            <ol className="flex flex-col gap-7 md:grid md:grid-cols-4 md:items-end md:gap-3">
              {methode.steps.map((s, i) => (
                <li key={s.n} className="flex flex-col">
                  <div data-step className="stair-text pb-4 pr-4" style={{ transitionDelay: `${0.45 + i * 0.2}s` } as CSSProperties}>
                    <h3 className="text-[15px] font-bold tracking-[0.06em] text-ink">{s.name}</h3>
                    <p className="pretty mt-1.5 text-[14.5px] font-medium leading-relaxed text-body">{s.text}</p>
                  </div>
                  <div className={`relative flex items-end p-5 ${stairs[i].h} ${stairs[i].w} md:w-auto`}>
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
            <div className="hidden md:contents">
              <GrowthCurve />
            </div>
          </div>
        </div>
      </div>
      <WaveSpace />
    </section>
  );
}
