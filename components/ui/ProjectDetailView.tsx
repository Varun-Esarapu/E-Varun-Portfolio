"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink, Code2 } from "lucide-react";
import { Project } from "@/data/projects";

export default function ProjectDetailView({ project }: { project: Project }) {
  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#FFFFFF]">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        
        {/* Back Navigation */}
        <Link 
          href="/#works" 
          className="inline-flex items-center text-[#6F6F6F] hover:text-[#0A0A0A] transition-colors duration-200 mb-10 font-sans text-xs tracking-tight group font-medium"
        >
          <ArrowLeft size={14} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Selected Works
        </Link>
        
        {/* Project Header Card */}
        <div className="bg-[#F8F8F8] border border-[#E5E5E5] rounded-3xl p-6 sm:p-10 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="font-mono text-xs text-[#0A0A0A] bg-[#ADFA1D] px-2.5 py-0.5 rounded-full font-semibold">
              SPECIFICATION
            </span>
            {project.date && (
              <span className="font-mono text-xs text-[#6F6F6F]">
                {project.date}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-sans font-semibold text-[#0A0A0A] tracking-tight mb-4">
            {project.title}
          </h1>

          <p className="text-[#6F6F6F] font-sans text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">
            {project.description}
          </p>
          
          {/* Tech Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tech.map((tech) => (
              <span 
                key={tech} 
                className="px-3 py-1 bg-[#FFFFFF] border border-[#E5E5E5] text-[#0A0A0A] text-xs font-mono rounded-full font-medium shadow-2xs"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap gap-3">
            {project.huggingface && (
              <a
                href={project.huggingface}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#000000] hover:bg-[#1D1D1F] !text-white font-sans font-medium text-xs px-6 py-3 rounded-full transition-all duration-200 shadow-xs cursor-pointer"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                <span className="!text-white">Launch HuggingFace Demo</span>
                <ExternalLink size={13} className="!text-white" />
              </a>
            )}

            {project.website && (
              <a
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#000000] hover:bg-[#1D1D1F] !text-white font-sans font-medium text-xs px-6 py-3 rounded-full transition-all duration-200 shadow-xs cursor-pointer"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                <span className="!text-white">Launch Live App</span>
                <ExternalLink size={13} className="!text-white" />
              </a>
            )}

            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#FFFFFF] hover:bg-[#F7F7F7] border border-[#E5E7EB] !text-[#212121] font-sans font-medium text-xs px-6 py-3 rounded-full transition-all duration-200 shadow-2xs cursor-pointer"
              >
                <Code2 size={13} className="text-[#6B7280]" />
                <span className="!text-[#212121]">View Source Code</span>
              </a>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
