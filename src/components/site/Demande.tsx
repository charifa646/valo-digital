"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { demande, formationChoices, formations, prestationChoices, type DemandeChoice, type DemandeKind } from "@/lib/content";
import { ArrowLeft, ArrowRight, Cap, Check, ChevronDown, Handoff } from "@/components/ui/Icons";
import { BtnInner, btn } from "@/components/ui/Action";

/**
 * The two forms of « Parlons de votre projet », shown in the details panel (`Sheet.tsx`): first the choice between a
 * service and a training, then the form, short on purpose. One list and one tap tell VALO what the person wants and
 * where they stand, a few words of their own if they like, then how to reach them. The request goes to
 * /api/demande, which passes it on to VALO's Google Sheet once it is connected.
 */

const icons: Record<DemandeKind, ReactNode> = { prestation: <Handoff className="h-6 w-6" />, formation: <Cap className="h-6 w-6" /> };

export function DemandeChoix({ onPick }: { onPick: (kind: DemandeKind) => void }) {
  return (
    <div className="grid gap-3.5">
      {demande.choices.map((c) => (
        <button
          key={c.kind}
          type="button"
          onClick={() => onPick(c.kind)}
          className="group flex items-center gap-4 rounded-2xl border border-hair bg-white p-5 text-left transition duration-300 hover:border-electric/40 hover:shadow-card sm:gap-5 sm:p-6"
        >
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[12px] bg-frost text-electric transition duration-300 group-hover:bg-electric group-hover:text-white sm:h-14 sm:w-14">
            {icons[c.kind]}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[18px] font-semibold leading-snug tracking-[-0.015em] text-ink sm:text-[19px]">{c.title}</span>
            <span className="mt-1 block text-[14.5px] font-medium leading-snug text-body">{c.text}</span>
          </span>
          <span className="hidden h-10 w-10 shrink-0 place-items-center rounded-full bg-electric text-white transition-transform duration-300 group-hover:translate-x-0.5 sm:grid">
            <ArrowRight className="h-[18px] w-[18px]" />
          </span>
        </button>
      ))}
    </div>
  );
}

type Values = { choice: string; situation: string; project: string; name: string; business: string; phone: string; email: string; site: string };
type Errors = Partial<Record<keyof Values, string>>;

const field =
  "block w-full rounded-[10px] border border-hair bg-white px-4 py-3 text-[15.5px] font-medium text-ink transition placeholder:font-normal placeholder:text-mute/90 focus:border-electric focus:outline-none focus:ring-4 focus:ring-electric/10 aria-[invalid=true]:border-[#C62828]";

function Label({ htmlFor, children, optional = false }: { htmlFor?: string; children: ReactNode; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-[14px] font-semibold text-ink">
      {children}
      {optional && <span className="ml-1.5 font-medium text-mute">({demande.optional})</span>}
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

export function DemandeForm({ kind, preset, onBack, onClose }: { kind: DemandeKind; preset?: string; onBack?: () => void; onClose: () => void }) {
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
    if (!v.name.trim()) e.name = demande.errors.required;
    if (kind === "prestation" && !v.business.trim()) e.business = demande.errors.required;
    if (phoneDigits(v.phone) < 8) e.phone = demande.errors.phone;
    if (v.email.trim() && !emailOk(v.email.trim())) e.email = demande.errors.email;
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
    return (
      <div role="status" className="rounded-2xl bg-white px-6 py-10 text-center shadow-card sm:px-10">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-electric text-white shadow-glow">
          <Check className="h-6 w-6" />
        </span>
        <p className="balance mt-6 text-[21px] font-semibold leading-snug tracking-[-0.02em] text-ink sm:text-[23px]">{demande.sent.title}</p>
        <p className="pretty mx-auto mt-3 max-w-[26rem] text-[16px] font-medium leading-relaxed text-body">{demande.sent.text}</p>
        <button
          type="button"
          onClick={onClose}
          className="mt-8 inline-flex min-h-[48px] items-center rounded-full border border-electric/15 bg-frost px-7 text-[14.5px] font-bold text-electric transition hover:bg-[#DCE4FF]"
        >
          {demande.sent.close}
        </button>
      </div>
    );
  }

  const picked = choices.find((c) => c.id === v.choice);

  return (
    <form noValidate onSubmit={submit} className="grid gap-6">
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
            className={`${field} pr-12 leading-snug peer-hover:border-electric/40 peer-focus-visible:border-electric peer-focus-visible:ring-4 peer-focus-visible:ring-electric/10 ${
              errors.choice ? "border-[#C62828]" : ""
            } ${picked ? "" : "font-normal text-mute/90"}`}
          >
            {picked?.label ?? demande.pick}
          </div>
          <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-electric" />
        </div>
        {picked?.price && (
          <p className="mt-2 text-[13.5px] font-semibold text-body">
            {formations.columns.price} : <span className="font-bold text-electric">{picked.price}</span>
          </p>
        )}
        <Problem id={id("choice-error")} text={errors.choice} />
      </div>

      <fieldset aria-describedby={errors.situation ? id("situation-error") : undefined}>
        <legend className="mb-2 text-[14px] font-semibold text-ink">{t.situation}</legend>
        <div className={kind === "formation" ? "flex flex-wrap gap-2.5" : "grid gap-2.5"}>
          {t.situations.map((s, i) => (
            <label
              key={s}
              className="group flex cursor-pointer items-center gap-3 rounded-[10px] border border-hair bg-white px-4 py-3 text-[14.5px] font-semibold leading-snug text-ink transition has-[:checked]:border-electric has-[:checked]:bg-frost has-[:checked]:text-electric has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-electric/15"
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
              <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 border-hair bg-white transition group-has-[:checked]:border-electric">
                <span className="h-2.5 w-2.5 scale-0 rounded-full bg-electric transition group-has-[:checked]:scale-100" />
              </span>
              {s}
            </label>
          ))}
        </div>
        <Problem id={id("situation-error")} text={errors.situation} />
      </fieldset>

      <div>
        <Label htmlFor={id("project")} optional>
          {t.project}
        </Label>
        <textarea
          id={id("project")}
          rows={3}
          value={v.project}
          onChange={(e) => set("project")(e.target.value)}
          placeholder={t.projectHint}
          className={`${field} resize-y`}
        />
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
          <Label htmlFor={id("email")} optional>
            {demande.email}
          </Label>
          <input
            id={id("email")}
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
          <p role="alert" className="rounded-[10px] bg-[#FDECEC] px-4 py-3 text-[14px] font-semibold text-[#C62828]">
            {demande.errors.send}
          </p>
        )}
        <button type="submit" disabled={status === "sending"} className={btn("electric", "w-full disabled:opacity-70 sm:w-auto sm:justify-self-start")}>
          <BtnInner>{status === "sending" ? demande.sending : t.submit}</BtnInner>
        </button>
        <p className="text-[13px] font-medium text-mute">{demande.privacy}</p>
      </div>
    </form>
  );
}
