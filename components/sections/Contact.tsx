"use client";

import { motion } from "framer-motion";
import { ShimmerButton, Badge } from "@/components/ui/AceternityUI";
import { Mail, ArrowUpRight, Copy, Check } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("varunesarapu@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="p-8 sm:p-14 md:p-16 text-center rounded-[32px] bg-[#F8F8F8] border border-[#EBEBEB] relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="inline-flex mb-5">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#10B981]/15 text-[#059669] border border-[#10B981]/30 font-sans text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                  Let's Collaborate
                </span>
              </div>

              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold text-[#0A0A0A] tracking-[-0.04em] mb-5 leading-tight">
                Ready to build scalable <br className="hidden sm:inline" />
                AI architectures together?
              </h2>

              <p className="font-sans text-[#6F6F6F] text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
                I am actively evaluating full-time AI/ML, backend engineering, and systems development opportunities. Whether you want to discuss my neural network pipelines or explore an open role, I'd love to connect.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-10">
                <ShimmerButton
                  variant="primary"
                  href="mailto:varunesarapu@gmail.com"
                >
                  <Mail size={15} className="!text-white" />
                  <span className="!text-white font-medium">Send Direct Email</span>
                </ShimmerButton>

                <button
                  onClick={handleCopyEmail}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 h-[48px] sm:h-[50px] rounded-full bg-white hover:bg-[#F7F7F7] !text-[#212121] border border-[#E5E7EB] text-sm font-sans font-medium transition-all shadow-2xs active:scale-[0.98] cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check size={14} className="text-[#1935D9]" />
                      <span className="!text-[#212121] font-semibold">Copied Address!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} className="text-[#6B7280]" />
                      <span className="!text-[#212121]">Copy Email</span>
                    </>
                  )}
                </button>
              </div>

              {/* Social Channels */}
              <div className="pt-8 border-t border-[#EBEBEB] flex flex-wrap items-center justify-center gap-3 text-xs font-sans text-[#6F6F6F]">
                <span className="font-medium">Verified Profiles:</span>
                <a
                  href="https://www.linkedin.com/in/varunesarapu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-white border border-[#E5E5E5] text-[#0A0A0A] hover:border-[#0A0A0A] transition-colors flex items-center gap-1.5 shadow-2xs"
                >
                  <span className="font-medium">LinkedIn</span>
                  <ArrowUpRight size={12} />
                </a>
                <a
                  href="https://github.com/Varun-Esarapu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-white border border-[#E5E5E5] text-[#0A0A0A] hover:border-[#0A0A0A] transition-colors flex items-center gap-1.5 shadow-2xs"
                >
                  <span className="font-medium">GitHub</span>
                  <ArrowUpRight size={12} />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
