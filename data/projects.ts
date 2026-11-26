export interface Project {
  id: string;
  title: string;
  tech: string[];
  description: string;
  link: string;
  website?: string;
  huggingface?: string;
  date?: string;
  highlight?: string;
}

export const projects: Project[] = [
  {
    id: "auto-stair",
    title: "Auto-STAIR: Agentic Multi-Hop Document Retrieval",
    date: "November 2026",
    highlight: "Agentic RAG / LangGraph",
    tech: ["LangGraph", "Trie Prefix Validation", "Multi-Hop RAG", "Python"],
    description: "Engineered a dynamic Table-of-Contents induction and multi-hop retrieval pipeline using LangGraph to navigate complex hierarchical documents without brittle chunking. Implemented zero-shot Trie prefix validation to constrain agentic routing and eliminate hallucinated document paths during multi-step reasoning.",
    huggingface: "https://huggingface.co/spaces/varun-e/Auto-STAIR",
    link: "https://github.com/Varun-Esarapu/Auto-STAIR",
  },
  {
    id: "cinematch",
    title: "Cinematch: Distributed Movie Recommendation",
    date: "October 2026",
    highlight: "PySpark & Microservices",
    tech: ["PySpark 3.5 MLlib", "Django REST Framework", "PostgreSQL 15", "Streamlit", "Python"],
    description: "Engineered an end-to-end distributed collaborative filtering pipeline on 32M+ MovieLens interaction records using PySpark 3.5 MLlib ALS, delivering sub-15ms inference latency. Architected a decoupled microservice serving boundary using Django REST Framework and PostgreSQL 15 with indexed composite keys, paired with a reactive Streamlit and TMDB Live Graph API frontend.",
    website: "https://cine-matchai.streamlit.app",
    link: "https://github.com/Varun-Esarapu/movie_rec",
  },
  {
    id: "vehicle-service",
    title: "Vehicle Service Management System",
    date: "April 2026",
    highlight: "Backend API & Workflow Automation",
    tech: ["Django REST Framework", "Python", "SQL", "Streamlit"],
    description: "Built RESTful backend APIs with Django REST Framework to manage vehicle records, component inventories, service issues, and payment workflows. Implemented state-machine issue lifecycle validation, automated labor-plus-component cost calculation, and a Streamlit dashboard for revenue visualization.",
    link: "https://github.com/Varun-Esarapu/vehicle-mgmt",
  },
  {
    id: "speech-emotion",
    title: "Real-Time Speech Emotion Recognition System",
    date: "October 2025",
    highlight: "Audio Signal Processing & CNN",
    tech: ["CNN", "Python", "Librosa", "Audio Processing", "IoT"],
    description: "Extracted Mel-Frequency Cepstral Coefficients (MFCC) via Librosa with signal normalization and padding to train and optimize a Convolutional Neural Network (CNN) for real-time audio emotion classification.",
    link: "https://github.com/Varun-Esarapu/sbers",
  },
];
