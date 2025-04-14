
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ReactiveHeadingProps {
  text: string;
  className?: string;
  isRtl?: boolean;
}

const ReactiveHeading: React.FC<ReactiveHeadingProps> = ({ text, className, isRtl = false }) => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [charPositions, setCharPositions] = useState<Array<{ x: number; y: number; rotate: number }>>(
    Array(text.length).fill({ x: 0, y: 0, rotate: 0 })
  );

  useEffect(() => {
    if (!headingRef.current) return;

    const handleMouseMove = (event: MouseEvent) => {
      if (!headingRef.current) return;

      const rect = headingRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = event.clientX - centerX;
      const distanceY = event.clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      // Reduced maxDistance for more subtle effect
      const maxDistance = 200;

      if (distance < maxDistance) {
        const intensity = 1 - (distance / maxDistance);

        const newPositions = Array.from({ length: text.length }).map((_, index) => {
          const charOffset = index - (text.length - 1) / 2;
          const angleOffset = (charOffset * Math.PI / 4) + (Math.PI / 2);

          // Reduced maximum movement to 5px
          return {
            x: intensity * (Math.sin(angleOffset) * 5 + distanceX * 0.02),
            y: intensity * (Math.cos(angleOffset) * 5 + distanceY * 0.02),
            rotate: intensity * charOffset * 3 // Reduced rotation
          };
        });

        setCharPositions(newPositions);
      } else {
        setCharPositions(Array(text.length).fill({ x: 0, y: 0, rotate: 0 }));
      }
    };

    const handleMouseLeave = () => {
      setCharPositions(Array(text.length).fill({ x: 0, y: 0, rotate: 0 }));
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [text.length]);

  return (
    <h1
      ref={headingRef}
      className={`flex justify-center items-center ${isRtl ? 'flex-row-reverse' : 'flex-row'} ${className}`}
      style={{ direction: isRtl ? 'rtl' : 'ltr' }}
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          animate={{
            x: charPositions[index]?.x || 0,
            y: charPositions[index]?.y || 0,
            rotate: charPositions[index]?.rotate || 0,
          }}
          transition={{
            type: "spring",
            stiffness: 60, // Reduced stiffness for smoother animation
            damping: 20    // Increased damping for less bounciness
          }}
          className="inline-block"
          style={{ originX: 0.5, originY: 0.5 }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </h1>
  );
};

export default ReactiveHeading;
