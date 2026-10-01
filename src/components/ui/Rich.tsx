import { Fragment, type CSSProperties } from "react";

type Part = { text: string; strong?: boolean; mark?: boolean };

/** « **gras** » and « ==surligné== », as the portfolio sets them. */
function parts(s: string): Part[] {
  const out: Part[] = [];
  const re = /\*\*(.+?)\*\*|==(.+?)==/g;
  let last = 0;
  for (let m = re.exec(s); m; m = re.exec(s)) {
    if (m.index > last) out.push({ text: s.slice(last, m.index) });
    out.push(m[1] !== undefined ? { text: m[1], strong: true } : { text: m[2], mark: true });
    last = m.index + m[0].length;
  }
  if (last < s.length) out.push({ text: s.slice(last) });
  return out;
}

/**
 * A paragraph from the portfolio with its emphasis: the bold words in a
 * stronger ink, the highlighted ones in the given colour. With `words`, every
 * word is cut for the « words » reveal (the parent carries data-reveal="words").
 */
export function Rich({
  text,
  strong = "font-semibold text-ink",
  mark = "text-sun",
  words = false,
}: {
  text: string;
  strong?: string;
  mark?: string;
  words?: boolean;
}) {
  let i = 0;
  return (
    <>
      {parts(text).map((p, k) => {
        const cls = p.strong ? strong : p.mark ? mark : "";
        if (!words) {
          return cls ? (
            <span key={k} className={cls}>
              {p.text}
            </span>
          ) : (
            <Fragment key={k}>{p.text}</Fragment>
          );
        }
        // cut at plain spaces only (a non-breaking space keeps « 2010, » or « suis-je ? » whole), number every word across the paragraph
        return (
          <Fragment key={k}>
            {p.text.split(/( +)/).map((w, j) =>
              /^ +$/.test(w) || !w ? (
                <Fragment key={j}>{w}</Fragment>
              ) : (
                <span key={j} className={`w inline-block ${cls}`} style={{ ["--i" as string]: i++ } as CSSProperties}>
                  {w}
                </span>
              ),
            )}
          </Fragment>
        );
      })}
    </>
  );
}
