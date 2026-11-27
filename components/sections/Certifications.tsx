"use client";

import { motion, Variants } from "framer-motion";
import { certifications } from "@/data/certifications";
import { SectionHeading, Badge } from "@/components/ui/AceternityUI";
import { Award, ExternalLink, ShieldCheck } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 border-b border-[#EBEBEB] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <SectionHeading
            number="06"
            subtitle="Verified Credentials"
            title="Certifications & Accreditations."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {certifications.map((cert, index) => (
              <motion.div variants={itemVariants} key={index}>
                <a
                  href={cert.pdfLink || "#"}
                  target={cert.pdfLink ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className="block h-full group"
                >
                  <div className="p-7 rounded-[28px] bg-[#F8F8F8] border border-[#EBEBEB] hover:border-[#D6D6D6] h-full flex flex-col justify-between transition-all duration-300 shadow-2xs hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.06)]">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-2.5 rounded-full bg-white border border-[#E5E5E5] flex items-center justify-center shadow-2xs">
                          <Award className="w-4 h-4 text-[#0A0A0A]" />
                        </div>
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-[#E5E5E5] text-xs font-sans font-medium text-[#0A0A0A]">
                          Verified
                        </span>
                      </div>

                      <h3 className="font-heading text-lg font-semibold text-[#0A0A0A] tracking-tight group-hover:underline underline-offset-4 transition-colors leading-snug mb-6">
                        {cert.title}
                      </h3>
                    </div>

                    <div className="pt-4 border-t border-[#EBEBEB] flex items-center justify-between text-xs font-sans text-[#6F6F6F]">
                      <span>{cert.issuer}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[#0A0A0A] font-semibold">{cert.date}</span>
                        <ExternalLink size={13} className="text-[#6F6F6F] group-hover:text-[#0A0A0A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </div>
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
