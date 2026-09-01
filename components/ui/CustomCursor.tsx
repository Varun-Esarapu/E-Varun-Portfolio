"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only run on desktop/devices with a mouse
    const matchMedia = window.matchMedia("(pointer: fine)");
    if (!matchMedia.matches) return;

    setIsVisible(true);

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if we are hovering over an interactive element
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (pointer: fine) {
          * { cursor: none !important; }
        }
      `}} />
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          width: 16,
          height: 16,
          borderRadius: "50%",
          backgroundColor: isHovering ? "transparent" : "#D4AF37",
          border: isHovering ? "1.5px solid #D4AF37" : "none",
        }}
        animate={{
          x: mousePosition.x - (isHovering ? 24 : 8),
          y: mousePosition.y - (isHovering ? 24 : 8),
          scale: isHovering ? 3 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 800,
          damping: 35,
          mass: 0.1
        }}
      />
    </>
  );
}
