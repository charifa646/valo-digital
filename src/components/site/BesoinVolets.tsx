"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { needs } from "@/lib/content";
import { Anchor } from "@/components/site/Scroll";
import { Words } from "@/components/ui/Words";

/**
 * « De quoi avez-vous besoin aujourd'hui ? », two ways to draw the two doors (14 October 2026, Charifa: the two cards « c'est
 * vilain », « d'autres propositions plus premium »). Her words, « Apprendre » and « Déléguer » with their sentences; each
 * glides to its section.
 * - `volets`, after « Hover Expand Gallery » (21st.dev, Kedhareswer Naidu): two tall photo panels side by side, the word large
 *   in white over the photo; the one under the hand widens, the other narrows. On phones, two tall panels one under the other.
 * - `liste`, editorial: the two words very large, one per line with a fine rule, an arrow at the end; on a computer the photo
 *   of the door under the hand shows on the right, on phones a small photo sits by each word.
 */
const portes = [
  { id: "apprendre", photo: "/images/terrain/universite-ki-zerbo.webp", pos: "50% 45%" },
  { id: "deleguer", photo: "/images/apropos/equipe-trio.webp", pos: "50% 28%" },
];

function Fleche({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

/** `id`: the section's anchor (« besoin » on the homepage, which the menu and the top's links lead to). Chosen on 14 October
 * 2026: `liste` (Charifa: « je préfère la version D »). */
export function BesoinVolets({ look = "volets", id }: { look?: "volets" | "liste"; id?: string }) {
  const [actif, setActif] = useState(0);
  const doors = portes.map((p) => ({ ...p, d: needs.doors.find((x) => x.id === p.id)! }));

  return (
    <section id={id} aria-labelledby={`besoin-${look}`} className="paper relative isolate bg-white">
      <div className="gutter mx-auto max-w-page pb-20 pt-16 lg:pb-28 lg:pt-24">
        <h2 id={`besoin-${look}`} data-reveal="words" className={`h2 balance text-ink ${look === "volets" ? "mx-auto max-w-[18ch] text-center" : "max-w-[18ch]"}`}>
          <Words>{needs.title}</Words>
        </h2>

        {look === "volets" ? (
          <div className="mt-10 flex flex-col gap-4 md:h-[540px] md:flex-row lg:mt-14">
            {doors.map((x, i) => (
              <Anchor
                key={x.id}
                to={x.d.target}
                onMouseEnter={() => setActif(i)}
                onFocus={() => setActif(i)}
                // the widening only side by side (computers, tablets): one under the other, each keeps its own height
                className="group relative block h-[420px] shrink-0 overflow-hidden rounded-[30px] bg-night transition-[flex-grow] duration-700 [transition-timing-function:var(--ease)] md:h-auto md:shrink md:basis-0 md:[flex-grow:var(--g)]"
                style={{ ["--g" as string]: actif === i ? 1.55 : 1 } as CSSProperties}
              >
                <Image src={x.photo} alt="" fill sizes="(min-width: 768px) 700px, 92vw" className="object-cover transition duration-700 group-hover:scale-[1.03]" style={{ objectPosition: x.pos }} />
                <span aria-hidden className="absolute inset-0 bg-[linear-gradient(0deg,rgba(4,11,82,.88)_0%,rgba(4,11,82,.35)_45%,rgba(4,11,82,.05)_100%)]" />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-7 sm:p-9">
                  <span>
                    <span className="block text-[clamp(2.4rem,1.6rem+2.6vw,4rem)] font-medium lowercase leading-none tracking-[-0.045em] text-white first-letter:uppercase">{x.d.name}</span>
                    <span className="mt-4 block max-w-[24rem] text-[15.5px] leading-relaxed text-white/80">{x.d.text}</span>
                  </span>
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-white text-night transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
                    <Fleche />
                  </span>
                </span>
              </Anchor>
            ))}
          </div>
        ) : (
          <div className="mt-10 grid items-stretch gap-10 lg:mt-14 lg:grid-cols-12">
            <ul className="border-t border-hair lg:col-span-7">
              {doors.map((x, i) => (
                <li key={x.id} className="border-b border-hair">
                  <Anchor
                    to={x.d.target}
                    onMouseEnter={() => setActif(i)}
                    onFocus={() => setActif(i)}
                    className="group flex items-center gap-3.5 py-6 sm:gap-5 sm:py-9"
                  >
                    <span className="relative block h-14 w-14 shrink-0 overflow-hidden rounded-2xl sm:h-20 sm:w-20 lg:hidden">
                      <Image src={x.photo} alt="" fill sizes="80px" className="object-cover" style={{ objectPosition: x.pos }} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={`block text-[clamp(2.1rem,1.3rem+4vw,5.4rem)] font-medium lowercase leading-none tracking-[-0.05em] transition-colors duration-300 first-letter:uppercase ${actif === i ? "text-electric" : "text-ink"}`}>
                        {x.d.name}
                      </span>
                      <span className="mt-2.5 block max-w-[30rem] text-[14.5px] leading-relaxed text-body sm:mt-3 sm:text-[15.5px]">{x.d.text}</span>
                    </span>
                    {/* the arrow on phones too, a size smaller (14 October 2026, Charifa: « sur mobile, on ne voit pas les flèches ») */}
                    <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 sm:h-14 sm:w-14 ${actif === i ? "bg-electric text-white" : "bg-white text-ink ring-1 ring-hair"}`}>
                      <Fleche />
                    </span>
                  </Anchor>
                </li>
              ))}
            </ul>
            <div aria-hidden className="relative hidden overflow-hidden rounded-[30px] bg-soft lg:col-span-5 lg:block">
              {doors.map((x, i) => (
                <Image
                  key={x.id}
                  src={x.photo}
                  alt=""
                  fill
                  sizes="480px"
                  className={`object-cover transition duration-700 ${actif === i ? "scale-100 opacity-100" : "scale-105 opacity-0"}`}
                  style={{ objectPosition: x.pos }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
