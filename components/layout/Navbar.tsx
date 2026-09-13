"use client";

import { motion, useScroll, useSpring, animate } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const [active, setActive] = useState("intro");
  
  // THE FIX: A silent reference to track if the user clicked a button
  const isClickScrolling = useRef(false); 
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const navItems = [
    { name: "Intro", id: "intro" },
    { name: "About", id: "about" },
    { name: "Skills", id: "skills" },
    { name: "Experience", id: "experience" },
    { name: "Works", id: "projects" },
    { name: "Say Hello", id: "contact" }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // THE FIX: Only move the pill if the user is scrolling manually (not via click)
          if (entry.isIntersecting && !isClickScrolling.current) {
            setActive(entry.target.id);
            window.history.replaceState(null, '', `#${entry.target.id}`);
          }
        });
      },
      { 
        rootMargin: "-40% 0px -60% 0px" 
      }
    );

    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    isClickScrolling.current = true; // Lock the observer
    setActive(id);
    
    // Automatically switch back to full narrative mode if in recruiter mode
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("exit-recruiter-mode"));
    }

    const element = document.getElementById(id);
    
    if (element) {
      const offset = 30; 
      const targetPosition = element.getBoundingClientRect().top + window.scrollY - offset;

      animate(window.scrollY, targetPosition, {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (latest) => window.scrollTo(0, latest),
        onComplete: () => {
          window.history.pushState(null, '', `#${id}`);
          // THE FIX: Unlock the observer 50ms after the scroll completely finishes
          setTimeout(() => {
            isClickScrolling.current = false;
          }, 50);
        }
      });
    }
  };

  return (
    <>
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-[#D4AF37] origin-left z-[100]" 
        style={{ scaleX }} 
      />

      <motion.div 
        initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.8 }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
      >
        <nav className="flex items-center gap-1 md:gap-2 p-1.5 bg-[#0F0C0A]/80 backdrop-blur-xl border border-[#2D2723] rounded-full shadow-2xl">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`relative px-4 md:px-6 py-2.5 rounded-full text-[10px] md:text-xs font-bold tracking-[0.15em] uppercase transition-colors z-10 ${
                active === item.id ? "text-[#0F0C0A]" : "text-[#B5B0A1] hover:text-[#FDFBF7]"
              }`}
            >
              {active === item.id && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-[#D4AF37] rounded-full -z-10 shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-20">{item.name}</span>
            </button>
          ))}
        </nav>
      </motion.div>
    </>
  );
}