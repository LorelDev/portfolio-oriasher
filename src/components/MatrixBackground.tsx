
import React, { useEffect, useRef, useState } from 'react';

interface MatrixBackgroundProps {
  className?: string;
}

const MatrixBackground: React.FC<MatrixBackgroundProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const charactersRef = useRef<Array<{
    x: number;
    y: number;
    text: string;
    originalX: number;
    originalY: number;
    velocity: { x: number, y: number };
    returning: boolean;
  }>>([]);
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();

  // Matrix characters
  const matrixChars = '01010101אבגדהוזחטיכלמנסעפצקרשת{}[]=><-+*/&|!@#$%^&*';

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && canvasRef.current.parentElement) {
        const { width, height } = canvasRef.current.parentElement.getBoundingClientRect();
        setDimensions({ width, height });
        canvasRef.current.width = width;
        canvasRef.current.height = height;
        
        // Reset characters when resizing
        initializeCharacters(width, height);
      }
    };

    // Initialize on mount and handle resize
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  const initializeCharacters = (width: number, height: number) => {
    const spacing = 25; // Space between characters
    const rows = Math.floor(height / spacing);
    const cols = Math.floor(width / spacing);
    const characters: Array<{
      x: number;
      y: number;
      text: string;
      originalX: number;
      originalY: number;
      velocity: { x: number, y: number };
      returning: boolean;
    }> = [];

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const x = j * spacing + spacing / 2;
        const y = i * spacing + spacing / 2;
        characters.push({
          x,
          y,
          text: matrixChars[Math.floor(Math.random() * matrixChars.length)],
          originalX: x,
          originalY: y,
          velocity: { x: 0, y: 0 },
          returning: false
        });
      }
    }

    charactersRef.current = characters;
  };

  useEffect(() => {
    if (dimensions.width && dimensions.height) {
      initializeCharacters(dimensions.width, dimensions.height);
      animateMatrix();
    }
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [dimensions]);

  const animateMatrix = () => {
    const animate = (time: number) => {
      if (previousTimeRef.current === undefined) {
        previousTimeRef.current = time;
      }
      
      const deltaTime = time - previousTimeRef.current;
      previousTimeRef.current = time;
      
      updateMatrix(deltaTime);
      drawMatrix();
      
      requestRef.current = requestAnimationFrame(animate);
    };
    
    requestRef.current = requestAnimationFrame(animate);
  };

  const updateMatrix = (deltaTime: number) => {
    const mouseInfluenceRadius = 150;
    const returnForce = 0.05;
    const maxVelocity = 2;
    const friction = 0.95;
    
    charactersRef.current = charactersRef.current.map(char => {
      // Calculate distance from mouse
      const dx = char.x - mousePosition.x;
      const dy = char.y - mousePosition.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      let vx = char.velocity.x;
      let vy = char.velocity.y;
      
      // If mouse is close enough, apply repulsive force
      if (distance < mouseInfluenceRadius && mousePosition.x !== 0 && mousePosition.y !== 0) {
        const repulsionStrength = (1 - distance / mouseInfluenceRadius) * 0.5;
        vx += (dx / distance) * repulsionStrength;
        vy += (dy / distance) * repulsionStrength;
        
        // Clamp velocity
        const velocityMagnitude = Math.sqrt(vx * vx + vy * vy);
        if (velocityMagnitude > maxVelocity) {
          vx = (vx / velocityMagnitude) * maxVelocity;
          vy = (vy / velocityMagnitude) * maxVelocity;
        }
      }
      
      // Return to original position
      const dxOrig = char.originalX - char.x;
      const dyOrig = char.originalY - char.y;
      const distOrig = Math.sqrt(dxOrig * dxOrig + dyOrig * dyOrig);
      
      if (distOrig > 0.1) {
        vx += dxOrig * returnForce;
        vy += dyOrig * returnForce;
      }
      
      // Apply friction
      vx *= friction;
      vy *= friction;
      
      return {
        ...char,
        x: char.x + vx,
        y: char.y + vy,
        velocity: { x: vx, y: vy },
        text: Math.random() < 0.005 ? matrixChars[Math.floor(Math.random() * matrixChars.length)] : char.text
      };
    });
  };

  const drawMatrix = () => {
    if (!canvasRef.current) return;
    
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, dimensions.width, dimensions.height);
    
    // Draw characters
    ctx.font = '12px "IBM Plex Mono", monospace';
    
    charactersRef.current.forEach(char => {
      // Calculate distance from mouse for opacity
      const dx = char.x - mousePosition.x;
      const dy = char.y - mousePosition.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const mouseInfluenceRadius = 150;
      
      // Set opacity based on distance from mouse
      if (mousePosition.x !== 0 && mousePosition.y !== 0) {
        const baseOpacity = 0.3;
        const opacityBoost = distance < mouseInfluenceRadius ? 0.7 * (1 - distance / mouseInfluenceRadius) : 0;
        ctx.globalAlpha = baseOpacity + opacityBoost;
      } else {
        // Random flickering effect when mouse is inactive
        ctx.globalAlpha = 0.2 + Math.random() * 0.15;
      }
      
      ctx.fillStyle = '#f2f2f2';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(char.text, char.x, char.y);
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseLeave = () => {
    // Gradually reset mouse influence
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <canvas
      ref={canvasRef}
      className={`absolute top-0 left-0 w-full h-full ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    />
  );
};

export default MatrixBackground;
