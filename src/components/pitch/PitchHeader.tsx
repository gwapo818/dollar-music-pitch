import { CircuitBoard } from "lucide-react";

const PitchHeader = () => {
  return (
    <div className="absolute top-0 right-0 p-4">
      <CircuitBoard className="w-6 h-6 text-[#9b87f5]/30" />
    </div>
  );
};

export default PitchHeader;