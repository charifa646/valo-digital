import type { CSSProperties } from "react";
import { methode } from "@/lib/content";
import { Monogram } from "@/components/brand/Logo";

/**
 * « Une méthode simple. Des actions concrètes. »: the four steps around the
 * monogram, linked by dotted lines, lit in turn like a loop that never stops.
 * On phones they simply follow each other.
 */
const place = ["lg:col-start-1 lg:row-start-1", "lg:col-start-3 lg:row-start-1", "lg:col-start-3 lg:row-start-2", "lg:col-start-1 lg:row-start-2"];

export function Methode() {
  return (
    <section id="methode" aria-labelledby="methode-title" className="relative overflow-hidden">
      <div
        aria-hidden
        className="dots absolute inset-0 -z-10 [-webkit-mask-image:radial-gradient(65%_60%_at_50%_58%,#000_20%,transparent_80%)] [mask-image:radial-gradient(65%_60%_at_50%_58%,#000_20%,transparent_80%)]"
      />
      <div className="gutter mx-auto max-w-page py-24 lg:py-32">
        <div className="text-center">
          <p className="label inline-flex rounded-full border-[1.5px] border-dashed border-electric/40 bg-white/60 px-4 py-2.5 text-electric">
            {methode.label}
          </p>
          <h2 id="methode-title" data-reveal className="h2 mt-6 text-ink">
            <span className="block">{methode.title[0]}</span>
            <span className="block text-electric">{methode.title[1]}</span>
          </h2>
        </div>

        <ol className="relative mt-14 grid gap-4 lg:mt-20 lg:grid-cols-[1fr_240px_1fr] lg:grid-rows-2 lg:gap-x-12 lg:gap-y-8">
          {/* the monogram and its dotted lines (computers) */}
          <li aria-hidden className="relative hidden lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:grid lg:place-items-center">
            <svg
              className="absolute -inset-x-12 inset-y-0 h-full w-[calc(100%+96px)] overflow-visible"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              fill="none"
            >
              {[
                [0, 25],
                [100, 25],
                [100, 75],
                [0, 75],
              ].map(([x, y], i) => (
                <line
                  key={i}
                  x1="50"
                  y1="50"
                  x2={x}
                  y2={y}
                  stroke="#3551FF"
                  strokeOpacity=".45"
                  strokeWidth="1.6"
                  strokeDasharray="4 6"
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </svg>
            <span
              data-anim
              className="absolute h-[210px] w-[210px] rounded-full border-[1.5px] border-dashed border-electric/25"
              style={{ animation: "spin 40s linear infinite" }}
            />
            <span className="glass relative grid h-[150px] w-[150px] place-items-center rounded-2xl">
              <span className="absolute inset-3 rounded-[10px] bg-gradient-to-br from-electric to-night shadow-glow" />
              <Monogram className="relative h-11 w-auto text-white" />
            </span>
          </li>

          {methode.steps.map((s, i) => (
            <li
              key={s.n}
              data-reveal
              style={{ ["--d" as string]: `${i * 0.1}s` } as CSSProperties}
              className={`glass relative overflow-hidden rounded-2xl p-6 sm:p-8 ${place[i]}`}
            >
              {/* the light passes from step to step */}
              <span
                aria-hidden
                data-anim
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 shadow-[inset_0_0_0_2px_#3551ff,0_30px_60px_-30px_rgba(7,20,216,.55)]"
                style={{ animation: "cycle 10s ease-in-out infinite", animationDelay: `${i * 2.5}s` }}
              />
              <div className="relative flex items-start gap-5">
                <span className="relative grid h-14 w-14 shrink-0 place-items-center rounded-[10px] bg-frost text-[20px] font-extrabold tracking-[-0.03em] text-electric">
                  {s.n}
                  <span
                    aria-hidden
                    data-anim
                    className="absolute inset-0 grid place-items-center rounded-[10px] bg-electric text-white opacity-0 shadow-glow"
                    style={{ animation: "cycle 10s ease-in-out infinite", animationDelay: `${i * 2.5}s` }}
                  >
                    {s.n}
                  </span>
                </span>
                <div className="relative">
                  <h3 className="text-[19px] font-extrabold tracking-[-0.01em] text-ink mix-blend-normal sm:text-[21px]">{s.name}</h3>
                  <p className="pretty mt-2 text-[15.5px] font-medium leading-relaxed text-body">{s.text}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
