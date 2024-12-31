import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import PaymentError from "./payment/PaymentError";
import PaymentLoading from "./payment/PaymentLoading";
import PayPalButton from "./payment/PayPalButton";
import { Json } from "@/integrations/supabase/types";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type PayPalCredentials = {
  client_id: string;
  secret_key: string;
  [key: string]: Json;
};

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
          // Log the full error response for debugging
          console.error('Full error response:', JSON.stringify(rpcError, null, 2));
          
          // Check if the error is related to missing credentials
          if (rpcError.message && rpcError.message.includes('not found or empty')) {
            const errorMessage = "PayPal credentials are missing. Please ensure both PAYPAL_CLIENT_ID and PAYPAL_SECRET_KEY are set in Supabase secrets.";
            console.error(errorMessage);
            setError(errorMessage);
            toast.error("PayPal configuration is incomplete. Please contact support.");
            return;
          }
          
          // Handle other types of errors
          const errorMessage = `Failed to load payment system: ${rpcError.message}`;
          console.error(errorMessage);
          setError(errorMessage);
          toast.error("Failed to load payment system. Please try again later.");
          return;
        }

        // Log the received data for debugging
        console.log('Received data from RPC:', JSON.stringify(data, null, 2));

        const isValidPayPalCredentials = (data: Json): data is PayPalCredentials => {
          return (
            typeof data === 'object' &&
            data !== null &&
            'client_id' in data &&
            'secret_key' in data &&
            typeof data.client_id === 'string' &&
            typeof data.secret_key === 'string' &&
            data.client_id.length > 0 &&
            data.secret_key.length > 0
          );
        };

        if (!isValidPayPalCredentials(data)) {
          console.error('Invalid PayPal credentials returned:', data);
          setError("PayPal configuration is invalid or incomplete. Please ensure both PAYPAL_CLIENT_ID and PAYPAL_SECRET_KEY are properly set.");
          toast.error("Payment system configuration is invalid");
          return;
        }

        console.log("PayPal credentials retrieved successfully");
        setCredentials(data);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        console.error('Unexpected error:', errorMessage);
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