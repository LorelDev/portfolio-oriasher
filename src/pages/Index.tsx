
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const [language, setLanguage] = useState<"en" | "he">("en");

  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === "en" ? "he" : "en");
  };

  const content = {
    en: {
      hero: {
        greeting: "Hi, I'm Ori",
        tagline: "I'm a computer science student with a passion for technology and design",
        cta: "See My Work",
        downloadResume: "Download Resume"
      },
      about: {
        title: "About Me",
        bio: "A creative UX/UI designer and frontend developer with a passion for building beautiful and functional websites.",
        downloadCv: "Download CV"
      },
      projects: {
        title: "My Projects",
        viewProject: "View Project"
      },
      skills: {
        title: "Skills & Tech Stack"
      },
      contact: {
        title: "Contact Me",
        cta: "Let's build something amazing together!",
        submit: "Send Message"
      },
      footer: {
        message: "Made with ❤️ by Ori Asher",
        copyright: "© 2025 Ori Asher. All rights reserved."
      }
    },
    he: {
      hero: {
        greeting: "היי, אני אורי",
        tagline: "אני סטודנט למדעי המחשב עם תשוקה לטכנולוגיה ולעיצוב",
        cta: "ראה את העבודות שלי",
        downloadResume: "הורד קורות חיים"
      },
      about: {
        title: "קצת עלי",
        bio: "מעצב חווית משתמש וממשק משתמש יצירתי ומפתח פרונט-אנד עם תשוקה לבניית אתרים יפים ופונקציונליים.",
        downloadCv: "הורד קו״ח"
      },
      projects: {
        title: "הפרויקטים שלי",
        viewProject: "צפה בפרויקט"
      },
      skills: {
        title: "כישורים וטכנולוגיות"
      },
      contact: {
        title: "צור קשר",
        cta: "בוא נבנה משהו מדהים ביחד!",
        submit: "שלח הודעה"
      },
      footer: {
        message: "נבנה באהבה ע״י אורי אשר",
        copyright: "© 2025 אורי אשר. כל הזכויות שמורות."
      }
    }
  };

  const currentText = content[language];
  const isRtl = language === "he";

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className={`min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 ${isRtl ? "font-assistant" : "font-poppins"}`}>
      {/* Language Toggle */}
      <div className={`fixed top-4 ${isRtl ? "left-4" : "right-4"} z-10`}>
        <Button 
          onClick={toggleLanguage}
          variant="outline" 
          className="rounded-full px-4 py-2 bg-white/80 backdrop-blur-sm hover:bg-white/90"
        >
          {language === "en" ? "עברית" : "English"}
        </Button>
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 py-20">
        <div className="max-w-3xl mx-auto animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            {currentText.hero.greeting}
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-10">
            {currentText.hero.tagline}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button className="text-lg px-8 py-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              {currentText.hero.cta}
            </Button>
            <Button variant="outline" className="text-lg px-8 py-6">
              {currentText.hero.downloadResume}
            </Button>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-4 bg-white" id="projects">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            {currentText.projects.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((project) => (
              <Card key={project} className="overflow-hidden transition-all duration-300 hover:shadow-xl">
                <div className="h-56 bg-gradient-to-r from-blue-400 to-purple-500"></div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Project {project}</h3>
                  <p className="text-gray-600 mb-4">
                    Short description of the project goes here. This showcases my skills.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">React</span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Tailwind</span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Figma</span>
                  </div>
                  <Button variant="outline" size="sm">
                    {currentText.projects.viewProject}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-gray-50" id="about">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            {currentText.about.title}
          </h2>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/3">
              <div className="aspect-square rounded-full bg-gradient-to-br from-blue-400 to-purple-600"></div>
            </div>
            <div className="w-full md:w-2/3">
              <p className="text-lg mb-6">{currentText.about.bio}</p>
              <Button variant="outline">{currentText.about.downloadCv}</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4 bg-white" id="skills">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            {currentText.skills.title}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 text-center">
            {["HTML", "CSS", "JavaScript", "React", "Figma", "Tailwind", "UI/UX", "TypeScript"].map((skill) => (
              <div key={skill} className="p-4 hover:transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">{skill.charAt(0)}</span>
                </div>
                <p className="font-medium">{skill}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-500 to-purple-600 text-white" id="contact">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            {currentText.contact.title}
          </h2>
          <p className="text-xl text-center mb-12">{currentText.contact.cta}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Social</h3>
              <div className="space-y-4">
                <a href="https://www.linkedin.com/in/%D7%90%D7%95%D7%A8%D7%99-%D7%90%D7%A9%D7%A8-b88690339/" className="flex items-center gap-2 hover:text-blue-200" target="_blank" rel="noopener noreferrer">
                  <span>LinkedIn</span>
                </a>
                <a href="https://www.instagram.com/ori.asher/" className="flex items-center gap-2 hover:text-blue-200" target="_blank" rel="noopener noreferrer">
                  <span>Instagram</span>
                </a>
                <a href="https://wa.me/+972552285564" className="flex items-center gap-2 hover:text-blue-200" target="_blank" rel="noopener noreferrer">
                  <span>WhatsApp</span>
                </a>
                <a href="https://www.upwork.com/freelancers/oria3?mp_source=share" className="flex items-center gap-2 hover:text-blue-200" target="_blank" rel="noopener noreferrer">
                  <span>Upwork</span>
                </a>
                <a href="tel:+972552285564" className="flex items-center gap-2 hover:text-blue-200">
                  <span>+972 55-228-5564</span>
                </a>
              </div>
            </div>
            <div>
              <form className="space-y-4">
                <input type="text" placeholder="Name" className="w-full p-3 rounded bg-white/10 border border-white/20 text-white placeholder:text-white/70" />
                <input type="email" placeholder="Email" className="w-full p-3 rounded bg-white/10 border border-white/20 text-white placeholder:text-white/70" />
                <textarea rows={4} placeholder="Message" className="w-full p-3 rounded bg-white/10 border border-white/20 text-white placeholder:text-white/70"></textarea>
                <Button type="submit" className="w-full bg-white text-blue-600 hover:bg-blue-50">
                  {currentText.contact.submit}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-900 text-gray-400 text-center">
        <p className="mb-2">{currentText.footer.message}</p>
        <p>{currentText.footer.copyright}</p>
      </footer>
    </div>
  );
};

export default Index;
