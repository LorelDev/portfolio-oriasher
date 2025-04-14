
import { useEffect, useState } from "react";

export function useScrollAnimation() {
  const [scrollY, setScrollY] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [documentHeight, setDocumentHeight] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrollingDown, setIsScrollingDown] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if device is touch-enabled
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    
    // Set initial values
    setViewportHeight(window.innerHeight);
    setDocumentHeight(document.body.scrollHeight);
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Detect scroll direction
      setIsScrollingDown(currentScrollY > lastScrollY);
      setLastScrollY(currentScrollY);
      
      // Update scroll position
      setScrollY(currentScrollY);
      
      // Calculate scroll progress as a percentage (0 to 1)
      const progress = currentScrollY / (document.body.scrollHeight - window.innerHeight);
      setScrollProgress(Math.min(Math.max(progress, 0), 1));
    };
    
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
      setDocumentHeight(document.body.scrollHeight);
      handleScroll(); // Recalculate scroll position after resize
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    handleScroll(); // Initial calculation

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [lastScrollY]);

  return {
    scrollY,
    viewportHeight,
    documentHeight,
    scrollProgress,
    isScrollingDown,
    isTouchDevice,
  };
}
