
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const ScrollGradientBackground = () => {
  const { scrollProgress } = useScrollAnimation();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  // Create a motion value from the scrollProgress
  const scrollMotionValue = useMotionValue(0);
  
  // Update the motion value when scrollProgress changes
  useEffect(() => {
    scrollMotionValue.set(scrollProgress);
  }, [scrollProgress, scrollMotionValue]);

  // Check user preference for reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  // Transform scroll progress to gradient values
  const lightGradient = "#f5f5f5";
  const deeperGradient = "#eae6f7";
  const midwayGradient = "#f0edf9";

  const backgroundColors = useTransform(
    scrollMotionValue,
    [0, 0.5, 1],
    [lightGradient, midwayGradient, deeperGradient]
  );

  if (prefersReducedMotion) {
    // For users who prefer reduced motion, use static background
    return (
      <div 
        className="fixed inset-0 z-[-1] pointer-events-none"
        style={{ backgroundColor: midwayGradient }}
      />
    );
  }

  return (
    <motion.div 
      className="fixed inset-0 z-[-1] pointer-events-none transition-colors duration-300"
      style={{ backgroundColor: backgroundColors }}
    />
  );
};

export default ScrollGradientBackground;
