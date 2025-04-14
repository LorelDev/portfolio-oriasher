
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import ScrollReveal from "./ScrollReveal";
import { useIsMobile } from "@/hooks/use-mobile";
import { RefreshCw } from "lucide-react";

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

// Color palette for text variation (soft, elegant, dark-friendly)
const colorPalette = [
  "#F2F2F2", // white
  "#7AD3F4", // soft blue
  "#F0B37E", // amber
  "#A3E3A1", // mint green
  "#F97AA8", // light rose
  "#C4B5FD", // lavender
  "#F9D56E", // soft yellow
];

// Font variations for text rhythm
const fontVariations = [
  { weight: 400, size: "text-lg md:text-xl", spacing: "tracking-normal" },
  { weight: 500, size: "text-lg md:text-xl", spacing: "tracking-wide" },
  { weight: 300, size: "text-xl md:text-2xl", spacing: "tracking-normal" },
  { weight: 600, size: "text-base md:text-lg", spacing: "tracking-tight" },
  { weight: 400, size: "text-lg md:text-xl", spacing: "tracking-wider" },
];

// Background steps from dark to lighter
const backgroundSteps = [
  "#0f0f0f", "#131313", "#161616", "#1a1a1a", "#1d1d1d", "#212121", "#222222", 
  "#262626", "#2a2a2a", "#2e2e2e", "#323232", "#363636", "#3a3a3a", "#3e3e3e"
];

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
  const [isReplaying, setIsReplaying] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const accumulatedDeltaRef = useRef<number>(0);
  
  // Higher number means less sensitive scroll (adjusted up from 120)
  const scrollSensitivity = 180; 
  
  const isMobile = useIsMobile();
  
  // Get current background color based on current slide
  const currentBgColor = backgroundSteps[
    Math.min(currentSlide, backgroundSteps.length - 1)
  ];

  // Reset the experience
  const handleReplay = () => {
    setCurrentSlide(1);
    setIsScrollLocked(true);
    setHasShownAll(false);
    setIsReplaying(true);
    
    // Smooth scroll back to the top of the section
    sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    
    // Set replaying state back to false after animation completes
    setTimeout(() => {
      setIsReplaying(false);
    }, 1000);
  };

  // Display the first slide after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentSlide === 0) {
        setCurrentSlide(1);
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Auto-advance for mobile users (but not immediately)
  useEffect(() => {
    if (isMobile) {
      const timer = setTimeout(() => {
        if (currentSlide <= 1) {
          setCurrentSlide(2); // Just advance to the second slide to get started
        }
      }, 1200);
      
      return () => clearTimeout(timer);
    }
  }, [isMobile, currentSlide]);

  // Handle manual wheel events
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!isScrollLocked || !sectionRef.current || isReplaying) return;
      
      e.preventDefault();
      
      // Accumulate delta Y for less sensitive scrolling
      accumulatedDeltaRef.current += e.deltaY;
      
      // Only proceed if we've accumulated enough scroll
      if (Math.abs(accumulatedDeltaRef.current) >= scrollSensitivity) {
        // Detect scroll direction
        if (accumulatedDeltaRef.current > 0 && currentSlide < bioContent.length) {
          // Scrolling down - advance to next slide
          setCurrentSlide(prev => Math.min(prev + 1, bioContent.length));
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
  }, [isScrollLocked, currentSlide, bioContent.length, isReplaying]);

  // Handle touch events for mobile
  useEffect(() => {
    let touchStartY = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      if (!isScrollLocked || isReplaying) return;
      touchStartY = e.touches[0].clientY;
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (!isScrollLocked || !sectionRef.current || isReplaying) return;
      
      e.preventDefault();
      const touchY = e.touches[0].clientY;
      const diff = touchStartY - touchY;
      
      // Use a gentler threshold for mobile (down from 50)
      if (Math.abs(diff) > 30) {
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
  }, [isScrollLocked, currentSlide, bioContent.length, isReplaying]);

  // Show all slides function
  const handleShowAll = () => {
    setCurrentSlide(bioContent.length);
    setIsScrollLocked(false);
    setHasShownAll(true);
  };

  // Animation variants for text lines
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.7, 
        delay: i * 0.15,
        ease: [0.22, 1, 0.36, 1] 
      } 
    })
  };

  const fadeVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.7, transition: { duration: 0.5 } }
  };

  // Get background image path from first slide (if available)
  const backgroundImagePath = bioContent[0].imagePath || "/lovable-uploads/21764655-ea01-4fdb-aea6-0c4f7ab27e66.png";

  return (
    <div 
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center py-16 z-10 overflow-hidden"
      id="about"
      style={{ 
        backgroundColor: currentBgColor,
        transition: "background-color 0.8s ease-out",
      }}
    >
      {/* Background Image Layer */}
      <div className="absolute inset-0 w-full h-full">
        <motion.img
          src={backgroundImagePath}
          alt="Background"
          className="object-cover w-full h-full opacity-30 blur-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: Math.max(0.15, 0.3 - (currentSlide * 0.03)) }}
          transition={{ duration: 0.8 }}
        />
        <motion.div 
          initial="hidden"
          animate={currentSlide > 0 ? "visible" : "hidden"}
          variants={fadeVariants}
          className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f0f0fa0] to-[#0f0f0f] z-10"
        />
      </div>

      <div className="container mx-auto px-4 relative z-20">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-medium mb-12 text-center tracking-wide">
            {title}
          </h2>
        </ScrollReveal>
        
        <div className={`flex flex-col-reverse items-center justify-center py-8 max-w-3xl mx-auto`}>
          {/* Text Column */}
          <div 
            className={`w-full space-y-6 ${isRtl ? "text-right" : "text-left"} pt-10`}
            style={{ direction: isRtl ? "rtl" : "ltr" }}
          >
            {bioContent.map((slide, index) => {
              // Get text style variations for this line
              const variation = fontVariations[index % fontVariations.length];
              const textColor = colorPalette[index % colorPalette.length];
              
              return (
                <motion.p
                  key={`text-${index}`}
                  custom={index}
                  variants={textVariants}
                  initial="hidden"
                  animate={currentSlide > index ? "visible" : "hidden"}
                  className={`${variation.size} ${variation.spacing} leading-relaxed text-center`}
                  style={{ 
                    direction: isRtl ? "rtl" : "ltr",
                    fontWeight: variation.weight,
                    color: textColor,
                    textShadow: "0px 0px 2px rgba(0,0,0,0.5)" // Light text shadow for readability
                  }}
                >
                  {slide.text}
                </motion.p>
              )
            })}
            
            <div className="flex justify-center mt-12">
              {!hasShownAll ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: currentSlide > 0 ? 1 : 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  <Button 
                    onClick={handleShowAll} 
                    className="mono-button"
                  >
                    {showAllLabel}
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <Button 
                    onClick={handleReplay} 
                    className="mono-button flex items-center gap-2"
                  >
                    <RefreshCw className="h-4 w-4" />
                    {isRtl ? "שחזר" : "Replay"}
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll down indicator */}
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
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-20">
          {bioContent.map((_, index) => (
            <motion.div 
              key={`indicator-${index}`}
              className={`w-2 h-2 rounded-full transition-all`}
              animate={{
                backgroundColor: currentSlide > index 
                  ? colorPalette[index % colorPalette.length] 
                  : "rgba(100, 100, 100, 0.4)",
                scale: currentSlide === index + 1 ? 1.2 : 1
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ScrollingBio;
