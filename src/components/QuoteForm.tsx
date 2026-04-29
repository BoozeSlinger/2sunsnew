"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, Loader2 } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "./SectionHeader";

gsap.registerPlugin(ScrollTrigger);

type FormData = {
  fullName: string;
  phone: string;
  email: string;
  serviceType: string;
  address: string;
  message: string;
};

export default function QuoteForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>();
  const sectionRef = useRef<HTMLElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(formCardRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const onSubmit = async (data: FormData) => {
    console.log(data);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitted(true);
  };

  return (
    <section ref={sectionRef} id="contact" className="py-24 bg-[#0A1628] text-white relative">
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] to-transparent" />
      <div className="container max-w-5xl relative z-10">
        <SectionHeader 
          title="Ready for a Clean Start?" 
          subtitle="Get an Estimate" 
          dark
        />
        <div 
          ref={formCardRef}
          className="bg-white/5 backdrop-blur-xl rounded-[2rem] shadow-[0_0_40px_rgba(245,158,11,0.15)] overflow-hidden border border-white/10 flex flex-col md:flex-row mt-12"
        >
          <div className="bg-gradient-to-br from-[#F59E0B] to-[#D97706] p-12 text-[#0A1628] md:w-2/5 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <h2 className="text-3xl lg:text-4xl font-black mb-6 tracking-tight">Get Your Free Quote</h2>
              <p className="text-[#0A1628]/80 mb-8 leading-relaxed text-lg font-medium">
                Fill out the form and our team will get back to you with a detailed, no-obligation estimate within 24 hours.
              </p>
            </div>
            <div className="relative z-10 text-sm font-black text-[#0A1628] bg-white/20 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
              <span className="mr-1">⚡</span> Over 500+ happy customers served this year across the region.
            </div>
          </div>


          <div className="p-8 md:p-12 md:w-3/5 bg-transparent">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <div className="flex flex-col gap-2">
                    <label htmlFor="fullName" className="text-sm font-bold text-blue-100/80 uppercase tracking-wider">Full Name</label>
                    <input
                      id="fullName"
                      {...register("fullName", { required: "Name is required" })}
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#F59E0B] focus:bg-white/10 text-white placeholder-white/30 transition-all duration-300 shadow-inner"
                      placeholder="John Doe"
                    />
                    {errors.fullName && (
                      <span role="alert" className="text-xs text-red-400 font-medium flex items-center gap-1 mt-1">
                        {errors.fullName.message}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="phone" className="text-sm font-bold text-blue-100/80 uppercase tracking-wider">Phone Number</label>
                    <input
                      id="phone"
                      {...register("phone", { required: "Phone is required" })}
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#F59E0B] focus:bg-white/10 text-white placeholder-white/30 transition-all duration-300 shadow-inner"
                      placeholder="(951) 555-0123"
                    />
                    {errors.phone && (
                      <span role="alert" className="text-xs text-red-400 font-medium flex items-center gap-1 mt-1">
                        {errors.phone.message}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label htmlFor="email" className="text-sm font-bold text-blue-100/80 uppercase tracking-wider">Email Address</label>
                    <input
                      id="email"
                      {...register("email", { 
                        required: "Email is required",
                        pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
                      })}
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#F59E0B] focus:bg-white/10 text-white placeholder-white/30 transition-all duration-300 shadow-inner"
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <span role="alert" className="text-xs text-red-400 font-medium flex items-center gap-1 mt-1">
                        {errors.email.message}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label htmlFor="serviceType" className="text-sm font-bold text-blue-100/80 uppercase tracking-wider">Service Type</label>
                    <div className="relative">
                      <select
                        id="serviceType"
                        {...register("serviceType", { required: "Please select a service" })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#F59E0B] focus:bg-white/10 text-white transition-all duration-300 shadow-inner appearance-none"
                      >
                        <option value="" className="bg-[#0A1628] text-white">Select a service...</option>
                        <option value="house" className="bg-[#0A1628] text-white">House Washing</option>
                        <option value="driveway" className="bg-[#0A1628] text-white">Driveway & Concrete</option>
                        <option value="roof" className="bg-[#0A1628] text-white">Roof Soft Washing</option>
                        <option value="deck" className="bg-[#0A1628] text-white">Deck & Patio Restoration</option>
                        <option value="fence" className="bg-[#0A1628] text-white">Fence Cleaning</option>
                        <option value="commercial" className="bg-[#0A1628] text-white">Commercial Power Washing</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                      </div>
                    </div>
                    {errors.serviceType && (
                      <span role="alert" className="text-xs text-red-400 font-medium flex items-center gap-1 mt-1">
                        {errors.serviceType.message}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label htmlFor="address" className="text-sm font-bold text-blue-100/80 uppercase tracking-wider">Property Address</label>
                    <input
                      id="address"
                      {...register("address", { required: "Address is required" })}
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#F59E0B] focus:bg-white/10 text-white placeholder-white/30 transition-all duration-300 shadow-inner"
                      placeholder="123 Wash St, Riverside, CA"
                    />
                    {errors.address && (
                      <span role="alert" className="text-xs text-red-400 font-medium flex items-center gap-1 mt-1">
                        {errors.address.message}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label htmlFor="message" className="text-sm font-bold text-blue-100/80 uppercase tracking-wider">Message (Optional)</label>
                    <textarea
                      id="message"
                      {...register("message")}
                      rows={4}
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#F59E0B] focus:bg-white/10 text-white placeholder-white/30 transition-all duration-300 shadow-inner resize-none"
                      placeholder="Tell us more about your project..."
                    />
                  </div>

                  <button
                    disabled={isSubmitting}
                    className="md:col-span-2 bg-[#F59E0B] text-white hover:bg-amber-500 rounded-xl font-bold transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(245,158,11,0.3)] flex items-center justify-center gap-2 disabled:opacity-70 mt-4 h-14"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send My Request
                        <Send size={18} />
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center py-12"
                  aria-live="polite"
                >
                  <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                    <CheckCircle size={40} />
                  </div>
                  <h3 className="text-3xl font-black mb-4">Request Received!</h3>
                  <p className="text-white/80 max-w-sm mx-auto">
                    Thanks for reaching out to Two Suns. Our team is reviewing your request and will contact you shortly with a free quote.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-8 text-[#F59E0B] font-bold hover:text-[#FCD34D] transition-colors"
                  >
                    Send another request
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
