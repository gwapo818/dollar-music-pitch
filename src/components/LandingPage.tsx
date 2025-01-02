import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import PaymentModal from "./PaymentModal";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsOfService from "./TermsOfService";
import { HeroSection } from "./landing/HeroSection";
import { FeaturesSection } from "./landing/FeaturesSection";
import { HowItWorksSection } from "./landing/HowItWorksSection";
import { TestimonialsSection } from "./landing/TestimonialsSection";
import { CTASection } from "./landing/CTASection";

const LandingPage = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const paymentStatus = searchParams.get('payment_status');
    if (paymentStatus === 'success') {
      localStorage.setItem('payment_completed', 'true');
      toast.success('Payment successful! Redirecting to pitch creator...');
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
      
      <HeroSection onStartCreating={handleStartCreating} />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection onStartCreating={handleStartCreating} />

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