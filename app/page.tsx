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
import { Briefcase, Eye } from "lucide-react";

export default function Home() {
  const [isRecruiterMode, setIsRecruiterMode] = useState(false);

  // If recruiter clicks any navbar item, automatically exit Recruiter Mode
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
      {/* Floating Recruiter Mode Toggle Switch (Top-Right, completely independent of Navbar) */}
      <div className="fixed top-6 right-4 sm:right-8 z-40">
        <button
          onClick={() => setIsRecruiterMode(!isRecruiterMode)}
          className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full text-[11px] font-sans font-bold tracking-wider uppercase backdrop-blur-xl transition-all shadow-2xl border ${
            isRecruiterMode
              ? "bg-[#D4AF37] text-[#0F0C0A] border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.3)]"
              : "bg-[#0F0C0A]/85 text-[#B5B0A1] hover:text-[#D4AF37] border-[#2D2723] hover:border-[#D4AF37]/50"
          }`}
          title="Toggle 60-Second Executive Recruiter Mode"
        >
          {isRecruiterMode ? <Eye size={13} /> : <Briefcase size={13} />}
          <span className="hidden sm:inline">
            {isRecruiterMode ? "Full Portfolio" : "Recruiter 60s Scan"}
          </span>
          <span className="sm:hidden">
            {isRecruiterMode ? "Full" : "60s"}
          </span>
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
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <RecruiterHUD onExit={() => setIsRecruiterMode(false)} />
          </motion.div>
        ) : (
          <motion.div
            key="narrative-portfolio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto w-full"
          >
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Education />
            <Projects />
            <Certifications />
            <Contact />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}