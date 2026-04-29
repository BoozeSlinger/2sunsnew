"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Zap, Leaf, ShieldCheck, FileText } from "lucide-react";
import SectionHeader from "./SectionHeader";

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  {
    title: "Fast Response Times",
    body: "We understand your time is valuable. Expect a quote and schedule date within 24 hours.",
    icon: Zap,
    accent: "from-[#5AC83A] to-[#56AAE2]",
    glow: "group-hover:shadow-[#5AC83A]/20",
    iconColor: "text-[#5AC83A]",
    bgAccent: "bg-[#5AC83A]/10",
  },
  {
    title: "Eco-Friendly Products",
    body: "We use biodegradable, pet-safe, and plant-safe detergents for all our soft washing.",
    icon: Leaf,
    accent: "from-[#5AC83A] to-[#56AAE2]",
    glow: "group-hover:shadow-[#5AC83A]/20",
    iconColor: "text-[#5AC83A]",
    bgAccent: "bg-[#5AC83A]/10",
  },
  {
    title: "Satisfaction Guaranteed",
    body: "If you aren't 100% happy with the result, we'll make it right. No questions asked.",
    icon: ShieldCheck,
    accent: "from-[#5AC83A] to-[#56AAE2]",
    glow: "group-hover:shadow-[#5AC83A]/20",
    iconColor: "text-[#5AC83A]",
    bgAccent: "bg-[#5AC83A]/10",
  },
  {
    title: "Free Detailed Estimates",
    body: "No hidden fees. Every quote includes a complete breakdown of services and costs.",
    icon: FileText,
    accent: "from-[#5AC83A] to-[#56AAE2]",
    glow: "group-hover:shadow-[#5AC83A]/20",
    iconColor: "text-[#5AC83A]",
    bgAccent: "bg-[#5AC83A]/10",
  },
];

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.batch(".highlight-card", {
        onEnter: (elements) => {
          gsap.from(elements, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "back.out(1.7)",
          });
        },
        start: "top 85%",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="why-us" className="py-28 bg-[#0A1628] text-white relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] bg-[#5AC83A]/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#5AC83A]/20 to-transparent" />
      
      <div className="container relative z-10">
        <SectionHeader 
          title="Why Choose Two Suns?" 
          subtitle="The Difference" 
          dark
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {highlights.map((item, i) => (
            <div
              key={item.title}
              className={`highlight-card group relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-10 lg:p-12 transition-all duration-500 hover:-translate-y-3 hover:bg-white/[0.06] hover:border-[#5AC83A]/25 hover:shadow-[0_30px_80px_-15px_rgba(0,0,0,0.6)] ${item.glow} overflow-hidden`}
            >
              {/* Top accent line */}
              <div className={`absolute top-0 left-10 right-10 h-0.5 bg-gradient-to-r ${item.accent} opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-b-full`} />

              {/* Number badge */}
              <div className="absolute top-8 right-8 text-[4rem] font-black text-white/[0.04] group-hover:text-white/[0.07] leading-none transition-colors duration-500 select-none">
                {String(i + 1).padStart(2, "0")}
              </div>
              
              {/* Icon Container */}
              <div className="w-24 h-24 rounded-2xl flex items-center justify-center mb-10 relative group-hover:scale-110 transition-transform duration-500">
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.accent} opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />
                <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-[#5AC83A]/40 transition-colors duration-500" />
                <item.icon className={`w-12 h-12 ${item.iconColor} relative z-10 drop-shadow-[0_0_20px_rgba(90,200,58,0.5)]`} />
              </div>
              
              <h4 className="text-2xl lg:text-3xl font-black mb-5 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#5AC83A] group-hover:to-[#56AAE2] transition-all duration-500">
                {item.title}
              </h4>
              
              <p className="text-white/55 leading-relaxed font-medium text-lg group-hover:text-white/80 transition-colors duration-500">
                {item.body}
              </p>

              {/* Bottom corner glow */}
              <div className={`absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tl ${item.accent} opacity-0 group-hover:opacity-5 blur-3xl rounded-full transition-opacity duration-700`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
