import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // Allow access in development mode
  const isDevelopment = import.meta.env.DEV;
  const hasAccess = isDevelopment || localStorage.getItem("has_access") === "true";

  if (!hasAccess) {
    toast.error("Please complete payment to access this feature");
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;