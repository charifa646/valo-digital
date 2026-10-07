import Image from "next/image";
import { confiance, type ClientLogo } from "@/lib/content";
import { Monogram } from "@/components/brand/Logo";
import { Chiffres } from "./Chiffres";

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
 * « Ils nous ont fait confiance », right after the homepage's top: the VALO mark
 * in its rings, the sentence, the clients' logos in two rows going opposite
 * ways, then the three key figures (`Chiffres.tsx`).
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
        <Chiffres />
      </div>
    </section>
  );
}
