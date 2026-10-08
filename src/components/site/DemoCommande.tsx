"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { demande, demo, hero, prestationChoices } from "@/lib/content";
import { Monogram } from "@/components/brand/Logo";
import { ArrowLeft, ArrowRight, Cap, Cart, Check, ChevronDown, Close, Megaphone, Target } from "@/components/ui/Icons";
import { BtnInner, btn } from "@/components/ui/Action";
import { Words } from "@/components/ui/Words";
import { DemandeButton } from "./Sheet";

/**
 * « Voici comment passer commande. »: a phone that orders by itself, after the offers and the trainings (Charifa,
 * 8 October 2026). Its screen is the site as seen on a phone, drawn again at the phone's own size: a finger taps
 * « Parlons de votre projet », the panel rises, « Commander une prestation », a service from the list, where the person
 * stands, the example sentence of the form typed letter by letter, then the name and number (shown as bars: no invented
 * name, no invented number), « Envoyer ma demande » and the thanks. Beside it, the step being played, in the form's own
 * words. It plays only while it is on screen, from the start each time, and stands still on the filled form with
 * « reduce motion ». Hidden from screen readers and out of reach (the real button is next to it).
 */

const t = demande.prestation;
// the form's own example, without its « Par exemple : »
const sentence = (() => {
  const s = t.projectHint.slice(t.projectHint.indexOf(":") + 1).trim();
  return s.charAt(0).toUpperCase() + s.slice(1);
})();
const captions = [hero.cta, demande.choices[0].title, t.choice, t.situation, t.project, t.submit, demande.sent.title];
const options = prestationChoices.slice(0, 4);
const situation = 1;

/** the screen's size, drawn as on a phone and scaled to fit (`--s` in globals.css) */
const W = 360;
const KEY = 38;

type State = {
  step: number;
  panel: boolean;
  view: "choix" | "form" | "sent";
  list: boolean;
  choice: boolean;
  situation: boolean;
  typing: boolean;
  shift: number;
  bars: boolean;
  sending: boolean;
  pressed: string;
};
const start: State = {
  step: 0,
  panel: false,
  view: "choix",
  list: false,
  choice: false,
  situation: false,
  typing: false,
  shift: 0,
  bars: false,
  sending: false,
  pressed: "",
};
const still: State = { ...start, step: 5, panel: true, view: "form", choice: true, situation: true, typing: true, bars: true };

// when each step begins, in milliseconds (the typing takes as long as the sentence)
const typed = sentence.length * KEY;
const at = [0, 1650, 3750, 7300, 8500, 12500 + typed - 3000, 16400 + typed - 3000];
const loop = at[6] + 3600;

// React 18 writes `inert` only as a string attribute
const inert = { inert: "" } as unknown as { inert: boolean };

const field = "block w-full rounded-[4px] border border-hair bg-white px-4 py-3 text-[15.5px] font-medium text-ink";

function Label({ children, optional = false }: { children: string; optional?: boolean }) {
  return (
    <span className="mb-2 block text-[14px] font-semibold text-ink">
      {children}
      {optional && <span className="ml-1.5 font-medium text-mute">({demande.optional})</span>}
    </span>
  );
}

export function DemoCommande() {
  const [s, setS] = useState<State>(start);
  const screen = useRef<HTMLDivElement>(null);
  const finger = useRef<HTMLDivElement>(null);
  const words = useRef<HTMLSpanElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const [motion, setMotion] = useState(true);

  useEffect(() => {
    const box = screen.current;
    const f = finger.current;
    if (!box || !f) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setMotion(false);
      setS(still);
      return;
    }

    let timers: number[] = [];
    let typing = 0;
    let running = false;
    let seen = false;
    const set = (x: Partial<State>) => setS((v) => ({ ...v, ...x }));
    const later = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));

    // where an element of the screen is, in the screen's own pixels (it is drawn scaled)
    const spot = (key: string) => {
      const el = box.querySelector<HTMLElement>(`[data-demo="${key}"]`);
      if (!el) return null;
      const a = box.getBoundingClientRect();
      const b = el.getBoundingClientRect();
      const k = a.width / W;
      return { x: (b.left - a.left) / k, y: (b.top - a.top) / k, w: b.width / k, h: b.height / k };
    };
    const move = (key: string) => {
      const r = spot(key);
      if (!r) return;
      f.dataset.on = "";
      f.style.transform = `translate3d(${(r.x + Math.min(r.w * 0.58, r.w - 34)).toFixed(1)}px, ${(r.y + r.h / 2 + 4).toFixed(1)}px, 0)`;
    };
    const tap = (key: string) => {
      delete f.dataset.tap;
      void f.offsetWidth;
      f.dataset.tap = "";
      set({ pressed: key });
      later(260, () => set({ pressed: "" }));
    };
    const type = () => {
      let i = 0;
      typing = window.setInterval(() => {
        i += 1;
        // the form is drawn again at each order: its field starts empty
        if (words.current) words.current.textContent = sentence.slice(0, i);
        if (i >= sentence.length) window.clearInterval(typing);
      }, KEY);
    };
    // the form slides up inside the panel until the button is in sight
    const scroll = () => {
      const v = viewport.current;
      const b = spot("submit");
      if (!v || !b) return;
      const a = box.getBoundingClientRect();
      const k = a.width / W;
      const bottom = (v.getBoundingClientRect().bottom - a.top) / k;
      set({ shift: Math.max(0, Math.round(b.y + b.h + 56 - bottom)) });
    };

    const stop = () => {
      timers.forEach(window.clearTimeout);
      timers = [];
      window.clearInterval(typing);
      running = false;
      delete f.dataset.on;
      delete f.dataset.tap;
      f.style.transform = "";
      setS(start);
    };

    const run = () => {
      stop();
      running = true;
      const T = typed - 3000;
      later(500, () => move("cta"));
      later(1400, () => tap("cta"));
      later(at[1], () => set({ panel: true, view: "choix", step: 1 }));
      later(2750, () => move("prestation"));
      later(3500, () => tap("prestation"));
      later(at[2], () => set({ view: "form", step: 2 }));
      later(4600, () => move("choice"));
      later(5300, () => {
        tap("choice");
        set({ list: true });
      });
      later(5950, () => move("option"));
      later(6600, () => tap("option"));
      later(6850, () => set({ list: false, choice: true }));
      later(at[3], () => {
        set({ step: 3 });
        move("situation");
      });
      later(8000, () => {
        tap("situation");
        set({ situation: true });
      });
      later(at[4], () => {
        set({ step: 4 });
        move("project");
      });
      later(9200, () => {
        tap("project");
        set({ typing: true });
        type();
      });
      later(at[5], () => {
        delete f.dataset.on;
        set({ step: 5 });
        scroll();
      });
      later(13400 + T, () => set({ bars: true }));
      later(14700 + T, () => move("submit"));
      later(15400 + T, () => {
        tap("submit");
        set({ sending: true });
      });
      later(at[6], () => {
        set({ view: "sent", step: 6, shift: 0, sending: false });
        delete f.dataset.on;
      });
      later(at[6] + 3000, () => set({ panel: false }));
      later(loop, run);
    };

    const sync = () => {
      const go = seen && document.visibilityState === "visible";
      if (go && !running) run();
      else if (!go && running) stop();
    };
    const io = new IntersectionObserver(
      ([e]) => {
        seen = e.isIntersecting;
        sync();
      },
      { threshold: 0.35 },
    );
    io.observe(box);
    document.addEventListener("visibilitychange", sync);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      timers.forEach(window.clearTimeout);
      window.clearInterval(typing);
    };
  }, []);

  const p = (key: string) => ({ "data-demo": key, "data-pressed": s.pressed === key ? "" : undefined });
  const picked = options[0];

  return (
    <section id="demo" aria-labelledby="demo-title" className="paper relative isolate overflow-hidden bg-ice">
      <div className="gutter mx-auto grid max-w-page items-center gap-9 py-20 lg:grid-cols-12 lg:gap-10 lg:py-24">
        <div className="text-center lg:col-span-5 lg:text-left">
          <h2 id="demo-title" data-reveal="words" className="h2 balance mx-auto max-w-[14ch] text-ink lg:mx-0">
            <Words>{demo.title}</Words>
          </h2>

          {/* the step being played, in the form's own words, and how far the order has gone */}
          <div aria-hidden className="mt-6 lg:mt-12">
            <p className="relative h-[2.5em] overflow-hidden text-[19px] font-semibold leading-[1.25] tracking-[-0.015em] text-electric sm:text-[21px] lg:text-[24px]">
              <span key={s.step} className={`demo-caption balance absolute inset-x-0 top-0 ${motion ? "" : "[animation:none]"}`}>
                {captions[s.step]}
              </span>
            </p>
            <div className="mx-auto mt-4 flex max-w-[280px] gap-1.5 lg:mx-0 lg:max-w-[340px]">
              {captions.slice(0, 6).map((c, i) => (
                <span
                  key={c}
                  className="demo-seg"
                  data-state={i < s.step ? "done" : i === s.step && motion ? "now" : undefined}
                  style={{ ["--t" as string]: `${at[i + 1] - at[i]}ms` } as CSSProperties}
                >
                  <i key={i === s.step ? `now-${s.step}` : "x"} />
                </span>
              ))}
            </div>
          </div>

          <DemandeButton className={btn("electric", "mt-10 hidden lg:inline-flex")}>
            <BtnInner>{hero.cta}</BtnInner>
          </DemandeButton>
        </div>

        <div className="relative flex justify-center lg:col-span-7">
          <div aria-hidden className="demo-glow" />
          <div aria-hidden {...inert} data-carte className="demo-phone" data-reveal="pop">
            <div className="demo-scaler">
              <div className="demo-frame">
                <div ref={screen} className="demo-screen">
                  {/* the site, as on a phone */}
                  <div className="dots absolute inset-0 bg-[#F7F9FF]" />
                  <div className="relative px-3 pt-[46px]">
                    <div className="flex h-[54px] items-center justify-between rounded-2xl bg-white pl-4 pr-1.5 text-electric shadow-[0_10px_30px_-18px_rgba(7,20,216,.35)]">
                      <span className="inline-flex items-center gap-2">
                        <Monogram className="h-[19px] w-auto" />
                        <span className="text-[15px] font-bold tracking-[-0.01em]">ValoDigital</span>
                      </span>
                      <span className="grid h-[42px] w-[42px] place-items-center rounded-full bg-electric">
                        <span className="grid gap-[5px]">
                          <i className="block h-[2px] w-4 rounded bg-white" />
                          <i className="block h-[2px] w-4 rounded bg-white" />
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="relative px-6 pt-8 text-center">
                    <span className="mx-auto grid h-[52px] w-[52px] place-items-center rounded-2xl border border-hair bg-white text-electric">
                      <Monogram className="h-[17px] w-auto" />
                    </span>
                    <p className="mt-6 text-[30px] font-medium leading-[1.06] tracking-[-0.035em] text-ink">
                      {hero.title[0]} <span className="text-electric">{hero.title[1]}</span>
                    </p>
                    <p className="mt-4 text-[14.5px] font-medium leading-relaxed text-body">{hero.lead}</p>
                    <span {...p("cta")} className={btn("electric", "demo-press mt-6 min-h-[52px] text-[14.5px]")}>
                      <BtnInner>{hero.cta}</BtnInner>
                    </span>
                  </div>
                  <div className="relative mt-8 grid grid-cols-2 gap-3 px-4">
                    {[
                      { title: hero.tags[0], icon: <Megaphone className="h-4 w-4" /> },
                      { title: hero.tags[1], icon: <Target className="h-4 w-4" /> },
                      { title: hero.tags[2], icon: <Cart className="h-4 w-4" /> },
                      { title: hero.tags[3], icon: <Cap className="h-4 w-4" /> },
                    ].map((c) => (
                      <span
                        key={c.title}
                        className="flex h-[78px] items-start gap-2.5 rounded-2xl border border-hair bg-white p-3 text-[13px] font-semibold leading-tight text-ink"
                      >
                        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-[4px] bg-electric text-white">{c.icon}</span>
                        <span className="pt-1">{c.title}</span>
                      </span>
                    ))}
                  </div>

                  {/* the panel of « Parlons de votre projet » */}
                  <div className="demo-dim" data-on={s.panel ? "" : undefined} />
                  <div className="demo-sheet" data-on={s.panel ? "" : undefined}>
                    <div className="flex items-start justify-between gap-5 px-6 pb-4 pt-6">
                      <div>
                        <p className="label text-electric">{demande.label}</p>
                        <p className="mt-3 text-[24px] font-semibold leading-[1.08] tracking-[-0.025em] text-ink">
                          {s.view === "choix" ? demande.title : t.title}
                        </p>
                      </div>
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-ink shadow-card">
                        <Close className="h-[18px] w-[18px]" />
                      </span>
                    </div>

                    <div ref={viewport} className="relative min-h-0 flex-1 overflow-hidden">
                      {/* drawn again for each view, so the thanks arrive at the top without sliding back */}
                      <div key={s.view} className="demo-body px-6 pb-10" style={{ transform: `translate3d(0, ${-s.shift}px, 0)` }}>
                        {s.view === "choix" && (
                          <div className="grid gap-3">
                            {demande.choices.map((c, i) => (
                              <span
                                key={c.kind}
                                {...p(i === 0 ? "prestation" : "formation")}
                                className="demo-press flex items-center gap-4 rounded-2xl border border-electric/25 bg-white p-[18px] text-left shadow-[0_14px_30px_-20px_rgba(7,20,216,.45)]"
                              >
                                <span className="min-w-0 flex-1">
                                  <span className="block text-[16.5px] font-semibold leading-snug tracking-[-0.015em] text-ink">{c.title}</span>
                                  <span className="mt-1 block text-[13.5px] font-medium leading-snug text-body">{c.text}</span>
                                </span>
                                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-electric text-white">
                                  <ArrowRight className="h-4 w-4" />
                                </span>
                              </span>
                            ))}
                          </div>
                        )}

                        {s.view === "form" && (
                          <div className="grid gap-5">
                            <span className="-mt-1 inline-flex items-center gap-2 justify-self-start text-[14px] font-bold text-electric">
                              <ArrowLeft className="h-4 w-4" />
                              {demande.back}
                            </span>

                            <div className="relative">
                              <Label>{t.choice}</Label>
                              <span
                                {...p("choice")}
                                className={`${field} demo-press relative pr-11 leading-snug transition ${s.list ? "border-electric ring-4 ring-electric/10" : ""} ${
                                  s.choice ? "" : "font-normal text-mute/90"
                                }`}
                              >
                                {s.choice ? picked.label : demande.pick}
                                <ChevronDown
                                  className={`absolute right-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-electric transition ${s.list ? "rotate-180" : ""}`}
                                />
                              </span>
                              <span className="demo-list" data-on={s.list ? "" : undefined}>
                                {options.map((o, i) => (
                                  <span
                                    key={o.id}
                                    {...(i === 0 ? p("option") : {})}
                                    className={`block px-4 py-2.5 text-[14px] font-medium leading-snug ${
                                      i === 0 && s.pressed === "option" ? "bg-frost text-electric" : "text-ink"
                                    }`}
                                  >
                                    {o.label}
                                  </span>
                                ))}
                              </span>
                            </div>

                            <div>
                              <Label>{t.situation}</Label>
                              <div className="grid gap-2">
                                {t.situations.map((x, i) => {
                                  const on = s.situation && i === situation;
                                  return (
                                    <span
                                      key={x}
                                      {...(i === situation ? p("situation") : {})}
                                      className={`demo-press flex items-center gap-3 rounded-[4px] border px-4 py-[11px] text-[14px] font-semibold leading-snug transition ${
                                        on ? "border-electric bg-frost text-electric" : "border-hair bg-white text-ink"
                                      }`}
                                    >
                                      <span
                                        className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 bg-white transition ${on ? "border-electric" : "border-hair"}`}
                                      >
                                        <span className={`h-2.5 w-2.5 rounded-full bg-electric transition ${on ? "scale-100" : "scale-0"}`} />
                                      </span>
                                      {x}
                                    </span>
                                  );
                                })}
                              </div>
                            </div>

                            <div>
                              <Label optional>{t.project}</Label>
                              <span
                                {...p("project")}
                                className={`${field} demo-press relative min-h-[98px] leading-relaxed ${s.typing ? "border-electric ring-4 ring-electric/10" : ""}`}
                              >
                                {!s.typing && <span className="absolute inset-x-4 top-3 font-normal text-mute/90">{t.projectHint}</span>}
                                <span ref={words}>{motion ? null : sentence}</span>
                                {s.typing && motion && <span className="demo-caret" />}
                              </span>
                            </div>

                            {[
                              { label: demande.name, w: "58%" },
                              { label: demande.business, w: "44%" },
                            ].map((x, i) => (
                              <div key={x.label}>
                                <Label>{x.label}</Label>
                                <span className={`${field} flex h-[50px] items-center`}>
                                  <span
                                    className="demo-bar"
                                    data-on={s.bars ? "" : undefined}
                                    style={{ ["--w" as string]: x.w, ["--d" as string]: `${i * 0.28}s` } as CSSProperties}
                                  />
                                </span>
                              </div>
                            ))}
                            <div>
                              <Label>{demande.phone}</Label>
                              <span className={`${field} flex h-[50px] items-center gap-2`}>
                                +226
                                <span
                                  className="demo-bar"
                                  data-on={s.bars ? "" : undefined}
                                  style={{ ["--w" as string]: "40%", ["--d" as string]: "0.56s" } as CSSProperties}
                                />
                              </span>
                            </div>
                            <div>
                              <Label optional>{demande.email}</Label>
                              <span className={`${field} block h-[50px]`} />
                            </div>

                            <div className="grid gap-3">
                              <span {...p("submit")} className={btn("electric", "demo-press w-full min-h-[52px] text-[14.5px]")}>
                                <BtnInner>{s.sending ? demande.sending : t.submit}</BtnInner>
                              </span>
                              <span className="text-[12.5px] font-medium text-mute">{demande.privacy}</span>
                            </div>
                          </div>
                        )}

                        {s.view === "sent" && (
                          <div className="demo-sent rounded-2xl bg-white px-6 py-9 text-center shadow-card">
                            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-electric text-white shadow-glow">
                              <Check className="h-6 w-6" />
                            </span>
                            <p className="mt-6 text-[20px] font-semibold leading-snug tracking-[-0.02em] text-ink">{demande.sent.title}</p>
                            <p className="mx-auto mt-3 text-[15px] font-medium leading-relaxed text-body">{demande.sent.text}</p>
                            <span className="mt-7 inline-flex min-h-[46px] items-center rounded-full border border-electric/15 bg-frost px-6 text-[14px] font-bold text-electric">
                              {demande.sent.close}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* the finger */}
                  <div ref={finger} className="demo-finger">
                    <span />
                  </div>
                  <span className="demo-island" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center lg:hidden">
          <DemandeButton className={btn("electric")}>
            <BtnInner>{hero.cta}</BtnInner>
          </DemandeButton>
        </div>
      </div>
    </section>
  );
}
