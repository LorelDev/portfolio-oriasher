
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-scroll";
import Hero from "@/components/Hero";
import HorizontalSocialIcons from "@/components/HorizontalSocialIcons";
import { Send, FileText, Package } from "lucide-react";
import VerticalTimeline from "@/components/VerticalTimeline";
import ScrollReveal from "@/components/ScrollReveal";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  const [language, setLanguage] = useState<"en" | "he">("en");
  const [scrollPosition, setScrollPosition] = useState(0);

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
        downloadCv: "Download CV"
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
        bio: "אני סטודנט למדעי המחשב במכללת ספיר, ומפתח פרונטאנד בתחילת הדרך. אני עדיין לומד, עדיין מתנסה, אבל עם רצון ברור לבנות דברים שעובדים באמת – גם טכנית, גם אנושית. הקוד שאני כותב משתפר משורה לשורה, ואני משתדל לשמור על ראש פתוח וסטנדרטים גבוהים. יש לי הרבה מה ללמוד, אבל גם לא מעט מה להציע כבר עכשיו.",
        downloadCv: "הורד קו״ח"
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

  return (
    <div 
      dir={isRtl ? "rtl" : "ltr"} 
      className={`min-h-screen bg-deep-black ${isRtl ? "font-assistant" : "font-poppins"}`}
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

      <Separator className="border-dark-gray" />

      <section className="mono-section px-4 relative" id="about">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-medium mb-12 text-center tracking-wide">
              {currentText.about.title}
            </h2>
          </ScrollReveal>
          
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <ScrollReveal direction="right" className="w-full md:w-1/3">
              <div className="relative overflow-hidden">
                <img 
                  src="/lovable-uploads/22a4f7cb-fbc2-4f89-a11d-b9f00b04e073.png" 
                  alt="Ori Asher" 
                  className="aspect-square object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 border border-dark-gray pointer-events-none"></div>
              </div>
            </ScrollReveal>
            <div className="w-full md:w-2/3">
              <ScrollReveal direction="left">
                <p className="text-lg mb-6 text-light-gray leading-relaxed max-content-width">
                  {currentText.about.bio}
                </p>
              </ScrollReveal>
              <ScrollReveal direction="left" delay={0.2}>
                <a href="https://drive.google.com/uc?export=download&id=1v8KM36DgGQztTmocsPp7my0xNSSJxaOw" target="_blank" rel="noopener noreferrer">
                  <Button className="mono-button">
                    {currentText.about.downloadCv}
                  </Button>
                </a>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <Separator className="border-dark-gray" />

      <section className="mono-section px-4 relative" id="contact">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-medium mb-4 text-center tracking-wide">
              {currentText.contact.title}
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <p className="text-xl text-center mb-8 text-light-gray max-content-width mx-auto">
              {currentText.contact.cta}
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={0.3} className="flex justify-center mb-8">
            <div className="p-4">
              <HorizontalSocialIcons translations={currentText.social} />
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.4} className="max-w-md mx-auto">
            <form className="space-y-6">
              <input 
                type="text" 
                placeholder={currentText.contact.name} 
                className="w-full p-3 mono-input" 
              />
              <input 
                type="email" 
                placeholder={currentText.contact.email} 
                className="w-full p-3 mono-input" 
              />
              <textarea 
                rows={4} 
                placeholder={currentText.contact.message} 
                className="w-full p-3 mono-input resize-none"
              ></textarea>
              <Button 
                type="submit" 
                className="mono-button w-full flex items-center justify-center gap-2 group"
              >
                {currentText.contact.submit}
                <Send className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>
            </form>
            <div className="mt-8 flex justify-center">
              <a href="https://drive.google.com/uc?export=download&id=1v8KM36DgGQztTmocsPp7my0xNSSJxaOw" target="_blank" rel="noopener noreferrer">
                <Button 
                  className="mono-button flex items-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  {currentText.about.downloadCv}
                </Button>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Separator className="border-dark-gray" />

      <footer className="py-8 px-4 bg-deep-black text-light-gray text-center">
        <ScrollReveal direction="up">
          <p className="mb-2">{currentText.footer.message}</p>
          <p>{currentText.footer.copyright}</p>
        </ScrollReveal>
      </footer>
    </div>
  );
};

export default Index;
