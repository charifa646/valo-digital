"use client";

import Image from "next/image";
import { Fragment } from "react";
import { formations } from "@/lib/content";
import { useSheet } from "./Sheet";
import { BtnInner, btn } from "@/components/ui/Action";
import { ArrowRight } from "@/components/ui/Icons";
import { Edge } from "@/components/ui/Edge";

export function Formations() {
  const { open } = useSheet();

  return (
    <section id="formations" aria-labelledby="formations-title" className="relative pt-28 sm:pt-36">
      <div data-dark className="on-dark relative isolate text-white">
        {/* night blue, lit from the top, the columns of light */}
        <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden rounded-[inherit]">
          <div className="absolute inset-0 bg-[radial-gradient(95%_70%_at_50%_0%,#2238ff_0%,#0714d8_22%,#040b52_62%,#02062e_100%)]" />
          <div className="curtain opacity-50 [mask-image:radial-gradient(80%_60%_at_50%_0%,#000_20%,transparent_75%)] [-webkit-mask-image:radial-gradient(80%_60%_at_50%_0%,#000_20%,transparent_75%)]" />
        </div>

        {/* the bite out of the top, and the chart rising from it */}
        <div aria-hidden className="absolute left-1/2 top-[-1px] h-[96px] w-[192px] -translate-x-1/2 rounded-b-full bg-ice sm:h-[124px] sm:w-[248px]" />
        <div className="absolute left-1/2 top-[-118px] w-[148px] -translate-x-[54%] sm:top-[-152px] sm:w-[188px]">
          <div>
            <div className="float [--t:7s]">
              <Image
                src="/images/v3/bars.webp"
                alt=""
                width={875}
                height={1125}
                sizes="188px"
                className="h-auto w-full drop-shadow-[0_28px_36px_rgba(2,6,46,.4)]"
              />
            </div>
          </div>
        </div>

        <div className="relative px-5 pb-24 pt-[128px] text-center sm:px-10 sm:pb-32 sm:pt-[168px] lg:px-16 lg:pb-40">
          <p className="label inline-flex rounded-full border border-white/20 bg-white/[0.08] px-4 py-2.5 text-white">{formations.label}</p>
          <h2
            id="formations-title"
            data-words
            className="balance mx-auto mt-7 max-w-[13ch] text-[clamp(2.5rem,7.4vw,6rem)] font-extrabold leading-[0.98] tracking-[-0.05em] sm:max-w-none"
          >
            {formations.title.map((w, i) => (
              <Fragment key={w}>
                <span style={{ ["--i" as string]: i } as React.CSSProperties} className={`inline-block ${i === 2 ? "text-sun" : ""}`}>
                  {w}
                </span>{" "}
              </Fragment>
            ))}
          </h2>
          <p data-reveal className="pretty mx-auto mt-6 max-w-[34rem] text-[16px] font-medium leading-relaxed text-white/70 sm:text-[18px]">
            {formations.lead}
          </p>

          <ul className="mx-auto mt-12 grid max-w-[1100px] gap-2.5 text-left md:grid-cols-2 md:gap-x-4 lg:mt-14">
            {formations.items.map((f, i) => (
              <li key={f.id} data-reveal style={{ ["--d" as string]: `${(i % 4) * 0.05}s` } as React.CSSProperties}>
                <button
                  type="button"
                  onClick={() => open("formations", f.id)}
                  aria-haspopup="dialog"
                  className="group flex w-full items-center justify-between gap-4 rounded-[10px] border border-white/10 bg-white/[0.045] px-5 py-4 text-left transition duration-300 hover:border-white/25 hover:bg-white/[0.1] sm:px-6 sm:py-5"
                >
                  <span className="min-w-0">
                    <span className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                      <span className="text-[16px] font-bold leading-snug tracking-[-0.01em] sm:text-[17.5px]">{f.name}</span>
                      {f.tag && <span className="rounded-full bg-sun px-2.5 py-[5px] text-[11.5px] font-extrabold leading-none text-navy">{f.tag}</span>}
                    </span>
                    <span className="mt-1 block text-[14.5px] font-bold text-[#c8d2ff] sm:hidden">{f.price}</span>
                  </span>
                  <span className="flex shrink-0 items-center gap-3">
                    <span className="hidden text-right text-[15.5px] font-bold text-[#c8d2ff] sm:block">{f.price}</span>
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-white/10 transition duration-300 group-hover:bg-white group-hover:text-electric">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-10 lg:mt-12">
            <button type="button" onClick={() => open("formations")} aria-haspopup="dialog" className={btn("line")}>
              <BtnInner>{formations.cta}</BtnInner>
            </button>
          </div>
        </div>
        <Edge variant="steps" className="absolute inset-x-0 -bottom-px text-ice" />
      </div>
    </section>
  );
}
