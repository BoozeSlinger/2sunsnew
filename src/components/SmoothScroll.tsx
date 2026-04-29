"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function LenisScrollSync() {
  const rafRef = useRef<number | null>(null);

  // Keep GSAP ScrollTrigger in sync with Lenis scroll events
  useLenis(ScrollTrigger.update);

  useEffect(() => {
    // Disable GSAP's built-in requestAnimationFrame so Lenis drives it
    gsap.ticker.lagSmoothing(0);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return null;
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.4,
        smoothWheel: true,
        // syncTouch enables momentum on iOS Safari
        syncTouch: true,
        touchMultiplier: 1.5,
        // Infinite momentum easing
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      }}
    >
      <LenisScrollSync />
      {children}
    </ReactLenis>
  );
}
