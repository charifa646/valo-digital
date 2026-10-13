import Image from "next/image";
import type { CSSProperties } from "react";
import { hero } from "@/lib/content";
import { DemandeButton } from "./Sheet";
import { BtnInner, btn } from "@/components/ui/Action";
import { Cap, Cart, Megaphone, Target } from "@/components/ui/Icons";

const icons = [Megaphone, Target, Cart, Cap];

/**
 * The drop that rises from the bottom edge of the blue panel, like Polushcoin:
 * a circle of radius R whose centre sits d above the edge, joined to it by two
 * hollow curves of radius r. Drawn in a 600 × 300 box, the edge at y = 290.
 */
function drop() {
  const [cx, base, R, d, r] = [300, 290, 200, 90, 70];
  const cy = base - d;
  const fx = Math.sqrt((R + r) ** 2 - (d - r) ** 2); // from the centre to where each curve meets the edge
  const k = r / (R + r);
  const tx = fx * (1 - k);
  const ty = base - r + (cy - (base - r)) * k;
  const n = (v: number) => v.toFixed(2);
  return [
    `M0 ${base}H${n(cx - fx)}`,
    `A${r} ${r} 0 0 0 ${n(cx - tx)} ${n(ty)}`,
    `A${R} ${R} 0 1 1 ${n(cx + tx)} ${n(ty)}`,
    `A${r} ${r} 0 0 0 ${n(cx + fx)} ${base}`,
    `H600V300H0Z`,
  ].join("");
}
const dropPath = drop();

/** Where the four words float around the drop, in the blue: two on each side. */
const spots = [
  "left-[1%] top-[7%] sm:left-[-12%] lg:left-[-22%] lg:top-[12%] [--r:-4deg] [--t:7s]",
  "left-[-2%] top-[47%] sm:left-[-18%] lg:left-[-30%] lg:top-[50%] [--r:3deg] [--t:8.5s] [--fd:-2s]",
  "right-[1%] top-[1%] sm:right-[-12%] lg:right-[-22%] lg:top-[6%] [--r:4deg] [--t:7.8s] [--fd:-4s]",
  "right-[-2%] top-[41%] sm:right-[-18%] lg:right-[-30%] lg:top-[44%] [--r:-3deg] [--t:9s] [--fd:-1s]",
];

/**
 * Proposal A, « la vague » (Polushcoin, the text centred): the message in white
 * on the blue panel with its light lines; from the bottom edge rises a drop, and
 * in it the woman with the tablet, her head coming out of the circle.
 */
export function HeroVague() {
  const words = hero.title.join(" ").split(" ");

  return (
    <section id="top" className="relative overflow-hidden pb-6 [--u:0.6px] sm:[--u:0.86px] lg:[--u:1.04px]">
      <div
        data-dark
        className="on-dark relative isolate bg-[radial-gradient(110%_80%_at_50%_0%,#3551FF_0%,#0714D8_52%,#0510A8_100%)] pb-[calc(290*var(--u)+44px)] text-white sm:pb-[calc(290*var(--u)+56px)]"
      >
        <div aria-hidden className="light-lines-white" />
        <div className="relative mx-auto max-w-page px-5 pt-[118px] text-center sm:pt-[132px] lg:pt-[140px]">
          <h1 className="balance mx-auto max-w-[22ch] text-[clamp(2.2rem,5vw,3.7rem)] font-medium leading-[1.06] tracking-[-0.03em]">
            {words.map((w, i) => (
              <span key={i}>
                <span className="inline-block overflow-hidden pb-[0.06em] align-bottom">
                  <span className={`rise ${i >= 5 ? "text-sun" : ""}`} style={{ ["--d" as string]: `${0.1 + i * 0.05}s` } as CSSProperties}>
                    {w}
                  </span>
                </span>{" "}
              </span>
            ))}
          </h1>
          <p
            className="fade-up pretty mx-auto mt-5 max-w-[36rem] text-[16px] font-medium leading-relaxed text-white/80 sm:text-[18px]"
            style={{ ["--d" as string]: "0.5s" } as CSSProperties}
          >
            {hero.lead}
          </p>
          <div className="fade-up mt-8" style={{ ["--d" as string]: "0.65s" } as CSSProperties}>
            <DemandeButton className={btn("white")}>
              <BtnInner>{hero.cta}</BtnInner>
            </DemandeButton>
          </div>
        </div>
      </div>

      {/* the drop: its top in the blue, its foot melting into the light page */}
      <div className="relative mx-auto -mt-[calc(290*var(--u))] h-[calc(380*var(--u))] w-[calc(600*var(--u))]">
        <svg aria-hidden viewBox="0 0 600 300" className="absolute inset-x-0 top-0 h-[calc(300*var(--u))] w-full text-ice">
          <path d={dropPath} fill="currentColor" />
        </svg>

        {/* the blue disc inside the drop */}
        <span
          aria-hidden
          className="absolute left-[calc(132*var(--u))] top-[calc(32*var(--u))] h-[calc(336*var(--u))] w-[calc(336*var(--u))] rounded-full bg-[radial-gradient(circle_at_50%_28%,#6F86FF_0%,#3551FF_45%,#0714D8_100%)] shadow-[0_30px_60px_-30px_rgba(7,20,216,.6),inset_0_0_0_1px_rgba(255,255,255,.35)]"
        />

        {/* the woman: cut by the circle, except her head, which comes out above it */}
        <div
          className="fade-up absolute left-[calc(132*var(--u))] top-[calc(-16*var(--u))] h-[calc(384*var(--u))] w-[calc(336*var(--u))] [-webkit-mask-image:linear-gradient(#000,#000),radial-gradient(circle_closest-side,#000_99%,transparent_100%)] [-webkit-mask-position:top,bottom] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:100%_34.4%,100%_87.5%] [mask-image:linear-gradient(#000,#000),radial-gradient(circle_closest-side,#000_99%,transparent_100%)] [mask-position:top,bottom] [mask-repeat:no-repeat] [mask-size:100%_34.4%,100%_87.5%]"
          style={{ ["--d" as string]: "0.45s" } as CSSProperties}
        >
          <Image
            src="/images/v3/personne-tablette.webp"
            alt=""
            width={1097}
            height={1089}
            priority
            sizes="(min-width: 1024px) 560px, (min-width: 640px) 470px, 330px"
            className="absolute left-[-0.4%] top-0 h-auto w-[160%] max-w-none [filter:drop-shadow(0_10px_18px_rgba(4,11,82,.28))]"
          />
        </div>

        <ul>
          {hero.tags.map((t, i) => {
            const Icon = icons[i];
            return (
              <li key={t} className={`absolute ${spots[i]}`}>
                <div className="pop-in" style={{ ["--d" as string]: `${0.8 + i * 0.1}s` } as CSSProperties}>
                  <div className="float flex items-center gap-2 rounded-[9px] bg-white py-1.5 pl-1.5 pr-3 shadow-[0_18px_40px_-18px_rgba(4,11,82,.55)] sm:gap-2.5 sm:rounded-[10px] sm:py-2.5 sm:pl-2.5 sm:pr-4">
                    <span className="grid h-7 w-7 place-items-center rounded-[7px] bg-electric text-white sm:h-9 sm:w-9 sm:rounded-[8px]">
                      <Icon className="h-[15px] w-[15px] sm:h-[18px] sm:w-[18px]" />
                    </span>
                    <span className="text-[12.5px] font-bold tracking-[-0.01em] text-ink sm:text-[15px]">{t}</span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
