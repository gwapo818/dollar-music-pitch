import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import PaymentError from "./payment/PaymentError";
import PaymentLoading from "./payment/PaymentLoading";
import PayPalButton from "./payment/PayPalButton";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PayPalCredentials {
  client_id: string;
  secret_key: string;
}

interface PayPalCredentialsResponse {
  client_id: string;
  secret_key: string;
}

const PaymentModal = ({ isOpen, onClose }: PaymentModalProps) => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<PayPalCredentials | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCredentials = async () => {
      if (!isOpen) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        console.log("Fetching PayPal credentials...");
        const { data, error: rpcError } = await supabase.rpc('get_paypal_credentials');
        
        if (rpcError) {
          console.error('Error fetching PayPal credentials:', rpcError);
          if (rpcError.message && rpcError.message.includes('not configured')) {
            setError("PayPal is not properly configured. Please ensure both PAYPAL_CLIENT_ID and PAYPAL_SECRET_KEY are set in Supabase secrets.");
            toast.error("PayPal configuration is missing. Please contact support.");
          } else {
            setError(`Failed to load payment system: ${rpcError.message}`);
            toast.error("Failed to load payment system. Please try again later.");
          }
          return;
        }

        if (!data) {
          console.error('No PayPal credentials returned');
          setError("PayPal configuration not found.");
          toast.error("Payment system configuration is missing");
          return;
        }

        console.log("PayPal credentials retrieved successfully");
        const typedData = data as PayPalCredentialsResponse;
        setCredentials({
          client_id: typedData.client_id,
          secret_key: typedData.secret_key
        });
      } catch (error) {
        console.error('Unexpected error:', error);
        setError("Failed to initialize payment system. Please try again later.");
        toast.error("Failed to initialize payment system");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCredentials();
  }, [isOpen]);

  const handlePaymentSuccess = () => {
    localStorage.setItem("payment_completed", "true");
    toast.success("Payment successful! Redirecting to pitch creator...");
    onClose();
    navigate("/pitch");
  };

  if (error) {
    return <PaymentError isOpen={isOpen} onClose={onClose} error={error} />;
  }

  if (!credentials || isLoading) {
    return <PaymentLoading isOpen={isOpen} onClose={onClose} />;
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
          <PayPalButton 
            clientId={credentials.client_id}
            onSuccess={handlePaymentSuccess}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;