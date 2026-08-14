import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.7,
      lerp: 0.12,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 1,

      prevent: (node) => {
        if (!(node instanceof HTMLElement)) {
          return false;
        }

        return Boolean(
          node.closest(".swiper") ||
          node.closest("input") ||
          node.closest("textarea") ||
          node.closest("select") ||
          node.closest("[data-lenis-prevent]")
        );
      },
    });

    let rafId;

    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}