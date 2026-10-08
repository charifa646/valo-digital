import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { contact, final, fondateur, footer, formations, menus, nav } from "@/lib/content";
import { Monogram } from "@/components/brand/Logo";
import { BtnInner, btn } from "@/components/ui/Action";
import { Mail, Phone, Pin } from "@/components/ui/Icons";
import { NavLink, PageLink } from "./Scroll";
import { DemandeButton } from "./Sheet";
import { FooterWordmark } from "./FooterWordmark";
import { Words } from "@/components/ui/Words";

const heading = "text-[12px] font-semibold uppercase tracking-[0.18em] text-white/50";
const link = "text-[14.5px] font-medium text-white/80 transition hover:text-white";
// the columns are named after their menu entries, found by id: « Accueil » came first in the menu and shifted them
const columnTitle = (id: string) => nav.find((n) => n.id === id)?.label ?? "";

/**
 * The last call with Valentin in his armchair, then the footer: a night-blue
 * card (21st.dev « Hover Footer » and « Footer Section 4 »), the name, the
 * services, the trainings and how to reach VALO, and the name again, outlined,
 * lighting up under the mouse.
 */
export function Final() {
  const reach = [
    { href: contact.phoneHref, label: contact.phone, Icon: Phone, ext: false },
    { href: `mailto:${contact.email}`, label: contact.email, Icon: Mail, ext: false },
    { href: contact.mapHref, label: contact.address, Icon: Pin, ext: true },
  ];

  return (
    <div data-dark className="feuille on-dark isolate overflow-hidden bg-[linear-gradient(180deg,#0714D8_0%,#0A15C2_45%,#050E78_100%)] text-white">
      <div
        aria-hidden
        className="absolute right-[-10%] top-[-20%] -z-10 h-[620px] w-[620px] rounded-full bg-[radial-gradient(closest-side,rgba(143,163,255,.35),transparent)]"
      />

      <section
        id="contact"
        aria-labelledby="contact-title"
        className="relative mx-auto grid max-w-page gap-4 px-6 pt-16 sm:px-12 sm:pt-20 lg:grid-cols-[1.08fr_1fr] lg:items-end lg:gap-10 lg:px-14 lg:pt-24"
      >
        <div className="lg:pb-28">
          <h2 id="contact-title" data-reveal="words" className="h2 balance max-w-[14ch]">
            <Words>{final.title}</Words>
          </h2>
          <p
            data-reveal
            style={{ ["--d" as string]: "0.3s" } as CSSProperties}
            className="pretty mt-5 max-w-[30rem] text-[17px] font-medium leading-relaxed text-white/80 sm:text-[18px]"
          >
            {final.text}
          </p>
          <div data-reveal="pop" style={{ ["--d" as string]: "0.45s" } as CSSProperties} className="mt-8">
            <DemandeButton className={btn("white")}>
              <BtnInner>{final.cta}</BtnInner>
            </DemandeButton>
          </div>
        </div>

        {/* Valentin, smiling, in a pool of light */}
        <div data-reveal="zoom" className="relative mx-auto -mb-px mt-6 w-full max-w-[500px] origin-bottom self-end lg:mt-0">
          <div
            aria-hidden
            className="absolute bottom-[4%] left-1/2 h-[80%] w-[90%] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(232,238,255,.45),rgba(143,163,255,.18)_60%,transparent)]"
          />
          <Image
            src="/images/v3/valentin-assis.webp"
            alt={`${fondateur.name}, ${fondateur.roles[2]}`}
            width={990}
            height={1131}
            sizes="(min-width: 1024px) 500px, 90vw"
            className="relative h-auto w-full"
          />
        </div>
      </section>

      <footer className="relative mx-auto max-w-page px-3 pb-3 sm:px-6 sm:pb-6 lg:px-8 lg:pb-8">
        <div className="relative overflow-hidden rounded-none border border-white/10 bg-[linear-gradient(180deg,rgba(4,11,82,.92)_0%,rgba(2,6,46,.96)_100%)] shadow-[0_40px_80px_-40px_rgba(0,0,0,.6)]">
          {/* a blue light rising from the bottom of the card, behind the name */}
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-[70%] bg-[radial-gradient(60%_90%_at_50%_100%,rgba(53,81,255,.32),transparent)]" />

          <div className="relative grid gap-10 px-6 pb-10 pt-10 sm:grid-cols-2 sm:px-10 lg:grid-cols-[1.3fr_1fr_1fr_1.15fr] lg:gap-8 lg:px-12 lg:pt-14">
            <div className="sm:col-span-2 lg:col-span-1">
              <p className="flex items-center gap-3">
                <Monogram className="h-8 w-auto" />
                <span className="text-[17px] font-bold tracking-[0.04em]">{footer.name}</span>
              </p>
              <p className="mt-4 max-w-[17rem] text-[15px] font-medium leading-relaxed text-white/70">{footer.tagline}</p>
              <p className="mt-2 text-[13.5px] font-semibold text-white/50">{footer.tags.join(" · ")}</p>
            </div>

            <nav aria-label={columnTitle("prestations")}>
              <p className={heading}>{columnTitle("prestations")}</p>
              <ul className="mt-5 grid gap-3">
                {menus.prestations.links.slice(0, 4).map((l) => (
                  <li key={l.id}>
                    <PageLink page={menus.prestations.page} to={l.id} className={link}>
                      {l.name}
                    </PageLink>
                  </li>
                ))}
                <li>
                  <Link href={menus.prestations.page} className="text-[14.5px] font-semibold text-sun transition hover:text-white">
                    {menus.prestations.all}
                  </Link>
                </li>
              </ul>
            </nav>

            <nav aria-label={columnTitle("formations")}>
              <p className={heading}>{columnTitle("formations")}</p>
              <ul className="mt-5 grid gap-3">
                {menus.formations.links.slice(0, 4).map((l) => (
                  <li key={l.id}>
                    <PageLink page={menus.formations.page} to={l.id} className={link}>
                      {l.name}
                    </PageLink>
                  </li>
                ))}
                <li>
                  <Link href={menus.formations.page} className="text-[14.5px] font-semibold text-sun transition hover:text-white">
                    {formations.cta}
                  </Link>
                </li>
              </ul>
            </nav>

            <div>
              <p className={heading}>{columnTitle("contact")}</p>
              <ul className="mt-5 grid gap-3.5">
                {reach.map(({ href, label, Icon, ext }) => (
                  <li key={href}>
                    <a href={href} {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})} className={`group flex items-center gap-3 ${link}`}>
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/15 bg-white/[0.06] text-white transition group-hover:border-white/40">
                        <Icon className="h-[17px] w-[17px]" />
                      </span>
                      <span className="min-w-0 break-words">{label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="relative mx-6 flex flex-col gap-4 border-t border-white/10 py-6 sm:mx-10 sm:flex-row sm:items-center sm:justify-between lg:mx-12">
            <p className="text-[13px] font-medium text-white/55">{footer.copyright}</p>
            <nav aria-label="Pied de page">
              <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[13.5px] font-semibold text-white/70">
                {nav.map((n) => (
                  <li key={n.id}>
                    <NavLink item={n} className="transition hover:text-white" />
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="relative px-4 sm:px-8">
            <FooterWordmark />
          </div>
        </div>
      </footer>
    </div>
  );
}
