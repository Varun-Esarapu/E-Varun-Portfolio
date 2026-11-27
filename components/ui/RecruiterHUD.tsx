"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { 
  GraduationCap, 
  Briefcase, 
  Cpu, 
  Award, 
  Copy, 
  Check, 
  ExternalLink, 
  ArrowRight,
  Sparkles,
  FileDown,
  ShieldCheck,
  MapPin,
  Clock
} from "lucide-react";
import { certifications } from "@/data/certifications";
import { experience } from "@/data/experience";

interface RecruiterHUDProps {
  onExit: () => void;
}

export default function RecruiterHUD({ onExit }: RecruiterHUDProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("varunesarapu@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const bentoVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen py-24 px-4 sm:px-8 max-w-5xl mx-auto w-full">
      {/* Top Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#EBEBEB]">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#10B981]/15 text-[#059669] border border-[#10B981]/30 font-sans text-xs font-semibold">
              60-Second Executive Recruiter HUD
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-heading font-semibold text-[#000000] tracking-[-0.03em]">
            Esarapu Varun <span className="text-[#6F6F6F]">— Candidate Dossier</span>
          </h1>
          <p className="text-xs sm:text-sm font-sans text-[#6F6F6F] mt-1 font-medium">
            Engineered for rapid technical evaluation • AI & Systems Focus
          </p>
        </div>

        <button
          onClick={onExit}
          className="self-start sm:self-auto flex items-center gap-2 px-5 py-2.5 bg-[#000000] hover:bg-[#1D1D1F] !text-white rounded-full text-xs font-sans font-medium tracking-tight uppercase transition-all shadow-xs group cursor-pointer"
        >
          <span className="!text-white">Exit to Narrative View</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform !text-white" />
        </button>
      </div>

      {/* 6-Card Bento Grid */}
      <motion.div
        variants={bentoVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-5"
      >
        {/* CARD 1: Profile & Core Benchmark (Spans 2 cols) */}
        <motion.div variants={cardVariants} className="md:col-span-2">
          <div className="p-7 sm:p-9 rounded-[28px] bg-[#F8F8F8] border border-[#EBEBEB] h-full">
            <div className="flex items-center justify-between gap-4 mb-4">
              <span className="text-[#0A0A0A] text-xs font-mono uppercase tracking-wider font-semibold flex items-center gap-1.5">
                <GraduationCap size={16} /> Academic & Candidacy Snapshot
              </span>
              <span className="px-3 py-1 rounded-full bg-[#10B981]/15 text-[#059669] border border-[#10B981]/30 font-sans text-xs font-semibold">
                Available Immediately
              </span>
            </div>

            <h2 className="text-2xl font-heading font-semibold text-[#0A0A0A] mb-2 tracking-tight">
              B.E. in Electronics & Communication Engineering
            </h2>
            <p className="text-[#6F6F6F] font-sans text-sm mb-6 flex items-center gap-1.5">
              <MapPin size={14} className="text-[#0A0A0A]" />
              HKBK College of Engineering, Bangalore (B.E. Graduate)
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-[#EBEBEB]">
              <div className="bg-white p-4 rounded-2xl border border-[#E5E5E5] shadow-2xs">
                <span className="text-[10px] font-mono text-[#6F6F6F] uppercase tracking-wider block font-semibold">
                  Cumulative GPA
                </span>
                <span className="text-2xl font-heading font-bold text-[#0A0A0A]">
                  8.71 / 10
                </span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-[#E5E5E5] shadow-2xs">
                <span className="text-[10px] font-mono text-[#6F6F6F] uppercase tracking-wider block font-semibold">
                  Primary Focus
                </span>
                <span className="text-sm font-sans text-[#0A0A0A] font-semibold mt-1 block">
                  AI & Systems
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1 bg-white p-4 rounded-2xl border border-[#E5E5E5] shadow-2xs">
                <span className="text-[10px] font-mono text-[#6F6F6F] uppercase tracking-wider block font-semibold">
                  Target Roles
                </span>
                <span className="text-xs font-sans text-[#0A0A0A] font-semibold mt-1 block">
                  AI/ML Dev, Backend Eng
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CARD 2: Hard Production Metrics (Spans 1 col) */}
        <motion.div variants={cardVariants}>
          <div className="p-7 sm:p-9 rounded-[28px] bg-[#F8F8F8] border border-[#EBEBEB] h-full flex flex-col justify-between">
            <div>
              <span className="text-[#0A0A0A] text-xs font-mono uppercase tracking-wider font-semibold flex items-center gap-1.5 mb-4">
                <Cpu size={16} /> Engineering Metrics
              </span>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="text-xs font-sans text-[#0A0A0A] font-semibold">Auto-STAIR Agentic RAG</span>
                    <span className="text-sm font-mono text-[#0A0A0A] font-bold bg-[#ADFA1D] px-2 py-0.5 rounded-full">LangGraph</span>
                  </div>
                  <p className="text-[11px] font-sans text-[#6F6F6F] leading-snug">
                    Zero-shot Trie prefix routing eliminating hallucinated retrieval paths during multi-hop reasoning.
                  </p>
                </div>

                <div className="pt-3 border-t border-[#EBEBEB]">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="text-xs font-sans text-[#0A0A0A] font-semibold">Cinematch Distributed Model</span>
                    <span className="text-sm font-mono text-[#0A0A0A] font-bold bg-[#ADFA1D] px-2 py-0.5 rounded-full">&lt;15ms</span>
                  </div>
                  <p className="text-[11px] font-sans text-[#6F6F6F] leading-snug">
                    Distributed ALS with PySpark 3.5 on 32M+ MovieLens interactions with sub-15ms inference.
                  </p>
                </div>

                <div className="pt-3 border-t border-[#EBEBEB]">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="text-xs font-sans text-[#0A0A0A] font-semibold">Backend Systems</span>
                    <span className="text-xs font-mono text-[#0A0A0A] font-semibold">FastAPI / DRF</span>
                  </div>
                  <p className="text-[11px] font-sans text-[#6F6F6F] leading-snug">
                    Decoupled microservice architectures, state-machine lifecycle validation, and PostgreSQL 15.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CARD 3: Industry Experience (Spans 2 cols) */}
        <motion.div variants={cardVariants} className="md:col-span-2">
          <div className="p-7 sm:p-9 rounded-[28px] bg-[#F8F8F8] border border-[#EBEBEB] h-full">
            <span className="text-[#0A0A0A] text-xs font-mono uppercase tracking-wider font-semibold flex items-center gap-1.5 mb-6">
              <Briefcase size={16} /> Verified Industry Experience
            </span>

            <div className="space-y-6">
              {experience.map((job, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-5 last:pb-0 border-b last:border-b-0 border-[#EBEBEB]"
                >
                  <div>
                    <h3 className="text-base font-heading font-semibold text-[#0A0A0A]">
                      {job.title}
                    </h3>
                    <p className="text-xs font-sans text-[#0A0A0A] font-semibold mb-2">
                      {job.company}
                    </p>
                    <ul className="space-y-1 text-xs text-[#6F6F6F] font-sans">
                      {job.description.slice(0, 2).map((item, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-[#0A0A0A] mt-0.5 text-[10px]">▹</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <span className="text-[11px] font-mono text-[#6F6F6F] shrink-0 font-medium sm:text-right">
                    {job.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CARD 4: Technical Arsenal (Spans 1 col) */}
        <motion.div variants={cardVariants}>
          <div className="p-7 sm:p-9 rounded-[28px] bg-[#F8F8F8] border border-[#EBEBEB] h-full">
            <span className="text-[#0A0A0A] text-xs font-mono uppercase tracking-wider font-semibold flex items-center gap-1.5 mb-5">
              <Sparkles size={16} /> Vetted Tech Arsenal
            </span>

            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-mono text-[#6F6F6F] uppercase tracking-wider block font-semibold mb-2">
                  Languages & Databases
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {["Python", "C", "SQL", "MySQL", "MongoDB"].map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-1 bg-white border border-[#E5E5E5] text-[#0A0A0A] text-[11px] font-mono rounded-full"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono text-[#6F6F6F] uppercase tracking-wider block font-semibold mb-2">
                  Frameworks, APIs & Cloud
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {["FastAPI", "Django (DRF)", "Streamlit", "Docker", "AWS (EC2, S3)", "Git"].map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-1 bg-white border border-[#E5E5E5] text-[#0A0A0A] text-[11px] font-mono rounded-full font-semibold"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono text-[#6F6F6F] uppercase tracking-wider block font-semibold mb-2">
                  AI / ML & Agentic Stack
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {["LangGraph", "LangChain", "PyTorch", "PySpark", "scikit-learn", "Agentic RAG", "Groq", "NumPy"].map(
                    (s) => (
                      <span
                        key={s}
                        className="px-2.5 py-1 bg-white border border-[#E5E5E5] text-[#0A0A0A] text-[11px] font-mono rounded-full"
                      >
                        {s}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CARD 5: Verified Certifications (Spans 2 cols) */}
        <motion.div variants={cardVariants} className="md:col-span-2">
          <div className="p-7 sm:p-9 rounded-[28px] bg-[#F8F8F8] border border-[#EBEBEB] h-full">
            <span className="text-[#0A0A0A] text-xs font-mono uppercase tracking-wider font-semibold flex items-center gap-1.5 mb-5">
              <Award size={16} /> Verified Certifications
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {certifications.slice(0, 4).map((cert, idx) => (
                <a
                  key={idx}
                  href={cert.pdfLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-white border border-[#E5E5E5] rounded-2xl hover:border-[#0A0A0A] transition-all group flex items-center justify-between shadow-2xs"
                >
                  <div>
                    <h4 className="text-xs font-sans font-semibold text-[#0A0A0A] line-clamp-1">
                      {cert.title}
                    </h4>
                    <span className="text-[10px] font-mono text-[#6F6F6F] block mt-0.5">
                      {cert.issuer} • {cert.date}
                    </span>
                  </div>
                  <ExternalLink size={13} className="text-[#6F6F6F] group-hover:text-[#0A0A0A] shrink-0 ml-2" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CARD 6: Instant Recruiter Action Hub (Spans 1 col) */}
        <motion.div variants={cardVariants}>
          <div className="p-7 sm:p-9 rounded-[28px] bg-[#F8F8F8] border border-[#EBEBEB] h-full flex flex-col justify-between">
            <div>
              <span className="text-[#0A0A0A] text-xs font-mono uppercase tracking-wider font-bold block mb-2">
                Action Hub
              </span>
              <h3 className="text-lg font-heading font-semibold text-[#0A0A0A] mb-4">
                Direct Contact
              </h3>

              <div className="space-y-2.5">
                <button
                  onClick={handleCopyEmail}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-full bg-white border border-[#E5E5E5] hover:border-[#0A0A0A] text-xs text-[#0A0A0A] transition-all cursor-pointer shadow-2xs"
                >
                  <span className="font-mono text-[11px] truncate">
                    varunesarapu@gmail.com
                  </span>
                  <span className="text-[#0A0A0A] shrink-0 ml-2">
                    {copied ? <Check size={14} className="text-[#0A0A0A]" /> : <Copy size={14} />}
                  </span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="https://www.linkedin.com/in/varunesarapu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 bg-white border border-[#E5E5E5] hover:border-[#0A0A0A] rounded-full text-center text-xs font-sans font-medium text-[#0A0A0A] transition-all shadow-2xs"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://github.com/Varun-Esarapu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 bg-white border border-[#E5E5E5] hover:border-[#0A0A0A] rounded-full text-center text-xs font-sans font-medium text-[#0A0A0A] transition-all shadow-2xs"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#EBEBEB]">
              <a
                href="/Varun_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#000000] hover:bg-[#1D1D1F] !text-white rounded-full font-sans font-medium text-xs shadow-xs transition-all cursor-pointer"
              >
                <FileDown size={15} className="!text-white" />
                <span className="!text-white">Download Resume (PDF)</span>
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
