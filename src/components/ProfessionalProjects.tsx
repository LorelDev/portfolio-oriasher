import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Code, ExternalLink, Github } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import appStoreImage from "@/assets/app-store-project.jpg";

interface ProfessionalProjectsProps {
  language: "en" | "he";
  currentText: any;
  isRtl: boolean;
}

const ProfessionalProjects: React.FC<ProfessionalProjectsProps> = ({ language, currentText, isRtl }) => {
  const { toast } = useToast();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-20 px-6 relative z-10" id="projects">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light tracking-wider text-almost-white mb-6">
            {currentText.myProjects.title}
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-light-gray to-transparent mx-auto mb-6"></div>
          <p className="text-xl text-light-gray max-w-2xl mx-auto leading-relaxed">
            {currentText.myProjects.description}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {/* Main project card */}
          <motion.div variants={itemVariants} className="md:col-span-2">
            <Card className="bg-soft-black border-dark-gray hover:border-light-gray/30 transition-all duration-300 overflow-hidden group">
              <div className="relative h-64 md:h-80">
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20"
                  style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1461749280684-dccba630e2f6)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundBlendMode: 'overlay'
                  }}
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Code size={48} className="text-almost-white/80" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-medium text-almost-white mb-4">
                  Portfolio Website
                </h3>
                <p className="text-light-gray mb-6 leading-relaxed">
                  A modern, responsive portfolio built with React, TypeScript, and Framer Motion. 
                  Features interactive animations and mobile-optimized design.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {['React', 'TypeScript', 'Tailwind', 'Framer Motion'].map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-dark-gray text-light-gray text-sm rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-light-gray text-light-gray hover:bg-light-gray hover:text-deep-black"
                  >
                    <ExternalLink size={16} className="mr-2" />
                    Live Demo
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-light-gray text-light-gray hover:bg-light-gray hover:text-deep-black"
                  >
                    <Github size={16} className="mr-2" />
                    Code
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Single coming soon card - App Store Project */}
          <motion.div variants={itemVariants}>
            <Card className="bg-soft-black border-dark-gray hover:border-light-gray/30 transition-all duration-300 overflow-hidden">
              <div className="relative h-48">
                <img
                  src={appStoreImage}
                  alt="App Store Project"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 hover:bg-black/20 transition-all duration-300"></div>
              </div>
              <div className="p-6">
                <h4 className="text-lg font-medium text-almost-white mb-2">
                  {language === "he" ? "אפליקציה באפ סטור" : "App Store Application"}
                </h4>
                <p className="text-light-gray text-sm mb-4">
                  {language === "he" 
                    ? "אפליקציה חדשנית עם ממשק משתמש מתקדם"
                    : "Innovative app with advanced user interface"
                  }
                </p>
                <Button 
                  size="sm" 
                  variant="ghost"
                  className="text-light-gray hover:text-almost-white"
                  onClick={() => {
                    toast({
                      title: isRtl ? "בקרוב!" : "Coming Soon!",
                      description: isRtl ? "הפרויקט בפיתוח..." : "Project in development...",
                    });
                  }}
                >
                  {language === "he" ? "בקרוב" : "Coming Soon"}
                </Button>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProfessionalProjects;