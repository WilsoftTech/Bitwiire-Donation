import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageSquare, 
  Clock,
  Globe,
  Instagram,
  Twitter,
  Facebook,
  CheckCircle2,
  Loader2,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: ""
  });
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".reveal-up").forEach((elem: any) => {
        gsap.fromTo(elem, 
          { opacity: 0, y: 30 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1, 
            ease: "power3.out",
            scrollTrigger: {
              trigger: elem,
              start: "top 90%",
            }
          }
        );
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div ref={mainRef} className="flex flex-col min-h-screen bg-forest">
      {/* HERO SECTION */}
      <section className="pt-40 pb-20 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-gold/5 to-transparent pointer-events-none" />
        <div className="container max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="sec-tag">Get in Touch</div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-cream mb-8 leading-[1.1]">
              Connect with <em className="italic text-gold font-normal">Nature's Healers</em>
            </h1>
            <p className="text-cream/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Have questions about our treatments, campaigns, or visiting our sanctuary? We're here to guide you on your journey to wellness.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CONTACT CONTENT */}
      <section className="pb-32 px-6">
        <div className="container max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* CONTACT INFO (4 cols) */}
            <div className="lg:col-span-4 space-y-8">
              <div className="reveal-up glass-card p-10 transition-all duration-500 hover:border-gold/30 hover:shadow-2xl group/card">
                <h3 className="text-2xl font-serif font-bold text-cream mb-10 flex items-center gap-4">
                  <div className="w-1.5 h-6 bg-gold rounded-full transition-all duration-500 group-hover/card:h-8" /> Contact Details
                </h3>
                
                <div className="space-y-8">
                  <div className="flex gap-5 group">
                    <div className="w-12 h-12 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0 transition-all duration-500 group-hover:bg-gold group-hover:text-forest group-hover:scale-110">
                      <Phone className="w-5 h-5 transition-transform group-hover:rotate-12" />
                    </div>
                    <div>
                      <div className="text-gold text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Call Us</div>
                      <div className="text-cream text-lg font-medium transition-colors group-hover:text-gold">+256 7XX XXX XXX</div>
                      <div className="text-cream/30 text-xs mt-1">Mon-Fri, 8am - 6pm</div>
                    </div>
                  </div>

                  <div className="flex gap-5 group">
                    <div className="w-12 h-12 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0 transition-all duration-500 group-hover:bg-gold group-hover:text-forest group-hover:scale-110">
                      <Mail className="w-5 h-5 transition-transform group-hover:-rotate-12" />
                    </div>
                    <div>
                      <div className="text-gold text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Email Us</div>
                      <div className="text-cream text-lg font-medium transition-colors group-hover:text-gold">info@bitwiire.com</div>
                      <div className="text-cream/30 text-xs mt-1">We reply within 24 hours</div>
                    </div>
                  </div>

                  <div className="flex gap-5 group">
                    <div className="w-12 h-12 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0 transition-all duration-500 group-hover:bg-gold group-hover:text-forest group-hover:scale-110">
                      <MapPin className="w-5 h-5 transition-transform group-hover:scale-110" />
                    </div>
                    <div>
                      <div className="text-gold text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Visit Us</div>
                      <div className="text-cream text-lg font-medium transition-colors group-hover:text-gold">Bikurungu, Rukungiri</div>
                      <div className="text-cream/30 text-xs mt-1">Western Uganda</div>
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-10 border-t border-gold/10">
                  <div className="text-gold text-[10px] font-bold uppercase tracking-[0.2em] mb-6">Follow Our Journey</div>
                  <div className="flex gap-4">
                    {[Instagram, Twitter, Facebook].map((Icon, i) => (
                      <button key={i} className="w-12 h-12 rounded-full border border-gold/20 flex items-center justify-center text-gold hover:bg-gold hover:text-forest transition-all duration-500 hover:-translate-y-2 hover:shadow-lg">
                        <Icon className="w-5 h-5" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="reveal-up bg-gold/5 border border-gold/15 rounded-[32px] p-10 transition-all duration-500 hover:bg-gold/10 hover:border-gold/40 hover:-translate-y-1 group">
                <h3 className="text-xl font-serif font-bold text-gold mb-6 flex items-center gap-3">
                  <Clock className="w-5 h-5 transition-transform group-hover:rotate-12" /> Opening Hours
                </h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between text-cream/60 transition-colors group-hover:text-cream/80">
                    <span className="font-bold uppercase tracking-widest text-[10px]">Monday - Friday</span>
                    <span className="text-cream font-medium">8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between text-cream/60 transition-colors group-hover:text-cream/80">
                    <span className="font-bold uppercase tracking-widest text-[10px]">Saturday</span>
                    <span className="text-cream font-medium">9:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between text-cream/60 transition-colors group-hover:text-cream/80">
                    <span className="font-bold uppercase tracking-widest text-[10px]">Sunday</span>
                    <span className="text-gold font-bold">Closed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CONTACT FORM (8 cols) */}
            <div className="lg:col-span-8">
              <div className="reveal-up bg-forest-2 border border-gold/10 rounded-[40px] p-10 md:p-16 relative overflow-hidden shadow-2xl transition-all duration-500 hover:border-gold/30 group/form">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl transition-all duration-700 group-hover/form:bg-gold/10" />
                
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.form 
                      key="contact-form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -20 }}
                      onSubmit={handleSubmit} 
                      className="space-y-10 relative z-10"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-3">
                          <label className="text-gold text-[10px] font-bold uppercase tracking-[0.2em] ml-1">Full Name</label>
                          <input 
                            required
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            type="text" 
                            placeholder="John Doe"
                            className="w-full bg-white/5 border border-gold/10 rounded-2xl px-6 py-5 text-cream placeholder:text-cream/10 focus:outline-none focus:border-gold/50 transition-all"
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="text-gold text-[10px] font-bold uppercase tracking-[0.2em] ml-1">Email Address</label>
                          <input 
                            required
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            type="email" 
                            placeholder="john@example.com"
                            className="w-full bg-white/5 border border-gold/10 rounded-2xl px-6 py-5 text-cream placeholder:text-cream/10 focus:outline-none focus:border-gold/50 transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-3">
                          <label className="text-gold text-[10px] font-bold uppercase tracking-[0.2em] ml-1">Phone Number</label>
                          <input 
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            type="tel" 
                            placeholder="+256 ..."
                            className="w-full bg-white/5 border border-gold/10 rounded-2xl px-6 py-5 text-cream placeholder:text-cream/10 focus:outline-none focus:border-gold/50 transition-all"
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="text-gold text-[10px] font-bold uppercase tracking-[0.2em] ml-1">Subject</label>
                          <div className="relative">
                            <select 
                              name="subject"
                              value={formData.subject}
                              onChange={handleChange}
                              className="w-full bg-white/5 border border-gold/10 rounded-2xl px-6 py-5 text-cream focus:outline-none focus:border-gold/50 transition-all appearance-none"
                            >
                              <option className="bg-forest">General Inquiry</option>
                              <option className="bg-forest">Treatment Consultation</option>
                              <option className="bg-forest">Donation Question</option>
                              <option className="bg-forest">Volunteering</option>
                            </select>
                            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gold/40">
                              <ChevronRight className="w-4 h-4 rotate-90" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-gold text-[10px] font-bold uppercase tracking-[0.2em] ml-1">Your Message</label>
                        <textarea 
                          required
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={6}
                          placeholder="How can we help you?"
                          className="w-full bg-white/5 border border-gold/10 rounded-2xl px-6 py-5 text-cream placeholder:text-cream/10 focus:outline-none focus:border-gold/50 transition-all resize-none"
                        />
                      </div>

                      <Button 
                        disabled={isSubmitting}
                        className="btn-gold w-full h-20 text-xs tracking-[0.3em] font-bold group"
                      >
                        {isSubmitting ? (
                          <Loader2 className="w-6 h-6 animate-spin" />
                        ) : (
                          <span className="flex items-center gap-4">
                            SEND MESSAGE <Send className="w-4 h-4 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                          </span>
                        )}
                      </Button>
                    </motion.form>
                  ) : (
                    <motion.div 
                      key="success-message"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center py-12 text-center"
                    >
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", damping: 12 }}
                        className="w-24 h-24 bg-gold/20 rounded-full flex items-center justify-center mb-8"
                      >
                        <CheckCircle2 className="w-12 h-12 text-gold" />
                      </motion.div>
                      <h3 className="text-4xl font-serif font-bold text-cream mb-4">Message Sent</h3>
                      <p className="text-cream/50 max-w-sm mb-10 leading-relaxed">
                        Thank you for reaching out. Our team will review your message and get back to you within 24 hours.
                      </p>
                      <Button 
                        variant="outline" 
                        className="btn-outline-gold h-14 px-10"
                        onClick={() => setIsSubmitted(false)}
                      >
                        SEND ANOTHER MESSAGE
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* MAP PLACEHOLDER */}
      <section className="px-6 pb-32">
        <div className="container max-w-7xl mx-auto">
          <div className="reveal-up w-full h-[500px] bg-white/5 border border-gold/10 rounded-[48px] overflow-hidden relative group cursor-pointer transition-all duration-500 hover:border-gold/40 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)]">
            <div className="absolute inset-0 bg-gradient-to-br from-forest/90 via-forest/40 to-transparent z-10 transition-opacity duration-500 group-hover:opacity-60" />
            <img 
              src="https://picsum.photos/seed/uganda-map/1920/800?grayscale" 
              alt="Map Location"
              className="w-full h-full object-cover opacity-20 transition-transform duration-[2000ms] cubic-bezier(0.22, 1, 0.36, 1) group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-10">
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-20 h-20 bg-gold rounded-full flex items-center justify-center shadow-[0_0_60px_rgba(212,175,55,0.4)] mb-8 transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_80px_rgba(212,175,55,0.6)]"
              >
                <MapPin className="text-forest w-10 h-10" />
              </motion.div>
              <h4 className="text-3xl font-serif font-bold text-cream mb-3 transition-colors duration-500 group-hover:text-gold">Find Us in Rukungiri</h4>
              <p className="text-gold font-bold tracking-[0.3em] uppercase text-xs">Bikurungu, Western Uganda</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
