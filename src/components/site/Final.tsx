import Image from "next/image";
import type { CSSProperties } from "react";
import { contact, final, fondateur, footer } from "@/lib/content";
import { hello, wa } from "@/lib/links";
import { Monogram } from "@/components/brand/Logo";
import { BtnInner, btn } from "@/components/ui/Action";
import { Mail, Phone, Pin } from "@/components/ui/Icons";

/** The last call, Valentin in his armchair, then the footer and the giant name, in one blue panel. */
export function Final() {
  const reach = [
    { href: contact.phoneHref, label: contact.phone, Icon: Phone, ext: false },
    { href: `mailto:${contact.email}`, label: contact.email, Icon: Mail, ext: false },
    { href: contact.mapHref, label: contact.address, Icon: Pin, ext: true },
  ];

  return (
    <div>
      <div data-dark className="on-dark relative isolate overflow-hidden text-white">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#0714d8_0%,#0a17c9_45%,#040b52_82%,#02062e_100%)]" />
          <div className="curtain opacity-80 [-webkit-mask-image:radial-gradient(90%_70%_at_70%_40%,#000_20%,transparent_80%)] [mask-image:radial-gradient(90%_70%_at_70%_40%,#000_20%,transparent_80%)]" />
        </div>

        <section
          id="contact"
          aria-labelledby="contact-title"
          className="relative mx-auto grid max-w-page gap-4 px-6 pt-16 sm:px-12 sm:pt-20 lg:grid-cols-[1.08fr_1fr] lg:items-end lg:gap-10 lg:px-14 lg:pt-24"
        >
          <div className="lg:pb-24">
            <h2 id="contact-title" data-reveal className="h2 balance max-w-[14ch]">
              {final.title}
            </h2>
            <p data-reveal className="pretty mt-6 max-w-[30rem] text-[17px] font-medium leading-relaxed text-white/80 sm:text-[19px]">
              {final.text}
            </p>
            <div data-reveal className="mt-9">
              <a href={wa(hello)} target="_blank" rel="noopener noreferrer" className={btn("white")}>
                <BtnInner>{final.cta}</BtnInner>
              </a>
            </div>
            <ul className="mt-10 grid gap-2.5 sm:max-w-[27rem]">
              {reach.map(({ href, label, Icon, ext }, i) => (
                <li key={href} data-reveal style={{ ["--d" as string]: `${0.1 + i * 0.08}s` } as CSSProperties}>
                  <a
                    href={href}
                    {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="glass-dark group flex items-center gap-4 rounded-[10px] p-2 pr-5 transition hover:bg-white/15"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[8px] bg-white text-electric transition group-hover:bg-sun group-hover:text-navy">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0 break-words text-[15.5px] font-bold tracking-[-0.01em]">{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Valentin, smiling, in a pool of light */}
          <div data-reveal="scale" className="relative mx-auto -mb-px mt-6 w-full max-w-[520px] self-end lg:mt-0">
            <div
              aria-hidden
              className="absolute bottom-[4%] left-1/2 h-[82%] w-[92%] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(232,238,255,.55),rgba(143,163,255,.25)_55%,transparent)]"
            />
            <div aria-hidden className="absolute bottom-0 left-1/2 h-8 w-[70%] -translate-x-1/2 rounded-[50%] bg-abyss/60 blur-xl" />
            <Image
              src="/images/v3/valentin-assis.webp"
              alt={`${fondateur.name}, ${fondateur.roles[1]}`}
              width={990}
              height={1131}
              sizes="(min-width: 1024px) 520px, 90vw"
              className="relative h-auto w-full"
            />
          </div>
        </section>

        <footer className="relative mx-auto max-w-page px-6 sm:px-12 lg:px-14">
          <div className="grid gap-6 border-t border-white/15 pb-6 pt-9 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-10">
            <p className="flex items-center gap-3">
              <Monogram className="h-6 w-auto" />
              <span className="grid">
                <span className="text-[15px] font-extrabold tracking-[0.04em]">{footer.name}</span>
                <span className="text-[13px] font-medium text-white/65">{footer.tagline}</span>
              </span>
            </p>
            <p className="text-[13.5px] font-semibold text-white/70 sm:justify-self-center">{footer.tags.join(" · ")}</p>
            <p className="text-[13px] font-medium text-white/55">{footer.copyright}</p>
          </div>
        </footer>

        {/* the giant name, cut by the bottom edge */}
        <svg aria-hidden viewBox="0 0 1000 170" className="pointer-events-none relative -mb-[3%] mt-2 block w-full">
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
    </div>
  );
}
