import Image from "next/image";
import type { CSSProperties } from "react";
import { pourquoi } from "@/lib/content";
import { Words } from "@/components/ui/Words";
import { Bolt, Compass, Trend } from "@/components/ui/Icons";

const icons = [Compass, Bolt, Trend];

/**
 * « Le digital ne se résume pas à être visible. »: the VALO team carries the
 * sentence, and the three pillars sit on a white card laid over the photo.
 */
export function Pourquoi() {
  return (
    <section id="pourquoi" aria-labelledby="pourquoi-title" className="paper relative">
      <div className="gutter mx-auto max-w-page py-24 lg:py-32">
        <div data-dark data-reveal="curtain" className="relative isolate overflow-hidden rounded-2xl bg-night text-white">
          <Image
            src="/images/apropos/equipe-casquettes.webp"
            alt=""
            fill
            sizes="(min-width: 1240px) 1160px, 100vw"
            className="-z-10 object-cover object-[50%_28%]"
          />
          {/* the words always sit on dark blue: evenly on phones, from the left on larger screens */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(4,11,82,.86)_0%,rgba(4,11,82,.8)_60%,rgba(4,11,82,.55)_100%)] md:bg-[linear-gradient(90deg,rgba(4,11,82,.92)_0%,rgba(4,11,82,.78)_38%,rgba(4,11,82,.25)_75%,rgba(4,11,82,.1)_100%)]"
          />
          <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-[rgba(4,11,82,.55)] to-transparent" />
          <div className="max-w-[36rem] px-6 pb-28 pt-14 sm:px-12 sm:pb-36 sm:pt-20 lg:px-16 lg:pb-44 lg:pt-24">
            <p data-reveal="rule" className="tag text-white/85" style={{ ["--d" as string]: "0.3s" } as CSSProperties}>
              {pourquoi.label}
            </p>
            <h2 id="pourquoi-title" data-reveal="words" className="h2 balance mt-5" style={{ ["--d" as string]: "0.4s" } as CSSProperties}>
              <Words>{pourquoi.title}</Words>
            </h2>
            <p data-reveal className="pretty mt-5 text-[16.5px] font-medium leading-relaxed text-white/85 lg:text-[17.5px]">
              {pourquoi.lead}
            </p>
          </div>
        </div>

        {/* the three pillars, on a card laid over the bottom of the photo */}
        <ul className="relative z-[1] mx-3 -mt-16 grid rounded-2xl border border-hair bg-white shadow-panel sm:mx-8 sm:-mt-20 md:grid-cols-3 lg:mx-14 lg:-mt-24">
          {pourquoi.pillars.map((p, i) => {
            const Icon = icons[i];
            return (
              <li
                key={p.name}
                data-reveal="blur"
                style={{ ["--d" as string]: `${0.15 + i * 0.12}s` } as CSSProperties}
                className="border-hair p-6 max-md:[&:not(:first-child)]:border-t sm:p-7 md:[&:not(:first-child)]:border-l lg:p-8"
              >
                <span className="grid h-11 w-11 place-items-center rounded-full bg-frost text-electric">
                  <Icon className="h-[21px] w-[21px]" />
                </span>
                <h3 className="mt-5 text-[15px] font-bold tracking-[0.06em] text-ink">{p.name}</h3>
                <p className="pretty mt-2 text-[15px] font-medium leading-relaxed text-body">{p.text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
