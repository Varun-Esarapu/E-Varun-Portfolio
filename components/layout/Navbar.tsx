"use client";

import { motion, useScroll, useSpring, animate } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const [active, setActive] = useState("intro");
  const isClickScrolling = useRef(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  const navItems = [
    { name: "Intro", id: "intro" },
    { name: "About", id: "about" },
    { name: "Works", id: "projects" },
    { name: "Experience", id: "experience" },
    { name: "Skills", id: "skills" },
    { name: "Education", id: "education" },
    { name: "Contact", id: "contact" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isClickScrolling.current) {
            setActive(entry.target.id);
            window.history.replaceState(null, "", `#${entry.target.id}`);
          }
        });
      },
      {
        rootMargin: "-40% 0px -60% 0px",
      }
    );

    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    isClickScrolling.current = true;
    setActive(id);

    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("exit-recruiter-mode"));
    }

    const element = document.getElementById(id);

    if (element) {
      if (typeof window !== "undefined" && (window as any).__lenis) {
        (window as any).__lenis.scrollTo(element, { offset: -60, duration: 1.2 });
        window.history.pushState(null, "", `#${id}`);
        setTimeout(() => {
          isClickScrolling.current = false;
        }, 1200);
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
            setTimeout(() => {
              isClickScrolling.current = false;
            }, 50);
          },
        });
      }
    }
  };

  return (
    <>
      {/* Top fluid Emerald Green scroll progress line */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-[#5CA904] origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* Floating BDSN Club Minimal Pill Bar */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-5 left-1/2 -translate-x-1/2 z-50 max-w-[94vw]"
      >
        <nav className="flex items-center gap-1 p-1.5 bg-white/95 backdrop-blur-md border border-[#E5E7EB] rounded-full shadow-[0_10px_30px_-5px_rgba(0,0,0,0.06)]">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`relative px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-sans font-medium tracking-tight transition-colors duration-200 z-10 select-none cursor-pointer ${
                active === item.id
                  ? "!text-white font-semibold"
                  : "text-[#6B7280] hover:text-[#000000]"
              }`}
            >
              {active === item.id && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-[#000000] rounded-full -z-10 shadow-xs"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-20 flex items-center gap-1.5">
                {active === item.id && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                )}
                {item.name}
              </span>
            </button>
          ))}
        </nav>
      </motion.header>
    </>
  );
}