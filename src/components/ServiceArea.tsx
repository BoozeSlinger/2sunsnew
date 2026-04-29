"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import SectionHeader from "./SectionHeader";

const cities = [
  "Riverside", "Corona", "Moreno Valley", "Norco", 
  "Jurupa Valley", "Ontario", "Chino", "Eastvale"
];

export default function ServiceArea() {
  return (
    <section className="py-24 bg-[#0A1628] text-white relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#5AC83A]/10 to-transparent pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#5AC83A]/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <div className="flex-1 w-full">
            <div className="mb-4">
              <span className="text-sm font-black uppercase tracking-[0.3em] text-[#5AC83A] mb-4 block">
                Our Service Area
              </span>
              <h2 className="text-[clamp(1.5rem,4.5vw,3.5rem)] font-black tracking-tighter leading-none whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r from-[#5AC83A] to-[#56AAE2]">
                Proudly Serving the Inland Empire
              </h2>
              <div className="w-24 h-1.5 mt-6 rounded-full bg-gradient-to-r from-[#5AC83A] to-transparent" />
            </div>
            
            <p className="text-lg text-white/60 mb-12 leading-relaxed max-w-2xl font-medium">
              We provide top-tier pressure washing services to residential and commercial clients across these local communities. Don't see your city? Give us a call!
            </p>

            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              {cities.map((city, index) => (
                <motion.div 
                  key={city} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-4 text-lg font-bold group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-[#5AC83A] group-hover:bg-[#5AC83A] group-hover:text-[#0A1628] group-hover:scale-110 transition-all duration-300 shadow-xl group-hover:shadow-[#5AC83A]/20">
                    <MapPin size={22} strokeWidth={2.5} />
                  </div>
                  <span className="group-hover:text-[#5AC83A] transition-colors tracking-tight">{city}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 w-full aspect-square lg:aspect-auto lg:h-[600px] rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0A1628]/40 via-transparent to-transparent z-10 pointer-events-none" />
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d105777.636657904!2d-117.4721458!3d33.9438062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dca6df7ebb493d%3A0x35ef009dfd778d05!2sRiverside%2C%20CA!5e0!3m2!1sen!2sus!4v1714421626000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale brightness-90 hover:grayscale-0 hover:brightness-100 transition-all duration-1000 scale-105 group-hover:scale-100"
            ></iframe>
            
            {/* Map Decoration */}
            <div className="absolute top-6 right-6 z-20">
              <div className="px-6 py-3 rounded-2xl bg-[#0A1628]/80 backdrop-blur-xl border border-white/10 shadow-2xl">
                <p className="text-[#5AC83A] font-black text-sm uppercase tracking-widest">Live Map View</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
