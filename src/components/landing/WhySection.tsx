import { motion } from "framer-motion";
import { Clock, Zap, Trophy, CheckCircle } from "lucide-react";
export const WhySection = () => {
  return <div className="px-4 py-16 sm:px-6 lg:px-8 bg-black/10">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6
      }} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Artists Trust Our Pitch Creator
          </h2>
          <p className="text-xl text-white/80">
            Create in 10 minutes what normally takes 2+ hours
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.2
        }} className="text-center p-6 rounded-xl bg-app-card/50 hover:bg-app-card/70 transition-colors">
            <div className="flex justify-center mb-4">
              <Zap className="w-12 h-12 text-app-accent" />
            </div>
            <h3 className="text-2xl font-bold mb-2">4x More Responses</h3>
            <p className="text-white/70">Our structured pitches get 4x more responses.</p>
          </motion.div>

          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.3
        }} className="text-center p-6 rounded-xl bg-app-card/50 hover:bg-app-card/70 transition-colors">
            <div className="flex justify-center mb-4">
              <Clock className="w-12 h-12 text-app-accent" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Save 2+ Hours</h3>
            <p className="text-white/70">Create professional pitches in minutes instead of hours of research and writing.</p>
          </motion.div>

          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.4
        }} className="text-center p-6 rounded-xl bg-app-card/50 hover:bg-app-card/70 transition-colors">
            <div className="flex justify-center mb-4">
              <Trophy className="w-12 h-12 text-app-accent" />
            </div>
            <h3 className="text-2xl font-bold mb-2">85% Success Rate</h3>
            <p className="text-white/70">85% of our users get at least one playlist placement within 2 weeks.</p>
          </motion.div>
        </div>
      </div>
    </div>;
};