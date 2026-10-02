/**
 * A word of the section, very large and very pale, fading into the paper behind
 * it (`.filigrane` in globals.css). Decorative: screen readers skip it. The
 * section places it with `className`.
 */
export function Filigrane({ word, className = "" }: { word: string; className?: string }) {
  return (
    <div aria-hidden className="filigrane">
      <span className={className}>{word}</span>
    </div>
  );
}
