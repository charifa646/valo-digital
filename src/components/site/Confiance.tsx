import Image from "next/image";
import type { CSSProperties } from "react";
import { chiffres, confiance, type ClientLogo } from "@/lib/content";
import { Monogram } from "@/components/brand/Logo";

/** One client's logo on its white card, the logo kept whole whatever its shape. */
export function LogoTile({ logo, hidden = false, className = "" }: { logo: ClientLogo; hidden?: boolean; className?: string }) {
  return (
    <span className={`relative block overflow-hidden rounded-[12px] border border-hair bg-white ${className}`}>
      <Image src={logo.src} alt={hidden ? "" : logo.name || "Client de VALO DIGITAL"} fill sizes="160px" className="object-contain p-2.5 sm:p-3.5" />
    </span>
  );
}

/** A row of logos passing slowly, twice over so the loop has no seam; it stops under the hand. */
function Row({ logos, reverse = false }: { logos: ClientLogo[]; reverse?: boolean }) {
  const row = [...logos, ...logos];
  return (
    <ul className={`logos-track flex w-max ${reverse ? "logos-reverse" : ""}`}>
      {row.map((l, i) => (
        <li key={i} aria-hidden={i >= logos.length || undefined} className="shrink-0 pr-3 sm:pr-4">
          <LogoTile logo={l} hidden={i >= logos.length} className="h-[64px] w-[112px] sm:h-[78px] sm:w-[140px]" />
        </li>
      ))}
    </ul>
  );
}

/**
 * The figures of the portfolio, side by side, on one line on every screen:
 * « Depuis 2022 », « +1000 », « +100 ». On phones a word of the portfolio sits
 * above each figure, and a column widens a little when its word needs it
 * (« entrepreneurs » on the narrowest phones); from tablets up the full
 * sentence sits below it. The counts climb once when they come on screen (the
 * real figure stays in the text for screen readers and without animation).
 */
export function Figures({ dark = false, className = "" }: { dark?: boolean; className?: string }) {
  return (
    <ul
      className={`grid grid-cols-[repeat(3,minmax(min-content,1fr))] overflow-hidden rounded-2xl border sm:grid-cols-3 ${dark ? "border-white/15 bg-white/[0.05]" : "border-hair bg-white shadow-panel"} ${className}`}
    >
      {chiffres.map((c, i) => (
        <li
          key={c.value}
          data-reveal="blur"
          style={{ ["--d" as string]: `${0.1 + i * 0.12}s` } as CSSProperties}
          className={`flex flex-col items-center px-1.5 py-5 text-center sm:px-7 sm:py-9 ${i ? `border-l ${dark ? "border-white/15" : "border-hair"}` : ""}`}
        >
          <div>
            <p
              className={`flex min-h-[2.4em] items-end justify-center text-[clamp(9px,2.7vw,10px)] font-semibold uppercase leading-tight tracking-[0.08em] sm:block sm:h-5 sm:min-h-0 sm:text-[12px] sm:tracking-[0.16em] ${dark ? "text-sun" : "text-electric"}`}
            >
              <span className="sm:hidden">{c.pre ?? c.short}</span>
              <span className="hidden sm:inline">{c.pre}</span>
            </p>
            <p
              className={`mt-1.5 text-[clamp(1.7rem,1.15rem+2.9vw,3.6rem)] font-medium leading-none tracking-[-0.045em] sm:mt-1 ${dark ? "text-white" : "text-ink"}`}
            >
              {c.count ? (
                <>
                  <span aria-hidden className="count-up tabular-nums" style={{ ["--to" as string]: c.count } as CSSProperties}>
                    +
                  </span>
                  <span className="sr-only">{c.value}</span>
                </>
              ) : (
                c.value
              )}
            </p>
          </div>
          <p className={`pretty mx-auto mt-4 hidden max-w-[26ch] text-[14.5px] font-medium leading-snug sm:block ${dark ? "text-white/75" : "text-body"}`}>
            {c.text}
          </p>
        </li>
      ))}
    </ul>
  );
}

/**
 * « Ils nous ont fait confiance », right after the homepage's top: the VALO mark
 * in its rings, the sentence, the clients' logos in two rows going opposite
 * ways, then the figures.
 */
export function Confiance() {
  const logos = confiance.logos;
  if (!logos.length) return null;
  const half = Math.ceil(logos.length / 2);

  return (
    <section aria-labelledby="confiance-title" className="paper relative overflow-hidden pb-16 pt-10 lg:pb-24 lg:pt-14">
      <div aria-hidden data-reveal="zoom" className="relative mx-auto grid h-[230px] w-[230px] place-items-center sm:h-[300px] sm:w-[300px]">
        <span className="absolute inset-0 rounded-full border border-hair/80 bg-[radial-gradient(closest-side,rgba(231,237,255,.25),rgba(231,237,255,.85))]" />
        <span className="absolute inset-[17%] rounded-full border border-hair bg-[radial-gradient(closest-side,rgba(255,255,255,.4),rgba(219,227,255,.9))]" />
        <span className="absolute inset-[33%] rounded-full border border-white bg-white shadow-panel" />
        <Monogram className="relative h-7 w-auto text-electric sm:h-8" />
      </div>
      <h2
        id="confiance-title"
        data-reveal="blur"
        className="relative -mt-12 text-center text-[20px] font-semibold tracking-[-0.02em] text-ink sm:-mt-14 sm:text-[24px]"
      >
        {confiance.title}
      </h2>

      <div
        data-reveal
        data-preload
        className="relative mt-8 grid gap-3 [-webkit-mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)] [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)] sm:gap-4 lg:mt-10"
      >
        <Row logos={logos.slice(0, half)} />
        <Row logos={logos.slice(half)} reverse />
      </div>

      <div className="gutter mx-auto mt-12 max-w-[1080px] lg:mt-16">
        <Figures />
      </div>
    </section>
  );
}
