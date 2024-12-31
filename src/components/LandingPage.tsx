import { motion } from "framer-motion";
import { ArrowRight, Music2, Sparkles, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-app-dark via-[#232838] to-[#1A1F2C] text-white">
      {/* Hero Section */}
      <div className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#9b87f5] via-[#b8a4f8] to-[#D6BCFA] mb-6">
              Craft Perfect Music Pitches
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
              Create compelling music pitches that get noticed, all for just{" "}
              <span className="text-app-accent font-semibold">$1</span>
            </p>
            <Link to="/pitch">
              <Button
                size="lg"
                className="bg-app-accent hover:bg-app-accent/90 text-white px-8 py-6 text-lg rounded-full"
              >
                Start Creating <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="px-4 py-16 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="glass-card p-6 rounded-xl">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-app-accent/20 mb-4 mx-auto">
                <Music2 className="text-app-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Professional Format</h3>
              <p className="text-white/70">
                Create structured, professional pitches that highlight your music's unique value
              </p>
            </div>

            <div className="glass-card p-6 rounded-xl">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-app-accent/20 mb-4 mx-auto">
                <Sparkles className="text-app-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Enhancement</h3>
              <p className="text-white/70">
                Our AI helps polish your pitch to make it more engaging and professional
              </p>
            </div>

            <div className="glass-card p-6 rounded-xl">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-app-accent/20 mb-4 mx-auto">
                <Target className="text-app-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Target Playlists</h3>
              <p className="text-white/70">
                Tailor your pitch for specific playlists to increase your chances of success
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-app-accent mb-4">1</div>
                <h3 className="text-xl font-semibold mb-2">Fill the Form</h3>
                <p className="text-white/70">Enter your song and artist details</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-app-accent mb-4">2</div>
                <h3 className="text-xl font-semibold mb-2">Add Context</h3>
                <p className="text-white/70">Provide background and target playlists</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-app-accent mb-4">3</div>
                <h3 className="text-xl font-semibold mb-2">AI Enhancement</h3>
                <p className="text-white/70">Let our AI polish your pitch</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-app-accent mb-4">4</div>
                <h3 className="text-xl font-semibold mb-2">Export</h3>
                <p className="text-white/70">Download or copy your perfect pitch</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
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
            <Link to="/pitch">
              <Button
                size="lg"
                className="bg-app-accent hover:bg-app-accent/90 text-white px-8 py-6 text-lg rounded-full"
              >
                Get Started <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;