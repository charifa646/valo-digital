/**
 * « À partir de 80 000 F CFA / mois »: the amount carries the weight, the rest
 * stays quiet. Every word of the price is kept, only its weight changes.
 */
export function Price({ price, note, light = false, size = "md" }: { price: string; note?: string; light?: boolean; size?: "md" | "sm" }) {
  const from = "À partir de";
  const starts = price.startsWith(from);
  const rest = starts ? price.slice(from.length).trim() : price;
  // « / mois », « / 4 vidéos », « pour 4 vidéos », « hors budget publicitaire »: the part after the amount
  const cut = rest.search(/\s(\/|pour|hors)\s/u);
  const amount = cut > -1 ? rest.slice(0, cut) : rest;
  const per = cut > -1 ? rest.slice(cut + 1) : "";
  const quiet = light ? "text-white/65" : "text-mute";
  return (
    <p className="leading-tight">
      {starts && <span className={`block font-semibold ${size === "sm" ? "text-[11.5px]" : "text-[12px]"} ${quiet}`}>{from}</span>}{" "}
      <span className={`font-bold tracking-[-0.02em] ${size === "sm" ? "text-[16px]" : "text-[19px]"}`}>{amount}</span>
      {per && <span className={`font-semibold ${size === "sm" ? "text-[12px]" : "text-[13px]"} ${quiet}`}> {per}</span>}
      {note && <span className={`mt-1 block text-[12px] font-medium ${quiet}`}>{note}</span>}
    </p>
  );
}
