import type { CSSProperties } from "react";
import Link from "next/link";
import { contact, demande, final, footer } from "@/lib/content";
import { PortesDemande } from "./Sheet";
import { Anchor } from "./Scroll";
import { Monogram } from "@/components/brand/Logo";
import { Words, count } from "@/components/ui/Words";

/** The last call's title, cut where the catalogue's sentence breaks: « Prêt à faire avancer » / « votre activité ? ». */
const cut = final.title.indexOf("votre");
const line1 = final.title.slice(0, cut).trim();
const line2 = final.title.slice(cut);

/** « VALO »: the first word of the name, very large and very pale at the foot. */
const nom = footer.name.split(" ")[0];

/** A thin star of eight rays, as the mock-up's: decorative. */
function Etoile({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 64 64" className={className} fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round">
      <path d="M32 6v52M6 32h52M13.6 13.6l36.8 36.8M50.4 13.6 13.6 50.4" />
    </svg>
  );
}

/** A small starburst for the end of the title, filled. */
function Eclat({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 100 100" className={className} fill="currentColor">
      <path d="M50 2 58 34 88 16 68 44 98 50 68 56 88 84 58 66 50 98 42 66 12 84 32 56 2 50 32 44 12 16 42 34Z" />
    </svg>
  );
}

/**
 * The foot of every page, after the ChatGPT mock-up Charifa chose on 14 October 2026 (« j'aimerais avoir exactement le
 * même footer », with her own words kept: « mes textes actuels »). First the last call, on a very light blue: her title in
 * large capitals, the second half in electric blue with a small starburst, her sentence, the three ways to reach VALO as
 * lines with a fine rule and an arrow ↗, and beside them, in a white card, the two ways in (« Commander une prestation »,
 * « M'inscrire à une formation »), each opening its form in the window in the middle of the screen (`PortesDemande`). Then
 * the foot itself, white: the mark and the name, what VALO does on two lines, the way back to the top, « VALO » very large
 * and very pale with a thin star, and a last line: the copyright, the address, the legal notice. It still slides over the
 * page (`.feuille`); square, no shadow. The former foot, « la trame » in night blue, is kept at /apercu/pied/nuit.
 */
export function Final() {
  const contacts = [
    { href: contact.phoneHref, label: contact.phone, ext: false },
    { href: `mailto:${contact.email}`, label: contact.email, ext: false },
    { href: contact.mapHref, label: contact.address, ext: true },
  ];
  return (
    <div className="feuille bg-white">
      <section id="contact" aria-labelledby="contact-title" className="bg-[#EEF2FB]">
        <div className="gutter mx-auto grid max-w-page gap-14 py-20 sm:py-24 lg:grid-cols-12 lg:gap-12 lg:py-28">
          <div className="lg:col-span-6">
            <p className="flex items-center gap-3 text-[11.5px] font-semibold uppercase tracking-[0.2em] text-ink">
              <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-electric" />
              {final.cta}
            </p>
            <h2
              id="contact-title"
              data-reveal="words"
              // in the hand of the other titles (14 October 2026, after a review Charifa agreed with: the bold capitals
              // stood apart from the rest of the page): her words as written, medium weight, the second line in blue
              className="mt-7 text-[clamp(2.3rem,1.3rem+3.2vw,4rem)] font-medium leading-[1.04] tracking-[-0.04em] text-ink"
            >
              <span className="block">
                <Words>{line1}</Words>
              </span>
              <span className="block text-electric">
                <Words from={count(line1)}>{line2}</Words>
                <Eclat className="ml-4 hidden h-[0.62em] w-[0.62em] -translate-y-[0.08em] align-middle text-[#7FA0F5] sm:inline-block" />
              </span>
            </h2>
            <p data-reveal style={{ ["--d" as string]: "0.3s" } as CSSProperties} className="pretty mt-8 max-w-[28rem] text-[16.5px] font-medium leading-relaxed text-body">
              {final.text}
            </p>
            <ul data-reveal style={{ ["--d" as string]: "0.45s" } as CSSProperties} className="mt-10 border-t border-[#CFD8EE]">
              {contacts.map((c) => (
                <li key={c.href} className="border-b border-[#CFD8EE]">
                  <a
                    href={c.href}
                    {...(c.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-center justify-between gap-4 py-5 text-[16.5px] font-medium tracking-[-0.01em] text-ink transition hover:text-electric sm:text-[18px]"
                  >
                    <span className="break-all sm:break-normal">{c.label}</span>
                    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17 17 7M8 7h9v9" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal style={{ ["--d" as string]: "0.2s" } as CSSProperties} className="lg:col-span-6 lg:col-start-7 lg:self-end">
            <div className="rounded-[28px] bg-white p-6 shadow-[0_30px_80px_-40px_rgba(4,11,82,.35)] ring-1 ring-[#DCE3F4] sm:p-9">
              <p className="text-[11.5px] font-semibold uppercase tracking-[0.2em] text-body">{demande.label}</p>
              <p className="mt-4 text-[clamp(1.6rem,1.2rem+1.2vw,2.2rem)] font-semibold leading-tight tracking-[-0.03em] text-ink">{demande.title}</p>
              <PortesDemande className="mt-7" />
              <p className="mt-6 text-[13px] font-medium leading-relaxed text-mute">{demande.privacy}</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-white">
        <div className="gutter mx-auto max-w-page pt-16 sm:pt-20">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <p className="flex items-center gap-3 text-ink">
              <Monogram className="h-8 w-auto sm:h-9" />
              <span className="text-[19px] font-bold tracking-[-0.01em] sm:text-[21px]">ValoDigital</span>
            </p>
            <p className="text-[14px] font-medium leading-relaxed text-body sm:text-right">
              {footer.tagline}
              <br />
              {footer.tags.join(" · ")}
            </p>
          </div>

          <Anchor to="top" className="group mt-12 inline-flex items-center gap-3 text-[15px] font-semibold text-ink transition hover:text-electric">
            Retour en haut
            <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6 transition-transform duration-300 group-hover:-translate-y-1" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20V5M5.5 11.5 12 5l6.5 6.5" />
            </svg>
          </Anchor>

          <div aria-hidden className="mt-10 flex items-center justify-between gap-6 overflow-hidden sm:mt-14">
            <span className="select-none text-[5.4rem] font-extralight sm:text-[clamp(7rem,1.5rem+21vw,21rem)] leading-[0.78] tracking-[-0.05em] text-[#C5D2F2]">{nom}</span>
            <Etoile className="h-11 w-11 shrink-0 text-[#8EA8F2] sm:h-[clamp(3rem,1rem+6vw,7rem)] sm:w-[clamp(3rem,1rem+6vw,7rem)]" />
          </div>

          <div className="mt-10 grid gap-3 border-t border-hair py-6 text-[11.5px] font-medium uppercase tracking-[0.14em] text-[#626c82] sm:mt-14 sm:grid-cols-3 sm:items-center">
            <p>{footer.copyright}</p>
            <p className="sm:text-center">{contact.address}</p>
            <Link
              href="/mentions-legales"
              className="justify-self-start text-[12.5px] normal-case tracking-normal text-body underline decoration-[#9AA6C8] underline-offset-[6px] transition hover:text-electric sm:justify-self-end"
            >
              {footer.legal}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
