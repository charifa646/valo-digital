import Image from "next/image";
import type { CSSProperties } from "react";
import { apropos } from "@/lib/content";
import { Pin } from "@/components/ui/Icons";

/**
 * The top of the « À propos » page, in the blue of the homepage: what VALO
 * DIGITAL is, in the portfolio's words, and the team in blue polos framed by a
 * yellow line, the way the portfolio frames its photos.
 */
export function AproposHero() {
  return (
    <section id="top" aria-labelledby="apropos-title" className="relative">
      <div
        data-dark
        className="on-dark relative isolate overflow-hidden bg-[radial-gradient(110%_80%_at_50%_0%,#3551FF_0%,#0714D8_52%,#0510A8_100%)] text-white"
      >
        <div className="gutter mx-auto grid max-w-page items-center gap-16 pb-32 pt-[118px] sm:pt-[136px] lg:grid-cols-[1.06fr_0.94fr] lg:gap-16 lg:pb-44 lg:pt-[160px]">
          <div>
            <p className="tag fade-in text-white/85" style={{ ["--d" as string]: "0.05s" } as CSSProperties}>
              {apropos.label}
            </p>
            <h1 id="apropos-title" className="mt-6 text-[clamp(2.3rem,1.6rem+3vw,3.9rem)] font-medium leading-[1.04] tracking-[-0.035em]">
              {apropos.title.map((line, li) => (
                <span key={li} className="block">
                  {line.split(" ").map((w, wi) => (
                    <span key={wi}>
                      <span
                        className={`blur-in inline-block ${li ? "text-sun" : ""}`}
                        style={{ ["--d" as string]: `${0.12 + (li * 3 + wi) * 0.08}s` } as CSSProperties}
                      >
                        {w}
                      </span>{" "}
                    </span>
                  ))}
                </span>
              ))}
            </h1>
            <p
              className="fade-in pretty mt-7 max-w-[34rem] text-[18px] font-medium leading-relaxed text-white sm:text-[20px]"
              style={{ ["--d" as string]: "0.55s" } as CSSProperties}
            >
              {apropos.intro}
            </p>
            {apropos.text.map((t, i) => (
              <p
                key={i}
                className="fade-in pretty mt-4 max-w-[34rem] text-[15.5px] font-medium leading-relaxed text-white/75 sm:text-[16.5px]"
                style={{ ["--d" as string]: `${0.7 + i * 0.1}s` } as CSSProperties}
              >
                {t}
              </p>
            ))}
            <ul
              className="fade-in mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-white/75"
              style={{ ["--d" as string]: "0.95s" } as CSSProperties}
            >
              {apropos.domaines.map((d, i) => (
                <li key={d} className="flex items-center gap-3">
                  {i > 0 && <span aria-hidden className="h-1 w-1 rounded-full bg-sun" />}
                  {d}
                </li>
              ))}
            </ul>
          </div>

          <figure className="grow-in relative mx-auto w-full max-w-[500px]" style={{ ["--d" as string]: "0.3s" } as CSSProperties}>
            <span aria-hidden className="absolute -inset-3 rounded-[28px] border border-sun/55 sm:-inset-4 sm:rounded-[32px]" />
            <div className="relative overflow-hidden rounded-[20px] shadow-[0_40px_80px_-30px_rgba(2,6,46,.75)]">
              <Image
                src="/images/apropos/equipe-bleu.webp"
                alt={apropos.photoAlt}
                width={1251}
                height={1263}
                priority
                sizes="(min-width: 1024px) 500px, 92vw"
                className="h-auto w-full"
              />
            </div>
            <figcaption className="absolute -bottom-5 left-4 flex items-center gap-2.5 rounded-full bg-white py-1.5 pl-1.5 pr-4 text-[13px] font-semibold text-ink shadow-float sm:left-6 sm:text-[13.5px]">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-electric text-white">
                <Pin className="h-4 w-4" />
              </span>
              {apropos.base}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
