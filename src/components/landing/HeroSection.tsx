
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "../ui/button";

interface HeroSectionProps {
  onStartCreating: () => void;
}

export const HeroSection = ({ onStartCreating }: HeroSectionProps) => {
  return (
    <div className="relative px-4 py-16 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
          alt="Background"
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-app-dark/90 to-app-dark/70" />
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#9b87f5] via-[#b8a4f8] to-[#D6BCFA] mb-6">
            Get Your Music on More Playlists with Professional Pitches
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-4">
            Triple Your Acceptance Rate with Compelling Pitches that Curators Actually Read
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
                <span className="text-sm">3 artists created pitches in the last hour</span>
              </span>
            </div>
          </div>

          <Button
            size="lg"
            className="bg-app-accent hover:bg-app-accent/90 text-white px-8 py-6 text-lg rounded-full"
            onClick={onStartCreating}
          >
            Get Playlisted Today <ArrowRight className="ml-2" />
          </Button>
          
          <p className="mt-4 text-sm text-white/60">
            One-time payment • No subscription • Takes just 10 minutes
          </p>
        </motion.div>
      </div>
    </div>
  );
};
