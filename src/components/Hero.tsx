
import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-scroll";
import { TypeAnimation } from "react-type-animation";
import { motion, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import HorizontalSocialIcons from "./HorizontalSocialIcons";
import ScrollReveal from "./ScrollReveal";
import { ChevronDown } from "lucide-react";
import ReactiveHeading from "./ReactiveHeading";

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
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    setAnimationKey(prevKey => prevKey + 1);
  }, [language]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

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

  const currentTypingSequence = typingSequences[language];

  return (
    <div 
      className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 py-10 md:py-16 overflow-hidden bg-deep-black"
    >      
      
      <motion.div 
        className="max-w-3xl mx-auto z-10 mt-[-6rem] md:mt-[-8rem]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <ScrollReveal>
          <ReactiveHeading 
            text={currentText.hero.greeting}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-almost-white tracking-wide"
            isRtl={isRtl}
          />
        </ScrollReveal>

        <ScrollReveal>
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
              className="inline-block max-w-full mx-auto text-almost-white"
              style={{ 
                display: 'block', 
                textAlign: isRtl ? 'right' : 'left',
                direction: isRtl ? 'rtl' : 'ltr',
              }}
            />
          </motion.div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <motion.p 
            className="text-xl md:text-2xl text-light-gray mb-8 max-w-2xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            {currentText.hero.tagline}
          </motion.p>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <HorizontalSocialIcons translations={currentText.social} />
        </ScrollReveal>

        <ScrollReveal delay={0.5}>
          <motion.div 
            className="flex flex-wrap gap-4 justify-center mt-12 hero-buttons-container"
            variants={itemVariants}
          >
            <Link to="projects" smooth={true} duration={800} offset={-50}>
              <Button className="mono-button">
                {currentText.hero.cta}
              </Button>
            </Link>
            <a href="https://drive.google.com/uc?export=download&id=1v8KM36DgGQztTmocsPp7my0xNSSJxaOw" target="_blank" rel="noopener noreferrer">
              <Button 
                variant="outline" 
                className="mono-button"
              >
                {currentText.hero.downloadResume}
              </Button>
            </a>
          </motion.div>
        </ScrollReveal>
      </motion.div>

      <motion.div 
        className="absolute bottom-12 w-full flex justify-center z-20"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <Link to="projects" smooth={true} duration={800} offset={-50}>
          <motion.div 
            className="cursor-pointer text-light-gray hover:text-almost-white p-3 transition-colors"
            whileHover={{ y: 3 }}
          >
            <ChevronDown className="h-8 w-8" />
          </motion.div>
        </Link>
      </motion.div>
    </div>
  );
};

export default Hero;
