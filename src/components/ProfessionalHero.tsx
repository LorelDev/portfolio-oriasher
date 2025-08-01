import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail, Phone } from "lucide-react";
import { Link } from "react-scroll";

interface ProfessionalHeroProps {
  language: "en" | "he";
  currentText: any;
  isRtl: boolean;
}

const ProfessionalHero: React.FC<ProfessionalHeroProps> = ({ language, currentText, isRtl }) => {
  return (
    <section className="min-h-screen flex items-center justify-center relative z-10 px-6" id="hero">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main greeting */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-5xl md:text-7xl font-light tracking-wider text-almost-white mb-4">
            {currentText.hero.greeting}
          </h1>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-light-gray to-transparent mx-auto"></div>
        </motion.div>

        {/* Professional title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-xl md:text-2xl font-light text-light-gray tracking-wide uppercase">
            Computer Science Student
          </h2>
          <h3 className="text-lg md:text-xl font-light text-light-gray/80 mt-2">
            Frontend Developer
          </h3>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl leading-relaxed mb-12 text-light-gray max-w-2xl mx-auto"
        >
          {currentText.hero.tagline}
        </motion.p>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <Link to="projects" smooth={true} duration={800}>
            <Button 
              className="bg-almost-white text-deep-black hover:bg-light-gray transition-all duration-300 px-8 py-3 text-lg font-medium"
            >
              {currentText.hero.cta}
            </Button>
          </Link>
          
          <a 
            href="https://drive.google.com/uc?export=download&id=1v8KM36DgGQztTmocsPp7my0xNSSJxaOw" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button 
              variant="outline" 
              className="border-light-gray text-light-gray hover:bg-light-gray hover:text-deep-black transition-all duration-300 px-8 py-3 text-lg"
            >
              {currentText.hero.downloadResume}
            </Button>
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex justify-center gap-6 mb-16"
        >
          <a href="https://github.com/oriasher" className="text-light-gray hover:text-almost-white transition-colors">
            <Github size={24} />
          </a>
          <a href="https://www.linkedin.com/in/ori-asher-a9b542320/" className="text-light-gray hover:text-almost-white transition-colors">
            <Linkedin size={24} />
          </a>
          <a href="mailto:oriasher135@gmail.com" className="text-light-gray hover:text-almost-white transition-colors">
            <Mail size={24} />
          </a>
          <a href="tel:+972526770092" className="text-light-gray hover:text-almost-white transition-colors">
            <Phone size={24} />
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
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