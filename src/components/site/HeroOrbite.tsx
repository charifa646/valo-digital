import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { IconCheck, IconClock, IconPhoto, IconPlayerPlayFilled, IconShoppingBag } from "@tabler/icons-react";
import { formations, hero } from "@/lib/content";
import { hello, wa } from "@/lib/links";
import { Monogram } from "@/components/brand/Logo";
import { BtnInner, btn } from "@/components/ui/Action";
import { Cap, Cart, Facebook, Instagram, Megaphone, Target, TikTok, WhatsApp } from "@/components/ui/Icons";
import { Chip } from "@/components/previews/kit";

const [marketing, publicite, vente, formation] = hero.tags;
const course = formations.items[0];
const modules = course.modules
  .split(", ")
  .slice(0, 3)
  .map((m) => m.charAt(0).toUpperCase() + m.slice(1));

/** A small app window around the orbit: the tag as its title, a real piece of the work inside. */
function Satellite({ icon, title, children, className = "" }: { icon: ReactNode; title: string; children: ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-[12px] border border-hair bg-white shadow-float ${className}`}>
      <div className="flex items-center gap-2 border-b border-hair px-3 py-2">
        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-[7px] bg-electric text-white [&_svg]:h-3.5 [&_svg]:w-3.5">{icon}</span>
        <span className="text-[12.5px] font-bold tracking-[-0.01em] text-ink">{title}</span>
      </div>
      <div aria-hidden className="p-2.5 sm:p-3">
        {children}
      </div>
    </div>
  );
}

/** Marketing: the week's posts, two out, one waiting for its hour. */
function MarketingBody() {
  const posts = [
    { img: "post-tissu", out: true },
    { img: "post-fura", out: true },
    { img: "post-assiette", out: false },
  ];
  return (
    <div className="grid grid-cols-3 gap-1.5">
      {posts.map((p) => (
        <span key={p.img} className="relative block aspect-square overflow-hidden rounded-[6px] bg-soft">
          <Image src={`/images/ui/${p.img}.webp`} alt="" fill sizes="64px" className="object-cover" />
          <span className={`absolute bottom-1 right-1 grid h-4 w-4 place-items-center rounded-full text-white ${p.out ? "bg-[#1FA35B]" : "bg-electric"}`}>
            {p.out ? <IconCheck className="h-2.5 w-2.5" stroke={3} aria-hidden /> : <IconClock className="h-2.5 w-2.5" stroke={2.6} aria-hidden />}
          </span>
        </span>
      ))}
    </div>
  );
}

/** Publicité: the ad running, and where. */
function PubliciteBody() {
  return (
    <>
      <div className="flex items-center gap-2.5">
        <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-[8px] bg-soft">
          <Image src="/images/ui/ad-produit.webp" alt="" fill sizes="44px" className="object-cover" />
        </span>
        <span className="min-w-0 leading-none">
          <span className="block text-[10px] font-semibold text-mute">Sponsorisé</span>
          <span className="mt-1.5 inline-flex">
            <Chip tone="green" dot>
              Active
            </Chip>
          </span>
        </span>
      </div>
      <div className="mt-2.5 flex flex-wrap gap-1">
        <Chip tone="gray">Facebook</Chip>
        <Chip tone="gray">Instagram</Chip>
      </div>
    </>
  );
}

/** Vente: the WhatsApp tunnel, from the post to the order. */
function VenteBody() {
  const steps = [
    { label: "Publication", icon: <IconPhoto stroke={2} />, tile: "bg-soft text-ink", done: true },
    { label: "Message", icon: <WhatsApp />, tile: "bg-[#E7F6EE] text-[#12733F]", done: true },
    { label: "Commande", icon: <IconShoppingBag stroke={2} />, tile: "bg-frost text-electric", done: false },
  ];
  return (
    <>
      <p className="text-[10px] font-semibold text-mute">Tunnel WhatsApp</p>
      <ol className="mt-2 grid gap-2">
        {steps.map((s, i) => (
          <li key={s.label} className="relative flex items-center gap-2">
            {i > 0 && <span aria-hidden className="absolute -top-2 left-[11px] h-2 border-l border-dashed border-mute/50" />}
            <span className={`grid h-[22px] w-[22px] shrink-0 place-items-center rounded-[6px] [&_svg]:h-3.5 [&_svg]:w-3.5 ${s.tile}`}>{s.icon}</span>
            <span className="min-w-0 flex-1 truncate text-[11px] font-bold text-ink">{s.label}</span>
            {s.done ? (
              <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-[#1FA35B] text-white">
                <IconCheck className="h-2.5 w-2.5" stroke={3} aria-hidden />
              </span>
            ) : (
              <span className="relative grid h-4 w-4 shrink-0 place-items-center">
                <span className="absolute inset-0 animate-ping rounded-full bg-electric/30 motion-reduce:animate-none" />
                <span className="h-2 w-2 rounded-full bg-electric" />
              </span>
            )}
          </li>
        ))}
      </ol>
    </>
  );
}

/** Formation: the Facebook & Instagram Ads course, its first modules. */
function FormationBody() {
  return (
    <>
      <div className="relative aspect-[16/9] overflow-hidden rounded-[8px] bg-soft">
        <Image src="/images/formations/ads.webp" alt="" fill sizes="240px" className="object-cover" />
        <span className="absolute inset-0 grid place-items-center">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-white/90 text-electric shadow-panel">
            <IconPlayerPlayFilled className="ml-0.5 h-3.5 w-3.5" aria-hidden />
          </span>
        </span>
      </div>
      <p className="mt-2 text-[11.5px] font-bold leading-snug text-ink">{course.name}</p>
      <ul className="mt-1.5 grid gap-1">
        {modules.map((m, i) => (
          <li key={m} className="flex items-center gap-1.5 text-[10px] font-semibold text-body">
            <span className={`grid h-3.5 w-3.5 shrink-0 place-items-center rounded-full ${i < 2 ? "bg-electric text-white" : "border border-hair"}`}>
              {i < 2 && <IconCheck className="h-2 w-2" stroke={3.4} aria-hidden />}
            </span>
            <span className="truncate">{m}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

const channels = [
  { Icon: Facebook, tone: "text-[#1877F2]", spot: "lg:left-[33%] lg:top-[83%] [--r:-8deg] [--t:7.5s]" },
  { Icon: Instagram, tone: "text-[#D62976]", spot: "lg:left-[43%] lg:top-[88%] [--r:6deg] [--t:8.2s] [--fd:-2s]" },
  { Icon: TikTok, tone: "text-ink", spot: "lg:left-[53%] lg:top-[86%] [--r:-5deg] [--t:7s] [--fd:-3s]" },
  { Icon: WhatsApp, tone: "text-[#1FA35B]", spot: "lg:left-[63%] lg:top-[82%] [--r:8deg] [--t:8.8s] [--fd:-1s]" },
];

function Tile({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden className={`grid place-items-center rounded-[16px] border border-hair bg-white shadow-float ${className}`}>
      <Monogram className="h-[38%] w-auto text-electric" />
    </span>
  );
}

/**
 * Proposal B, « l'orbite » (quso.ai): the VALO mark above the message, and
 * around it, on a dotted orbit, the four things the agency does, each shown as
 * a small piece of real work. The channels sit on the bottom of the orbit.
 * `blue` is Charifa's mix: the same orbit in the blue of proposal A, with its
 * light lines.
 */
export function HeroOrbite({ blue = false }: { blue?: boolean }) {
  const sats = [
    { title: marketing, icon: <Megaphone />, body: <MarketingBody />, spot: "lg:left-[12%] lg:top-[40%] lg:w-[200px]", tilt: "[--r:-3deg] [--t:7.6s]" },
    { title: publicite, icon: <Target />, body: <PubliciteBody />, spot: "lg:left-[88%] lg:top-[38%] lg:w-[200px]", tilt: "[--r:3deg] [--t:8.4s] [--fd:-3s]" },
    { title: vente, icon: <Cart />, body: <VenteBody />, spot: "lg:left-[15.5%] lg:top-[71%] lg:w-[220px]", tilt: "[--r:4deg] [--t:8s] [--fd:-2s]" },
    { title: formation, icon: <Cap />, body: <FormationBody />, spot: "lg:left-[84.5%] lg:top-[70%] lg:w-[220px]", tilt: "[--r:-4deg] [--t:9s] [--fd:-4s]" },
  ];

  return (
    <section id="top" className="relative px-[var(--frame)] pt-[var(--frame)]">
      <div
        data-dark={blue || undefined}
        className={`relative isolate overflow-hidden rounded-[18px] lg:h-[880px] lg:rounded-[22px] ${
          blue
            ? "on-dark bg-[radial-gradient(110%_80%_at_50%_0%,#3551FF_0%,#0714D8_52%,#0510A8_100%)] text-white"
            : "border border-hair bg-[linear-gradient(180deg,#ffffff_0%,#F7F9FF_100%)]"
        }`}
      >
        {blue ? (
          <div aria-hidden className="light-lines-white" />
        ) : (
          <>
            {/* the dotted ground, stronger towards the edges */}
            <div
              aria-hidden
              className="dots absolute inset-0 -z-10 [-webkit-mask-image:radial-gradient(70%_60%_at_50%_42%,transparent_20%,#000_100%)] [mask-image:radial-gradient(70%_60%_at_50%_42%,transparent_20%,#000_100%)]"
            />
            <div
              aria-hidden
              className="absolute left-1/2 top-[30%] -z-10 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(53,81,255,.10),transparent)]"
            />
          </>
        )}

        {/* the orbits (large screens) */}
        <div aria-hidden className="absolute inset-y-0 left-1/2 hidden w-full max-w-[1480px] -translate-x-1/2 lg:block">
          <span
            className={`absolute bottom-[14%] left-[8%] right-[8%] top-[18%] rounded-[50%] border-[1.5px] border-dotted ${blue ? "border-white/30" : "border-electric/30"}`}
          />
          <span
            className={`absolute bottom-[26%] left-[20%] right-[20%] top-[30%] rounded-[50%] border-[1.5px] border-dotted ${blue ? "border-white/20" : "border-electric/20"} [-webkit-mask-image:linear-gradient(90deg,#000_8%,transparent_26%,transparent_74%,#000_92%)] [mask-image:linear-gradient(90deg,#000_8%,transparent_26%,transparent_74%,#000_92%)]`}
          />
        </div>

        <div className="relative px-5 pb-6 pt-[104px] text-center sm:pt-[120px] lg:px-0 lg:pb-0 lg:pt-[126px]">
          <div className="pop-in" style={{ ["--d" as string]: "0.05s" } as CSSProperties}>
            <Tile className="mx-auto h-14 w-14 sm:h-16 sm:w-16" />
          </div>
          <h1
            className={`balance mx-auto mt-7 max-w-[20ch] text-[clamp(2.1rem,4.4vw,3.4rem)] font-medium leading-[1.06] tracking-[-0.03em] xl:max-w-none ${blue ? "text-white" : "text-ink"}`}
          >
            {hero.title.map((line, li) => (
              <span key={li} className="xl:block">
                {line.split(" ").map((w, wi) => (
                  <span key={wi}>
                    <span className="inline-block overflow-hidden pb-[0.06em] align-bottom">
                      <span
                        className={`rise ${li ? (blue ? "text-sun" : "text-electric") : ""}`}
                        style={{ ["--d" as string]: `${0.1 + (li * 5 + wi) * 0.05}s` } as CSSProperties}
                      >
                        {w}
                      </span>
                    </span>{" "}
                  </span>
                ))}
              </span>
            ))}
          </h1>
          <p
            className={`fade-up pretty mx-auto mt-5 max-w-[34rem] text-[16px] font-medium leading-relaxed sm:text-[17px] ${blue ? "text-white/85" : "text-body"}`}
            style={{ ["--d" as string]: "0.5s" } as CSSProperties}
          >
            {hero.lead}
          </p>
          <div className="fade-up mt-8" style={{ ["--d" as string]: "0.65s" } as CSSProperties}>
            <a href={wa(hello)} target="_blank" rel="noopener noreferrer" className={btn(blue ? "white" : "electric")}>
              <BtnInner>{hero.cta}</BtnInner>
            </a>
          </div>
        </div>

        {/* the four around the orbit: placed on it on large screens, two by two below the message on small ones */}
        <div className="relative mx-auto mt-4 grid max-w-[460px] grid-cols-2 items-start gap-x-3 gap-y-4 px-4 pb-16 lg:absolute lg:inset-y-0 lg:left-1/2 lg:mt-0 lg:block lg:w-full lg:max-w-[1480px] lg:-translate-x-1/2 lg:p-0">
          <span
            aria-hidden
            className={`absolute inset-x-[6%] inset-y-[8%] -z-10 rounded-[50%] border-[1.5px] border-dotted lg:hidden ${blue ? "border-white/25" : "border-electric/25"}`}
          />
          {sats.map((s, i) => (
            <div key={s.title} className={`lg:absolute lg:-translate-x-1/2 lg:-translate-y-1/2 ${s.spot} ${i % 2 ? "mt-6 lg:mt-0" : ""}`}>
              <div className="pop-in" style={{ ["--d" as string]: `${0.8 + i * 0.1}s` } as CSSProperties}>
                <div className={`float ${s.tilt}`}>
                  <Satellite icon={s.icon} title={s.title}>
                    {s.body}
                  </Satellite>
                </div>
              </div>
            </div>
          ))}

          {/* the channels, on the bottom of the orbit */}
          <ul aria-hidden className="col-span-2 flex justify-center gap-3 pt-2 lg:contents">
            {channels.map(({ Icon, tone, spot }, i) => (
              <li key={i} className={`lg:absolute lg:-translate-x-1/2 ${spot}`}>
                <div className="pop-in" style={{ ["--d" as string]: `${1.2 + i * 0.08}s` } as CSSProperties}>
                  <span className={`float grid h-11 w-11 place-items-center rounded-[12px] border border-hair bg-white shadow-panel lg:h-12 lg:w-12 ${tone}`}>
                    <Icon className="h-5 w-5 lg:h-[22px] lg:w-[22px]" />
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
