"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";
import { figures, figuresBloc, formations, hero, needs, prestations } from "@/lib/content";
import { DemandeButton, useSheet } from "./Sheet";
import { Anchor } from "./Scroll";
import { Monogram } from "@/components/brand/Logo";

const door = (id: string) => needs.doors.find((x) => x.id === id)!;
const reseaux = prestations.offers.find((o) => o.id === "reseaux")!;
const [marketing, publicite] = hero.tags;
const formes = figures[0];
const projets = figures[1];
/** « À partir de 150 000 F CFA / mois » cut in three, every word kept */
const [prixDebut, prixReste] = [reseaux.price.slice(0, reseaux.price.indexOf("150")).trim(), reseaux.price.slice(reseaux.price.indexOf("150"))];
const [prixMontant, prixPar] = [prixReste.slice(0, prixReste.indexOf("/")).trim(), prixReste.slice(prixReste.indexOf("/"))];

function Fleche({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={`ciel-fleche ${className}`} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 19 19 5M5 5h14v14" />
    </svg>
  );
}

/**
 * The top « ciel », drawn from the code of Charifa's ChatGPT mock-up (« Astra », the blue parrot, 14 October 2026: « c'est
 * exactement ça que je veux »; its `glacier.css` handed over the same day): the same scene, the same places to the pixel at
 * each width (1600, 1150, 850, 600, 360), the same small type around a large subject (« il a dézoomé la section »). Her
 * changes: a woman laughing, her phone in hand, in the parrot's place (the photo she chose, cut out); only her own words and
 * VALO's real figures and offers (the mock-up's sentences are not hers and are not used); the round photo of a VALO
 * training where the mock-up had a globe. `ordre`: « titre », her title where the mock-up wrote « VALO DIGITAL », cut on
 * either side of the head as the two words were, her sentence under the button; « image », the top left to the sky, her
 * title under the button as the mock-up's last words.
 */
export function HeroCiel({ ordre = "titre" }: { ordre?: "titre" | "image" }) {
  const root = useRef<HTMLElement>(null);
  const { open } = useSheet();
  const [first, second] = hero.title;
  const apprendre = door("apprendre");
  const deleguer = door("deleguer");
  const titreHaut = ordre === "titre";

  // the mock-up's slight depth: the woman follows the pointer a little (not on touch screens, not for reduced motion)
  useEffect(() => {
    const el = root.current;
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const move = (e: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--scene-x", `${(((e.clientX - r.left) / r.width - 0.5) * 14).toFixed(1)}px`);
        el.style.setProperty("--scene-y", `${(((e.clientY - r.top) / r.height - 0.5) * 8).toFixed(1)}px`);
      });
    };
    el.addEventListener("pointermove", move);
    return () => {
      el.removeEventListener("pointermove", move);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={root} id="top" aria-labelledby="ciel-titre" className={`ciel play-when-in ${titreHaut ? "ciel-a" : "ciel-b"}`}>
      <div className="ciel-sky" aria-hidden />

      {titreHaut && (
        <h1 id="ciel-titre" className="ciel-mot">
          <span className="ciel-mot-gauche blur-in">{first}</span>{" "}
          {/* the signature (Charifa, 14 October 2026): the italic comes in word by word, a slow glint of light crosses it, and a
              hand-drawn yellow stroke is traced under it. Word by word, never revealed by a moving mask: a mask stopped half way
              on a busy phone and left « levier de crois » cut (Charifa: « c'est arrêté à crois ») */}
          <span className="ciel-mot-droite">
            {second.split(" ").map((w, i) => (
              <span key={i}>
                <span className="ciel-ecrit" style={{ ["--d" as string]: `${0.55 + i * 0.18}s` } as CSSProperties}>
                  {w}
                </span>{" "}
              </span>
            ))}
          </span>
        </h1>
      )}
      <p className="ciel-kicker fade-in">{hero.tags.join(" · ")}</p>

      <Image
        src="/images/hero/femme-rire.webp"
        alt=""
        width={1060}
        height={1254}
        priority
        quality={64}
        sizes="(max-width: 600px) 92vw, 520px"
        className="ciel-femme"
      />

      <svg className="ciel-liens-trait" viewBox="0 0 1200 220" fill="none" aria-hidden>
        <path d="M0 152H534Q550 152 550 136V127Q550 111 566 111H854Q870 111 870 95V36Q870 20 886 20H1140" stroke="white" strokeOpacity=".65" strokeWidth="1.3" />
        <circle cx="550" cy="152" r="7" fill="white" />
        <circle cx="550" cy="152" r="16" stroke="white" strokeOpacity=".2" strokeWidth="6" />
      </svg>

      <Anchor to="formations" className="ciel-preuve pop-in">
        <span className="ciel-portraits" aria-hidden>
          {["universite-ki-zerbo", "entreprendre-au-feminin", "vendeurs-en-ligne"].map((p) => (
            <Image key={p} src={`/images/terrain/${p}.webp`} alt="" width={48} height={48} />
          ))}
        </span>
        <span>
          <b>{formes.value}</b>
          <small>{formes.caption}</small>
        </span>
        <Fleche className="ciel-preuve-fleche" />
      </Anchor>

      <Anchor to="formations" className="ciel-carte drop-in">
        <span className="ciel-carte-photo" aria-hidden>
          <Image src="/images/terrain/universite-ki-zerbo.webp" alt="" fill sizes="150px" className="object-cover" />
        </span>
        <span className="ciel-carte-index">{apprendre.name}</span>
        <strong>{apprendre.text}</strong>
        <span className="ciel-carte-lien">
          {formations.grand} <Fleche />
        </span>
      </Anchor>

      <div className="ciel-offres drop-in">
        <span className="ciel-offre ciel-offre-fond" aria-hidden>
          <span>{publicite}</span>
          <Fleche />
        </span>
        <span className="ciel-offre ciel-offre-milieu" aria-hidden>
          <span>{marketing}</span>
          <Fleche />
        </span>
        <button type="button" onClick={() => open("reseaux")} aria-haspopup="dialog" className="ciel-offre ciel-offre-face">
          <span className="ciel-offre-haut">
            <Monogram className="ciel-offre-logo" />
            <span>{deleguer.name}</span>
          </span>
          <strong>{reseaux.name}</strong>
          <span className="ciel-offre-bas">
            <span>
              {prixDebut} <b>{prixMontant}</b> {prixPar}
            </span>
            <Fleche className="ciel-offre-fleche" />
          </span>
        </button>
      </div>

      <div className="ciel-centre">
        <DemandeButton className="ciel-bouton bounce-in">
          {hero.cta} <Fleche />
        </DemandeButton>
        {titreHaut ? (
          <p className="ciel-phrase fade-in">{hero.lead}</p>
        ) : (
          <h1 id="ciel-titre" className="ciel-titre-bas fade-up">
            {first} {second}
          </h1>
        )}
        <Anchor to="besoin" aria-label="Descendre" className="ciel-bas-fleche">
          ↓
        </Anchor>
      </div>

      <div className="ciel-aile ciel-aile-gauche">
        <span className="ciel-ronds" aria-hidden>
          <i>↗</i>
          <i>✳</i>
        </span>
        <p>{figuresBloc.text}</p>
        <Anchor to="prestations">
          {prestations.grand} <span aria-hidden>↗</span>
        </Anchor>
      </div>
      <div className="ciel-aile ciel-aile-droite">
        <div className="ciel-nombre">
          <b>{projets.value}</b>
          <p>{projets.caption}</p>
        </div>
        <Anchor to="formations">
          {formations.grand} <span aria-hidden>↗</span>
        </Anchor>
      </div>
    </section>
  );
}
