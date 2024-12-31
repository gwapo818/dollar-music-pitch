import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ReactNode } from "react";

type PitchContainerProps = {
  children: ReactNode;
};

const PitchContainer = ({ children }: PitchContainerProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="relative"
    >
      <Card className="glass-card overflow-hidden bg-gradient-to-br from-[#1A1F2C] to-[#2A2F3C] border-[#9b87f5]/20">
        <CardContent className="p-6 space-y-4 text-left relative min-h-[200px]">
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PitchContainer;