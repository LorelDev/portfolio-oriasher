
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import ScrollReveal from "./ScrollReveal";
import { RefreshCw, ArrowDownIcon } from "lucide-react";

interface ScrollingBioProps {
  bioContent: {
    text: string;
    imagePath?: string;
  }[];
  language: "en" | "he";
  isRtl: boolean;
  title: string;
  showAllLabel?: string;
}

const ScrollingBio: React.FC<ScrollingBioProps> = ({
  bioContent,
  language,
  isRtl,
  title,
  showAllLabel = "Show All"
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'preview' | 'all'>('preview');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
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

  // Auto-advance text for initial display
  useEffect(() => {
    if (!isVisible || viewMode === 'all') return;
    
    const timer = setTimeout(() => {
      if (activeIndex < bioContent.length - 1) {
        setActiveIndex(prev => prev + 1);
      }
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [activeIndex, isVisible, bioContent.length, viewMode]);

  // Handle next/prev navigation
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
  
  // Show all text
  const handleShowAll = () => {
    setViewMode('all');
  };
  
  // Reset to preview mode
  const handleReset = () => {
    setActiveIndex(0);
    setViewMode('preview');
  };

  // Get background image from first slide
  const backgroundImageUrl = bioContent[0]?.imagePath || "/lovable-uploads/21764655-ea01-4fdb-aea6-0c4f7ab27e66.png";

  return (
    <div 
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center py-16 z-10 bg-deep-black overflow-hidden"
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
        
        <div className="flex flex-col items-center justify-center">
          {/* Preview Mode */}
          {viewMode === 'preview' && (
            <div className="relative text-center space-y-4 min-h-[300px]">
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
              <div className="flex justify-center space-x-2 mt-8">
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
              </div>
              
              {/* Navigation Buttons */}
              <div className="flex justify-center gap-4 mt-8">
                <Button 
                  onClick={handlePrev}
                  disabled={activeIndex === 0}
                  variant="outline"
                  className="mono-button"
                >
                  {isRtl ? "הקודם" : "Previous"}
                </Button>
                
                <Button 
                  onClick={handleShowAll}
                  className="mono-button"
                >
                  {showAllLabel}
                </Button>
                
                <Button 
                  onClick={handleNext}
                  disabled={activeIndex === bioContent.length - 1}
                  variant="outline"
                  className="mono-button"
                >
                  {isRtl ? "הבא" : "Next"}
                </Button>
              </div>
            </div>
          )}
          
          {/* Show All Mode */}
          {viewMode === 'all' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8 text-center"
            >
              {bioContent.map((slide, index) => (
                <ScrollReveal key={index} delay={index * 0.2}>
                  <p
                    className="text-xl md:text-2xl leading-relaxed mb-6"
                    style={{ 
                      color: colorPalette[index % colorPalette.length],
                      textShadow: "0px 0px 15px rgba(0,0,0,0.5)"
                    }}
                  >
                    {slide.text}
                  </p>
                </ScrollReveal>
              ))}
              
              <div className="mt-12">
                <Button
                  onClick={handleReset}
                  className="mono-button flex items-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  {isRtl ? "שחזר" : "Reset"}
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Scroll indicator */}
      {viewMode === 'preview' && activeIndex === 0 && (
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
  );
};

export default ScrollingBio;
