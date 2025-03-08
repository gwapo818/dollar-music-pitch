
import { motion } from "framer-motion";
import { Quote, CheckCircle, Sparkles } from "lucide-react";
import { Card } from "../ui/card";

const testimonials = [
  {
    quote: "Got accepted to 5 playlists within 2 weeks! The AI wrote a better pitch than I ever could and made it very easy to create something professional that actually worked.",
    author: "Andy C",
    role: "Electronic Music Producer"
  },
  {
    quote: "The AI enhancement feature took my basic description and transformed it into something that actually sounds professional. Got accepted to 3 playlists after dozens of failed attempts writing pitches myself!",
    author: "Sarah M",
    role: "Independent Artist"
  },
  {
    quote: "Best $7 I've spent on music promotion. The AI pitch writer increased my playlist acceptance rate from 2% to nearly 30%. Simple, fast, and incredibly effective.",
    author: "Mike R",
    role: "Hip Hop Producer"
  }
];

export const TestimonialsSection = () => {
  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8 bg-black/10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Real Results from Real Artists Using Our AI
          </h2>
          <p className="text-xl text-white/80">
            Join hundreds of artists who've increased their playlist placements with AI assistance
          </p>
          
          {/* AI Trust Badge */}
          <div className="flex justify-center mt-6">
            <div className="flex items-center bg-white/5 px-5 py-3 rounded-full border border-white/10">
              <Sparkles className="text-app-accent w-5 h-5 mr-2" />
              <span className="text-white/90 font-medium">Powered by Top AI Models</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
              className="glass-card p-6 rounded-xl hover-scale"
            >
              <div className="flex justify-center mb-4">
                <Quote className="text-app-accent w-8 h-8" />
              </div>
              <p className="text-lg mb-6 text-white/90 italic">
                "{testimonial.quote}"
              </p>
              <div className="text-sm">
                <p className="font-semibold text-app-accent">{testimonial.author}</p>
                <p className="text-white/70">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
