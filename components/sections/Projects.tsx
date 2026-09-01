"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <section id="projects" className="py-24 border-b border-[#D4AF37]/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <h2 className="text-3xl md:text-4xl font-serif text-[#FDFBF7] mb-12 tracking-tight">Selected Works.</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => {
              // Now accurately reads your "project.tech" array
              const techArray = project.tech;
              const isLarge = index === 0 || index === 3; 

              return (
                <motion.a 
                  key={index} 
                  href={project.link || "#"} 
                  target={project.link ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative overflow-hidden rounded-2xl bg-[#1A1614] border border-[#2D2723] flex flex-col cursor-pointer hover:border-[#D4AF37]/40 hover:shadow-[0_0_15px_rgba(212,175,55,0.1)] hover:-translate-y-1 transition-all duration-300 group block ${isLarge ? "md:col-span-2 md:flex-row" : "col-span-1"}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Image Placeholder Section */}
                  <div className={`relative bg-[#0F0C0A] border-[#2D2723] overflow-hidden flex items-center justify-center ${isLarge ? "md:w-2/5 md:border-r border-b md:border-b-0 shrink-0" : "h-48 border-b w-full"}`}>
                     {/* 
                        TODO: Add project image here 
                        <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-60 transition-opacity duration-500" />
                     */}
                     {/* Abstract Grid Pattern for now */}
                     <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiMzMzMiIGZpbGwtb3BhY2l0eT0iMC4yIi8+PC9zdmc+')] opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#1A1614] to-transparent" />
                     <span className="text-[#2D2723] font-serif text-6xl font-bold opacity-30 group-hover:scale-110 transition-transform duration-700 z-10">0{index + 1}</span>
                  </div>

                  {/* Content Section */}
                  <div className={`relative z-10 flex flex-col p-8 md:p-10 ${isLarge ? "md:w-3/5 justify-center" : "flex-1 justify-between"}`}>
                    <div>
                      <h3 className="text-xl md:text-2xl font-serif text-[#FDFBF7] group-hover:text-[#D4AF37] transition-colors mb-4 flex justify-between items-center">
                        {project.title}
                        {project.link && (
                          <span className="text-[#D4AF37] font-sans text-xl font-light opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all">↗</span>
                        )}
                      </h3>
                      <p className="text-[#B5B0A1] font-sans leading-relaxed mb-8 text-sm md:text-base">
                        {project.description}
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {techArray.map((techItem: string) => (
                        <span key={techItem} className="px-3 py-1.5 bg-[#0F0C0A] border border-[#2D2723] text-[#D4AF37] text-[10px] font-sans uppercase tracking-[0.1em] rounded-full font-bold shadow-sm">
                          {techItem}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}