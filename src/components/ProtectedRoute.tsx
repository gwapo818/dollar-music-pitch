import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // Check if in development mode or payment is completed
  const isDevelopment = import.meta.env.DEV;
  const isPaymentCompleted = localStorage.getItem('paymentCompleted') === 'true';

  if (isDevelopment || isPaymentCompleted) {
    return <>{children}</>;
  }

  // Redirect to landing page with a toast message
  toast.error("Please complete payment to access this feature", {
    description: "You need to purchase access to use the pitch generator."
  });

  return <Navigate to="/" replace />;
};

export default ProtectedRoute;