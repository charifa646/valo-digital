"use client";

import Image from "next/image";
import { useRef, type CSSProperties } from "react";
import { LazyMotion, domAnimation, m, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { pourquoi } from "@/lib/content";
import { Bolt, Check, Compass, Trend } from "@/components/ui/Icons";

function Word({ word, i, n, progress }: { word: string; i: number; n: number; progress: MotionValue<number> }) {
  const start = (i / n) * 0.7;
  const opacity = useTransform(progress, [start, start + 0.3], [0.18, 1]);
  return (
    <m.span style={{ opacity }} className="inline-block">
      {word}
    </m.span>
  );
}

/** The three pillars, each with its little scene. */
function PillarScene({ i }: { i: number }) {
  if (i === 0)
    return (
      <div className="relative grid h-full place-items-center">
        <span className="absolute h-[104px] w-[104px] rounded-full border border-white/15" />
        <span className="absolute h-[70px] w-[70px] rounded-full border border-white/20" />
        <span data-anim className="absolute h-[104px] w-[104px] rounded-full" style={{ animation: "spin 7s linear infinite" }}>
          <span className="absolute -top-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-sun" />
        </span>
        <span className="grid h-12 w-12 place-items-center rounded-[16px] bg-electric text-white shadow-glow">
          <Compass className="h-6 w-6" />
        </span>
      </div>
    );
  if (i === 1)
    return (
      <div className="grid h-full content-center gap-2.5 px-6">
        {[0.9, 0.7, 0.55].map((w, k) => (
          <div key={k} className="flex items-center gap-3">
            <span
              data-anim
              className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-electric text-white"
              style={{ animation: "pop-in .6s var(--ease) both", animationDelay: `${0.3 + k * 0.35}s` }}
            >
              <Check className="h-3.5 w-3.5" />
            </span>
            <span className="h-2.5 overflow-hidden rounded-full bg-white/10" style={{ width: `${w * 100}%` }}>
              <span
                data-anim
                className="block h-full origin-left rounded-full bg-white/60"
                style={{ animation: "grow-x 1s var(--ease) both", animationDelay: `${0.2 + k * 0.35}s` }}
              />
            </span>
          </div>
        ))}
      </div>
    );
  return (
    <div className="flex h-full items-end justify-center gap-2 pb-5">
      {[26, 38, 34, 52, 64, 84].map((h, k) => (
        <span
          key={k}
          data-anim
          className={`w-5 origin-bottom rounded-t-[8px] rounded-b-[4px] ${k === 5 ? "bg-sun" : k === 4 ? "bg-white" : "bg-white/25"}`}
          style={{ height: `${h}%`, animation: "grow-y 1.1s var(--ease) both", animationDelay: `${0.2 + k * 0.09}s` }}
        />
      ))}
    </div>
  );
}

const pillarIcons = [Compass, Bolt, Trend];

export function Pourquoi() {
  const panel = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: panel, offset: ["start 75%", "start 5%"] });
  const lit = useTransform(scrollYProgress, (v) => (reduce ? 1 : v));
  const floatY = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 80, reduce ? 0 : -40]);
  const words = pourquoi.title.split(" ");

  return (
    <LazyMotion features={domAnimation} strict>
      <section id="pourquoi" aria-labelledby="pourquoi-title" className="relative px-[var(--frame)]">
        <div ref={panel} data-dark className="on-dark relative isolate overflow-hidden rounded-[30px] bg-abyss text-white sm:rounded-[44px]">
          {/* space: the stars, the beams rising from below */}
          <div aria-hidden className="absolute inset-0 -z-10">
            <div className="dots-dark absolute inset-0 opacity-70" />
            <div className="absolute inset-x-0 bottom-0 h-[70%] bg-[radial-gradient(70%_90%_at_50%_100%,rgba(53,81,255,.75)_0%,rgba(7,20,216,.35)_40%,transparent_75%)]" />
            <div className="curtain opacity-60" />
            <div className="grain" />
          </div>

          {/* the monogram, turned the other way, drifting (computers and tablets) */}
          <div aria-hidden className="pointer-events-none absolute -right-16 top-24 hidden w-[330px] rotate-[8deg] md:block lg:-right-10 lg:w-[400px]">
            <m.div style={{ y: floatY }}>
              <Image
                src="/images/v3/vd-alt.webp"
                alt=""
                width={1300}
                height={1146}
                sizes="400px"
                className="h-auto w-full opacity-90 drop-shadow-[0_40px_60px_rgba(0,0,0,.5)]"
              />
            </m.div>
          </div>

          <div className="relative mx-auto max-w-page px-5 pb-16 pt-20 sm:px-10 sm:pb-20 sm:pt-28 lg:px-16 lg:pb-24">
            <p className="label glass-dark inline-flex items-center gap-2.5 rounded-full py-2 pl-4 pr-2 text-white">
              {pourquoi.label.slice(0, pourquoi.label.lastIndexOf(" "))}{" "}
              <span className="rounded-full bg-sun px-2.5 py-1.5 text-navy">{pourquoi.label.slice(pourquoi.label.lastIndexOf(" ") + 1)}</span>
            </p>
            <h2 id="pourquoi-title" className="balance mt-8 max-w-[15ch] text-[clamp(2.4rem,6.6vw,5.4rem)] font-extrabold leading-[1.02] tracking-[-0.05em]">
              {words.map((w, i) => (
                <span key={i}>
                  <Word word={w} i={i} n={words.length} progress={lit} />{" "}
                </span>
              ))}
            </h2>
            <p data-reveal className="pretty mt-7 max-w-[34rem] text-[17px] font-medium leading-relaxed text-white/75 sm:text-[19px]">
              {pourquoi.lead}
            </p>

            <div className="mt-14 grid gap-4 md:grid-cols-3 lg:mt-20 lg:gap-5">
              {pourquoi.pillars.map((p, i) => {
                const Icon = pillarIcons[i];
                return (
                  <article
                    key={p.name}
                    data-reveal
                    style={{ ["--d" as string]: `${i * 0.12}s` } as CSSProperties}
                    className={`play-when-in glass-dark relative overflow-hidden rounded-[28px] p-2.5 ${i === 1 ? "md:translate-y-8" : ""}`}
                  >
                    <div className="relative h-[150px] overflow-hidden rounded-[22px] bg-white/[0.05]">
                      <PillarScene i={i} />
                    </div>
                    <div className="px-4 pb-5 pt-5 sm:px-5">
                      <h3 className="flex items-center gap-2.5 text-[18px] font-extrabold tracking-[0.02em]">
                        <Icon className="h-5 w-5 text-[#c8d2ff]" />
                        {p.name}
                      </h3>
                      <p className="pretty mt-2.5 text-[15px] font-medium leading-relaxed text-white/70">{p.text}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
