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
          className="flex justify-center"
        >

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