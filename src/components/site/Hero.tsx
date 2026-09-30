"use client";

import Image from "next/image";
import { useRef, type CSSProperties } from "react";
import { LazyMotion, domAnimation, m, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { hero } from "@/lib/content";
import { hello, wa } from "@/lib/links";
import { BtnInner, btn } from "@/components/ui/Action";
import { Cap, Cart, Megaphone, Target } from "@/components/ui/Icons";

const icons = [Megaphone, Target, Cart, Cap];

/** Where the four words float around the logo, on phones and on computers. */
const spots = [
  "left-[3%] top-[1%] sm:left-[6%] sm:top-[14%] [--r:-6deg] [--t:7s]",
  "left-[5%] bottom-[2%] sm:left-[13%] sm:bottom-[10%] [--r:4deg] [--t:8.5s] [--fd:-2s]",
  "right-[3%] top-[5%] sm:right-[7%] sm:top-[8%] [--r:5deg] [--t:7.8s] [--fd:-4s]",
  "right-[4%] bottom-[6%] sm:right-[12%] sm:bottom-[16%] [--r:-4deg] [--t:9s] [--fd:-1s]",
];

export function Hero() {
  const reduce = useReducedMotion();
  const section = useRef<HTMLElement>(null);

  // scrolling away: the stage rises a little slower and fades
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end start"] });
  const stageY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 140]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 70]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, reduce ? 1 : 0.15]);

  // the pointer tilts the logo (computers only)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 14 });
  const sy = useSpring(my, { stiffness: 60, damping: 14 });
  const rotY = useTransform(sx, [-1, 1], [-9, 9]);
  const rotX = useTransform(sy, [-1, 1], [7, -7]);
  const chipX = useTransform(sx, [-1, 1], [14, -14]);
  const chipY = useTransform(sy, [-1, 1], [10, -10]);

  const words = [hero.title[0].split(" "), hero.title[1].split(" ")];
  let w = 0;

  return (
    <LazyMotion features={domAnimation} strict>
      <section id="top" ref={section} className="relative px-[var(--frame)] pt-[var(--frame)]">
        <div
          data-dark
          className="on-dark relative isolate overflow-hidden rounded-[30px] bg-night text-white sm:rounded-[44px]"
          onPointerMove={(e) => {
            if (reduce || e.pointerType !== "mouse") return;
            const r = e.currentTarget.getBoundingClientRect();
            mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
            my.set(((e.clientY - r.top) / r.height) * 2 - 1);
          }}
          onPointerLeave={() => {
            mx.set(0);
            my.set(0);
          }}
        >
          {/* light: the deep blue, the curtain of columns, the grain */}
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_85%_at_50%_112%,#4a63ff_0%,#1426f0_24%,#0714d8_38%,#040b52_76%,#02062e_100%)]" />
          <div className="curtain -z-10" />
          <div className="grain -z-10" />

          {/* the giant name behind everything */}
          <svg
            aria-hidden
            viewBox="0 0 1000 250"
            className="pointer-events-none absolute left-1/2 top-[92px] -z-10 w-[112%] -translate-x-1/2 sm:top-[70px] lg:top-[56px] lg:w-[98%]"
          >
            <defs>
              <linearGradient id="wordmark" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#ffffff" stopOpacity="0.2" />
                <stop offset="0.9" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>
            </defs>
            <text
              x="500"
              y="222"
              textAnchor="middle"
              textLength="990"
              lengthAdjust="spacingAndGlyphs"
              fill="url(#wordmark)"
              className="letter"
              style={{ fontFamily: "var(--font-montserrat)", fontWeight: 800, fontSize: 262, ["--d" as string]: "0.1s" } as CSSProperties}
            >
              VALO
            </text>
          </svg>

          <m.div
            style={{ y: textY, opacity: fade }}
            className="relative mx-auto flex max-w-page flex-col items-center px-5 pt-[118px] text-center sm:pt-[146px] lg:pt-[150px]"
          >
            <h1 className="balance max-w-[16ch] text-[clamp(2.5rem,6.6vw,4.9rem)] font-extrabold leading-[1.02] tracking-[-0.05em] sm:max-w-[18ch]">
              {words.map((line, li) =>
                line.map((word, wi) => {
                  const d = 0.12 + w++ * 0.06;
                  return (
                    <span key={`${li}-${wi}`}>
                      <span className="inline-block overflow-hidden pb-[0.06em] align-bottom">
                        <span
                          className={`rise ${li === 1 ? "bg-[linear-gradient(100deg,#ffffff_0%,#c8d2ff_45%,#8fa3ff_100%)] bg-clip-text text-transparent" : ""}`}
                          style={{ ["--d" as string]: `${d}s` } as CSSProperties}
                        >
                          {word}
                        </span>
                      </span>{" "}
                    </span>
                  );
                }),
              )}
            </h1>
            <p
              className="fade-up pretty mt-6 max-w-[34rem] text-[16px] font-medium leading-relaxed text-white/75 sm:mt-7 sm:max-w-[40rem] sm:text-[18px]"
              style={{ ["--d" as string]: "0.7s" } as CSSProperties}
            >
              {hero.lead}
            </p>
            <div className="fade-up mt-8 sm:mt-9" style={{ ["--d" as string]: "0.85s" } as CSSProperties}>
              <a href={wa(hello)} target="_blank" rel="noopener noreferrer" className={btn("white")}>
                <BtnInner>{hero.cta}</BtnInner>
              </a>
            </div>
          </m.div>

          {/* the stage: the VD in chrome, the orbit, the four words */}
          <m.div style={{ y: stageY }} className="relative mx-auto mt-8 h-[400px] w-full max-w-[1160px] sm:mt-2 sm:h-[clamp(360px,50vw,540px)] lg:-mt-2">
            <div
              aria-hidden
              className="absolute left-1/2 top-[14%] h-[78%] w-[62%] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(96,118,255,.7),rgba(7,20,216,0))] blur-2xl"
            />
            <svg aria-hidden viewBox="0 0 1000 420" className="absolute inset-x-[4%] top-[10%] h-[80%] w-[92%] overflow-visible" fill="none">
              <ellipse cx="500" cy="210" rx="430" ry="150" stroke="rgba(255,255,255,.22)" strokeWidth="1.4" strokeDasharray="3 9" />
              <ellipse cx="500" cy="210" rx="300" ry="96" stroke="rgba(255,255,255,.12)" strokeWidth="1" strokeDasharray="2 8" />
              <circle r="5" fill="#FDEC05" className="motion-reduce:hidden">
                <animateMotion dur="14s" repeatCount="indefinite" path="M70 210a430 150 0 1 0 860 0a430 150 0 1 0 -860 0" />
              </circle>
            </svg>

            <div className="absolute inset-0 grid place-items-center [perspective:1200px]">
              <div className="pop-in w-[min(560px,66vw)] sm:w-[min(560px,74vw)]">
                <m.div style={{ rotateX: rotX, rotateY: rotY }}>
                  <div className="float [--t:8s]">
                    <Image
                      src="/images/v3/vd-hero.webp"
                      alt=""
                      width={1364}
                      height={1072}
                      priority
                      sizes="(min-width: 1024px) 560px, 74vw"
                      className="h-auto w-full drop-shadow-[0_40px_60px_rgba(2,6,46,.55)]"
                    />
                  </div>
                </m.div>
              </div>
            </div>

            <m.ul style={{ x: chipX, y: chipY }} className="absolute inset-0">
              {hero.tags.map((t, i) => {
                const Icon = icons[i];
                return (
                  <li key={t} className={`absolute ${spots[i]}`}>
                    <div className="pop-in" style={{ ["--d" as string]: `${1 + i * 0.12}s` } as CSSProperties}>
                      <div className="float glass-dark flex items-center gap-2.5 rounded-[18px] !bg-[rgba(9,18,110,.62)] py-2 pl-2 pr-4 sm:gap-3 sm:rounded-[20px] sm:py-2.5 sm:pl-2.5 sm:pr-5">
                        <span className="grid h-8 w-8 place-items-center rounded-[12px] bg-electric text-white shadow-[0_8px_20px_-6px_rgba(7,20,216,.9)] sm:h-10 sm:w-10 sm:rounded-[14px]">
                          <Icon className="h-[17px] w-[17px] sm:h-5 sm:w-5" />
                        </span>
                        <span className="text-[13.5px] font-bold tracking-[-0.01em] sm:text-[16px]">{t}</span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </m.ul>
          </m.div>

          {/* the notch where the next section begins (computers and tablets) */}
          <svg
            aria-hidden
            viewBox="0 0 520 60"
            className="absolute bottom-[-1px] left-1/2 hidden w-[520px] -translate-x-1/2 text-ice sm:block"
            preserveAspectRatio="none"
          >
            <path d="M0 60C30 60 38 52 47 38L58 19C65 7 74 2 90 2H430C446 2 455 7 462 19L473 38C482 52 490 60 520 60Z" fill="currentColor" />
          </svg>
          <div className="h-10 sm:h-16" />
        </div>
      </section>
    </LazyMotion>
  );
}
