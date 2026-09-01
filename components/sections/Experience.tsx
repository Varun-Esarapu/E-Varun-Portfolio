"use client";

import { motion } from "framer-motion";
import { experience } from "@/data/experience";

export default function Experience() {
  return (
    <section id="experience" className="py-24 border-b border-[#D4AF37]/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <h2 className="text-3xl md:text-4xl font-serif text-[#FDFBF7] mb-12 tracking-tight">Experience.</h2>

          <div className="flex flex-col gap-6">
            {experience.map((job, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative overflow-hidden rounded-2xl bg-[#1A1614] border border-[#2D2723] p-8 md:p-10 hover:border-[#D4AF37]/40 hover:shadow-[0_0_15px_rgba(212,175,55,0.1)] transition-all duration-300 group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-12">
                  <div className="md:w-1/3 shrink-0">
                    <span className="text-[#D4AF37] font-sans text-xs tracking-[0.15em] uppercase block mb-3 font-bold">{job.date}</span>
                    <h3 className="text-xl font-serif text-[#FDFBF7] leading-snug">{job.company}</h3>
                  </div>

                  <div className="md:w-2/3">
                    <h4 className="text-lg font-sans text-[#FDFBF7] mb-6 font-medium tracking-wide">{job.title}</h4>
                    <ul className="space-y-3">
                      {job.description.map((desc, i) => (
                        <li key={i} className="text-[#B5B0A1] font-sans leading-relaxed flex gap-3 text-sm">
                          <span className="text-[#D4AF37] mt-1 text-xs">▹</span>
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}