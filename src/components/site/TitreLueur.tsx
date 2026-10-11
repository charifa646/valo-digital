import type { CSSProperties } from "react";
import { hero } from "@/lib/content";

/**
 * The homepage's main title, in the style of Charifa's reference of 11 October 2026 (a giant title in thick capitals
 * fading into the colour of a glow under its letters, the last words in a tilted pill that shines): each word of the
 * first line is deep navy at the top of its letters and electric blue at their foot, « levier de croissance. » stands
 * in an electric blue pill that gives off a blue light. The hero around it stays the light orbit the client chose on
 * 7 October 2026. Her words, unchanged, only drawn in capitals; Montserrat, the client's face, in bold. First drawn in
 * Black and up to 69 px: « trop grasse et trop gros pour un site web » (Charifa, 11 October 2026), so Bold, and at most
 * 48 px (30 px on a phone).
 *
 * Light on phones: gradients and one soft glow that breathes (opacity only, and only while the hero is on screen).
 * From 1024 px the four windows stand on the orbit on either side of it: the size follows the width, so the title
 * stays between them at 1024, 1280 and 1440 px.
 */
export function TitreLueur() {
  const [first, second] = hero.title;
  return (
    <h1 className="mx-auto mt-7 font-bold uppercase leading-[1] tracking-[-0.03em] text-ink text-[clamp(1.7rem,0.3rem+6.4vw,2.6rem)] lg:text-[clamp(2.1rem,3.4vw,3rem)]">
      <span className="balance mx-auto block max-w-[10.8em]">
        {first.split(" ").map((w, i) => (
          <span key={i}>
            {/* the gradient is on each word: a gradient clipped to text does not reach through an animated child */}
            <span className="titre-mots blur-in inline-block" style={{ ["--d" as string]: `${0.15 + i * 0.07}s` } as CSSProperties}>
              {w}
            </span>{" "}
            {/* on a phone the line breaks after « du » and « un »: FAITES DU / DIGITAL UN / VÉRITABLE, three even lines */}
            {(i === 1 || i === 3) && <br className="sm:hidden" />}
          </span>
        ))}
      </span>
      <span className="relative mt-[0.2em] inline-block">
        <span data-anim aria-hidden className="titre-halo absolute -inset-x-[14%] -inset-y-[70%] -z-10" />
        <span className="titre-pastille bounce-in relative inline-block" style={{ ["--d" as string]: "0.55s" } as CSSProperties}>
          {second}
        </span>
      </span>
    </h1>
  );
}
