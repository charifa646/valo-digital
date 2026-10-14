import Image from "next/image";
import type { CSSProperties } from "react";
import { figures, figuresBloc } from "@/lib/content";
import { Counter } from "@/components/ui/Counter";

/**
 * The three key figures as Wpromote shows its own (« Bold moves pay off », Charifa's choice of 7 October 2026): one
 * block in VALO's night blue with square corners, a short title and a sentence, then the figures large and light, their
 * « + » in colour and what they count written plainly underneath, the years on their own line. The figures count up
 * once on screen.
 *
 * `premium` (the premium pass of 13 October 2026, at /apercu/premium): the same words in a light bento that belongs to
 * the page instead of a dark block laid on it: the title and its sentence over a real photo of a VALO training, the
 * first two figures in white cells with a fine border, the third across a cell in the charte's electric blue, the one
 * coloured moment of the section. The title keeps its words; only its capitals are set as a sentence. `teinte`: the page
 * still turns night blue while it holds the screen (on the homepage since 13 October 2026, Charifa: keep the change of
 * colour), the light cells standing out on it.
 */
const plus = ["text-sun", "text-[#8FA3FF]", "text-sun"];

export function Chiffres({ className = "", premium = false, teinte = false }: { className?: string; premium?: boolean; teinte?: boolean }) {
  if (premium) {
    return (
      <div data-reveal data-teinte={teinte ? "nuit" : undefined} className={`grid gap-3 sm:gap-4 lg:grid-cols-12 lg:gap-5 ${className}`}>
        <div className="flex flex-col rounded-lg border border-hair bg-white p-6 sm:p-8 lg:col-span-5">
          <p className="text-[clamp(1.45rem,1.1rem+1.1vw,2.1rem)] font-semibold lowercase leading-[1.1] tracking-[-0.025em] text-ink first-letter:uppercase">
            {figuresBloc.title}
          </p>
          <p className="pretty mt-4 max-w-[26rem] text-[15.5px] font-medium leading-relaxed text-body">{figuresBloc.text}</p>
          <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-md bg-soft lg:mt-auto">
            <Image
              src="/images/terrain/universite-ki-zerbo.webp"
              alt=""
              fill
              sizes="(min-width: 1024px) 420px, 92vw"
              className="object-cover"
            />
          </div>
        </div>
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:col-span-7 lg:gap-5">
          {figures.map((f, i) => {
            const fort = i === 2;
            return (
              <li
                key={f.label}
                style={{ ["--d" as string]: `${0.1 + i * 0.12}s` } as CSSProperties}
                // the first two figures stand on the page with no card behind them, a fine line under the row separating them from the
                // budget in blue (14 October 2026, Charifa: « enlève le background, fais une ligne entre la rangée et le budget »)
                className={`flex min-h-[150px] flex-col justify-between p-5 sm:min-h-[190px] sm:p-8 lg:min-h-[230px] ${
                  fort ? "col-span-2 mt-1 rounded-lg bg-electric text-white sm:mt-2" : "border-b border-[#CDD5F0] pl-1 sm:pl-2"
                }`}
              >
                {/* the ink set on the figure, inside its white cell: when the page turns night blue, the page's rule turns
                    every dark text white except inside a white cell (the cell itself would have turned it white on white) */}
                <p className={`whitespace-nowrap text-[clamp(2rem,1.2rem+3.6vw,4.6rem)] font-light leading-none tracking-[-0.045em] tabular-nums ${fort ? "" : "text-ink"}`}>
                  <span className={fort ? "text-sun" : "text-electric"}>{f.prefix}</span>
                  <Counter value={f.value.slice(f.prefix.length)} to={f.count} suffix={f.suffix} />
                </p>
                <p className={`mt-5 text-[14px] font-medium leading-snug sm:mt-6 sm:text-[14.5px] ${fort ? "text-white/85" : "text-body"}`}>
                  {f.caption}
                  {f.note && <span className={`block whitespace-nowrap ${fort ? "text-white/60" : "text-mute"}`}>{f.note}</span>}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  return (
    <div data-reveal data-teinte="nuit" className={`bg-night px-6 py-12 text-white sm:px-12 sm:py-14 lg:px-16 lg:py-16 ${className}`}>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <div>
          <p className="text-[clamp(1.35rem,1.05rem+1vw,1.9rem)] font-extrabold leading-[1.05] tracking-[-0.01em]">{figuresBloc.title}</p>
          <p className="pretty mt-4 max-w-[24rem] text-[15px] font-medium leading-relaxed text-white/75">{figuresBloc.text}</p>
        </div>
        <ul className="grid grid-cols-2 gap-x-8 gap-y-10 lg:gap-x-12 lg:gap-y-12">
          {figures.map((f, i) => (
            <li key={f.label} className={i === 2 ? "col-span-2" : ""} style={{ ["--d" as string]: `${0.1 + i * 0.12}s` } as CSSProperties}>
              <p className="whitespace-nowrap text-[clamp(2.5rem,1.7rem+3.2vw,4.4rem)] font-light leading-none tracking-[-0.035em]">
                <span className={plus[i]}>{f.prefix}</span>
                <Counter value={f.value.slice(f.prefix.length)} to={f.count} suffix={f.suffix} />
              </p>
              <p className="mt-3 text-[14px] font-medium leading-snug text-white/80">
                {f.caption}
                {f.note && <span className="block whitespace-nowrap text-white/55">{f.note}</span>}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
