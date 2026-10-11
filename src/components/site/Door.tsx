"use client";

import type { CSSProperties, ReactNode } from "react";
import { Anchor } from "./Scroll";

type DoorProps = {
  to: string;
  onOpen?: () => void;
  set?: (el: HTMLElement | null) => void;
  className: string;
  style?: CSSProperties;
  children: ReactNode;
  onMouseEnter?: () => void;
  onFocus?: () => void;
  "data-i"?: number;
  "data-reveal"?: string;
  "data-on"?: string;
};

/** The doors whose offer left the homepage for /services (7 October 2026): they open its details in the panel instead. */
export const panels = new Set<string>(["diagnostic", "accompagnement"]);

/** A door of « De quoi avez-vous besoin »: a link that glides to its section, or a button that opens its offer in the panel. */
export function Door({ to, onOpen, set, children, ...rest }: DoorProps) {
  if (onOpen)
    return (
      <button type="button" ref={set} onClick={onOpen} aria-haspopup="dialog" data-carte {...rest} className={`${rest.className} w-full text-left`}>
        {children}
      </button>
    );
  return (
    <Anchor to={to} ref={set} data-carte {...rest}>
      {children}
    </Anchor>
  );
}
