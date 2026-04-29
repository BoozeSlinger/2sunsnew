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
  // videoFailed = true when autoplay is blocked; hero falls back to poster
  const [videoFailed, setVideoFailed] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const linesRef = useRef<HTMLSpanElement[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // ─── FIX 4 & 1: Mount-gated GSAP text reveal (not tied to video canplay) ───
  useEffect(() => {
    // FIX 4: respect prefers-reduced-motion
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    // FIX 1: attempt autoplay; fall back to poster on rejection
    const video = videoRef.current;
    if (video) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay blocked (common on some Android browsers without interaction)
          setVideoFailed(true);
        });
      }
    }

    // Show hero content after 6 s (video plays once) + 2 s buffer
    // On reduced-motion we show content immediately with no animation
    const delay = mq.matches ? 0 : 6000;
    const timer = setTimeout(() => setShowContent(true), delay);

    return () => clearTimeout(timer);
  }, []);

  // ─── FIX 4: GSAP text flip-in (runs on mount, not on canplay) ────────────
  useEffect(() => {
    if (!showContent || linesRef.current.length === 0) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      // Skip animation — instantly show all lines
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

  // ─── Scroll-exit parallax (content fades as you scroll away) ─────────────
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
      className="relative h-[100svh] min-h-[600px] w-full overflow-hidden flex items-center justify-center bg-[#0A1628]"
    >
      {/* ── Background: video with poster fallback ── */}
      <div className="absolute inset-0 z-0">
        {/* FIX 2: videoFailed hides the video and uses poster as bg via CSS class */}
        {/*
          object-position:
            mobile  → 85% center  (shifts right so the character on the right
                                   edge of the 16:9 frame stays in view on
                                   narrow portrait screens ~390-430 px)
            md+     → center center (full-width desktop shows the whole frame)
        */}
        <video
          ref={videoRef}
          muted
          playsInline
          autoPlay
          loop
          poster="/hero-poster.jpg"
          preload="auto"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            videoFailed ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          style={{
            objectPosition: "85% center",
          }}
        >
          <source src="/2sunshero.mp4" type="video/mp4" />
        </video>

        {/* FIX 2: static poster fallback when autoplay is blocked */}
        {videoFailed && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/hero-poster.jpg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "85% center" }}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/15 via-transparent to-[#0A1628]/80" />
      </div>

      {/* ── Content overlay ── */}
      <div ref={contentRef} className="container relative z-10 px-4">
        <AnimatePresence>
          {showContent && (
            <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
              {/* Badge pill */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/20 backdrop-blur-md mb-6"
              >
                <CheckCircle2 size={16} className="text-[#F59E0B]" />
                {/* FIX 5: badge text safe on 375 px */}
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#F59E0B] text-center">
                  Your Local Pressure Washing Professionals
                </span>
              </motion.div>

              {/* FIX 5: text-5xl on mobile → md:text-7xl → lg:text-8xl */}
              <h1
                className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[1.1] mb-8 uppercase"
                style={{ perspective: "2000px" }}
              >
                {HERO_LINES.map((line, i) => (
                  <span
                    key={i}
                    ref={(el) => {
                      if (el) linesRef.current[i] = el;
                    }}
                    className={`block ${
                      i === 2
                        ? "bg-clip-text text-transparent bg-gradient-to-r from-[#F59E0B] to-[#FCD34D]"
                        : ""
                    }`}
                    style={{
                      transformOrigin: "50% 0",
                      backfaceVisibility: "hidden",
                      transformStyle: "preserve-3d",
                      transform: "rotateX(-120deg)",
                    }}
                  >
                    {line}
                  </span>
                ))}
              </h1>

              {/* FIX 5: paragraph centered, max-w keeps it from overflowing on 375 px */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="text-base md:text-xl text-white/60 max-w-xs sm:max-w-2xl mx-auto mb-12 font-medium text-center"
              >
                Premium exterior cleaning and restoration. We bring the heat to
                tough stains and the shine to your property.
              </motion.p>

              {/* FIX 3: flex-col on mobile, flex-row on sm+ */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
              >
                <Link
                  href="#contact"
                  className="group relative w-full sm:w-auto px-8 py-4 bg-[#F59E0B] text-[#0A1628] rounded-full font-black uppercase tracking-widest text-xs overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#F59E0B]/25"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Get Your Free Quote{" "}
                    <ArrowRight
                      size={20}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FCD34D] to-[#F59E0B] opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>

                <a
                  href="tel:+19515550123"
                  className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-full font-bold border border-white/10 backdrop-blur-md transition-all group"
                >
                  <span className="flex items-center justify-center gap-2">
                    <Phone
                      size={20}
                      className="text-[#F59E0B] group-hover:scale-110 transition-transform"
                    />{" "}
                    (951) 555-0123
                  </span>
                </a>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">
          Scroll
        </span>
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-1.5 h-1.5 bg-[#F59E0B] rounded-full"
          />
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A1628] to-transparent z-[1]" />
    </section>
  );
}
