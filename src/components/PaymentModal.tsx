import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PaymentModal = ({ isOpen, onClose }: PaymentModalProps) => {
  const navigate = useNavigate();

  const handlePaymentSuccess = () => {
    localStorage.setItem("payment_completed", "true");
    toast.success("Payment successful! Redirecting to pitch creator...");
    onClose();
    navigate("/pitch");
  };

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
              clientId: "test", // Replace with your PayPal client ID in production
              currency: "USD",
            }}
          >
            <PayPalButtons
              style={{ layout: "vertical" }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: "1.00",
                      },
                    },
                  ],
                });
              }}
              onApprove={async (data, actions) => {
                if (actions.order) {
                  const order = await actions.order.capture();
                  if (order.status === "COMPLETED") {
                    handlePaymentSuccess();
                  }
                }
              }}
              onError={() => {
                toast.error("Payment failed. Please try again.");
              }}
            />
          </PayPalScriptProvider>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;