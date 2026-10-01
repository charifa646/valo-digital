import { Fragment, type CSSProperties } from "react";

/**
 * A title cut into words for the « words » reveal (data-reveal="words" on the
 * heading): each word in its own span, numbered so the words come out of the
 * blur one after the other. The spaces stay real spaces, so the title wraps
 * and reads exactly as before. `from` carries the count over from a previous
 * line; `className` colours these words.
 */
export function Words({ children, from = 0, className = "" }: { children: string; from?: number; className?: string }) {
  const words = children.split(" ");
  return (
    <>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className={`w inline-block ${className}`} style={{ ["--i" as string]: from + i } as CSSProperties}>
            {w}
          </span>
          {i < words.length - 1 && " "}
        </Fragment>
      ))}
    </>
  );
}

/** How many words a line has, to number the next line's words after it. */
export const count = (s: string) => s.split(" ").length;
