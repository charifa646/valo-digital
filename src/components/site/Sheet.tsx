"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";
import {
  demande,
  detailLabels,
  details,
  formations,
  hero,
  prestations,
  solutions,
  type DemandeKind,
  type Detail,
  type DetailId,
  type SheetId,
} from "@/lib/content";
import { useScroll } from "./Scroll";
import { ArrowRight, Check, Close } from "@/components/ui/Icons";
import { BtnInner, btn } from "@/components/ui/Action";
import { DemandeChoix, DemandeForm } from "./Demande";

/** `focus`: the training to show, or the offer already chosen in a form; `back`: the form was reached from the choice. */
type State = { id: SheetId; focus?: string; back?: boolean } | null;
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

/** The details panel: from the right on computers, from the bottom on phones. */
export function SheetProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(null);
  const opener = useRef<HTMLElement | null>(null);
  const { lock } = useScroll();

  const open = useCallback<Open>((id, focus, back) => {
    // moving between the screens of the forms keeps the element that opened the panel, to give it the focus back
    if (!document.querySelector("[data-sheet]")) opener.current = document.activeElement as HTMLElement | null;
    setState({ id, focus, back });
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
          {state && <Panel key={isDemande(state.id) ? "demande" : state.id} state={state} onClose={close} />}
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
    if (isDemande(state.id) && box.current) box.current.scrollTop = 0;
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

  const hidden = reduce ? { opacity: 0 } : wide ? { x: "104%" } : { y: "104%" };
  const shown = reduce ? { opacity: 1 } : { x: 0, y: 0 };

  const id = state.id;
  const kind: DemandeKind | null = id === "demande-prestation" ? "prestation" : id === "demande-formation" ? "formation" : null;
  const eyebrow = isDemande(id) ? demande.label : id === "formations" ? formations.label : fromPrestations(id) ? prestations.label : solutions.label;
  const title = isDemande(id) ? (kind ? demande[kind].title : demande.title) : id === "formations" ? formations.title.join(" ") : details[id as DetailId].title;
  const cta = fromPrestations(id) ? hero.cta : solutions.cta;

  let body: ReactNode;
  if (id === "demande") body = <DemandeChoix onPick={(k) => open(`demande-${k}`, undefined, true)} />;
  else if (kind)
    body = (
      <DemandeForm
        key={`${kind}-${state.focus ?? ""}`}
        kind={kind}
        preset={state.focus}
        onBack={state.back ? () => open("demande") : undefined}
        onClose={onClose}
      />
    );
  else if (id === "formations") body = <FormationList focus={state.focus} />;
  else body = <DetailBody id={id as DetailId} d={details[id as DetailId]} cta={cta} />;

  return (
    <div className="fixed inset-0 z-[80]" role="presentation">
      <m.div
        className="absolute inset-0 bg-abyss/60 backdrop-blur-[3px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        onClick={onClose}
      />
      <m.div
        ref={box}
        role="dialog"
        aria-modal="true"
        data-sheet
        aria-labelledby="sheet-title"
        data-lenis-prevent
        className="absolute inset-x-0 bottom-0 max-h-[90svh] overflow-y-auto overscroll-contain rounded-t-2xl bg-ice shadow-[0_-30px_80px_-20px_rgba(2,6,46,.6)] md:inset-y-0 md:left-auto md:right-0 md:max-h-none md:w-[min(620px,94vw)] md:rounded-l-2xl md:rounded-tr-none"
        initial={hidden}
        animate={shown}
        exit={hidden}
        transition={reduce ? { duration: 0.2 } : { type: "spring", stiffness: 240, damping: 32, mass: 0.9 }}
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-6 bg-ice/90 px-6 pb-5 pt-6 backdrop-blur-md sm:px-9 sm:pt-8">
          <div>
            <p className="label text-electric">{eyebrow}</p>
            <h2 id="sheet-title" className="mt-3 text-[26px] font-semibold leading-[1.08] tracking-[-0.025em] text-ink sm:text-[32px]">
              {title}
            </h2>
          </div>
          <button
            ref={closeButton}
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-ink shadow-card transition hover:bg-electric hover:text-white"
          >
            <Close className="h-5 w-5" />
          </button>
        </div>

        <div className="px-6 pb-10 sm:px-9">{body}</div>
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
const plans = ["essentiel", "developpement", "premium"];

function DetailBody({ id, d, cta }: { id: DetailId; d: Detail; cta: string }) {
  const { open } = useSheet();
  if (d.formules) {
    return (
      <div className="grid gap-4">
        {d.formules.map((f, i) => {
          const featured = i === 1;
          return (
            <article key={f.name} className={`rounded-2xl p-6 sm:p-7 ${featured ? "bg-electric text-white shadow-glow" : "bg-white text-ink shadow-card"}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-[21px] font-extrabold tracking-[-0.02em]">{f.name}</h3>
                <p className={`text-[12.5px] font-semibold ${featured ? "text-white/75" : "text-body"}`}>
                  {detailLabels.for} : {f.for}
                </p>
              </div>
              <p className={`mt-3 text-[15.5px] leading-relaxed ${featured ? "text-white/85" : "text-body"}`}>{f.pitch}</p>
              <Points points={f.points} dark={featured} />
              <div className={`mt-6 flex flex-wrap items-center justify-between gap-4 border-t pt-5 ${featured ? "border-white/20" : "border-line"}`}>
                <p className="text-[18px] font-extrabold tracking-[-0.02em]">{f.price}</p>
                <button
                  type="button"
                  onClick={() => open("demande-prestation", plans[i])}
                  className={btn(featured ? "white" : "electric", "min-h-[48px] pl-5 text-[14px] [&_.dot]:h-9 [&_.dot]:w-9")}
                >
                  <BtnInner>{cta}</BtnInner>
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
        <p className="mt-5 inline-flex flex-wrap items-center gap-2 rounded-full bg-white px-4 py-2 text-[13px] font-semibold text-body shadow-card">
          <span className="text-electric">{detailLabels.for}</span>
          {d.for}
        </p>
      )}
      {d.points && (
        <div className="mt-6 rounded-2xl bg-white p-6 shadow-card sm:p-7">
          <Points points={d.points} className="" />
        </div>
      )}
      <div className="mt-6 flex flex-col gap-5 rounded-2xl bg-night p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-7">
        {d.price && <p className="text-[20px] font-extrabold leading-tight tracking-[-0.02em]">{d.price}</p>}
        <button
          type="button"
          onClick={() => open("demande-prestation", id)}
          className={btn("white", "min-h-[50px] pl-6 text-[14px] [&_.dot]:h-9 [&_.dot]:w-9")}
        >
          <BtnInner>{cta}</BtnInner>
        </button>
      </div>
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
          className={`rounded-2xl bg-white p-6 shadow-card transition-shadow ${focus === f.id ? "ring-2 ring-electric" : ""}`}
        >
          <h3 className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[19px] font-extrabold leading-tight tracking-[-0.02em] text-ink">
            {f.name}
            {f.tag && <span className="rounded-full bg-frost px-3 py-1 text-[12px] font-bold tracking-normal text-electric">{f.tag}</span>}
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
            <span className="underline decoration-2 underline-offset-[6px]">{solutions.cta}</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </article>
      ))}
    </div>
  );
}
