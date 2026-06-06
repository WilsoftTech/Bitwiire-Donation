import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Instagram, Twitter, Facebook, Mail, Phone, MapPin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".footer-reveal", 
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.1, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
          }
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-forest-3 pt-24 pb-12 border-t border-gold/10 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8 mb-20">
          <div className="flex flex-col footer-reveal">
            <Link to="/" className="flex items-center gap-3 group mb-6">
              <div className="w-10 h-10 rounded-xl bg-gold flex items-center justify-center transition-transform group-hover:rotate-12">
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-forest"><path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20c9 0 13-8.38 9-15a4.65 4.65 0 00-4 1.07 5.24 5.24 0 010 4 4.65 4.65 0 00-4 1.07A5.24 5.24 0 0113 13c-1 2-3 4-6 4"/></svg>
              </div>
              <span className="text-cream font-serif text-2xl font-bold tracking-tight">Bitwiire</span>
            </Link>
            <p className="text-cream/45 text-sm max-w-[260px] leading-relaxed mb-8">
              A sanctuary dedicated to the restoration of health and the preservation of biodiversity in Western Uganda.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <button key={i} className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center text-gold hover:bg-gold hover:text-forest transition-all duration-500 hover:-translate-y-1">
                  <Icon className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>

          <div className="footer-reveal">
            <h4 className="text-gold text-[11px] uppercase tracking-[0.25em] font-bold mb-8">QUICK LINKS</h4>
            <ul className="flex flex-col gap-4">
              {[
                { label: "About Us", to: "/#about" },
                { label: "Our Journey", to: "/#journey" },
                { label: "Testimonials", to: "/#testimonials" },
                { label: "Contact", to: "/#contact" }
              ].map((item) => (
                <li key={item.label}>
                  <HashLink smooth to={item.to} className="text-cream/45 text-sm transition-all hover:text-gold hover:translate-x-1 flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold/0 group-hover:bg-gold transition-all" />
                    {item.label}
                  </HashLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-reveal">
            <h4 className="text-gold text-[11px] uppercase tracking-[0.25em] font-bold mb-8">SERVICES</h4>
            <ul className="flex flex-col gap-4">
              {[
                { label: "Herbal Medicine", to: "/#services" },
                { label: "Nutrition Education", to: "/#services" },
                { label: "Tourism & Tracking", to: "/#tourism" },
                { label: "Mobile Camps", to: "/#services" }
              ].map((item) => (
                <li key={item.label}>
                  <HashLink smooth to={item.to} className="text-cream/45 text-sm transition-all hover:text-gold hover:translate-x-1 flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold/0 group-hover:bg-gold transition-all" />
                    {item.label}
                  </HashLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-reveal">
            <h4 className="text-gold text-[11px] uppercase tracking-[0.25em] font-bold mb-8">TOURISM</h4>
            <ul className="flex flex-col gap-4">
              {["Gorilla Tracking", "Chimp Tracking", "Bird Watching", "Game Drive", "Car Hire"].map((item) => (
                <li key={item}>
                  <HashLink smooth to="/#tourism" className="text-cream/45 text-sm transition-all hover:text-gold hover:translate-x-1 flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold/0 group-hover:bg-gold transition-all" />
                    {item}
                  </HashLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-reveal">
            <h4 className="text-gold text-[11px] uppercase tracking-[0.25em] font-bold mb-8">CONTACT</h4>
            <ul className="flex flex-col gap-6">
              <li className="flex gap-4 items-start">
                <MapPin className="text-gold w-5 h-5 shrink-0 mt-0.5" />
                <span className="text-cream/45 text-sm leading-relaxed">Bikurungu, Rukungiri District, Western Uganda</span>
              </li>
              <li className="flex gap-4 items-center">
                <Phone className="text-gold w-5 h-5 shrink-0" />
                <span className="text-cream/45 text-sm">+256 7XX XXX XXX</span>
              </li>
              <li className="flex gap-4 items-center">
                <Mail className="text-gold w-5 h-5 shrink-0" />
                <span className="text-cream/45 text-sm">info@bitwiire.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-gold/10 flex flex-col md:flex-row justify-between items-center gap-6 footer-reveal">
          <p className="text-cream/30 text-[12px] text-center md:text-left">
            © 2026 Bitwiire Herbs Cafe Villages and Conservation. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <Link to="/privacy" className="text-cream/30 text-[12px] hover:text-gold transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-cream/30 text-[12px] hover:text-gold transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
