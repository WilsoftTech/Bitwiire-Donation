import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Loader2, Sparkles, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

interface Message {
  role: "user" | "model";
  text: string;
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "model", text: "Hello! I am your Bitwiire Plant Medic AI. How can I help you today with information about natural healing, our campaigns, or medicinal plants?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMessage }]);
    setIsTyping(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: messages.map(m => ({ role: m.role, parts: [{ text: m.text }] })).concat([{ role: "user", parts: [{ text: userMessage }] }]),
        config: {
          systemInstruction: "You are the Bitwiire Plant Medic AI, an expert in traditional Ugandan herbal medicine and conservation. Your goal is to provide helpful, accurate information about medicinal plants, natural healing practices, and the Bitwiire Plant Medics organization. Be warm, professional, and encouraging. If asked about medical advice, always include a disclaimer that you are an AI and users should consult with a qualified practitioner at Bitwiire or their local healthcare provider.",
        }
      });

      const aiText = response.text || "I'm sorry, I couldn't process that. Please try again.";
      setMessages(prev => [...prev, { role: "model", text: aiText }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: "model", text: "I'm having trouble connecting to my roots right now. Please try again in a moment." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[1000]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-20 right-0 w-[350px] md:w-[400px] h-[500px] bg-forest border border-gold/20 rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-gold/10 bg-forest-2 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gold rounded-lg flex items-center justify-center">
                  <Leaf className="text-forest w-5 h-5" />
                </div>
                <div>
                  <div className="text-cream font-serif font-bold text-sm">Plant Medic AI</div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] text-gold/60 uppercase tracking-wider font-bold">Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-cream/40 hover:text-cream transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-grow overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gold/20"
            >
              {messages.map((m, i) => (
                <div 
                  key={i} 
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                    m.role === "user" 
                      ? "bg-gold text-forest rounded-tr-none font-medium" 
                      : "bg-white/5 text-cream/90 border border-gold/10 rounded-tl-none"
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-gold/10 p-3 rounded-2xl rounded-tl-none flex gap-1">
                    <div className="w-1.5 h-1.5 bg-gold/40 rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-gold/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-1.5 h-1.5 bg-gold/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gold/10 bg-forest-2">
              <div className="relative">
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask about medicinal plants..."
                  className="w-full bg-forest border border-gold/20 rounded-xl py-3 pl-4 pr-12 text-sm text-cream placeholder:text-cream/20 focus:outline-none focus:border-gold/60 transition-all"
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-gold text-forest rounded-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-all"
                >
                  {isTyping ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </button>
              </div>
              <div className="mt-2 text-[9px] text-center text-cream/20 uppercase tracking-widest font-bold">
                Powered by Gemini AI
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 ${
          isOpen ? "bg-forest border border-gold/40 text-gold" : "bg-gold text-forest"
        }`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-forest rounded-full" />
        )}
      </motion.button>
    </div>
  );
}
