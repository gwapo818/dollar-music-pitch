
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Shield, Clock, Check } from "lucide-react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  priceId?: string; // Optional price ID to override the default
}

const PaymentModal = ({ isOpen, onClose, priceId }: PaymentModalProps) => {
  const navigate = useNavigate();

  const handlePayment = async () => {
    try {
      // Pass the price ID if provided
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: priceId ? { priceId } : {}
      });
      
      if (error) {
        console.error('Error creating checkout session:', error);
        toast.error("Failed to initialize payment. Please try again.");
        return;
      }

      if (data?.url) {
        window.location.href = data.url;
      } else {
        toast.error("Failed to create checkout session. Please try again.");
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error("Payment system error. Please try again later.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-app-card text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Unlock Professional Pitch Creation
          </DialogTitle>
          <DialogDescription className="text-white/80 text-center">
            One payment, powerful results for your music career
          </DialogDescription>
        </DialogHeader>
        <div className="p-4">
          <div className="mb-6 space-y-4">
            <div className="flex items-start space-x-3">
              <Check className="text-green-400 mt-1 flex-shrink-0" size={18} />
              <p className="text-white/90">Professional-grade pitches that get noticed by curators</p>
            </div>
            <div className="flex items-start space-x-3">
              <Check className="text-green-400 mt-1 flex-shrink-0" size={18} />
              <p className="text-white/90">AI enhancement to perfect your message</p>
            </div>
            <div className="flex items-start space-x-3">
              <Check className="text-green-400 mt-1 flex-shrink-0" size={18} />
              <p className="text-white/90">Export or copy your pitch for immediate use</p>
            </div>
          </div>
          
          <div className="flex justify-center mb-6">
            <div className="bg-app-accent/10 rounded-lg px-6 py-3 flex items-center space-x-3">
              <div className="text-3xl font-bold text-app-accent">$7</div>
              <div className="text-left">
                <div className="text-white/90 text-sm">One-time payment</div>
                <div className="text-white/70 text-xs">No subscription</div>
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-4 mb-6 text-sm text-white/70">
            <span className="flex items-center">
              <Clock size={14} className="mr-1" /> 10-min process
            </span>
            <span className="flex items-center">
              <Shield size={14} className="mr-1" /> Secure payment
            </span>
          </div>

          <Button 
            onClick={handlePayment}
            className="w-full bg-gradient-to-r from-[#9b87f5] to-[#D6BCFA] hover:from-[#8B5CF6] hover:to-[#C4B5FD] text-white font-medium py-3"
          >
            Pay $7 and Create Your Pitch
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
