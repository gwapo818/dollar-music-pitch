
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { supabase } from "@/integrations/supabase/client";

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
        body: priceId ? { priceId } : undefined
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
            Complete Payment
          </DialogTitle>
          <DialogDescription className="text-white/80 text-center">
            Make a secure payment to access the pitch creation tool
          </DialogDescription>
        </DialogHeader>
        <div className="p-4">
          <p className="text-center mb-6 text-white/80">
            Pay $7 to access the pitch creation tool
          </p>
          <Button 
            onClick={handlePayment}
            className="w-full bg-gradient-to-r from-[#9b87f5] to-[#D6BCFA] hover:from-[#8B5CF6] hover:to-[#C4B5FD] text-white font-medium py-3"
          >
            Pay with Stripe
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
