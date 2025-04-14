
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SmokeTransition from "./SmokeTransition";
import { Button } from "@/components/ui/button";
import { ChevronDown, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface BioContent {
  text: string;
  imagePath: string;
}

interface EnhancedScrollingBioProps {
  bioContent: BioContent[];
  language: "en" | "he";
  isRtl: boolean;
  title: string;
}

const EnhancedScrollingBio = ({ bioContent, language, isRtl, title }: EnhancedScrollingBioProps) => {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [transitioning, setTransitioning] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const isMobile = useIsMobile();
  
  // Color palette for text
  const colorPalette = [
    "#F2F2F2", // white
    "#7AD3F4", // soft blue
    "#F0B37E", // amber
    "#A3E3A1", // mint green
    "#F97AA8", // light rose
    "#C4B5FD", // lavender
    "#F9D56E", // soft yellow
  ];
  
  // Typography variations
  const typographyVariants = [
    { fontWeight: 400, letterSpacing: "0.01em", fontSize: "1.1rem" },
    { fontWeight: 500, letterSpacing: "0.03em", fontSize: "1.2rem" },
    { fontWeight: 300, letterSpacing: "0.02em", fontSize: "1.05rem" },
    { fontWeight: 600, letterSpacing: "0", fontSize: "1.15rem" },
    { fontWeight: 400, letterSpacing: "0.04em", fontSize: "1.1rem" },
  ];
  
  // Handle wheel and touch events for revealing content
  const handleWheel = (e: WheelEvent) => {
    if (transitioning || !isLocked) return;
    
    if (e.deltaY > 15 && currentIndex < bioContent.length - 1) {
      setTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
        setTransitioning(false);
      }, 400);
    } else if (e.deltaY < -15 && currentIndex > 0) {
      setTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(prev => prev - 1);
        setTransitioning(false);
      }, 400);
    }
  };

  const handleTouchStart = useRef({ y: 0 });
  const handleTouchMove = useRef(0);
  
  const onTouchStart = (e: TouchEvent) => {
    handleTouchStart.current.y = e.touches[0].clientY;
    handleTouchMove.current = 0;
  };
  
  const onTouchMove = (e: TouchEvent) => {
    if (transitioning || !isLocked) return;
    
    const touchY = e.touches[0].clientY;
    const deltaY = handleTouchStart.current.y - touchY;
    handleTouchMove.current += deltaY;
    handleTouchStart.current.y = touchY;
    
    if (handleTouchMove.current > 50 && currentIndex < bioContent.length - 1) {
      setTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
        setTransitioning(false);
        handleTouchMove.current = 0;
      }, 400);
    } else if (handleTouchMove.current < -50 && currentIndex > 0) {
      setTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(prev => prev - 1);
        setTransitioning(false);
        handleTouchMove.current = 0;
      }, 400);
    }
  };
  
  // Observer for locking scroll to the bio section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsLocked(true);
          setCurrentIndex(0);
          document.body.style.overflow = 'hidden'; // Lock the body scroll
        } else {
          setIsLocked(false);
          document.body.style.overflow = ''; // Restore scrolling
          // Reset the index when scrolling away
          if (entries[0].boundingClientRect.top > 0) {
            setCurrentIndex(-1); // Reset when scrolling up past the section
          }
        }
      },
      { threshold: 0.5 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      document.body.style.overflow = ''; // Ensure scroll is restored on unmount
    };
  }, []);
  
  // Add scroll and touch event listeners
  useEffect(() => {
    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [currentIndex, transitioning, isLocked]);
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLocked) return;
      
      if (e.key === "ArrowDown" && currentIndex < bioContent.length - 1) {
        setTransitioning(true);
        setTimeout(() => {
          setCurrentIndex(prev => prev + 1);
          setTransitioning(false);
        }, 400);
      } else if (e.key === "ArrowUp" && currentIndex > 0) {
        setTransitioning(true);
        setTimeout(() => {
          setCurrentIndex(prev => prev - 1);
          setTransitioning(false);
        }, 400);
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIndex, bioContent.length, isLocked]);
  
  // Reset function for the presentation
  const handleReset = () => {
    setTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(0);
      setTransitioning(false);
    }, 400);
  };
  
  // Add unlock function to continue scrolling
  const handleUnlock = () => {
    setIsLocked(false);
    document.body.style.overflow = '';
  };
  
  return (
    <section 
      id="about" 
      ref={sectionRef}
      className={cn(
        "relative min-h-screen flex flex-col items-center justify-center px-4 pb-24 pt-12 overflow-hidden",
        isRtl ? "text-right" : "text-left"
      )}
      style={{ direction: isRtl ? "rtl" : "ltr" }}
    >
      <SmokeTransition isActive={transitioning} />
      
      <div className="max-w-5xl mx-auto w-full relative z-10">
        <AnimatePresence>
          {currentIndex === -1 ? (
            <motion.h2 
              key="title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-3xl md:text-4xl font-medium mb-4 text-center tracking-wide"
            >
              {title}
            </motion.h2>
          ) : null}
        </AnimatePresence>
        
        {/* Current background image with overlay */}
        <div className="absolute inset-0 h-screen w-full overflow-hidden">
          {currentIndex >= 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full"
            >
              <div 
                className="absolute inset-0 bg-gradient-to-t from-deep-black via-deep-black/90 to-deep-black/70"
                style={{ zIndex: 1 }}
              />
              <motion.img
                key={`img-${currentIndex}`}
                ref={imageRef}
                src={bioContent[0]?.imagePath} // Use the first image for all slides
                alt="Background"
                className="w-full h-full object-cover opacity-50"
                initial={{ scale: 1.1, opacity: 0.3 }}
                animate={{ scale: 1, opacity: 0.5 }}
                transition={{ duration: 0.8 }}
                style={{ objectPosition: "center top" }}
              />
            </motion.div>
          )}
        </div>
        
        {/* Text content */}
        <div 
          className={cn(
            "relative z-10 flex flex-col items-center justify-center min-h-[70vh] md:pt-0 pt-16",
            currentIndex >= 0 ? "opacity-100" : "opacity-0"
          )}
        >
          <AnimatePresence mode="wait">
            {currentIndex >= 0 && currentIndex < bioContent.length && (
              <div className="text-center max-w-2xl mx-auto">
                {/* Display current and previous text lines */}
                <div className="space-y-8 mb-8">
                  {Array.from({ length: currentIndex + 1 }).map((_, idx) => (
                    <motion.p
                      key={`text-${idx}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ 
                        duration: 0.6,
                        delay: idx === currentIndex ? 0.3 : 0
                      }}
                      className={cn(
                        "text-lg md:text-xl tracking-wide",
                        idx === currentIndex && "animate-pulse-subtle"
                      )}
                      style={{
                        color: colorPalette[idx % colorPalette.length],
                        fontWeight: typographyVariants[idx % typographyVariants.length].fontWeight,
                        letterSpacing: typographyVariants[idx % typographyVariants.length].letterSpacing,
                        fontSize: typographyVariants[idx % typographyVariants.length].fontSize,
                        textShadow: "0 1px 3px rgba(0,0,0,0.3)",
                        maxWidth: `${90 - idx * 2}%`,
                        margin: "0 auto"
                      }}
                    >
                      {bioContent[idx].text}
                    </motion.p>
                  ))}
                </div>
              </div>
            )}
          </AnimatePresence>
          
          {/* Navigation dots */}
          {currentIndex >= 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex justify-center mt-8 space-x-2"
            >
              {bioContent.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx <= currentIndex 
                      ? "bg-almost-white scale-100" 
                      : "bg-gray-600 scale-75"
                  }`}
                  onClick={() => {
                    if (!transitioning) {
                      setTransitioning(true);
                      setTimeout(() => {
                        setCurrentIndex(idx);
                        setTransitioning(false);
                      }, 400);
                    }
                  }}
                />
              ))}
            </motion.div>
          )}
          
          {/* Show the replay button when finished */}
          {currentIndex >= bioContent.length - 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-12 flex gap-4"
            >
              <Button 
                className="mono-button flex items-center gap-2"
                onClick={handleReset}
              >
                <RefreshCw className="w-4 h-4" />
                {isRtl ? "הפעל מחדש" : "Replay"}
              </Button>
              
              <Button
                variant="outline"
                className="mono-button"
                onClick={handleUnlock}
              >
                {isRtl ? "המשך לגלול" : "Continue scrolling"}
              </Button>
            </motion.div>
          )}
          
          {/* Down arrow indicator for first slide */}
          {currentIndex === 0 && (
            <motion.div
              className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ChevronDown className="w-8 h-8 text-almost-white opacity-70" />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default EnhancedScrollingBio;
