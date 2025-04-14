
import React, { useRef, useEffect } from "react";
import { Link } from "react-scroll";
import { TypeAnimation } from "react-type-animation";
import { motion, useAnimation, useMotionValue, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";

interface HeroProps {
  language: "en" | "he";
  currentText: {
    hero: {
      greeting: string;
      tagline: string;
      cta: string;
      downloadResume: string;
    };
  };
  isRtl: boolean;
}

const Hero = ({ language, currentText, isRtl }: HeroProps) => {
  const typingTexts = {
    en: [
      "I code things that work",
      2500,
      "I write clean frontend logic",
      2500,
      "I solve problems with code",
      2500,
      "I turn coffee into JavaScript",
      2500,
      "I build interactive experiences",
      2500,
    ],
    he: [
      "אני מקודד דברים שעובדים",
      2500,
      "אני כותב לוגיקת פרונטאנד נקייה",
      2500,
      "אני פותר בעיות עם קוד",
      2500,
      "אני הופך קפה לג'אווהסקריפט",
      2500,
      "אני בונה חוויות אינטראקטיביות",
      2500,
    ],
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  // Reference for the name element
  const nameRef = useRef<HTMLSpanElement>(null);
  const controls = useAnimation();
  
  // Set up motion values for the magnetic effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-30, 30], [10, -10]);
  const rotateY = useTransform(x, [-30, 30], [-10, 10]);

  // Handle mouse movement for magnetic effect
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (nameRef.current) {
        const { left, top, width, height } = nameRef.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        
        const distanceX = event.clientX - centerX;
        const distanceY = event.clientY - centerY;
        
        // Check if mouse is close enough to activate the effect
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        const maxDistance = 200;
        
        if (distance < maxDistance) {
          // Scale the effect based on proximity
          const factor = 1 - distance / maxDistance;
          x.set(distanceX * factor * 0.3);
          y.set(distanceY * factor * 0.3);
          controls.start({
            scale: 1 + factor * 0.1,
            transition: { type: "spring", stiffness: 300, damping: 15 }
          });
        } else {
          // Reset position when mouse is far away
          x.set(0);
          y.set(0);
          controls.start({ scale: 1 });
        }
      }
    };

    // Reset on mouse leave
    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
      controls.start({ scale: 1 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    nameRef.current?.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      nameRef.current?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [controls, x, y]);

  return (
    <section 
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 py-20 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-animated" />
      
      <motion.div 
        className="max-w-3xl mx-auto z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
          variants={itemVariants}
        >
          {language === "en" ? "Hi, I'm " : "היי, אני "}
          <motion.span
            ref={nameRef}
            animate={controls}
            style={{
              display: "inline-block",
              x,
              y,
              rotateX,
              rotateY
            }}
            className="relative origin-center"
          >
            {language === "en" ? "Ori" : "אורי"}
          </motion.span>
        </motion.h1>

        <motion.div 
          className="text-2xl md:text-3xl font-medium mb-8 min-h-[2em] flex items-center justify-center"
          variants={itemVariants}
        >
          <TypeAnimation
            sequence={typingTexts[language]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            cursor={true}
            className={`inline-block ${isRtl ? "text-right" : "text-left"}`}
          />
        </motion.div>

        <motion.p 
          className="text-xl md:text-2xl text-gray-700 mb-10"
          variants={itemVariants}
        >
          {currentText.hero.tagline}
        </motion.p>

        <motion.div 
          className="flex flex-wrap gap-4 justify-center"
          variants={itemVariants}
        >
          <Link to="projects" smooth={true} duration={800} offset={-50}>
            <Button className="text-lg px-8 py-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
              {currentText.hero.cta}
            </Button>
          </Link>
          <a href="https://drive.google.com/uc?export=download&id=1v8KM36DgGQztTmocsPp7my0xNSSJxaOw" target="_blank" rel="noopener noreferrer">
            <Button 
              variant="outline" 
              className="text-lg px-8 py-6 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              {currentText.hero.downloadResume}
            </Button>
          </a>
        </motion.div>
      </motion.div>

      <motion.div 
        className="absolute bottom-10 w-full flex justify-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <Link to="projects" smooth={true} duration={800} offset={-50}>
          <motion.div 
            className="animate-bounce cursor-pointer text-gray-500 hover:text-gray-700"
            whileHover={{ scale: 1.2 }}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-8 w-8" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 14l-7 7m0 0l-7-7m7 7V3" 
              />
            </svg>
          </motion.div>
        </Link>
      </motion.div>
    </section>
  );
};

export default Hero;
