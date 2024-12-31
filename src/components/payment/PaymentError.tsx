import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";

interface PaymentErrorProps {
  isOpen: boolean;
  onClose: () => void;
  error: string;
}

const PaymentError = ({ isOpen, onClose, error }: PaymentErrorProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-app-card text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Payment System Error
          </DialogTitle>
          <DialogDescription className="text-white/80 text-center">
            {error}
          </DialogDescription>
        </DialogHeader>
        <div className="p-4 text-center">
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
};

export default PaymentError;