import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";

interface PaymentLoadingProps {
  isOpen: boolean;
  onClose: () => void;
}

const PaymentLoading = ({ isOpen, onClose }: PaymentLoadingProps) => {
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
};

export default PaymentLoading;