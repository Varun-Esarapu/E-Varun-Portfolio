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
  FileDown
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
        staggerChildren: 0.08
      }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen py-28 px-4 sm:px-8 max-w-5xl mx-auto w-full">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#D4AF37]/20">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-400 font-sans text-xs tracking-wider uppercase font-bold">
              Recruiter Mode Active (60-Second Scan)
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif text-[#FDFBF7] tracking-tight">
            Esarapu Varun <span className="text-[#D4AF37]">— Executive Summary</span>
          </h1>
        </div>

        <button
          onClick={onExit}
          className="self-start sm:self-auto flex items-center gap-2 px-5 py-2.5 bg-[#1A1614] border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0F0C0A] rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-lg group"
        >
          <span>Exit to Narrative View</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* 6-Card Bento Grid */}
      <motion.div 
        variants={bentoVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {/* CARD 1: Profile & Core Benchmark (Spans 2 cols) */}
        <motion.div 
          variants={cardVariants}
          className="md:col-span-2 rounded-2xl bg-[#1A1614] border border-[#2D2723] p-6 sm:p-8 relative overflow-hidden group hover:border-[#D4AF37]/30 transition-all shadow-xl"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-center justify-between gap-4 mb-4">
            <span className="text-[#D4AF37] text-xs font-mono uppercase tracking-widest font-semibold flex items-center gap-1.5">
              <GraduationCap size={16} /> Academic & Candidacy Snapshot
            </span>
            <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Immediate Availability
            </span>
          </div>

          <h2 className="text-2xl font-serif text-[#FDFBF7] mb-2">B.E. in Electronics & Communication Engineering</h2>
          <p className="text-[#B5B0A1] font-sans text-sm mb-6">
            HKBK College of Engineering, Bangalore (Graduating Class of 2026)
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-[#2D2723]">
            <div className="bg-[#0F0C0A] p-3.5 rounded-xl border border-[#2D2723]">
              <span className="text-[10px] text-[#B5B0A1] uppercase tracking-wider block font-medium">Cumulative GPA</span>
              <span className="text-xl sm:text-2xl font-serif text-[#D4AF37] font-bold">8.71 / 10</span>
            </div>
            <div className="bg-[#0F0C0A] p-3.5 rounded-xl border border-[#2D2723]">
              <span className="text-[10px] text-[#B5B0A1] uppercase tracking-wider block font-medium">Primary Focus</span>
              <span className="text-sm font-sans text-[#FDFBF7] font-semibold mt-1 block">AI & Systems</span>
            </div>
            <div className="col-span-2 sm:col-span-1 bg-[#0F0C0A] p-3.5 rounded-xl border border-[#2D2723]">
              <span className="text-[10px] text-[#B5B0A1] uppercase tracking-wider block font-medium">Target Roles</span>
              <span className="text-xs font-sans text-[#FDFBF7] font-medium mt-1 block">AI/ML Dev, Backend Eng</span>
            </div>
          </div>
        </motion.div>

        {/* CARD 2: Hard Production Metrics (Spans 1 col) */}
        <motion.div 
          variants={cardVariants}
          className="rounded-2xl bg-[#1A1614] border border-[#2D2723] p-6 sm:p-8 flex flex-col justify-between hover:border-[#D4AF37]/30 transition-all shadow-xl relative overflow-hidden"
        >
          <div>
            <span className="text-[#D4AF37] text-xs font-mono uppercase tracking-widest font-semibold flex items-center gap-1.5 mb-4">
              <Cpu size={16} /> Engineering Metrics
            </span>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-xs text-[#B5B0A1]">Recommendation Model</span>
                  <span className="text-lg font-serif text-[#D4AF37] font-bold">89.2%</span>
                </div>
                <p className="text-[11px] text-[#B5B0A1]/80 leading-snug">
                  Neural Collaborative Filtering trained on 100,000 dataset entries.
                </p>
              </div>

              <div className="pt-3 border-t border-[#2D2723]">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-xs text-[#B5B0A1]">Backend Systems</span>
                  <span className="text-sm font-serif text-[#FDFBF7] font-bold">Django REST</span>
                </div>
                <p className="text-[11px] text-[#B5B0A1]/80 leading-snug">
                  Automated cost calculation pipeline combining labor & component tariffs.
                </p>
              </div>

              <div className="pt-3 border-t border-[#2D2723]">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-xs text-[#B5B0A1]">Audio ML Pipeline</span>
                  <span className="text-sm font-serif text-[#FDFBF7] font-bold">MFCC Extraction</span>
                </div>
                <p className="text-[11px] text-[#B5B0A1]/80 leading-snug">
                  Spectrogram acoustic signal preprocessing for speech emotion classification.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CARD 3: Industry Experience (Spans 2 cols) */}
        <motion.div 
          variants={cardVariants}
          className="md:col-span-2 rounded-2xl bg-[#1A1614] border border-[#2D2723] p-6 sm:p-8 hover:border-[#D4AF37]/30 transition-all shadow-xl"
        >
          <span className="text-[#D4AF37] text-xs font-mono uppercase tracking-widest font-semibold flex items-center gap-1.5 mb-6">
            <Briefcase size={16} /> Industry Experience (2 Roles)
          </span>

          <div className="space-y-6">
            {experience.map((job, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 pb-5 last:pb-0 border-b last:border-b-0 border-[#2D2723]">
                <div>
                  <h3 className="text-base font-serif text-[#FDFBF7] font-bold">{job.title}</h3>
                  <p className="text-xs text-[#D4AF37] font-medium mb-2">{job.company}</p>
                  <ul className="space-y-1 text-xs text-[#B5B0A1]">
                    {job.description.slice(0, 2).map((item, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-[#D4AF37] mt-0.5 text-[10px]">▹</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <span className="text-[11px] font-mono text-[#B5B0A1] shrink-0 font-medium sm:text-right">
                  {job.date}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CARD 4: Technical Arsenal (Spans 1 col) */}
        <motion.div 
          variants={cardVariants}
          className="rounded-2xl bg-[#1A1614] border border-[#2D2723] p-6 sm:p-8 hover:border-[#D4AF37]/30 transition-all shadow-xl"
        >
          <span className="text-[#D4AF37] text-xs font-mono uppercase tracking-widest font-semibold flex items-center gap-1.5 mb-5">
            <Sparkles size={16} /> Vetted Tech Stack
          </span>

          <div className="space-y-4">
            <div>
              <span className="text-[10px] text-[#B5B0A1] uppercase tracking-wider block font-semibold mb-2">Languages & DB</span>
              <div className="flex flex-wrap gap-1.5">
                {["Python", "SQL", "MySQL", "MongoDB", "C"].map((s) => (
                  <span key={s} className="px-2.5 py-1 bg-[#0F0C0A] border border-[#2D2723] text-[#FDFBF7] text-[11px] rounded-md font-sans">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[10px] text-[#B5B0A1] uppercase tracking-wider block font-semibold mb-2">Frameworks & Backend</span>
              <div className="flex flex-wrap gap-1.5">
                {["Django", "Django REST", "REST APIs"].map((s) => (
                  <span key={s} className="px-2.5 py-1 bg-[#0F0C0A] border border-[#2D2723] text-[#D4AF37] text-[11px] rounded-md font-sans">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[10px] text-[#B5B0A1] uppercase tracking-wider block font-semibold mb-2">ML, Deep Learning & Math</span>
              <div className="flex flex-wrap gap-1.5">
                {["TensorFlow", "Keras", "PyTorch", "scikit-learn", "NumPy", "Pandas"].map((s) => (
                  <span key={s} className="px-2.5 py-1 bg-[#0F0C0A] border border-[#2D2723] text-[#FDFBF7] text-[11px] rounded-md font-sans">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[10px] text-[#B5B0A1] uppercase tracking-wider block font-semibold mb-2">Cloud & Tooling</span>
              <div className="flex flex-wrap gap-1.5">
                {["AWS (EC2, S3)", "Git"].map((s) => (
                  <span key={s} className="px-2.5 py-1 bg-[#0F0C0A] border border-[#2D2723] text-[#B5B0A1] text-[11px] rounded-md font-sans">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* CARD 5: Verified Certifications (Spans 2 cols) */}
        <motion.div 
          variants={cardVariants}
          className="md:col-span-2 rounded-2xl bg-[#1A1614] border border-[#2D2723] p-6 sm:p-8 hover:border-[#D4AF37]/30 transition-all shadow-xl"
        >
          <span className="text-[#D4AF37] text-xs font-mono uppercase tracking-widest font-semibold flex items-center gap-1.5 mb-5">
            <Award size={16} /> Verified Credentials
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {certifications.slice(0, 4).map((cert, idx) => (
              <a
                key={idx}
                href={cert.pdfLink || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-[#0F0C0A] border border-[#2D2723] rounded-xl hover:border-[#D4AF37]/40 hover:bg-[#D4AF37]/5 transition-all group flex items-center justify-between"
              >
                <div>
                  <h4 className="text-xs font-serif text-[#FDFBF7] group-hover:text-[#D4AF37] transition-colors line-clamp-1">
                    {cert.title}
                  </h4>
                  <span className="text-[10px] text-[#B5B0A1] block font-sans mt-0.5">
                    {cert.issuer} • {cert.date}
                  </span>
                </div>
                <ExternalLink size={12} className="text-[#B5B0A1] group-hover:text-[#D4AF37] shrink-0 ml-2" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* CARD 6: Instant Recruiter Action Hub (Spans 1 col) */}
        <motion.div 
          variants={cardVariants}
          className="rounded-2xl bg-gradient-to-br from-[#1A1614] to-[#0F0C0A] border border-[#D4AF37]/30 p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative"
        >
          <div>
            <span className="text-[#D4AF37] text-xs font-mono uppercase tracking-widest font-semibold block mb-2">
              Action Hub
            </span>
            <h3 className="text-lg font-serif text-[#FDFBF7] mb-4">Direct Contact & Profiles</h3>
            
            <div className="space-y-2.5">
              <button
                onClick={handleCopyEmail}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-[#0F0C0A] border border-[#2D2723] hover:border-[#D4AF37]/50 text-xs text-[#FDFBF7] transition-all"
              >
                <span className="font-mono text-[11px] truncate">varunesarapu@gmail.com</span>
                <span className="text-[#D4AF37] shrink-0 ml-2">
                  {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                </span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href="https://www.linkedin.com/in/varunesarapu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 bg-[#0F0C0A] border border-[#2D2723] hover:border-[#D4AF37]/50 rounded-lg text-center text-xs text-[#B5B0A1] hover:text-[#FDFBF7] transition-all"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/Varun-Esarapu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 bg-[#0F0C0A] border border-[#2D2723] hover:border-[#D4AF37]/50 rounded-lg text-center text-xs text-[#B5B0A1] hover:text-[#FDFBF7] transition-all"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#2D2723]">
            <a
              href="/Varun_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#D4AF37] text-[#0F0C0A] rounded-xl font-bold uppercase tracking-wider text-xs hover:bg-[#FDFBF7] transition-all shadow-[0_0_15px_rgba(212,175,55,0.2)]"
            >
              <FileDown size={15} />
              <span>Download CV (PDF)</span>
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
