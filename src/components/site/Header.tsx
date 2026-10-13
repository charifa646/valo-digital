"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";
import { contact, hero, menus, nav, type NavItem } from "@/lib/content";
import { Anchor, NavLink, PageLink, useScroll } from "./Scroll";
import { useSheet } from "./Sheet";
import { Monogram } from "@/components/brand/Logo";
import { ArrowRight, ChevronDown, Mail, Phone, Pin } from "@/components/ui/Icons";

type MenuId = keyof typeof menus;
const subOf = (n: NavItem) => (n.id in menus ? (n.id as MenuId) : null);

/** The mark and the name, after Charifa's ChatGPT mock-up (14 October 2026): « Valo » full, « Digital » light, a blue point. */
function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Monogram className="h-[22px] w-auto sm:h-[24px]" />
      <span className="text-[17px] tracking-[-0.035em] sm:text-[19px]">
        <span className="font-bold">Valo</span>
        <span className="font-normal">Digital</span>
        <span className="text-[#3551FF]">.</span>
      </span>
    </span>
  );
}

/** The thin arrow ↗ of the mock-up's links and buttons. */
function Oblique({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 18 18 6M8 6h10v10" />
    </svg>
  );
}

/**
 * The menu. `bleu` (Charifa, 12 October 2026, asked again the next day): the bar in electric blue glass with white words
 * and the charte's yellow button, night blue glass over the dark parts; shown at /apercu/formes until she chooses.
 */
export function Header({ bleu = false }: { bleu?: boolean }) {
  const [light, setLight] = useState(false);
  // at the very top of the homepage the bar has no glass, the mock-up's way: the logo, the words and the button on the sky
  const [haut, setHaut] = useState(true);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  // the short menu open under « Services » or « Formations » (computers), and the one unfolded in the phone menu
  const [sub, setSub] = useState<MenuId | null>(null);
  const [unfolded, setUnfolded] = useState<MenuId | null>(null);
  const subTimer = useRef(0);
  const bar = useRef<HTMLDivElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const { lock } = useScroll();
  const { open: demande } = useSheet();
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const home = pathname === "/";
  // on the homepage the sections light their entry; another page (« À propos », « Services ») lights its own while it is open
  const current = (id: string) => (home ? active === id : nav.some((n) => n.id === id && (n.href === pathname || n.page === pathname)));
  const showSub = (id: MenuId) => {
    window.clearTimeout(subTimer.current);
    setSub(id);
  };
  // a short delay, so the mouse can travel from the entry down to its menu
  const hideSub = () => {
    window.clearTimeout(subTimer.current);
    subTimer.current = window.setTimeout(() => setSub(null), 160);
  };

  // the short menu closes with Escape, a click elsewhere, or once the page moves
  useEffect(() => {
    if (!sub) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSub(null);
    const onDown = (e: PointerEvent) => !bar.current?.contains(e.target as Node) && setSub(null);
    const y = window.scrollY;
    const onScroll = () => Math.abs(window.scrollY - y) > 80 && setSub(null);
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
      window.removeEventListener("scroll", onScroll);
    };
  }, [sub]);
  useEffect(() => () => window.clearTimeout(subTimer.current), []);

  // dark glass over the night-blue panels, light glass everywhere else: watch a thin strip at the top edge of the
  // header, so it only turns dark once fully over the panel.
  useEffect(() => {
    const panels = Array.from(document.querySelectorAll<HTMLElement>("[data-dark]"));
    let frame = 0;
    const check = () => {
      frame = 0;
      setHaut(window.scrollY < 24);
      const strip = innerHeight * 0.03;
      setLight(
        // the page itself in colour (`Teintes.tsx`): dark glass too
        document.documentElement.dataset.teinte === undefined &&
          !panels.some((p) => {
            const r = p.getBoundingClientRect();
            return r.top <= strip && r.bottom > 14;
          }),
      );
    };
    const soon = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    check();
    addEventListener("scroll", soon, { passive: true });
    addEventListener("resize", soon);
    addEventListener("teinte", soon);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("scroll", soon);
      removeEventListener("resize", soon);
      removeEventListener("teinte", soon);
    };
  }, []);

  // the section on screen lights the menu entry it belongs to; a section no entry owns lights none
  useEffect(() => {
    const owner = new Map(nav.flatMap((n) => n.sections.map((s) => [s, n.id] as const)));
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main section[id], #contact"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(owner.get(e.target.id) ?? null);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    lock(true);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const button = menuButton.current;
    return () => {
      lock(false);
      window.removeEventListener("keydown", onKey);
      button?.focus({ preventScroll: true });
    };
  }, [open, lock]);

  const clair = light && !bleu;
  const ink = clair ? "text-ink" : "text-white";
  const nu = home && haut && !open;

  return (
    <LazyMotion features={domAnimation} strict>
      <header className="entete pointer-events-none fixed inset-x-0 top-0 z-50 px-[calc(var(--frame)+6px)] pt-[calc(var(--frame)+6px)] sm:pt-[calc(var(--frame)+10px)]">
        <div ref={bar} className="relative mx-auto max-w-[1200px]">
          <div
            className={`pointer-events-auto flex h-[58px] items-center justify-between gap-4 rounded-full border pl-5 pr-2 transition-[background,box-shadow,color,border-color] duration-500 sm:h-[64px] sm:pl-6 ${
              nu
                ? "border-transparent bg-transparent text-ink shadow-none"
                : bleu
                  ? light
                    ? "glass-bleu blur-bar text-white"
                    : "glass-bleu-nuit blur-bar text-white"
                  : light
                    ? "glass blur-bar text-ink"
                    : "glass-dark blur-bar text-white"
            }`}
          >
            {home ? (
              <Anchor to="top" aria-label="VALO DIGITAL, retour en haut" className={`shrink-0 ${clair ? "text-electric" : "text-white"}`}>
                <Wordmark />
              </Anchor>
            ) : (
              <Link href="/" aria-label="VALO DIGITAL, accueil" className={`shrink-0 ${clair ? "text-electric" : "text-white"}`}>
                <Wordmark />
              </Link>
            )}

            <nav aria-label="Navigation principale" className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {nav.map((n) => {
                  const g = subOf(n);
                  const on = current(n.id) || (g !== null && sub === g);
                  const cls = `relative block whitespace-nowrap rounded-full py-2 text-[13.5px] font-medium tracking-[-0.005em] transition ${g ? "pl-3.5 pr-8" : "px-3.5"} ${ink} ${
                    on ? (clair ? "bg-frost text-electric" : "bg-white/15") : clair ? "hover:text-electric" : "opacity-85 hover:opacity-100"
                  }`;
                  return (
                    <li key={n.id} className="relative" onMouseEnter={g ? () => showSub(g) : undefined} onMouseLeave={g ? hideSub : undefined}>
                      <NavLink
                        item={n}
                        aria-current={current(n.id) ? (n.href || n.page === pathname ? "page" : "true") : undefined}
                        className={cls}
                        onClick={() => setSub(null)}
                      />
                      {g && (
                        <button
                          type="button"
                          onClick={() => (sub === g ? setSub(null) : showSub(g))}
                          aria-expanded={sub === g}
                          aria-controls="sous-menu"
                          aria-label={`Menu ${n.label}`}
                          className={`absolute right-2 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full transition ${ink} ${clair ? "hover:text-electric" : ""}`}
                        >
                          <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${sub === g ? "rotate-180" : ""}`} />
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              {/* the mock-up's button: a slim pill, its words and a thin arrow ↗ */}
              <button
                type="button"
                onClick={() => demande("demande")}
                aria-haspopup="dialog"
                className={`hidden h-[44px] items-center gap-5 rounded-full px-6 text-[13px] font-semibold tracking-[-0.005em] shadow-[0_8px_22px_-10px_rgba(7,20,216,.6)] transition duration-300 hover:-translate-y-0.5 sm:inline-flex ${
                  bleu ? "bg-sun text-navy" : light || nu ? "bg-electric text-white hover:bg-[#0610ae]" : "bg-white text-electric"
                }`}
              >
                {hero.cta}
                <Oblique className="h-4 w-4" />
              </button>
              <button
                ref={menuButton}
                type="button"
                onClick={() => setOpen(!open)}
                aria-expanded={open}
                aria-controls="menu"
                aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
                className={`relative grid h-[46px] w-[46px] place-items-center rounded-full transition lg:hidden ${clair || nu || open ? "text-ink" : "text-white"}`}
              >
                {/* two lines, the mock-up's; they cross into an X while the menu is open */}
                <span aria-hidden className={`absolute h-[1.6px] w-[22px] rounded-full bg-current transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-[4px]"}`} />
                <span aria-hidden className={`absolute h-[1.6px] w-[22px] rounded-full bg-current transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-[4px]"}`} />
              </button>
            </div>
          </div>

          {/* the short menu of « Services » or « Formations » (computers): the page's name and the way to all of it on a
            blue card, then each offer with its price, leading to its place on that page */}
          <AnimatePresence>
            {sub && (
              <m.div
                key={sub}
                id="sous-menu"
                onMouseEnter={() => showSub(sub)}
                onMouseLeave={hideSub}
                className="pointer-events-auto absolute inset-x-0 top-full hidden pt-2 lg:block"
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
                transition={reduce ? { duration: 0.15 } : { type: "spring", stiffness: 260, damping: 30 }}
              >
                <div className="grid grid-cols-[0.72fr_2fr] gap-2 rounded-2xl border border-hair bg-white p-2 shadow-float">
                  <div className="flex flex-col justify-between gap-10 rounded-[4px] bg-electric p-6 text-white">
                    {/* the name that grows into the page's title on the way there (`Transitions.tsx`) */}
                    <p data-titre className="self-start text-[30px] font-semibold leading-none tracking-[-0.035em]">
                      {nav.find((n) => n.id === sub)?.label}
                    </p>
                    <Link
                      href={menus[sub].page}
                      onClick={() => setSub(null)}
                      className="group inline-flex items-center gap-2 self-start text-[14px] font-bold text-white hover:text-sun"
                    >
                      {menus[sub].all}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                  <ul className="grid grid-cols-2 content-start gap-1 py-1">
                    {menus[sub].links.map((l) => (
                      <li key={l.id}>
                        <PageLink
                          page={menus[sub].page}
                          to={l.id}
                          onClick={() => setSub(null)}
                          className="group block rounded-[4px] px-4 py-3 transition hover:bg-ice"
                        >
                          <span className="block text-[14.5px] font-semibold leading-snug tracking-[-0.01em] text-ink group-hover:text-electric">{l.name}</span>
                          {l.price && <span className="mt-1 block text-[12.5px] font-medium text-body">{l.price}</span>}
                        </PageLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* the phone menu, the mock-up's: a light frosted panel dropping under the bar, its entries large with a thin
          arrow and a fine line between them, then the button and VALO's contacts (14 October 2026, in place of the
          night-blue curtain) */}
      <AnimatePresence>
        {open && (
          <>
            <m.div
              key="voile"
              aria-hidden
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-[#040B52]/25 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            <m.div
              key="panneau"
              id="menu"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className="menu-panneau fixed inset-x-3 top-[calc(var(--frame)+72px)] z-[45] max-h-[calc(100svh-var(--frame)-88px)] overflow-y-auto rounded-[20px] px-5 pb-6 pt-2 text-ink lg:hidden"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: -14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.98 }}
              transition={reduce ? { duration: 0.15 } : { type: "spring", stiffness: 100, damping: 20 }}
              data-lenis-prevent
            >
              <nav aria-label="Navigation principale">
                <ul>
                  {nav.map((n, i) => {
                    const g = subOf(n);
                    return (
                      <m.li
                        key={n.id}
                        className="border-b border-[#D6DCF5]"
                        initial={reduce ? false : { opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.06 + i * 0.04, type: "spring", stiffness: 100, damping: 20 }}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <NavLink
                            item={n}
                            onClick={() => setOpen(false)}
                            aria-current={current(n.id) ? (n.href || n.page === pathname ? "page" : "true") : undefined}
                            className={`flex min-w-0 flex-1 items-center justify-between gap-3 py-4 text-[18px] font-medium tracking-[-0.02em] ${current(n.id) ? "text-electric" : "text-ink"}`}
                          />
                          {g ? (
                            <button
                              type="button"
                              onClick={() => setUnfolded(unfolded === g ? null : g)}
                              aria-expanded={unfolded === g}
                              aria-controls={`sous-menu-${g}`}
                              aria-label={`Menu ${n.label}`}
                              className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-ink"
                            >
                              <ChevronDown className={`h-[18px] w-[18px] transition-transform duration-300 ${unfolded === g ? "rotate-180" : ""}`} />
                            </button>
                          ) : (
                            <Oblique className="h-4 w-4 shrink-0 text-ink" />
                          )}
                        </div>
                        {g && unfolded === g && (
                          <ul id={`sous-menu-${g}`} className="grid gap-0.5 pb-4">
                            {menus[g].links.map((l) => (
                              <li key={l.id}>
                                <PageLink
                                  page={menus[g].page}
                                  to={l.id}
                                  onClick={() => setOpen(false)}
                                  className="flex items-center justify-between gap-3 py-2 text-[14.5px] font-medium leading-snug text-body"
                                >
                                  {l.name}
                                  {l.price && <span className="shrink-0 text-[12.5px] text-mute">{l.price}</span>}
                                </PageLink>
                              </li>
                            ))}
                            <li className="pt-2">
                              <Link href={menus[g].page} onClick={() => setOpen(false)} className="inline-flex items-center gap-2 text-[14.5px] font-semibold text-electric">
                                {menus[g].all}
                                <ArrowRight className="h-4 w-4" />
                              </Link>
                            </li>
                          </ul>
                        )}
                      </m.li>
                    );
                  })}
                </ul>
              </nav>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  demande("demande");
                }}
                aria-haspopup="dialog"
                className="mt-6 flex h-[50px] w-full items-center justify-between rounded-full bg-electric px-6 text-[14.5px] font-semibold text-white shadow-[0_10px_24px_-12px_rgba(7,20,216,.8)]"
              >
                {hero.cta}
                <Oblique className="h-4 w-4" />
              </button>
              <ul className="mt-5 grid gap-2.5 text-[13.5px] font-medium text-body">
                <li>
                  <a href={contact.phoneHref} className="inline-flex items-center gap-2.5">
                    <Phone className="h-4 w-4 text-electric" />
                    {contact.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-2.5">
                    <Mail className="h-4 w-4 text-electric" />
                    {contact.email}
                  </a>
                </li>
                <li>
                  <a href={contact.mapHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5">
                    <Pin className="h-4 w-4 text-electric" />
                    {contact.address}
                  </a>
                </li>
              </ul>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}
