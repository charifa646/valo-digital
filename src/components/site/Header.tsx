"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";
import { contact, hero, nav } from "@/lib/content";
import { hello, wa } from "@/lib/links";
import { Anchor, NavLink, useScroll } from "./Scroll";
import { Monogram } from "@/components/brand/Logo";
import { BtnInner, btn } from "@/components/ui/Action";
import { Close, Mail, Menu, Phone, Pin } from "@/components/ui/Icons";

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
  const menuButton = useRef<HTMLButtonElement>(null);
  const { lock } = useScroll();
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const home = pathname === "/";
  // on the homepage the sections light their entry; another page (« À propos ») lights its own while it is open
  const current = (id: string) => (home ? active === id : nav.some((n) => n.id === id && n.href === pathname));

  // dark glass over the night-blue panels, light glass everywhere else:
  // watch a thin strip at the top edge of the header, so it only turns dark once fully over the panel
  useEffect(() => {
    const panels = Array.from(document.querySelectorAll<HTMLElement>("[data-dark]"));
    const under = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) e.isIntersecting ? under.add(e.target) : under.delete(e.target);
        setLight(under.size === 0);
      },
      { rootMargin: "-14px 0px -97% 0px", threshold: 0 },
    );
    panels.forEach((p) => io.observe(p));
    return () => io.disconnect();
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
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-[calc(var(--frame)+6px)] pt-[calc(var(--frame)+6px)] sm:pt-[calc(var(--frame)+10px)]">
        <div
          className={`pointer-events-auto mx-auto flex h-[58px] max-w-[1200px] items-center justify-between gap-4 rounded-full pl-5 pr-2 transition-[background,box-shadow,color] duration-500 sm:h-[64px] sm:pl-6 ${
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
                const cls = `relative block whitespace-nowrap rounded-full px-3.5 py-2 text-[14px] font-semibold transition ${ink} ${
                  current(n.id) ? (light ? "bg-frost text-electric" : "bg-white/15") : light ? "hover:text-electric" : "opacity-85 hover:opacity-100"
                }`;
                return (
                  <li key={n.id}>
                    <NavLink item={n} aria-current={current(n.id) ? (n.href ? "page" : "true") : undefined} className={cls} />
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={wa(hello)}
              target="_blank"
              rel="noopener noreferrer"
              className={btn(
                light ? "electric" : "white",
                "hidden min-h-[46px] pl-5 text-[13.5px] sm:inline-flex [&_.dot]:h-[34px] [&_.dot]:w-[34px] [&_.dot_svg]:h-4 [&_.dot_svg]:w-4",
              )}
            >
              <BtnInner>{hero.cta}</BtnInner>
            </a>
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
                  {nav.map((n, i) => (
                    <m.li
                      key={n.id}
                      initial={reduce ? false : { opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 + i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <NavLink
                        item={n}
                        onClick={() => setOpen(false)}
                        aria-current={current(n.id) ? (n.href ? "page" : "true") : undefined}
                        className={`block border-b border-white/10 py-3.5 text-[clamp(1.35rem,6.4vw,1.9rem)] font-semibold leading-tight tracking-[-0.025em] ${current(n.id) ? "text-sun" : ""}`}
                      />
                    </m.li>
                  ))}
                </ul>
              </nav>
              <m.div
                className="mt-auto pt-10"
                initial={reduce ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <a href={wa(hello)} target="_blank" rel="noopener noreferrer" className={btn("white", "w-full")}>
                  <BtnInner>{hero.cta}</BtnInner>
                </a>
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
