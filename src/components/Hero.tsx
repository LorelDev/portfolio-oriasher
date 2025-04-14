
import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-scroll";
import { TypeAnimation } from "react-type-animation";
import { motion, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import HorizontalSocialIcons from "./HorizontalSocialIcons";
import ScrollReveal from "./ScrollReveal";

interface HeroProps {
  language: "en" | "he";
  currentText: {
    hero: {
      greeting: string;
      tagline: string;
      cta: string;
      downloadResume: string;
    };
    social: {
      linkedin: string;
      instagram: string;
      whatsapp: string;
      upwork: string;
      phone: string;
      resume: string;
    };
  };
  isRtl: boolean;
}

const Hero = ({ language, currentText, isRtl }: HeroProps) => {
  const nameChars = language === "en" ? ["O", "r", "i"] : ["א", "ו", "ר", "י"];
  const [charPositions, setCharPositions] = useState(nameChars.map(() => ({ x: 0, y: 0, rotate: 0 })));
  const typingSequences = {
    en: [
      "Heyyyyy",
      1500,
      "Maybe it's random… maybe not",
      1500,
      "Either way, welcome!",
      1500,
      "I'll use this opportunity",
      1500,
      "To tell you I'm not bad at what I do",
      1500,
      "And sometimes, it even works",
      1500,
    ],
    he: [
      "שלוםםםםם",
      1500,
      "אולי זה מקרי… ואולי לא",
      1500,
      "בכל מקרה, ברוך הבא!",
      1500,
      "אני אנצל את ההזדמנות",
      1500,
      "להגיד לך שאני לא רע במה שאני עושה",
      1500,
      "ולפעמים זה אפילו עובד",
      1500,
    ]
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

  const nameContainerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    setAnimationKey(prevKey => prevKey + 1);
  }, [language]);

  useEffect(() => {
    if (nameChars.length === 0) return;

    const handleMouseMove = (event: MouseEvent) => {
      if (nameContainerRef.current) {
        const rect = nameContainerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = event.clientX - centerX;
        const distanceY = event.clientY - centerY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        const maxDistance = 200;

        if (distance < maxDistance) {
          const intensity = 1 - (distance / maxDistance);

          const newPositions = nameChars.map((_, index) => {
            const charOffset = index - (nameChars.length - 1) / 2;
            const angleOffset = (charOffset * Math.PI / 4) + (Math.PI / 2);

            return {
              x: intensity * (Math.sin(angleOffset) * 20 + distanceX * 0.05),
              y: intensity * (Math.cos(angleOffset) * 20 + distanceY * 0.05),
              rotate: intensity * charOffset * 5
            };
          });

          setCharPositions(newPositions);
          controls.start({ scale: 1 + intensity * 0.1 });
        } else {
          setCharPositions(nameChars.map(() => ({ x: 0, y: 0, rotate: 0 })));
          controls.start({ scale: 1 });
        }
      }
    };

    const handleMouseLeave = () => {
      setCharPositions(nameChars.map(() => ({ x: 0, y: 0, rotate: 0 })));
      controls.start({ scale: 1 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [nameChars, controls]);

  const currentTypingSequence = typingSequences[language];

  return (
    <section 
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 py-10 md:py-16 overflow-hidden"  // Reduced vertical padding
    >
      <div className="absolute inset-0 bg-gradient-animated" />
      
      <motion.div 
        className="max-w-3xl mx-auto z-10 mt-[-2rem] md:mt-[-4rem]"  // Lift content upwards
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <ScrollReveal>
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
            variants={itemVariants}
          >
            {language === "en" ? "Hi, I'm " : "היי, אני "}
            <motion.div
              ref={nameContainerRef}
              animate={controls}
              className="relative inline-flex origin-center"
            >
              {nameChars.map((char, index) => {
                const position = charPositions[index] || { x: 0, y: 0, rotate: 0 };
                
                return (
                  <motion.span
                    key={index}
                    className="inline-block text-purple-600"
                    style={{ 
                      color: '#7a3df4',
                      opacity: 1,
                      visibility: 'visible',
                      textShadow: '0 0 1px rgba(122, 61, 244, 0.3)'
                    }}
                    animate={{
                      x: position.x,
                      y: position.y,
                      rotate: position.rotate,
                      transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 10
                      }
                    }}
                    whileHover={{
                      scale: 1.2,
                      transition: { duration: 0.2 }
                    }}
                  >
                    {char}
                  </motion.span>
                );
              })}
            </motion.div>
          </motion.h1>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <motion.div 
            className="text-2xl md:text-3xl font-medium mb-8 min-h-[8em] flex items-center justify-center"
            variants={itemVariants}
          >
            <TypeAnimation
              key={animationKey}
              sequence={currentTypingSequence}
              wrapper="div"
              speed={50}
              repeat={Infinity}
              cursor={true}
              className="inline-block max-w-full mx-auto"
              style={{ 
                display: 'block', 
                textAlign: isRtl ? 'right' : 'left',
                direction: isRtl ? 'rtl' : 'ltr',
              }}
            />
          </motion.div>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <motion.p 
            className="text-xl md:text-2xl text-gray-700 mb-6 gradient-text-shadow"
            variants={itemVariants}
          >
            {currentText.hero.tagline}
          </motion.p>
        </ScrollReveal>

        <ScrollReveal delay={0.6}>
          <HorizontalSocialIcons translations={currentText.social} />
        </ScrollReveal>

        <ScrollReveal delay={0.8}>
          <motion.div 
            className="flex flex-wrap gap-4 justify-center mt-12 hero-buttons-container"
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
        </ScrollReveal>
      </motion.div>

      <motion.div 
        className="absolute bottom-16 w-full flex justify-center"  // Increased bottom space
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
