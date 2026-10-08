"use client";

import { createContext, forwardRef, useCallback, useContext, useEffect, useMemo, useRef, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type Lenis from "lenis";

type Scroll = {
  /** Glide to a section (or any element with that id), header height taken into account. */
  go: (id: string) => void;
  /** Freeze the page behind a panel or the menu. */
  lock: (on: boolean) => void;
};

const Ctx = createContext<Scroll>({ go: () => {}, lock: () => {} });
export const useScroll = () => useContext(Ctx);

/** Smooth scrolling with Lenis on computers only; phones keep their native scroll. */
export function ScrollProvider({ children }: { children: ReactNode }) {
  const lenis = useRef<Lenis | null>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    let instance: Lenis | undefined;
    let cancelled = false;
    import("lenis").then(({ default: L }) => {
      if (cancelled) return;
      instance = new L({ duration: 1.1, easing: (t) => 1 - Math.pow(1 - t, 4), autoRaf: true });
      lenis.current = instance;
    });
    return () => {
      cancelled = true;
      instance?.destroy();
      lenis.current = null;
    };
  }, []);

  const go = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    // a card still waiting for its entrance (shifted, tilted or clipped) would be measured out of place: show it at once
    if (el.matches("[data-reveal]:not([data-in])")) {
      el.style.transition = "none";
      el.setAttribute("data-in", "");
      void el.offsetWidth;
      el.style.transition = "";
    }
    const header = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header")) || 80;
    // the page is held in place while the last call slides over it (`#contenu` is sticky): a section of it is measured
    // where it really lies, not where it is held, by letting go of it for the time of the measure
    const main = document.getElementById("contenu");
    const held = !!main && main.contains(el);
    if (held) main!.style.position = "static";
    let top = el.getBoundingClientRect().top + window.scrollY - header - 8;
    // never past the point where the page is held: the sheet would cover what the visitor came to see
    if (held) top = Math.min(top, main!.offsetHeight - window.innerHeight);
    if (held) main!.style.position = "";
    if (lenis.current) lenis.current.scrollTo(top, { duration: 1.3 });
    else {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
    }
    if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
    el.focus({ preventScroll: true });
    // the card a door leads to says hello when it arrives
    el.classList.remove("is-target");
    void el.offsetWidth;
    el.classList.add("is-target");
    window.setTimeout(() => el.classList.remove("is-target"), 2600);
    history.replaceState(null, "", `#${id}`);
  }, []);

  const lock = useCallback((on: boolean) => {
    if (on) lenis.current?.stop();
    else lenis.current?.start();
    document.documentElement.style.overflow = on ? "hidden" : "";
  }, []);

  // The last call (the block after `#contenu`) slides over the page like a sheet (Charifa, 7 October 2026): the page
  // stays where it is once its end reaches the bottom of the screen (`#contenu` is sticky, its height kept here), and a
  // veil darkens it as the sheet covers it.
  const veil = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const main = document.getElementById("contenu");
    const sheet = main?.nextElementSibling as HTMLElement | null;
    const v = veil.current;
    if (!main || !sheet || !v) return;
    const size = () => main.style.setProperty("--main-h", `${main.offsetHeight}px`);
    const ro = new ResizeObserver(size);
    ro.observe(main);
    size();
    let frame = 0;
    let last = -1;
    const update = () => {
      frame = 0;
      const cover = Math.min(1, Math.max(0, (window.innerHeight - sheet.getBoundingClientRect().top) / window.innerHeight));
      if (cover === last) return;
      last = cover;
      v.style.opacity = (cover * 0.5).toFixed(3);
      v.style.visibility = cover > 0 ? "visible" : "hidden";
    };
    const soon = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", soon, { passive: true });
    window.addEventListener("resize", soon);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", soon);
      window.removeEventListener("resize", soon);
    };
  }, []);

  // arriving from another page at one of this page's places (« /services#diagnostic », « /a-propos#mot »): glide the
  // last bit with the header taken into account, show it at once if it was waiting for its entrance, and say hello
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id || id === "top" || id === "contenu") return;
    const t = window.setTimeout(() => document.getElementById(id) && go(id), 160);
    return () => window.clearTimeout(t);
  }, [go]);

  const value = useMemo(() => ({ go, lock }), [go, lock]);
  return (
    <Ctx.Provider value={value}>
      {children}
      <div ref={veil} aria-hidden className="veil" />
    </Ctx.Provider>
  );
}

type AnchorProps = { to: string; className?: string; children: ReactNode; onClick?: () => void } & Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "onClick"
>;

/** Sections every page has (the top, the contact block); the others live on the homepage. */
const everywhere = new Set(["top", "contact", "contenu"]);

/**
 * A link to a section that still works without JavaScript. On the homepage it
 * glides there; from another page it opens the homepage at that section.
 */
export const Anchor = forwardRef<HTMLAnchorElement, AnchorProps>(function Anchor({ to, className, children, onClick, ...rest }, ref) {
  const { go } = useScroll();
  const home = usePathname() === "/";
  return (
    <a
      ref={ref}
      href={home || everywhere.has(to) ? `#${to}` : `/#${to}`}
      className={className}
      onClick={(e) => {
        onClick?.();
        if (!document.getElementById(to)) return; // not on this page: the link opens the homepage there
        e.preventDefault();
        go(to);
      }}
      {...rest}
    >
      {children}
    </a>
  );
});

type PageLinkProps = { page: string; to: string; className?: string; children: ReactNode; onClick?: () => void } & Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "onClick"
>;

/** A link to a place on a page of its own (« /services#diagnostic »): it glides there when that page is already open. */
export function PageLink({ page, to, className, children, onClick, ...rest }: PageLinkProps) {
  const { go } = useScroll();
  const pathname = usePathname();
  return (
    <Link
      href={`${page}#${to}`}
      className={className}
      onClick={(e) => {
        onClick?.();
        if (pathname !== page || !document.getElementById(to)) return;
        e.preventDefault();
        go(to);
      }}
      {...rest}
    >
      {children}
    </Link>
  );
}

type NavLinkProps = { item: { id: string; label: string; href?: string; page?: string }; className?: string; onClick?: () => void } & Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "onClick"
>;

/**
 * A menu entry: a page (« Accueil », « À propos ») opens with a client-side
 * link, or glides back to its top when it is the page already open; a section
 * of the homepage goes through Anchor, except on its own page (« Services » on
 * /services), where it glides back to the top.
 */
export function NavLink({ item, className, onClick, children, ...rest }: NavLinkProps & { children?: ReactNode }) {
  const pathname = usePathname();
  if (item.href && item.href !== pathname)
    return (
      <Link href={item.href} className={className} onClick={onClick} {...rest}>
        {children ?? item.label}
      </Link>
    );
  return (
    <Anchor to={item.href || item.page === pathname ? "top" : item.id} className={className} onClick={onClick} {...rest}>
      {children ?? item.label}
    </Anchor>
  );
}
