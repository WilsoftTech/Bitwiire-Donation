import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ease-in-out h-[80px] ${
      scrolled ? "bg-forest/80 backdrop-blur-xl border-b border-gold/10 h-[70px]" : "bg-transparent"
    }`}>
      <div className="container mx-auto h-full flex justify-between items-center px-6 md:px-12 max-w-7xl">
        <Link to="/" className="flex items-center gap-3 cursor-pointer group">
          <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 shadow-lg shadow-gold/10">
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-forest"><path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20c9 0 13-8.38 9-15a4.65 4.65 0 00-4 1.07 5.24 5.24 0 010 4 4.65 4.65 0 00-4 1.07A5.24 5.24 0 0113 13c-1 2-3 4-6 4"/></svg>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-cream text-lg font-bold leading-tight tracking-tight">Bitwiire</span>
            <span className="font-sans text-gold text-[9px] uppercase tracking-[0.3em] font-bold mt-0.5">Plant Medics</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          <Link to="/" className="text-cream/70 text-[11px] font-bold uppercase tracking-[0.15em] hover:text-gold transition-colors">Home</Link>
          <HashLink smooth to="/#about" className="text-cream/70 text-[11px] font-bold uppercase tracking-[0.15em] hover:text-gold transition-colors">About</HashLink>
          <Link to="/campaigns" className="text-cream/70 text-[11px] font-bold uppercase tracking-[0.15em] hover:text-gold transition-colors">Campaigns</Link>
          <Link to="/contact" className="text-cream/70 text-[11px] font-bold uppercase tracking-[0.15em] hover:text-gold transition-colors">Contact</Link>
          <Link to="/donate">
            <Button className="btn-gold h-11 px-8 text-[11px] tracking-[0.15em]">DONATE NOW</Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden flex flex-col gap-1.5 p-2">
          <div className="w-6 h-[1.5px] bg-gold"></div>
          <div className="w-4 h-[1.5px] bg-gold self-end"></div>
          <div className="w-6 h-[1.5px] bg-gold"></div>
        </button>
      </div>
    </nav>
  );
}
