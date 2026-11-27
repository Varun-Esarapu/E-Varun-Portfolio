"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, animate } from "framer-motion";
import { ShimmerButton } from "@/components/ui/AceternityUI";
import { ArrowUpRight, FileText, Sparkles, MapPin, GraduationCap, Briefcase, Code2, Film, Box } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import 3D Caricature Model for SSR safety
const CaricatureModel = dynamic(() => import("@/components/3d/CaricatureModel"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[460px] sm:h-[520px] flex flex-col items-center justify-center bg-transparent">
      <div className="w-8 h-8 rounded-full border-2 border-[#000000]/20 border-t-[#000000] animate-spin mb-3" />
      <span className="text-xs font-mono text-[#6B7280]">INITIALIZING 3D SCENE...</span>
    </div>
  ),
});

export default function Hero() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [displayMode, setDisplayMode] = useState<"video" | "3d">("video");
  const videoRef = useRef<HTMLVideoElement>(null);
  const fullText1 = "Architecting the ";
  const fullText2 = "intelligence layer.";

  const handleVideoReplay = () => {
    if (videoRef.current && videoRef.current.ended) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let currentIndex1 = 0;
    let currentIndex2 = 0;

    const type = () => {
      if (currentIndex1 < fullText1.length) {
        setText1(fullText1.slice(0, currentIndex1 + 1));
        currentIndex1++;
        timeout = setTimeout(type, 40);
      } else if (currentIndex2 < fullText2.length) {
        setText2(fullText2.slice(0, currentIndex2 + 1));
        currentIndex2++;
        timeout = setTimeout(type, 40);
      }
    };

    timeout = setTimeout(type, 300);
    return () => clearTimeout(timeout);
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);

    if (element) {
      if (typeof window !== "undefined" && (window as any).__lenis) {
        (window as any).__lenis.scrollTo(element, { offset: -60, duration: 1.2 });
        window.history.pushState(null, "", `#${id}`);
      } else {
        const offset = 60;
        const targetPosition =
          element.getBoundingClientRect().top + window.scrollY - offset;

        animate(window.scrollY, targetPosition, {
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
          onUpdate: (latest) => window.scrollTo(0, latest),
          onComplete: () => {
            window.history.pushState(null, "", `#${id}`);
          },
        });
      }
    }
  };

  return (
    <section
      id="intro"
      className="relative flex flex-col justify-center px-4 sm:px-8 pt-32 md:pt-36 pb-20 border-b border-[#E5E7EB] min-h-[92vh]"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* BDSN Club & Editorial Dual-Stage Responsive Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Column 1: Typography, Narrative & Actions (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Top Status Pill: Clean White, Green Dot, Black Text */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F7F7F7] border border-[#E5E7EB] text-xs font-sans text-[#000000] font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-[#5CA904] animate-pulse" />
              <span>Available for Full-Time Roles</span>
              <span className="text-[#D1D5DB]">•</span>
              <span className="text-[#6B7280]">Bangalore, KA</span>
            </div>

            {/* Display Headline with BDSN Club Scale */}
            <div className="relative mb-6 min-h-[110px] sm:min-h-[140px] w-full">
              <h1 className="text-4xl sm:text-5xl lg:text-[56px] leading-[1.08] font-heading font-semibold text-[#000000] tracking-[-0.035em] select-none opacity-0 pointer-events-none">
                Architecting the <br />
                intelligence layer.
              </h1>

              <h1 className="absolute top-0 left-0 text-4xl sm:text-5xl lg:text-[56px] leading-[1.08] font-heading font-semibold text-[#000000] tracking-[-0.035em]">
                {text1}
                {text1 === fullText1 && <br />}
                <span>{text2}</span>
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.7, ease: "linear" }}
                  className="inline-block w-[3px] h-[0.85em] bg-[#000000] ml-1.5 align-baseline"
                />
              </h1>
            </div>

            {/* Lead Copy */}
            <p className="font-sans text-[#6B7280] text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
              Specializing in production <span className="text-[#000000] font-medium">agentic retrieval pipelines</span> (LangGraph), distributed <span className="text-[#000000] font-medium">PySpark architectures</span>, and low-latency API microservices.
            </p>

            {/* BDSN Club Action Buttons (Solid Black + Clean White) */}
            <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto mb-10">
              <ShimmerButton
                variant="primary"
                href="#projects"
                onClick={(e) => handleScroll(e, "projects")}
              >
                <span className="!text-white font-medium">Explore Selected Work</span>
                <ArrowUpRight size={15} className="!text-white" />
              </ShimmerButton>

              <ShimmerButton
                variant="secondary"
                href="/Varun_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FileText size={15} className="text-[#6B7280]" />
                <span className="!text-[#000000] font-medium">Download Resume (PDF)</span>
              </ShimmerButton>
            </div>

            {/* Candidate Metadata Summary Strip */}
            <div className="w-full pt-6 border-t border-[#E5E7EB] grid grid-cols-2 sm:grid-cols-3 gap-4 text-left">
              <div>
                <span className="text-[11px] font-mono uppercase text-[#6B7280] block mb-0.5">
                  Current Role
                </span>
                <span className="text-xs font-sans font-semibold text-[#000000] block">
                  Jr. AI & ML Engineer
                </span>
                <span className="text-[11px] text-[#6B7280]">D Square Consulting Services</span>
              </div>

              <div>
                <span className="text-[11px] font-mono uppercase text-[#6B7280] block mb-0.5">
                  Academic Record
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-sans font-semibold text-[#000000]">
                    B.E. Graduate
                  </span>
                  <span className="px-1.5 py-0.2 rounded bg-[#5CA904]/15 text-[#488603] border border-[#5CA904]/25 font-mono text-[10px] font-bold">
                    8.71
                  </span>
                </div>
                <span className="text-[11px] text-[#6B7280]">ECE Specialization</span>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <span className="text-[11px] font-mono uppercase text-[#6B7280] block mb-0.5">
                  Core Stack
                </span>
                <span className="text-xs font-mono text-[#000000]">
                  PyTorch • LangGraph • Spark
                </span>
              </div>
            </div>
          </motion.div>

          {/* Column 2: Editorial Portrait / 3D Avatar Exhibition Stage (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 w-full flex flex-col items-center justify-center relative"
          >
            {/* Subtle soft backdrop glow */}
            <div className="absolute inset-0 bg-radial from-[#F3F4F6]/80 via-transparent to-transparent pointer-events-none rounded-full scale-125 -z-10" />

            {/* Mode Switcher Pill */}
            <div className="flex items-center gap-1 p-1 rounded-full bg-white/95 backdrop-blur-md border border-[#E5E7EB] shadow-2xs mb-4 z-20">
              <button
                onClick={() => setDisplayMode("video")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-sans font-medium transition-all cursor-pointer ${
                  displayMode === "video"
                    ? "bg-[#000000] text-white shadow-xs"
                    : "text-[#6B7280] hover:text-[#000000]"
                }`}
              >
                <Film size={12} />
                <span>Studio Portrait</span>
              </button>
              <button
                onClick={() => setDisplayMode("3d")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-sans font-medium transition-all cursor-pointer ${
                  displayMode === "3d"
                    ? "bg-[#000000] text-white shadow-xs"
                    : "text-[#6B7280] hover:text-[#000000]"
                }`}
              >
                <Box size={12} />
                <span>3D Interactive</span>
              </button>
            </div>

            {/* Dynamic Stage View */}
            <AnimatePresence mode="wait">
              {displayMode === "video" ? (
                <motion.div
                  key="video-portrait"
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full max-w-[360px] sm:max-w-[400px] aspect-[4/5] rounded-[32px] overflow-hidden border border-[#262626] bg-[#0A0A0B] shadow-[0_24px_50px_-15px_rgba(0,0,0,0.14)] group cursor-pointer"
                  onMouseEnter={handleVideoReplay}
                  onClick={handleVideoReplay}
                >
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    preload="auto"
                    poster="/varun_hero_poster.jpg"
                    className="w-full h-full object-cover select-none"
                  >
                    <source src="/varun_hero_portrait.mp4" type="video/mp4" />
                  </video>

                  {/* Top Status Tag */}
                  <div className="absolute top-4 left-4 z-10 pointer-events-none">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-sans font-medium text-white/90 shadow-2xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#5CA904] animate-pulse" />
                      Editorial Studio Cut
                    </span>
                  </div>

                  {/* Bottom subtle aesthetic vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-sans text-white z-10 pointer-events-none">
                    <span className="font-medium text-white/95 drop-shadow-xs">Esarapu Varun</span>
                    <span className="font-mono text-[11px] text-white/70 uppercase">AI & Systems</span>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="3d-avatar"
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-[460px] sm:h-[530px] relative"
                >
                  <CaricatureModel />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
}