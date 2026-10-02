"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { apropos } from "@/lib/content";
import { ArrowRight, Pin } from "@/components/ui/Icons";
import { Words } from "@/components/ui/Words";

/** How long each photo stays, in milliseconds. */
const SLIDE = 6500;
const pad = (k: number) => String(k).padStart(2, "0");

/**
 * « Quelques clichés de nos formations à succès », as a reportage (after
 * 21st.dev « Slideshow » and « Lumina Interactive List »): one photo at a time,
 * large, slowly closing in, its date, title and place laid on it; arrows, a
 * strip of thumbnails and a swipe to move. It turns on its own while it is on
 * screen, a yellow line counting the time, and waits under the mouse or the
 * finger. Only the photo shown and its two neighbours are loaded.
 */
export function Terrain() {
  const t = apropos.terrain;
  const moments = t.moments;
  const n = moments.length;
  const [i, setI] = useState(0);
  const [inView, setInView] = useState(false);
  const [hold, setHold] = useState(false);
  const [still, setStill] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const strip = useRef<HTMLUListElement>(null);
  const startX = useRef<number | null>(null);

  const go = useCallback((k: number) => setI(((k % n) + n) % n), [n]);

  // no turning on its own for those who asked for less motion
  useEffect(() => setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);

  // it only turns while it is on screen
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // the current thumbnail stays in sight: the strip scrolls, never the page
  useEffect(() => {
    const s = strip.current;
    const th = s?.children[i] as HTMLElement | undefined;
    if (!s || !th) return;
    s.scrollTo({ left: th.offsetLeft - (s.clientWidth - th.offsetWidth) / 2, behavior: "smooth" });
  }, [i]);

  const playing = inView && !hold && !still;
  const m = moments[i];
  const near = new Set([i, (i + 1) % n, (i + n - 1) % n]);
  const arrow =
    "grid h-11 w-11 place-items-center rounded-full border border-hair bg-white text-ink transition duration-300 hover:border-electric hover:text-electric";

  return (
    <section aria-labelledby="terrain-title" className="relative bg-white">
      <div className="gutter mx-auto max-w-page py-24 lg:py-32">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[44rem]">
            <p data-reveal="rule" className="tag">
              {t.label}
            </p>
            <h2 id="terrain-title" data-reveal="words" className="h2 balance mt-5 text-ink">
              <Words>{t.title}</Words>
            </h2>
          </div>
          <div data-reveal className="flex items-center justify-between gap-5 lg:justify-end">
            <p className="text-[13.5px] font-semibold tabular-nums text-mute">
              <span className="text-ink">{pad(i + 1)}</span> / {pad(n)}
            </p>
            <div className="flex gap-2">
              <button type="button" onClick={() => go(i - 1)} aria-label="Photo précédente" className={arrow}>
                <ArrowRight className="h-4 w-4 rotate-180" />
              </button>
              <button type="button" onClick={() => go(i + 1)} aria-label="Photo suivante" className={arrow}>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div
          role="region"
          aria-roledescription="carousel"
          aria-label={t.title}
          className="mt-8 lg:mt-12"
          // a mouse over it holds the photo; a finger does not (phones fake a hover on every tap)
          onPointerEnter={(e) => e.pointerType === "mouse" && setHold(true)}
          onPointerLeave={(e) => e.pointerType === "mouse" && setHold(false)}
          // a keyboard on the controls holds the photo; a tap or a click does not (the button keeps the focus after it)
          onFocusCapture={(e) => (e.target as HTMLElement).matches(":focus-visible") && setHold(true)}
          onBlurCapture={() => setHold(false)}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") go(i + 1);
            if (e.key === "ArrowLeft") go(i - 1);
          }}
        >
          <div
            ref={stage}
            data-reveal="zoom"
            data-paused={!playing || undefined}
            className="relative overflow-hidden rounded-2xl border border-hair bg-white [touch-action:pan-y] sm:aspect-[16/9] sm:border-0 sm:bg-night lg:aspect-[2.15/1]"
            onPointerDown={(e) => (startX.current = e.clientX)}
            onPointerUp={(e) => {
              if (startX.current === null) return;
              const dx = e.clientX - startX.current;
              startX.current = null;
              if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1));
            }}
          >
            {/* the photos: the one shown, its neighbours waiting underneath */}
            <div className="relative aspect-[4/3] overflow-hidden bg-night sm:absolute sm:inset-0 sm:aspect-auto">
              {moments.map(
                (mm, k) =>
                  near.has(k) && (
                    <div key={mm.photo} aria-hidden className={`absolute inset-0 transition-opacity duration-700 ${k === i ? "opacity-100" : "opacity-0"}`}>
                      <Image
                        src={`/images/terrain/${mm.photo}.webp`}
                        alt=""
                        fill
                        sizes="(min-width: 1240px) 1160px, 100vw"
                        className={`object-cover ${k === i ? "kenburns" : ""}`}
                      />
                    </div>
                  ),
              )}
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 hidden h-3/4 bg-gradient-to-t from-[rgba(2,6,46,.88)] via-[rgba(2,6,46,.4)] to-transparent sm:block"
              />
            </div>

            {/* the words of the photo: below it on phones, laid on it from tablets up */}
            <div aria-live={playing ? "off" : "polite"} className="relative min-h-[13rem] p-5 sm:absolute sm:inset-x-0 sm:bottom-0 sm:min-h-0 sm:p-8 lg:p-10">
              <p key={`d${i}`} className="fade-in text-[11.5px] font-semibold uppercase tracking-[0.14em] text-electric sm:text-sun">
                {m.date}
              </p>
              <p
                key={`t${i}`}
                className="fade-in balance mt-2 max-w-[42rem] text-[19px] font-medium leading-snug tracking-[-0.015em] text-ink sm:text-[clamp(1.35rem,0.95rem+1.3vw,2.05rem)] sm:leading-[1.2] sm:text-white"
                style={{ ["--d" as string]: "0.06s" } as CSSProperties}
              >
                {m.title}
              </p>
              {m.place && (
                <p
                  key={`p${i}`}
                  className="fade-in mt-2.5 flex items-start gap-1.5 text-[13.5px] font-medium leading-snug text-body sm:text-white/80"
                  style={{ ["--d" as string]: "0.12s" } as CSSProperties}
                >
                  <Pin className="mt-[1px] h-4 w-4 shrink-0 text-mute sm:text-white/60" />
                  {m.place}
                </p>
              )}
              {m.note && (
                <p key={`n${i}`} className="fade-in pretty mt-1.5 max-w-[36rem] text-[13.5px] font-medium leading-relaxed text-body sm:text-white/80">
                  {m.note}
                </p>
              )}
            </div>

            {/* the time left on this photo; when the line is full, the next one comes */}
            {!still && (
              <span
                key={i}
                aria-hidden
                onAnimationEnd={() => go(i + 1)}
                className="slide-progress absolute inset-x-0 bottom-0 h-[3px] origin-left bg-sun"
                style={{ animationDuration: `${SLIDE}ms` }}
              />
            )}
          </div>

          <ul ref={strip} className="relative mt-4 flex gap-2 overflow-x-auto px-1 py-1.5 [scrollbar-width:none] sm:gap-3 [&::-webkit-scrollbar]:hidden">
            {moments.map((mm, k) => (
              <li key={mm.photo} className="shrink-0">
                <button
                  type="button"
                  onClick={() => go(k)}
                  aria-label={mm.title}
                  aria-current={k === i ? "true" : undefined}
                  className={`relative block h-14 w-[84px] overflow-hidden rounded-[10px] bg-soft transition duration-300 sm:h-[68px] sm:w-[104px] ${
                    k === i ? "opacity-100 ring-2 ring-electric ring-offset-2 ring-offset-white" : "opacity-45 hover:opacity-90"
                  }`}
                >
                  <Image src={`/images/terrain/${mm.photo}.webp`} alt="" fill sizes="104px" className="object-cover" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
