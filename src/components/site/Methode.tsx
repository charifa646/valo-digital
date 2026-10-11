import type { CSSProperties } from "react";
import { methode } from "@/lib/content";
import { ArrowUpRight } from "@/components/ui/Icons";
import { GrowthCurve } from "./GrowthCurve";
import { FlecheMethode } from "./FlecheMethode";
import { Filigrane } from "@/components/ui/Filigrane";
import { Words, count } from "@/components/ui/Words";

/**
 * Each step is a stair, higher and bluer than the one before; on a phone the same colours serve the points. The stairs
 * rise by a little more each time (46, 70, 98 px, not 82 each time as before): the growth curve above them, through a
 * point over each, then bends upward, as growth does, instead of running as a straight line (Charifa, 12 October 2026:
 * « la courbe sur ordinateur est linéaire, on peut faire une courbe pas linéaire »).
 */
const stairs = [
  { h: "md:h-[116px]", fill: "bg-frost", ink: "text-electric" },
  { h: "md:h-[162px]", fill: "bg-[#C9D3FF]", ink: "text-electric" },
  { h: "md:h-[232px]", fill: "bg-azure", ink: "text-white" },
  { h: "md:h-[330px]", fill: "bg-electric", ink: "text-white" },
];

/**
 * « Une méthode simple. Des actions concrètes. »: the four steps climb like a
 * staircase, each verb standing on its own stair. When it comes on screen the
 * stairs rise one after the other, then the words step onto them, then a
 * growth curve draws itself above them. On phones the four steps are four numbered points standing at the two edges in
 * turn, the words under each, and a wide dotted arc goes from point to point (`FlecheMethode.tsx`). History: the
 * staircase that slid sideways showed only two steps, the second cut at the edge (8 October 2026); stacked bars, then
 * points winding down the left with a solid curve came next; Charifa asked for « une flèche en courbe qui passe d'un
 * point à un autre » on 11 October, was shown « de larges arcs en pointillés qui sautent d'un bord de l'écran à
 * l'autre » on 12 October and chose them.
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

        {/* phones, the other way: the points at the two edges in turn, the words under each, a wide dotted arc from point to point */}
        <div data-reveal className="relative mt-10 md:hidden">
          <FlecheMethode />
          <ol className="relative">
            {methode.steps.map((s, i) => (
              <li key={s.n} className={`relative ${i < stairs.length - 1 ? "min-h-[136px]" : ""}`}>
                <span
                  data-point
                  className={`absolute top-0 grid h-11 w-11 place-items-center rounded-full ${i % 2 ? "right-0" : "left-0"} ${stairs[i].fill} ${stairs[i].ink} shadow-[0_8px_18px_-8px_rgba(7,20,216,.45)]`}
                >
                  <span
                    className="stair-text text-[15px] font-bold leading-none tracking-[-0.02em]"
                    style={{ transitionDelay: `${0.2 + i * 0.85}s` } as CSSProperties}
                  >
                    {s.n}
                  </span>
                </span>
                <div
                  className={`stair-text w-[74%] pt-[64px] ${i % 2 ? "ml-auto text-right" : ""}`}
                  style={{ transitionDelay: `${0.25 + i * 0.85}s` } as CSSProperties}
                >
                  <h3 className="text-[15px] font-bold tracking-[0.06em] text-ink">{s.name}</h3>
                  <p className="pretty mt-1.5 text-[14.5px] font-medium leading-relaxed text-body">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* tablets and computers: the staircase and its growth curve */}
        <div className="mt-4 hidden md:block">
          {/* room above the stairs for the growth curve, which climbs higher at its end */}
          <div data-reveal className="relative pt-[140px]">
            <ol className="grid grid-cols-4 items-end gap-3">
              {methode.steps.map((s, i) => (
                <li key={s.n} className="flex flex-col">
                  <div data-step className="stair-text flex min-h-[120px] flex-col justify-end pb-4 pr-4" style={{ transitionDelay: `${0.45 + i * 0.2}s` } as CSSProperties}>
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
                      className={`stair-text relative text-[68px] font-bold leading-none tracking-[-0.05em] ${stairs[i].ink}`}
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
    </section>
  );
}
