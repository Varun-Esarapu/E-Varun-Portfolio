"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Network, Database, Cpu, Activity, Layout, Mic, ShieldCheck, FileText, Smartphone, Server, Layers } from "lucide-react";

// Helper component for consistent architecture blocks
const ArchBlock = ({ icon: Icon, title }: { icon: any, title: string }) => (
  <div className="bg-[#FFFFFF] border border-[#E5E5E5] hover:border-[#0A0A0A] p-4 rounded-xl flex flex-col items-center flex-1 w-full text-center transition-colors duration-200 group shadow-2xs">
    <div className="w-10 h-10 rounded-full bg-[#F5F5F5] flex items-center justify-center mb-2 group-hover:bg-[#ADFA1D] transition-colors duration-200">
      <Icon className="text-[#0A0A0A]" size={18} />
    </div>
    <span className="text-[11px] text-[#0A0A0A] font-semibold tracking-tight uppercase mt-1 block font-sans">{title}</span>
  </div>
);

const Arrow = () => (
  <>
    <div className="hidden md:block text-[#6F6F6F] font-mono text-sm px-1">→</div>
    <div className="md:hidden text-[#6F6F6F] font-mono text-sm py-1">↓</div>
  </>
);

const architectures: Record<string, React.ReactNode> = {
  "auto-stair": (
    <div className="flex flex-col items-center justify-center p-4 md:p-8 space-y-6 w-full max-w-3xl mx-auto">
      <div className="text-center">
        <span className="font-mono text-xs text-[#0A0A0A] bg-[#ADFA1D] px-2.5 py-0.5 rounded-full font-semibold">
          PIPELINE 01
        </span>
        <h4 className="text-[#0A0A0A] font-sans font-semibold text-xl sm:text-2xl mt-2 tracking-tight">Auto-STAIR: Agentic Multi-Hop Retrieval</h4>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3 w-full">
        <ArchBlock icon={FileText} title="Dynamic ToC Induction" />
        <Arrow />
        <ArchBlock icon={Network} title="LangGraph Multi-Hop" />
        <Arrow />
        <ArchBlock icon={ShieldCheck} title="Zero-Shot Trie" />
        <Arrow />
        <ArchBlock icon={Cpu} title="Constrained Reasoning" />
      </div>
      <p className="text-[#6F6F6F] text-xs sm:text-sm text-center mt-4 max-w-xl leading-relaxed font-sans">
        Eliminates brittle chunking through dynamic Table-of-Contents induction and multi-hop LangGraph traversal. Zero-shot Trie prefix validation constrains agentic routing to eliminate hallucinated document paths during multi-step reasoning.
      </p>
    </div>
  ),
  cinematch: (
    <div className="flex flex-col items-center justify-center p-4 md:p-8 space-y-6 w-full max-w-3xl mx-auto">
      <div className="text-center">
        <span className="font-mono text-xs text-[#0A0A0A] bg-[#ADFA1D] px-2.5 py-0.5 rounded-full font-semibold">
          PIPELINE 02
        </span>
        <h4 className="text-[#0A0A0A] font-sans font-semibold text-xl sm:text-2xl mt-2 tracking-tight">Cinematch: Distributed ALS Architecture</h4>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3 w-full">
        <ArchBlock icon={Database} title="32M+ MovieLens" />
        <Arrow />
        <ArchBlock icon={Cpu} title="PySpark 3.5 MLlib" />
        <Arrow />
        <ArchBlock icon={Server} title="Django REST + PG15" />
        <Arrow />
        <ArchBlock icon={Layout} title="Streamlit + TMDB" />
      </div>
      <p className="text-[#6F6F6F] text-xs sm:text-sm text-center mt-4 max-w-xl leading-relaxed font-sans">
        End-to-end distributed collaborative filtering pipeline on 32M+ interaction records using PySpark 3.5 MLlib ALS. Decoupled microservice serving boundary using Django REST Framework and PostgreSQL 15 delivers sub-15ms inference latency, enriched with TMDB Live Graph 4K metadata.
      </p>
    </div>
  ),
  "vehicle-service": (
    <div className="flex flex-col items-center justify-center p-4 md:p-8 space-y-6 w-full max-w-3xl mx-auto">
      <div className="text-center">
        <span className="font-mono text-xs text-[#0A0A0A] bg-[#ADFA1D] px-2.5 py-0.5 rounded-full font-semibold">
          PIPELINE 03
        </span>
        <h4 className="text-[#0A0A0A] font-sans font-semibold text-xl sm:text-2xl mt-2 tracking-tight">Vehicle Service Management: Transaction Flow</h4>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3 w-full">
        <ArchBlock icon={Layout} title="Client UI (Streamlit)" />
        <Arrow />
        <ArchBlock icon={Network} title="REST API (Django)" />
        <Arrow />
        <ArchBlock icon={Cpu} title="Business Logic" />
        <Arrow />
        <ArchBlock icon={Database} title="SQL Database" />
      </div>
      <p className="text-[#6F6F6F] text-xs sm:text-sm text-center mt-4 max-w-xl leading-relaxed font-sans">
        The frontend client communicates securely with the Django REST Framework backend, which calculates labor and component pricing before persisting records in the relational SQL database.
      </p>
    </div>
  ),
  "speech-emotion": (
    <div className="flex flex-col items-center justify-center p-4 md:p-8 space-y-6 w-full max-w-3xl mx-auto">
      <div className="text-center">
        <span className="font-mono text-xs text-[#0A0A0A] bg-[#ADFA1D] px-2.5 py-0.5 rounded-full font-semibold">
          PIPELINE 04
        </span>
        <h4 className="text-[#0A0A0A] font-sans font-semibold text-xl sm:text-2xl mt-2 tracking-tight">Speech Emotion: Edge Audio Pipeline</h4>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3 w-full">
        <ArchBlock icon={Mic} title="Raw Audio" />
        <Arrow />
        <ArchBlock icon={Activity} title="Librosa (MFCC)" />
        <Arrow />
        <ArchBlock icon={Network} title="CNN Model" />
        <Arrow />
        <ArchBlock icon={Smartphone} title="IoT Dashboard" />
      </div>
      <p className="text-[#6F6F6F] text-xs sm:text-sm text-center mt-4 max-w-xl leading-relaxed font-sans">
        Real-time audio is processed using Librosa to extract MFCC features, which are fed into a trained Convolutional Neural Network deployed on a Raspberry Pi edge device.
      </p>
    </div>
  ),
  "text-emotion": (
    <div className="flex flex-col items-center justify-center p-4 md:p-8 space-y-6 w-full max-w-3xl mx-auto">
      <div className="text-center">
        <span className="font-mono text-xs text-[#0A0A0A] bg-[#ADFA1D] px-2.5 py-0.5 rounded-full font-semibold">
          PIPELINE 05
        </span>
        <h4 className="text-[#0A0A0A] font-sans font-semibold text-xl sm:text-2xl mt-2 tracking-tight">Text Emotion: Sequential NLP Flow</h4>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3 w-full">
        <ArchBlock icon={Database} title="Custom Dataset" />
        <Arrow />
        <ArchBlock icon={FileText} title="Tokenization" />
        <Arrow />
        <ArchBlock icon={Layers} title="LSTM (Keras)" />
        <Arrow />
        <ArchBlock icon={ShieldCheck} title="87% Accuracy" />
      </div>
      <p className="text-[#6F6F6F] text-xs sm:text-sm text-center mt-4 max-w-xl leading-relaxed font-sans">
        Raw text data is normalized, padded, and tokenized before being passed into a Long Short-Term Memory (LSTM) network designed for sequential emotion classification.
      </p>
    </div>
  ),
  "movie-recommendation": (
    <div className="flex flex-col items-center justify-center p-4 md:p-8 space-y-6 w-full max-w-3xl mx-auto">
      <div className="text-center">
        <span className="font-mono text-xs text-[#0A0A0A] bg-[#ADFA1D] px-2.5 py-0.5 rounded-full font-semibold">
          PIPELINE 06
        </span>
        <h4 className="text-[#0A0A0A] font-sans font-semibold text-xl sm:text-2xl mt-2 tracking-tight">Distributed Recommendation System</h4>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3 w-full">
        <ArchBlock icon={Database} title="32M+ MovieLens" />
        <Arrow />
        <ArchBlock icon={Cpu} title="PySpark 3.5 MLlib" />
        <Arrow />
        <ArchBlock icon={Server} title="Django REST + PG15" />
        <Arrow />
        <ArchBlock icon={Layout} title="Streamlit + TMDB" />
      </div>
      <p className="text-[#6F6F6F] text-xs sm:text-sm text-center mt-4 max-w-xl leading-relaxed font-sans">
        End-to-end distributed collaborative filtering pipeline on 32M+ interaction records using PySpark 3.5 MLlib ALS. Decoupled microservice serving boundary using Django REST Framework and PostgreSQL 15 delivers sub-15ms inference latency, enriched with TMDB Live Graph 4K metadata.
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
            className="absolute inset-0 bg-[#0A0A0A]/40 backdrop-blur-xs cursor-pointer"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.96, y: 16 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            className="relative bg-[#FFFFFF] border border-[#E5E5E5] rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl z-10"
          >
            <div className="p-4 border-b border-[#E5E5E5] flex justify-between items-center bg-[#F8F8F8]">
              <span className="font-mono text-xs uppercase tracking-wider text-[#6F6F6F] font-semibold pl-2">
                Pipeline Specification
              </span>
              <button 
                onClick={onClose} 
                className="text-[#6F6F6F] hover:text-[#0A0A0A] transition-colors p-1.5 rounded-full hover:bg-[#EBEBEB] cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-4 sm:p-6 md:p-8">
              {architectures[projectId]}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}