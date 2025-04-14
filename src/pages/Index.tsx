import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-scroll";
import Hero from "@/components/Hero";
import HorizontalSocialIcons from "@/components/HorizontalSocialIcons";
import { Send, FileText } from "lucide-react";

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
        tagline: "A frontend developer focused on building interactive experiences",
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
      }
    },
    he: {
      hero: {
        greeting: "היי, אני אורי",
        tagline: "מפתח פרונטאנד המתמקד בבניית חוויות אינטראקטיביות",
        cta: "ראה את העבודות שלי",
        downloadResume: "הורד קורות חיים"
      },
      about: {
        title: "קצת עלי",
        bio: "אני מפתח פרונטאנד שאוהב לבנות ממשקי משתמש מהירים ונקיים עם קוד איכותי. כשאני לא מתקן באגים, תמצאו אותי מתנסה בפריימוורקים חדשים של JavaScript או משפר זמני טעינה. הקוד שלי נקי כמו שהשולחן שלי מבולגן, ואני מאמין שהממשקים הטובים ביותר הם אלה שהמשתמשים אפילו לא מרגישים שהם משתמשים בהם.",
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
      }
    }
  };

  const currentText = content[language];
  const isRtl = language === "he";

  const bgOpacity = Math.min(scrollPosition / 500, 0.5);

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className={`min-h-screen ${isRtl ? "font-assistant" : "font-poppins"}`}>
      <div className={`fixed top-4 ${isRtl ? "left-4" : "right-4"} z-30`}>
        <Button 
          onClick={toggleLanguage}
          variant="outline" 
          className="rounded-full px-4 py-2 bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-300 hover:shadow-md"
        >
          {language === "en" ? "עברית" : "English"}
        </Button>
      </div>

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
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            {currentText.projects.title}
          </h2>
          <div className="flex justify-center">
            <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:scale-[1.02] max-w-4xl w-full">
              <div className="relative h-[300px] md:h-[400px] bg-gradient-to-r from-blue-400 to-purple-500">
                <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-medium">
                  Interactive Portfolio Project
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-2">Frontend Portfolio</h3>
                <p className="text-gray-600 mb-4">
                  A responsive, interactive developer portfolio built with modern frontend technologies.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">React</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Framer Motion</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">TypeScript</span>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">Tailwind</span>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" className="hover:bg-blue-50 transition-colors duration-300">
                    {currentText.projects.viewProject}
                  </Button>
                  <Button variant="outline" className="hover:bg-blue-50 transition-colors duration-300">
                    {currentText.projects.viewCode}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50" id="about">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            {currentText.about.title}
          </h2>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/3">
              <img 
                src="/lovable-uploads/7effd597-fcde-41dd-b9af-ed895d5dd42b.png" 
                alt="Ori Asher" 
                className="aspect-square rounded-full object-cover shadow-lg hover:shadow-xl transition-shadow duration-300"
              />
            </div>
            <div className="w-full md:w-2/3">
              <p className="text-lg mb-6">{currentText.about.bio}</p>
              <a href="https://drive.google.com/uc?export=download&id=1v8KM36DgGQztTmocsPp7my0xNSSJxaOw" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="hover:bg-blue-50 transition-colors duration-300">
                  {currentText.about.downloadCv}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-br from-blue-500 to-purple-600 text-white" id="contact">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            {currentText.contact.title}
          </h2>
          <p className="text-xl text-center mb-8">{currentText.contact.cta}</p>
          
          <div className="flex justify-center mb-8">
            <div className="p-2 bg-white/10 backdrop-blur-sm rounded-full">
              <HorizontalSocialIcons translations={currentText.social} />
            </div>
          </div>
          
          <div className="max-w-md mx-auto">
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
          </div>
        </div>
      </section>

      <footer className="py-8 px-4 bg-gray-900 text-gray-400 text-center">
        <p className="mb-2">{currentText.footer.message}</p>
        <p>{currentText.footer.copyright}</p>
      </footer>
    </div>
  );
};

export default Index;
