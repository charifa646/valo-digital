"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { formations, hero, prestations } from "@/lib/content";
import { DemandeButton } from "./Sheet";
import { Monogram } from "@/components/brand/Logo";
import { BtnInner, btn } from "@/components/ui/Action";
import { Glyphe, type Metier } from "@/components/ui/Glyphes";

const [marketing, publicite, vente, formation] = hero.tags;
/** The four trades, in the order of `hero.tags`, each with its own icon. */
const metiers: Metier[] = ["marketing", "publicite", "vente", "formation"];
const offer = (id: string) => prestations.offers.find((o) => o.id === id)!;
const course = (id: string) => formations.items.find((f) => f.id === id)!;

type Slide = { tag: string; img: string; name: string; price: string };

/** What the phone shows, one after the other: three real offers of VALO, with their own names and prices. */
const slides: Slide[] = [
  { tag: publicite, img: "/images/formations/ads.webp", name: offer("publicite").name, price: `${offer("publicite").price} ${offer("publicite").note!.toLowerCase()}` },
  { tag: marketing, img: "/images/formations/contenu.webp", name: offer("video").name, price: offer("video").price },
  { tag: formation, img: "/images/formations/cohorte.webp", name: course("marketing").name, price: course("marketing").price },
];

/** The cards on either side of the phone: the inner ones whole, the outer ones fading into the page. */
const cards = [
  { side: -2, img: "/images/formations/ia.webp", tag: formation },
  { side: -1, img: "/images/formations/cm.webp", tag: marketing, name: offer("reseaux").name, price: offer("reseaux").price },
  { side: 1, img: "/images/formations/boutique.webp", tag: vente, name: course("vente").name, price: course("vente").price },
  { side: 2, img: "/images/formations/marketing.webp", tag: formation },
];

/**
 * The four trades, floating around the phone as glass labels, each pointed at by a small cursor in a blue of the
 * charte, as several people working on one design (after Charifa's visual « Favorite User Interface Typefaces », 13
 * October 2026). They replace the line of trades under the button (three lines on a phone: « ce n'est pas stylé ») and
 * the round badges. Placed in the scene, so they keep their places when it is scaled down on a phone.
 */
const etiquettes: { metier: Metier; curseur: string; t: string }[] = [
  { metier: "marketing", curseur: "#0714D8", t: "[--r:-3deg] [--t:7.4s]" },
  { metier: "publicite", curseur: "#3551FF", t: "[--r:3deg] [--t:8.2s] [--fd:-2s]" },
  { metier: "vente", curseur: "#0E7CFC", t: "[--r:-2deg] [--t:7.8s] [--fd:-4s]" },
  { metier: "formation", curseur: "#071F78", t: "[--r:2deg] [--t:8.8s] [--fd:-1s]" },
];

function Etiquette({ metier, curseur }: { metier: Metier; curseur: string }) {
  return (
    <span className="etiquette">
      <svg aria-hidden viewBox="0 0 16 16" className="etiquette-curseur">
        <path d="M1.5 1.2 14.6 6.4c.5.2.5.9 0 1.1L9.3 9.3 7.5 14.6c-.2.5-.9.5-1.1 0L1.2 1.5c-.1-.2.1-.4.3-.3Z" fill={curseur} stroke="#fff" strokeWidth="1.3" strokeLinejoin="round" />
      </svg>
      <Glyphe metier={metier} className="h-[17px] w-[17px] text-electric" />
      {hero.tags[metiers.indexOf(metier)]}
    </span>
  );
}

/** A photo card: the trade at the top, the offer's name and price at the foot over a dark fade. */
function Carte({ img, tag, name, price, sizes }: { img: string; tag: string; name?: string; price?: string; sizes: string }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[18px] bg-frost shadow-[0_30px_60px_-30px_rgba(7,20,216,.55),0_2px_6px_rgba(11,18,51,.08)]">
      <Image src={img} alt="" fill sizes={sizes} className="object-cover" />
      {name && (
        <span className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(4,11,82,.82))] px-3.5 pb-3.5 pt-12 text-left text-white">
          <span className="line-clamp-3 block text-[13px] font-bold leading-snug">{name}</span>
          {price && <span className="mt-2 inline-block rounded-[8px] bg-white/20 px-2 py-0.5 text-[9.5px] font-semibold leading-snug">{price}</span>}
        </span>
      )}
    </div>
  );
}

/**
 * The thrown shapes: three spheres around the edges (the far one out of focus), and two bands of light crossing the foot
 * of the top like a wave, out of focus too, with a fine bright line along them. Sizes in the screen's width so they keep
 * their place on a phone.
 */
function Formes() {
  return (
    <div aria-hidden className="formes">
      <svg className="forme-vague" viewBox="0 0 1440 600" preserveAspectRatio="none">
        <defs>
          <linearGradient id="vague-a" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#8fb2ff" stopOpacity="0" />
            <stop offset="0.45" stopColor="#3551ff" stopOpacity="0.38" />
            <stop offset="1" stopColor="#0e7cfc" stopOpacity="0.75" />
          </linearGradient>
          <linearGradient id="vague-b" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#0714d8" stopOpacity="0.5" />
            <stop offset="0.55" stopColor="#3551ff" stopOpacity="0.22" />
            <stop offset="1" stopColor="#8fd3ff" stopOpacity="0" />
          </linearGradient>
          <filter id="vague-flou" x="-10%" y="-40%" width="120%" height="180%">
            <feGaussianBlur stdDeviation="14" />
          </filter>
        </defs>
        <path filter="url(#vague-flou)" fill="url(#vague-a)" d="M-60 520C340 470 720 560 1000 380C1180 265 1320 210 1500 190L1500 330C1330 340 1200 420 1030 500C760 620 360 560 -60 600Z" />
        <path filter="url(#vague-flou)" fill="url(#vague-b)" d="M-60 300C200 360 420 470 640 520C820 560 1000 540 1500 470L1500 520C1000 610 800 620 600 580C380 535 180 430 -60 380Z" />
        <path fill="none" stroke="#ffffff" strokeOpacity="0.85" strokeWidth="1.6" d="M-60 545C340 500 720 580 1010 405C1190 300 1330 245 1500 225" />
      </svg>
      <span className="forme forme-un float [--r:4deg] [--t:11s]">
        <i />
      </span>
      <span className="forme float left-[-6vw] top-[56%] h-[clamp(96px,12vw,180px)] w-[clamp(96px,12vw,180px)] [--fd:-4s] [--r:-6deg] [--t:9s] [--o:0.6] [--flou:1px]">
        <i />
      </span>
      <span className="forme float left-[7%] top-[12%] hidden h-[clamp(60px,6.5vw,100px)] w-[clamp(60px,6.5vw,100px)] [--flou:7px] [--o:0.5] [--fd:-2s] [--t:13s] sm:block">
        <i />
      </span>
    </div>
  );
}

/** Which squares of each patch are filled: column, row, strength, blur, and whether it slowly lights up and goes out. */
type Case = { x: number; y: number; a?: number; f?: number; vit?: boolean; d?: number };
const coinGauche: Case[] = [
  { x: 2, y: 2, a: 0.16 },
  { x: 4, y: 1, a: 0.1, vit: true },
  { x: 3, y: 4, a: 0.22, f: 6 },
  { x: 6, y: 3, a: 0.12, vit: true, d: -2 },
  { x: 1, y: 6, a: 0.1 },
  { x: 7, y: 6, a: 0.18, f: 10 },
];
const coinDroit: Case[] = [
  { x: 8, y: 2, a: 0.14, vit: true, d: -1 },
  { x: 10, y: 3, a: 0.2, f: 8 },
  { x: 6, y: 4, a: 0.1 },
  { x: 9, y: 6, a: 0.16 },
  { x: 11, y: 7, a: 0.12, vit: true, d: -3.5 },
  { x: 7, y: 8, a: 0.22, f: 12 },
  { x: 4, y: 7, a: 0.1, vit: true, d: -4.5 },
];

function Carres() {
  const cases = (list: Case[]) =>
    list.map((c, i) => (
      <i
        key={i}
        className={c.vit ? "vit" : undefined}
        style={{ ["--x" as string]: c.x, ["--y" as string]: c.y, ["--a" as string]: c.a, ["--f" as string]: `${c.f ?? 0}px`, ["--d" as string]: `${c.d ?? 0}s` } as CSSProperties}
      />
    ));
  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
      <div className="carres left-[-8%] top-[-3%] h-[calc(var(--c)*7)] w-[calc(var(--c)*7)] sm:left-[-2%] sm:top-[-4%] sm:h-[calc(var(--c)*10)] sm:w-[calc(var(--c)*10)]">{cases(coinGauche)}</div>
      {/* not on phones: there it would stand behind the sentence */}
      <div className="carres right-[-3%] top-[14%] hidden h-[calc(var(--c)*11)] w-[calc(var(--c)*14)] sm:block">{cases(coinDroit)}</div>
    </div>
  );
}

/** The phone in the middle: VALO's offers passing one after the other, as in an app. */
function Telephone({ slide }: { slide: number }) {
  return (
    <div className="eventail-phone relative h-full w-full rounded-[40px] bg-white p-[7px] shadow-[0_50px_90px_-40px_rgba(7,20,216,.6),0_0_0_1px_rgba(11,18,51,.06)]">
      <div className="relative flex h-full flex-col overflow-hidden rounded-[33px] bg-[#F6F8FF]">
        {/* status bar */}
        <div className="flex items-center justify-between px-6 pt-3.5 text-[11px] font-bold text-ink">
          <span>9:41</span>
          <span className="flex items-end gap-[2px]">
            {[4, 6, 8, 10].map((h) => (
              <span key={h} className="w-[3px] rounded-[1px] bg-ink" style={{ height: h }} />
            ))}
            <span className="ml-1.5 h-[10px] w-[20px] rounded-[3px] border-[1.5px] border-ink p-[1px]">
              <span className="block h-full w-3/4 rounded-[1px] bg-ink" />
            </span>
          </span>
        </div>
        {/* tabs */}
        <div className="mt-4 flex items-center justify-between px-4">
          <span className="flex gap-1 rounded-full bg-white p-1 text-[10.5px] font-bold shadow-[0_1px_3px_rgba(11,18,51,.08)]">
            <span className="rounded-full bg-frost px-3 py-1 text-electric">Services</span>
            <span className="px-3 py-1 text-mute">Formations</span>
          </span>
          <span className="grid h-8 w-8 place-items-center rounded-full bg-electric text-white">
            <Monogram className="h-2.5 w-auto" />
          </span>
        </div>
        {/* the offers, one after the other */}
        <div className="relative mx-3 mt-4 flex-1">
          {slides.map((s, i) => (
            <div
              key={s.img}
              className="absolute inset-0 transition-opacity duration-700"
              style={{ opacity: i === slide ? 1 : 0 }}
            >
              <Carte img={s.img} tag={s.tag} name={s.name} price={s.price} sizes="260px" />
            </div>
          ))}
        </div>
        {/* where we are */}
        <div className="flex justify-center gap-1.5 pb-4 pt-3.5">
          {slides.map((s, i) => (
            <span key={s.img} className={`h-1.5 rounded-full transition-all duration-500 ${i === slide ? "w-4 bg-electric" : "w-1.5 bg-electric/25"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * The homepage's top, « l'éventail » (Charifa, 12 October 2026, after her reference « Travel stress-free with your close
 * friends »: « bluffe-moi », keeping the little blue dots of the current ground): her title, its last words in an italic
 * serif; her sentence, the button, the four trades in a line of small capitals; then a phone in the middle passing three
 * real offers of VALO, and photo cards fanned out on either side, the outer ones fading into the page, with the orbit's
 * the four trades floating around it as glass labels pointed at by small cursors. Its icons are VALO's own (`Glyphes.tsx`): a first try with the
 * stock icons « fait trop IA » (12 October 2026), taking them off was not what she asked: « fais mieux ». The blue grounds tried on 12
 * October 2026 were set aside: the top stays white. `formes`: translucent blue shapes thrown behind it (`.formes` in
 * globals.css); `carres`: patches of fine squares instead of the dots, a few filled and out of focus (`.carres`); both
 * at /apercu/formes. `titre`: the title in her italic serif (`serif`, the homepage), or lighter and in navy with « levier de
 * croissance. » set off by a yellow marker (`marqueur`), a hand-drawn yellow line (`trait`) or a light passing through it
 * (`brillance`), or in her italic serif selected as in a design tool, a blue line with its handles under it and a text
 * cursor at its end (`selection`, after her visual « Favorite User Interface Typefaces »), at /apercu/titre/<style> (13 October 2026: « la police est trop grasse, c'est trop noir »). On arrival the cards open out from behind the phone; while the page goes
 * by they spread a little more and the phone rises (`--s`, 0 to 1 over the first screen). Phones get the same scene,
 * scaled down, the outer cards cut by the edges. Still with « reduce motion ».
 */
export type StyleTitre = "serif" | "marqueur" | "trait" | "brillance" | "selection";

export function HeroEventail({ formes = false, carres = false, titre = "serif" }: { formes?: boolean; carres?: boolean; titre?: StyleTitre }) {
  const [slide, setSlide] = useState(0);
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let shown = true;
    const io = new IntersectionObserver(([e]) => (shown = e.isIntersecting));
    io.observe(el);
    const timer = still ? 0 : window.setInterval(() => shown && !document.hidden && setSlide((s) => (s + 1) % slides.length), 3200);
    let frame = 0;
    // only the five pieces that move get a new transform: a variable set on the whole top restyled every element in it
    // at each frame (50 ms a frame on a slowed phone, 12 October 2026)
    const moving = Array.from(el.querySelectorAll<HTMLElement>("[data-cote]"));
    const update = () => {
      frame = 0;
      const k = Math.min(1, Math.max(0, window.scrollY / window.innerHeight));
      for (const m of moving) {
        const side = Number(m.dataset.cote);
        m.style.transform = side
          ? `translate3d(${(side * k * 40).toFixed(1)}px, ${(k * 18).toFixed(1)}px, 0) rotate(${(side * k * 2.5).toFixed(2)}deg)`
          : `translate3d(0, ${(-k * 36).toFixed(1)}px, 0)`;
      }
    };
    const soon = () => {
      if (shown && !frame) frame = requestAnimationFrame(update);
    };
    if (!still) {
      update();
      window.addEventListener("scroll", soon, { passive: true });
    }
    return () => {
      io.disconnect();
      window.clearInterval(timer);
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", soon);
    };
  }, []);

  const [first, second] = hero.title;

  return (
    <section ref={root} id="top" className="eventail relative">
      {/* one band, edge to edge: the framed card set on the page looked like a row on a row (12 October 2026) */}
      <div className="eventail-fond relative isolate overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#F4F7FF_100%)]">
        {/* the dotted ground of the current top, stronger towards the edges, and a soft blue light behind the phone */}
        {carres ? (
          <Carres />
        ) : (
        <div
          aria-hidden
          className="dots eventail-points absolute inset-0 -z-10 [-webkit-mask-image:radial-gradient(70%_60%_at_50%_40%,transparent_15%,#000_100%)] [mask-image:radial-gradient(70%_60%_at_50%_40%,transparent_15%,#000_100%)]"
        />
        )}
        <div aria-hidden className="eventail-lueur absolute left-1/2 top-[58%] -z-10 h-[620px] w-[1100px] -translate-x-1/2 rounded-full" />
        {formes && <Formes />}

        <div className="relative px-5 pt-[112px] text-center sm:pt-[128px] lg:pt-[136px]">
          <h1 className={`eventail-titre mx-auto max-w-[19ch] sm:max-w-none ${titre === "serif" ? "text-ink" : titre === "selection" ? "titre-doux" : "titre-leger"}`}>
            <span className="balance block">
              {first.split(" ").map((w, i) => (
                <span key={i}>
                  <span className="blur-in inline-block" style={{ ["--d" as string]: `${0.1 + i * 0.06}s` } as CSSProperties}>
                    {w}
                  </span>{" "}
                </span>
              ))}
            </span>
            {titre === "selection" ? (
              <span className="eventail-italique blur-in block" style={{ ["--d" as string]: "0.5s" } as CSSProperties}>
                <span className="titre-selection">
                  <span className="titre-selection-mots">{second}</span>
                  <span aria-hidden className="titre-selection-ligne" />
                  <span aria-hidden className="titre-selection-curseur" />
                </span>
              </span>
            ) : titre === "serif" ? (
              <span className="eventail-italique blur-in block text-electric" style={{ ["--d" as string]: "0.5s" } as CSSProperties}>
                {second}
              </span>
            ) : (
              <span className="blur-in mt-[0.08em] block" style={{ ["--d" as string]: "0.5s" } as CSSProperties}>
                <span className={`titre-${titre} relative inline-block`}>
                  {second}
                  {titre === "trait" && (
                    <svg aria-hidden viewBox="0 0 400 24" preserveAspectRatio="none" className="titre-trait-svg">
                      <path d="M4 16C70 7 150 5 230 8c58 2 112 6 166 3" />
                    </svg>
                  )}
                </span>
              </span>
            )}
          </h1>
          <p className="eventail-lead fade-in pretty mx-auto mt-5 max-w-[34rem] text-[16px] font-medium leading-relaxed text-body sm:text-[17px]" style={{ ["--d" as string]: "0.7s" } as CSSProperties}>
            {hero.lead}
          </p>
          <div className="bounce-in mt-7" style={{ ["--d" as string]: "0.85s" } as CSSProperties}>
            <DemandeButton className={btn("electric")}>
              <BtnInner>{hero.cta}</BtnInner>
            </DemandeButton>
          </div>
        </div>

        {/* the scene: drawn at 1000 px wide and scaled to the screen */}
        <div aria-hidden className="eventail-scene relative mt-10 lg:mt-12">
          <div className="eventail-plan">
            {cards.map((c, i) => (
              <div
                key={c.img}
                data-cote={c.side}
                className={`eventail-carte ${Math.abs(c.side) === 2 ? "eventail-loin" : ""}`}
                style={{ ["--side" as string]: c.side, ["--d" as string]: `${0.9 + i * 0.08}s` } as CSSProperties}
              >
                <div className="eventail-carte-in">
                  <Carte img={c.img} tag={c.tag} name={c.name} price={c.price} sizes="(min-width: 1024px) 200px, 140px" />
                </div>
              </div>
            ))}
            <div data-cote={0} className="eventail-tel">
              <div className="eventail-tel-in">
                <Telephone slide={slide} />
              </div>
            </div>
            {etiquettes.map((e, i) => (
              <span key={e.metier} className={`etiquette-place etiquette-${e.metier}`}>
                <span className="drop-in block" style={{ ["--d" as string]: `${1.3 + i * 0.1}s` } as CSSProperties}>
                  <span className={`float block ${e.t}`}>
                    <Etiquette metier={e.metier} curseur={e.curseur} />
                  </span>
                </span>
              </span>
            ))}
          </div>
          {/* the scene fades into the page at its foot (the thin line and its round mark were taken off, 12 October 2026) */}
          <div className="eventail-fondu pointer-events-none absolute inset-x-0 bottom-0 h-[30%] bg-[linear-gradient(180deg,rgba(244,247,255,0),#F4F7FF_72%)]" />
        </div>
      </div>
    </section>
  );
}
