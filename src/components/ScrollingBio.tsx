
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from "./ScrollReveal";
import { ArrowDownIcon, ChevronLeft, ChevronRight } from "lucide-react";

interface ScrollingBioProps {
  bioContent: {
    text: string;
    imagePath?: string;
  }[];
  language: "en" | "he";
  isRtl: boolean;
  title: string;
}

const ScrollingBio: React.FC<ScrollingBioProps> = ({
  bioContent,
  language,
  isRtl,
  title
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Color palette for text variation
  const colorPalette = [
    "#F2F2F2", // white
    "#7AD3F4", // soft blue
    "#F0B37E", // amber
    "#A3E3A1", // mint green
    "#F97AA8", // light rose
    "#C4B5FD", // lavender
  ];

  // Track section visibility for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.25 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Auto-advance text with pauses
  useEffect(() => {
    if (!isVisible || isHovering) return;
    
    const timer = setTimeout(() => {
      if (activeIndex < bioContent.length - 1) {
        setActiveIndex(prev => prev + 1);
      }
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [activeIndex, isVisible, bioContent.length, isHovering]);

  // Swipe gesture detection
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const minSwipeDistance = 50;
    const swipeDistance = touchEndX.current - touchStartX.current;
    
    if (swipeDistance > minSwipeDistance && activeIndex > 0) {
      // Swiped right, go to previous
      setActiveIndex(prev => prev - 1);
    } else if (swipeDistance < -minSwipeDistance && activeIndex < bioContent.length - 1) {
      // Swiped left, go to next
      setActiveIndex(prev => prev + 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        isRtl ? handlePrev() : handleNext();
      } else if (e.key === 'ArrowLeft') {
        isRtl ? handleNext() : handlePrev();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeIndex, isRtl]);

  const handleNext = () => {
    if (activeIndex < bioContent.length - 1) {
      setActiveIndex(prev => prev + 1);
    }
  };
  
  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(prev => prev - 1);
    }
  };

  // Get background image from first slide
  const backgroundImageUrl = bioContent[0]?.imagePath || "/lovable-uploads/21764655-ea01-4fdb-aea6-0c4f7ab27e66.png";
  
  return (
    <div 
      ref={sectionRef}
      className="relative min-h-[100dvh] flex flex-col items-center justify-center py-16 z-10 bg-deep-black overflow-hidden"
      id="about"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 1 }}
          className="relative w-full h-full"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent from-10% via-deep-black/80 via-50% to-deep-black to-90% z-10" />
          <img
            src={backgroundImageUrl}
            alt="Background"
            className="object-cover object-center w-full h-full opacity-40"
          />
        </motion.div>
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4 relative z-20 max-w-4xl">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-medium mb-12 text-center tracking-wide">
            {title}
          </h2>
        </ScrollReveal>
        
        <div 
          ref={contentRef}
          className="relative text-center space-y-4 min-h-[300px] w-full"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Navigation hint overlay - visible on hover */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-between px-4 z-10 opacity-0 pointer-events-none"
            animate={{ opacity: isHovering ? 0.8 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className={`h-12 w-12 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center ${activeIndex === 0 ? 'opacity-30' : 'cursor-pointer opacity-90'}`}
              whileHover={{ scale: activeIndex > 0 ? 1.1 : 1 }}
              onClick={handlePrev}
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </motion.div>
            
            <motion.div 
              className={`h-12 w-12 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center ${activeIndex === bioContent.length - 1 ? 'opacity-30' : 'cursor-pointer opacity-90'}`}
              whileHover={{ scale: activeIndex < bioContent.length - 1 ? 1.1 : 1 }}
              onClick={handleNext}
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </motion.div>
          </motion.div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="mb-8 px-4"
            >
              <p
                className="text-xl md:text-2xl leading-relaxed"
                style={{
                  color: colorPalette[activeIndex % colorPalette.length],
                  textShadow: "0px 0px 15px rgba(0,0,0,0.5)"
                }}
              >
                {bioContent[activeIndex].text}
              </p>
            </motion.div>
          </AnimatePresence>
          
          {/* Navigation Indicators */}
          <motion.div 
            className="flex justify-center space-x-2 mt-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {bioContent.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? `bg-${colorPalette[index % colorPalette.length].substring(1)} scale-125` 
                    : "bg-gray-500/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </motion.div>
          
          {/* Scroll indicator */}
          {activeIndex === 0 && (
            <motion.div
              className="absolute bottom-8 w-full flex justify-center"
              animate={{ 
                y: [0, 10, 0],
                opacity: [0.5, 1, 0.5] 
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 2 
              }}
            >
              <ArrowDownIcon className="h-6 w-6 text-light-gray" />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScrollingBio;

