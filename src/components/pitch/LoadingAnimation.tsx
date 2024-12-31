import { motion } from "framer-motion";

const LoadingAnimation = () => {
  return (
    <motion.div 
      className="flex items-center justify-center h-32"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="space-y-4 w-full max-w-sm">
        <motion.div
          className="h-2 bg-[#9b87f5]/20 rounded-full overflow-hidden"
          initial={{ width: "100%" }}
        >
          <motion.div
            className="h-full bg-[#9b87f5]/40 rounded-full"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "linear",
            }}
          />
        </motion.div>
        
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="h-2 bg-[#9b87f5]/10 rounded-full"
              initial={{ width: "100%" }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingAnimation;