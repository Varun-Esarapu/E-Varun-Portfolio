import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // THIS IS THE CRITICAL LIFELINE
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Spotlight from "@/components/ui/Spotlight";
import Chatbot from "@/components/ui/Chatbot";
import CustomCursor from "@/components/ui/CustomCursor";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Esarapu Varun | AI & Systems Engineer",
  description: "Engineering scalable backend systems, intelligent machine learning models, and robust digital architecture.",
  keywords: ["AI Engineer", "Machine Learning", "Backend Developer", "Python", "Django", "TensorFlow", "Portfolio"],
  authors: [{ name: "Esarapu Varun" }],
  openGraph: {
    title: "Esarapu Varun | AI & Systems Engineer",
    description: "Engineering scalable backend systems, intelligent machine learning models, and robust digital architecture.",
    type: "website",
    locale: "en_US",
    siteName: "Esarapu Varun Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Esarapu Varun | AI & Systems Engineer",
    description: "Engineering scalable backend systems, intelligent machine learning models, and robust digital architecture.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <CustomCursor />
        <Spotlight />
        <Navbar />
        <main className="w-full">{children}</main>
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}