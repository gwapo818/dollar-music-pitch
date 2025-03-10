
import { motion } from "framer-motion";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface HeroSectionProps {
  onStartCreating: () => void;
}

export const HeroSection = ({
  onStartCreating
}: HeroSectionProps) => {
  return <div className="relative px-4 py-16 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" alt="Background" className="w-full h-full object-cover opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-app-dark/90 to-app-dark/70" />
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6
      }}>
          {/* AI Badge */}
          <div className="flex justify-center mb-3">
            <Badge variant="outline" className="bg-app-accent/20 text-app-accent border-app-accent/30 px-3 py-1 text-sm font-medium flex items-center gap-1">
              <Sparkles size={14} />
              AI-Powered Technology
            </Badge>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#9b87f5] via-[#b8a4f8] to-[#D6BCFA] mb-6">Get Your Music on More Playlists with Professional AI Pitches</h1>
          <p className="text-xl md:text-2xl text-white/80 mb-4">Triple Your Acceptance Rate with Compelling AI Pitches that Curators Actually Read</p>
          <p className="text-lg md:text-xl text-white/80 mb-8">
            Our AI analyzes what playlist curators want to see in submissions
          </p>
          <p className="text-xl md:text-2xl text-white/80 mb-8">
            Professional pitch creation for just{" "}
            <span className="text-app-accent font-semibold">$7</span> <span className="text-white/60 line-through text-lg">not $50+ per pitch</span>
          </p>

          {/* Social Proof Banner */}
          <div className="flex justify-center items-center mb-8 text-white/80">
            <div className="flex space-x-2 bg-white/5 px-4 py-2 rounded-full">
              <span className="flex items-center text-green-400">
                <Check size={16} className="mr-1" /> 
                <span className="text-sm">32 artists created pitches in the last hour</span>
              </span>
            </div>
          </div>

          <Button size="lg" className="bg-app-accent hover:bg-app-accent/90 text-white px-8 py-6 text-lg rounded-full" onClick={onStartCreating}>
            Let AI Write Your Pitch Now <ArrowRight className="ml-2" />
          </Button>
          
          <p className="mt-4 text-sm text-white/60">One-time payment • No subscription • Takes just 20 Seconds!</p>
        </motion.div>
      </div>
    </div>;
};
