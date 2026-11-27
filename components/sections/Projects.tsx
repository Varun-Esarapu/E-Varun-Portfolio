"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { projects } from "@/data/projects";
import ArchitectureModal from "@/components/ui/ArchitectureModal";
import { SectionHeading, Badge } from "@/components/ui/AceternityUI";
import { CardSpotlight } from "@/components/ui/CardSpotlight";
import { Network, ExternalLink, ArrowUpRight } from "lucide-react";

const projectImages: Record<string, string> = {
  "auto-stair":
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80",
  cinematch:
    "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80",
  "movie-recommendation":
    "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80",
  "vehicle-service":
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80",
  "speech-emotion":
    "https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&q=80",
};

const ProjectCard = ({
  project,
  index,
  onOpenArchitecture,
}: {
  project: any;
  index: number;
  onOpenArchitecture: () => void;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["0 1", "1.15 1"],
  });

  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.97, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.65, 1]);

  return (
    <motion.div
      ref={cardRef}
      style={{ scale: scaleProgress, opacity: opacityProgress }}
      className="h-full col-span-1"
    >
      <div className="h-full flex flex-col rounded-[28px] bg-[#F8F8F8] border border-[#EBEBEB] hover:border-[#D6D6D6] overflow-hidden transition-all duration-300 group shadow-2xs hover:shadow-[0_16px_36px_-10px_rgba(0,0,0,0.06)]">
        {/* Project Thumbnail Image with Clean Modern Framing */}
        <div className="relative bg-[#F0F0F0] overflow-hidden flex items-center justify-center shrink-0 h-56 border-b border-[#EBEBEB] w-full">
          <div
            className="absolute inset-0 bg-cover bg-center grayscale contrast-105 opacity-90 group-hover:opacity-100 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 ease-out"
            style={{
              backgroundImage: `url(${
                projectImages[project.id] ||
                "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80"
              })`,
            }}
          />

          {/* Minimal Index Number */}
          <span className="font-sans text-xs text-[#0A0A0A] bg-white/95 px-3 py-1 rounded-full absolute bottom-4 left-4 z-20 border border-[#E5E5E5] font-semibold">
            0{index + 1}
          </span>

          {/* Category Tag */}
          <div className="absolute top-4 left-4 z-20">
            <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-[#E5E5E5] text-[11px] font-sans font-medium text-[#0A0A0A] shadow-2xs">
              {project.highlight || "Engineering Deployment"}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col p-6 sm:p-8 flex-1 justify-between">
          <div>
            <div className="mb-4">
              {project.date && (
                <span className="text-xs font-sans text-[#6F6F6F] mb-1.5 block">
                  {project.date}
                </span>
              )}
              <h3 className="font-heading text-xl sm:text-2xl font-semibold text-[#0A0A0A] tracking-[-0.03em] leading-snug mb-3">
                {project.title}
              </h3>

              {/* Action Buttons: Live App/Demo, Pipeline Modal & GitHub - cleanly wrapped below title to prevent border overflow */}
              <div className="flex items-center gap-2 flex-wrap pt-1">
                {project.huggingface && (
                  <a
                    href={project.huggingface}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#000000] hover:bg-[#1D1D1F] !text-white font-sans font-medium text-xs shadow-2xs transition-all duration-200 cursor-pointer"
                    title="Open Live HuggingFace Demo"
                  >
                    <span>Demo</span>
                    <ArrowUpRight size={13} className="!text-white" />
                  </a>
                )}

                {project.website && (
                  <a
                    href={project.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#000000] hover:bg-[#1D1D1F] !text-white font-sans font-medium text-xs shadow-2xs transition-all duration-200 cursor-pointer"
                    title="Open Live Web App"
                  >
                    <span>Live</span>
                    <ArrowUpRight size={13} className="!text-white" />
                  </a>
                )}

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    onOpenArchitecture();
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-[#F3F4F6] !text-[#000000] border border-[#E5E7EB] text-xs font-sans font-medium transition-all duration-200 shadow-2xs cursor-pointer"
                  title="View System Architecture Diagram"
                >
                  <Network size={12} className="text-[#6B7280]" />
                  <span>Pipeline</span>
                </button>

                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-[#F3F4F6] !text-[#000000] border border-[#E5E7EB] text-xs font-sans font-medium transition-all duration-200 shadow-2xs cursor-pointer"
                    title="View Source Repository"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-[#6B7280]"
                    >
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                    <span>Code</span>
                  </a>
                )}
              </div>
            </div>

            <p className="text-[#6F6F6F] font-sans leading-relaxed text-sm mb-6">
              {project.description}
            </p>
          </div>

          {/* Tech tags footer */}
          <div className="pt-4 border-t border-[#EBEBEB] flex flex-wrap gap-1.5 mt-auto">
            {project.tech.map((techItem: string) => (
              <span
                key={techItem}
                className="px-2.5 py-1 bg-white border border-[#E5E5E5] text-[#0A0A0A] text-[11px] font-sans rounded-full font-medium"
              >
                {techItem}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Projects() {
  const [activeModalId, setActiveModalId] = useState<string | null>(null);

  return (
    <section id="projects" className="py-24 border-b border-[#EBEBEB] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionHeading
            number="02"
            subtitle="Selected Works"
            title="Featured Engineering Deployments."
          />

          {/* Symmetrical 2x2 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onOpenArchitecture={() => setActiveModalId(project.id)}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Interactive Architecture Modal */}
      {activeModalId && (
        <ArchitectureModal
          projectId={activeModalId}
          isOpen={!!activeModalId}
          onClose={() => setActiveModalId(null)}
        />
      )}
    </section>
  );
}
