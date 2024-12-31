import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
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

  useEffect(() => {
    const fetchClientId = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase.rpc('get_paypal_client_id');
        if (error) {
          console.error('Error fetching PayPal client ID:', error);
          toast.error("Failed to load payment system. Please try again later.");
          return;
        }
        if (data) {
          setClientId(data);
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error("Failed to initialize payment system");
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen) {
      fetchClientId();
    }
  }, [isOpen]);

  const handlePaymentSuccess = () => {
    localStorage.setItem("payment_completed", "true");
    toast.success("Payment successful! Redirecting to pitch creator...");
    onClose();
    navigate("/pitch");
  };

  if (!clientId || isLoading) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="bg-app-card text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              Loading Payment...
            </DialogTitle>
          </DialogHeader>
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