import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-scroll";
import ProfessionalHero from "@/components/ProfessionalHero";
import ProfessionalProjects from "@/components/ProfessionalProjects";
import ProfessionalContact from "@/components/ProfessionalContact";
import VerticalTimeline from "@/components/VerticalTimeline";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import GravityField from "@/components/GravityField";

const Index = () => {
  const [language, setLanguage] = useState<"en" | "he">("en");
  const [scrollPosition, setScrollPosition] = useState(0);
  const { toast } = useToast();

  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === "en" ? "he" : "en");
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 500);
    
    return () => clearTimeout(timer);
  }, [language]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const content = {
    en: {
      hero: {
        greeting: "Hi, I'm Ori",
        tagline: "A computer science student seeking every opportunity to learn, build, improve, and grow.",
        cta: "See My Work",
        downloadResume: "Download Resume"
      },
      about: {
        title: "About Me",
        bio: "I'm a frontend developer who loves building sleek, fast UIs with clean code. When I'm not debugging, you'll find me experimenting with new JavaScript frameworks or optimizing load times. My code is as clean as my desk is messy, and I believe the best interfaces are the ones users don't even notice they're using.",
        downloadCv: "Download CV",
        showAll: "Show All"
      },
      projects: {
        title: "My Project",
        viewProject: "View Live",
        viewCode: "View Code"
      },
      skills: {
        title: "Tech Stack"
      },
      contact: {
        title: "Let's build something amazing together",
        cta: "Have a project in mind? Let's talk about bringing it to life with code.",
        name: "Name",
        email: "Email",
        message: "Message",
        submit: "Send Message"
      },
      social: {
        linkedin: "LinkedIn",
        instagram: "Instagram",
        whatsapp: "WhatsApp",
        upwork: "Upwork",
        phone: "Phone",
        resume: "Resume"
      },
      footer: {
        message: "Built with React & Framer Motion by Ori Asher",
        copyright: "© 2025 Ori Asher. All rights reserved."
      },
      myProjects: {
        title: "My Future Projects",
        description: "A glimpse into innovative projects I'm developing. Cutting-edge ideas in progress!",
        comingSoon: "Explore Projects"
      }
    },
    he: {
      hero: {
        greeting: "היי, אני אורי",
        tagline: "סטודנט למדעי המחשב שמחפש כל הזדמנות ללמוד, לבנות, לשפר ולהשתפר.",
        cta: "ראה את העבודות שלי",
        downloadResume: "הורד קורות חיים"
      },
      about: {
        title: "קצת עלי",
        bio: "אני סטודנט למדעי המחשב במכללת ספיר, ומפתח פרונטאנד בתחילת הדרך. אני עדיין לומד, עדיין מתנסה, אבל עם רצון ברור לבנות דברים שעובדים באמת – גם טכנית, גם אנושית. הקוד שאני כותב משתפר משורה לשורה, ואני משתדל לשמור על ראש פתוח וסטנדרטים גבוהים. יש לי הרבה מה ללמוד, אבל גם לא מעט מה להציע עכשיו.",
        downloadCv: "הורד קו״ח",
        showAll: "הצג הכל"
      },
      projects: {
        title: "הפרויקט שלי",
        viewProject: "צפה בחי",
        viewCode: "צפה בקוד"
      },
      skills: {
        title: "טכנולוגיות"
      },
      contact: {
        title: "בואו נבנה משהו מדהים ביחד",
        cta: "יש לך פרויקט בראש? בוא נדבר על איך להפוך אותו למציאות עם קוד.",
        name: "שם",
        email: "אימייל",
        message: "הודעה",
        submit: "שלח הודעה"
      },
      social: {
        linkedin: "לינקדאין",
        instagram: "אינסטגרם",
        whatsapp: "וואטסאפ",
        upwork: "אפוורק",
        phone: "טלפון",
        resume: "קו״ח"
      },
      footer: {
        message: "נבנה עם React ו־Framer Motion על ידי אורי אשר",
        copyright: "© 2025 אורי אשר. כל הזכויות שמורות."
      },
      myProjects: {
        title: "הפרויקטים העתידיים שלי",
        description: "הצצה לפרויקטים חדשניים שאני מפתח. רעיונות מתקדמים בתהליך!",
        comingSoon: "גלה פרויקטים"
      }
    }
  };

  const currentText = content[language];
  const isRtl = language === "he";

  return (
    <div 
      dir={isRtl ? "rtl" : "ltr"} 
      className={`min-h-screen bg-deep-black overflow-x-hidden relative ${isRtl ? "font-assistant" : "font-poppins"}`}
      style={{ fontFamily: isRtl ? "'Assistant', sans-serif" : "'Poppins', sans-serif" }}
    >
      <GravityField />
      <div className={`fixed top-4 ${isRtl ? "left-4" : "right-4"} z-30`}>
        <Button 
          onClick={toggleLanguage}
          variant="outline" 
          className="bg-soft-black border-dark-gray text-light-gray hover:bg-dark-gray hover:text-almost-white transition-all duration-300"
        >
          {language === "en" ? "עברית" : "English"}
        </Button>
      </div>
      
      <VerticalTimeline language={language} isRtl={isRtl} />

      <ProfessionalHero 
        language={language} 
        currentText={currentText} 
        isRtl={isRtl} 
      />

      <Separator className="border-dark-gray/30 relative z-10" />

      <ProfessionalProjects 
        language={language} 
        currentText={currentText} 
        isRtl={isRtl} 
      />

      <Separator className="border-dark-gray/30 relative z-10" />

      <ProfessionalContact 
        language={language} 
        currentText={currentText} 
        isRtl={isRtl} 
      />

      <Separator className="border-dark-gray/30 relative z-10" />

      <footer className="py-12 px-6 bg-deep-black text-light-gray text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-light-gray to-transparent mx-auto mb-6"></div>
          <p className="mb-2 text-lg">{currentText.footer.message}</p>
          <p className="text-light-gray/60">{currentText.footer.copyright}</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
