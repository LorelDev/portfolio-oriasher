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
    <section className="py-8 md:py-20 px-6 relative z-10" id="projects">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-light tracking-wider text-almost-white mb-3 md:mb-6">
            {currentText.myProjects.title}
          </h2>
          <div className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent via-light-gray to-transparent mx-auto mb-3 md:mb-6"></div>
          <p className="text-sm md:text-xl text-light-gray max-w-2xl mx-auto leading-relaxed">
            {currentText.myProjects.description}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex justify-center max-w-2xl mx-auto"
        >

          {/* Single coming soon card - App Store Project */}
          <motion.div variants={itemVariants} className="w-full">
            <Card className="bg-soft-black border-dark-gray hover:border-light-gray/30 transition-all duration-300 overflow-hidden">
              <div className="relative h-40 md:h-64 lg:h-72">
                <img
                  src="/lovable-uploads/e6b68a56-c5e3-424c-a0b9-17127ad1b417.png"
                  alt="App Stores"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 hover:bg-black/20 transition-all duration-300"></div>
              </div>
              <div className="p-4 md:p-8">
                <h4 className="text-lg md:text-2xl font-medium text-almost-white mb-2 md:mb-4">
                  {language === "he" ? "אפליקציה לימודית" : "Educational App"}
                </h4>
                <p className="text-light-gray text-sm md:text-base mb-4 md:mb-6 leading-relaxed">
                  {language === "he" 
                    ? "אפליקציה שתושק בחנויות האפליקציות"
                    : "App that will be launched on app stores"
                  }
                </p>
                <Button 
                  size="default"
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