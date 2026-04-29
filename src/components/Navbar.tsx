"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Services", href: "#services" },
  { name: "Gallery", href: "#gallery" },
  { name: "Why Us", href: "#why-us" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-3 transition-[background-color,border-color,padding,box-shadow] duration-500",
        isScrolled
          ? "bg-[#0A1628]/90 backdrop-blur-md border-b border-white/10 shadow-xl"
          : "bg-transparent"
      )}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <Image
            src="/2sunlogo.png"
            alt="Two Suns Pressure Wash"
            width={64}
            height={64}
            className="h-16 w-16 object-contain group-hover:scale-105 transition-transform drop-shadow-lg"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-black uppercase tracking-widest text-white/60 hover:text-[#5AC83A] transition-all relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#5AC83A] transition-all group-hover:w-full" />
            </Link>
          ))}
          <Link
            href="#contact"
            className="px-8 py-3 rounded-full bg-[#5AC83A] text-white font-black uppercase tracking-widest text-xs hover:bg-[#4ab82e] hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[#5AC83A]/30"
          >
            Get Quote
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white p-2 transition-all duration-300 ease-in-out hover:bg-white/10 rounded-lg"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0A1628] border-b border-white/10 overflow-hidden"
          >
            <div className="container py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-black uppercase tracking-[0.3em] text-white/60 hover:text-[#5AC83A] py-3 border-b border-white/5 last:border-0 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="#contact"
                className="bg-[#5AC83A] text-white font-black uppercase tracking-widest text-xs py-4 rounded-xl mt-4 hover:bg-[#4ab82e] hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-[#5AC83A]/30 text-center block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
