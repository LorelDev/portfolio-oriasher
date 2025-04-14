
import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-scroll";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";

interface TimelineProps {
  language: "en" | "he";
  isRtl: boolean;
}

interface TimelineMilestone {
  sectionId: string;
  emoji: string;
  tooltipEn: string;
  tooltipHe: string;
}

const VerticalTimeline = ({ language, isRtl }: TimelineProps) => {
  const { scrollYProgress } = useScroll();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  
  const isMobile = useIsMobile();
  
  // Modified to extend full page height
  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  
  const milestones: TimelineMilestone[] = [
    { sectionId: "hero", emoji: "👋", tooltipEn: "Hello", tooltipHe: "שלום" },
    { sectionId: "projects", emoji: "📱", tooltipEn: "My Project", tooltipHe: "הפרויקט שלי" },
    { sectionId: "about", emoji: "👨‍💻", tooltipEn: "About Me", tooltipHe: "קצת עלי" },
    { sectionId: "contact", emoji: "✉️", tooltipEn: "Contact", tooltipHe: "צור קשר" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 } // Lower threshold to detect sections earlier
    );

    // Slight delay to ensure all sections are properly rendered
    setTimeout(() => {
      const sections = document.querySelectorAll("section[id], div[id='hero'], div[id='about']");
      sections.forEach((section) => {
        observer.observe(section);
      });
    }, 500);

    return () => {
      const sections = document.querySelectorAll("section[id], div[id='hero'], div[id='about']");
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  if (isMobile) {
    return (
      <motion.div
        className={`fixed ${isRtl ? "right-0" : "left-0"} bottom-0 w-full h-12 bg-black/70 backdrop-blur-sm z-50 flex justify-around items-center px-4`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        {milestones.map((milestone) => (
          <Link
            key={milestone.sectionId}
            to={milestone.sectionId}
            spy={true}
            smooth={true}
            duration={800}
            offset={-50}
          >
            <motion.div
              className={`rounded-full w-8 h-8 flex items-center justify-center cursor-pointer transition-all duration-300 ${
                activeSection === milestone.sectionId
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                  : "bg-white/20 text-white/70"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{milestone.emoji}</span>
            </motion.div>
          </Link>
        ))}
        <motion.div
          className="absolute bottom-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600"
          style={{
            left: 0,
            right: 0,
            width: progressWidth,
            transformOrigin: isRtl ? "right" : "left"
          }}
        />
      </motion.div>
    );
  }

  // Desktop timeline
  return (
    <motion.div
      className={`fixed top-0 h-full ${isRtl ? "right-8" : "left-8"} z-50 hidden md:flex flex-col items-center justify-center pointer-events-none`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.8 }}
    >
      {/* Full-height background line */}
      <div className="absolute w-0.5 bg-white/20 h-full rounded-full" 
        style={{ 
          top: 0,
          left: "50%", 
          transform: "translateX(-50%)",
        }} 
      />
      
      {/* Progress indicator */}
      <motion.div 
        className="absolute w-0.5 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full" 
        style={{ 
          left: "50%", 
          transform: "translateX(-50%)",
          top: 0,
          height: progressHeight,
          originY: 0
        }}
      />
      
      {/* Milestone indicators positioned evenly along the timeline */}
      <div className="h-full flex flex-col items-center justify-around py-[15vh]">
        {milestones.map((milestone, index) => (
          <TooltipProvider key={milestone.sectionId}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to={milestone.sectionId}
                  spy={true}
                  smooth={true}
                  duration={800}
                  offset={-50}
                  className="pointer-events-auto"
                >
                  <motion.div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer backdrop-blur-sm z-10 border-2 transition-all duration-300 ${
                      activeSection === milestone.sectionId
                        ? "border-purple-500 bg-white/20 text-white scale-125"
                        : "border-white/30 bg-white/10 text-white/60"
                    }`}
                    whileHover={{ 
                      scale: 1.2, 
                      boxShadow: "0 0 15px 5px rgba(255,255,255,0.2)"
                    }}
                    animate={{
                      boxShadow: activeSection === milestone.sectionId 
                        ? ["0 0 0px 0px rgba(168,109,255,0)", "0 0 15px 5px rgba(168,109,255,0.5)", "0 0 0px 0px rgba(168,109,255,0)"]
                        : "0 0 0px 0px rgba(168,109,255,0)"
                    }}
                    transition={{
                      boxShadow: {
                        repeat: activeSection === milestone.sectionId ? Infinity : 0,
                        duration: 2
                      }
                    }}
                  >
                    <span>{milestone.emoji}</span>
                  </motion.div>
                </Link>
              </TooltipTrigger>
              <TooltipContent side={isRtl ? "left" : "right"} className="z-50">
                <p>{language === "en" ? milestone.tooltipEn : milestone.tooltipHe}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </motion.div>
  );
};

export default VerticalTimeline;
