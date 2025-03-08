
import { motion } from "framer-motion";
import { Music2, Sparkles, Target, BrainCircuit, CircuitBoard, Bot } from "lucide-react";

export const FeaturesSection = () => {
  return <div className="px-4 py-16 sm:px-6 lg:px-8 bg-black/20">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
            AI-Powered Features
          </h2>
          <p className="text-xl text-white/80 mx-auto max-w-3xl">
            Our advanced AI technology helps you create pitches that stand out
          </p>
        </motion.div>
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6,
        delay: 0.2
      }} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card p-6 rounded-xl hover-scale group">
            <div className="mb-6 overflow-hidden rounded-lg">
              <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" alt="Professional Format" className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-app-accent/20 mb-4 mx-auto">
              <BrainCircuit className="text-app-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-3">AI-Optimized Format</h3>
            <p className="text-white/70">Our AI creates structured, professional pitches that highlight your music's unique value based on what curators are looking for.</p>
          </div>

          <div className="glass-card p-6 rounded-xl hover-scale group">
            <div className="mb-6 overflow-hidden rounded-lg">
              <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085" alt="AI Enhancement" className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-app-accent/20 mb-4 mx-auto">
              <CircuitBoard className="text-app-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Smart AI Enhancement</h3>
            <p className="text-white/70">
              Our machine learning algorithms analyze successful pitches to help polish your submission and make it stand out to playlist curators
            </p>
          </div>

          <div className="glass-card p-6 rounded-xl hover-scale group">
            <div className="mb-6 overflow-hidden rounded-lg">
              <img src="https://images.unsplash.com/photo-1611339555312-e607c8352fd7" alt="Target Playlists" className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-app-accent/20 mb-4 mx-auto">
              <Bot className="text-app-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-3">AI Playlist Targeting</h3>
            <p className="text-white/70">
              Our AI tailors your pitch for specific playlists by analyzing curator preferences and matching your music to the right audience
            </p>
          </div>
        </motion.div>
      </div>
    </div>;
};
