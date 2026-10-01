import Image from "next/image";
import { confiance, type ClientLogo } from "@/lib/content";
import { Monogram } from "@/components/brand/Logo";

/**
 * « Ils nous ont fait confiance »: the VALO mark in its rings, the sentence, then
 * the clients' logos passing slowly, in grey until a hand goes over them. The
 * band is not shown until the real logos are in content.ts; `preview` shows empty
 * slots in their place, for the local captures only.
 */
export function Confiance({ preview = false }: { preview?: boolean }) {
  const logos: (ClientLogo | null)[] = confiance.logos.length ? confiance.logos : preview ? Array(7).fill(null) : [];
  if (!logos.length) return null;
  const row = [...logos, ...logos]; // twice, so the loop has no seam

  return (
    <section aria-labelledby="confiance-title" className="relative overflow-hidden pb-14 pt-10 lg:pb-16 lg:pt-14">
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

      <div className="relative mt-8 [-webkit-mask-image:linear-gradient(90deg,transparent,#000_14%,#000_86%,transparent)] [mask-image:linear-gradient(90deg,transparent,#000_14%,#000_86%,transparent)] lg:mt-10">
        <ul className="logos-track flex w-max items-center gap-12 sm:gap-16">
          {row.map((l, i) => (
            <li key={i} aria-hidden={i >= logos.length || undefined} className="shrink-0">
              {l ? (
                <Image
                  src={l.src}
                  alt={i < logos.length ? l.name : ""}
                  width={l.width}
                  height={l.height}
                  className="h-8 w-auto opacity-60 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 sm:h-9"
                />
              ) : (
                <span className="grid h-9 w-[132px] place-items-center rounded-[8px] border border-dashed border-mute/40 text-[12px] font-semibold text-mute">
                  Logo client
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
