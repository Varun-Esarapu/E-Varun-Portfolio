"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { experience, ExperienceItem } from "@/data/experience";
import React, { useRef } from "react";

const ExperienceCard = ({ job, index }: { job: ExperienceItem; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["0 1", "1.2 1"]
  });

  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

  return (
    <motion.div 
      ref={cardRef}
      style={{ scale: scaleProgress, opacity: opacityProgress }}
      className="relative overflow-hidden rounded-2xl bg-[#1A1614] border border-[#2D2723] p-8 md:p-10 hover:border-[#D4AF37]/40 hover:shadow-[0_0_15px_rgba(212,175,55,0.1)] transition-all duration-300 group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-0" />
      
      <div className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-12">
        <div className="md:w-1/3 shrink-0 flex flex-col items-start gap-4">
          <span className="text-[#D4AF37] font-sans text-xs tracking-[0.15em] uppercase font-bold">{job.date}</span>
          <div className="flex flex-col gap-5 w-full">
            <h3 className="text-xl font-serif text-[#FDFBF7] leading-snug">{job.company}</h3>
            {/* Themed Logo - Blend trick: Wrapper matches card BG to allow mix-blend-screen to strip the black box */}
            <div className={`${job.company.includes("D Square") ? "w-56 md:w-64" : "w-28 md:w-32 mx-auto"} relative group-hover:scale-105 transition-transform duration-500 mt-2 flex justify-center bg-[#1A1614]`}>
              <img 
                src={job.logo} 
                alt={`${job.company} Logo`} 
                className="w-full h-auto object-contain invert grayscale sepia-[0.4] opacity-80 group-hover:opacity-100 group-hover:sepia-0 mix-blend-screen transition-all duration-500" 
              />
            </div>
          </div>
        </div>

        <div className="md:w-2/3 mt-2 md:mt-0">
          <h4 className="text-lg font-sans text-[#FDFBF7] mb-6 font-medium tracking-wide">{job.title}</h4>
          <ul className="space-y-3">
            {job.description.map((desc: string, i: number) => (
              <li key={i} className="text-[#B5B0A1] font-sans leading-relaxed flex gap-3 text-sm">
                <span className="text-[#D4AF37] mt-1 text-xs">▹</span>
                <span>{desc}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default function Experience() {
  return (
    <section id="experience" className="py-24 border-b border-[#D4AF37]/10 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <h2 className="text-3xl md:text-4xl font-serif text-[#FDFBF7] mb-12 tracking-tight">Experience.</h2>

          <div className="flex flex-col gap-6">
            {experience.map((job, index) => (
              <ExperienceCard key={index} job={job} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}