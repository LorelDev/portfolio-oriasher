
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import ScrollReveal from "./ScrollReveal";
import { useIsMobile } from "@/hooks/use-mobile";

interface ScrollingBioProps {
  bioContent: {
    text: string;
    imagePath?: string;
  }[];
  language: "en" | "he";
  isRtl: boolean;
  title: string;
  showAllLabel: string;
}

const ScrollingBio: React.FC<ScrollingBioProps> = ({
  bioContent,
  language,
  isRtl,
  title,
  showAllLabel
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrollLocked, setIsScrollLocked] = useState(true);
  const [hasShownAll, setHasShownAll] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollThresholdRef = useRef<number>(0);
  const accumulatedDeltaRef = useRef<number>(0);
  
  // Higher number means less sensitive scroll
  const scrollSensitivity = 120; 
  
  const isMobile = useIsMobile();
  
  // Background color steps from dark to lighter
  const backgroundSteps = [
    "#0f0f0f", "#131313", "#161616", "#1a1a1a", "#1d1d1d", "#212121", "#222222", 
    "#262626", "#2a2a2a", "#2e2e2e", "#323232", "#363636", "#3a3a3a", "#3e3e3e"
  ];

  // Get current background color based on current slide
  const currentBgColor = backgroundSteps[
    Math.min(currentSlide, backgroundSteps.length - 1)
  ];

  // Display the first slide after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentSlide === 0) {
        setCurrentSlide(1);
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Auto-advance for mobile users
  useEffect(() => {
    if (isMobile) {
      const timer = setTimeout(() => {
        setCurrentSlide(bioContent.length);
        setIsScrollLocked(false);
        setHasShownAll(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isMobile, bioContent.length]);

  // Handle manual wheel events
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!isScrollLocked || !sectionRef.current) return;
      
      e.preventDefault();
      
      // Accumulate delta Y for less sensitive scrolling
      accumulatedDeltaRef.current += e.deltaY;
      
      // Only proceed if we've accumulated enough scroll
      if (Math.abs(accumulatedDeltaRef.current) >= scrollSensitivity) {
        // Detect scroll direction
        if (accumulatedDeltaRef.current > 0 && currentSlide < bioContent.length) {
          // Scrolling down - advance to next slide
          setCurrentSlide(prev => Math.min(prev + 1, bioContent.length));
          console.log(`Advancing to slide ${currentSlide + 1} of ${bioContent.length}`);
        } else if (accumulatedDeltaRef.current < 0 && currentSlide > 0) {
          // Scrolling up - go back a slide
          setCurrentSlide(prev => Math.max(prev - 1, 0));
        }
        
        // Reset accumulated delta
        accumulatedDeltaRef.current = 0;
        
        // Check if all slides are revealed
        if (currentSlide >= bioContent.length - 1) {
          setTimeout(() => {
            setIsScrollLocked(false);
            setHasShownAll(true);
          }, 1000);
        }
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
  }, [isScrollLocked, currentSlide, bioContent.length]);

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
      if (Math.abs(diff) > 50) {
        if (diff > 0 && currentSlide < bioContent.length) {
          // Swiping up - advance to next slide
          setCurrentSlide(prev => Math.min(prev + 1, bioContent.length));
        } else if (diff < 0 && currentSlide > 0) {
          // Swiping down - go back a slide
          setCurrentSlide(prev => Math.max(prev - 1, 0));
        }
        
        touchStartY = touchY;
        
        // Check if all slides are revealed
        if (currentSlide >= bioContent.length - 1) {
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
  }, [isScrollLocked, currentSlide, bioContent.length]);

  // Show all slides function
  const handleShowAll = () => {
    setCurrentSlide(bioContent.length);
    setIsScrollLocked(false);
    setHasShownAll(true);
  };

  // Animation variants for slide content
  const slideVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: "easeOut" } }
  };

  return (
    <div 
      ref={sectionRef}
      className="relative min-h-screen flex items-center py-16 z-10 overflow-hidden"
      id="about"
      style={{ 
        backgroundColor: currentBgColor,
        transition: "background-color 0.8s ease-out",
      }}
    >
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-medium mb-12 text-center tracking-wide">
            {title}
          </h2>
        </ScrollReveal>
        
        <div className={`flex flex-col lg:flex-row gap-12 items-center py-8 ${isRtl ? "lg:flex-row-reverse" : ""}`}>
          {/* Image Column */}
          <div className="w-full lg:w-1/2 flex justify-center">
            {bioContent.map((slide, index) => (
              <motion.div
                key={`img-${index}`}
                className="relative w-full max-w-md aspect-square"
                initial="hidden"
                animate={currentSlide > index ? "visible" : "hidden"}
                variants={imageVariants}
                style={{ 
                  display: currentSlide > index ? 'block' : 'none',
                  position: currentSlide > index ? 'absolute' : 'relative',
                  zIndex: index,
                }}
              >
                {slide.imagePath && (
                  <div className="relative overflow-hidden">
                    <img 
                      src={slide.imagePath || "/lovable-uploads/22a4f7cb-fbc2-4f89-a11d-b9f00b04e073.png"} 
                      alt={`Slide ${index + 1}`} 
                      className="w-full aspect-square object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="absolute inset-0 border border-dark-gray pointer-events-none"></div>
                  </div>
                )}
              </motion.div>
            ))}
            {/* Default profile image when no slides are shown */}
            <motion.div
              className="relative w-full max-w-md aspect-square"
              initial={{ opacity: 1 }}
              animate={{ opacity: currentSlide > 0 ? 0 : 1 }}
              style={{ display: currentSlide > 0 ? 'none' : 'block' }}
            >
              <div className="relative overflow-hidden">
                <img 
                  src="/lovable-uploads/22a4f7cb-fbc2-4f89-a11d-b9f00b04e073.png" 
                  alt="Profile" 
                  className="w-full aspect-square object-cover grayscale"
                />
                <div className="absolute inset-0 border border-dark-gray pointer-events-none"></div>
              </div>
            </motion.div>
          </div>
          
          {/* Text Column */}
          <div className={`w-full lg:w-1/2 space-y-6 ${isRtl ? "text-right" : "text-left"}`}>
            {bioContent.map((slide, index) => (
              <motion.p
                key={`text-${index}`}
                variants={slideVariants}
                initial="hidden"
                animate={currentSlide > index ? "visible" : "hidden"}
                className="text-lg md:text-xl text-almost-white leading-relaxed"
                style={{ 
                  direction: isRtl ? "rtl" : "ltr",
                }}
              >
                {slide.text}
              </motion.p>
            ))}
            
            {!hasShownAll && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: currentSlide > 0 ? 1 : 0 }}
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
      
      {!hasShownAll && currentSlide === 0 && (
        <motion.div 
          className="absolute bottom-12 w-full flex justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <div className="text-light-gray text-sm animate-bounce">
            {isRtl ? "גלול למטה כדי להמשיך" : "Scroll down to continue"}
          </div>
        </motion.div>
      )}
      
      {/* Slide indicators */}
      {!hasShownAll && bioContent.length > 1 && (
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
          {bioContent.map((_, index) => (
            <div 
              key={`indicator-${index}`}
              className={`w-2 h-2 rounded-full transition-all ${
                currentSlide > index ? "bg-white" : "bg-gray-600"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ScrollingBio;
