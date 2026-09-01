export default function Footer() {
  return (
    <footer className="py-10 border-t border-[#D4AF37]/10 bg-[#0F0C0A]">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Left Side: Name and Copyright */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="font-serif text-xl text-[#FDFBF7] tracking-wide">
            Esarapu Varun
          </span>
          <span className="font-sans text-[10px] tracking-[0.2em] uppercase font-bold text-[#B5B0A1]">
            © 2026 All rights reserved.
          </span>
        </div>

        {/* Right Side: Clean SVG Icons */}
        <div className="flex gap-6 items-center text-[#B5B0A1]">
          {/* Email Icon */}
          <a href="mailto:varunesarapu@gmail.com" className="hover:text-[#D4AF37] hover:-translate-y-1 transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
          </a>
          
          {/* LinkedIn Icon */}
          <a href="https://www.linkedin.com/in/varunesarapu/" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4AF37] hover:-translate-y-1 transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
              <rect width="4" height="12" x="2" y="9"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
          </a>

          {/* GitHub Icon */}
          <a href="https://github.com/Varun-Esarapu" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4AF37] hover:-translate-y-1 transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"/>
              <path d="M9 18c-4.51 2-5-2-7-2"/>
            </svg>
          </a>
        </div>
        
      </div>
    </footer>
  );
}