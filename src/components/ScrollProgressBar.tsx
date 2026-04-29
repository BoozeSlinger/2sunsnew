"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    gsap.to(bar, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === document.documentElement) t.kill();
      });
    };
  }, []);

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 right-0 z-[9999] h-[3px] origin-left scale-x-0"
      style={{
        background: "linear-gradient(90deg, #5AC83A 0%, #56AAE2 50%, #5AC83A 100%)",
        boxShadow: "0 0 10px rgba(90, 200, 58, 0.8)",
      }}
      aria-hidden="true"
    />
  );
}
