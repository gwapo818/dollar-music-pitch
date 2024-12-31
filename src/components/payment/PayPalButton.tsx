import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "sonner";

interface PayPalButtonProps {
  clientId: string;
  onSuccess: () => void;
}

const PayPalButton = ({ clientId, onSuccess }: PayPalButtonProps) => {
  return (
    <PayPalScriptProvider
      options={{
        clientId: clientId,
        currency: "USD",
        intent: "capture",
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
                onSuccess();
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
  );
};

export default PayPalButton;