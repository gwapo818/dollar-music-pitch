import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

interface CTASectionProps {
  onStartCreating: () => void;
}

export const CTASection = ({ onStartCreating }: CTASectionProps) => {
  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Create Your Perfect Pitch?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Start crafting your professional music pitch now for just $1
          </p>
          <Button
            size="lg"
            className="bg-app-accent hover:bg-app-accent/90 text-white px-8 py-6 text-lg rounded-full"
            onClick={onStartCreating}
          >
            Get Started <ArrowRight className="ml-2" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};