import type { CSSProperties } from "react";
import { figures, figuresBloc } from "@/lib/content";
import { Counter } from "@/components/ui/Counter";

/**
 * The three key figures as Wpromote shows its own (« Bold moves pay off », Charifa's choice of 7 October 2026): one
 * block in VALO's night blue with square corners, a short title and a sentence, then the figures large and light, their
 * « + » in colour and what they count written plainly underneath, the years on their own line. The figures count up
 * once on screen.
 */
const plus = ["text-sun", "text-[#8FA3FF]", "text-sun"];

export function Chiffres({ className = "" }: { className?: string }) {
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
