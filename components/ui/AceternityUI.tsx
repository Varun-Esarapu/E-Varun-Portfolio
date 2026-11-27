"use client";

import React from "react";
import { motion } from "framer-motion";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "green" | "lime" | "black" | "muted" | "white";
  className?: string;
  dot?: boolean;
}

export function Badge({
  children,
  variant = "green",
  className = "",
}: BadgeProps) {
  const variantStyles = {
    green: "bg-[#ADFA1D] !text-[#0A0A0A] font-semibold border border-[#ADFA1D]/40",
    lime: "bg-[#ADFA1D] !text-[#0A0A0A] font-semibold border border-[#ADFA1D]/40",
    black: "bg-[#000000] !text-white font-medium border border-[#000000]",
    muted: "bg-[#F7F7F7] !text-[#6B7280] border border-[#E5E7EB] font-medium",
    white: "bg-white !text-[#000000] border border-[#E5E7EB] font-medium shadow-2xs",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-sans tracking-tight transition-all select-none ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

// Clean Editorial Button (BDSN Club & Minimal Palette: Black, White, Green)
export function ShimmerButton({
  children,
  onClick,
  href,
  className = "",
  variant = "primary",
  target,
  rel,
}: {
  children: React.ReactNode;
  onClick?: (e: any) => void;
  href?: string;
  className?: string;
  variant?: "primary" | "secondary" | "accent" | "outline";
  target?: string;
  rel?: string;
}) {
  const baseClasses =
    "relative inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 h-[48px] sm:h-[50px] rounded-full text-sm font-sans font-medium tracking-tight transition-all duration-200 cursor-pointer select-none active:scale-[0.98]";

  const variantClasses = {
    // BDSN Club solid architectural black CTA with crisp white text
    primary:
      "bg-[#000000] hover:bg-[#1D1D1F] !text-white shadow-xs hover:shadow-md border border-[#000000]",
    // Clean crisp white button with black text and subtle border
    secondary:
      "bg-[#FFFFFF] hover:bg-[#F7F7F7] !text-[#000000] border border-[#E5E7EB] shadow-2xs",
    // Vibrant Green accent
    accent:
      "bg-[#ADFA1D] hover:bg-[#9ee016] !text-[#0A0A0A] shadow-xs font-semibold border border-[#ADFA1D]",
    // Subtle transparent outline
    outline:
      "bg-transparent hover:bg-[#F3F4F6] !text-[#000000] border border-[#E5E7EB]",
  };

  const content = <span className="flex items-center gap-2">{children}</span>;

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        target={target}
        rel={rel}
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {content}
    </button>
  );
}

// Section Header with Clean Minimal Editorial Hierarchy (BDSN Club inspired)
export function SectionHeading({
  number,
  title,
  subtitle,
  className = "",
}: {
  number?: string;
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={`mb-12 md:mb-16 ${className}`}>
      <div className="flex items-center gap-2.5 mb-3">
        {number && (
          <span className="font-sans text-xs text-[#0A0A0A] bg-[#ADFA1D] px-2 py-0.5 rounded-full font-bold border border-[#ADFA1D]/40">
            {number}
          </span>
        )}
        {subtitle && (
          <span className="font-sans text-xs uppercase tracking-[0.15em] text-[#6B7280] font-semibold">
            {subtitle}
          </span>
        )}
      </div>
      <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#000000]">
        {title}
      </h2>
    </div>
  );
}
