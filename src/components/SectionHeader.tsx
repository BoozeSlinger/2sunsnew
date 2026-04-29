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
    <div ref={containerRef} className={`flex flex-col mb-16 ${alignmentClasses[align]}`}>
      {subtitle && (
        <span className={`text-sm font-black uppercase tracking-[0.3em] mb-4 ${dark ? "text-[#F59E0B]" : "text-[#F59E0B]"}`}>
          {subtitle}
        </span>
      )}
      <h2 
        ref={titleRef} 
        className={`text-4xl md:text-6xl font-black tracking-tighter ${dark ? "bg-clip-text text-transparent bg-gradient-to-r from-[#F59E0B] to-[#FCD34D]" : "text-[#0A1628]"}`}
      >
        {title}
      </h2>
      <div className={`w-24 h-1.5 mt-6 rounded-full ${dark ? "bg-gradient-to-r from-[#F59E0B]/50 to-transparent" : "bg-[#F59E0B]"}`} />
    </div>
  );
}
