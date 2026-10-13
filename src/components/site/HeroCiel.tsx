"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";
import { figures, figuresBloc, formations, hero, needs, prestations } from "@/lib/content";
import { DemandeButton, useSheet } from "./Sheet";
import { Anchor } from "./Scroll";
import { Monogram } from "@/components/brand/Logo";
import { Price } from "@/components/ui/Price";

const d = (s: number) => ({ ["--d" as string]: `${s}s` }) as CSSProperties;
const door = (id: string) => needs.doors.find((x) => x.id === id)!;
const reseaux = prestations.offers.find((o) => o.id === "reseaux")!;
const [marketing, publicite] = hero.tags;
const formes = figures[0];
const projets = figures[1];

function Fleche({ className = "h-3 w-3" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

/**
 * The top « ciel », after the top of Charifa's ChatGPT mock-up (the blue parrot, 14 October 2026: « c'est exactement ça
 * que je veux »), redrawn for VALO: the sky, the subject cut out in the middle and melting into the blue, the glass card on
 * the left joined to her by a fine line, the stack of three cards, the round figure, the white button with its halo, the
 * notch at the foot. A woman instead of the parrot, laughing, her phone in hand (the photo Charifa chose, cut out with a
 * portrait model so no edge shows on the sky). Only her own words and VALO's real figures and offers: the mock-up's own
 * sentences are not hers and are not used; the homepage's two doors give the cards their words.
 *
 * As the mock-up, the whole top holds in one screen, nothing cut, nothing running over (« il a dézoomé »): the part is the
 * height of the screen, the photo takes the room left by the words, and the cards are placed from her, in units of the
 * scene's height (`cqh`), so they keep their places on her on every screen. On a computer, as the mock-up's: the woman
 * smaller in the middle, the cards drawn out towards the edges, and a deep notch whose white shoulders carry VALO's
 * mission and its link on the left, « +100 projets réalisés » and its link on the right. `ordre`: « titre », her title
 * above the photo, which bites into it (her idea), her sentence in the sky's tongue on a computer; « image », the photo
 * first and the title at the foot, in the tongue on a computer, as the mock-up's.
 */
export function HeroCiel({ ordre = "titre" }: { ordre?: "titre" | "image" }) {
  const root = useRef<HTMLElement>(null);
  const { open } = useSheet();
  const [first, second] = hero.title;
  const apprendre = door("apprendre");
  const deleguer = door("deleguer");
  const titreHaut = ordre === "titre";

  // while the page goes up, the woman rises a little slower than it and the cards part: transforms only
  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let shown = true;
    const io = new IntersectionObserver(([e]) => (shown = e.isIntersecting));
    io.observe(el);
    const moving = Array.from(el.querySelectorAll<HTMLElement>("[data-par]"));
    let frame = 0;
    const update = () => {
      frame = 0;
      const k = Math.min(1, Math.max(0, window.scrollY / window.innerHeight));
      for (const m of moving) {
        const [x, y] = m.dataset.par!.split(",").map(Number);
        m.style.transform = `translate3d(${(x * k).toFixed(1)}px, ${(y * k).toFixed(1)}px, 0)`;
      }
    };
    const soon = () => {
      if (shown && !frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", soon, { passive: true });
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", soon);
    };
  }, []);

  return (
    <section ref={root} id="top" className={`ciel play-when-in ${titreHaut ? "ciel-titre-haut" : "ciel-image-haut"}`}>
      <div className="ciel-fond">
        <div aria-hidden className="ciel-lumiere" />

        <div className="ciel-tete">
          <p className="ciel-surtitre fade-in" style={d(0.05)}>
            {hero.tags.join(" · ")}
          </p>
          {titreHaut && (
            <h1 className="ciel-titre">
              <span className="balance block">
                {first.split(" ").map((w, i) => (
                  <span key={i}>
                    <span className="blur-in inline-block" style={d(0.12 + i * 0.06)}>
                      {w}
                    </span>{" "}
                  </span>
                ))}
              </span>
              <span className="ciel-italique blur-in block" style={d(0.5)}>
                {second}
              </span>
            </h1>
          )}
        </div>

        {/* the scene: as tall as the room left, the woman in the middle, the cards placed from her */}
        <div className="ciel-scene">
          <div data-par="0,-30" className="ciel-cadre">
            <div className="ciel-femme-entree h-full w-full">
              <Image
                src="/images/hero/femme-rire.webp"
                alt=""
                width={1060}
                height={1254}
                priority
                sizes="(min-width: 1024px) 480px, 80vw"
                className="h-full w-full object-contain object-bottom"
              />
            </div>
          </div>

          <span aria-hidden className="ciel-ligne" />
          <span aria-hidden className="ciel-point" />

          {/* +1 000 entrepreneurs trained, with three real moments of VALO's trainings */}
          <div data-par="-14,-40" className="ciel-pos ciel-pos-pastille">
            <div className="pop-in" style={d(1.05)}>
              <Anchor to="formations" className="ciel-pastille float [--fd:-1s] [--r:-2deg] [--t:9s]">
                <span aria-hidden className="ciel-avatars">
                  {["universite-ki-zerbo", "entreprendre-au-feminin", "vendeurs-en-ligne"].map((p) => (
                    <span key={p}>
                      <Image src={`/images/terrain/${p}.webp`} alt="" fill sizes="32px" className="object-cover" />
                    </span>
                  ))}
                </span>
                <span className="text-left leading-none">
                  <span className="ciel-pastille-chiffre">{formes.value}</span>
                  <span className="ciel-pastille-mot">{formes.caption}</span>
                </span>
                <Fleche className="ciel-pastille-fleche" />
              </Anchor>
            </div>
          </div>

          {/* left: « Apprendre », the trainings, a real photo of a VALO training in the place of the mock-up's globe */}
          <div data-par="-30,10" className="ciel-pos ciel-pos-gauche">
            <div className="drop-in" style={d(0.9)}>
              <Anchor to="formations" className="ciel-verre float [--fd:-3s] [--r:-4deg] [--t:10s]">
                <span aria-hidden className="ciel-bulle">
                  <Image src="/images/terrain/universite-ki-zerbo.webp" alt="" fill sizes="96px" className="object-cover" />
                </span>
                <span className="ciel-petit">{apprendre.name}</span>
                <span className="ciel-verre-texte">{apprendre.text}</span>
                <span className="ciel-verre-lien">
                  {formations.grand}
                  <Fleche className="h-2.5 w-2.5" />
                </span>
              </Anchor>
            </div>
          </div>

          {/* right: « Déléguer », three cards stacked, the front one a real offer with its price */}
          <div data-par="30,-20" className="ciel-pos ciel-pos-droite">
            <div className="drop-in" style={d(1)}>
              <div className="ciel-pile float [--fd:-5s] [--r:3deg] [--t:11s]">
                <span aria-hidden className="ciel-pile-fond ciel-pile-nuit">
                  {publicite}
                  <Fleche className="h-2 w-2" />
                </span>
                <span aria-hidden className="ciel-pile-fond ciel-pile-blanche">
                  {marketing}
                  <Fleche className="h-2 w-2" />
                </span>
                <button type="button" onClick={() => open("reseaux")} aria-haspopup="dialog" className="ciel-pile-face">
                  <span className="flex items-start justify-between gap-2">
                    <Monogram className="ciel-pile-logo" />
                    <span className="ciel-petit ciel-petit-clair">{deleguer.name}</span>
                  </span>
                  <span className="ciel-pile-titre">{reseaux.name}</span>
                  <span className="ciel-pile-prix">
                    <Price price={reseaux.price} light size="sm" />
                    <Fleche className="h-3 w-3 shrink-0" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* the button with its halo; under it, in the « image » order, her title as the mock-up's last words */}
        <div className="ciel-bas">
          <div className="bounce-in" style={d(1.2)}>
            <span className="ciel-halo">
              <DemandeButton className="ciel-bouton">
                {hero.cta}
                <Fleche className="h-4 w-4" />
              </DemandeButton>
            </span>
          </div>
        </div>

        {/* in the « image » order her title, as the mock-up's last words: in the sky above the notch on a phone, in the
            sky's tongue on a computer; in the « titre » order, her sentence there on a computer */}
        {titreHaut ? (
          <p className="ciel-langue-texte fade-in" style={d(1.35)}>
            {hero.lead}
          </p>
        ) : (
          <h1 className="ciel-titre-bas fade-up" style={d(1.3)}>
            {first} {second}
          </h1>
        )}
      </div>

      {/* the notch at the foot: the sky goes on in the middle; on its white shoulders, on a computer, VALO's mission and
          « +100 projets réalisés », each with its way in (on a phone, only the two ways in) */}
      <div className="ciel-liens">
        <div className="ciel-epaule">
          <span aria-hidden className="ciel-ronds">
            <span>
              <Fleche className="h-2.5 w-2.5" />
            </span>
            <span>
              <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" />
              </svg>
            </span>
          </span>
          <p className="ciel-epaule-texte">{figuresBloc.text}</p>
          <Anchor to="prestations" className="ciel-lien">
            {prestations.grand}
            <Fleche className="h-2.5 w-2.5" />
          </Anchor>
        </div>
        <div className="ciel-langue">
          <Anchor to="besoin" aria-label="Descendre" className="ciel-descendre">
            <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M6 13l6 6 6-6" />
            </svg>
          </Anchor>
        </div>
        <div className="ciel-epaule ciel-epaule-droite">
          <p className="ciel-chiffre">
            <span className="ciel-chiffre-nombre">{projets.value}</span>
            <span className="ciel-chiffre-mot">{projets.caption}</span>
          </p>
          <Anchor to="formations" className="ciel-lien">
            {formations.grand}
            <Fleche className="h-2.5 w-2.5" />
          </Anchor>
        </div>
      </div>
    </section>
  );
}
