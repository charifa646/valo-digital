"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { needs, type DetailId } from "@/lib/content";
import { Anchor } from "./Scroll";
import { useSheet } from "./Sheet";
import { Door, panels } from "./Door";
import { Filigrane } from "@/components/ui/Filigrane";
import { Words } from "@/components/ui/Words";
import { BtnInner, btn } from "@/components/ui/Action";
import { ArrowUpRight } from "@/components/ui/Icons";

/** One colour of the client's charte for each card: the electric blue, the night blue, the yellow, the light blue. */
const feuilles = [
  { fond: "#0714D8", texte: "#ffffff", doux: "rgba(255,255,255,.82)" },
  { fond: "#040B52", texte: "#ffffff", doux: "rgba(255,255,255,.78)" },
  { fond: "#FDEC05", texte: "#0B1233", doux: "rgba(11,18,51,.78)" },
  { fond: "#E7EDFF", texte: "#071F78", doux: "#4A536B" },
];

/**
 * « De quoi avez-vous besoin aujourd'hui ? » as a story, after the « story scroll » component Charifa sent on 12
 * October 2026 (« je m'étais trompé, voici le code des cartes »), at the hidden address /apercu/besoin/histoire: the four
 * doors are four large cards, one on the other. Each card stays where it is, under the header, while the next comes up
 * from below and covers it, tilted from its lower left corner at first and flat at the end (`--p`, from 0 to 1, set here
 * while the page scrolls; `.histoire-*` in globals.css). The original does it with GSAP's ScrollTrigger (a pin and a
 * rotation from 30 degrees to 0); this is the same effect with `position: sticky` and one variable, so the page loads no
 * library for it. With « reduce motion » the cards are simply one under the other. Each card is the whole door: it
 * glides to its section or opens its offer in the panel, as before.
 */
export function NeedsHistoire() {
  const pile = useRef<HTMLDivElement>(null);
  const { open } = useSheet();

  useEffect(() => {
    const root = pile.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-feuille]"));
    let frame = 0;
    let near = false;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      cards.forEach((c, i) => {
        if (i === 0) return;
        // 0 while the card's top is at the bottom of the screen, 1 once it has come up to a quarter of the way down
        const p = Math.min(1, Math.max(0, (vh - c.getBoundingClientRect().top) / (vh * 0.75)));
        c.style.setProperty("--p", p.toFixed(3));
      });
    };
    const soon = () => {
      if (near && !frame) frame = requestAnimationFrame(update);
    };
    const io = new IntersectionObserver(
      ([e]) => {
        near = e.isIntersecting;
        if (near) soon();
      },
      { rootMargin: "25% 0px" },
    );
    io.observe(root);
    update();
    window.addEventListener("scroll", soon, { passive: true });
    window.addEventListener("resize", soon);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", soon);
      window.removeEventListener("resize", soon);
    };
  }, []);

  return (
    <section id="besoin" aria-labelledby="besoin-title" className="paper grain relative isolate">
      <Filigrane word={needs.filigrane} className="left-1/2 top-[0.02em] -translate-x-1/2" />
      <div className="gutter mx-auto max-w-page pb-20 pt-16 lg:pb-28 lg:pt-20">
        <div className="text-center">
          <h2 id="besoin-title" data-reveal="words" className="h2 balance mx-auto max-w-[18ch] text-ink">
            <Words>{needs.title}</Words>
          </h2>
        </div>

        <div ref={pile} className="histoire mt-8 lg:mt-14">
          {needs.doors.map((d, i) => {
            const f = feuilles[i % feuilles.length];
            return (
              <div key={d.id} data-feuille className="histoire-feuille" style={{ zIndex: i + 1 }}>
                <div className="histoire-fond" style={{ background: f.fond, color: f.texte, ["--doux" as string]: f.doux } as CSSProperties}>
                  <Door
                    to={d.target}
                    onOpen={panels.has(d.target) ? () => open(d.target as DetailId) : undefined}
                    className="group flex h-full flex-col gap-5 p-6 sm:p-8 lg:p-10"
                  >
                    <span className="flex items-center justify-between">
                      <span aria-hidden className="text-[13px] font-bold tabular-nums tracking-[0.12em]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        aria-hidden
                        className="histoire-cercle grid h-10 w-10 place-items-center rounded-full transition-transform duration-500 group-hover:rotate-45 lg:h-12 lg:w-12"
                      >
                        <ArrowUpRight className="h-4 w-4 lg:h-5 lg:w-5" />
                      </span>
                    </span>
                    <span aria-hidden className="block h-px w-full bg-current opacity-30" />
                    <span className="flex flex-1 items-center">
                      <span className="histoire-verbe block">{d.name}</span>
                    </span>
                    <span aria-hidden className="block h-px w-full bg-current opacity-30" />
                    <span className="pretty block max-w-[34ch] text-[clamp(1.05rem,0.8rem+0.9vw,1.6rem)] font-medium leading-snug [color:var(--doux)]">
                      {d.text}
                    </span>
                  </Door>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center lg:mt-12">
          <Anchor to="prestations" className={btn("ghost")}>
            <BtnInner>{needs.cta}</BtnInner>
          </Anchor>
        </div>
      </div>
    </section>
  );
}
