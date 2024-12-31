import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PaymentModal = ({ isOpen, onClose }: PaymentModalProps) => {
  const navigate = useNavigate();
  const [clientId, setClientId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClientId = async () => {
      if (!isOpen) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        console.log("Fetching PayPal client ID...");
        const { data, error: rpcError } = await supabase.rpc('get_paypal_client_id');
        
        if (rpcError) {
          console.error('Error fetching PayPal client ID:', rpcError);
          setError("Failed to load payment system");
          toast.error("Failed to load payment system. Please try again later.");
          return;
        }

        if (!data) {
          console.error('No PayPal client ID returned');
          setError("PayPal configuration not found");
          toast.error("Payment system configuration is missing");
          return;
        }

        console.log("PayPal client ID retrieved successfully");
        setClientId(data);
      } catch (error) {
        console.error('Unexpected error:', error);
        setError("Failed to initialize payment system");
        toast.error("Failed to initialize payment system");
      } finally {
        setIsLoading(false);
      }
    };

    fetchClientId();
  }, [isOpen]);

  const handlePaymentSuccess = () => {
    localStorage.setItem("payment_completed", "true");
    toast.success("Payment successful! Redirecting to pitch creator...");
    onClose();
    navigate("/pitch");
  };

  if (error) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="bg-app-card text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              Payment System Error
            </DialogTitle>
            <DialogDescription className="text-white/80 text-center">
              We encountered an issue with the payment system
            </DialogDescription>
          </DialogHeader>
          <div className="p-4 text-center">
            <p className="text-red-400">{error}</p>
            <button
              onClick={onClose}
              className="mt-4 px-4 py-2 bg-app-accent rounded-lg hover:bg-app-accent/90"
            >
              Close
            </button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!clientId || isLoading) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="bg-app-card text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              Loading Payment System...
            </DialogTitle>
            <DialogDescription className="text-white/80 text-center">
              Please wait while we initialize the payment system
            </DialogDescription>
          </DialogHeader>
          <div className="p-4 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-app-accent"></div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

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
            Pay $1 to access the pitch creation tool
          </p>
          <PayPalScriptProvider
            options={{
              clientId: clientId,
              currency: "USD",
            }}
          >
            <PayPalButtons
              style={{ layout: "vertical" }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  intent: "CAPTURE",
                  purchase_units: [
                    {
                      amount: {
                        currency_code: "USD",
                        value: "1.00",
                      },
                      description: "Music Pitch Creator Access",
                    },
                  ],
                });
              }}
              onApprove={async (data, actions) => {
                if (actions.order) {
                  try {
                    const order = await actions.order.capture();
                    console.log("Payment completed:", order);
                    if (order.status === "COMPLETED") {
                      handlePaymentSuccess();
                    }
                  } catch (error) {
                    console.error("Payment capture error:", error);
                    toast.error("Payment failed. Please try again.");
                  }
                }
              }}
              onError={(err) => {
                console.error("PayPal error:", err);
                toast.error("Payment failed. Please try again.");
              }}
              onCancel={() => {
                toast.error("Payment cancelled");
              }}
            />
          </PayPalScriptProvider>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;