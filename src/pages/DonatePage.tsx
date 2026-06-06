import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Heart, 
  ShieldCheck, 
  Leaf, 
  CheckCircle2,
  CreditCard,
  Smartphone,
  Building2,
  Loader2,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function DonatePage() {
  const [amount, setAmount] = useState("25");
  const [frequency, setFrequency] = useState("one-time");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    paymentDetail: ""
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
      const response = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          frequency,
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          campaignId: "general"
        })
      });
      
      if (response.ok) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error("Error submitting donation:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg-forest">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="max-w-md w-full glass-card overflow-hidden shadow-2xl"
        >
          <div className="bg-gold p-10 text-center relative overflow-hidden">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 12, delay: 0.2 }}
              className="w-20 h-20 bg-forest rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl relative z-10"
            >
              <CheckCircle2 className="text-gold w-10 h-10" />
            </motion.div>
            <h3 className="text-3xl font-serif font-bold text-forest relative z-10">Thank You</h3>
            <p className="text-forest/60 text-[10px] font-bold mt-2 uppercase tracking-[0.3em] relative z-10">Nature Is Hope</p>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          </div>

          <div className="p-10 space-y-8">
            <div className="space-y-5">
              <div className="flex justify-between items-center border-b border-gold/10 pb-4">
                <span className="text-cream/40 text-[10px] uppercase tracking-widest font-bold">Amount</span>
                <span className="text-gold font-serif text-2xl font-bold">${amount}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gold/10 pb-4">
                <span className="text-cream/40 text-[10px] uppercase tracking-widest font-bold">Frequency</span>
                <span className="text-cream/80 text-sm font-medium capitalize">{frequency}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gold/10 pb-4">
                <span className="text-cream/40 text-[10px] uppercase tracking-widest font-bold">Donor</span>
                <span className="text-cream/80 text-sm font-medium">{formData.firstName} {formData.lastName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-cream/40 text-[10px] uppercase tracking-widest font-bold">Transaction ID</span>
                <span className="text-cream/30 text-[10px] font-mono">BPM-{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
              </div>
            </div>

            <p className="text-cream/50 text-[13px] leading-relaxed text-center italic font-serif">
              "Your contribution directly supports medicinal plant conservation and community healing in Western Uganda."
            </p>

            <Button 
              onClick={() => setIsSubmitted(false)}
              className="btn-gold w-full h-14 text-xs tracking-widest"
            >
              RETURN HOME
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div ref={mainRef} className="min-h-screen bg-forest pt-32 pb-24 px-6">
      <div className="container max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-24 items-start">
          {/* LEFT COLUMN: INFO */}
          <div className="flex flex-col">
            <div className="reveal-up">
              <div className="sec-tag">Support Bitwiire</div>
              <h2 className="text-5xl md:text-6xl font-serif font-bold text-cream leading-[1.1] mb-8">
                Give the gift of <em className="italic text-gold font-normal">healing</em> to those in need
              </h2>
              <p className="text-cream/60 text-lg leading-relaxed mb-12">
                Bitwiire Plant Medics sustains its work through the generosity of donors who believe in nature's power to heal. Your support keeps our medicinal gardens growing and our practitioners in the field.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {[
                { amt: "$50 USD", val: "50", desc: "Provides one community member with a full herbal consultation" },
                { amt: "$25 USD", val: "25", desc: "Funds one week of medicinal plant garden maintenance" },
                { amt: "$100 USD", val: "100", desc: "Sponsors a community nutrition education workshop" },
                { amt: "$500 USD", val: "500", desc: "Seeds an entire new medicinal garden plot in Rukungiri" }
              ].map((item, i) => (
                <div 
                  key={i} 
                  onClick={() => setAmount(item.val)}
                  className="reveal-up group bg-white/5 border border-gold/15 rounded-3xl p-8 cursor-pointer transition-all duration-500 hover:border-gold/50 hover:bg-white/10 hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="font-serif text-3xl font-bold text-gold mb-3 transition-transform duration-500 group-hover:scale-105 origin-left">{item.amt}</div>
                  <div className="text-[13px] text-cream/50 leading-relaxed transition-colors duration-500 group-hover:text-cream/70">{item.desc}</div>
                </div>
              ))}
            </div>

            <div className="reveal-up border-l-2 border-gold/30 pl-8 py-4">
              <blockquote className="font-serif text-xl italic text-cream/70 leading-relaxed mb-4">
                "A sanctuary dedicated to the restoration of health and the preservation of biodiversity in Western Uganda."
              </blockquote>
              <div className="text-[11px] text-gold font-bold uppercase tracking-widest">— Bitwiire Plant Medics</div>
            </div>
          </div>

          {/* RIGHT COLUMN: FORM */}
          <div className="reveal-up">
            <Card className="bg-forest-2 border border-gold/10 rounded-[40px] p-10 md:p-14 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
              
              <div className="relative z-10">
                <h3 className="text-3xl font-serif font-bold text-cream mb-2">Make a Donation</h3>
                <p className="text-cream/40 text-sm mb-12">100% goes to healing, conservation & community.</p>

                <form onSubmit={handleSubmit} className="space-y-10">
                  {/* Frequency Toggle */}
                  <div className="flex bg-white/5 border border-gold/10 rounded-full overflow-hidden p-1.5">
                    {["one-time", "monthly", "annually"].map((f) => (
                      <button
                        key={f}
                        type="button"
                        onClick={() => setFrequency(f)}
                        className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full transition-all duration-500 ${
                          frequency === f ? "bg-gold text-forest shadow-lg" : "text-cream/40 hover:text-cream"
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>

                  {/* Amount Presets */}
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { val: "10", label: "Seed" },
                      { val: "25", label: "Sprout" },
                      { val: "50", label: "Bloom" },
                      { val: "100", label: "Grove" },
                      { val: "250", label: "Forest" },
                      { val: "500", label: "Sanctuary" }
                    ].map((preset) => (
                      <button
                        key={preset.val}
                        type="button"
                        onClick={() => setAmount(preset.val)}
                        className={`flex flex-col items-center justify-center p-5 border rounded-2xl transition-all duration-500 hover:-translate-y-1 ${
                          amount === preset.val 
                            ? "border-gold bg-gold/10 text-gold shadow-lg shadow-gold/5" 
                            : "border-gold/10 bg-white/5 text-cream/60 hover:border-gold/40"
                        }`}
                      >
                        <span className="text-xl font-bold font-serif">${preset.val}</span>
                        <span className={`text-[9px] uppercase tracking-widest font-bold mt-2 ${
                          amount === preset.val ? "text-gold" : "text-cream/30"
                        }`}>
                          {preset.label}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Custom Amount */}
                  <div className="relative group">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-serif font-bold text-gold/40 group-focus-within:text-gold transition-colors">$</span>
                    <Input 
                      type="number"
                      placeholder="Custom amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full bg-white/5 border border-gold/10 rounded-2xl h-16 pl-12 text-2xl font-serif font-bold text-cream focus:border-gold/50 focus-visible:ring-0 transition-all placeholder:text-cream/10"
                    />
                  </div>

                  <div className="h-px bg-gold/10" />

                  {/* Personal Info */}
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label className="text-[10px] font-bold uppercase tracking-widest text-cream/40 ml-1">First Name</Label>
                        <Input 
                          required
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="Jane" 
                          className="bg-white/5 border border-gold/10 rounded-xl h-14 text-cream focus:border-gold/50 focus-visible:ring-0 transition-all" 
                        />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-[10px] font-bold uppercase tracking-widest text-cream/40 ml-1">Last Name</Label>
                        <Input 
                          required
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="Doe" 
                          className="bg-white/5 border border-gold/10 rounded-xl h-14 text-cream focus:border-gold/50 focus-visible:ring-0 transition-all" 
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label className="text-[10px] font-bold uppercase tracking-widest text-cream/40 ml-1">Email Address</Label>
                      <Input 
                        required
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        type="email" 
                        placeholder="jane@example.com" 
                        className="bg-white/5 border border-gold/10 rounded-xl h-14 text-cream focus:border-gold/50 focus-visible:ring-0 transition-all" 
                      />
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div className="space-y-6">
                    <Label className="text-[10px] font-bold uppercase tracking-widest text-cream/40 ml-1">Payment Method</Label>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { icon: Smartphone, label: "MTN Money" },
                        { icon: Smartphone, label: "Airtel Money" },
                        { icon: CreditCard, label: "Card" }
                      ].map((method, i) => (
                        <div key={i} className="bg-gold/10 border border-gold/30 text-gold rounded-xl px-5 py-3 text-[11px] font-bold flex items-center gap-3 hover:bg-gold/20 transition-colors cursor-pointer">
                          <method.icon className="w-4 h-4" /> {method.label}
                        </div>
                      ))}
                    </div>
                    <Input 
                      required
                      name="paymentDetail"
                      value={formData.paymentDetail}
                      onChange={handleChange}
                      placeholder="Phone number or card detail" 
                      className="bg-white/5 border border-gold/10 rounded-xl h-14 text-cream focus:border-gold/50 focus-visible:ring-0 transition-all" 
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="btn-gold w-full h-20 text-xs tracking-[0.3em] font-bold group"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                      <span className="flex items-center gap-4">
                        DONATE ${amount || "0"} <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                      </span>
                    )}
                  </Button>
                  
                  <p className="text-center text-[10px] text-cream/20 tracking-[0.2em] uppercase font-bold">
                    Secure · Encrypted · Transparent
                  </p>
                </form>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
