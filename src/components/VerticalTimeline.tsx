import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { animateScroll as scroll, scroller } from "react-scroll";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTheme } from "@/hooks/use-theme";
import { Mail, Phone, Laptop, Hand } from "lucide-react";

interface TimelineProps {
  language: "en" | "he";
  isRtl: boolean;
}

interface TimelineMilestone {
  sectionId: string;
  icon: React.ReactNode;
  tooltipEn: string;
  tooltipHe: string;
}

const VerticalTimeline = ({ language, isRtl }: TimelineProps) => {
  const { scrollYProgress } = useScroll();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const { isDark } = useTheme();
  
  const isMobile = useIsMobile();
  
  // Modified to extend full page height
  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  
  // Reordered milestones according to user request: Hand (Hello), Laptop (Projects), Mail (Contact)
  const milestones: TimelineMilestone[] = [
    { sectionId: "hero", icon: <Hand size={18} color="currentColor" />, tooltipEn: "Hello", tooltipHe: "שלום" },
    { sectionId: "projects", icon: <Laptop size={18} color="currentColor" />, tooltipEn: "Projects", tooltipHe: "פרויקטים" },
    { sectionId: "contact", icon: <Mail size={18} color="currentColor" />, tooltipEn: "Contact", tooltipHe: "צור קשר" },
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
      const sections = document.querySelectorAll("section[id], div[id='hero'], div[id='about'], div[id='contact']");
      sections.forEach((section) => {
        observer.observe(section);
      });
    }, 500);

    return () => {
      const sections = document.querySelectorAll("section[id], div[id='hero'], div[id='about'], div[id='contact']");
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  if (isMobile) {
    return null;
  }

  // Desktop timeline - updated with pointer-events-none on the timeline elements 
  // but pointer-events-auto on the clickable links
  return (
    <motion.div
      className={`fixed top-0 h-full ${isRtl ? "right-8" : "left-8"} z-50 hidden md:flex flex-col items-center justify-center pointer-events-none`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.8 }}
      style={{ width: "auto" }} // Ensure width is minimal
    >
      {/* Full-height background line */}
      <div className={`absolute w-0.5 h-full rounded-full ${
        isDark ? 'bg-white/20' : 'bg-gray-300'
      }`}
        style={{ 
          top: 0,
          left: "50%", 
          transform: "translateX(-50%)",
        }} 
      />
      
      {/* Progress indicator - only shown in dark mode */}
      {!isMobile && isDark && (
        <motion.div 
          className="absolute w-0.5 rounded-full bg-neutral-300"
          style={{ 
            left: "50%", 
            transform: "translateX(-50%)",
            top: 0,
            height: progressHeight,
            originY: 0
          }}
        />
      )}
      
      {/* Milestone indicators positioned evenly along the timeline */}
      <div className="h-full flex flex-col items-center justify-around py-[15vh] w-10">
        {milestones.map((milestone, index) => (
          <TooltipProvider key={milestone.sectionId}>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer z-10 border-2 transition-all duration-300 pointer-events-auto ${
                    isDark ? 'backdrop-blur-sm' : ''
                  } ${
                    activeSection === milestone.sectionId
                      ? isDark 
                        ? "border-neutral-400 bg-neutral-300/20 text-white scale-125"
                        : "border-blue-600 bg-blue-500/30 scale-125 text-blue-800 shadow-lg ring-2 ring-blue-500/20"
                      : isDark
                        ? "border-white/30 bg-white/10 text-white/60"
                        : "border-gray-900 bg-white/95 text-gray-900 shadow-lg ring-1 ring-gray-400"
                  }`}
                  whileHover={{ 
                    scale: 1.2, 
                    boxShadow: isDark 
                      ? "0 0 15px 5px rgba(255,255,255,0.2)"
                      : "0 0 15px 5px rgba(0,0,0,0.3)"
                  }}
                  animate={{
                    boxShadow: activeSection === milestone.sectionId 
                      ? isDark
                        ? ["0 0 0px 0px rgba(255,255,255,0)", "0 0 15px 5px rgba(255,255,255,0.3)", "0 0 0px 0px rgba(255,255,255,0)"]
                        : ["0 0 0px 0px rgba(0,0,0,0)", "0 0 15px 5px rgba(0,0,0,0.3)", "0 0 0px 0px rgba(0,0,0,0)"]
                      : "0 0 0px 0px rgba(0,0,0,0)"
                  }}
                  transition={{
                    boxShadow: {
                      repeat: activeSection === milestone.sectionId ? Infinity : 0,
                      duration: 2
                    }
                  }}
                  onClick={() => {
                    scroller.scrollTo(milestone.sectionId, {
                      duration: 800,
                      smooth: true,
                      offset: -50
                    });
                  }}
                >
                  {milestone.icon}
                </motion.div>
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
