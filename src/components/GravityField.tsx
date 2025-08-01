import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
}

const GravityField: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [gravity, setGravity] = useState({ x: 0, y: 0.3 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const animationFrame = useRef<number>();

  // Initialize particles
  useEffect(() => {
    if (!containerRef.current) return;

    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  // Create particles when dimensions are set
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

    const colors = ['#60A5FA', '#34D399', '#F87171', '#FBBF24', '#A78BFA'];
    const newParticles: Particle[] = [];

    for (let i = 0; i < 8; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 20 + 10,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    setParticles(newParticles);
  }, [dimensions]);

  // Device orientation handling for mobile
  useEffect(() => {
    let isSupported = false;

    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (event.gamma !== null && event.beta !== null) {
        isSupported = true;
        // Convert device orientation to gravity values
        const newGravityX = (event.gamma || 0) / 45; // Increased sensitivity
        const newGravityY = (event.beta || 0) / 45; // Increased sensitivity
        
        setGravity({ 
          x: Math.max(-1, Math.min(1, newGravityX)), 
          y: Math.max(-1, Math.min(1, newGravityY))
        });
      }
    };

    const requestPermission = async () => {
      // For iOS 13+ devices
      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        try {
          const permission = await (DeviceOrientationEvent as any).requestPermission();
          if (permission === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation, { passive: true });
            isSupported = true;
          }
        } catch (error) {
          console.log('Device orientation permission denied');
          // Fallback to mouse
          setupMouseControl();
        }
      } else {
        // Android or other platforms - try directly
        window.addEventListener('deviceorientation', handleOrientation, { passive: true });
        
        // Test if it works after a short delay
        setTimeout(() => {
          if (!isSupported) {
            setupMouseControl();
          }
        }, 2000);
      }
    };

    const setupMouseControl = () => {
      const handleMouseMove = (event: MouseEvent) => {
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          
          const gravityX = (event.clientX - centerX) / (rect.width / 2) * 0.4;
          const gravityY = (event.clientY - centerY) / (rect.height / 2) * 0.4;
          
          setGravity({ x: gravityX, y: gravityY });
        }
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    };

    requestPermission();

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  // Animation loop
  useEffect(() => {
    if (particles.length === 0 || dimensions.width === 0) return;

    const animate = () => {
      setParticles(prevParticles => 
        prevParticles.map(particle => {
          let { x, y, vx, vy } = particle;

          // Apply gravity
          vx += gravity.x;
          vy += gravity.y;

          // Add some friction
          vx *= 0.99;
          vy *= 0.99;

          // Update position
          x += vx;
          y += vy;

          // Bounce off walls
          if (x <= particle.size / 2 || x >= dimensions.width - particle.size / 2) {
            vx *= -0.8;
            x = Math.max(particle.size / 2, Math.min(dimensions.width - particle.size / 2, x));
          }
          if (y <= particle.size / 2 || y >= dimensions.height - particle.size / 2) {
            vy *= -0.8;
            y = Math.max(particle.size / 2, Math.min(dimensions.height - particle.size / 2, y));
          }

          return { ...particle, x, y, vx, vy };
        })
      );

      animationFrame.current = requestAnimationFrame(animate);
    };

    animationFrame.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [particles.length, gravity, dimensions]);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ minHeight: '100vh' }}
    >
      <AnimatePresence>
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full opacity-70"
            style={{
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              left: particle.x - particle.size / 2,
              top: particle.y - particle.size / 2,
              filter: 'blur(1px)',
              boxShadow: `0 0 ${particle.size}px ${particle.color}40`
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.7, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5 }}
          />
        ))}
      </AnimatePresence>
      
      {/* Touch area for mobile interaction */}
      <div 
        className="absolute inset-0 z-10 pointer-events-auto md:pointer-events-none"
        onTouchMove={(e) => {
          const touch = e.touches[0];
          if (containerRef.current && touch) {
            const rect = containerRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const gravityX = (touch.clientX - centerX) / (rect.width / 2) * 0.6;
            const gravityY = (touch.clientY - centerY) / (rect.height / 2) * 0.6;
            
            setGravity({ x: gravityX, y: gravityY });
          }
        }}
      />
    </div>
  );
};

export default GravityField;