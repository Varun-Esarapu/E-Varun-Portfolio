"use client";

import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { projects } from "@/data/projects";
import ArchitectureModal from "@/components/ui/ArchitectureModal";
import { Network } from "lucide-react";
import React, { useRef } from "react";

// Project specific theme images (grayscale & themed via tailwind classes later)
const projectImages: Record<string, string> = {
  "vehicle-service": "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80",
  "speech-emotion": "https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&q=80",
  "text-emotion": "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80",
  "movie-recommendation": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80"
};

// Extracted card component for advanced scroll/parallax effects
const ProjectCard = ({ project, index, isLarge, onOpenArchitecture }: { project: any, index: number, isLarge: boolean, onOpenArchitecture: () => void }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["0 1", "1.2 1"] // Animates in as it enters the viewport
  });

  // Scale the card slightly as it comes into view for a smoother feel
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

  return (
    <motion.div 
      ref={cardRef}
      style={{ scale: scaleProgress, opacity: opacityProgress }}
      className={`relative overflow-hidden rounded-2xl bg-[#1A1614] border border-[#2D2723] flex flex-col hover:border-[#D4AF37]/40 hover:shadow-[0_0_15px_rgba(212,175,55,0.1)] transition-all duration-300 group block ${isLarge ? "md:col-span-2 md:flex-row" : "col-span-1"}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-0" />
      
      {/* Image Section with Unsplash Background */}
      <a href={project.link || "#"} target={project.link ? "_blank" : "_self"} rel="noopener noreferrer" className={`relative bg-[#0F0C0A] border-[#2D2723] overflow-hidden flex items-center justify-center cursor-pointer ${isLarge ? "md:w-2/5 md:border-r border-b md:border-b-0 shrink-0" : "h-48 border-b w-full"}`}>
         <div 
           className="absolute inset-0 bg-cover bg-center grayscale sepia-[0.3] opacity-30 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700" 
           style={{ backgroundImage: `url(${projectImages[project.id] || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80"})` }} 
         />
         <div className="absolute inset-0 bg-gradient-to-t from-[#1A1614] via-[#1A1614]/20 to-transparent opacity-80" />
         <span className="text-[#2D2723] font-serif text-6xl font-bold opacity-30 group-hover:scale-110 group-hover:text-[#D4AF37] transition-all duration-700 z-10 drop-shadow-md">
           0{index + 1}
         </span>
      </a>

      {/* Content Section */}
      <div className={`relative z-10 flex flex-col p-8 md:p-10 ${isLarge ? "md:w-3/5 justify-center" : "flex-1 justify-between"}`}>
        <div>
          <div className="flex flex-col xl:flex-row xl:justify-between xl:items-start gap-4 mb-4">
            <h3 className="text-xl md:text-2xl font-serif text-[#FDFBF7] group-hover:text-[#D4AF37] transition-colors leading-tight">
              <a href={project.link || "#"} target={project.link ? "_blank" : "_self"} rel="noopener noreferrer" className="hover:underline underline-offset-4 decoration-[#D4AF37]/50">
                {project.title}
              </a>
            </h3>
            
            <div className="flex items-center gap-2 shrink-0">
              <button 
                onClick={(e) => { e.preventDefault(); onOpenArchitecture(); }}
                className="flex items-center gap-1.5 px-3 py-1 bg-[#2D2723]/50 border border-[#D4AF37]/30 rounded-full text-xs font-sans text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0F0C0A] transition-colors"
                title="View ML Architecture"
              >
                <Network size={12} />
                <span>Architecture</span>
              </button>
              
              {project.link && (
                <a 
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1 bg-[#2D2723]/50 border border-[#B5B0A1]/30 rounded-full text-xs font-sans text-[#B5B0A1] hover:bg-[#FDFBF7] hover:text-[#0F0C0A] hover:border-[#FDFBF7] transition-colors"
                  title="View Source Code"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path>
                    <path d="M9 18c-4.51 2-5-2-7-2"></path>
                  </svg>
                  <span>GitHub</span>
                </a>
              )}
            </div>
          </div>
          <p className="text-[#B5B0A1] font-sans leading-relaxed mb-8 text-sm md:text-base">
            {project.description}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tech.map((techItem: string) => (
            <span key={techItem} className="px-3 py-1.5 bg-[#0F0C0A] border border-[#2D2723] text-[#D4AF37] text-[10px] font-sans uppercase tracking-[0.1em] rounded-full font-bold shadow-sm">
              {techItem}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default function Projects() {
  const [activeArchitecture, setActiveArchitecture] = useState<string | null>(null);

  return (
    <section id="projects" className="py-24 border-b border-[#D4AF37]/10 overflow-hidden">
      <ArchitectureModal 
        projectId={activeArchitecture} 
        isOpen={!!activeArchitecture} 
        onClose={() => setActiveArchitecture(null)} 
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <h2 className="text-3xl md:text-4xl font-serif text-[#FDFBF7] mb-12 tracking-tight">Selected Works.</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => {
              const isLarge = index === 0 || index === 3; 
              return (
                <ProjectCard 
                  key={index} 
                  project={project} 
                  index={index} 
                  isLarge={isLarge} 
                  onOpenArchitecture={() => setActiveArchitecture(project.id)} 
                />
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}