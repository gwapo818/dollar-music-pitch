
import { motion } from "framer-motion";
import { Button } from "../ui/button";

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
                Start Pitching for $7
              </Button>
            </>
          ) : (
            <div className="glass-card rounded-2xl p-12 bg-gradient-to-br from-app-accent/20 to-app-accent/10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">
                Your Next Playlist Awaits – Start Pitching Now!
              </h2>
              <p className="text-xl text-white/80 mb-8">
                Join thousands of artists and increase your playlist success rate today.
              </p>
              <Button
                onClick={onStartCreating}
                size="lg"
                className="bg-white hover:bg-white/90 text-app-dark px-8 py-6 text-lg font-semibold hover-scale shadow-xl"
              >
                Pitch Now for Just $7!
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
