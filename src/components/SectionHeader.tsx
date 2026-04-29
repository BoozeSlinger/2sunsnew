"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  dark?: boolean;
  align?: "left" | "center" | "right";
}

export default function SectionHeader({ title, subtitle, dark = false, align = "center" }: SectionHeaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;

    const chars = titleRef.current.innerText.split("");
    titleRef.current.innerHTML = chars
      .map((char) => `<span class="char inline-block">${char === " " ? "&nbsp;" : char}</span>`)
      .join("");

    const charElements = titleRef.current.querySelectorAll(".char");

    gsap.fromTo(
      charElements,
      { 
        opacity: 0, 
        y: 40,
        rotateX: -90,
        filter: "blur(10px)",
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        filter: "blur(0px)",
        stagger: 0.05,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, [title]);

  const alignmentClasses = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  };

  return (
    <div ref={containerRef} className={`flex flex-col mb-12 sm:mb-16 ${alignmentClasses[align]}`}>
      {subtitle && (
        <span className={`text-lg font-black uppercase tracking-[0.35em] mb-5 ${dark ? "text-[#5AC83A]" : "text-[#5AC83A]"}`}>
          {subtitle}
        </span>
      )}
      <h2 
        ref={titleRef} 
        className={`text-6xl md:text-8xl font-black tracking-tighter leading-none ${dark ? "bg-clip-text text-transparent bg-gradient-to-r from-[#5AC83A] to-[#56AAE2]" : "text-[#0A1628]"}`}
      >
        {title}
      </h2>
      <div className={`w-32 h-2.5 mt-7 rounded-full ${dark ? "bg-gradient-to-r from-[#5AC83A]/60 to-transparent" : "bg-[#5AC83A]"}`} />
    </div>
  );
}
