"use client";

import { motion } from "framer-motion";
import { certifications } from "@/data/certifications";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 border-b border-[#D4AF37]/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-serif text-[#FDFBF7] mb-12 tracking-tight">Certifications.</motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <motion.a 
                key={index} 
                href={cert.pdfLink || "#"} 
                target={cert.pdfLink ? "_blank" : "_self"}
                rel="noopener noreferrer"
                variants={itemVariants}
                className="relative overflow-hidden rounded-2xl bg-[#1A1614] border border-[#2D2723] p-8 md:p-10 hover:border-[#D4AF37]/40 hover:shadow-[0_0_15px_rgba(212,175,55,0.1)] hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <h3 className="relative z-10 text-lg font-serif text-[#FDFBF7] mb-8 leading-snug group-hover:text-[#D4AF37] transition-colors">
                  {cert.title}
                </h3>
                
                <div className="relative z-10 flex justify-between items-end border-t border-[#2D2723] pt-4 mt-auto">
                  <span className="text-[#B5B0A1] font-sans text-xs font-medium">{cert.issuer}</span>
                  <span className="text-[#D4AF37] font-sans text-[10px] tracking-widest uppercase font-bold">{cert.date}</span>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}