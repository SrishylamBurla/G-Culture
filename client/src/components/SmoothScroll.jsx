import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.7,
      lerp: 0.12,

      smoothWheel: true,

      // Don't let Lenis interfere with Swiper touch gestures
      syncTouch: false,

      wheelMultiplier: 1,
      touchMultiplier: 1,

      prevent: (node) => {
        return (
          node instanceof HTMLElement &&
          node.closest(".swiper")
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