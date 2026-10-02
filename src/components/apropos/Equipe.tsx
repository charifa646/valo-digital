import Image from "next/image";
import type { CSSProperties } from "react";
import { apropos } from "@/lib/content";
import { Words } from "@/components/ui/Words";

/**
 * « Notre équipe »: the five of VALO DIGITAL, the manager first. Cards side by
 * side on large screens; on phones a short list, each face in a circle.
 */
export function Equipe() {
  const e = apropos.equipe;
  return (
    <section aria-labelledby="equipe-title" className="paper halo-bl relative isolate">
      <div className="gutter mx-auto max-w-page py-24 lg:py-32">
        <div className="text-center">
          <p data-reveal="rule" className="tag tag-center">
            {e.label}
          </p>
          <h2 id="equipe-title" data-reveal="words" className="h2 mt-5 text-ink">
            <Words>{e.title}</Words>
          </h2>
        </div>

        <ul className="mx-auto mt-12 grid max-w-[1120px] gap-3 sm:grid-cols-3 sm:gap-5 lg:mt-16 lg:grid-cols-5">
          {e.members.map((m, i) => (
            <li
              key={m.name}
              data-reveal="flip"
              style={{ ["--d" as string]: `${i * 0.09}s` } as CSSProperties}
              className="flex items-center gap-4 rounded-2xl border border-hair bg-white p-3 sm:block sm:overflow-hidden sm:p-0"
            >
              <span className="relative block h-16 w-16 shrink-0 overflow-hidden rounded-full bg-soft sm:aspect-[1/1.02] sm:h-auto sm:w-full sm:rounded-none">
                <Image src={m.photo} alt="" fill sizes="(min-width: 1024px) 216px, (min-width: 640px) 31vw, 64px" className="object-cover object-top" />
              </span>
              <span className="block min-w-0 sm:px-4 sm:pb-5 sm:pt-4">
                <span className="block text-[15.5px] font-semibold leading-snug tracking-[-0.01em] text-ink">{m.name}</span>
                <span className={`mt-1 block text-[13.5px] font-medium ${i === 0 ? "text-electric" : "text-body"}`}>{m.role}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
