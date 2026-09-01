"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Network, Database, Cpu, Activity, Layout, Mic, ShieldCheck, HardDrive, FileText, Smartphone, Server, Layers, Clapperboard, Users } from "lucide-react";

// Helper component for consistent architecture blocks
const ArchBlock = ({ icon: Icon, title }: { icon: any, title: string }) => (
  <div className="bg-[#1A1614] border border-[#2D2723] hover:border-[#D4AF37]/50 p-4 rounded-xl flex flex-col items-center flex-1 w-full text-center transition-colors duration-300 group shadow-sm">
    <Icon className="text-[#B5B0A1] group-hover:text-[#D4AF37] mb-2 transition-colors duration-300" size={24} />
    <span className="text-[10px] text-[#FDFBF7] font-bold tracking-[0.15em] uppercase mt-2 block">{title}</span>
  </div>
);

const Arrow = () => (
  <>
    <div className="hidden md:block text-[#D4AF37]/50 font-light">→</div>
    <div className="md:hidden text-[#D4AF37]/50 font-light">↓</div>
  </>
);

const architectures: Record<string, React.ReactNode> = {
  "vehicle-service": (
    <div className="flex flex-col items-center justify-center p-4 md:p-8 space-y-6 w-full max-w-3xl mx-auto">
      <h4 className="text-[#D4AF37] font-serif text-xl mb-4">System Architecture</h4>
      <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 w-full">
        <ArchBlock icon={Layout} title="Client UI (Streamlit)" />
        <Arrow />
        <ArchBlock icon={Network} title="REST API (Django)" />
        <Arrow />
        <ArchBlock icon={Cpu} title="Business Logic" />
        <Arrow />
        <ArchBlock icon={Database} title="SQL Database" />
      </div>
      <p className="text-[#B5B0A1] text-xs text-center mt-6 max-w-xl leading-relaxed">
        The frontend client communicates securely with the Django REST Framework backend, which calculates labor and component pricing before persisting records in the relational SQL database.
      </p>
    </div>
  ),
  "speech-emotion": (
    <div className="flex flex-col items-center justify-center p-4 md:p-8 space-y-6 w-full max-w-3xl mx-auto">
      <h4 className="text-[#D4AF37] font-serif text-xl mb-4">Pipeline Architecture</h4>
      <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 w-full">
        <ArchBlock icon={Mic} title="Raw Audio" />
        <Arrow />
        <ArchBlock icon={Activity} title="Librosa (MFCC)" />
        <Arrow />
        <ArchBlock icon={Network} title="CNN Model" />
        <Arrow />
        <ArchBlock icon={Smartphone} title="IoT Dashboard" />
      </div>
      <p className="text-[#B5B0A1] text-xs text-center mt-6 max-w-xl leading-relaxed">
        Real-time audio is processed using Librosa to extract MFCC features, which are fed into a trained Convolutional Neural Network deployed on a Raspberry Pi edge device.
      </p>
    </div>
  ),
  "text-emotion": (
    <div className="flex flex-col items-center justify-center p-4 md:p-8 space-y-6 w-full max-w-3xl mx-auto">
      <h4 className="text-[#D4AF37] font-serif text-xl mb-4">NLP Flow</h4>
      <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 w-full">
        <ArchBlock icon={Database} title="Custom Dataset" />
        <Arrow />
        <ArchBlock icon={FileText} title="Tokenization" />
        <Arrow />
        <ArchBlock icon={Layers} title="LSTM (Keras)" />
        <Arrow />
        <ArchBlock icon={ShieldCheck} title="87% Accuracy" />
      </div>
      <p className="text-[#B5B0A1] text-xs text-center mt-6 max-w-xl leading-relaxed">
        Raw text data is normalized, padded, and tokenized before being passed into a Long Short-Term Memory (LSTM) network designed for sequential emotion classification.
      </p>
    </div>
  ),
  "movie-recommendation": (
    <div className="flex flex-col items-center justify-center p-4 md:p-8 space-y-6 w-full max-w-3xl mx-auto">
      <h4 className="text-[#D4AF37] font-serif text-xl mb-4">Neural Collaborative Filtering</h4>
      <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 w-full">
        <ArchBlock icon={Users} title="User Data (100k)" />
        <Arrow />
        <ArchBlock icon={Layers} title="Embedding Layer" />
        <Arrow />
        <ArchBlock icon={Network} title="Neural CF Model" />
        <Arrow />
        <ArchBlock icon={Clapperboard} title="Recommendations" />
      </div>
      <p className="text-[#B5B0A1] text-xs text-center mt-6 max-w-xl leading-relaxed">
        Processes 100,000 user interactions through deep embedding layers, feeding a Neural Collaborative Filtering architecture to predict personalized movie ratings with 89.2% accuracy.
      </p>
    </div>
  )
};

export default function ArchitectureModal({ 
  projectId, 
  isOpen, 
  onClose 
}: { 
  projectId: string | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!projectId || !architectures[projectId]) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0F0C0A]/80 backdrop-blur-sm cursor-pointer"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-[#1A1614] border border-[#D4AF37]/20 rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl z-10"
          >
            <div className="p-4 border-b border-[#D4AF37]/10 flex justify-end">
              <button onClick={onClose} className="text-[#B5B0A1] hover:text-[#D4AF37] transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-2 md:p-6">
              {architectures[projectId]}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
