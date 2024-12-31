import { motion } from "framer-motion";

type PitchContentProps = {
  content: string;
};

const PitchContent = ({ content }: PitchContentProps) => {
  return (
    <motion.p 
      className="text-white/90 whitespace-pre-wrap leading-relaxed pb-16"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {content}
    </motion.p>
  );
};

export default PitchContent;