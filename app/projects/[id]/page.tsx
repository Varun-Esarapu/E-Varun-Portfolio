import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { projects } from "@/data/projects";

// Generate static params for all projects
export function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

export default async function ProjectDetail({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const resolvedParams = await params;
  const project = projects.find((p) => p.id === resolvedParams.id);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-28 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        
        {/* Back Navigation */}
        <Link 
          href="/#projects" 
          className="inline-flex items-center text-[#B5B0A1] hover:text-[#D4AF37] transition-colors duration-300 mb-12 font-sans text-sm tracking-wide group"
        >
          <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </Link>
        
        {/* Project Header */}
        <div className="border-b border-[#D4AF37]/10 pb-10 mb-10">
          <div className="flex items-center mb-4">
            <div className="w-8 h-[2px] bg-[#D4AF37] mr-3"></div>
            <span className="text-[#D4AF37] text-xs tracking-[0.25em] uppercase font-sans font-bold">
              Project
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-serif text-[#FDFBF7] tracking-tight mb-8">
            {project.title}
          </h1>
          
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tech.map((tech) => (
              <span 
                key={tech} 
                className="px-3 py-1.5 bg-[#0F0C0A] border border-[#2D2723] text-[#D4AF37] text-[10px] font-sans uppercase tracking-[0.1em] rounded-full font-bold"
              >
                {tech}
              </span>
            ))}
          </div>

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-transparent border border-[#D4AF37]/50 text-[#D4AF37] font-bold tracking-[0.15em] uppercase text-xs px-8 py-4 rounded-md hover:bg-[#D4AF37] hover:text-[#0F0C0A] transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.05)] hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]"
            >
              View on GitHub
              <ExternalLink size={14} />
            </a>
          )}
        </div>
        
        {/* Project Content */}
        <div className="space-y-8">
          <div className="relative overflow-hidden rounded-2xl bg-[#1A1614] border border-[#2D2723] p-8 md:p-10">
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-sm font-sans text-[#B5B0A1] uppercase tracking-[0.2em] mb-6 font-semibold">Overview</h2>
              <p className="text-[#B5B0A1] font-sans text-base md:text-lg leading-relaxed">
                {project.description}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}