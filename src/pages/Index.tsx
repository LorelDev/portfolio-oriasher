import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-scroll";
import Hero from "@/components/Hero";
import HorizontalSocialIcons from "@/components/HorizontalSocialIcons";
import { FileText, Package } from "lucide-react";
import VerticalTimeline from "@/components/VerticalTimeline";
import ScrollReveal from "@/components/ScrollReveal";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import ScrollingBio from "@/components/ScrollingBio";
import ConversationalContactForm from "@/components/ConversationalContactForm";

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

  const enBioContent = [
    {
      text: "I'm a computer science student at Sapir College.",
      imagePath: "/lovable-uploads/21764655-ea01-4fdb-aea6-0c4f7ab27e66.png"
    },
    {
      text: "Still learning. Still experimenting.",
      imagePath: "/lovable-uploads/21764655-ea01-4fdb-aea6-0c4f7ab27e66.png"
    },
    {
      text: "But always trying to build things that work — both technically and emotionally.",
      imagePath: "/lovable-uploads/21764655-ea01-4fdb-aea6-0c4f7ab27e66.png"
    },
    {
      text: "Every line of code I write teaches me something new.",
      imagePath: "/lovable-uploads/21764655-ea01-4fdb-aea6-0c4f7ab27e66.png"
    },
    {
      text: "And I believe I already have a lot to offer.",
      imagePath: "/lovable-uploads/21764655-ea01-4fdb-aea6-0c4f7ab27e66.png"
    }
  ];
  
  const heBioContent = [
    {
      text: "אני סטודנט למדעי המחשב במכללת ספיר.",
      imagePath: "/lovable-uploads/1f4db796-1fa1-4727-8fb8-1860d579e610.png"
    },
    {
      text: "עדיין לומד. עדיין מתנסה.",
      imagePath: "/lovable-uploads/1f4db796-1fa1-4727-8fb8-1860d579e610.png"
    },
    {
      text: "אבל תמיד מנסה לבנות דברים שעובדים — גם טכנית, גם רגשית.",
      imagePath: "/lovable-uploads/1f4db796-1fa1-4727-8fb8-1860d579e610.png"
    },
    {
      text: "כל שורת קוד שאני כותב מלמדת אותי משהו חדש.",
      imagePath: "/lovable-uploads/1f4db796-1fa1-4727-8fb8-1860d579e610.png"
    },
    {
      text: "ואני מאמין שיש לי כבר הרבה מה להציע.",
      imagePath: "/lovable-uploads/1f4db796-1fa1-4727-8fb8-1860d579e610.png"
    }
  ];

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
      myApp: {
        title: "My Future Application",
        description: "A glimpse into an innovative project I'm developing. Stay tuned for details!",
        comingSoon: "Coming Soon"
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
      myApp: {
        title: "האפליקציה העתידית שלי",
        description: "הצצה לפרויקט חדשני שאני מפתח. המשך יבוא!",
        comingSoon: "בקרוב"
      }
    }
  };

  const currentText = content[language];
  const isRtl = language === "he";
  const currentBioContent = language === "en" ? enBioContent : heBioContent;

  return (
    <div 
      dir={isRtl ? "rtl" : "ltr"} 
      className={`min-h-screen bg-deep-black overflow-x-hidden ${isRtl ? "font-assistant" : "font-poppins"}`}
      style={{ fontFamily: isRtl ? "'Assistant', sans-serif" : "'Poppins', sans-serif" }}
    >
      <div className={`fixed top-4 ${isRtl ? "left-4" : "right-4"} z-30`}>
        <Button 
          onClick={toggleLanguage}
          variant="outline" 
          className="mono-button rounded-none"
        >
          {language === "en" ? "עברית" : "English"}
        </Button>
      </div>
      
      <VerticalTimeline language={language} isRtl={isRtl} />

      <Hero 
        language={language} 
        currentText={currentText} 
        isRtl={isRtl} 
      />

      <section className="mono-section px-4 z-10 relative" id="projects">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-medium mb-12 text-center tracking-wide">
              {currentText.myApp.title}
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <div className="flex justify-center">
              <Card className="mono-card overflow-hidden transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.03)] max-w-4xl w-full rounded-none">
                <div className="relative h-[300px] md:h-[400px] bg-soft-black flex items-center justify-center">
                  <div className="relative z-10 text-center px-6">
                    <ScrollReveal direction="down" delay={0.3}>
                      <Package size={64} className="mx-auto mb-4 text-light-gray" />
                    </ScrollReveal>
                    <ScrollReveal delay={0.4}>
                      <h3 className="text-2xl md:text-3xl font-medium mb-4 text-almost-white tracking-wide">
                        {currentText.myApp.title}
                      </h3>
                    </ScrollReveal>
                    <ScrollReveal delay={0.5}>
                      <p className="text-lg md:text-xl mb-6 text-light-gray max-content-width">
                        {currentText.myApp.description}
                      </p>
                    </ScrollReveal>
                    <ScrollReveal delay={0.6}>
                      <Button 
                        className="mono-button"
                        onClick={() => {
                          toast({
                            title: isRtl ? "בקרוב!" : "Coming Soon!",
                            description: isRtl ? "עדיין עובדים על זה..." : "We're still working on it...",
                          });
                        }}
                      >
                        {currentText.myApp.comingSoon}
                        <Package className="h-4 w-4 ml-2" />
                      </Button>
                    </ScrollReveal>
                  </div>
                </div>
              </Card>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Separator className="border-dark-gray relative z-10" />

      <ScrollingBio 
        bioContent={currentBioContent}
        language={language}
        isRtl={isRtl}
        title={currentText.about.title}
      />

      <Separator className="border-dark-gray relative z-10" />

      <section className="mono-section px-4 relative z-10" id="contact">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-medium mb-4 text-center tracking-wide">
              {currentText.contact.title}
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <p className="text-xl text-center mb-12 text-light-gray max-content-width mx-auto">
              {currentText.contact.cta}
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={0.3}>
            <ConversationalContactForm isRtl={isRtl} currentText={currentText} />
          </ScrollReveal>
          
          <ScrollReveal delay={0.4} className="mt-12 flex justify-center">
            <div className="p-4">
              <HorizontalSocialIcons translations={currentText.social} />
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.5} className="mt-8 flex justify-center">
            <a href="https://drive.google.com/uc?export=download&id=1v8KM36DgGQztTmocsPp7my0xNSSJxaOw" target="_blank" rel="noopener noreferrer">
              <Button 
                className="mono-button flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                {currentText.about.downloadCv}
              </Button>
            </a>
          </ScrollReveal>
        </div>
      </section>

      <Separator className="border-dark-gray relative z-10" />

      <footer className="py-8 px-4 bg-deep-black text-light-gray text-center relative z-10">
        <ScrollReveal direction="up">
          <p className="mb-2">{currentText.footer.message}</p>
          <p>{currentText.footer.copyright}</p>
        </ScrollReveal>
      </footer>
    </div>
  );
};

export default Index;
