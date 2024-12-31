import { Navigate } from "react-router-dom";
import { toast } from "sonner";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const hasPayment = localStorage.getItem("payment_completed") === "true";

  if (!hasPayment) {
    toast.error("Please complete payment to access the pitch creator");
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;