import Image from "next/image";
import type { CSSProperties } from "react";
import { hero } from "@/lib/content";
import { hello, wa } from "@/lib/links";
import { BtnInner, btn } from "@/components/ui/Action";
import { Cap, Cart, Megaphone, Target } from "@/components/ui/Icons";

const icons = [Megaphone, Target, Cart, Cap];

/** Where the four words sit around the portrait: two on each side. */
const spots = [
  "left-[2%] top-[9%] sm:left-[10%] sm:top-[24%] [--r:-4deg] [--t:7s]",
  "left-[2%] top-[58%] sm:left-[15%] sm:top-[56%] [--r:3deg] [--t:8.5s] [--fd:-2s]",
  "right-[2%] top-[17%] sm:right-[10%] sm:top-[18%] [--r:4deg] [--t:7.8s] [--fd:-4s]",
  "right-[2%] top-[46%] sm:right-[14%] sm:top-[50%] [--r:-3deg] [--t:9s] [--fd:-1s]",
];

/**
 * The hero: the message first, like the AirLume mockup, then the person
 * rising from the bottom edge in front of the giant name, like Payrot. One
 * image and four small floating cards, nothing that keeps the phone busy.
 */
export function Hero() {
  const words = hero.title.join(" ").split(" ");

  return (
    <section id="top" className="relative overflow-hidden bg-[radial-gradient(90%_70%_at_50%_72%,#ffffff_0%,#eaf0ff_45%,#d3dfff_100%)]">
      {/* the message first */}
      <div className="relative z-10 mx-auto max-w-page px-5 pt-[118px] text-center sm:pt-[132px] lg:pt-[140px]">
        <h1 className="balance mx-auto max-w-[22ch] text-[clamp(2.2rem,5vw,3.7rem)] font-bold leading-[1.04] tracking-[-0.045em] text-ink">
          {words.map((w, i) => (
            <span key={i}>
              <span className="inline-block overflow-hidden pb-[0.06em] align-bottom">
                <span className={`rise ${i >= 5 ? "text-electric" : ""}`} style={{ ["--d" as string]: `${0.1 + i * 0.05}s` } as CSSProperties}>
                  {w}
                </span>
              </span>{" "}
            </span>
          ))}
        </h1>
        <p
          className="fade-up pretty mx-auto mt-5 max-w-[38rem] text-[16px] font-medium leading-relaxed text-body sm:text-[18px]"
          style={{ ["--d" as string]: "0.5s" } as CSSProperties}
        >
          {hero.lead}
        </p>
        <div className="fade-up mt-8" style={{ ["--d" as string]: "0.65s" } as CSSProperties}>
          <a href={wa(hello)} target="_blank" rel="noopener noreferrer" className={btn("electric")}>
            <BtnInner>{hero.cta}</BtnInner>
          </a>
        </div>
      </div>

      {/* below it: the name standing tall, the person rising from the bottom edge, the four words around */}
      <div className="relative mx-auto mt-8 h-[430px] max-w-[1320px] sm:mt-10 sm:h-[520px] lg:mt-4 lg:h-[560px]">
        <svg aria-hidden viewBox="0 0 1000 260" className="absolute left-1/2 top-[3%] w-[110%] -translate-x-1/2 sm:top-[4%] lg:w-[90%]">
          <defs>
            <linearGradient id="wordmark" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="1" stopColor="#bccbff" />
            </linearGradient>
          </defs>
          <text
            x="500"
            y="236"
            textAnchor="middle"
            textLength="980"
            lengthAdjust="spacingAndGlyphs"
            fill="url(#wordmark)"
            stroke="rgba(7,20,216,.09)"
            strokeWidth="1.5"
            className="letter"
            style={{ fontFamily: "var(--font-montserrat)", fontWeight: 800, fontSize: 272, ["--d" as string]: "0.3s" } as CSSProperties}
          >
            VALO
          </text>
        </svg>

        {/* her face sits on the axis of the title, so the picture leans a little to the right */}
        <div className="absolute bottom-0 left-1/2 w-[min(90vw,420px)] -translate-x-[38%] sm:w-[480px] lg:w-[520px]">
          <div className="fade-up" style={{ ["--d" as string]: "0.45s" } as CSSProperties}>
            <Image
              src="/images/v3/personne-tablette.webp"
              alt=""
              width={1097}
              height={1089}
              priority
              sizes="(min-width: 1024px) 520px, (min-width: 640px) 480px, 90vw"
              className="h-auto w-full [-webkit-mask-image:linear-gradient(90deg,transparent_0%,#000_12%,#000_92%,transparent_100%)] [mask-image:linear-gradient(90deg,transparent_0%,#000_12%,#000_92%,transparent_100%)]"
            />
          </div>
          {/* the podium she rises from, cut straight in the next section's colour, always as wide as she is */}
          <svg aria-hidden viewBox="0 0 120 10" preserveAspectRatio="none" className="absolute -bottom-px left-[-10%] h-9 w-[120%] text-ice sm:h-[72px]">
            <path d="M0 10L12 0H108L120 10Z" fill="currentColor" />
          </svg>
        </div>

        <ul>
          {hero.tags.map((t, i) => {
            const Icon = icons[i];
            return (
              <li key={t} className={`absolute ${spots[i]}`}>
                <div className="pop-in" style={{ ["--d" as string]: `${0.8 + i * 0.1}s` } as CSSProperties}>
                  <div className="float flex items-center gap-2.5 rounded-[10px] bg-white py-2 pl-2 pr-3.5 shadow-[0_18px_40px_-18px_rgba(7,20,216,.45)] sm:gap-3 sm:py-2.5 sm:pl-2.5 sm:pr-4">
                    <span className="grid h-8 w-8 place-items-center rounded-[8px] bg-electric text-white sm:h-9 sm:w-9">
                      <Icon className="h-[17px] w-[17px] sm:h-[18px] sm:w-[18px]" />
                    </span>
                    <span className="text-[13.5px] font-bold tracking-[-0.01em] text-ink sm:text-[15px]">{t}</span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* the floor the podium stands on, from edge to edge */}
      <div aria-hidden className="absolute inset-x-0 -bottom-px h-3 bg-ice sm:h-[22px]" />
    </section>
  );
}
