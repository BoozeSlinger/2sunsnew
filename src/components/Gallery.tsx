"use client";

import { motion } from "framer-motion";
import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";
import SectionHeader from "./SectionHeader";

const comparisons = [
  {
    title: "Driveway Deep Clean",
    category: "Driveway",
    before: "/services/driveway_before.png",
    after: "/services/driveway_after.png",
    time: "2–3 hours",
  },
  {
    title: "House Siding Refresh",
    category: "House Washing",
    before: "/services/house_before.png",
    after: "/services/house_after.png",
    time: "4–5 hours",
  },
  {
    title: "Roof Moss Removal",
    category: "Roof Cleaning",
    before: "/services/roof_before.png",
    after: "/services/roof_after.png",
    time: "3–4 hours",
  },
  {
    title: "Fence Restoration",
    category: "Fence & Deck",
    before: "/services/fence_before.png",
    after: "/services/fence_after.png",
    time: "2–3 hours",
  },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-28 bg-[#0F172A] text-white overflow-hidden relative">
      {/* Background glows */}
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-[#5AC83A]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-24 w-96 h-96 bg-[#56AAE2]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative z-10">
        <SectionHeader
          title="See the Difference"
          subtitle="Real Results"
          dark
        />

        {/* 2×2 balanced grid — uniform card sizes, no col-span hacks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {comparisons.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: index * 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col"
            >
              {/* ── Image container with consistent 4:3 ratio ── */}
              <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] bg-white/5 aspect-[4/3]">

                {/* Category badge */}
                <div className="absolute top-5 left-5 z-20 flex gap-2 items-center">
                  <span className="px-4 py-1.5 rounded-xl bg-[#0A1628]/80 backdrop-blur-xl text-[10px] font-black uppercase tracking-[0.2em] text-[#5AC83A] border border-[#5AC83A]/20 shadow-lg">
                    {item.category}
                  </span>
                </div>

                {/* Project number — top right */}
                <div className="absolute top-5 right-5 z-20 w-9 h-9 rounded-full bg-[#0A1628]/70 backdrop-blur-xl border border-white/10 flex items-center justify-center">
                  <span className="text-[10px] font-black text-white/60">0{index + 1}</span>
                </div>

                {/* Compare slider — fills the aspect-ratio box */}
                <ReactCompareSlider
                  itemOne={
                    <ReactCompareSliderImage
                      src={item.before}
                      alt={`Before — ${item.title}`}
                      style={{ objectFit: "cover", width: "100%", height: "100%" }}
                    />
                  }
                  itemTwo={
                    <ReactCompareSliderImage
                      src={item.after}
                      alt={`After — ${item.title}`}
                      style={{ objectFit: "cover", width: "100%", height: "100%" }}
                    />
                  }
                  style={{ width: "100%", height: "100%" }}
                />

                {/* Bottom gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/70 via-transparent to-transparent opacity-70 pointer-events-none" />

                {/* Hover overlay — time badge */}
                <div className="absolute inset-x-5 bottom-5 z-20 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 ease-out">
                  <div className="bg-[#0A1628]/70 backdrop-blur-2xl border border-white/10 rounded-2xl px-5 py-4 shadow-2xl flex items-center justify-between">
                    <div>
                      <p className="text-white/40 text-[9px] font-black uppercase tracking-widest mb-0.5">Time to Complete</p>
                      <p className="text-white text-base font-black tracking-tight">{item.time}</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-[#5AC83A] flex items-center justify-center text-[#0A1628] shrink-0">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Card label below image ── */}
              <div className="px-2 pt-5 pb-2">
                <div className="flex items-center gap-3 mb-2.5">
                  <div className="h-px flex-1 bg-gradient-to-r from-[#5AC83A]/40 to-transparent" />
                  <span className="text-[#5AC83A] font-black text-[10px] uppercase tracking-[0.3em]">Project {index + 1}</span>
                </div>
                <h3 className="text-2xl font-black tracking-tighter group-hover:text-[#5AC83A] transition-colors duration-400">
                  {item.title}
                </h3>
                <p className="text-white/40 text-sm font-medium mt-1 leading-relaxed">
                  Professional {item.category.toLowerCase()} cleaning & restoration.
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
