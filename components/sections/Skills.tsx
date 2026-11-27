"use client";

import { motion, Variants } from "framer-motion";
import { SectionHeading, Badge } from "@/components/ui/AceternityUI";
import { Code2, Database, Cpu, Cloud, Terminal } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Skills() {
  const skillCategories = [
    {
      title: "Agentic AI & Machine Learning",
      icon: <Cpu className="w-4 h-4 text-[#0A0A0A]" />,
      skills: ["LangGraph", "LangChain", "PyTorch", "TensorFlow", "scikit-learn", "PySpark (MLlib)", "Agentic RAG", "Groq", "Librosa"],
      tag: "Specialty",
    },
    {
      title: "Backend, APIs & Cloud Systems",
      icon: <Database className="w-4 h-4 text-[#0A0A0A]" />,
      skills: ["FastAPI", "Django (DRF)", "RESTful APIs", "Streamlit", "PostgreSQL", "MySQL", "MongoDB", "Docker", "AWS (EC2, S3)"],
      tag: "Production",
    },
    {
      title: "Languages & Core Systems",
      icon: <Terminal className="w-4 h-4 text-[#0A0A0A]" />,
      skills: ["Python", "SQL", "C", "Trie Indexing", "NumPy", "Pandas"],
      tag: "Foundation",
    },
    {
      title: "Core Competencies & AI Reliability",
      icon: <Cloud className="w-4 h-4 text-[#0A0A0A]" />,
      skills: ["Multi-Hop Retrieval", "LLM Evaluation", "HITL Validation", "Distributed Systems", "Recommendation Engines", "Git / GitHub"],
      tag: "Architecture",
    },
  ];

  return (
    <section id="skills" className="py-24 border-b border-[#EBEBEB] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <SectionHeading
            number="04"
            subtitle="Verified Stack"
            title="Technical Arsenal & Tooling."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {skillCategories.map((category, index) => (
              <motion.div variants={itemVariants} key={index}>
                <div className="p-7 rounded-[28px] bg-[#F8F8F8] border border-[#EBEBEB] hover:border-[#D6D6D6] h-full flex flex-col justify-between transition-all duration-300">
                  <div>
                    {/* Header with category icon and badge */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-full bg-white border border-[#E5E5E5] shadow-2xs">
                          {category.icon}
                        </div>
                        <h3 className="font-heading text-lg font-semibold text-[#0A0A0A] tracking-tight">
                          {category.title}
                        </h3>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-white border border-[#E5E5E5] text-xs font-sans font-medium text-[#6F6F6F]">
                        {category.tag}
                      </span>
                    </div>

                    {/* Skill chips in clean white pills */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {category.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3.5 py-1.5 bg-white border border-[#E5E5E5] text-[#0A0A0A] hover:border-[#0A0A0A] text-xs font-sans font-medium tracking-tight rounded-full transition-colors duration-200 cursor-default shadow-2xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Micro metric footer */}
                  <div className="mt-8 pt-4 border-t border-[#EBEBEB] flex items-center justify-between text-xs font-sans text-[#6F6F6F]">
                    <span>Proficiency: Production Ready</span>
                    <span className="text-[#000000] font-semibold">
                      High Confidence
                    </span>
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
