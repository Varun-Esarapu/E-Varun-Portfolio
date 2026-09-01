export interface ExperienceItem {
  title: string;
  company: string;
  logo: string;
  location: string;
  date: string;
  description: string[];
}

export const experience: ExperienceItem[] = [
  {
    title: "AI/ML Developer Apprentice",
    company: "D Square Consulting Services Pvt Ltd",
    logo: "/dsquare-logo.png",
    location: "Bangalore, KA",
    date: "May 2026 - Present",
    description: [
      "Collaborate with the AI/ML team to develop and test machine learning models.",
      "Clean, preprocess, and analyze datasets using Python, NumPy, and Pandas.",
      "Build supervised and unsupervised learning models for tasks like prediction and clustering.",
      "Assist in deploying models on cloud platforms.",
    ],
  },
  {
    title: "AI Operator Intern",
    company: "XTransMatriX Consulting Services Pvt Ltd",
    logo: "/xtransmatrix-logo.png",
    location: "Bangalore, KA",
    date: "Nov 2025 - Mar 2026",
    description: [
      "Collaborated with the AI/ML team to develop, test, and optimize machine learning models.",
      "Performed Human-in-the-Loop (HITL) data annotation, cleaning, and preprocessing using Python, NumPy, and Pandas.",
      "Designed and implemented supervised and unsupervised learning models, including predictive modeling and clustering.",
    ],
  },
];