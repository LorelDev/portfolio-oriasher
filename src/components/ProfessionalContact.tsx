import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, Phone, Github, Linkedin, MapPin, FileText, Instagram } from "lucide-react";

interface ProfessionalContactProps {
  language: "en" | "he";
  currentText: any;
  isRtl: boolean;
}

const ProfessionalContact: React.FC<ProfessionalContactProps> = ({ language, currentText, isRtl }) => {
  const contactMethods = [
    {
      icon: Mail,
      label: currentText.contact.emailLabel,
      value: "ori.asher@outlook.com",
      href: "mailto:ori.asher@outlook.com"
    },
    {
      icon: Phone,
      label: currentText.contact.phoneLabel,
      value: "055-228-5564",
      href: "tel:0552285564"
    },
    {
      icon: MapPin,
      label: currentText.contact.locationLabel,
      value: "ישראל, שדרות",
      href: null
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/oriasher"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/ori-asher-a9b542320/"
    },
    {
      icon: Instagram,
      label: "Instagram",
      href: "https://www.instagram.com/ori.asher/?igsh=dDIzOTg4MWdyMjc4&utm_source=qr#"
    }
  ];

  return (
    <section className="py-20 px-6 relative z-10" id="contact">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light tracking-wider text-almost-white mb-6">
            {currentText.contact.title}
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-light-gray to-transparent mx-auto mb-6"></div>
          <p className="text-xl text-light-gray max-w-2xl mx-auto leading-relaxed">
            {currentText.contact.cta}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Contact methods */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="bg-soft-black border-dark-gray p-8 h-full">
              <h3 className="text-2xl font-medium text-almost-white mb-8">{currentText.contact.getInTouch}</h3>
              <div className="space-y-6">
                {contactMethods.map((method, index) => (
                  <motion.div
                    key={method.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-12 h-12 bg-dark-gray rounded-lg flex items-center justify-center">
                      <method.icon size={20} className="text-light-gray" />
                    </div>
                    <div>
                      <p className="text-light-gray text-sm">{method.label}</p>
                      {method.href ? (
                        <a 
                          href={method.href}
                          className="text-almost-white hover:text-light-gray transition-colors"
                        >
                          {method.value}
                        </a>
                      ) : (
                        <p className="text-almost-white">{method.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Social & Resume */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <Card className="bg-soft-black border-dark-gray p-8">
              <h3 className="text-2xl font-medium text-almost-white mb-8">{language === "en" ? "Connect with me on LinkedIn!" : "תתחברו איתי בלינקדאין!"}</h3>
              <a
                href="https://www.linkedin.com/in/ori-asher-a9b542320/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-4 p-6 bg-gradient-to-r from-blue-600/20 to-blue-500/20 hover:from-blue-600/30 hover:to-blue-500/30 rounded-lg transition-all duration-300 group border border-blue-500/20 hover:border-blue-500/40"
              >
                <Linkedin size={24} className="text-blue-400 group-hover:text-blue-300 transition-colors" />
                <span className="text-almost-white group-hover:text-blue-100 transition-colors text-lg font-medium">
                  LinkedIn
                </span>
              </a>
            </Card>

            <Card className="bg-soft-black border-dark-gray p-8">
              <h3 className="text-2xl font-medium text-almost-white mb-6">{currentText.contact.resume}</h3>
              <p className="text-light-gray mb-6">
                {currentText.contact.resumeDescription}
              </p>
              <p className="text-sm text-light-gray/70 mb-4">
                {language === "he" ? "* קורות חיים בעברית. לקורות חיים באנגלית, שנה את השפה של האתר לאנגלית" : "* Resume in English. For Hebrew resume, change the website language to Hebrew"}
              </p>
              <a 
                href={language === "en" ? "https://drive.google.com/uc?export=download&id=1cZPVm3bj3a_8uxTcrtRHf9kizREiJzCK" : "https://drive.google.com/uc?export=download&id=1rJpHd05DTIHSJSl7FGuhxJRBaxIcaocQ"} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button className="w-full bg-almost-white text-deep-black hover:bg-light-gray transition-all duration-300">
                  <FileText size={16} className="mr-2" />
                  {currentText.about?.downloadCv || "הורד קורות חיים"}{language === "he" ? " (עברית)" : ""}
                </Button>
              </a>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalContact;