"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="back-to-top"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3, ease: "backOut" }}
          onClick={scrollToTop}
          aria-label="Back to top"
          className="
            fixed bottom-8 right-6 z-50
            w-12 h-12 rounded-full
            bg-[#F59E0B] text-[#0A1628]
            flex items-center justify-center
            shadow-[0_0_20px_rgba(245,158,11,0.5)]
            hover:scale-110 hover:shadow-[0_0_30px_rgba(245,158,11,0.7)]
            active:scale-95
            transition-all duration-300
          "
        >
          <ArrowUp size={20} strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
