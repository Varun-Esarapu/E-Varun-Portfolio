"use client";

import { useState, useEffect, useRef } from "react";
import { motion, animate, useScroll, useTransform } from "framer-motion";
import { ShimmerButton } from "@/components/ui/AceternityUI";
import { ArrowUpRight, FileText } from "lucide-react";

export default function Hero() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fullText1 = "Architecting the ";
  const fullText2 = "intelligence layer.";

  // ScrollTrigger Floating Choreography:
  // Glides smoothly to top-right with 3D perspective and subtle dimming as user scrolls into About
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const floatY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const floatX = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const floatScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const floatRotateY = useTransform(scrollYProgress, [0, 1], [0, -10]);
  const floatRotateX = useTransform(scrollYProgress, [0, 1], [0, 6]);
  const floatOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.85, 0.35]);

  // Atmospheric Backlight: expands gently on scroll
  const auraScale = useTransform(scrollYProgress, [0, 1], [1, 1.45]);
  const auraOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.25]);

  const handleVideoReplay = () => {
    if (videoRef.current) {
      if (videoRef.current.ended) {
        videoRef.current.currentTime = 0;
      }
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
      ref={sectionRef}
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
            {/* Top Status Pill: Clean White, Black Text */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7F7F7] border border-[#E5E7EB] text-xs font-sans text-[#000000] font-medium mb-6">
              <span>Available for Full-Time Roles</span>
              <span className="text-[#D1D5DB]">•</span>
              <span className="text-[#6B7280]">Bangalore, KA</span>
            </div>

            {/* Display Headline with BDSN Club Scale */}
            <div className="mb-6 min-h-[110px] sm:min-h-[140px] w-full">
              <h1 className="text-4xl sm:text-5xl lg:text-[56px] leading-[1.18] sm:leading-[1.14] font-heading font-semibold text-[#000000] tracking-[-0.035em] select-text">
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
                <span className="text-[11px] font-sans font-medium uppercase tracking-wider text-[#6B7280] block mb-0.5">
                  Current Role
                </span>
                <span className="text-xs font-sans font-semibold text-[#000000] block">
                  Jr. AI & ML Engineer
                </span>
                <span className="text-[11px] text-[#6B7280]">D Square Consulting Services</span>
              </div>

              <div>
                <span className="text-[11px] font-sans font-medium uppercase tracking-wider text-[#6B7280] block mb-0.5">
                  Academic Record
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-sans font-semibold text-[#000000]">
                    B.E. Graduate
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#ADFA1D] text-[#0A0A0A] border border-[#ADFA1D]/40 font-sans text-[11px] font-bold">
                    8.71
                  </span>
                </div>
                <span className="text-[11px] text-[#6B7280]">ECE Specialization</span>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <span className="text-[11px] font-sans font-medium uppercase tracking-wider text-[#6B7280] block mb-0.5">
                  Core Stack
                </span>
                <span className="text-xs font-sans font-medium text-[#000000]">
                  PyTorch • LangGraph • Spark
                </span>
              </div>
            </div>
          </motion.div>

          {/* Column 2: Editorial Portrait Stage with 3D Perspective Floating Choreography */}
          <div
            style={{ perspective: 1200 }}
            className="lg:col-span-5 w-full flex flex-col items-center justify-center relative"
          >
            {/* Atmospheric Backlight (The Amaterasu Signature) - expands gently as you scroll */}
            <motion.div
              style={{ scale: auraScale, opacity: auraOpacity }}
              className="absolute -inset-10 sm:-inset-16 rounded-full bg-[radial-gradient(circle_at_center,rgba(253,230,138,0.22)_0%,rgba(16,185,129,0.15)_50%,transparent_75%)] blur-3xl pointer-events-none -z-10"
            />

            {/* Borderless Floating Portrait Container: seamlessly blends #F6F4EE, zero harsh border */}
            <motion.div
              style={{
                y: floatY,
                x: floatX,
                scale: floatScale,
                rotateY: floatRotateY,
                rotateX: floatRotateX,
                opacity: floatOpacity,
                transformStyle: "preserve-3d",
              }}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[360px] sm:max-w-[400px] aspect-[4/5] rounded-[32px] overflow-hidden bg-[#F6F4EE] shadow-[0_24px_50px_-15px_rgba(202,181,150,0.32)] group cursor-pointer select-none"
              onMouseEnter={handleVideoReplay}
              onClick={handleVideoReplay}
            >
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                preload="auto"
                poster="/varun_portrait_poster.jpg"
                className="w-full h-full object-cover select-none"
              >
                <source src="/varun_portrait.mp4" type="video/mp4" />
              </video>

              {/* Top Status Tag: Clean Alabaster Minimalist Pill */}
              <div className="absolute top-4 left-4 z-10 pointer-events-none">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-[#E5E7EB] text-[11px] font-sans font-medium text-[#0A0A0A] shadow-xs">
                  Editorial Studio Cut
                </span>
              </div>

              {/* Bottom subtle aesthetic blend */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#F6F4EE]/60 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-sans text-[#0A0A0A] z-10 pointer-events-none">
                <span className="font-semibold text-[#0A0A0A] drop-shadow-2xs">Esarapu Varun</span>
                <span className="font-sans text-[11px] font-medium text-[#555555] uppercase tracking-wider">AI & Systems</span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}