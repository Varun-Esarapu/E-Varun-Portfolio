import type { Metadata } from "next";
import { Plus_Jakarta_Sans, IBM_Plex_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Chatbot from "@/components/ui/Chatbot";
import SmoothScroll from "@/components/ui/SmoothScroll";

// Primary voice: Clean geometric modern sans with tight negative tracking (matches Poulo / TikTok Sans)
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

// Code & metadata monospace (matches IBM Plex Mono in Poulo spec)
const ibmMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

// Editorial serif accent (David Whyte editorial touch)
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Esarapu Varun — AI & Systems Engineer",
  description: "Portfolio of Esarapu Varun. Production agentic retrieval pipelines (LangGraph), distributed PySpark architectures, and low-latency API systems.",
  keywords: ["AI Engineer", "Machine Learning", "LangGraph", "PySpark", "Backend Developer", "Python", "FastAPI", "Portfolio"],
  authors: [{ name: "Esarapu Varun" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${ibmMono.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased bg-[#FFFFFF] text-[#000000] selection:bg-[#10B981]/20 selection:text-[#000000]">
        <SmoothScroll>
          <Navbar />
          <main className="relative z-10">{children}</main>
          <Footer />
          <Chatbot />
        </SmoothScroll>
      </body>
    </html>
  );
}
