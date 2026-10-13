import Image from "next/image";
import type { CSSProperties } from "react";
import { needs } from "@/lib/content";
import { Anchor } from "./Scroll";
import { Words } from "@/components/ui/Words";

/**
 * « De quoi avez-vous besoin aujourd'hui ? » as two ways in (14 October 2026, Charifa, after her ChatGPT mock-up: a visitor
 * comes either to be trained or to hand over a service; « Comprendre » and « Accélérer » are services, the diagnosis and the
 * support, and are found under « Déléguer »). Her validated words, « Apprendre » and « Déléguer » with their sentences; each
 * door glides to its part of the page (her choice: the section, not the form). The first in night blue, the second white,
 * as the two doors at the foot of the page. Real photos of VALO's trainings and team.
 */
const portes = [
  { id: "apprendre", photo: "/images/terrain/universite-ki-zerbo.webp", pos: "50% 45%", nuit: true },
  { id: "deleguer", photo: "/images/apropos/equipe-trio.webp", pos: "50% 30%", nuit: false },
];

export function NeedsPortes() {
  return (
    <section id="besoin" aria-labelledby="besoin-title" className="paper grain relative isolate">
      <div className="gutter mx-auto max-w-page pb-20 pt-16 lg:pb-28 lg:pt-24">
        <h2 id="besoin-title" data-reveal="words" className="h2 balance mx-auto max-w-[18ch] text-center text-ink">
          <Words>{needs.title}</Words>
        </h2>
        <div className="mt-10 grid gap-4 sm:gap-5 md:grid-cols-2 lg:mt-14">
          {portes.map((p, i) => {
            const d = needs.doors.find((x) => x.id === p.id)!;
            return (
              <Anchor
                key={p.id}
                to={d.target}
                data-reveal="photo"
                style={{ ["--d" as string]: `${i * 0.12}s` } as CSSProperties}
                className={`group flex flex-col overflow-hidden rounded-[28px] transition duration-500 [transition-timing-function:var(--ease)] hover:-translate-y-1 ${
                  p.nuit ? "bg-night text-white shadow-[0_30px_70px_-35px_rgba(4,11,82,.85)]" : "bg-white text-ink ring-1 ring-hair shadow-[0_30px_70px_-45px_rgba(4,11,82,.4)]"
                }`}
              >
                <span className="relative m-2.5 block aspect-[16/10] overflow-hidden rounded-[20px] bg-soft">
                  <Image
                    src={p.photo}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 560px, 92vw"
                    className="object-cover transition duration-700 [transition-timing-function:var(--ease)] group-hover:scale-[1.04]"
                    style={{ objectPosition: p.pos }}
                  />
                </span>
                <span className="flex flex-1 items-end justify-between gap-6 px-6 pb-7 pt-4 sm:px-8 sm:pb-8">
                  <span>
                    <span className="block text-[clamp(1.9rem,1.3rem+1.9vw,2.9rem)] font-medium lowercase leading-none tracking-[-0.04em] first-letter:uppercase">
                      {d.name}
                    </span>
                    <span className={`pretty mt-4 block max-w-[26rem] text-[15.5px] leading-relaxed ${p.nuit ? "text-white/75" : "text-body"}`}>{d.text}</span>
                  </span>
                  <span
                    aria-hidden
                    className={`grid h-12 w-12 shrink-0 place-items-center rounded-full transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${
                      p.nuit ? "bg-white text-night" : "bg-electric text-white"
                    }`}
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17 17 7M8 7h9v9" />
                    </svg>
                  </span>
                </span>
              </Anchor>
            );
          })}
        </div>
      </div>
    </section>
  );
}
