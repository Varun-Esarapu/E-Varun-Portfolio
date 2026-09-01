"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function GridPattern() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-20">
      {/* Horizontal lines */}
      <div className="absolute inset-0 flex flex-col justify-between">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`h-${i}`}
            className="w-full h-px bg-[#D4AF37]"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 0.1, scaleX: 1 }}
            transition={{ duration: 1.5, delay: i * 0.05, ease: "easeInOut" }}
          />
        ))}
      </div>
      
      {/* Vertical lines */}
      <div className="absolute inset-0 flex justify-between">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`v-${i}`}
            className="h-full w-px bg-[#D4AF37]"
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 0.1, scaleY: 1 }}
            transition={{ duration: 1.5, delay: i * 0.05, ease: "easeInOut" }}
          />
        ))}
      </div>
      
      {/* Animated nodes at intersections (random sampling) */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => {
          const top = Math.random() * 100;
          const left = Math.random() * 100;
          return (
            <motion.div
              key={`node-${i}`}
              className="absolute w-1 h-1 rounded-full bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]"
              style={{ top: `${top}%`, left: `${left}%` }}
              animate={{ 
                opacity: [0, 0.8, 0],
                scale: [0, 1.5, 0]
              }}
              transition={{ 
                duration: Math.random() * 3 + 2, 
                repeat: Infinity, 
                delay: Math.random() * 5 
              }}
            />
          );
        })}
      </div>
      
      {/* Vignette to fade out edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#0F0C0A_80%)]" />
    </div>
  );
}
