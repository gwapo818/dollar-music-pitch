
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Clock, Shield, Sparkles, Bot } from "lucide-react";

interface CTASectionProps {
  onStartCreating: () => void;
  isMiddleSection?: boolean;
}

export const CTASection = ({ onStartCreating, isMiddleSection = false }: CTASectionProps) => {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {isMiddleSection ? (
            <>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Let AI Get You More Playlist Placements?
              </h2>
              <p className="text-xl text-white/80 mb-4">
                Join thousands of artists who've increased their acceptance rate by 300% with AI assistance
              </p>
              <div className="flex items-center justify-center space-x-2 mb-8">
                <span className="bg-white/10 px-3 py-1 rounded-full text-white/80 flex items-center text-sm">
                  <Clock size={14} className="mr-1" /> 10-minute process
                </span>
                <span className="bg-white/10 px-3 py-1 rounded-full text-white/80 flex items-center text-sm">
                  <Shield size={14} className="mr-1" /> 100% Satisfaction
                </span>
                <span className="bg-white/10 px-3 py-1 rounded-full text-white/80 flex items-center text-sm">
                  <Sparkles size={14} className="mr-1" /> AI-Powered
                </span>
              </div>
              <Button
                onClick={onStartCreating}
                size="lg"
                className="bg-app-accent hover:bg-app-accent/90 text-white px-8 py-6 text-lg hover-scale"
              >
                Let AI Write Your Pitch for $7
              </Button>
              <p className="mt-4 text-sm text-white/60">
                Limited time price • One-time payment • No subscription
              </p>
            </>
          ) : (
            <div className="glass-card rounded-2xl p-12 bg-gradient-to-br from-app-accent/20 to-app-accent/10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">
                Your AI-Crafted Pitch is 10 Minutes Away
              </h2>
              <p className="text-xl text-white/80 mb-8">
                Let our AI create a professional pitch that gets your music noticed by playlist curators today.
              </p>
              <div className="flex justify-center items-center mb-6">
                <div className="flex items-center bg-white/10 px-4 py-2 rounded-full border border-white/20">
                  <Sparkles className="text-app-accent w-4 h-4 mr-2" />
                  <span className="text-white/90 text-sm">Powered by Top AI Models</span>
                </div>
              </div>
              <Button
                onClick={onStartCreating}
                size="lg"
                className="bg-white hover:bg-white/90 text-app-dark px-6 py-6 text-lg font-semibold hover-scale shadow-xl"
              >
                <Bot className="w-5 h-5 mr-3" /> 
                <span>Get AI-Written Pitch for Just $7!</span>
              </Button>
              <p className="mt-6 text-white/80">
                <span className="font-semibold">Only 27 spots</span> left at this price
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
