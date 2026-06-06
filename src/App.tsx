import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Background from "@/components/Background";
import ScrollToTop from "@/components/ScrollToTop";
import AIAssistant from "@/components/AIAssistant";
import LandingPage from "@/pages/LandingPage";
import CampaignsPage from "@/pages/CampaignsPage";
import ContactPage from "@/pages/ContactPage";
import DonatePage from "@/pages/DonatePage";

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><LandingPage /></PageWrapper>} />
        <Route path="/campaigns" element={<PageWrapper><CampaignsPage /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><ContactPage /></PageWrapper>} />
        <Route path="/donate" element={<PageWrapper><DonatePage /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <div className="relative min-h-screen w-full selection:bg-gold selection:text-forest overflow-x-hidden">
        <Background />
        <Navbar />
        <main className="pt-0">
          <AnimatedRoutes />
        </main>
        <AIAssistant />
        <Footer />
        <ScrollToTop />
      </div>
    </Router>
  );
}
