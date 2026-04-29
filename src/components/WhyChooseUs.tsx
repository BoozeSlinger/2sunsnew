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
    <section ref={sectionRef} id="why-us" className="py-24 bg-[#0A1628] text-white relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[#5AC83A]/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="container relative z-10">
        <SectionHeader 
          title="Why Choose Two Suns?" 
          subtitle="The Difference" 
          dark
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {highlights.map((item) => (
            <div
              key={item.title}
              className={`highlight-card group relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 lg:p-10 transition-all duration-500 hover:-translate-y-3 hover:bg-white/[0.06] hover:border-white/20 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] ${item.glow}`}
            >
              {/* Left Accent Bar */}
              <div className={`absolute left-0 top-12 bottom-12 w-1.5 rounded-r-full bg-gradient-to-b ${item.accent} opacity-20 group-hover:opacity-100 transition-all duration-500`} />
              
              {/* Icon Container with Circular Gradient Background */}
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-10 relative group-hover:scale-110 transition-transform duration-500`}>
                <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${item.accent} opacity-10 group-hover:opacity-20 blur-md transition-opacity duration-500`} />
                <div className={`absolute inset-0 rounded-full border border-white/5 group-hover:border-[#5AC83A]/30 transition-colors duration-500`} />
                <item.icon className={`w-10 h-10 ${item.iconColor} relative z-10 drop-shadow-[0_0_15px_rgba(90,200,58,0.5)]`} />
              </div>
              
              <h4 className="text-2xl font-black mb-4 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-all duration-500">
                {item.title}
              </h4>
              
              <p className="text-white/50 leading-relaxed font-medium text-base group-hover:text-white/80 transition-colors duration-500">
                {item.body}
              </p>
              
              {/* Corner Glow Effect */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${item.accent} opacity-0 group-hover:opacity-5 blur-3xl rounded-full transition-opacity duration-700`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
