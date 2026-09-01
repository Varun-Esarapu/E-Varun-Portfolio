"use client";

import { useState, useEffect } from "react";
import { motion, animate } from "framer-motion";
import GridPattern from "@/components/ui/GridPattern";

export default function Hero() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const fullText1 = "Building the ";
  const fullText2 = "future of AI.";

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let currentIndex1 = 0;
    let currentIndex2 = 0;

    const type = () => {
      if (currentIndex1 < fullText1.length) {
        setText1(fullText1.slice(0, currentIndex1 + 1));
        currentIndex1++;
        timeout = setTimeout(type, 60);
      } else if (currentIndex2 < fullText2.length) {
        setText2(fullText2.slice(0, currentIndex2 + 1));
        currentIndex2++;
        timeout = setTimeout(type, 60);
      }
    };

    timeout = setTimeout(type, 800); // Wait for initial fade in
    return () => clearTimeout(timeout);
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    
    if (element) {
      const offset = 30; // Matches the exact offset from your Navbar
      const targetPosition = element.getBoundingClientRect().top + window.scrollY - offset;

      animate(window.scrollY, targetPosition, {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // The exact cinematic easing curve
        onUpdate: (latest) => window.scrollTo(0, latest),
        onComplete: () => {
          window.history.pushState(null, '', `#${id}`);
        }
      });
    }
  };

  return (
    <section id="intro" className="relative flex flex-col justify-center px-4 sm:px-8 pt-40 pb-20 border-b border-[#D4AF37]/10 min-h-[85vh] overflow-hidden">
      
      {/* Ambient Neural Network Glow & Grid */}
      <GridPattern />
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div 
          animate={{ x: [0, 30, 0], y: [0, -50, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] bg-[#D4AF37]/5 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ x: [0, -40, 0], y: [0, 40, 0], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[10%] right-[10%] w-[35vw] h-[35vw] bg-[#C9A66B]/5 rounded-full blur-[100px]"
        />
      </div>

      {/* THE FIX: Added 'relative z-10' to keep your text above the glow */}
      <div className="relative z-10 max-w-4xl mx-auto w-full">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" }}>
          
          <div className="flex items-center mb-6">
            <div className="w-10 h-[2px] bg-[#D4AF37] mr-4"></div>
            <span className="text-[#D4AF37] text-xs tracking-[0.25em] uppercase font-sans font-bold">
              Esarapu Varun
            </span>
          </div>

          <div className="relative mb-8 min-h-[120px] sm:min-h-[144px] lg:min-h-[168px]">
            {/* Invisible placeholder to prevent layout shifts */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl leading-[1.05] font-serif tracking-tight opacity-0 pointer-events-none select-none">
              Building the <br />
              future of AI.
            </h1>
            
            {/* Typing text */}
            <h1 className="absolute top-0 left-0 text-5xl sm:text-6xl lg:text-7xl leading-[1.05] font-serif text-[#FDFBF7] tracking-tight">
              {text1}
              {text1 === fullText1 && <br />}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#D4AF37] to-[#C9A66B]">
                {text2}
              </span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                className="inline-block w-[3px] h-[0.8em] bg-[#D4AF37] ml-2 align-baseline"
              />
            </h1>
          </div>
          
          <p className="font-sans text-[#B5B0A1] text-base md:text-lg tracking-wide leading-relaxed max-w-2xl mb-10">
            Engineering scalable backend systems, intelligent machine learning models, and robust digital architecture.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* PRIMARY: Ghost Gold to Solid Gold */}
            <a 
              href="#projects" 
              onClick={(e) => handleScroll(e, 'projects')}
              className="inline-block bg-transparent border border-[#D4AF37]/50 text-[#D4AF37] font-bold tracking-[0.15em] uppercase text-xs px-10 py-5 rounded-md hover:bg-[#D4AF37] hover:text-[#0F0C0A] transition-all duration-300 text-center shadow-[0_0_15px_rgba(212,175,55,0.05)] hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]"
            >
              View Work
            </a>
            {/* SECONDARY: Dark to Silver/White (No Gold!) */}
            <a 
              href="/Varun_CV.pdf" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-block bg-transparent border border-[#2D2723] text-[#B5B0A1] font-bold tracking-[0.15em] uppercase text-xs px-10 py-5 rounded-md hover:border-[#B5B0A1]/50 hover:text-[#FDFBF7] transition-all duration-300 text-center"
            >
              Download CV
            </a>
          </div>

          {/* Social Icons inside Hero Section */}
          <div className="mt-16 flex gap-6 items-center text-[#B5B0A1]">
            <a 
              href="https://www.linkedin.com/in/varunesarapu/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-[#D4AF37] hover:-translate-y-1 transition-all duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect width="4" height="12" x="2" y="9"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
            <a 
              href="https://github.com/Varun-Esarapu" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-[#D4AF37] hover:-translate-y-1 transition-all duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"/>
                <path d="M9 18c-4.51 2-5-2-7-2"/>
              </svg>
            </a>
          </div>

        </motion.div>
      </div>
    </section>
  );
}