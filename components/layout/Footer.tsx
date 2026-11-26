"use client";

import { useState, useEffect } from "react";
import { ArrowUp, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour12: true,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }) + " IST"
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-[#E5E7EB] pt-20 pb-12 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        
        {/* Top 4-Column Navigation & Meta Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 font-sans">
          {/* Col 1: Identity & Location */}
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-[#6B7280] block mb-4 font-semibold">
              Location
            </span>
            <p className="text-sm font-sans font-medium text-[#212121] leading-relaxed">
              Bangalore, Karnataka <br />
              India (560045)
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span className="font-mono text-xs text-[#000000] font-medium">
                {time || "Bangalore, India"}
              </span>
            </div>
          </div>

          {/* Col 2: Fast Navigation */}
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-[#6B7280] block mb-4 font-semibold">
              Navigation
            </span>
            <ul className="space-y-2 text-sm text-[#212121] font-medium">
              {["intro", "about", "projects", "experience", "skills", "education", "contact"].map((sec) => (
                <li key={sec}>
                  <a
                    href={`#${sec}`}
                    className="hover:underline underline-offset-4 capitalize text-[#212121] hover:text-[#10B981] transition-colors"
                  >
                    {sec}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Focus Areas */}
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-[#6B7280] block mb-4 font-semibold">
              Focus & Systems
            </span>
            <ul className="space-y-2 text-sm text-[#6B7280]">
              <li>Agentic Multi-Hop RAG</li>
              <li>Distributed PySpark MLlib</li>
              <li>Low-Latency REST APIs</li>
              <li>Hardware & Edge Optimization</li>
              <li>Django / FastAPI Architectures</li>
            </ul>
          </div>

          {/* Col 4: Verified Profiles & Top Action */}
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-[#6B7280] block mb-4 font-semibold">
              Verified Profiles
            </span>
            <ul className="space-y-2 text-sm text-[#212121] font-medium">
              <li>
                <a
                  href="https://www.linkedin.com/in/varunesarapu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:underline underline-offset-4 hover:text-[#10B981]"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight size={13} />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Varun-Esarapu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:underline underline-offset-4 hover:text-[#10B981]"
                >
                  <span>GitHub</span>
                  <ArrowUpRight size={13} />
                </a>
              </li>
              <li>
                <a
                  href="/Varun_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:underline underline-offset-4 hover:text-[#10B981]"
                >
                  <span>Download CV</span>
                  <ArrowUpRight size={13} />
                </a>
              </li>
            </ul>

            <div className="mt-6">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F7F7F7] hover:bg-[#E5E7EB] text-[#212121] border border-[#E5E7EB] text-xs font-sans font-medium transition-colors cursor-pointer"
              >
                <span>Return to Top</span>
                <ArrowUp size={13} />
              </button>
            </div>
          </div>
        </div>

        {/* Guaranteed 100% Fully Visible Wordmark: Vector SVG ensures zero clipping on ANY device */}
        <div className="pt-10 border-t border-[#E5E7EB] select-none w-full flex items-center justify-center">
          <svg
            viewBox="0 0 1200 135"
            className="w-full h-auto max-h-[160px] text-[#212121]"
            fill="currentColor"
            role="img"
            aria-label="ESARAPU VARUN"
          >
            <text
              x="50%"
              y="50%"
              dominantBaseline="central"
              textAnchor="middle"
              fontSize="120"
              fontWeight="800"
              letterSpacing="-0.04em"
              className="font-heading uppercase tracking-tight select-none"
            >
              ESARAPU VARUN
            </text>
          </svg>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#6B7280] gap-3">
          <span>Copyright © {new Date().getFullYear()} Esarapu Varun. Engineered for scale.</span>
          <div className="flex items-center gap-4">
            <span>Bangalore, KA</span>
            <span>•</span>
            <span className="text-[#212121] font-medium">Full-Time Available</span>
          </div>
        </div>

      </div>
    </footer>
  );
}