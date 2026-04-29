"use client";

import { useEffect, useRef, RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface RevealOptions {
  y?: number;
  x?: number;
  duration?: number;
  delay?: number;
  ease?: string;
  stagger?: number;
  start?: string;
  once?: boolean;
}

/**
 * Hook: attach a GSAP scroll-reveal to a container ref.
 * Children with class `.reveal-child` animate in staggered.
 */
export function useScrollReveal<T extends HTMLElement>(
  options: RevealOptions = {}
): RefObject<T> {
  const ref = useRef<T>(null!);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const {
      y = 50,
      x = 0,
      duration = 0.9,
      delay = 0,
      ease = "power3.out",
      stagger = 0.12,
      start = "top 85%",
      once = true,
    } = options;

    const children = el.querySelectorAll(".reveal-child");
    const targets = children.length > 0 ? Array.from(children) : [el];

    const ctx = gsap.context(() => {
      gsap.from(targets, {
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: once ? "play none none none" : "play none none reverse",
        },
        y,
        x,
        opacity: 0,
        duration,
        delay,
        stagger,
        ease,
        clearProps: "all",
      });
    });

    return () => ctx.revert();
  }, []);

  return ref;
}

/**
 * Hook: scrub-parallax on a single element.
 * Pass speed between 0 (fixed) and 1 (normal scroll). Default 0.4 = slow.
 */
export function useParallax<T extends HTMLElement>(
  speed: number = 0.4
): RefObject<T> {
  const ref = useRef<T>(null!);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced-motion preference
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const yAmount = (1 - speed) * 100;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        y: `-${yAmount}px`,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, [speed]);

  return ref;
}
