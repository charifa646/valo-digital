import Image from "next/image";
import type { CSSProperties } from "react";
import {
  IconBrandFacebook,
  IconBrandMeta,
  IconBuildingStore,
  IconMovie,
  IconPalette,
  IconSchool,
  IconShoppingCart,
  IconSparkles,
  IconTargetArrow,
  IconUsersGroup,
  IconWriting,
} from "@tabler/icons-react";
import { apropos } from "@/lib/content";
import { Words } from "@/components/ui/Words";

// one icon per skill, in the portfolio's order
const icons = [
  IconBrandMeta,
  IconUsersGroup,
  IconTargetArrow,
  IconShoppingCart,
  IconBuildingStore,
  IconBrandFacebook,
  IconWriting,
  IconPalette,
  IconMovie,
  IconSparkles,
  IconSchool,
];

/** The eleven skills learnt on his own, as a numbered index beside Valentin in his blue waistcoat. */
export function Competences() {
  const c = apropos.competences;
  return (
    <section aria-labelledby="competences-title" className="paper relative bg-white">
      <div className="gutter mx-auto grid max-w-page items-center gap-14 pb-24 pt-16 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16 lg:pb-32 lg:pt-20">
        <div>
          <p data-reveal="rule" className="tag">
            {c.label}
          </p>
          <h2 id="competences-title" data-reveal="words" className="h2 balance mt-5 max-w-[22ch] text-ink">
            <Words>{c.title}</Words>
          </h2>
          <ol className="mt-10 grid border-t border-hair sm:grid-cols-2 sm:gap-x-10 lg:mt-12">
            {c.items.map((s, i) => {
              const Icon = icons[i];
              return (
                <li
                  key={s}
                  data-reveal="slide-left"
                  style={{ ["--d" as string]: `${(i % 6) * 0.06}s` } as CSSProperties}
                  className="flex items-center gap-4 border-b border-hair py-3.5 sm:py-4"
                >
                  <span className="w-6 shrink-0 text-[12px] font-semibold tabular-nums text-mute">{String(i + 1).padStart(2, "0")}</span>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-frost text-electric">
                    <Icon className="h-[18px] w-[18px]" stroke={1.8} aria-hidden />
                  </span>
                  <span className="text-[15.5px] font-semibold tracking-[-0.01em] text-ink sm:text-[16px]">{s}</span>
                </li>
              );
            })}
          </ol>
        </div>

        <figure data-reveal="zoom" className="relative mx-auto w-full max-w-[400px] lg:mx-0 lg:justify-self-end">
          <div className="overflow-hidden rounded-2xl bg-night">
            <Image
              src="/images/apropos/valentin-gilet.webp"
              alt=""
              width={900}
              height={1166}
              sizes="(min-width: 1024px) 400px, 86vw"
              className="h-auto w-full"
            />
          </div>
        </figure>
      </div>
    </section>
  );
}
