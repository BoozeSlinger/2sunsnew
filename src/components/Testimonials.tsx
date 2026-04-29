"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, Quote } from "lucide-react";
import SectionHeader from "./SectionHeader";

gsap.registerPlugin(ScrollTrigger);

const reviews = [
  {
    name: "Sarah M.",
    city: "Riverside, CA",
    text: "Two Suns did an incredible job on our driveway. It looks brand new! They were professional, on time, and very reasonably priced.",
  },
  {
    name: "Jason R.",
    city: "Corona, CA",
    text: "The soft wash they did on my roof removed all those ugly black streaks. I was worried about my plants, but everything was perfectly safe.",
  },
  {
    name: "Michelle K.",
    city: "Moreno Valley, CA",
    text: "Fast quote, friendly service, and amazing results. My house siding has never looked this clean. Highly recommend these guys!",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered reveal — works perfectly with Lenis (no pin conflict)
      const cards = gsap.utils.toArray<HTMLElement>(".testimonial-card");

      gsap.from(cards, {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        clearProps: "all",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="py-24 bg-[#0A1628] text-white relative overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#F59E0B]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative z-10">
        <SectionHeader
          title="What Our Customers Say"
          subtitle="Success Stories"
          dark
        />

        {/* Star rating summary */}
        <div className="flex justify-center items-center gap-2 -mt-8 mb-16">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={28}
                className="fill-[#F59E0B] text-[#F59E0B] drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]"
              />
            ))}
          </div>
          <span className="text-white/40 text-sm font-medium ml-2">5.0 · 200+ reviews</span>
        </div>

        {/* Mobile: horizontal snap scroll | Desktop: grid with stagger reveal */}
        <div
          ref={cardsRef}
          className="
            flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory no-scrollbar
            md:grid md:grid-cols-3 md:overflow-visible md:pb-0 md:snap-none
          "
        >
          {reviews.map((review, index) => (
            <div
              key={review.name}
              className="testimonial-card w-[82vw] flex-shrink-0 snap-center md:w-auto md:flex-shrink
                bg-white/[0.04] backdrop-blur-xl p-8 rounded-[2rem]
                border border-white/10 hover:border-[#F59E0B]/30
                flex flex-col justify-between
                shadow-[0_4px_30px_rgba(0,0,0,0.3)]
                hover:shadow-[0_8px_40px_rgba(245,158,11,0.12)]
                transition-all duration-500 hover:-translate-y-2
                group
              "
            >
              {/* Large quote icon */}
              <Quote
                size={40}
                className="text-[#F59E0B]/20 mb-4 group-hover:text-[#F59E0B]/40 transition-colors duration-500"
              />

              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-[#F59E0B] text-[#F59E0B]" />
                ))}
              </div>

              <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8 flex-1 font-medium">
                "{review.text}"
              </p>

              <div className="flex items-center gap-4 border-t border-white/[0.08] pt-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#F59E0B] to-[#FCD34D] flex items-center justify-center text-[#0A1628] font-black text-lg shadow-[0_0_15px_rgba(245,158,11,0.35)] flex-shrink-0">
                  {review.name[0]}
                </div>
                <div>
                  <h5 className="font-bold text-base text-white">{review.name}</h5>
                  <p className="text-sm text-[#F59E0B] font-medium mt-0.5">{review.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
