"use client";

import Image from "next/image";
import Link from "next/link";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";
import {
  demande,
  detailLabels,
  details,
  formations,
  planId,
  prestations,
  solutions,
  type DemandeKind,
  type Detail,
  type DetailId,
  type SheetId,
} from "@/lib/content";
import { useScroll } from "./Scroll";
import { ArrowRight, Check, Close } from "@/components/ui/Icons";
import { PiluleInner, pilule } from "@/components/ui/Action";
import { DemandeChoix, DemandeForm, Portes } from "./Demande";
import { formationPhotos } from "@/lib/photos";

/** `focus`: the training to show, or the offer already chosen in a form; `back`: the form was reached from the choice;
 * `from`: the offer or training panel a form was opened from, to go back to it. */
type State = { id: SheetId; focus?: string; back?: boolean; from?: { id: SheetId; focus?: string } } | null;
type Open = (id: SheetId, focus?: string, back?: boolean) => void;

const Ctx = createContext<{ open: Open }>({ open: () => {} });
export const useSheet = () => useContext(Ctx);

const isDemande = (id: SheetId) => id === "demande" || id === "demande-prestation" || id === "demande-formation";

/** « Parlons de votre projet » and the like: opens the choice between the two forms, or one form with its offer chosen. */
export function DemandeButton({
  id = "demande",
  choice,
  className = "",
  children,
}: {
  id?: SheetId;
  choice?: string;
  className?: string;
  children: ReactNode;
}) {
  const { open } = useSheet();
  return (
    <button type="button" onClick={() => open(id, choice)} aria-haspopup="dialog" className={className}>
      {children}
    </button>
  );
}

/** The two ways in of « Parlons de votre projet » at the foot of every page (14 October 2026, Charifa: « au footer, on met
 * les deux portes d'entrée qui, une fois cliquées, s'ouvrent sur notre formulaire »). */
export function PortesDemande({ className = "" }: { className?: string }) {
  const { open } = useSheet();
  return <Portes className={className} onPick={(k) => open(`demande-${k}`)} />;
}

/**
 * The details window, in the middle of the screen since 14 October 2026 (Charifa, after her ChatGPT mock-up: « au lieu
 * que les trucs s'affichent en latéral », « c'est beaucoup plus sobre »): a white card with large rounded corners over the
 * page darkened and softly blurred, a round close button, the content scrolling inside it. Before, it slid in from the right.
 */
export function SheetProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(null);
  const opener = useRef<HTMLElement | null>(null);
  const { lock } = useScroll();

  const open = useCallback<Open>((id, focus, back) => {
    // moving between the screens of the forms keeps the element that opened the panel, to give it the focus back
    if (!document.querySelector("[data-sheet]")) opener.current = document.activeElement as HTMLElement | null;
    // a form opened from an offer's or a training's panel remembers it, for « Retour »
    setState((prev) => ({
      id,
      focus,
      back,
      from: isDemande(id) && !back && prev && !isDemande(prev.id) ? { id: prev.id, focus: prev.focus } : undefined,
    }));
  }, []);
  const close = useCallback(() => setState(null), []);

  useEffect(() => {
    lock(!!state);
  }, [state, lock]);

  const value = useMemo(() => ({ open }), [open]);

  return (
    <Ctx.Provider value={value}>
      {children}
      <LazyMotion features={domAnimation} strict>
        <AnimatePresence onExitComplete={() => opener.current?.focus({ preventScroll: true })}>
          {/* one panel whose content changes: with a key per screen, the old one's exit gave the focus back to the page
              while the new one was open (12 October 2026) */}
          {state && <Panel key="sheet" state={state} onClose={close} />}
        </AnimatePresence>
      </LazyMotion>
    </Ctx.Provider>
  );
}

const fromPrestations = (id: SheetId) => id === "reseaux" || id === "publicite" || id === "video";

function Panel({ state, onClose }: { state: NonNullable<State>; onClose: () => void }) {
  const { open } = useSheet();
  const reduce = useReducedMotion();
  const box = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const [wide, setWide] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setWide(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    closeButton.current?.focus({ preventScroll: true });
    if ((isDemande(state.id) || state.id !== "formations") && box.current) box.current.scrollTop = 0;
    else if (state.focus) {
      const el = box.current?.querySelector<HTMLElement>(`[data-item="${state.focus}"]`);
      if (el && box.current) box.current.scrollTop = el.offsetTop - 96;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !box.current) return;
      const f = Array.from(
        box.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]):not([tabindex="-1"]), select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [state, onClose]);

  // rises a little and settles, with the site's spring (stiffness 100, damping 20); on phones it comes up a little further
  const hidden = reduce ? { opacity: 0 } : { opacity: 0, y: wide ? 26 : 40, scale: 0.97 };
  const shown = reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 };

  const id = state.id;
  const kind: DemandeKind | null = id === "demande-prestation" ? "prestation" : id === "demande-formation" ? "formation" : null;
  const eyebrow = isDemande(id) ? demande.label : id === "formations" ? formations.label : fromPrestations(id) ? prestations.label : solutions.label;
  const one = id === "formations" && state.focus ? formations.items.find((f) => f.id === state.focus) : undefined;
  const title = isDemande(id)
    ? kind
      ? demande[kind].title
      : demande.title
    : id === "formations"
      ? (one?.name ?? formations.title.join(" "))
      : details[id as DetailId].title;
  const cta = demande.order;

  let body: ReactNode;
  if (id === "demande") body = <DemandeChoix onPick={(k) => open(`demande-${k}`, undefined, true)} />;
  else if (kind)
    body = (
      <DemandeForm
        key={`${kind}-${state.focus ?? ""}`}
        kind={kind}
        preset={state.focus}
        onSwitch={(k) => open(`demande-${k}`, undefined, state.back)}
        onBack={state.back ? () => open("demande") : state.from ? () => open(state.from!.id, state.from!.focus) : undefined}
        onClose={onClose}
      />
    );
  else if (one) body = <FormationOne f={one} />;
  else if (id === "formations") body = <FormationList focus={state.focus} />;
  else body = <DetailBody id={id as DetailId} d={details[id as DetailId]} cta={cta} />;
  // the training's photo opens its window, above its name, as in the mock-up
  const media = one ? (
    <div className="relative aspect-[16/9] overflow-hidden rounded-[20px] bg-frost">
      <Image src={`/images/formations/${formationPhotos[one.id] ?? one.id}.webp`} alt="" fill sizes="(min-width: 768px) 580px, 90vw" className="object-cover" />
    </div>
  ) : null;

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center p-3 sm:p-6" role="presentation">
      <m.div
        className="absolute inset-0 bg-[#0A1640]/55 backdrop-blur-[6px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      />
      <m.div
        ref={box}
        role="dialog"
        aria-modal="true"
        data-sheet
        aria-labelledby="sheet-title"
        data-lenis-prevent
        className="relative max-h-[calc(100svh-24px)] w-full max-w-[640px] overflow-y-auto overscroll-contain rounded-[28px] bg-white shadow-[0_40px_120px_-30px_rgba(11, 37, 54,.7)] sm:max-h-[calc(100svh-48px)]"
        initial={hidden}
        animate={shown}
        exit={hidden}
        transition={reduce ? { duration: 0.2 } : { type: "spring", stiffness: 100, damping: 20 }}
      >
        {/* the round close button stays in its corner while the content scrolls (a sticky strip with no height) */}
        <div className="sticky top-0 z-10 flex h-0 justify-end">
          <button
            ref={closeButton}
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="mr-4 mt-4 grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-ink shadow-[0_6px_20px_-8px_rgba(11, 37, 54,.45)] ring-1 ring-hair transition hover:bg-night hover:text-white sm:mr-5 sm:mt-5"
          >
            <Close className="h-5 w-5" />
          </button>
        </div>

        {media && <div className="px-4 pt-4 sm:px-7 sm:pt-7">{media}</div>}
        <div className={`px-6 pb-8 sm:px-10 sm:pb-10 ${media ? "pt-7" : "pt-7 sm:pt-9"}`}>
          <p className="label text-electric">{eyebrow}</p>
          <h2 id="sheet-title" className={`mt-3 text-[26px] font-bold leading-[1.08] tracking-[-0.03em] text-ink sm:text-[34px] ${media ? "" : "pr-14"}`}>
            {title}
          </h2>
          <div className="mt-6 sm:mt-7">{body}</div>
        </div>
      </m.div>
    </div>
  );
}

function Points({ points, dark = false, className = "mt-5" }: { points: string[]; dark?: boolean; className?: string }) {
  return (
    <ul className={`grid gap-2.5 ${className}`}>
      {points.map((p) => (
        <li key={p} className={`flex items-start gap-3 text-[15px] font-medium leading-snug ${dark ? "text-white/90" : "text-ink"}`}>
          <span className={`mt-[1px] grid h-5 w-5 shrink-0 place-items-center rounded-full ${dark ? "bg-white text-electric" : "bg-electric text-white"}`}>
            <Check className="h-3 w-3" />
          </span>
          {p}
        </li>
      ))}
    </ul>
  );
}

/** The offer each panel's button chooses in the form: the three social media plans in order, the others by name. */
function DetailBody({ id, d, cta }: { id: DetailId; d: Detail; cta: string }) {
  const { open } = useSheet();
  if (d.formules) {
    return (
      <div className="grid gap-4">
        {d.formules.map((f, i) => {
          // the first plan, where the offer starts, stands out
          const featured = i === 0;
          return (
            <article key={f.name} className={`rounded-[22px] p-6 sm:p-7 ${featured ? "bg-electric text-white shadow-glow" : "bg-soft text-ink"}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-[21px] font-extrabold tracking-[-0.02em]">{f.name}</h3>
                <p className={`text-[12.5px] font-semibold ${featured ? "text-white/75" : "text-body"}`}>
                  {detailLabels.for} : {f.for}
                </p>
              </div>
              <p className={`mt-3 text-[15.5px] leading-relaxed ${featured ? "text-white/85" : "text-body"}`}>{f.pitch}</p>
              <Points points={f.points} dark={featured} />
              <div className={`mt-6 border-t pt-5 ${featured ? "border-white/20" : "border-line"}`}>
                <p className="text-[22px] font-bold tracking-[-0.025em]">{f.price}</p>
                <button type="button" onClick={() => open("demande-prestation", planId(f.name))} className={pilule(featured ? "white" : "electric", "mt-4")}>
                  <PiluleInner>{cta}</PiluleInner>
                </button>
              </div>
            </article>
          );
        })}
      </div>
    );
  }

  return (
    <div>
      {d.pitch && <p className="text-[19px] font-semibold leading-snug tracking-[-0.01em] text-ink sm:text-[21px]">{d.pitch}</p>}
      {d.for && (
        <p className="mt-5 inline-flex flex-wrap items-center gap-2 rounded-full bg-soft px-4 py-2 text-[13px] font-semibold text-body">
          <span className="text-electric">{detailLabels.for}</span>
          {d.for}
        </p>
      )}
      {d.points && (
        <div className="mt-6 rounded-[22px] bg-soft p-6 sm:p-7">
          <Points points={d.points} className="" />
        </div>
      )}
      {d.price && <p className="mt-8 text-[28px] font-bold leading-tight tracking-[-0.03em] text-ink sm:text-[32px]">{d.price}</p>}
      <button type="button" onClick={() => open("demande-prestation", id)} className={pilule("electric", "mt-6")}>
        <PiluleInner>{cta}</PiluleInner>
      </button>
    </div>
  );
}

/**
 * One training, opened from its card or its line (12 October 2026; laid out after Charifa's ChatGPT mock-up on 14 October
 * 2026): its photo at the top of the window (`media` in `Panel`), its name, its format, its price written large, its main
 * modules as a list, the enrolment button across the window, and the way to all the trainings.
 */
function FormationOne({ f }: { f: (typeof formations.items)[number] }) {
  const { open } = useSheet();
  const c = formations.columns;
  // the main modules as a list, split where the catalogue separates them by commas (the words are the catalogue's)
  const modules = f.modules
    .replace(/\.$/, "")
    .split(/,\s*/)
    .map((x) => x.charAt(0).toUpperCase() + x.slice(1));
  return (
    <div>
      <p className="text-[13px] font-semibold text-body">
        {c.format} : <span className="text-ink">{f.format}</span>
      </p>
      <p className="mt-3 text-[30px] font-bold leading-tight tracking-[-0.03em] text-ink sm:text-[34px]">{f.price}</p>
      <h3 className="mt-7 text-[15.5px] font-bold text-ink">{c.modules}</h3>
      <ul className="mt-3 grid gap-2">
        {modules.map((m) => (
          <li key={m} className="flex gap-3 text-[15.5px] leading-relaxed text-body">
            <span aria-hidden className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-electric" />
            {m}
          </li>
        ))}
      </ul>
      <button type="button" onClick={() => open("demande-formation", f.id)} className={pilule("electric", "mt-8")}>
        <PiluleInner>{demande.enroll}</PiluleInner>
      </button>
      <Link href="/formations" className="mt-5 inline-flex items-center gap-2 text-[14px] font-bold text-electric hover:text-navy">
        <span className="underline decoration-2 underline-offset-[6px]">{formations.cta}</span>
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

function FormationList({ focus }: { focus?: string }) {
  const { open } = useSheet();
  const c = formations.columns;
  return (
    <div className="grid gap-3.5">
      {formations.items.map((f) => (
        <article
          key={f.id}
          data-item={f.id}
          className={`rounded-[22px] bg-soft p-6 transition-shadow ${focus === f.id ? "ring-2 ring-electric" : ""}`}
        >
          <h3 className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[19px] font-extrabold leading-tight tracking-[-0.02em] text-ink">
            {f.name}
            {f.tag && <span className="rounded-full bg-white px-3 py-1 text-[12px] font-bold tracking-normal text-electric">{f.tag}</span>}
          </h3>
          <dl className="mt-4 grid gap-3 text-[14.5px] sm:grid-cols-[132px_1fr] sm:gap-x-5">
            {!f.tag && (
              <>
                <dt className="font-semibold text-body">{c.format}</dt>
                <dd className="font-medium text-ink">{f.format}</dd>
              </>
            )}
            <dt className="font-semibold text-body">{c.modules}</dt>
            <dd className="font-medium leading-relaxed text-ink">{f.modules}</dd>
            <dt className="font-semibold text-body">{c.price}</dt>
            <dd className="font-extrabold text-electric">{f.price}</dd>
          </dl>
          <button
            type="button"
            onClick={() => open("demande-formation", f.id)}
            className="group mt-5 inline-flex items-center gap-2 text-[14px] font-bold text-electric hover:text-navy"
          >
            <span className="underline decoration-2 underline-offset-[6px]">{demande.enroll}</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </article>
      ))}
    </div>
  );
}
