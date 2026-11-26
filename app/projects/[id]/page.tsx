import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import ProjectDetailView from "@/components/ui/ProjectDetailView";

// Generate static params for all projects
export function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

export default async function ProjectDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const resolvedParams = await params;
  const project = projects.find((p) => p.id === resolvedParams.id);

  if (!project) {
    notFound();
  }

  return <ProjectDetailView project={project} />;
}
