import React, { useEffect, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface SimpleGeometricBackgroundProps {
  children: React.ReactNode;
}

const SimpleGeometricBackground: React.FC<SimpleGeometricBackgroundProps> = ({ children }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const isMobile = useIsMobile();

  // Mouse tracking for desktop
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  // Device orientation for mobile
  useEffect(() => {
    if (!isMobile) return;

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        setTilt({
          x: Math.max(-15, Math.min(15, e.gamma / 2)),
          y: Math.max(-15, Math.min(15, (e.beta - 45) / 2))
        });
      }
    };

    if (typeof DeviceOrientationEvent !== 'undefined' && 'requestPermission' in DeviceOrientationEvent) {
      (DeviceOrientationEvent as any).requestPermission()
        .then((response: string) => {
          if (response === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation);
          }
        });
    } else {
      window.addEventListener('deviceorientation', handleOrientation);
    }

    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, [isMobile]);

  const movement = isMobile ? tilt : mousePosition;

  return (
    <div className="relative">
      {/* Geometric shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Shape 1 - Triangle */}
        <div
          className="absolute w-8 h-8 opacity-20"
          style={{
            top: '20%',
            left: '15%',
            background: 'linear-gradient(45deg, #60a5fa, transparent)',
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            transform: `translate(${movement.x * 0.5}px, ${movement.y * 0.5}px) rotate(${movement.x * 0.1}deg)`,
            transition: 'transform 0.1s ease-out',
            animation: 'float 8s ease-in-out infinite'
          }}
        />

        {/* Shape 2 - Circle */}
        <div
          className="absolute w-6 h-6 rounded-full opacity-20"
          style={{
            top: '60%',
            right: '20%',
            background: 'radial-gradient(circle, #8b5cf6, transparent)',
            transform: `translate(${movement.x * -0.3}px, ${movement.y * 0.7}px)`,
            transition: 'transform 0.1s ease-out',
            animation: 'float 6s ease-in-out infinite 2s'
          }}
        />

        {/* Shape 3 - Square */}
        <div
          className="absolute w-5 h-5 opacity-20"
          style={{
            top: '80%',
            left: '10%',
            background: 'linear-gradient(135deg, #06b6d4, transparent)',
            transform: `translate(${movement.x * 0.8}px, ${movement.y * -0.4}px) rotate(${movement.y * 0.1}deg)`,
            transition: 'transform 0.1s ease-out',
            animation: 'float 10s ease-in-out infinite 1s'
          }}
        />

        {/* Shape 4 - Diamond */}
        <div
          className="absolute w-7 h-7 opacity-20"
          style={{
            top: '30%',
            right: '10%',
            background: 'linear-gradient(45deg, #10b981, transparent)',
            clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
            transform: `translate(${movement.x * -0.6}px, ${movement.y * 0.3}px) rotate(${movement.x * -0.1}deg)`,
            transition: 'transform 0.1s ease-out',
            animation: 'float 7s ease-in-out infinite 3s'
          }}
        />

        {/* Shape 5 - Hexagon */}
        <div
          className="absolute w-6 h-6 opacity-20"
          style={{
            top: '10%',
            left: '60%',
            background: 'linear-gradient(60deg, #f59e0b, transparent)',
            clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
            transform: `translate(${movement.x * 0.4}px, ${movement.y * 0.6}px) rotate(${movement.y * 0.2}deg)`,
            transition: 'transform 0.1s ease-out',
            animation: 'float 9s ease-in-out infinite 4s'
          }}
        />

        {/* Shape 6 - Small Triangle */}
        <div
          className="absolute w-4 h-4 opacity-20"
          style={{
            top: '70%',
            left: '70%',
            background: 'linear-gradient(45deg, #ec4899, transparent)',
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            transform: `translate(${movement.x * -0.7}px, ${movement.y * -0.2}px) rotate(${movement.x * 0.15}deg)`,
            transition: 'transform 0.1s ease-out',
            animation: 'float 5s ease-in-out infinite 1.5s'
          }}
        />

        {/* Shape 7 - Circle 2 */}
        <div
          className="absolute w-5 h-5 rounded-full opacity-20"
          style={{
            top: '40%',
            left: '5%',
            background: 'radial-gradient(circle, #8b5cf6, transparent)',
            transform: `translate(${movement.x * 0.6}px, ${movement.y * -0.5}px)`,
            transition: 'transform 0.1s ease-out',
            animation: 'float 11s ease-in-out infinite 2.5s'
          }}
        />

        {/* Shape 8 - Rectangle */}
        <div
          className="absolute w-8 h-3 opacity-20"
          style={{
            top: '15%',
            right: '40%',
            background: 'linear-gradient(90deg, #06b6d4, transparent)',
            transform: `translate(${movement.x * -0.4}px, ${movement.y * 0.8}px) rotate(${movement.y * -0.1}deg)`,
            transition: 'transform 0.1s ease-out',
            animation: 'float 6.5s ease-in-out infinite 3.5s'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default SimpleGeometricBackground;