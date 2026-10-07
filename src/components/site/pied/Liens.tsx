import Link from "next/link";
import { contact, footer, menus, nav } from "@/lib/content";
import { Monogram } from "@/components/brand/Logo";
import { NavLink, PageLink } from "../Scroll";

// the columns are named after their menu entries, found by id
const columnTitle = (id: string) => nav.find((n) => n.id === id)?.label ?? "";

/** The three ways to reach VALO, written large: they are what a visitor comes down here for. Their line draws under the mouse. */
export function Contacts({ className = "" }: { className?: string }) {
  const items = [
    { href: contact.phoneHref, label: contact.phone, ext: false },
    { href: `mailto:${contact.email}`, label: contact.email, ext: false },
    { href: contact.mapHref, label: contact.address, ext: true },
  ];
  return (
    <ul className={`grid content-start gap-3 sm:gap-4 ${className}`}>
      {items.map((it) => (
        <li key={it.href}>
          <a
            href={it.href}
            {...(it.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="link-draw break-words text-[clamp(1.35rem,0.95rem+1.35vw,2.15rem)] font-medium leading-tight tracking-[-0.03em] text-white"
          >
            {it.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

/** The name, the mark and what VALO does. */
export function Marque({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <p className="flex items-center gap-3">
        <Monogram className="h-8 w-auto" />
        <span className="text-[17px] font-bold tracking-[0.04em]">{footer.name}</span>
      </p>
      <p className="mt-4 max-w-[17rem] text-[15px] font-medium leading-relaxed text-white/75">{footer.tagline}</p>
      <p className="mt-2 text-[13.5px] font-semibold text-white/55">{footer.tags.join(" · ")}</p>
    </div>
  );
}

/**
 * Services and trainings: the first four of each, leading to their place on their page, then the way to all of them.
 * On phones only that way is left: the menu already lists them all.
 */
export function Colonnes({ className = "" }: { className?: string }) {
  return (
    <div className={`grid grid-cols-2 gap-x-8 gap-y-10 ${className}`}>
      {(["prestations", "formations"] as const).map((id) => (
        <nav key={id} aria-label={columnTitle(id)}>
          <p className="text-[14px] font-semibold text-white/55">{columnTitle(id)}</p>
          <ul className="mt-4 grid gap-2.5">
            {menus[id].links.slice(0, 4).map((l) => (
              <li key={l.id} className="hidden sm:block">
                <PageLink page={menus[id].page} to={l.id} className="text-[14.5px] font-medium leading-snug text-white/85 transition hover:text-white">
                  {l.name}
                </PageLink>
              </li>
            ))}
            <li className="sm:pt-1">
              <Link href={menus[id].page} className="text-[14.5px] font-semibold text-sun transition hover:text-white">
                {menus[id].all}
              </Link>
            </li>
          </ul>
        </nav>
      ))}
    </div>
  );
}

/** The last line: the name, then the menu. */
export function Bas({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col gap-4 py-7 sm:flex-row sm:items-center sm:justify-between ${className}`}>
      <p className="text-[13px] font-medium text-white/55">{footer.copyright}</p>
      <nav aria-label="Pied de page">
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[13.5px] font-semibold text-white/75">
          {nav.map((n) => (
            <li key={n.id}>
              <NavLink item={n} className="transition hover:text-white" />
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
