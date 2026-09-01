"use client";

import { motion } from "framer-motion";
import React, { useRef, useState } from "react";

export default function MagneticButton({
  children,
  className = "",
  onClick,
  href,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: any) => void;
  href?: string;
  [key: string]: any;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.15, y: middleY * 0.15 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const content = (
    <motion.div
      ref={ref}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      className={`relative inline-flex items-center justify-center cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} onClick={onClick} className="inline-block" target={href.endsWith('.pdf') ? "_blank" : undefined} rel={href.endsWith('.pdf') ? "noopener noreferrer" : undefined}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className="inline-block border-none bg-transparent p-0 m-0">
      {content}
    </button>
  );
}
