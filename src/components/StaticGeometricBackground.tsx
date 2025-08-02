import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const StaticGeometricBackground = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    // Static geometric shapes for mobile - Apple-inspired minimal design
    return (
      <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background" />
        
        {/* Static geometric shapes with Apple-style positioning */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" preserveAspectRatio="xMidYMid slice">
          {/* Large circle top right */}
          <circle 
            cx="85%" 
            cy="15%" 
            r="120" 
            fill="url(#appleGradient1)" 
            className="animate-pulse-subtle"
          />
          
          {/* Medium rectangle left side */}
          <rect 
            x="5%" 
            y="40%" 
            width="100" 
            height="100" 
            rx="20"
            fill="url(#appleGradient2)"
            transform="rotate(15)"
          />
          
          {/* Small circles scattered */}
          <circle cx="25%" cy="25%" r="40" fill="url(#appleGradient1)" />
          <circle cx="75%" cy="75%" r="60" fill="url(#appleGradient2)" />
          <circle cx="15%" cy="85%" r="35" fill="url(#appleGradient1)" />
          
          {/* Rounded rectangles */}
          <rect 
            x="60%" 
            y="50%" 
            width="80" 
            height="120" 
            rx="25"
            fill="url(#appleGradient2)"
            transform="rotate(-10)"
          />
          
          {/* Triangle shape */}
          <polygon 
            points="90,10 130,70 50,70" 
            fill="url(#appleGradient1)"
            transform="translate(20%, 60%) scale(0.8)"
          />
          
          {/* Gradient definitions */}
          <defs>
            <linearGradient id="appleGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="hsl(var(--primary) / 0.3)" />
            </linearGradient>
            <linearGradient id="appleGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--accent))" />
              <stop offset="100%" stopColor="hsl(var(--accent) / 0.3)" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Subtle overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-background/30" />
      </div>
    );
  }

  // Desktop - keep existing dynamic behavior but with Apple styling
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background" />
      
      {/* Desktop gets subtle animated version */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.05]" preserveAspectRatio="xMidYMid slice">
        <circle 
          cx="20%" 
          cy="20%" 
          r="150" 
          fill="url(#desktopGradient1)" 
          className="animate-pulse-subtle"
        />
        <circle 
          cx="80%" 
          cy="80%" 
          r="100" 
          fill="url(#desktopGradient2)"
          className="animate-pulse-subtle"
          style={{ animationDelay: '1s' }}
        />
        <rect 
          x="60%" 
          y="20%" 
          width="120" 
          height="120" 
          rx="30"
          fill="url(#desktopGradient1)"
          transform="rotate(25)"
          className="animate-pulse-subtle"
          style={{ animationDelay: '2s' }}
        />
        
        <defs>
          <linearGradient id="desktopGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--primary) / 0.2)" />
          </linearGradient>
          <linearGradient id="desktopGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--accent))" />
            <stop offset="100%" stopColor="hsl(var(--accent) / 0.2)" />
          </linearGradient>
        </defs>
      </svg>
      
      <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-background/20" />
    </div>
  );
};

export default StaticGeometricBackground;
