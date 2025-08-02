import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { scroller } from "react-scroll";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTheme } from "@/hooks/use-theme";
import { Mail, Laptop, Hand } from "lucide-react";

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

const MILESTONES: TimelineMilestone[] = [
  { 
    sectionId: "hero", 
    icon: <Hand size={18} />, 
    tooltipEn: "Hello", 
    tooltipHe: "שלום" 
  },
  { 
    sectionId: "projects", 
    icon: <Laptop size={18} />, 
    tooltipEn: "Projects", 
    tooltipHe: "פרויקטים" 
  },
  { 
    sectionId: "contact", 
    icon: <Mail size={18} />, 
    tooltipEn: "Contact", 
    tooltipHe: "צור קשר" 
  },
];

const VerticalTimeline = ({ language, isRtl }: TimelineProps) => {
  const { scrollYProgress } = useScroll();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const { isDark } = useTheme();
  const isMobile = useIsMobile();
  
  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Setup intersection observer for section detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    const observeSections = () => {
      const sections = document.querySelectorAll(
        "section[id], div[id='hero'], div[id='about'], div[id='contact']"
      );
      sections.forEach((section) => observer.observe(section));
    };

    // Delay to ensure DOM is ready
    setTimeout(observeSections, 500);

    return () => {
      const sections = document.querySelectorAll(
        "section[id], div[id='hero'], div[id='about'], div[id='contact']"
      );
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const handleMilestoneClick = (sectionId: string) => {
    scroller.scrollTo(sectionId, {
      duration: 800,
      smooth: true,
      offset: -50
    });
  };

  const getMilestoneStyles = (milestone: TimelineMilestone) => {
    const isActive = activeSection === milestone.sectionId;
    
    if (isDark) {
      return isActive
        ? "border-neutral-400 bg-neutral-300/20 text-white scale-125"
        : "border-white/30 bg-white/10 text-white/60";
    } else {
      return isActive
        ? "border-blue-600 bg-blue-500/30 scale-125 text-blue-800 shadow-lg ring-2 ring-blue-500/20"
        : "border-gray-900 bg-white/95 text-gray-900 shadow-lg ring-1 ring-gray-400";
    }
  };

  const getHoverAnimation = () => ({
    scale: 1.2,
    boxShadow: isDark 
      ? "0 0 15px 5px rgba(255,255,255,0.2)"
      : "0 0 15px 5px rgba(0,0,0,0.3)"
  });

  const getActiveAnimation = (isActive: boolean) => ({
    boxShadow: isActive 
      ? isDark
        ? ["0 0 0px 0px rgba(255,255,255,0)", "0 0 15px 5px rgba(255,255,255,0.3)", "0 0 0px 0px rgba(255,255,255,0)"]
        : ["0 0 0px 0px rgba(0,0,0,0)", "0 0 15px 5px rgba(0,0,0,0.3)", "0 0 0px 0px rgba(0,0,0,0)"]
      : "0 0 0px 0px rgba(0,0,0,0)"
  });

  // Don't render on mobile
  if (isMobile) {
    return null;
  }

  return (
    <motion.div
      className={`fixed top-0 h-full ${isRtl ? "right-8" : "left-8"} z-50 hidden md:flex flex-col items-center justify-center pointer-events-none`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.8 }}
      style={{ width: "auto" }}
    >
      {/* Background line */}
      <div 
        className={`absolute w-0.5 h-full rounded-full ${
          isDark ? 'bg-white/20' : 'bg-gray-300'
        }`}
        style={{ 
          top: 0,
          left: "50%", 
          transform: "translateX(-50%)",
        }} 
      />
      
      {/* Progress indicator (dark mode only) */}
      {isDark && (
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
      
      {/* Milestone indicators */}
      <div className="h-full flex flex-col items-center justify-around py-[15vh] w-10">
        {MILESTONES.map((milestone) => {
          const isActive = activeSection === milestone.sectionId;
          
          return (
            <TooltipProvider key={milestone.sectionId}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div 
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center cursor-pointer z-10 
                      border-2 transition-all duration-300 pointer-events-auto
                      ${isDark ? 'backdrop-blur-sm' : ''}
                      ${getMilestoneStyles(milestone)}
                    `}
                    whileHover={getHoverAnimation()}
                    animate={getActiveAnimation(isActive)}
                    transition={{
                      boxShadow: {
                        repeat: isActive ? Infinity : 0,
                        duration: 2
                      }
                    }}
                    onClick={() => handleMilestoneClick(milestone.sectionId)}
                  >
                    {milestone.icon}
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent side={isRtl ? "left" : "right"} className="z-50">
                  <p>{language === "en" ? milestone.tooltipEn : milestone.tooltipHe}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>
    </motion.div>
  );
};

export default VerticalTimeline;