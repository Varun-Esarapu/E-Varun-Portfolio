"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-24 border-b border-[#D4AF37]/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <h2 className="text-3xl md:text-4xl font-serif text-[#FDFBF7] mb-8 tracking-tight">About Me.</h2>

          <div className="flex flex-col md:flex-row gap-10">
            <div className="md:w-2/3 space-y-6 text-[#B5B0A1] font-sans text-base md:text-lg leading-relaxed">
              <p>
                I am an Electronics and Communication Engineering graduate specializing in applied artificial intelligence and backend architecture. My foundation in hardware gave me a strict understanding of how systems operate at the lowest levels, which directly informs how I structure software today.
              </p>
              <p>
                I focus on end-to-end engineering rather than isolated scripts. My recent work ranges from deploying Convolutional Neural Networks on edge IoT devices to building production-ready REST APIs for enterprise management systems.
              </p>
              <p>
                Currently, my core focus is building clean, performant architecture that connects complex machine learning logic to scalable web applications.
              </p>
            </div>
            
            <div className="md:w-1/3 flex justify-center md:justify-end items-start relative">
               <div className="relative w-full max-w-[250px] aspect-square rounded-2xl border border-[#2D2723] overflow-hidden group shadow-xl bg-[#1A1614] flex items-center justify-center hover:border-[#D4AF37]/50 transition-colors duration-500">
                 <img src="/me.jpg" alt="Varun Esarapu" className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" />
                 
                 <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
               </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
