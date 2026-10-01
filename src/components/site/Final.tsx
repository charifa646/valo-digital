import Image from "next/image";
import type { CSSProperties } from "react";
import { contact, final, fondateur, footer, nav } from "@/lib/content";
import { hello, wa } from "@/lib/links";
import { Monogram } from "@/components/brand/Logo";
import { BtnInner, btn } from "@/components/ui/Action";
import { Mail, Phone, Pin } from "@/components/ui/Icons";
import { Anchor } from "./Scroll";

/** The last call with Valentin in his armchair, then the footer and the giant name, in one blue block. */
export function Final() {
  const reach = [
    { href: contact.phoneHref, label: contact.phone, Icon: Phone, ext: false },
    { href: `mailto:${contact.email}`, label: contact.email, Icon: Mail, ext: false },
    { href: contact.mapHref, label: contact.address, Icon: Pin, ext: true },
  ];

  return (
    <div data-dark className="on-dark relative isolate overflow-hidden bg-[linear-gradient(180deg,#0714D8_0%,#0A15C2_48%,#050E78_100%)] text-white">
      <div
        aria-hidden
        className="absolute right-[-10%] top-[-20%] -z-10 h-[620px] w-[620px] rounded-full bg-[radial-gradient(closest-side,rgba(143,163,255,.35),transparent)]"
      />

      <section
        id="contact"
        aria-labelledby="contact-title"
        className="relative mx-auto grid max-w-page gap-4 px-6 pt-16 sm:px-12 sm:pt-20 lg:grid-cols-[1.08fr_1fr] lg:items-end lg:gap-10 lg:px-14 lg:pt-24"
      >
        <div className="lg:pb-24">
          <h2 id="contact-title" data-reveal className="h2 balance max-w-[14ch]">
            {final.title}
          </h2>
          <p data-reveal className="pretty mt-5 max-w-[30rem] text-[17px] font-medium leading-relaxed text-white/80 sm:text-[18px]">
            {final.text}
          </p>
          <div data-reveal className="mt-8">
            <a href={wa(hello)} target="_blank" rel="noopener noreferrer" className={btn("white")}>
              <BtnInner>{final.cta}</BtnInner>
            </a>
          </div>
          <ul className="mt-10 grid gap-2 sm:max-w-[27rem]">
            {reach.map(({ href, label, Icon, ext }, i) => (
              <li key={href} data-reveal style={{ ["--d" as string]: `${0.08 + i * 0.06}s` } as CSSProperties}>
                <a
                  href={href}
                  {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center gap-4 rounded-[10px] border border-white/15 bg-white/[0.07] p-2 pr-5 transition duration-300 hover:border-white/30 hover:bg-white/[0.13]"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[8px] bg-white text-electric">
                    <Icon className="h-[19px] w-[19px]" />
                  </span>
                  <span className="min-w-0 break-words text-[15px] font-semibold">{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Valentin, smiling, in a pool of light */}
        <div data-reveal="scale" className="relative mx-auto -mb-px mt-6 w-full max-w-[500px] self-end lg:mt-0">
          <div
            aria-hidden
            className="absolute bottom-[4%] left-1/2 h-[80%] w-[90%] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(232,238,255,.45),rgba(143,163,255,.18)_60%,transparent)]"
          />
          <Image
            src="/images/v3/valentin-assis.webp"
            alt={`${fondateur.name}, ${fondateur.roles[1]}`}
            width={990}
            height={1131}
            sizes="(min-width: 1024px) 500px, 90vw"
            className="relative h-auto w-full"
          />
        </div>
      </section>

      <footer className="relative mx-auto max-w-page px-6 sm:px-12 lg:px-14">
        <div className="grid gap-8 border-t border-white/15 py-10 md:grid-cols-[1.1fr_1fr] md:items-start">
          <div>
            <p className="flex items-center gap-3">
              <Monogram className="h-7 w-auto" />
              <span className="grid">
                <span className="text-[15px] font-bold tracking-[0.04em]">{footer.name}</span>
                <span className="text-[13px] font-medium text-white/65">{footer.tagline}</span>
              </span>
            </p>
            <p className="mt-5 text-[13.5px] font-semibold text-white/70">{footer.tags.join(" · ")}</p>
          </div>
          <nav aria-label="Pied de page">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-[14px] font-semibold text-white/80">
              {nav
                .filter((n) => n.short)
                .map((n) => (
                  <li key={n.id}>
                    <Anchor to={n.id} className="transition hover:text-white">
                      {n.label}
                    </Anchor>
                  </li>
                ))}
            </ul>
          </nav>
        </div>
        <div className="border-t border-white/10 py-5">
          <p className="text-[13px] font-medium text-white/55">{footer.copyright}</p>
        </div>
      </footer>

      {/* the giant name, cut by the bottom edge */}
      <svg aria-hidden viewBox="0 0 1000 170" className="pointer-events-none relative -mb-[3%] mt-1 block w-full">
        <defs>
          <linearGradient id="wordmark-foot" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.16" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <text
          x="500"
          y="196"
          textAnchor="middle"
          textLength="980"
          lengthAdjust="spacingAndGlyphs"
          fill="url(#wordmark-foot)"
          style={{ fontFamily: "var(--font-montserrat)", fontWeight: 800, fontSize: 262 }}
        >
          VALO
        </text>
      </svg>
    </div>
  );
}
