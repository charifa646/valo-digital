import type { CSSProperties } from "react";
import { methode } from "@/lib/content";

/**
 * « Une méthode simple. Des actions concrètes. »: the four steps on one line.
 * When the line arrives on screen it draws itself from step to step and each
 * number lights up in turn, the way the method is followed. Upright on phones.
 */
export function Methode() {
  return (
    <section id="methode" aria-labelledby="methode-title" className="relative bg-white">
      <div className="gutter mx-auto max-w-page py-24 lg:py-32">
        <div className="text-center">
          <p className="tag">{methode.label}</p>
          <h2 id="methode-title" data-reveal className="h2 mt-5 text-ink">
            <span className="block">{methode.title[0]}</span>
            <span className="block text-electric">{methode.title[1]}</span>
          </h2>
        </div>

        <ol data-reveal className="relative mx-auto mt-14 grid max-w-[1080px] gap-10 lg:mt-20 lg:grid-cols-4 lg:gap-6">
          {methode.steps.map((s, i) => (
            <li key={s.n} className="relative grid grid-cols-[48px_1fr] gap-5 lg:block">
              {i < methode.steps.length - 1 && (
                <span
                  aria-hidden
                  className="absolute bottom-[-28px] left-6 top-[60px] w-px bg-hair lg:bottom-auto lg:left-[60px] lg:right-[-12px] lg:top-6 lg:h-px lg:w-auto"
                >
                  <span className="step-line absolute inset-0 bg-electric" style={{ transitionDelay: `${0.45 + i * 0.55}s` } as CSSProperties} />
                </span>
              )}
              <span
                className="step-dot relative z-[1] grid h-12 w-12 place-items-center rounded-full border text-[15px] font-bold tracking-[-0.02em]"
                style={{ transitionDelay: `${0.2 + i * 0.55}s` } as CSSProperties}
              >
                {s.n}
              </span>
              <div className="pt-2.5 lg:pt-6">
                <h3 className="text-[15px] font-bold tracking-[0.06em] text-ink">{s.name}</h3>
                <p className="pretty mt-2 max-w-[24rem] text-[15px] font-medium leading-relaxed text-body">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
