export interface ExperienceItem {
  title: string;
  company: string;
  logo: string;
  location: string;
  date: string;
  badge?: string;
  description: string[];
}

export const experience: ExperienceItem[] = [
  {
    title: "Jr. AI & ML Engineer",
    company: "D Square Consulting Services Pvt Ltd",
    logo: "/dsquare-logo.png",
    location: "Bangalore, KA",
    date: "Nov 2026 – Present (Apprentice: May – Nov 2026)",
    badge: "Full-Time Engineer",
    description: [
      "Engineered end-to-end machine learning workflows spanning data ingestion, model prototyping, and cloud deployment in an agile production environment.",
      "Developed, tested, and tuned supervised and unsupervised learning models using Python and scikit-learn to improve predictive modeling and clustering accuracy.",
      "Built automated data ingestion and prototyping pipelines with emerging AI frameworks, accelerating cloud deployment readiness and maintaining code quality through peer reviews.",
    ],
  },
  {
    title: "AI Operator Intern",
    company: "Xtransmatrix Consulting Services Pvt Ltd",
    logo: "/xtransmatrix-logo.png",
    location: "Bangalore, KA",
    date: "Nov 2025 – Mar 2026",
    badge: "Internship",
    description: [
      "Managed Human-in-the-Loop (HITL) data annotation and intent classification across real-world datasets for a US-based healthcare AI platform.",
      "Validated training data pipelines through systematic labeling and quality checks, ensuring clean inputs for production machine learning models.",
      "Evaluated LLM-generated outputs to identify edge cases, inconsistencies, and hallucinations, providing structured feedback for model refinement while adhering strictly to production SOPs.",
    ],
  },
];
