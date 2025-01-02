import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

type CTASectionProps = {
  onStartCreating: () => void;
};

export const CTASection = ({ onStartCreating }: CTASectionProps) => {
  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Your Music Noticed?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Join thousands of artists who've already improved their pitch game
          </p>
          <Button
            onClick={onStartCreating}
            size="lg"
            className="bg-app-accent hover:bg-app-accent/90 text-white px-8 py-6 text-lg hover-scale"
          >
            Start Pitching for $1
          </Button>
        </motion.div>
      </div>
    </div>
  );
};