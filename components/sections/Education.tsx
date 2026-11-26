"use client";

import { motion } from "framer-motion";
import { SectionHeading, Badge } from "@/components/ui/AceternityUI";
import { GraduationCap, Award, MapPin, Calendar } from "lucide-react";

export default function Education() {
  return (
    <section id="education" className="py-24 border-b border-[#EBEBEB]">
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionHeading
            number="05"
            subtitle="Academic Foundation"
            title="Education & Engineering Degree."
          />

          <div className="p-8 md:p-10 rounded-[28px] bg-[#F8F8F8] border border-[#EBEBEB]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#EBEBEB]">
              <div>
                <div className="flex flex-wrap items-center gap-2.5 mb-3">
                  <span className="font-mono text-xs text-[#0A0A0A] bg-white px-3 py-1.5 rounded-full border border-[#E5E5E5] font-medium flex items-center gap-1.5 shadow-2xs">
                    <Calendar className="w-3 h-3 text-[#6F6F6F]" />
                    Dec 2022 – Jul 2026
                  </span>
                  <span className="text-xs font-sans font-semibold flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#10B981]/15 text-[#059669] border border-[#10B981]/30">
                    Graduated (B.E.)
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-heading font-semibold text-[#0A0A0A] tracking-[-0.03em] mb-2">
                  B.E. in Electronics & Communication Engineering
                </h3>
                <p className="text-sm font-sans text-[#6F6F6F] flex items-center gap-1.5">
                  <MapPin size={14} className="text-[#0A0A0A]" />
                  HKBK College of Engineering, Bangalore, Karnataka
                </p>
              </div>

              {/* CGPA Bento Stat Box with clean white & electric lime highlight */}
              <div className="shrink-0 p-5 rounded-[22px] bg-white border border-[#E5E5E5] flex flex-col items-center justify-center min-w-[130px] shadow-2xs">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#6F6F6F] font-semibold">
                  Academic GPA
                </span>
                <span className="text-3xl font-heading font-bold text-[#0A0A0A] tracking-tight mt-1">
                  8.71
                </span>
                <span className="text-[10px] font-mono text-[#6F6F6F]">
                  Scale: 10.0
                </span>
              </div>
            </div>

            {/* Relevant Coursework Pillars */}
            <div className="pt-6">
              <span className="text-xs font-mono uppercase tracking-wider text-[#0A0A0A] block mb-3 font-semibold">
                Core Relevant Coursework & Systems Competencies:
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  "Digital Signal Processing",
                  "Data Structures & Algorithms",
                  "Microcontrollers & Embedded Systems",
                  "Computer Networks",
                  "Linear Algebra & Probability",
                  "Object-Oriented Programming",
                  "Control Systems",
                ].map((course) => (
                  <span
                    key={course}
                    className="px-3.5 py-1.5 bg-white border border-[#E5E5E5] rounded-full text-xs font-sans text-[#0A0A0A] hover:border-[#0A0A0A] transition-colors shadow-2xs"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
