import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

interface HeroSectionProps {
  onStartCreating: () => void;
}

export const HeroSection = ({ onStartCreating }: HeroSectionProps) => {
  return (
    <div className="relative px-4 py-16 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/lovable-uploads/23b2e4b3-d203-441c-ac99-8fbf0bb8b684.png"
          alt="Music Pitch Creator Hero"
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
            Craft Perfect Music Pitches Online
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
            Create compelling music pitches that get noticed, all for just{" "}
            <span className="text-app-accent font-semibold">$1</span>
          </p>
          <Button
            size="lg"
            className="bg-app-accent hover:bg-app-accent/90 text-white px-8 py-6 text-lg rounded-full"
            onClick={onStartCreating}
          >
            Start Creating <ArrowRight className="ml-2" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};