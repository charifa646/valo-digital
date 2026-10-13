/**
 * A word of the section, very large and very pale, fading into the paper behind
 * it (`.filigrane` in globals.css). Decorative: screen readers skip it. The
 * section places it with `className`.
 */
/** `doux`: paler still (13 October 2026: fewer and softer words behind the page). */
export function Filigrane({ word, className = "", doux = false }: { word: string; className?: string; doux?: boolean }) {
  return (
    <div aria-hidden className={`filigrane ${doux ? "filigrane-doux" : ""}`}>
      <span className={className}>{word}</span>
    </div>
  );
}
