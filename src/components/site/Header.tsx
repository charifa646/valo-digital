"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";
import { contact, hero, menus, nav, type NavItem } from "@/lib/content";
import { Anchor, NavLink, PageLink, useScroll } from "./Scroll";
import { useSheet } from "./Sheet";
import { Monogram } from "@/components/brand/Logo";
import { BtnInner, btn } from "@/components/ui/Action";
import { ArrowRight, ChevronDown, Close, Mail, Menu, Phone, Pin } from "@/components/ui/Icons";

type MenuId = keyof typeof menus;
const subOf = (n: NavItem) => (n.id in menus ? (n.id as MenuId) : null);

function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Monogram className="h-[22px] w-auto sm:h-[24px]" />
      <span className="text-[16px] font-bold tracking-[-0.01em] sm:text-[17px]">ValoDigital</span>
    </span>
  );
}

export function Header() {
  const [light, setLight] = useState(false);
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
  // header, so it only turns dark once fully over the panel. A panel whose top is cut as a wave (`.wave-top`) counts
  // from the middle of its wave, where its blue really begins.
  useEffect(() => {
    const panels = Array.from(document.querySelectorAll<HTMLElement>("[data-dark]"));
    let frame = 0;
    const check = () => {
      frame = 0;
      const strip = innerHeight * 0.03;
      setLight(
        // the page itself in colour (`Teintes.tsx`): dark glass too
        document.documentElement.dataset.teinte === undefined &&
          !panels.some((p) => {
            const r = p.getBoundingClientRect();
            const wave = p.classList.contains("wave-top") ? parseFloat(getComputedStyle(p).paddingTop) / 2 : 0;
            return r.top + wave <= strip && r.bottom > 14;
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

  const ink = light ? "text-ink" : "text-white";

  return (
    <LazyMotion features={domAnimation} strict>
      <header className="entete pointer-events-none fixed inset-x-0 top-0 z-50 px-[calc(var(--frame)+6px)] pt-[calc(var(--frame)+6px)] sm:pt-[calc(var(--frame)+10px)]">
        <div ref={bar} className="relative mx-auto max-w-[1200px]">
          <div
            className={`pointer-events-auto flex h-[58px] items-center justify-between gap-4 rounded-full pl-5 pr-2 transition-[background,box-shadow,color] duration-500 sm:h-[64px] sm:pl-6 ${
              light ? "glass blur-bar text-ink" : "glass-dark blur-bar text-white"
            }`}
          >
            {home ? (
              <Anchor to="top" aria-label="VALO DIGITAL, retour en haut" className={`shrink-0 ${light ? "text-electric" : "text-white"}`}>
                <Wordmark />
              </Anchor>
            ) : (
              <Link href="/" aria-label="VALO DIGITAL, accueil" className={`shrink-0 ${light ? "text-electric" : "text-white"}`}>
                <Wordmark />
              </Link>
            )}

            <nav aria-label="Navigation principale" className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {nav.map((n) => {
                  const g = subOf(n);
                  const on = current(n.id) || (g !== null && sub === g);
                  const cls = `relative block whitespace-nowrap rounded-full py-2 text-[14px] font-semibold transition ${g ? "pl-3.5 pr-8" : "px-3.5"} ${ink} ${
                    on ? (light ? "bg-frost text-electric" : "bg-white/15") : light ? "hover:text-electric" : "opacity-85 hover:opacity-100"
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
                          className={`absolute right-2 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full transition ${ink} ${light ? "hover:text-electric" : ""}`}
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
              <button
                type="button"
                onClick={() => demande("demande")}
                aria-haspopup="dialog"
                className={btn(
                  light ? "electric" : "white",
                  "hidden min-h-[46px] pl-5 text-[13.5px] sm:inline-flex [&_.dot]:h-[34px] [&_.dot]:w-[34px] [&_.dot_svg]:h-4 [&_.dot_svg]:w-4",
                )}
              >
                <BtnInner>{hero.cta}</BtnInner>
              </button>
              <button
                ref={menuButton}
                type="button"
                onClick={() => setOpen(true)}
                aria-expanded={open}
                aria-controls="menu"
                aria-label="Menu"
                className={`grid h-[46px] w-[46px] place-items-center rounded-full transition lg:hidden ${light ? "bg-electric text-white" : "bg-white text-electric"}`}
              >
                <Menu className="h-5 w-5" />
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

      <AnimatePresence>
        {open && (
          <m.div
            id="menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="on-dark fixed inset-0 z-[60] overflow-y-auto bg-night text-white"
            initial={reduce ? { opacity: 0 } : { clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "circle(150% at calc(100% - 44px) 44px)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
            transition={{ duration: 0.7, ease: [0.7, 0, 0.2, 1] }}
            data-lenis-prevent
          >
            <div className="curtain opacity-70" />
            <div className="relative flex min-h-full flex-col px-6 pb-10 pt-6">
              <div className="flex items-center justify-between">
                <Wordmark />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Fermer"
                  autoFocus
                  className="grid h-[46px] w-[46px] place-items-center rounded-full bg-white text-electric"
                >
                  <Close className="h-5 w-5" />
                </button>
              </div>
              <nav aria-label="Navigation principale" className="mt-12">
                <ul className="grid gap-1">
                  {nav.map((n, i) => {
                    const g = subOf(n);
                    return (
                      <m.li
                        key={n.id}
                        className="border-b border-white/10"
                        initial={reduce ? false : { opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 + i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="flex items-center justify-between gap-4">
                          <NavLink
                            item={n}
                            onClick={() => setOpen(false)}
                            aria-current={current(n.id) ? (n.href || n.page === pathname ? "page" : "true") : undefined}
                            className={`block min-w-0 flex-1 py-3.5 text-[clamp(1.35rem,6.4vw,1.9rem)] font-semibold leading-tight tracking-[-0.025em] ${current(n.id) ? "text-sun" : ""}`}
                          />
                          {g && (
                            <button
                              type="button"
                              onClick={() => setUnfolded(unfolded === g ? null : g)}
                              aria-expanded={unfolded === g}
                              aria-controls={`sous-menu-${g}`}
                              aria-label={`Menu ${n.label}`}
                              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 text-white"
                            >
                              <ChevronDown className={`h-[18px] w-[18px] transition-transform duration-300 ${unfolded === g ? "rotate-180" : ""}`} />
                            </button>
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
                                  className="block py-2 text-[15.5px] font-medium leading-snug text-white/80"
                                >
                                  {l.name}
                                </PageLink>
                              </li>
                            ))}
                            <li className="pt-2">
                              <Link
                                href={menus[g].page}
                                onClick={() => setOpen(false)}
                                className="inline-flex items-center gap-2 text-[15.5px] font-bold text-sun"
                              >
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
              <m.div
                className="mt-auto pt-10"
                initial={reduce ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    demande("demande");
                  }}
                  aria-haspopup="dialog"
                  className={btn("white", "w-full")}
                >
                  <BtnInner>{hero.cta}</BtnInner>
                </button>
                <ul className="mt-7 grid gap-3 text-[15px] font-medium text-white/80">
                  <li>
                    <a href={contact.phoneHref} className="inline-flex items-center gap-3">
                      <Phone className="h-5 w-5 text-white" />
                      {contact.phone}
                    </a>
                  </li>
                  <li>
                    <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-3">
                      <Mail className="h-5 w-5 text-white" />
                      {contact.email}
                    </a>
                  </li>
                  <li>
                    <a href={contact.mapHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3">
                      <Pin className="h-5 w-5 text-white" />
                      {contact.address}
                    </a>
                  </li>
                </ul>
              </m.div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}
