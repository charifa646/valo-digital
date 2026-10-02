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
    const offset = -header - 8;
    // Lenis already honours the scroll-padding-top set on <html> (header height)
    if (lenis.current) lenis.current.scrollTo(el, { duration: 1.3 });
    else {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: reduce ? "auto" : "smooth" });
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

  const value = useMemo(() => ({ go, lock }), [go, lock]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
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

type NavLinkProps = { item: { id: string; label: string; href?: string }; className?: string; onClick?: () => void } & Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "onClick"
>;

/**
 * A menu entry: a page (« Accueil », « À propos ») opens with a client-side
 * link, or glides back to its top when it is the page already open; a section
 * of the homepage goes through Anchor.
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
    <Anchor to={item.href ? "top" : item.id} className={className} onClick={onClick} {...rest}>
      {children ?? item.label}
    </Anchor>
  );
}
