
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface BioContent {
  text: string;
  imagePath: string;
}

interface EnhancedAboutMeProps {
  bioContent: BioContent[];
  language: "en" | "he";
  isRtl: boolean;
  title: string;
}

const EnhancedAboutMe = ({ bioContent, language, isRtl, title }: EnhancedAboutMeProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  // Color palette for subtle text variation
  const colorPalette = [
    "#F2F2F2", // white
    "#E0E0E0", // off white
    "#E6E6E6", // light gray
    "#F0F0F0", // subtle white
    "#ECECEC", // silver
  ];
  
  // Calculate stagger delay for paragraphs
  const calculateDelay = (index: number) => 0.2 + index * 0.1;
  
  return (
    <section 
      id="about" 
      ref={sectionRef}
      className={cn(
        "relative min-h-[100dvh] px-6 md:px-12 lg:px-24 py-24",
        "flex items-center justify-center overflow-hidden"
      )}
      style={{ direction: isRtl ? "rtl" : "ltr" }}
    >
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-deep-black/80 via-deep-black to-deep-black z-10" />
        <motion.img
          src={bioContent[0]?.imagePath}
          alt="Background"
          className="w-full h-full object-cover opacity-20"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2 }}
          style={{ objectPosition: "center center" }}
        />
      </div>
      
      {/* Content Container */}
      <div className="max-w-6xl w-full mx-auto relative z-10">
        <div className={`flex flex-col ${isMobile ? 'gap-10' : 'md:flex-row md:gap-16 lg:gap-24'} items-center`}>
          
          {/* Image Column - Image on top for mobile, left side for desktop */}
          <motion.div 
            className="w-full md:w-2/5 flex justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-full max-w-md aspect-square">
              <div className="absolute inset-0 bg-gradient-radial from-soft-black/50 via-deep-black/20 to-transparent rounded-full blur-2xl opacity-70 transform scale-150" />
              <motion.div
                className="relative w-full h-full rounded-full overflow-hidden border border-dark-gray/30"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
              >
                <img 
                  src={bioContent[0]?.imagePath}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </motion.div>
          
          {/* Text Column - Right side for desktop, below image for mobile */}
          <div className="w-full md:w-3/5 flex flex-col">
            <ScrollReveal delay={0.1}>
              <h2 className="text-sm uppercase tracking-widest text-neutral-500 mb-6">
                {title}
              </h2>
            </ScrollReveal>
            
            <div className="space-y-6 md:space-y-8 max-w-[60ch]">
              {bioContent.map((item, index) => (
                <ScrollReveal key={index} delay={calculateDelay(index)}>
                  <p 
                    className="text-lg md:text-xl leading-relaxed md:leading-loose"
                    style={{ 
                      color: colorPalette[index % colorPalette.length],
                    }}
                  >
                    {item.text}
                  </p>
                </ScrollReveal>
              ))}
              
              {/* Animated caret at the end */}
              <motion.div 
                className="h-6 mt-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: calculateDelay(bioContent.length) }}
                viewport={{ once: true }}
              >
                <motion.span 
                  className="inline-block w-0.5 h-5 bg-light-gray"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ 
                    repeat: Infinity,
                    duration: 1.2, 
                    repeatDelay: 0.3
                  }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedAboutMe;
