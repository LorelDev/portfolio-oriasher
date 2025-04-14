
import { motion } from "framer-motion";

interface SmokeTransitionProps {
  isActive: boolean;
}

const SmokeTransition = ({ isActive }: SmokeTransitionProps) => {
  return (
    <motion.div
      className="smoke-overlay pointer-events-none fixed inset-0 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      style={{
        background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0.9) 100%)",
        mixBlendMode: "lighten",
      }}
    />
  );
};

export default SmokeTransition;
