import { motion } from "framer-motion";
import { Music2, Sparkles, Target } from "lucide-react";

export const FeaturesSection = () => {
  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8 bg-black/20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="glass-card p-6 rounded-xl hover-scale group">
            <div className="mb-6 overflow-hidden rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
                alt="Professional Format"
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-app-accent/20 mb-4 mx-auto">
              <Music2 className="text-app-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Professional Format</h3>
            <p className="text-white/70">
              Create structured, professional pitches that highlight your music's unique value for playlist curators
            </p>
          </div>

          <div className="glass-card p-6 rounded-xl hover-scale group">
            <div className="mb-6 overflow-hidden rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
                alt="AI Enhancement"
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-app-accent/20 mb-4 mx-auto">
              <Sparkles className="text-app-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-3">AI Enhancement</h3>
            <p className="text-white/70">
              Our Trained AI Agent helps polish your pitch to stand out to playlist curators and get noticed
            </p>
          </div>

          <div className="glass-card p-6 rounded-xl hover-scale group">
            <div className="mb-6 overflow-hidden rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1611339555312-e607c8352fd7"
                alt="Target Playlists"
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-app-accent/20 mb-4 mx-auto">
              <Target className="text-app-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Target Playlists</h3>
            <p className="text-white/70">
              Tailor your pitch for specific playlists and boost your chances of landing more playlist placements
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};