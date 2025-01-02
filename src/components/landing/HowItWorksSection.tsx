import { motion } from "framer-motion";

export const HowItWorksSection = () => {
  return (
    <div className="relative px-4 py-16 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
          alt="Background"
          className="w-full h-full object-cover opacity-5"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-app-dark/90 to-app-dark/70" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
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
  );
};