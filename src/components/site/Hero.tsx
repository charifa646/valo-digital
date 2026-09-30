import Image from "next/image";
import type { CSSProperties } from "react";
import { hero } from "@/lib/content";
import { hello, wa } from "@/lib/links";
import { BtnInner, btn } from "@/components/ui/Action";
import { Cap, Cart, Megaphone, Target } from "@/components/ui/Icons";

const icons = [Megaphone, Target, Cart, Cap];

/** Where the four words sit around the portrait: two on each side. */
const spots = [
  "left-[3%] top-[30%] sm:left-[9%] sm:top-[26%] [--r:-4deg] [--t:7s]",
  "left-[1%] top-[58%] sm:left-[14%] sm:top-[52%] [--r:3deg] [--t:8.5s] [--fd:-2s]",
  "right-[3%] top-[24%] sm:right-[9%] sm:top-[22%] [--r:4deg] [--t:7.8s] [--fd:-4s]",
  "right-[1%] top-[52%] sm:right-[13%] sm:top-[48%] [--r:-3deg] [--t:9s] [--fd:-1s]",
];

/**
 * The hero, after the Payrot mockup: a light sky, the name standing tall
 * behind a real person, the four words around her, and the headline set in
 * the stage that rises from the bottom edge. No 3D, no light effects that
 * keep the phone busy: one image and four small floating cards.
 */
export function Hero({ photo = "tablette" }: { photo?: "tablette" | "telephone" }) {
  const person =
    photo === "tablette"
      ? { src: "/images/v3/personne-tablette.webp", width: 1097, height: 1089 }
      : { src: "/images/v3/personne-telephone.webp", width: 1196, height: 1214 };
  const words = hero.title.join(" ").split(" ");

  return (
    <section id="top" className="relative overflow-hidden bg-[radial-gradient(80%_65%_at_50%_32%,#ffffff_0%,#eaf0ff_48%,#d3dfff_100%)]">
      {/* the stage: the name behind, the person in front, the four words around */}
      <div className="relative mx-auto h-[520px] max-w-[1320px] sm:h-[620px] lg:h-[640px]">
        <svg aria-hidden viewBox="0 0 1000 260" className="absolute left-1/2 top-[92px] w-[108%] -translate-x-1/2 sm:top-[96px] lg:w-[94%]">
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
            style={{ fontFamily: "var(--font-montserrat)", fontWeight: 800, fontSize: 272, ["--d" as string]: "0.05s" } as CSSProperties}
          >
            VALO
          </text>
        </svg>

        <div
          className="fade-up absolute bottom-0 left-1/2 w-[min(92vw,430px)] -translate-x-1/2 sm:w-[500px] lg:w-[540px]"
          style={{ ["--d" as string]: "0.25s" } as CSSProperties}
        >
          <Image
            src={person.src}
            alt=""
            width={person.width}
            height={person.height}
            priority
            sizes="(min-width: 1024px) 540px, (min-width: 640px) 500px, 92vw"
            className="h-auto w-full [-webkit-mask-image:linear-gradient(90deg,transparent_0%,#000_12%,#000_92%,transparent_100%)] [mask-image:linear-gradient(90deg,transparent_0%,#000_12%,#000_92%,transparent_100%)]"
          />
        </div>

        <ul>
          {hero.tags.map((t, i) => {
            const Icon = icons[i];
            return (
              <li key={t} className={`absolute ${spots[i]}`}>
                <div className="pop-in" style={{ ["--d" as string]: `${0.7 + i * 0.1}s` } as CSSProperties}>
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

      {/* the stage rising from the bottom edge, holding the headline: it covers the portrait's waist */}
      <div className="relative -mt-10 lg:-mt-[112px]">
        <svg aria-hidden viewBox="0 0 1440 112" preserveAspectRatio="none" className="absolute inset-x-0 top-0 hidden h-[112px] w-full text-ice lg:block">
          <path d="M0 112V82H210L270 0H1170L1230 82H1440V112Z" fill="currentColor" />
        </svg>
        <svg aria-hidden viewBox="0 0 400 40" preserveAspectRatio="none" className="absolute inset-x-0 top-0 h-10 w-full text-ice lg:hidden">
          <path d="M0 40V24H36L64 0H336L364 24H400V40Z" fill="currentColor" />
        </svg>
        <div aria-hidden className="absolute inset-x-0 bottom-0 top-[39px] bg-ice lg:top-[111px]" />
        <div className="relative px-5 pb-16 pt-12 text-center sm:pb-20 lg:pt-7">
          <h1 className="balance mx-auto max-w-[22ch] text-[clamp(2.1rem,4.6vw,3.5rem)] font-extrabold leading-[1.04] tracking-[-0.045em] text-ink">
            {words.map((w, i) => (
              <span key={i}>
                <span className="inline-block overflow-hidden pb-[0.06em] align-bottom">
                  <span className={`rise ${i >= 5 ? "text-electric" : ""}`} style={{ ["--d" as string]: `${0.2 + i * 0.05}s` } as CSSProperties}>
                    {w}
                  </span>
                </span>{" "}
              </span>
            ))}
          </h1>
          <p
            className="fade-up pretty mx-auto mt-5 max-w-[38rem] text-[16px] font-medium leading-relaxed text-body sm:text-[18px]"
            style={{ ["--d" as string]: "0.6s" } as CSSProperties}
          >
            {hero.lead}
          </p>
          <div className="fade-up mt-8" style={{ ["--d" as string]: "0.75s" } as CSSProperties}>
            <a href={wa(hello)} target="_blank" rel="noopener noreferrer" className={btn("electric")}>
              <BtnInner>{hero.cta}</BtnInner>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
