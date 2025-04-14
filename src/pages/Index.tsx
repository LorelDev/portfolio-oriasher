import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-scroll";
import Hero from "@/components/Hero";
import HorizontalSocialIcons from "@/components/HorizontalSocialIcons";
import { Send, FileText, Package } from "lucide-react";
import VerticalTimeline from "@/components/VerticalTimeline";
import ScrollGradientBackground from "@/components/ScrollGradientBackground";
import ScrollReveal from "@/components/ScrollReveal";

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

  const bgOpacity = Math.min(scrollPosition / 1000, 0.2);

  return (
    <div 
      dir={isRtl ? "rtl" : "ltr"} 
      className={`min-h-screen ${isRtl ? "font-assistant" : "font-poppins"}`}
      style={{ fontFamily: isRtl ? "'Assistant', sans-serif" : "'Poppins', sans-serif" }}
    >
      <ScrollGradientBackground />
      
      <div className={`fixed top-4 ${isRtl ? "left-4" : "right-4"} z-30`}>
        <Button 
          onClick={toggleLanguage}
          variant="outline" 
          className="rounded-full px-4 py-2 bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-300 hover:shadow-md"
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

      <div 
        className="fixed inset-0 bg-white pointer-events-none z-0" 
        style={{ opacity: bgOpacity }}
      />

      <section className="py-20 px-4 bg-white relative z-10" id="projects">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              {currentText.myApp.title}
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <div className="flex justify-center">
              <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:scale-[1.02] max-w-4xl w-full">
                <div className="relative h-[300px] md:h-[400px] bg-gradient-to-r from-purple-400 to-indigo-500 flex items-center justify-center">
                  <div className="absolute inset-0 opacity-20 bg-cover bg-center" style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1498050108023-c5249f4df085')"
                  }}></div>
                  <div className="relative z-10 text-white text-center px-6">
                    <ScrollReveal direction="down" delay={0.3}>
                      <Package size={64} className="mx-auto mb-4 text-white/80" />
                    </ScrollReveal>
                    <ScrollReveal delay={0.4}>
                      <h3 className="text-2xl md:text-3xl font-bold mb-4">
                        {currentText.myApp.title}
                      </h3>
                    </ScrollReveal>
                    <ScrollReveal delay={0.5}>
                      <p className="text-lg md:text-xl mb-6 text-white/90">
                        {currentText.myApp.description}
                      </p>
                    </ScrollReveal>
                    <ScrollReveal delay={0.6}>
                      <Button 
                        variant="outline" 
                        className="bg-white/20 text-white hover:bg-white/30 transition-colors duration-300 flex items-center justify-center gap-2"
                      >
                        {currentText.myApp.comingSoon}
                        <Package className="h-4 w-4" />
                      </Button>
                    </ScrollReveal>
                  </div>
                </div>
              </Card>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50" id="about">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              {currentText.about.title}
            </h2>
          </ScrollReveal>
          
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <ScrollReveal direction="right" className="w-full md:w-1/3">
              <img 
                src="/lovable-uploads/22a4f7cb-fbc2-4f89-a11d-b9f00b04e073.png" 
                alt="Ori Asher" 
                className="aspect-square rounded-full object-cover shadow-lg hover:shadow-xl transition-shadow duration-300"
              />
            </ScrollReveal>
            <div className="w-full md:w-2/3">
              <ScrollReveal direction="left">
                <p className="text-lg mb-6">{currentText.about.bio}</p>
              </ScrollReveal>
              <ScrollReveal direction="left" delay={0.2}>
                <a href="https://drive.google.com/uc?export=download&id=1v8KM36DgGQztTmocsPp7my0xNSSJxaOw" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="hover:bg-blue-50 transition-colors duration-300">
                    {currentText.about.downloadCv}
                  </Button>
                </a>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-br from-blue-500 to-purple-600 text-white" id="contact">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
              {currentText.contact.title}
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <p className="text-xl text-center mb-8">{currentText.contact.cta}</p>
          </ScrollReveal>
          
          <ScrollReveal delay={0.3} className="flex justify-center mb-8">
            <div className="p-2 bg-white/10 backdrop-blur-sm rounded-full">
              <HorizontalSocialIcons translations={currentText.social} />
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.4} className="max-w-md mx-auto">
            <form className="space-y-4">
              <input 
                type="text" 
                placeholder={currentText.contact.name} 
                className="w-full p-3 rounded bg-white/10 border border-white/20 text-white placeholder:text-white/70" 
              />
              <input 
                type="email" 
                placeholder={currentText.contact.email} 
                className="w-full p-3 rounded bg-white/10 border border-white/20 text-white placeholder:text-white/70" 
              />
              <textarea 
                rows={4} 
                placeholder={currentText.contact.message} 
                className="w-full p-3 rounded bg-white/10 border border-white/20 text-white placeholder:text-white/70"
              ></textarea>
              <Button 
                type="submit" 
                className="w-full bg-white text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-300 group flex items-center justify-center gap-2"
              >
                {currentText.contact.submit}
                <Send className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>
            </form>
            <div className="mt-8 flex justify-center">
              <a href="https://drive.google.com/uc?export=download&id=1v8KM36DgGQztTmocsPp7my0xNSSJxaOw" target="_blank" rel="noopener noreferrer">
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10 transition-colors duration-300 flex items-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  {currentText.about.downloadCv}
                </Button>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <footer className="py-8 px-4 bg-gray-900 text-gray-400 text-center">
        <ScrollReveal direction="up">
          <p className="mb-2">{currentText.footer.message}</p>
          <p>{currentText.footer.copyright}</p>
        </ScrollReveal>
      </footer>
    </div>
  );
};

export default Index;
