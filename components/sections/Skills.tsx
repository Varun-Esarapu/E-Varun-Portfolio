"use client";

import { motion } from "framer-motion";

export default function Skills() {
  const skillCategories = [
    {
      title: "Languages",
      skills: ["Python", "C", "SQL", "MySQL", "MongoDB"]
    },
    {
      title: "Frameworks & Backend",
      skills: ["Django", "Django REST Framework", "Next.js", "React"]
    },
    {
      title: "Machine Learning",
      skills: ["TensorFlow", "Keras", "PyTorch", "Pandas", "NumPy", "scikit-learn"]
    },
    {
      title: "Tools & Infrastructure",
      skills: ["Git", "AWS (EC2, S3)", "Docker", "Linux", "IoT"]
    }
  ];

  return (
    <section id="skills" className="py-24 border-b border-[#D4AF37]/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <h2 className="text-3xl md:text-4xl font-serif text-[#FDFBF7] mb-12 tracking-tight">Technical Arsenal.</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skillCategories.map((category, index) => (
              <div key={index} className="relative p-6 rounded-2xl bg-[#1A1614] border border-[#2D2723] hover:border-[#D4AF37]/30 transition-all group shadow-lg">
                 <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
                 <h3 className="text-sm font-sans text-[#B5B0A1] uppercase tracking-[0.2em] mb-6 font-semibold relative z-10">
                   {category.title}
                 </h3>
                 <div className="flex flex-wrap gap-2.5 relative z-10">
                   {category.skills.map((skill) => (
                     <span key={skill} className="px-4 py-2 bg-[#0F0C0A] border border-[#2D2723] text-[#D4AF37] text-xs font-sans rounded-md hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all shadow-sm cursor-default">
                       {skill}
                     </span>
                   ))}
                 </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
