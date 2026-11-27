"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { experience, ExperienceItem } from "@/data/experience";
import { SectionHeading, Badge } from "@/components/ui/AceternityUI";
import { Briefcase, Calendar, ChevronRight } from "lucide-react";
import React, { useRef } from "react";

const ExperienceCard = ({
  job,
  index,
}: {
  job: ExperienceItem;
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["0 1", "1.15 1"],
  });

  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.97, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.65, 1]);

  return (
    <motion.div
      ref={cardRef}
      style={{ scale: scaleProgress, opacity: opacityProgress }}
      className="w-full"
    >
      <div className="p-7 md:p-9 rounded-[28px] bg-[#F8F8F8] border border-[#EBEBEB] hover:border-[#D6D6D6] transition-all duration-300 group">
        <div className="flex flex-col md:flex-row gap-6 md:gap-10">
          {/* Left Column: Date, Company, Themed Logo */}
          <div className="md:w-1/3 shrink-0 flex flex-col items-start gap-4">
            <span className="font-mono text-xs text-[#0A0A0A] bg-white px-3 py-1.5 rounded-full border border-[#E5E5E5] font-medium flex items-center gap-1.5 shadow-2xs">
              <Calendar className="w-3 h-3 text-[#6F6F6F]" />
              {job.date}
            </span>

            <div className="flex flex-col gap-3 w-full">
              <h3 className="text-xl font-heading font-semibold text-[#0A0A0A] tracking-[-0.03em] leading-snug">
                {job.company}
              </h3>

              {/* Logo Container with clean light styling & interactive color reveal */}
              <div
                className={`${
                  job.company.includes("D Square")
                    ? "w-48 sm:w-56"
                    : "w-28 sm:w-32"
                } relative mt-1 flex items-center justify-center bg-white p-3.5 rounded-2xl border border-[#E5E5E5] shadow-2xs hover:shadow-md hover:border-[#5CA904]/40 transition-all duration-300 group/logo cursor-pointer`}
              >
                <img
                  src={job.logo}
                  alt={`${job.company} Logo`}
                  className="w-full h-auto object-contain grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover/logo:grayscale-0 group-hover/logo:opacity-100 hover:grayscale-0 hover:opacity-100 transition-all duration-400 ease-out"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Role Title and Quantifiable Deliverables */}
          <div className="md:w-2/3 md:border-l md:border-[#EBEBEB] md:pl-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="w-4 h-4 text-[#0A0A0A]" />
                <h4 className="text-lg font-heading font-semibold text-[#0A0A0A] tracking-tight">
                  {job.title}
                </h4>
              </div>

              <ul className="space-y-3">
                {job.description.map((desc: string, i: number) => (
                  <li
                    key={i}
                    className="text-[#6F6F6F] font-sans leading-relaxed flex items-start gap-3 text-sm"
                  >
                    <span className="text-[#0A0A0A] mt-1 shrink-0 font-mono text-xs">
                      ▹
                    </span>
                    <span>{desc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-[#EBEBEB] flex items-center justify-between text-xs font-mono text-[#6F6F6F]">
              <span>Role: {job.company.includes("D Square") ? "Jr. AI & ML Engineer" : "AI Operator Intern"}</span>
              <span className="text-[#000000] font-semibold">
                {job.company.includes("D Square") ? "Active Engineer" : "Completed"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Experience() {
  return (
    <section id="experience" className="py-24 border-b border-[#EBEBEB] overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionHeading
            number="03"
            subtitle="Industry Track Record"
            title="Professional Experience."
          />

          <div className="flex flex-col gap-5">
            {experience.map((job, index) => (
              <ExperienceCard key={index} job={job} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
