import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Heart, MapPin, Calendar, Users, Sprout, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

interface Campaign {
  id: string | number;
  title: string;
  description: string;
  image: string;
  raised: number;
  goal: number;
  donors?: number;
}

export default function CampaignsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch("/api/campaigns");
        const data = await response.json();
        setCampaigns(data);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  useEffect(() => {
    if (!loading && campaigns.length > 0 && gridRef.current) {
      gsap.fromTo(gridRef.current.children, 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.1, 
          ease: "power3.out",
          delay: 0.2
        }
      );
    }
  }, [loading, campaigns]);

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    campaign.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-forest">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-6xl mb-8"
        >
          🌿
        </motion.div>
        <p className="text-gold font-serif text-xl italic animate-pulse">Gathering nature's gifts...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24">
      {/* HEADER */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-forest-3 to-forest relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <svg viewBox="0 0 400 400" className="w-full h-full fill-gold"><path d="M300 100C200 120 150 200 100 300L150 320l20-50A100 100 0 00200 250c100 0 150-100 100-200a50 50 0 00-50 20 60 60 0 010 50 50 50 0 00-50 20A60 60 0 01250 200c-10 20-30 40-60 40"/></svg>
        </div>
        
        <div className="container max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <div className="sec-tag">Healing Missions</div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-cream leading-[1.1] mb-8">
              Active <em className="hero-headline-accent">Campaigns</em>
            </h1>
            <p className="text-cream/60 text-lg md:text-xl leading-relaxed mb-12">
              Every campaign is a step towards preserving Uganda's botanical heritage and providing natural healthcare to those in need.
            </p>

            <div className="relative max-w-xl group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/50 w-5 h-5 group-focus-within:text-gold transition-colors" />
              <Input 
                type="text"
                placeholder="Search campaigns..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/5 border-gold/20 h-14 pl-12 rounded-2xl text-cream focus:border-gold/50 transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CAMPAIGNS GRID */}
      <section className="px-6">
        <div className="container max-w-7xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filteredCampaigns.length > 0 ? (
              <motion.div 
                layout
                ref={gridRef} 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredCampaigns.map((campaign) => {
                  const progress = Math.min(100, Math.round((campaign.raised / campaign.goal) * 100));
                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4 }}
                      key={campaign.id}
                      className="campaign-card group bg-white/5 border border-gold/10 rounded-[32px] overflow-hidden flex flex-col transition-all duration-700 hover:border-gold/40 hover:-translate-y-3 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] relative"
                    >
                      {/* Image Section */}
                      <div className="relative h-72 overflow-hidden">
                        <img 
                          src={campaign.image} 
                          alt={campaign.title}
                          className="w-full h-full object-cover transition-transform duration-[1.5s] cubic-bezier(0.22, 1, 0.36, 1) group-hover:scale-110"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-40" />
                        
                        <div className="absolute top-6 left-6 flex flex-col gap-2">
                          <div className="bg-gold/90 backdrop-blur-md text-forest text-[9px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-xl transform -translate-x-4 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
                            Active Mission
                          </div>
                        </div>

                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="w-16 h-16 rounded-full bg-gold/20 backdrop-blur-sm border border-gold/30 flex items-center justify-center transform scale-50 group-hover:scale-100 transition-transform duration-500">
                            <Heart className="text-gold w-6 h-6 fill-gold/20" />
                          </div>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-10 flex flex-col flex-1 relative z-10">
                        <div className="mb-6 flex items-center gap-3">
                          <div className="w-8 h-px bg-gold/30 group-hover:w-12 transition-all duration-500" />
                          <span className="text-gold text-[10px] font-bold uppercase tracking-[0.2em]">Community Impact</span>
                        </div>

                        <h3 className="text-3xl font-serif font-bold text-cream mb-4 transition-all duration-500 group-hover:text-gold group-hover:translate-x-1">
                          {campaign.title}
                        </h3>
                        
                        <p className="text-cream/40 text-sm leading-relaxed mb-10 line-clamp-3 transition-colors duration-500 group-hover:text-cream/70">
                          {campaign.description}
                        </p>

                        <div className="space-y-6 mt-auto">
                          <div className="flex justify-between items-end">
                            <div className="flex flex-col gap-1">
                              <span className="text-cream/30 text-[9px] font-bold uppercase tracking-widest">Amount Raised</span>
                              <span className="text-gold font-serif text-2xl font-bold">${campaign.raised.toLocaleString()}</span>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                              <span className="text-gold text-xs font-bold">{progress}%</span>
                              <span className="text-cream/30 text-[9px] font-bold uppercase tracking-widest">Progress</span>
                            </div>
                          </div>

                          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                            <motion.div 
                              initial={{ width: 0 }}
                              whileInView={{ width: `${progress}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
                              className="h-full bg-gradient-to-r from-gold/80 to-gold relative"
                            >
                              <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:20px_20px] animate-[shimmer_2s_linear_infinite]" />
                            </motion.div>
                          </div>

                          <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-cream/20">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-3 h-3 text-gold/40" />
                              <span>Western Uganda</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="w-3 h-3 text-gold/40" />
                              <span>{campaign.donors || Math.floor(campaign.raised / 50)} Donors</span>
                            </div>
                          </div>
                        </div>

                        <Link to="/donate" className="mt-10">
                          <Button className="w-full btn-gold h-14 group/btn relative overflow-hidden">
                            <span className="relative z-10 flex items-center justify-center gap-3">
                              SUPPORT MISSION <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                            </span>
                          </Button>
                        </Link>
                      </div>
                      
                      {/* Decorative Corner */}
                      <div className="absolute bottom-0 right-0 w-24 h-24 bg-gold/5 rounded-tl-[100px] translate-x-12 translate-y-12 transition-transform duration-700 group-hover:translate-x-8 group-hover:translate-y-8" />
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-32"
              >
                <div className="text-6xl mb-6 opacity-20">🍃</div>
                <p className="text-cream/40 text-xl font-serif italic">No healing missions found matching your search.</p>
                <Button 
                  variant="link" 
                  className="text-gold mt-4 font-bold uppercase tracking-widest text-xs"
                  onClick={() => setSearchQuery("")}
                >
                  Clear Search
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
