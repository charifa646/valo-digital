"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { contact, demande, formationChoices, formations, prestationChoices, type DemandeChoice, type DemandeKind } from "@/lib/content";
import { ArrowLeft, Check, ChevronDown, WhatsApp } from "@/components/ui/Icons";
import { PiluleInner, pilule } from "@/components/ui/Action";

/**
 * The two forms of « Parlons de votre projet », shown in the details panel (`Sheet.tsx`): first the choice between a
 * service and a training, then the form, short on purpose. One list and one tap tell VALO what the person wants and
 * where they stand, a few words of their own if they like, then how to reach them. The request goes to
 * /api/demande, which passes it on to VALO's Google Sheet once it is connected.
 */

/**
 * The two ways in, after Charifa's ChatGPT mock-up (14 October 2026): two large tiles side by side, the first in night blue,
 * the second white with a fine edge, each with its words, its line and a thin arrow ↗. Used at the foot of every page and
 * as the first screen of « Parlons de votre projet ». `active`: inside a form, the one being filled.
 */
export function Portes({ onPick, active, className = "", compact = false }: { onPick: (kind: DemandeKind) => void; active?: DemandeKind; className?: string; compact?: boolean }) {
  return (
    <div className={`grid gap-3 sm:grid-cols-2 ${className}`}>
      {demande.choices.map((c, i) => {
        const on = active ? active === c.kind : i === 0;
        return (
          <button
            key={c.kind}
            type="button"
            onClick={() => onPick(c.kind)}
            aria-pressed={active ? on : undefined}
            className={`group flex flex-col justify-between rounded-[20px] text-left transition duration-300 active:scale-[.985] ${compact ? "min-h-[64px] p-4" : "min-h-[150px] p-5 sm:p-6"} ${
              on ? "bg-night text-white shadow-[0_18px_40px_-24px_rgba(4,11,82,.9)]" : "bg-white text-ink ring-1 ring-hair hover:ring-electric/50"
            }`}
          >
            <span className="flex items-start justify-between gap-3">
              <span className={`font-semibold leading-snug tracking-[-0.015em] ${compact ? "text-[15px]" : "text-[17px] sm:text-[18px]"}`}>{c.title}</span>
              <svg aria-hidden viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17 17 7M8 7h9v9" />
              </svg>
            </span>
            {!compact && <span className={`mt-5 block text-[14px] font-medium leading-snug ${on ? "text-white/75" : "text-body"}`}>{c.text}</span>}
          </button>
        );
      })}
    </div>
  );
}

export function DemandeChoix({ onPick }: { onPick: (kind: DemandeKind) => void }) {
  return <Portes onPick={onPick} />;
}

type Values = { choice: string; situation: string; project: string; name: string; business: string; phone: string; email: string; site: string };
type Errors = Partial<Record<keyof Values, string>>;

// Fields on the ChatGPT mock-up's underline (14 October 2026), but filled in a light blue with a fine blue line under them
// (Charifa, 14 October 2026: « comme tout est en blanc, on ne sait pas où remplir », « il faut casser la neutralité du
// blanc »): the visitor sees at once where to write. On focus the field turns white, its line deepens and a soft halo shows.
const field =
  "block w-full rounded-t-[10px] rounded-b-none border-0 border-b-2 border-[#B9C7F2] bg-[#EEF3FF] px-3.5 py-3 text-[16px] font-medium text-ink transition placeholder:font-normal placeholder:text-mute/90 hover:bg-[#E8EEFF] focus:border-electric focus:bg-white focus:shadow-[0_8px_24px_-14px_rgba(7,20,216,.55)] focus:outline-none focus:ring-0 aria-[invalid=true]:border-[#C62828]";

function Label({ htmlFor, children }: { htmlFor?: string; children: ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-[14px] font-semibold text-electric">
      {children}
    </label>
  );
}

function Problem({ id, text }: { id: string; text?: string }) {
  if (!text) return null;
  return (
    <p id={id} className="mt-1.5 text-[13px] font-semibold text-[#C62828]">
      {text}
    </p>
  );
}

const phoneDigits = (s: string) => s.replace(/\D/g, "").length;
const emailOk = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

export function DemandeForm({
  kind,
  preset,
  onBack,
  onClose,
  onSwitch,
}: {
  kind: DemandeKind;
  preset?: string;
  onBack?: () => void;
  onClose: () => void;
  /** to the other form (service or training), from the two tiles at the top */
  onSwitch?: (kind: DemandeKind) => void;
}) {
  const t = demande[kind];
  const choices: DemandeChoice[] = kind === "prestation" ? prestationChoices : formationChoices;
  const uid = useId();
  const id = (k: string) => `${uid}-${k}`;
  const shownAt = useRef(0);
  const [v, setV] = useState<Values>({
    choice: choices.some((c) => c.id === preset) ? preset! : "",
    situation: "",
    project: "",
    name: "",
    business: "",
    phone: "+226 ",
    email: "",
    site: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");

  useEffect(() => {
    shownAt.current = Date.now();
  }, []);

  const set = (k: keyof Values) => (value: string) => {
    setV((x) => ({ ...x, [k]: value }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const check = (): Errors => {
    const e: Errors = {};
    if (!v.choice) e.choice = demande.errors.pick;
    if (!v.situation) e.situation = demande.errors.pick;
    if (!v.project.trim()) e.project = demande.errors.required;
    if (!v.name.trim()) e.name = demande.errors.required;
    if (kind === "prestation" && !v.business.trim()) e.business = demande.errors.required;
    if (phoneDigits(v.phone) < 8) e.phone = demande.errors.phone;
    if (!v.email.trim()) e.email = demande.errors.required;
    else if (!emailOk(v.email.trim())) e.email = demande.errors.email;
    return e;
  };

  const submit = async (ev: FormEvent) => {
    ev.preventDefault();
    const e = check();
    setErrors(e);
    const first = Object.keys(e)[0];
    if (first) {
      document.getElementById(id(first))?.focus();
      return;
    }
    setStatus("sending");
    try {
      const r = await fetch("/api/demande", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, ...v, page: location.pathname, t: Date.now() - shownAt.current }),
      });
      if (!r.ok) throw new Error(String(r.status));
      setStatus("sent");
    } catch {
      setStatus("failed");
    }
  };

  if (status === "sent") {
    // the message ready for WhatsApp: a first line, then what the visitor chose and their name, in the form's own words
    const sent = choices.find((c) => c.id === v.choice);
    const message = [demande.sent.whatsappIntro, `${t.title} : ${sent ? sent.label : ""}`, `${demande.name} : ${v.name.trim()}`].join("\n");
    const whatsapp = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;
    return (
      <div role="status" className="rounded-[22px] bg-soft px-6 py-10 text-center sm:px-10">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-electric text-white shadow-glow">
          <Check className="h-6 w-6" />
        </span>
        <p className="balance mt-6 text-[21px] font-semibold leading-snug tracking-[-0.02em] text-ink sm:text-[23px]">{demande.sent.title}</p>
        <p className="pretty mx-auto mt-3 max-w-[26rem] text-[16px] font-medium leading-relaxed text-body">{demande.sent.text}</p>
        <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={pilule("electric", "mx-auto mt-8 max-w-[22rem]")}>
          <PiluleInner icon={<WhatsApp className="h-6 w-6" />}>{demande.sent.whatsapp}</PiluleInner>
        </a>
        <button type="button" onClick={onClose} className="mt-4 inline-flex min-h-[44px] items-center px-4 text-[14.5px] font-bold text-electric transition hover:text-navy">
          {demande.sent.close}
        </button>
      </div>
    );
  }

  const picked = choices.find((c) => c.id === v.choice);

  return (
    <form noValidate onSubmit={submit} className="grid gap-7">
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="-mt-1 inline-flex items-center gap-2 justify-self-start text-[14px] font-bold text-electric hover:text-navy"
        >
          <ArrowLeft className="h-4 w-4" />
          {demande.back}
        </button>
      )}

      {onSwitch && <Portes compact active={kind} onPick={(k) => k !== kind && onSwitch(k)} />}

      <div>
        <Label htmlFor={id("choice")}>{t.choice}</Label>
        {/* the phone's own list opens on a tap; above it, the choice is shown whole, on as many lines as it needs */}
        <div className="relative">
          <select
            id={id("choice")}
            value={v.choice}
            onChange={(e) => set("choice")(e.target.value)}
            aria-invalid={!!errors.choice}
            aria-describedby={errors.choice ? id("choice-error") : undefined}
            className="peer absolute inset-0 z-10 h-full w-full cursor-pointer appearance-none opacity-0"
          >
            <option value="" disabled>
              {demande.pick}
            </option>
            {choices.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
          <div
            aria-hidden
            className={`${field} pr-12 text-[17px] leading-snug peer-hover:bg-[#E8EEFF] peer-focus-visible:border-electric peer-focus-visible:bg-white peer-focus-visible:shadow-[0_8px_24px_-14px_rgba(7,20,216,.55)] ${
              errors.choice ? "border-[#C62828]" : ""
            } ${picked ? "" : "font-normal text-mute/90"}`}
          >
            {picked?.label ?? demande.pick}
          </div>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-electric" />
        </div>
        {picked?.price && (
          <p className="mt-2 text-[13.5px] font-semibold text-body">
            {formations.columns.price} : <span className="font-bold text-electric">{picked.price}</span>
          </p>
        )}
        <Problem id={id("choice-error")} text={errors.choice} />
      </div>

      <fieldset aria-describedby={errors.situation ? id("situation-error") : undefined}>
        <legend className="mb-3 text-[14px] font-semibold text-electric">{t.situation}</legend>
        <div className="flex flex-wrap gap-2.5">
          {t.situations.map((s, i) => (
            <label
              key={s}
              className="group flex cursor-pointer items-center rounded-full border border-[#B9C7F2] bg-[#EEF3FF] px-4 py-2.5 text-[14px] font-semibold leading-snug text-ink transition hover:border-electric/50 hover:bg-[#E3EBFF] has-[:checked]:border-night has-[:checked]:bg-night has-[:checked]:text-white has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-electric/20"
            >
              <input
                id={i === 0 ? id("situation") : undefined}
                type="radio"
                name={id("situation-group")}
                value={s}
                checked={v.situation === s}
                onChange={() => set("situation")(s)}
                className="sr-only"
              />
              {s}
            </label>
          ))}
        </div>
        <Problem id={id("situation-error")} text={errors.situation} />
      </fieldset>

      <div>
        <Label htmlFor={id("project")}>
          {t.project}
        </Label>
        <textarea
          id={id("project")}
          rows={3}
          value={v.project}
          onChange={(e) => set("project")(e.target.value)}
          placeholder={t.projectHint}
          aria-invalid={!!errors.project}
          aria-describedby={errors.project ? id("project-error") : undefined}
          className={`${field} min-h-[96px] resize-y`}
        />
        <Problem id={id("project-error")} text={errors.project} />
      </div>

      <div className={`grid gap-6 ${kind === "prestation" ? "sm:grid-cols-2 sm:gap-4" : ""}`}>
        <div>
          <Label htmlFor={id("name")}>{demande.name}</Label>
          <input
            id={id("name")}
            type="text"
            autoComplete="name"
            value={v.name}
            onChange={(e) => set("name")(e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? id("name-error") : undefined}
            className={field}
          />
          <Problem id={id("name-error")} text={errors.name} />
        </div>
        {kind === "prestation" && (
          <div>
            <Label htmlFor={id("business")}>{demande.business}</Label>
            <input
              id={id("business")}
            placeholder={demande.businessHint}
              type="text"
              autoComplete="organization"
              value={v.business}
              onChange={(e) => set("business")(e.target.value)}
              aria-invalid={!!errors.business}
              aria-describedby={errors.business ? id("business-error") : undefined}
              className={field}
            />
            <Problem id={id("business-error")} text={errors.business} />
          </div>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 sm:gap-4">
        <div>
          <Label htmlFor={id("phone")}>{demande.phone}</Label>
          <input
            id={id("phone")}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={v.phone}
            onChange={(e) => set("phone")(e.target.value)}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? id("phone-error") : undefined}
            className={field}
          />
          <Problem id={id("phone-error")} text={errors.phone} />
        </div>
        <div>
          <Label htmlFor={id("email")}>
            {demande.email}
          </Label>
          <input
            id={id("email")}
            placeholder={demande.emailHint}
            type="email"
            inputMode="email"
            autoComplete="email"
            value={v.email}
            onChange={(e) => set("email")(e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? id("email-error") : undefined}
            className={field}
          />
          <Problem id={id("email-error")} text={errors.email} />
        </div>
      </div>

      {/* left empty by people, filled in by robots */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={id("site")}>Site</label>
        <input id={id("site")} type="text" tabIndex={-1} autoComplete="off" value={v.site} onChange={(e) => set("site")(e.target.value)} />
      </div>

      <div className="grid gap-3">
        {status === "failed" && (
          <p role="alert" className="rounded-[4px] bg-[#FDECEC] px-4 py-3 text-[14px] font-semibold text-[#C62828]">
            {demande.errors.send}{" "}
            <a href={contact.phoneHref} className="whitespace-nowrap underline decoration-2 underline-offset-4">
              {contact.phone}
            </a>
            .
          </p>
        )}
        <button type="submit" disabled={status === "sending"} className={pilule("night")}>
          <PiluleInner>{status === "sending" ? demande.sending : t.submit}</PiluleInner>
        </button>
        <p className="text-[13px] font-medium leading-relaxed text-mute">{demande.privacy}</p>
      </div>
    </form>
  );
}
