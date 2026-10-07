"use client";

import type { CSSProperties } from "react";
import { details, solutions } from "@/lib/content";
import { DemandeButton, useSheet } from "./Sheet";
import { Words } from "@/components/ui/Words";
import { BtnInner, btn } from "@/components/ui/Action";
import { ArrowUpRight, Compass, Scan, Video } from "@/components/ui/Icons";
import { Price } from "@/components/ui/Price";

const icons = { diagnostic: Scan, accompagnement: Compass, "content-video": Video } as const;

/**
 * « Besoin d'un accompagnement plus ciblé ? »: the title stays put on the left
 * while the three solutions go by on the right, each with its price from the
 * catalogue. The full one, the accompaniment, is the blue one.
 */
export function Solutions() {
  const { open } = useSheet();

  return (
    <section id="solutions" aria-labelledby="solutions-title" className="paper halo-bl relative isolate">
      <div className="gutter mx-auto grid max-w-page gap-10 py-24 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16 lg:py-32">
        <div className="lg:sticky lg:top-[calc(var(--header)+40px)] lg:self-start">
          <p data-reveal="rule" className="tag">
            {solutions.label}
          </p>
          <h2 id="solutions-title" data-reveal="words" className="h2 balance mt-5 max-w-[14ch] text-ink">
            <Words>{solutions.title}</Words>
          </h2>
          <div className="mt-8">
            <DemandeButton className={btn("electric")}>
              <BtnInner>{solutions.cta}</BtnInner>
            </DemandeButton>
          </div>
        </div>

        <ol className="grid gap-3 sm:gap-4">
          {solutions.items.map((s, i) => {
            const lead = s.id === "accompagnement";
            const Icon = icons[s.id as keyof typeof icons];
            const price = details[s.sheet as keyof typeof details]?.price;
            return (
              <li
                key={s.id}
                id={s.id}
                data-pulse
                data-reveal="slide"
                style={{ ["--d" as string]: `${i * 0.12}s` } as CSSProperties}
                className={`group relative grid gap-5 rounded-2xl p-6 transition duration-300 sm:grid-cols-[auto_1fr] sm:gap-6 sm:p-7 lg:p-8 ${
                  lead
                    ? "bg-[linear-gradient(160deg,#3551FF_0%,#0714D8_50%,#0A12A8_100%)] text-white shadow-[0_24px_48px_-28px_rgba(7,20,216,.55)]"
                    : "border border-hair bg-white text-ink hover:border-electric/25 hover:shadow-panel"
                }`}
              >
                <span className={`grid h-12 w-12 place-items-center rounded-full ${lead ? "bg-white/15 text-white" : "bg-frost text-electric"}`}>
                  <Icon className="h-[22px] w-[22px]" />
                </span>
                <div className="min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-[15.5px] font-bold leading-snug tracking-[0.05em] sm:text-[16.5px]">
                      <button
                        type="button"
                        onClick={() => open(s.sheet)}
                        aria-haspopup="dialog"
                        className="text-left after:absolute after:inset-0 after:rounded-2xl"
                      >
                        {s.name}
                      </button>
                    </h3>
                    <span
                      aria-hidden
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition duration-300 group-hover:rotate-45 ${
                        lead
                          ? "border-white bg-white text-electric"
                          : "border-hair text-ink group-hover:border-electric group-hover:bg-electric group-hover:text-white"
                      }`}
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                  <p className={`pretty mt-2 max-w-[34rem] text-[15px] font-medium leading-relaxed ${lead ? "text-white/80" : "text-body"}`}>{s.text}</p>
                  {price && (
                    <div className={`mt-5 border-t pt-4 ${lead ? "border-white/20" : "border-hair"}`}>
                      <Price price={price} light={lead} size="sm" />
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
