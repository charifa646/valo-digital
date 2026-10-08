"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/**
 * A photo that zooms out as it comes up the screen (Charifa, 8 October 2026: « un effet zoom plutôt que l'effet
 * actuel »): its frame opens from a slightly smaller window and the picture settles from a little closer, both following
 * the scroll, done when the photo's middle reaches the middle of the screen. Still for « reduce motion ».
 */
export function PhotoZoom({
  src,
  alt,
  width,
  height,
  sizes,
  className = "",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  className?: string;
}) {
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let shown = false;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      // 0 while its top is still under the screen, 1 once its middle is at the middle of the screen; eased out
      const t = Math.min(1, Math.max(0, (window.innerHeight - r.top) / (window.innerHeight / 2 + r.height / 2)));
      el.style.setProperty("--z", (1 - Math.pow(1 - t, 3)).toFixed(4));
    };
    const soon = () => {
      if (shown && !frame) frame = requestAnimationFrame(update);
    };
    const io = new IntersectionObserver(([e]) => {
      shown = e.isIntersecting;
      if (shown) soon();
    });
    io.observe(el);
    window.addEventListener("scroll", soon, { passive: true });
    window.addEventListener("resize", soon);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", soon);
      window.removeEventListener("resize", soon);
    };
  }, []);

  return (
    <div ref={box} className={`zoom-photo ${className}`}>
      <Image src={src} alt={alt} width={width} height={height} sizes={sizes} className="zoom-photo-img h-full w-full object-cover" />
    </div>
  );
}
