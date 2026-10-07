import Image from "next/image";
import type { CSSProperties } from "react";
import { figures, figuresPhoto, type KeyFigure } from "@/lib/content";
import { Counter } from "@/components/ui/Counter";

/**
 * The three key figures, laid out after « Stats Bento » (uilayout.contact, 21st.dev), the layout the client chose on
 * 7 October 2026, with the photo of a full lecture hall in the large card, as in « Feature Bento »: « +1 000 »
 * entrepreneurs on the real training, the two other figures in a white tile and a pale blue one beside it. The
 * figures count up once on screen.
 */
const [formes, projets, budgets] = figures;

const delay = (d: number) => ({ ["--d" as string]: `${d}s` }) as CSSProperties;

function Num({ f }: { f: KeyFigure }) {
  return <Counter value={f.value} to={f.count} prefix={f.prefix} suffix={f.suffix} />;
}

export function Chiffres({ className = "" }: { className?: string }) {
  return (
    <div className={`grid gap-4 lg:grid-cols-6 lg:grid-rows-2 ${className}`}>
      <div
        data-reveal="photo"
        className="group relative min-h-[340px] overflow-hidden rounded-2xl bg-night text-white sm:min-h-[380px] lg:col-span-3 lg:row-span-2"
      >
        <Image
          src={figuresPhoto.src}
          alt={figuresPhoto.alt}
          fill
          sizes="(min-width: 1024px) 540px, 92vw"
          className="object-cover transition duration-700 [transition-timing-function:var(--ease)] group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,11,82,0)_25%,rgba(4,11,82,.55)_58%,rgba(4,11,82,.92)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
          <span className="inline-flex rounded-full bg-sun px-3 py-1.5 text-[12px] font-bold leading-none tracking-[0.04em] text-navy">{formes.note}</span>
          <p className="mt-4 text-[clamp(3.4rem,2.4rem+3.4vw,5.4rem)] font-medium leading-[0.9] tracking-[-0.055em]">
            <Num f={formes} />
          </p>
          <p className="mt-3 text-[13px] font-semibold uppercase tracking-[0.16em] text-white/85">{formes.label}</p>
        </div>
      </div>
      <div data-reveal style={delay(0.15)} className="flex flex-col justify-center gap-3 rounded-2xl border border-hair bg-white p-7 sm:p-8 lg:col-span-3">
        <p className="text-[clamp(2.4rem,1.9rem+1.6vw,3.2rem)] font-medium leading-none tracking-[-0.045em] text-ink">
          <Num f={budgets} />
        </p>
        <p className="max-w-[28rem] text-[12px] font-semibold uppercase leading-relaxed tracking-[0.16em] text-mute">{budgets.label}</p>
      </div>
      <div data-reveal style={delay(0.25)} className="flex items-center gap-6 rounded-2xl bg-frost p-7 sm:p-8 lg:col-span-3">
        <p className="text-[clamp(2.4rem,1.9rem+1.6vw,3.2rem)] font-medium leading-none tracking-[-0.045em] text-electric">
          <Num f={projets} />
        </p>
        <p className="text-[12px] font-semibold uppercase leading-relaxed tracking-[0.16em] text-navy/70">{projets.label}</p>
      </div>
    </div>
  );
}
