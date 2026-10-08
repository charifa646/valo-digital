import Image from "next/image";
import type { CSSProperties } from "react";
import { confiance, type ClientLogo } from "@/lib/content";
import { Monogram } from "@/components/brand/Logo";
import { Chiffres } from "./Chiffres";

/** One client's logo on its white card, the logo kept whole whatever its shape. */
export function LogoTile({ logo, hidden = false, className = "" }: { logo: ClientLogo; hidden?: boolean; className?: string }) {
  return (
    <span className={`relative block overflow-hidden rounded-[4px] border border-hair bg-white ${className}`}>
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
 * The field photos that fan out of the figures while the page turns night blue (Charifa, 8 October 2026:
 * « je veux voir »): VALO's own trainings and events, printed with a white edge, rising from the block's top and
 * spreading above it, their lower edge pinned over it, then folding back when the colour goes. `x` is in hundredths of the block's width, `y` in
 * pixels from its top, `i` the order they leave in (from the middle outwards); `tel` places the four kept on phones.
 * Decorative, hidden from screen readers.
 */
type Spot = { x: number; y: number; r: number; i: number };
const wall: (Spot & { src: string; tel?: Spot })[] = [
  { src: "akili", x: 9, y: -120, r: -7, i: 2 },
  { src: "forum-du-digital", x: 26, y: -150, r: 3, i: 1, tel: { x: 17, y: -78, r: -8, i: 1 } },
  { src: "valo-connect-2", x: 43, y: -128, r: -3, i: 0, tel: { x: 39, y: -96, r: -2, i: 0 } },
  { src: "simplon-reconversion", x: 60, y: -156, r: 4, i: 0, tel: { x: 61, y: -86, r: 4, i: 0 } },
  { src: "seteck", x: 77, y: -124, r: -4, i: 1, tel: { x: 83, y: -100, r: 9, i: 1 } },
  { src: "universite-ki-zerbo", x: 94, y: -146, r: 7, i: 2 },
];

function Mur() {
  return (
    <div aria-hidden className="mur">
      {wall.map((p) => (
        <span
          key={p.src}
          className="mur-photo"
          data-tel={p.tel ? "" : undefined}
          style={
            {
              "--X": p.x,
              "--Y": p.y,
              "--R": `${p.r}deg`,
              "--I": p.i,
              "--x": p.tel?.x ?? p.x,
              "--y": p.tel?.y ?? p.y,
              "--r": `${p.tel?.r ?? p.r}deg`,
              "--i": p.tel?.i ?? p.i,
            } as CSSProperties
          }
        >
          <Image src={`/images/terrain/${p.src}.webp`} alt="" fill sizes="(min-width: 1024px) 220px, (min-width: 640px) 24vw, 34vw" className="object-cover" />
        </span>
      ))}
    </div>
  );
}

/**
 * « Ils nous ont fait confiance », right after the homepage's top: the VALO mark
 * in its rings, the sentence, the clients' logos in two rows going opposite
 * ways, then the three key figures (`Chiffres.tsx`) and their field photos.
 */
export function Confiance() {
  const logos = confiance.logos;
  if (!logos.length) return null;
  const half = Math.ceil(logos.length / 2);

  return (
    <section aria-labelledby="confiance-title" className="paper relative overflow-hidden pb-16 pt-10 lg:pb-24 lg:pt-14">
      <div aria-hidden data-anneaux data-reveal="zoom" className="relative mx-auto grid h-[230px] w-[230px] place-items-center sm:h-[300px] sm:w-[300px]">
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
        className="logos-rangs relative mt-8 grid gap-3 [-webkit-mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)] [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)] sm:gap-4 lg:mt-10"
      >
        <Row logos={logos.slice(0, half)} />
        <Row logos={logos.slice(half)} reverse />
      </div>

      <div className="gutter mx-auto mt-12 max-w-page lg:mt-16">
        <div className="relative">
          <Mur />
          <Chiffres className="relative z-[1]" />
        </div>
      </div>
    </section>
  );
}
