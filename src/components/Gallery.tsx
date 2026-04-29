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
    time: "2-3 hours",
    featured: true,
  },
  {
    title: "House Siding Refresh",
    category: "House Washing",
    before: "/services/house_before.png",
    after: "/services/house_after.png",
    time: "4-5 hours",
  },
  {
    title: "Roof Moss Removal",
    category: "Roof Cleaning",
    before: "/services/roof_before.png",
    after: "/services/roof_after.png",
    time: "3-4 hours",
  },
  {
    title: "Fence Restoration",
    category: "Fence & Deck",
    before: "/services/fence_before.png",
    after: "/services/fence_after.png",
    time: "2-3 hours",
  },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 bg-[#0F172A] text-white overflow-hidden relative">
      <div className="container relative z-10">
        <SectionHeader 
          title="See the Difference" 
          subtitle="Real Results" 
          dark 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {comparisons.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative flex flex-col ${
                index === 0 ? "lg:col-span-2 lg:row-span-1" : 
                index === 3 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="relative mb-8">
                {/* Status Badge */}
                <div className="absolute top-6 left-6 z-20 flex gap-2">
                  <span className="px-5 py-2 rounded-2xl bg-[#0A1628]/80 backdrop-blur-xl text-[10px] font-black uppercase tracking-[0.2em] text-[#F59E0B] border border-white/10 shadow-2xl">
                    {item.category}
                  </span>
                  {item.featured && (
                    <span className="px-5 py-2 rounded-2xl bg-[#F59E0B] text-[10px] font-black uppercase tracking-[0.2em] text-[#0A1628] shadow-2xl">
                      Featured
                    </span>
                  )}
                </div>
                
                {/* Image Container with Hover Zoom & Perspective */}
                <div className="rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] bg-white/5 relative aspect-[4/3] lg:aspect-auto lg:h-[450px]">
                  <div className="w-full h-full transition-all duration-1000 ease-out group-hover:scale-110 group-hover:rotate-1">
                    <ReactCompareSlider
                      itemOne={<ReactCompareSliderImage src={item.before} alt={`Before ${item.title}`} className="object-cover h-full" />}
                      itemTwo={<ReactCompareSliderImage src={item.after} alt={`After ${item.title}`} className="object-cover h-full" />}
                      className="h-full"
                    />
                  </div>
                  
                  {/* Glassy Info Overlay */}
                  <div className="absolute inset-x-6 bottom-6 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="bg-[#0A1628]/60 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-6 shadow-2xl flex items-center justify-between">
                      <div>
                        <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-1">Time to Complete</p>
                        <p className="text-white text-lg font-black tracking-tight">{item.time}</p>
                      </div>
                      <div className="w-12 h-12 rounded-2xl bg-[#F59E0B] flex items-center justify-center text-[#0A1628]">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Subtle Gradient Fade */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/80 via-transparent to-transparent opacity-60 pointer-events-none" />
                </div>
              </div>

              <div className="px-4">
                <div className="flex items-center gap-4 mb-3">
                  <div className="h-px flex-1 bg-gradient-to-r from-[#F59E0B]/50 to-transparent" />
                  <span className="text-[#F59E0B] font-black text-xs uppercase tracking-[0.3em]">Project {index + 1}</span>
                </div>
                <h3 className="text-3xl font-black tracking-tighter mb-2 group-hover:text-[#F59E0B] transition-colors duration-500">
                  {item.title}
                </h3>
                <p className="text-white/40 text-sm font-medium tracking-wide">
                  Deep cleaning and restoration for {item.category.toLowerCase()} surfaces.
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Dynamic Background Elements */}
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-[#F59E0B]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-24 w-96 h-96 bg-[#F59E0B]/5 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
}
