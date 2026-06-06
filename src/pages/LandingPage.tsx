import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform, animate, AnimatePresence } from "motion/react";
import { 
  Heart, 
  ArrowRight, 
  ShieldCheck, 
  Users, 
  Leaf, 
  Star,
  MapPin,
  Phone,
  Navigation,
  CheckCircle2,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HERO_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=2070&auto=format&fit=crop",
    title: "Nature's Healing",
    subtitle: "Preserving Uganda's Heritage"
  },
  {
    url: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2070&auto=format&fit=crop",
    title: "Organic Wisdom",
    subtitle: "Ancient Plants, Modern Health"
  },
  {
    url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop",
    title: "Wild Sanctuary",
    subtitle: "Protecting Biodiversity"
  }
];

export default function LandingPage() {
  const [currentHero, setCurrentHero] = useState(0);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP Reveal Animations
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".reveal-up").forEach((elem: any) => {
        gsap.fromTo(elem, 
          { opacity: 0, y: 50 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1.2, 
            ease: "power3.out",
            scrollTrigger: {
              trigger: elem,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      });
    }, mainRef);

    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);

    return () => {
      ctx.revert();
      clearInterval(interval);
    };
  }, []);

  return (
    <div ref={mainRef} className="flex flex-col">
      {/* HERO SECTION WITH CAROUSEL */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentHero}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 z-0"
          >
            <img 
              src={HERO_IMAGES[currentHero].url} 
              alt="Hero" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-forest/80 via-forest/40 to-forest z-10" />
          </motion.div>
        </AnimatePresence>

        <div className="container max-w-5xl mx-auto relative z-20 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="text-gold text-[12px] font-bold tracking-[0.3em] uppercase mb-6">
              {HERO_IMAGES[currentHero].subtitle}
            </div>
            
            <h1 className="hero-headline mb-8">
              {HERO_IMAGES[currentHero].title.split(' ')[0]} <br />
              <span className="hero-headline-accent">{HERO_IMAGES[currentHero].title.split(' ').slice(1).join(' ')}</span>
            </h1>

            <p className="text-cream/80 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
              Join us in preserving Uganda's medicinal plant heritage and bringing natural health services to communities across Western Uganda.
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <Link to="/donate">
                <Button className="btn-gold px-12 h-16 text-xs tracking-[0.3em] group">
                  DONATE NOW <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
              <Link to="/campaigns">
                <Button variant="outline" className="btn-outline-gold px-12 h-16 text-xs tracking-[0.3em] group">
                  VIEW CAMPAIGNS <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Carousel Controls */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex items-center gap-8">
          <button 
            onClick={() => setCurrentHero((prev) => (prev - 1 + HERO_IMAGES.length) % HERO_IMAGES.length)}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            {HERO_IMAGES.map((_, i) => (
              <div 
                key={i} 
                className={`h-1 transition-all duration-500 rounded-full ${currentHero === i ? "w-8 bg-gold" : "w-2 bg-white/20"}`}
              />
            ))}
          </div>
          <button 
            onClick={() => setCurrentHero((prev) => (prev + 1) % HERO_IMAGES.length)}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-24 px-6 bg-forest-2 reveal-up scroll-mt-20">
        <div className="container max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="flex flex-col">
              <div className="sec-tag">Our Story</div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-cream leading-tight mb-6">
                A <em className="italic text-gold font-normal">sanctuary</em> of biodiversity<br />& healing
              </h2>
              <p className="text-cream/65 text-lg leading-relaxed mb-6">
                Nestled along the Rukungiri–Kanungu–Ishasha–Bwindi Road in Bikurungu Town Council, Bitwiire Plant Medics is a living testament to the healing power of Uganda's extraordinary plant life.
              </p>
              <p className="text-cream/65 text-lg leading-relaxed mb-8">
                We combine ancient indigenous plant wisdom with modern understanding to offer natural health services, eco-lodges, medicinal gardens, and community wellness programs — all in one extraordinary sanctuary in Western Uganda.
              </p>
              <div className="flex flex-wrap gap-2.5">
                {[
                  "Herbal Medicine", "Eco-Lodges", "Plant Consultations", 
                  "Gorilla Tracking", "Medicinal Gardens", "Herbs Tea"
                ].map((pill) => (
                  <span key={pill} className="bg-gold/10 border border-gold/25 text-gold-light text-[13px] font-medium px-4 py-1.5 rounded-full">
                    🌿 {pill}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: "🏥", title: "Plant Medic Hospital", desc: "Comprehensive natural health services and emergency care using indigenous plant remedies." },
                { icon: "♨️", title: "Hot Springs", desc: "Natural therapeutic hot springs for healing, relaxation, and mineral-rich wellness treatments." },
                { icon: "🏕", title: "Eco-Lodges", desc: "Sustainable luxury accommodation immersed in wilderness — full treatment plan included." },
                { icon: "🌍", title: "Mobile Camps", desc: "Immersive health retreats deep in nature — detox, stress relief, and healing in the wild." }
              ].map((item, i) => (
                <div key={i} className="bg-white/5 border border-gold/12 rounded-2xl p-6 transition-all duration-500 hover:bg-white/10 hover:border-gold/30 hover:-translate-y-1 hover:shadow-lg group">
                  <div className="text-3xl mb-4 transition-transform duration-500 group-hover:scale-110">{item.icon}</div>
                  <h4 className="text-cream font-semibold text-base mb-2 transition-colors duration-500 group-hover:text-gold">{item.title}</h4>
                  <p className="text-cream/55 text-[13px] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONDITIONS SECTION */}
      <section id="conditions" className="py-24 px-6 bg-forest reveal-up scroll-mt-20">
        <div className="container max-w-7xl mx-auto text-center">
          <div className="sec-tag">We Treat</div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-cream leading-tight mb-6">
            Conditions We <em className="italic text-gold font-normal">Heal Naturally</em>
          </h2>
          <p className="text-cream/60 text-lg max-w-2xl mx-auto mb-16">
            Our expert plant medics and practitioners offer natural treatments for a wide range of health conditions using Uganda's rich medicinal biodiversity.
          </p>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {[
              "Ulcers", "Joint Pain", "Itching Skin", "Acne & Pimples", "Hepatitis", 
              "Diabetes", "Hypertension", "Malaria", "Arthritis", "Infertility", 
              "Kidney Issues", "Respiratory Problems", "Back Pain", "Skin Infections", 
              "High Cholesterol", "Anaemia", "Wound Healing", "Migraines"
            ].map((cond) => (
              <span key={cond} className="bg-white/5 border border-gold/18 text-cream/80 text-sm font-medium px-5 py-2.5 rounded-full transition-all hover:bg-gold/12 hover:border-gold hover:text-gold-light cursor-default">
                {cond}
              </span>
            ))}
          </div>
          <p className="mt-10 text-cream/40 text-sm tracking-wide">
            …and many more — <Link to="/donate" className="text-gold font-semibold hover:underline">contact us for a personal consultation</Link>
          </p>
        </div>
      </section>

      {/* JOURNEY SECTION */}
      <section id="journey" className="py-24 px-6 bg-forest-2 reveal-up scroll-mt-20">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="sec-tag">Your Healing Journey</div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-cream leading-tight mb-6">
              A guided path to <em className="italic text-gold font-normal">natural recovery</em>
            </h2>
            <p className="text-cream/60 text-lg max-w-2xl mx-auto">
              A simple, personalised process to restore your health in harmony with nature.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: 1, title: "Initial Consultation", desc: "Discuss your health history and goals with our expert plant medic practitioners." },
              { step: 2, title: "Personalised Plan", desc: "Receive your tailored herbal programme, crafted from Uganda's extraordinary medicinal plants." },
              { step: 3, title: "Begin Treatment", desc: "Start healing with ongoing practitioner support, surrounded by the restorative power of nature." },
              { step: 4, title: "Full Recovery", desc: "Monitor your progress and sustain lasting results with follow-up care and lifestyle guidance." }
            ].map((item) => (
              <div key={item.step} className="group bg-white/5 border border-gold/12 rounded-[24px] p-8 relative overflow-hidden transition-all duration-500 hover:border-gold/40 hover:-translate-y-2 hover:shadow-2xl">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                <div className="w-12 h-12 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center font-serif text-lg font-bold text-gold mb-6 transition-all duration-500 group-hover:bg-gold group-hover:text-forest">
                  {item.step}
                </div>
                <h4 className="text-cream font-serif text-lg font-semibold mb-3 transition-colors duration-500 group-hover:text-gold">{item.title}</h4>
                <p className="text-cream/55 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id="testimonials" className="py-24 px-6 bg-forest reveal-up scroll-mt-20">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="sec-tag">Patient Stories</div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-cream leading-tight mb-6">
              Healing that <em className="italic text-gold font-normal">speaks for itself</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Sarah K.", role: "Joint Pain Treatment", initial: "SK", quote: "The herbal medicine treatment completely resolved my joint pain after years of suffering. The practitioners truly understand the healing power of plants." },
              { name: "James M.", role: "Eco-Tourism Guest", initial: "JM", quote: "Gorilla tracking combined with the medicinal garden tour was the most transformative experience of my life. Bitwiire is truly unique." },
              { name: "Amara N.", role: "Nutrition Programme", initial: "AN", quote: "The nutrition education programme changed how my entire family eats. We've never felt healthier or more connected to natural food." }
            ].map((item, i) => (
              <div key={i} className="bg-white/5 border border-gold/14 rounded-[24px] p-8 transition-all duration-500 hover:border-gold/40 hover:bg-white/10 hover:-translate-y-2 hover:shadow-xl group">
                <div className="flex gap-1 mb-4 transition-transform duration-500 group-hover:translate-x-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />)}
                </div>
                <p className="font-serif text-base italic text-cream/80 leading-relaxed mb-6 transition-colors duration-500 group-hover:text-cream">
                  "{item.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center font-serif text-sm font-bold text-gold transition-all duration-500 group-hover:scale-110 group-hover:bg-gold group-hover:text-forest">
                    {item.initial}
                  </div>
                  <div>
                    <div className="text-cream font-semibold text-sm transition-colors duration-500 group-hover:text-gold">{item.name}</div>
                    <div className="text-gold text-[11px] font-medium mt-0.5">{item.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 px-6 bg-forest reveal-up scroll-mt-20">
        <div className="container max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="flex flex-col">
              <div className="sec-tag">Find Us</div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-cream leading-tight mb-6 text-left">
                In the heart of<br />Western <em className="italic text-gold font-normal">Uganda</em>
              </h2>
              <p className="text-cream/60 text-lg leading-relaxed mb-8">
                We are located along the scenic Rukungiri–Kanungu–Ishasha–Bwindi Road, at Bitwiiire Lane in Bikurungu Town Council — just 20km from the heart of Rukungiri, gateway to Bwindi Impenetrable Forest.
              </p>
              <div className="space-y-4">
                {[
                  { icon: <MapPin className="w-4 h-4" />, label: "Address", val: "Bitwiiire Lane, Bikurungu Town Council, Rukungiri District, Uganda" },
                  { icon: <Phone className="w-4 h-4" />, label: "Phone", val: "0777 023 253 / 0760 425 587" },
                  { icon: <Navigation className="w-4 h-4" />, label: "Route", val: "Rukungiri–Kanungu–Ishasha–Bwindi Road" }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-[10px] bg-gold/12 border border-gold/20 flex items-center justify-center text-gold shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-[11px] font-bold tracking-[0.08em] uppercase text-gold mb-1">{item.label}</div>
                      <div className="text-cream/75 text-sm leading-relaxed">{item.val}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div id="tourism" className="flex flex-wrap gap-2.5 mt-10 scroll-mt-24">
                {[
                  "Gorilla Tracking", "Chimp Tracking", "Bird Watching", 
                  "Game Drive", "Car Hire"
                ].map((tag) => (
                  <span key={tag} className="bg-gold/8 border border-gold/20 text-gold-light text-[13px] font-medium px-4 py-2 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-forest-3/30 border border-gold/15 rounded-[20px] aspect-[4/3] flex flex-col items-center justify-center gap-4 text-cream/35 group hover:border-gold/30 transition-colors">
              <MapPin className="w-12 h-12 opacity-70 group-hover:scale-110 transition-transform duration-500" />
              <div className="text-center">
                <p className="text-cream/70 font-medium">Bikurungu, Rukungiri District</p>
                <p className="text-[10px] tracking-[0.06em] uppercase text-gold mt-1">Western Uganda · Near Bwindi</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="py-20 px-6 bg-gold text-center">
        <div className="container max-w-3xl mx-auto">
          <h2 className="text-4xl font-serif font-bold text-forest leading-tight mb-4">
            Ready to be part of something <em className="italic text-forest-2 font-normal">extraordinary</em>?
          </h2>
          <p className="text-forest/65 text-lg mb-10 leading-relaxed">
            Whether you donate, volunteer, or simply share our story — you are helping preserve Uganda's botanical heritage and bringing natural healing to those who need it most.
          </p>
          <Link to="/donate">
            <Button className="bg-forest text-gold hover:bg-forest-2 font-sans font-bold uppercase tracking-[0.06em] px-10 py-4 rounded-full transition-all hover:-translate-y-1 flex items-center gap-2.5 mx-auto">
              <Heart className="w-4 h-4 fill-current" />
              Donate Now · Nature Is Hope
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
