
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Button } from "@/components/ui/button";
import ScrollReveal from "./ScrollReveal";

interface ScrollingBioProps {
  bioLines: string[];
  language: "en" | "he";
  isRtl: boolean;
  title: string;
  showAllLabel: string;
}

const ScrollingBio: React.FC<ScrollingBioProps> = ({
  bioLines,
  language,
  isRtl,
  title,
  showAllLabel
}) => {
  const [visibleLines, setVisibleLines] = useState(0);
  const [isScrollLocked, setIsScrollLocked] = useState(true);
  const [hasShownAll, setHasShownAll] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const previousScrollY = useRef(0);

  // Background color steps from dark to lighter
  const backgroundSteps = [
    "#0f0f0f", "#131313", "#161616", "#1a1a1a", "#1d1d1d", "#212121", "#222222"
  ];

  // Get the current background color based on visible lines
  const currentBgColor = backgroundSteps[
    Math.min(visibleLines, backgroundSteps.length - 1)
  ];

  // Handle manual wheel events
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!isScrollLocked || !sectionRef.current) return;
      
      e.preventDefault();
      
      // Detect scroll direction
      if (e.deltaY > 0 && visibleLines < bioLines.length) {
        // Scrolling down - reveal next line
        setVisibleLines(prev => Math.min(prev + 1, bioLines.length));
      } else if (e.deltaY < 0 && visibleLines > 0) {
        // Scrolling up - hide last line
        setVisibleLines(prev => Math.max(prev - 1, 0));
      }
      
      // Check if all lines are revealed
      if (visibleLines >= bioLines.length - 1) {
        setTimeout(() => {
          setIsScrollLocked(false);
          setHasShownAll(true);
        }, 1000);
      }
    };
    
    const element = sectionRef.current;
    if (element && isScrollLocked) {
      element.addEventListener('wheel', handleWheel, { passive: false });
    }
    
    return () => {
      if (element) {
        element.removeEventListener('wheel', handleWheel);
      }
    };
  }, [isScrollLocked, visibleLines, bioLines.length]);

  // Handle touch events for mobile
  useEffect(() => {
    let touchStartY = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      if (!isScrollLocked) return;
      touchStartY = e.touches[0].clientY;
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (!isScrollLocked || !sectionRef.current) return;
      
      e.preventDefault();
      const touchY = e.touches[0].clientY;
      const diff = touchStartY - touchY;
      
      // Threshold to determine if it's a significant swipe
      if (Math.abs(diff) > 20) {
        if (diff > 0 && visibleLines < bioLines.length) {
          // Swiping up - reveal next line
          setVisibleLines(prev => Math.min(prev + 1, bioLines.length));
        } else if (diff < 0 && visibleLines > 0) {
          // Swiping down - hide last line
          setVisibleLines(prev => Math.max(prev - 1, 0));
        }
        
        touchStartY = touchY;
        
        // Check if all lines are revealed
        if (visibleLines >= bioLines.length - 1) {
          setTimeout(() => {
            setIsScrollLocked(false);
            setHasShownAll(true);
          }, 1000);
        }
      }
    };
    
    const element = sectionRef.current;
    if (element && isScrollLocked) {
      element.addEventListener('touchstart', handleTouchStart, { passive: true });
      element.addEventListener('touchmove', handleTouchMove, { passive: false });
    }
    
    return () => {
      if (element) {
        element.removeEventListener('touchstart', handleTouchStart);
        element.removeEventListener('touchmove', handleTouchMove);
      }
    };
  }, [isScrollLocked, visibleLines, bioLines.length]);

  // Show all lines function
  const handleShowAll = () => {
    setVisibleLines(bioLines.length);
    setIsScrollLocked(false);
    setHasShownAll(true);
  };

  // Animation variants for text lines
  const lineVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div 
      ref={sectionRef}
      className="mono-section relative px-4 overflow-hidden transition-colors duration-700"
      id="about"
      style={{ 
        backgroundColor: currentBgColor,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }}
    >
      <div 
        ref={containerRef}
        className="max-w-4xl mx-auto w-full"
      >
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-medium mb-12 text-center tracking-wide">
            {title}
          </h2>
        </ScrollReveal>
        
        <div className="py-8 flex flex-col md:flex-row gap-12 items-center">
          <ScrollReveal direction="right" className="w-full md:w-1/3">
            <div className="relative overflow-hidden">
              <img 
                src="/lovable-uploads/22a4f7cb-fbc2-4f89-a11d-b9f00b04e073.png" 
                alt="Profile" 
                className="aspect-square object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 border border-dark-gray pointer-events-none"></div>
            </div>
          </ScrollReveal>
          
          <div className={`w-full md:w-2/3 space-y-6 py-8 ${isRtl ? "text-right" : "text-left"}`}>
            {bioLines.map((line, index) => (
              <motion.p
                key={index}
                variants={lineVariants}
                initial="hidden"
                animate={visibleLines > index ? "visible" : "hidden"}
                className="text-lg text-almost-white leading-relaxed"
                style={{ 
                  direction: isRtl ? "rtl" : "ltr",
                  opacity: visibleLines > index ? 1 : 0
                }}
              >
                {line}
              </motion.p>
            ))}
            
            {!hasShownAll && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="mt-8 flex justify-center"
              >
                <Button onClick={handleShowAll} className="mono-button">
                  {showAllLabel}
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      
      {!hasShownAll && (
        <motion.div 
          className="absolute bottom-12 w-full flex justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: visibleLines === 0 ? 1 : 0, y: visibleLines === 0 ? 0 : 10 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-light-gray text-sm animate-bounce">
            {isRtl ? "גלול למטה כדי להמשיך" : "Scroll down to continue"}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ScrollingBio;
