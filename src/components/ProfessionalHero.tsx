import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail, Phone, Instagram } from "lucide-react";
import { Link } from "react-scroll";

interface ProfessionalHeroProps {
  language: "en" | "he";
  currentText: any;
  isRtl: boolean;
}

const ProfessionalHero: React.FC<ProfessionalHeroProps> = ({ language, currentText, isRtl }) => {
  return (
    <section className="min-h-[100dvh] flex items-center justify-center relative z-10 px-6" id="hero">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Profile Image - Mobile: Top, Desktop: Left */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="order-1 lg:order-1 flex justify-center"
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-lg"></div>
              <img 
                src="/lovable-uploads/c978d951-d4f9-40eb-bf98-966b69180143.png"
                alt="Ori Asher"
                className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-80 lg:h-80 xl:w-96 xl:h-96 object-cover rounded-full border-2 border-light-gray/20"
              />
            </div>
          </motion.div>

          {/* Content */}
          <div className="order-2 lg:order-2 text-center lg:text-left">
            {/* Main greeting */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-8"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-wider text-almost-white mb-4">
                {currentText.hero.greeting}
              </h1>
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-light-gray to-transparent mx-auto lg:mx-0"></div>
            </motion.div>

            {/* Professional title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-8"
            >
              <h2 className="text-xl md:text-2xl font-light text-light-gray tracking-wide uppercase">
                {currentText.hero.title}
              </h2>
              <h3 className="text-lg md:text-xl font-light text-light-gray/80 mt-2">
                {currentText.hero.subtitle}
              </h3>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-lg md:text-xl leading-relaxed mb-12 text-light-gray max-w-2xl mx-auto lg:mx-0"
            >
              {currentText.hero.tagline}
            </motion.p>

            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-12"
            >
              <Link to="projects" smooth={true} duration={800}>
                <Button 
                  className="bg-almost-white text-deep-black hover:bg-light-gray transition-all duration-300 px-8 py-3 text-lg font-medium"
                >
                  {currentText.hero.cta}
                </Button>
              </Link>
              
              <a 
                href={language === "en" ? "https://drive.google.com/uc?export=download&id=1cZPVm3bj3a_8uxTcrtRHf9kizREiJzCK" : "https://drive.google.com/uc?export=download&id=1rJpHd05DTIHSJSl7FGuhxJRBaxIcaocQ"} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button 
                  variant="outline" 
                  className="border-light-gray text-light-gray hover:bg-light-gray hover:text-deep-black transition-all duration-300 px-8 py-3 text-lg"
                >
                  {currentText.hero.downloadResume}{language === "he" ? " (עברית)" : ""}
                </Button>
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex justify-center lg:justify-start gap-6"
            >
              <a href="https://github.com/oriasher" className="text-light-gray hover:text-almost-white transition-colors">
                <Github size={24} />
              </a>
              <a href="https://www.linkedin.com/in/ori-asher-a9b542320/" className="text-light-gray hover:text-almost-white transition-colors">
                <Linkedin size={24} />
              </a>
              <a href="https://www.instagram.com/ori.asher/?igsh=dDIzOTg4MWdyMjc4&utm_source=qr#" className="text-light-gray hover:text-almost-white transition-colors">
                <Instagram size={24} />
              </a>
              <a href="mailto:ori.asher@outlook.com" className="text-light-gray hover:text-almost-white transition-colors">
                <Mail size={24} />
              </a>
              <a href="tel:0552285564" className="text-light-gray hover:text-almost-white transition-colors">
                <Phone size={24} />
              </a>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
        >
          <Link to="projects" smooth={true} duration={800}>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="cursor-pointer text-light-gray hover:text-almost-white transition-colors"
            >
              <ArrowDown size={24} />
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProfessionalHero;