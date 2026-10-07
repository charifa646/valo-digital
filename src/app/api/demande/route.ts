import { NextResponse } from "next/server";
import { demande, formationChoices, prestationChoices, type DemandeKind } from "@/lib/content";

/**
 * Where the two forms send their requests. Each request is checked here, then passed on to VALO's Google Sheet: a
 * Google Apps Script web app whose address and private key live in Vercel's settings (DEMANDES_WEBHOOK_URL,
 * DEMANDES_WEBHOOK_TOKEN), never in this public code. Until it is connected, the previews go through the whole
 * journey without storing anything, and the real site answers with an error rather than lose a request.
 */

const plain = (s: string) => s.replace(/[  ]/g, " ");
const clip = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const refused = () => NextResponse.json({ ok: false }, { status: 422 });

export async function POST(req: Request) {
  let b: Record<string, unknown>;
  try {
    b = await req.json();
  } catch {
    return refused();
  }

  // robots: the field people never see is filled in, or the form was sent in less than a second and a half
  if (clip(b.site, 200) || (typeof b.t === "number" && b.t < 1500)) return NextResponse.json({ ok: true });

  const kind: DemandeKind | null = b.kind === "prestation" || b.kind === "formation" ? b.kind : null;
  if (!kind) return refused();
  const choice = (kind === "prestation" ? prestationChoices : formationChoices).find((c) => c.id === b.choice);
  const situation = demande[kind].situations.find((s) => s === b.situation);
  const name = clip(b.name, 120);
  const business = clip(b.business, 160);
  const phone = clip(b.phone, 32);
  const email = clip(b.email, 160);
  const project = clip(b.project, 1500);
  const page = clip(b.page, 200);
  if (!choice || !situation || !name || (kind === "prestation" && !business)) return refused();
  if (phone.replace(/\D/g, "").length < 8 || (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) return refused();

  const row = {
    type: kind === "prestation" ? "Prestation" : "Formation",
    date: new Date().toISOString(),
    choix: plain(choice.price ? `${choice.label} (${choice.price})` : choice.label),
    situation: plain(situation),
    projet: project,
    nom: name,
    entreprise: business,
    whatsapp: phone,
    email,
    page,
  };

  const url = process.env.DEMANDES_WEBHOOK_URL;
  if (!url) {
    if (process.env.VERCEL_ENV === "production") return NextResponse.json({ ok: false, reason: "not-connected" }, { status: 503 });
    return NextResponse.json({ ok: true, stored: false });
  }
  try {
    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: process.env.DEMANDES_WEBHOOK_TOKEN ?? "", ...row }),
      cache: "no-store",
    });
    if (!r.ok) throw new Error(String(r.status));
    return NextResponse.json({ ok: true, stored: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
