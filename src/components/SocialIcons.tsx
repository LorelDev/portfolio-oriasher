
import React from "react";
import { motion } from "framer-motion";
import { 
  Linkedin, 
  Instagram, 
  Phone, 
  FileText, 
  ExternalLink 
} from "lucide-react";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";

interface SocialIconsProps {
  isRtl: boolean;
  translations: {
    linkedin: string;
    instagram: string;
    whatsapp: string;
    upwork: string;
    phone: string;
    resume: string;
  };
}

const SocialIcons = ({ isRtl, translations }: SocialIconsProps) => {
  // Animation variants for container and items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.8,
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: isRtl ? 20 : -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  // Icon and link data
  const socialLinks = [
    {
      name: translations.linkedin,
      icon: <Linkedin size={20} />,
      href: "https://www.linkedin.com/in/%D7%90%D7%95%D7%A8%D7%99-%D7%90%D7%A9%D7%A8-b88690339/",
    },
    {
      name: translations.instagram,
      icon: <Instagram size={20} />,
      href: "https://www.instagram.com/ori.asher/",
    },
    {
      name: translations.whatsapp,
      icon: (
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
          <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
          <path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
          <path d="M9.5 13.5c.5 1 1.5 1 2.5 1s2 0 2.5-1" />
        </svg>
      ),
      href: "https://wa.me/+972552285564",
    },
    {
      name: translations.upwork,
      icon: <ExternalLink size={20} />,
      href: "https://www.upwork.com/freelancers/oria3?mp_source=share",
    },
    {
      name: translations.phone,
      icon: <Phone size={20} />,
      href: "tel:+972552285564",
    },
    {
      name: translations.resume,
      icon: <FileText size={20} />,
      href: "https://drive.google.com/uc?export=download&id=1v8KM36DgGQztTmocsPp7my0xNSSJxaOw",
    },
  ];

  return (
    <TooltipProvider>
      <motion.div 
        className={`fixed flex flex-col gap-5 z-30 ${isRtl ? 'left-5' : 'right-5'} top-1/2 -translate-y-1/2`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {socialLinks.map((link) => (
          <motion.div 
            key={link.name} 
            variants={itemVariants}
            whileHover={{ scale: 1.2 }}
            className="relative"
          >
            <Tooltip delayDuration={100}>
              <TooltipTrigger asChild>
                <a 
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white hover:shadow-lg transition-all duration-200"
                >
                  {link.icon}
                </a>
              </TooltipTrigger>
              <TooltipContent 
                side={isRtl ? 'right' : 'left'}
                className="bg-gray-800 text-white text-sm"
              >
                <p>{link.name}</p>
              </TooltipContent>
            </Tooltip>
          </motion.div>
        ))}
      </motion.div>
    </TooltipProvider>
  );
};

export default SocialIcons;
