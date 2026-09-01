"use client";

import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section id="contact" className="py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-3xl bg-[#1A1614] border border-[#2D2723] p-8 md:p-16 text-center shadow-2xl"
        >
          {/* Ambient Accent Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-serif text-[#FDFBF7] mb-6 tracking-tight">
              Let's build something.
            </h2>
            <p className="font-sans text-[#B5B0A1] text-base md:text-lg tracking-wide leading-relaxed mb-10">
              Currently open to new opportunities. Whether you have a question regarding my systems architecture, want to discuss an AI role, or just want to connect, my inbox is always open.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* PRIMARY: Ghost Gold to Solid Gold */}
              <a 
                href="mailto:varunesarapu@gmail.com" 
                className="w-full sm:w-auto inline-block bg-transparent border border-[#D4AF37]/50 text-[#D4AF37] font-bold tracking-[0.15em] uppercase text-xs px-10 py-5 rounded-md hover:bg-[#D4AF37] hover:text-[#0F0C0A] transition-all duration-300 text-center shadow-[0_0_15px_rgba(212,175,55,0.05)] hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]"
              >
                Say Hello
              </a>
              {/* SECONDARY: Dark to Silver/White (No Gold!) */}
              <a 
                href="https://www.linkedin.com/in/varunesarapu/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full sm:w-auto inline-block bg-transparent border border-[#2D2723] text-[#B5B0A1] font-bold tracking-[0.15em] uppercase text-xs px-8 py-5 rounded-md hover:border-[#B5B0A1]/50 hover:text-[#FDFBF7] transition-all duration-300 text-center"
              >
                LinkedIn
              </a>
              <a 
                href="https://github.com/Varun-Esarapu" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full sm:w-auto inline-block bg-transparent border border-[#2D2723] text-[#B5B0A1] font-bold tracking-[0.15em] uppercase text-xs px-8 py-5 rounded-md hover:border-[#B5B0A1]/50 hover:text-[#FDFBF7] transition-all duration-300 text-center"
              >
                GitHub
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}