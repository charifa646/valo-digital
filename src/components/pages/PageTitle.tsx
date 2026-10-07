import type { CSSProperties } from "react";

/**
 * The top of a page of its own (« Services », « Formations »): its name from the menu, very large, rising into view
 * the way RNO1 opens its pages, and nothing else. The sections below say the rest.
 */
export function PageTitle({ title }: { title: string }) {
  return (
    <section id="top" aria-labelledby="page-title" className="paper relative overflow-hidden">
      <div className="gutter mx-auto max-w-page pb-6 pt-[124px] sm:pt-[148px] lg:pb-8 lg:pt-[176px]">
        <h1 id="page-title" className="text-[clamp(3.5rem,0.9rem+11.5vw,10.5rem)] font-semibold leading-[0.92] tracking-[-0.055em] text-electric">
          <span className="line-mask">
            <span className="rise" style={{ ["--d" as string]: "0.1s" } as CSSProperties}>
              {title}
            </span>
          </span>
        </h1>
      </div>
    </section>
  );
}
