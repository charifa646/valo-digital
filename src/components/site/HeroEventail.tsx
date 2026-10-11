"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { IconChevronRight } from "@tabler/icons-react";
import { formations, hero, prestations } from "@/lib/content";
import { DemandeButton } from "./Sheet";
import { Monogram } from "@/components/brand/Logo";
import { BtnInner, btn } from "@/components/ui/Action";
import { Cap, Cart, ChevronDown, Facebook, Instagram, Megaphone, Target, TikTok, WhatsApp } from "@/components/ui/Icons";

const [marketing, publicite, vente, formation] = hero.tags;
const offer = (id: string) => prestations.offers.find((o) => o.id === id)!;
const course = (id: string) => formations.items.find((f) => f.id === id)!;

type Slide = { tag: string; icon: ReactNode; img: string; name: string; price: string };

/** What the phone shows, one after the other: three real offers of VALO, with their own names and prices. */
const slides: Slide[] = [
  { tag: publicite, icon: <Target />, img: "/images/formations/ads.webp", name: offer("publicite").name, price: offer("publicite").price },
  { tag: marketing, icon: <Megaphone />, img: "/images/formations/contenu.webp", name: offer("video").name, price: offer("video").price },
  { tag: formation, icon: <Cap />, img: "/images/formations/cohorte.webp", name: course("marketing").name, price: course("marketing").price },
];

/** The cards on either side of the phone: the inner ones whole, the outer ones fading into the page. */
const cards = [
  { side: -2, img: "/images/formations/ia.webp", tag: formation, icon: <Cap /> },
  { side: -1, img: "/images/formations/cm.webp", tag: marketing, icon: <Megaphone />, name: offer("reseaux").name, price: offer("reseaux").price },
  { side: 1, img: "/images/formations/boutique.webp", tag: vente, icon: <Cart />, name: course("vente").name, price: course("vente").price },
  { side: 2, img: "/images/formations/marketing.webp", tag: formation, icon: <Cap /> },
];

/** The small round badges floating around (the flags of the reference): the orbit's photos, and the networks. */
const badges: { at: string; img?: string; icon?: ReactNode; tone?: string; t: string }[] = [
  { at: "left-[22%] top-[2%]", img: "/images/ui/post-tissu.webp", t: "[--r:-6deg] [--t:7s]" },
  { at: "left-[72%] top-[-1%]", icon: <Facebook />, tone: "text-[#1877F2]", t: "[--r:5deg] [--t:8s] [--fd:-2s]" },
  { at: "left-[14%] top-[66%]", icon: <Instagram />, tone: "text-[#D62976]", t: "[--r:6deg] [--t:8.4s] [--fd:-1s]" },
  { at: "left-[84%] top-[62%]", img: "/images/ui/post-fura.webp", t: "[--r:-4deg] [--t:7.6s] [--fd:-4s]" },
]

function Tag({ icon, children, light = false }: { icon: ReactNode; children: ReactNode; light?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10.5px] font-bold shadow-[0_4px_12px_-6px_rgba(11,18,51,.5)] [&_svg]:h-3 [&_svg]:w-3 ${
        light ? "bg-white/95 text-ink" : "bg-white/20 text-white"
      }`}
    >
      <span className="text-electric">{icon}</span>
      {children}
    </span>
  );
}

/** A photo card: the trade at the top, the offer's name and price at the foot over a dark fade. */
function Carte({ img, tag, icon, name, price, sizes }: { img: string; tag: string; icon: ReactNode; name?: string; price?: string; sizes: string }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[18px] bg-frost shadow-[0_30px_60px_-30px_rgba(7,20,216,.55),0_2px_6px_rgba(11,18,51,.08)]">
      <Image src={img} alt="" fill sizes={sizes} className="object-cover" />
      <span className="absolute inset-x-0 top-3 flex justify-center">
        <Tag icon={icon} light>
          {tag}
        </Tag>
      </span>
      {name && (
        <span className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(4,11,82,.82))] px-3.5 pb-3.5 pt-12 text-left text-white">
          <span className="flex items-end gap-1 text-[13px] font-bold leading-snug">
            <span className="line-clamp-3">{name}</span>
            <IconChevronRight className="mb-0.5 h-3.5 w-3.5 shrink-0" stroke={2.4} aria-hidden />
          </span>
          {price && <span className="mt-2 inline-block whitespace-nowrap rounded-full bg-white/20 px-2 py-0.5 text-[9.5px] font-semibold">{price}</span>}
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
        <div className="relative mx-3 mt-4 h-[320px] shrink-0">
          {slides.map((s, i) => (
            <div
              key={s.img}
              className="absolute inset-0 transition-opacity duration-700"
              style={{ opacity: i === slide ? 1 : 0 }}
            >
              <Carte img={s.img} tag={s.tag} icon={s.icon} name={s.name} price={s.price} sizes="260px" />
            </div>
          ))}
        </div>
        {/* where we are */}
        <div className="flex justify-center gap-1.5 py-3">
          {slides.map((s, i) => (
            <span key={s.img} className={`h-1.5 rounded-full transition-all duration-500 ${i === slide ? "w-4 bg-electric" : "w-1.5 bg-electric/25"}`} />
          ))}
        </div>
        {/* the app's bar, the four trades */}
        <div className="mx-4 mt-auto mb-4 flex items-center justify-around rounded-[18px] bg-white py-3 text-mute shadow-[0_1px_3px_rgba(11,18,51,.08)] [&_svg]:h-[18px] [&_svg]:w-[18px]">
          <span className="text-electric"><Megaphone /></span>
          <Target />
          <Cart />
          <Cap />
        </div>
      </div>
    </div>
  );
}

/**
 * The homepage's top, « l'éventail » (Charifa, 12 October 2026, after her reference « Travel stress-free with your close
 * friends »: « bluffe-moi », keeping the little blue dots of the current ground): her title, its last words in an italic
 * serif; her sentence, the button, the four trades in a line; then a phone in the middle passing three real offers of
 * VALO, and photo cards fanned out on either side, the outer ones fading into the page, with the orbit's photos and the
 * networks floating around as round badges. On arrival the cards open out from behind the phone; while the page goes
 * by they spread a little more and the phone rises (`--s`, 0 to 1 over the first screen). Phones get the same scene,
 * scaled down, the outer cards cut by the edges. Still with « reduce motion ».
 */
export function HeroEventail() {
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
  const tags = [
    { t: marketing, icon: <Megaphone /> },
    { t: publicite, icon: <Target /> },
    { t: vente, icon: <Cart /> },
    { t: formation, icon: <Cap /> },
  ];

  return (
    <section ref={root} id="top" className="eventail relative px-[var(--frame)] pt-[var(--frame)]">
      <div className="relative isolate overflow-hidden rounded-[18px] border border-hair bg-[linear-gradient(180deg,#ffffff_0%,#F7F9FF_100%)] lg:rounded-[22px]">
        {/* the dotted ground of the current top, stronger towards the edges, and a soft blue light behind the phone */}
        <div
          aria-hidden
          className="dots absolute inset-0 -z-10 [-webkit-mask-image:radial-gradient(70%_60%_at_50%_40%,transparent_15%,#000_100%)] [mask-image:radial-gradient(70%_60%_at_50%_40%,transparent_15%,#000_100%)]"
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
          <p className="fade-in pretty mx-auto mt-5 max-w-[34rem] text-[16px] font-medium leading-relaxed text-body sm:text-[17px]" style={{ ["--d" as string]: "0.7s" } as CSSProperties}>
            {hero.lead}
          </p>
          <div className="bounce-in mt-7" style={{ ["--d" as string]: "0.85s" } as CSSProperties}>
            <DemandeButton className={btn("electric")}>
              <BtnInner>{hero.cta}</BtnInner>
            </DemandeButton>
          </div>
          <ul className="fade-in mx-auto mt-5 flex max-w-[18rem] flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[12.5px] font-semibold text-mute sm:max-w-none sm:gap-x-2.5" style={{ ["--d" as string]: "1s" } as CSSProperties}>
            {tags.map((g, i) => (
              <li key={g.t} className="flex items-center gap-2.5">
                {i > 0 && <span aria-hidden className="hidden h-1 w-1 rounded-full bg-mute/50 sm:block" />}
                <span className="flex items-center gap-1.5 [&_svg]:h-3.5 [&_svg]:w-3.5">
                  <span className="text-electric">{g.icon}</span>
                  {g.t}
                </span>
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
                  <Carte img={c.img} tag={c.tag} icon={c.icon} name={c.name} price={c.price} sizes="(min-width: 1024px) 200px, 140px" />
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
                  <span
                    className={`float grid h-11 w-11 place-items-center overflow-hidden rounded-full border-[3px] border-white bg-white shadow-[0_10px_24px_-10px_rgba(7,20,216,.55)] [&_svg]:h-5 [&_svg]:w-5 ${b.tone ?? ""} ${b.t}`}
                  >
                    {b.img ? <Image src={b.img} alt="" width={44} height={44} className="h-full w-full rounded-full object-cover" /> : b.icon}
                  </span>
                </span>
              </span>
            ))}
          </div>
          {/* the scene fades into the page at its foot, where a thin line and a round mark ask to go on */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[30%] bg-[linear-gradient(180deg,rgba(247,249,255,0),#F7F9FF_72%)]" />
          <div className="absolute inset-x-0 bottom-5 flex items-center gap-4 px-6 lg:px-10">
            <span className="h-px flex-1 bg-[linear-gradient(90deg,transparent,rgba(7,20,216,.25))]" />
            <span className="grid h-8 w-8 place-items-center rounded-full border border-hair bg-white text-electric shadow-panel">
              <ChevronDown className="h-4 w-4" />
            </span>
            <span className="h-px flex-1 bg-[linear-gradient(90deg,rgba(7,20,216,.25),transparent)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
