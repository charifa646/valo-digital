"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { formations, hero, prestations } from "@/lib/content";
import { DemandeButton } from "./Sheet";
import { Monogram } from "@/components/brand/Logo";
import { BtnInner, btn } from "@/components/ui/Action";
import { Glyphe, type Metier } from "@/components/ui/Glyphes";
import { Facebook, Instagram } from "@/components/ui/Icons";

const [marketing, publicite, vente, formation] = hero.tags;
/** The four trades, in the order of `hero.tags`, each with its own icon. */
const metiers: Metier[] = ["marketing", "publicite", "vente", "formation"];
const glypheOf = (tag: string): Metier => metiers[hero.tags.indexOf(tag)] ?? "marketing";
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
 * The small badges floating around (the flags of the reference): two real photos of VALO's work, round, and the two
 * networks VALO works on, drawn as the app icons people know (a rounded square in the network's colours) rather than a
 * thin glyph in a white circle (Charifa, 12 October 2026: « les icônes font trop IA… fais mieux »).
 */
type Badge = { at: string; t: string; img?: string; app?: "facebook" | "instagram" };
const badges: Badge[] = [
  { at: "left-[22%] top-[2%]", img: "/images/ui/post-tissu.webp", t: "[--r:-6deg] [--t:7s]" },
  { at: "left-[72%] top-[4%]", app: "facebook", t: "[--r:5deg] [--t:8s] [--fd:-2s]" },
  { at: "left-[14%] top-[66%]", app: "instagram", t: "[--r:6deg] [--t:8.4s] [--fd:-1s]" },
  { at: "left-[84%] top-[62%]", img: "/images/ui/post-fura.webp", t: "[--r:-4deg] [--t:7.6s] [--fd:-4s]" },
];

/** The trade as a small label, its own icon in front. */
function Tag({ metier, children, light = false }: { metier: Metier; children: ReactNode; light?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full py-1 pl-2 pr-3 text-[10.5px] font-bold tracking-[0.02em] shadow-[0_4px_12px_-6px_rgba(11,18,51,.5)] ${
        light ? "bg-white/95 text-ink" : "bg-white/20 text-white"
      }`}
    >
      <Glyphe metier={metier} className="h-[14px] w-[14px] text-electric" />
      {children}
    </span>
  );
}

/** A photo card: the trade at the top, the offer's name and price at the foot over a dark fade. */
function Carte({ img, tag, name, price, sizes }: { img: string; tag: string; name?: string; price?: string; sizes: string }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[18px] bg-frost shadow-[0_30px_60px_-30px_rgba(7,20,216,.55),0_2px_6px_rgba(11,18,51,.08)]">
      <Image src={img} alt="" fill sizes={sizes} className="object-cover" />
      <span className="absolute inset-x-0 top-3 flex justify-center">
        <Tag metier={glypheOf(tag)} light>
          {tag}
        </Tag>
      </span>
      {name && (
        <span className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(4,11,82,.82))] px-3.5 pb-3.5 pt-12 text-left text-white">
          <span className="line-clamp-3 block text-[13px] font-bold leading-snug">{name}</span>
          {price && <span className="mt-2 inline-block rounded-[8px] bg-white/20 px-2 py-0.5 text-[9.5px] font-semibold leading-snug">{price}</span>}
        </span>
      )}
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
 * photos and the two networks floating around as badges. Its icons are VALO's own (`Glyphes.tsx`): a first try with the
 * stock icons « fait trop IA » (12 October 2026), taking them off was not what she asked: « fais mieux ». `ton`: the ground, white as on the
 * homepage (`clair`), electric blue with white words and the italic ones in yellow (`bleu`) or a soft sky blue (`ciel`):
 * Charifa wanted to see whether a blue top would look good (12 October 2026), at /apercu/couleur and /apercu/couleur-ciel. On arrival the cards open out from behind the phone; while the page goes
 * by they spread a little more and the phone rises (`--s`, 0 to 1 over the first screen). Phones get the same scene,
 * scaled down, the outer cards cut by the edges. Still with « reduce motion ».
 */
export function HeroEventail({ ton = "clair" }: { ton?: "clair" | "bleu" | "ciel" }) {
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
    <section ref={root} id="top" data-ton={ton} className="eventail relative px-[var(--frame)] pt-[var(--frame)]">
      {/* `data-dark` on the electric blue: the menu turns to its dark glass over it */}
      <div
        data-dark={ton === "bleu" || undefined}
        className="eventail-fond relative isolate overflow-hidden rounded-[18px] border border-hair bg-[linear-gradient(180deg,#ffffff_0%,#F7F9FF_100%)] lg:rounded-[22px]"
      >
        {/* the dotted ground of the current top, stronger towards the edges, and a soft blue light behind the phone */}
        <div
          aria-hidden
          className="dots eventail-points absolute inset-0 -z-10 [-webkit-mask-image:radial-gradient(70%_60%_at_50%_40%,transparent_15%,#000_100%)] [mask-image:radial-gradient(70%_60%_at_50%_40%,transparent_15%,#000_100%)]"
        />
        <div aria-hidden className="eventail-lueur absolute left-1/2 top-[58%] -z-10 h-[620px] w-[1100px] -translate-x-1/2 rounded-full" />

        <div className="relative px-5 pt-[112px] text-center sm:pt-[128px] lg:pt-[136px]">
          <h1 className="eventail-titre mx-auto max-w-[19ch] text-ink sm:max-w-none">
            <span className="balance block">
              {first.split(" ").map((w, i) => (
                <span key={i}>
                  <span className="blur-in inline-block" style={{ ["--d" as string]: `${0.1 + i * 0.06}s` } as CSSProperties}>
                    {w}
                  </span>{" "}
                </span>
              ))}
            </span>
            <span className="eventail-italique blur-in block text-electric" style={{ ["--d" as string]: "0.5s" } as CSSProperties}>
              {second}
            </span>
          </h1>
          <p className="eventail-lead fade-in pretty mx-auto mt-5 max-w-[34rem] text-[16px] font-medium leading-relaxed text-body sm:text-[17px]" style={{ ["--d" as string]: "0.7s" } as CSSProperties}>
            {hero.lead}
          </p>
          <div className="bounce-in mt-7" style={{ ["--d" as string]: "0.85s" } as CSSProperties}>
            <DemandeButton className={btn(ton === "bleu" ? "white" : "electric")}>
              <BtnInner>{hero.cta}</BtnInner>
            </DemandeButton>
          </div>
          {/* the four trades as a line of small capitals, each with its own icon */}
          <ul
            className="eventail-metiers fade-in mx-auto mt-6 flex max-w-[19rem] flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[11.5px] font-bold uppercase tracking-[0.14em] text-body sm:max-w-none sm:gap-x-9"
            style={{ ["--d" as string]: "1s" } as CSSProperties}
          >
            {hero.tags.map((t, i) => (
              <li key={t} className="flex items-center gap-2.5">
                <Glyphe metier={metiers[i]} className="h-[19px] w-[19px]" />
                {t}
              </li>
            ))}
          </ul>
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
            {badges.map((b, i) => (
              <span key={i} className={`absolute ${b.at}`}>
                <span className="drop-in block" style={{ ["--d" as string]: `${1.3 + i * 0.08}s` } as CSSProperties}>
                  {b.img ? (
                    <span
                      className={`float block h-11 w-11 overflow-hidden rounded-full border-[3px] border-white bg-white shadow-[0_10px_24px_-10px_rgba(7,20,216,.55)] ${b.t}`}
                    >
                      <Image src={b.img} alt="" width={44} height={44} className="h-full w-full rounded-full object-cover" />
                    </span>
                  ) : (
                    <span
                      className={`float grid h-11 w-11 place-items-center rounded-[13px] text-white shadow-[0_10px_24px_-10px_rgba(7,20,216,.6)] [&_svg]:h-[22px] [&_svg]:w-[22px] ${
                        b.app === "facebook" ? "bg-[#1877F2]" : "bg-[linear-gradient(45deg,#FEDA75_0%,#FA7E1E_26%,#D62976_52%,#962FBF_78%,#4F5BD5_100%)]"
                      } ${b.t}`}
                    >
                      {b.app === "facebook" ? <Facebook /> : <Instagram />}
                    </span>
                  )}
                </span>
              </span>
            ))}
          </div>
          {/* the scene fades into the page at its foot (the thin line and its round mark were taken off, 12 October 2026) */}
          <div className="eventail-fondu pointer-events-none absolute inset-x-0 bottom-0 h-[30%] bg-[linear-gradient(180deg,rgba(247,249,255,0),#F7F9FF_72%)]" />
        </div>
      </div>
    </section>
  );
}
