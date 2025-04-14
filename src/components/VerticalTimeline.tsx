
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
  
  // Use the custom hook instead of useState + useEffect for detecting mobile
  const isMobile = useIsMobile();
  
  // Create all transform values at the component level, before any conditionals
  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "30vh"]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  
  // Define timeline milestones
  const milestones: TimelineMilestone[] = [
    { sectionId: "hero", emoji: "👋", tooltipEn: "Hello", tooltipHe: "שלום" },
    { sectionId: "about", emoji: "👨‍💻", tooltipEn: "About Me", tooltipHe: "קצת עלי" },
    { sectionId: "projects", emoji: "📱", tooltipEn: "My Project", tooltipHe: "הפרויקט שלי" },
    { sectionId: "contact", emoji: "✉️", tooltipEn: "Contact", tooltipHe: "צור קשר" },
  ];

  // Track which section is currently in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  // Render mobile timeline
  if (isMobile) {
    return (
      <motion.div
        className={`fixed ${isRtl ? "right-0" : "left-0"} bottom-0 w-full h-12 bg-black/10 backdrop-blur-sm z-20 flex justify-around items-center px-4`}
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

  // Desktop vertical timeline
  return (
    <motion.div
      className={`fixed top-1/2 transform -translate-y-1/2 ${isRtl ? "right-8" : "left-8"} z-20 hidden md:block`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.8 }}
    >
      {/* Vertical line background */}
      <div className="absolute w-0.5 bg-white/20 h-[30vh] rounded-full" style={{ 
        left: "50%", 
        transform: "translateX(-50%)",
        top: "-15vh"
      }} />
      
      {/* Progress fill */}
      <motion.div 
        className="absolute w-0.5 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full" 
        style={{ 
          left: "50%", 
          transform: "translateX(-50%)",
          top: "-15vh",
          height: progressHeight,
          originY: 0
        }}
      />
      
      <div className="relative flex flex-col items-center gap-16">
        {milestones.map((milestone) => (
          <TooltipProvider key={milestone.sectionId}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to={milestone.sectionId}
                  spy={true}
                  smooth={true}
                  duration={800}
                  offset={-50}
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
