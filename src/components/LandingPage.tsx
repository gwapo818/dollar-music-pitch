import { motion } from "framer-motion";
import { ArrowRight, Music2, Sparkles, Target } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import PaymentModal from "./PaymentModal";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsOfService from "./TermsOfService";

const LandingPage = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const paymentStatus = searchParams.get('payment_status');
    if (paymentStatus === 'success') {
      localStorage.setItem('payment_completed', 'true');
      toast.success('Payment successful! Redirecting to pitch creator...');
      // Remove the payment_status from URL and redirect to /pitch
      setTimeout(() => {
        navigate('/pitch');
      }, 1500);
    }
  }, [searchParams, navigate]);

  const handleStartCreating = () => {
    setShowPaymentModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-app-dark via-[#232838] to-[#1A1F2C] text-white">
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
      />
      
      {/* Hero Section */}
      <div className="relative px-4 py-16 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
            alt="Background"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-app-dark/90 to-app-dark/70" />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#9b87f5] via-[#b8a4f8] to-[#D6BCFA] mb-6">
              Craft Perfect Music Pitches Online
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
              Create compelling music pitches that get noticed, all for just{" "}
              <span className="text-app-accent font-semibold">$1</span>
            </p>
            <Button
              size="lg"
              className="bg-app-accent hover:bg-app-accent/90 text-white px-8 py-6 text-lg rounded-full"
              onClick={handleStartCreating}
            >
              Start Creating <ArrowRight className="ml-2" />
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Features Section with Images */}
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
                  src="https://images.unsplash.com/photo-1483058712412-4245e9b90334"
                  alt="Professional Setup"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-app-accent/20 mb-4 mx-auto">
                <Music2 className="text-app-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Professional Format</h3>
              <p className="text-white/70">
                Create structured, professional pitches that highlight your music's unique value
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
                Our AI helps polish your pitch to make it more engaging and professional
              </p>
            </div>

            <div className="glass-card p-6 rounded-xl hover-scale group">
              <div className="mb-6 overflow-hidden rounded-lg">
                <img
                  src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
                  alt="Target Playlists"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
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
            <Button
              size="lg"
              className="bg-app-accent hover:bg-app-accent/90 text-white px-8 py-6 text-lg rounded-full"
              onClick={handleStartCreating}
            >
              Get Started <ArrowRight className="ml-2" />
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Legal Section */}
      <div className="border-t border-white/10 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex justify-center items-center space-x-8">
            <PrivacyPolicy />
            <TermsOfService />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;