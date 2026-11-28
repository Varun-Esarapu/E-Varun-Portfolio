"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.75,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;
    (window as any).__lenis = lenis;

    const handleLenisStop = () => lenis.stop();
    const handleLenisStart = () => lenis.start();
    const handleLenisToggle = () => {
      if ((lenis as any).isStopped) {
        lenis.start();
      } else {
        lenis.stop();
      }
    };

    window.addEventListener("lenis-stop", handleLenisStop);
    window.addEventListener("lenis-start", handleLenisStart);
    window.addEventListener("lenis-toggle", handleLenisToggle);

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      if (target.closest("[data-lenis-stop]")) {
        lenis.stop();
      } else if (target.closest("[data-lenis-start]")) {
        lenis.start();
      } else if (target.closest("[data-lenis-toggle]")) {
        handleLenisToggle();
      }

      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (anchor) {
        const href = anchor.getAttribute("href");
        if (href && href.length > 1) {
          const section = document.querySelector(href);
          if (section) {
            e.preventDefault();
            lenis.scrollTo(section as HTMLElement, {
              offset: -60,
              duration: 1.15,
            });
            window.history.pushState(null, "", href);
          }
        }
      }
    };

    document.addEventListener("click", handleClick);

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("lenis-stop", handleLenisStop);
      window.removeEventListener("lenis-start", handleLenisStart);
      window.removeEventListener("lenis-toggle", handleLenisToggle);
      document.removeEventListener("click", handleClick);
      lenis.destroy();
      delete (window as any).__lenis;
    };
  }, []);

  return <>{children}</>;
}
