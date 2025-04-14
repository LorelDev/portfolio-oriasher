
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import SmokeTransition from "./SmokeTransition";

interface ConversationalContactFormProps {
  isRtl: boolean;
  currentText: {
    contact: {
      title: string;
      cta: string;
      name: string;
      email: string;
      message: string;
      submit: string;
    };
  };
}

interface Question {
  id: string;
  title: string;
  placeholder: string;
  type: "text" | "email" | "tel" | "textarea";
}

const ConversationalContactForm = ({ isRtl, currentText }: ConversationalContactFormProps) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [currentValue, setCurrentValue] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const { toast } = useToast();

  const questions = {
    en: [
      {
        id: "name",
        title: "Let's start with introductions",
        placeholder: "What's your name?",
        type: "text",
      },
      {
        id: "email",
        title: "How can I reach you?",
        placeholder: "What's your email?",
        type: "email",
      },
      {
        id: "message",
        title: "I'd love to hear more",
        placeholder: "What would you like to share?",
        type: "textarea",
      },
    ],
    he: [
      {
        id: "name",
        title: "בוא נתחיל עם היכרות",
        placeholder: "איך קוראים לך?",
        type: "text",
      },
      {
        id: "email",
        title: "איך אוכל להשיג אותך?",
        placeholder: "מה האימייל שלך?",
        type: "email",
      },
      {
        id: "message",
        title: "אשמח לשמוע עוד",
        placeholder: "מה תרצה לשתף?",
        type: "textarea",
      },
    ],
  };

  const currentQuestions: Question[] = isRtl ? questions.he : questions.en;
  const currentQuestion = currentQuestions[step];

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setCurrentValue("");
  }, [step]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCurrentValue(e.target.value);
  };

  const moveToNextStep = () => {
    if (!currentValue.trim()) return;
    
    setIsTransitioning(true);
    
    // Update form data
    setFormData(prev => ({
      ...prev,
      [currentQuestion.id]: currentValue,
    }));
    
    setTimeout(() => {
      if (step < currentQuestions.length - 1) {
        setStep(step + 1);
      } else {
        setIsComplete(true);
        handleSubmit();
      }
      setIsTransitioning(false);
    }, 500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && currentQuestion.type !== "textarea") {
      e.preventDefault();
      moveToNextStep();
    }
  };

  const handleSubmit = () => {
    toast({
      title: isRtl ? "ההודעה נשלחה!" : "Message sent!",
      description: isRtl ? "תודה על פנייתך, אחזור אליך בהקדם." : "Thank you for your message. I'll get back to you soon.",
    });
  };

  const resetForm = () => {
    setStep(0);
    setFormData({ name: "", email: "", message: "" });
    setIsComplete(false);
  };

  return (
    <motion.div 
      className="max-w-lg mx-auto"
      layout
    >
      <SmokeTransition isActive={isTransitioning} />
      
      <AnimatePresence mode="wait">
        {!isComplete ? (
          <motion.div
            key={`step-${step}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="relative backdrop-blur-lg bg-black/20 border border-white/10 p-6 rounded-xl"
          >
            <motion.div className="mb-6">
              <motion.p 
                className="text-sm text-light-gray mb-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {currentQuestion.title}
              </motion.p>
              <motion.h3 
                className="text-xl font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {currentQuestion.placeholder}
              </motion.h3>
            </motion.div>
            
            <div className="relative mb-6">
              {currentQuestion.type === "textarea" ? (
                <Textarea
                  ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                  value={currentValue}
                  onChange={handleInputChange}
                  rows={4}
                  className="mono-input w-full bg-soft-black/50 text-lg resize-none"
                  onKeyDown={(e) => e.ctrlKey && e.key === "Enter" && moveToNextStep()}
                />
              ) : (
                <Input
                  ref={inputRef as React.RefObject<HTMLInputElement>}
                  type={currentQuestion.type}
                  value={currentValue}
                  onChange={handleInputChange}
                  className="mono-input w-full bg-soft-black/50 text-lg"
                  onKeyDown={handleKeyDown}
                />
              )}
            </div>
            
            <div className="flex justify-end">
              <Button 
                onClick={moveToNextStep} 
                className="mono-button group flex items-center gap-2"
                disabled={!currentValue.trim()}
              >
                {step < currentQuestions.length - 1 ? (
                  <>
                    {isRtl ? "הבא" : "Next"}
                    <ArrowRight className={`h-4 w-4 transition-transform ${isRtl ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
                  </>
                ) : (
                  <>
                    {isRtl ? "שלח" : "Send"}
                    <Send className={`h-4 w-4 transition-transform group-hover:-translate-y-1`} />
                  </>
                )}
              </Button>
            </div>
            
            <div className="flex items-center gap-2 mt-6">
              {currentQuestions.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1 flex-1 rounded-full transition-all duration-300 ${i === step ? 'bg-light-gray' : 'bg-dark-gray'}`}
                />
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="complete"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="backdrop-blur-lg bg-black/20 border border-white/10 p-8 rounded-xl text-center"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring" }}
            >
              <div className="w-16 h-16 bg-soft-black rounded-full flex items-center justify-center mx-auto mb-6">
                <Send className="h-6 w-6 text-light-gray" />
              </div>
            </motion.div>
            
            <h3 className="text-xl font-medium mb-2">
              {isRtl ? "ההודעה נשלחה!" : "Message sent!"}
            </h3>
            <p className="text-light-gray mb-6">
              {isRtl ? 
                `תודה ${formData.name}, אחזור אליך בהקדם.` : 
                `Thanks ${formData.name}, I'll get back to you soon.`
              }
            </p>
            
            <Button 
              className="mono-button" 
              onClick={resetForm}
            >
              {isRtl ? "שלח הודעה נוספת" : "Send another message"}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ConversationalContactForm;
