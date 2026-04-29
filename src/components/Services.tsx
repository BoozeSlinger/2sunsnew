"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "./SectionHeader";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    index: "01",
    title: "House Washing",
    description: "Gentle soft wash that removes algae, mold, and dirt without damaging your siding.",
    before: "/services/house_before.png",
    after: "/services/house_after.png",
  },
  {
    index: "02",
    title: "Driveway & Concrete",
    description: "Deep pressure cleaning that removes oil stains and years of ground-in grime.",
    before: "/services/driveway_before.png",
    after: "/services/driveway_after.png",
  },
  {
    index: "03",
    title: "Roof Soft Washing",
    description: "Eliminate black streaks and moss growth with our safe, low-pressure treatment.",
    before: "/services/roof_before.png",
    after: "/services/roof_after.png",
  },
  {
    index: "04",
    title: "Deck & Patio Restoration",
    description: "Bring outdoor living spaces back to life with specialized wood and stone cleaning.",
    before: "/services/fence_before.png",
    after: "/services/fence_after.png",
  },
  {
    index: "05",
    title: "Fence Cleaning",
    description: "Restore the original beauty of your wood or vinyl fence, removing years of weathering.",
    before: "/services/fence_before.png",
    after: "/services/fence_after.png",
  },
  {
    index: "06",
    title: "Commercial Power Washing",
    description: "Keep your storefront looking professional and inviting for customers.",
    before: "/services/driveway_before.png",
    after: "/services/driveway_after.png",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".service-card");

      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { clipPath: "inset(0 100% 0 0)", opacity: 0 },
          {
            clipPath: "inset(0 0% 0 0)",
            opacity: 1,
            duration: 1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="py-24 bg-[#0A1628] text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(90,200,58,0.05)_0%,transparent_50%)] pointer-events-none" />
      
      <div className="container relative z-10">
        <SectionHeader
          title="Our Professional Services"
          subtitle="What We Clean"
          dark
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="service-card group relative overflow-hidden rounded-[2.5rem] h-[450px] cursor-pointer border border-white/10 shadow-2xl transition-all duration-500 hover:border-[#5AC83A]/30"
            >
              {/* BEFORE */}
              <img
                src={service.before}
                alt={`${service.title} before`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />

              {/* AFTER — clips in from left on hover */}
              <img
                src={service.after}
                alt={`${service.title} after`}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out [clip-path:inset(0_100%_0_0)] group-hover:[clip-path:inset(0_0%_0_0)] group-hover:scale-110"
              />

              {/* Gradient + text */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/20 to-transparent opacity-80" />
              
              <div className="absolute bottom-0 left-0 p-8 w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[10px] font-black text-[#5AC83A] uppercase tracking-[0.3em] bg-[#5AC83A]/10 px-3 py-1 rounded-full border border-[#5AC83A]/20">
                    Service {service.index}
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-r from-[#5AC83A]/30 to-transparent" />
                </div>
                
                <h3 className="text-white text-3xl font-black tracking-tighter mb-2 group-hover:text-[#5AC83A] transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-white/50 text-base font-medium leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  {service.description}
                </p>
                
                <div className="mt-6 flex items-center gap-2 text-white/40 text-[10px] font-black uppercase tracking-widest">
                  <span>Before</span>
                  <div className="w-8 h-px bg-white/20" />
                  <span className="text-[#5AC83A]">Hover to see after</span>
                </div>
              </div>

              {/* Interactive Pulse Dot */}
              <div className="absolute top-8 right-8 z-20">
                <div className="relative">
                  <div className="w-3 h-3 bg-[#5AC83A] rounded-full animate-ping absolute inset-0" />
                  <div className="w-3 h-3 bg-[#5AC83A] rounded-full relative" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
