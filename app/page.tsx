"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import Projects from "@/components/sections/Projects";
import Certifications from "@/components/sections/Certifications";
import Contact from "@/components/sections/Contact";
import RecruiterHUD from "@/components/ui/RecruiterHUD";
import { Briefcase, Eye, Sparkles } from "lucide-react";

export default function Home() {
  const [isRecruiterMode, setIsRecruiterMode] = useState(false);

  useEffect(() => {
    const handleExit = () => setIsRecruiterMode(false);
    window.addEventListener("exit-recruiter-mode", handleExit);
    window.addEventListener("hashchange", handleExit);
    return () => {
      window.removeEventListener("exit-recruiter-mode", handleExit);
      window.removeEventListener("hashchange", handleExit);
    };
  }, []);

  return (
    <>
      {/* Floating Recruiter Mode Toggle Switch (BDSN Minimal Pill) */}
      <div className="fixed top-5 right-4 sm:right-8 z-40">
        <button
          onClick={() => setIsRecruiterMode(!isRecruiterMode)}
          className={`flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-sans font-medium tracking-tight backdrop-blur-md transition-all duration-200 shadow-xs border cursor-pointer select-none active:scale-[0.98] ${
            isRecruiterMode
              ? "bg-[#000000] !text-white border-[#000000]"
              : "bg-white/95 !text-[#000000] hover:bg-[#F7F7F7] border-[#E5E7EB]"
          }`}
          title="Toggle 60-Second Executive Recruiter Mode"
        >
          {isRecruiterMode ? (
            <Eye size={13} className="!text-white" />
          ) : (
            <Briefcase size={13} className="text-[#000000]" />
          )}
          <span className="hidden sm:inline">
            {isRecruiterMode ? "Exit 60s Scan" : "Recruiter 60s Scan"}
          </span>
          <span className="sm:hidden">
            {isRecruiterMode ? "Full" : "60s"}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
        </button>
      </div>

      {/* Main Viewport Content */}
      <AnimatePresence mode="wait">
        {isRecruiterMode ? (
          <motion.div
            key="recruiter-hud"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <RecruiterHUD onExit={() => setIsRecruiterMode(false)} />
          </motion.div>
        ) : (
          <motion.div
            key="narrative-portfolio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="max-w-5xl mx-auto w-full"
          >
            <Hero />
            <About />
            <Projects />
            <Experience />
            <Skills />
            <Education />
            <Certifications />
            <Contact />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
