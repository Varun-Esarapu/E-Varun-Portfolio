"use client";

import { motion } from "framer-motion";
import { SectionHeading, Badge } from "@/components/ui/AceternityUI";
import { Cpu, Server, Layers, Award, Network, Zap } from "lucide-react";

export default function About() {
  const highlights = [
    {
      icon: <Cpu className="w-5 h-5 text-[#0A0A0A]" />,
      title: "Hardware to Software",
      desc: "ECE foundation gives deep mental models for memory hierarchies, latency ceilings, and edge compute limits.",
    },
    {
      icon: <Server className="w-5 h-5 text-[#0A0A0A]" />,
      title: "End-to-End Delivery",
      desc: "From training PyTorch models on raw datasets to architecting Django REST APIs deployed in the cloud.",
    },
    {
      icon: <Layers className="w-5 h-5 text-[#0A0A0A]" />,
      title: "Distributed Scale",
      desc: "PySpark 3.5 MLlib pipeline on 32M+ MovieLens interactions delivering sub-15ms inference latency.",
    },
    {
      icon: <Award className="w-5 h-5 text-[#0A0A0A]" />,
      title: "8.71 / 10 CGPA",
      desc: "Strong academic foundation at HKBK College of Engineering, Bangalore (B.E. Graduate).",
    },
  ];

  return (
    <section id="about" className="py-24 border-b border-[#EBEBEB] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionHeading
            number="01"
            subtitle="Background & Philosophy"
            title="Engineering from the silicon up."
          />

          <div className="flex flex-col lg:flex-row gap-10 items-start mb-14">
            {/* Story text */}
            <div className="lg:w-3/5 space-y-5 text-[#6F6F6F] font-sans text-base sm:text-lg leading-relaxed">
              <p>
                I am an <span className="text-[#0A0A0A] font-semibold">Electronics and Communication Engineering</span> graduate specializing in applied artificial intelligence and scalable backend architecture.
              </p>
              <p>
                Having studied circuits, signal processing, and computer organization, I don&apos;t treat software as black boxes. That low-level foundation informs how I design APIs, profile bottlenecks, and optimize deep learning inference.
              </p>
              <p>
                Rather than writing one-off Jupyter notebooks, my focus is on <span className="text-[#0A0A0A] font-semibold">production-grade software engineering</span>: container-friendly pipelines, strict schema validation, and real-time streaming interfaces.
              </p>
            </div>

            {/* Architectural Telemetry Card: Hardware to Distributed AI */}
            <div className="lg:w-2/5 w-full flex justify-center">
              <div className="w-full p-6 sm:p-7 rounded-[28px] bg-[#F8F8F8] border border-[#EBEBEB] hover:border-[#D6D6D6] transition-all duration-300 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E5E5E5] text-[11px] font-mono font-medium text-[#0A0A0A] shadow-2xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                      SYSTEMS ARCHITECTURE
                    </span>
                    <Cpu className="w-4 h-4 text-[#6F6F6F]" />
                  </div>

                  <h3 className="text-xl font-heading font-semibold text-[#0A0A0A] tracking-[-0.03em] leading-snug mb-2">
                    Hardware to Distributed AI
                  </h3>
                  <p className="text-xs font-sans text-[#6F6F6F] leading-relaxed mb-6">
                    A first-principles engineering path bridging physical silicon compute constraints to high-throughput multi-agent systems.
                  </p>

                  <div className="space-y-3">
                    <div className="p-3 rounded-2xl bg-white border border-[#EBEBEB] flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Cpu className="w-4 h-4 text-[#0A0A0A]" />
                        <span className="text-xs font-sans font-medium text-[#0A0A0A]">Silicon Fundamentals</span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#F4F4F5] text-[#0A0A0A] font-semibold border border-[#E4E4E7]">
                        ECE SILICON BASE
                      </span>
                    </div>

                    <div className="p-3 rounded-2xl bg-white border border-[#EBEBEB] flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Network className="w-4 h-4 text-[#0A0A0A]" />
                        <span className="text-xs font-sans font-medium text-[#0A0A0A]">Autonomous Agent Routing</span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#F4F4F5] text-[#0A0A0A] font-semibold border border-[#E4E4E7]">
                        LANGGRAPH MULTI-HOP
                      </span>
                    </div>

                    <div className="p-3 rounded-2xl bg-white border border-[#EBEBEB] flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Layers className="w-4 h-4 text-[#0A0A0A]" />
                        <span className="text-xs font-sans font-medium text-[#0A0A0A]">Distributed Recommendation</span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#F4F4F5] text-[#0A0A0A] font-semibold border border-[#E4E4E7]">
                        PYSPARK 32M+ SCALE
                      </span>
                    </div>

                    <div className="p-3 rounded-2xl bg-white border border-[#EBEBEB] flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Zap className="w-4 h-4 text-[#0A0A0A]" />
                        <span className="text-xs font-sans font-medium text-[#0A0A0A]">Microservice Serving</span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#10B981]/15 text-[#059669] font-bold border border-[#10B981]/25">
                        &lt;15ms LATENCY
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#EBEBEB] flex items-center justify-between text-[11px] font-mono text-[#6F6F6F]">
                  <span>FOUNDATION → PRODUCTION</span>
                  <span className="text-[#0A0A0A] font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                    VERIFIED PIPELINES
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Feature Value Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((h, i) => (
              <div
                key={i}
                className="p-7 rounded-[24px] bg-[#F8F8F8] border border-[#EBEBEB] hover:border-[#D6D6D6] transition-all duration-300"
              >
                <div className="flex items-center gap-3.5 mb-3">
                  <div className="p-2.5 rounded-full bg-white border border-[#E5E5E5] shadow-2xs">
                    {h.icon}
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-[#0A0A0A] tracking-tight">
                    {h.title}
                  </h3>
                </div>
                <p className="text-sm text-[#6F6F6F] font-sans leading-relaxed">
                  {h.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
