import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    /*
     * Don't run Lenis on mobile.
     * Native touch scrolling is smoother and more reliable
     * with Swiper.
     */
    if (window.innerWidth <= 767) {
      return;
    }

    const lenis = new Lenis({
      duration: 0.8,
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 1,
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