"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Phone, ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const HERO_LINES = ["Cleaning", "with the power", "of Two Suns"];

export default function Hero() {
  const [showContent, setShowContent] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const linesRef = useRef<HTMLSpanElement[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Detect mobile on mount
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
  }, []);

  // On mobile: skip the long animation wait — show content at 1s
  // On desktop: wait 6s for the hero WebP to play once
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    const delay = reducedMotion ? 0 : mobile ? 800 : 6000;
    const timer = setTimeout(() => setShowContent(true), delay);
    return () => clearTimeout(timer);
  }, []);

  // GSAP text flip-in
  useEffect(() => {
    if (!showContent || linesRef.current.length === 0) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      gsap.set(linesRef.current, { rotateX: 0 });
      return;
    }
    gsap.to(linesRef.current, {
      rotateX: 0,
      duration: 1.2,
      ease: "power2.out",
      stagger: 0.15,
    });
  }, [showContent]);

  // Scroll-exit parallax on hero content
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;
    const ctx = gsap.context(() => {
      gsap.to(contentRef.current, {
        y: "-8%",
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "30% top",
          end: "bottom top",
          scrub: true,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] min-h-[620px] w-full overflow-hidden flex items-center justify-center bg-[#0A1628]"
    >
      {/* ── Animated WebP background ── */}
      <div className="absolute inset-0 z-0">
        <img
          src="/newhero.webp"
          alt="Two Suns Hero"
          className="absolute inset-0 w-full h-full object-cover object-center"
          // On mobile: anchor to top-center so the sky/action is visible
          style={{ objectPosition: "center center" }}
        />

        {/* Mobile: heavier overlay so text always pops */}
        <div className="absolute inset-0 bg-gradient-to-b
          from-[#0A1628]/60 via-[#0A1628]/30 to-[#0A1628]/85
          md:from-[#0A1628]/20 md:via-transparent md:to-[#0A1628]/80
        " />

        {/* Extra dark vignette around center on mobile */}
        <div className="absolute inset-0 md:hidden bg-[radial-gradient(ellipse_at_center,transparent_30%,#0A1628/70_100%)]" />
      </div>

      {/* ── Content overlay ── */}
      <div ref={contentRef} className="container relative z-10 px-5 sm:px-6">
        <AnimatePresence>
          {showContent && (
            <div className="max-w-4xl mx-auto flex flex-col items-center text-center">

              {/* Badge pill */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#5AC83A]/15 border border-[#5AC83A]/30 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(90,200,58,0.15)]"
              >
                <CheckCircle2 size={15} className="text-[#5AC83A] shrink-0" />
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#5AC83A]">
                  Your Local Pressure Washing Professionals
                </span>
              </motion.div>

              {/* H1 — mobile: text-4xl, sm: text-6xl, lg: text-8xl */}
              <h1
                className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[1.05] mb-6 uppercase"
                style={{
                  perspective: "2000px",
                  // Text shadow to pop against any background
                  textShadow: "0 4px 30px rgba(0,0,0,0.7), 0 2px 8px rgba(0,0,0,0.9)",
                }}
              >
                {HERO_LINES.map((line, i) => (
                  <span
                    key={i}
                    ref={(el) => {
                      if (el) linesRef.current[i] = el;
                    }}
                    className={`block ${
                      i === 2
                        ? "bg-clip-text text-transparent bg-gradient-to-r from-[#5AC83A] to-[#56AAE2]"
                        : ""
                    }`}
                    style={{
                      transformOrigin: "50% 0",
                      backfaceVisibility: "hidden",
                      transformStyle: "preserve-3d",
                      transform: "rotateX(-120deg)",
                      // Gradient lines don't get text-shadow (WebKit clip cuts it off)
                      textShadow: i === 2 ? "none" : "0 4px 30px rgba(0,0,0,0.8), 0 2px 8px rgba(0,0,0,0.9)",
                    }}
                  >
                    {line}
                  </span>
                ))}
              </h1>

              {/* Subtitle — glassmorphic pill for readability */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.7 }}
                className="mb-10 md:mb-12"
              >
                <p className="
                  relative inline-block
                  text-sm sm:text-lg md:text-xl
                  text-white
                  font-semibold
                  max-w-xs sm:max-w-xl md:max-w-2xl
                  leading-relaxed
                  px-5 py-3 sm:px-8 sm:py-4
                  rounded-2xl
                  bg-[#0A1628]/50 backdrop-blur-md
                  border border-white/10
                  shadow-[0_4px_30px_rgba(0,0,0,0.4)]
                ">
                  Premium exterior cleaning and restoration. We bring the heat to
                  tough stains and the shine to your property.
                </p>
              </motion.div>

              {/* CTAs — stacked on mobile, side-by-side on sm+ */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto"
              >
                <Link
                  href="#contact"
                  className="group relative w-full sm:w-auto px-7 py-4 bg-[#5AC83A] text-white rounded-full font-black uppercase tracking-widest text-xs overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#5AC83A]/30 text-center"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Get Your Free Quote{" "}
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#56AAE2] to-[#5AC83A] opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>

                <a
                  href="tel:+19513130942"
                  className="w-full sm:w-auto px-7 py-4 bg-white/10 hover:bg-white/15 text-white rounded-full font-bold border border-white/20 backdrop-blur-md transition-all group text-center"
                >
                  <span className="flex items-center justify-center gap-2">
                    <Phone size={18} className="text-[#5AC83A] group-hover:scale-110 transition-transform shrink-0" />
                    (951) 313-0942
                  </span>
                </a>
              </motion.div>

            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Scroll indicator — hidden on very small screens */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden sm:flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">
          Scroll
        </span>
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-1.5 h-1.5 bg-[#5AC83A] rounded-full"
          />
        </div>
      </motion.div>

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A1628] to-transparent z-[1]" />
    </section>
  );
}
