"use client";

import { motion } from "framer-motion";

export default function Education() {
  return (
    <section id="education" className="py-24 border-b border-[#D4AF37]/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <h2 className="text-3xl md:text-4xl font-serif text-[#FDFBF7] mb-12 tracking-tight">Education.</h2>

          <div className="relative overflow-hidden rounded-2xl bg-[#1A1614] border border-[#2D2723] p-8 md:p-10 hover:border-[#D4AF37]/30 transition-all group shadow-xl">
             <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
             <div className="relative z-10">
              <span className="text-[#D4AF37] font-sans text-xs tracking-[0.15em] uppercase block mb-4 font-bold">Dec 2022 - Jul 2026</span>
              <h3 className="text-2xl font-serif text-[#FDFBF7] mb-2">B.E. in Electronics & Communication Engineering</h3>
              <p className="text-[#B5B0A1] font-sans text-sm">HKBK College of Engineering, Bangalore, KA (GPA: 8.71/10)</p>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}