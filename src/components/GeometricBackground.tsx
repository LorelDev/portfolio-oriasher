import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface Shape {
  x: number;
  y: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  type: 'triangle' | 'circle' | 'square' | 'diamond' | 'hexagon';
  color: string;
  opacity: number;
  dx: number;
  dy: number;
  baseX: number;
  baseY: number;
}

const GeometricBackground = () => {
  const isMobile = useIsMobile();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shapesRef = useRef<Shape[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Track theme changes
  useEffect(() => {
    const checkTheme = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    
    return () => observer.disconnect();
  }, []);

  // ALL HOOKS MUST BE CALLED BEFORE ANY CONDITIONAL LOGIC
  useEffect(() => {
    // Don't run effect on mobile or if not ready
    if (isMobile === undefined || isMobile) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    updateCanvasSize();

    // Profile image gradient colors - adaptive to theme
    const getColors = () => {
      if (isDarkMode) {
        return [
          'rgba(59, 130, 246, 0.3)',  // blue-500
          'rgba(99, 102, 241, 0.3)',  // indigo-500
          'rgba(139, 92, 246, 0.3)',  // violet-500
          'rgba(168, 85, 247, 0.3)',  // purple-500
          'rgba(192, 192, 192, 0.2)', // light gray
          'rgba(255, 255, 255, 0.2)', // white
        ];
      } else {
        return [
          'rgba(59, 130, 246, 0.6)',  // blue-500 - darker for light mode
          'rgba(99, 102, 241, 0.6)',  // indigo-500
          'rgba(139, 92, 246, 0.6)',  // violet-500
          'rgba(168, 85, 247, 0.6)',  // purple-500
          'rgba(75, 85, 99, 0.4)',    // gray-600
          'rgba(31, 41, 55, 0.4)',    // gray-800
        ];
      }
    };

    const colors = getColors();

    // Initialize shapes
    const initShapes = () => {
      shapesRef.current = [];
      const shapeCount = Math.min(20, Math.floor((canvas.width * canvas.height) / 50000));
      const currentColors = getColors();
      
      for (let i = 0; i < shapeCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        
        shapesRef.current.push({
          x,
          y,
          baseX: x,
          baseY: y,
          size: Math.random() * 40 + 20,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.005,
          type: ['triangle', 'circle', 'square', 'diamond', 'hexagon'][Math.floor(Math.random() * 5)] as Shape['type'],
          color: currentColors[Math.floor(Math.random() * currentColors.length)],
          opacity: isDarkMode ? Math.random() * 0.15 + 0.1 : Math.random() * 0.25 + 0.15,
          dx: (Math.random() - 0.5) * 0.1,
          dy: (Math.random() - 0.5) * 0.1,
        });
      }
    };

    initShapes();

    // Mouse movement handler for desktop
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };


    // Window resize handler
    const handleResize = () => {
      updateCanvasSize();
      initShapes();
    };

    // Draw shape functions
    const drawTriangle = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.beginPath();
      ctx.moveTo(0, -size / 2);
      ctx.lineTo(-size / 2, size / 2);
      ctx.lineTo(size / 2, size / 2);
      ctx.closePath();
      ctx.restore();
    };

    const drawCircle = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      ctx.beginPath();
      ctx.arc(x, y, size / 2, 0, Math.PI * 2);
    };

    const drawSquare = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.beginPath();
      ctx.rect(-size / 2, -size / 2, size, size);
      ctx.restore();
    };

    const drawDiamond = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.beginPath();
      ctx.moveTo(0, -size / 2);
      ctx.lineTo(size / 2, 0);
      ctx.lineTo(0, size / 2);
      ctx.lineTo(-size / 2, 0);
      ctx.closePath();
      ctx.restore();
    };

    const drawHexagon = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        const px = Math.cos(angle) * size / 2;
        const py = Math.sin(angle) * size / 2;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.restore();
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      shapesRef.current.forEach((shape) => {
        // Update position with base movement
        shape.x += shape.dx;
        shape.y += shape.dy;
        shape.rotation += shape.rotationSpeed;

        // Wrap around edges
        if (shape.x < -shape.size) shape.x = canvas.width + shape.size;
        if (shape.x > canvas.width + shape.size) shape.x = -shape.size;
        if (shape.y < -shape.size) shape.y = canvas.height + shape.size;
        if (shape.y > canvas.height + shape.size) shape.y = -shape.size;

        // Calculate subtle mouse parallax effect for desktop
        let offsetX = 0;
        let offsetY = 0;
        
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const distanceFromCenter = Math.sqrt(
          Math.pow(shape.baseX - centerX, 2) + Math.pow(shape.baseY - centerY, 2)
        );
        const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
        const parallaxStrength = (distanceFromCenter / maxDistance) * 0.3 + 0.1;
        
        // Subtle mouse parallax - shapes move slightly toward mouse
        const mouseInfluence = 8 * parallaxStrength;
        const mouseDistanceX = (mouseRef.current.x - centerX) / centerX;
        const mouseDistanceY = (mouseRef.current.y - centerY) / centerY;
        offsetX = mouseDistanceX * mouseInfluence;
        offsetY = mouseDistanceY * mouseInfluence;

        const finalX = shape.x + offsetX;
        const finalY = shape.y + offsetY;

        // Set style for hollow shapes
        ctx.strokeStyle = shape.color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = shape.opacity;

        // Draw shape
        switch (shape.type) {
          case 'triangle':
            drawTriangle(ctx, finalX, finalY, shape.size, shape.rotation);
            break;
          case 'circle':
            drawCircle(ctx, finalX, finalY, shape.size);
            break;
          case 'square':
            drawSquare(ctx, finalX, finalY, shape.size, shape.rotation);
            break;
          case 'diamond':
            drawDiamond(ctx, finalX, finalY, shape.size, shape.rotation);
            break;
          case 'hexagon':
            drawHexagon(ctx, finalX, finalY, shape.size, shape.rotation);
            break;
        }

        ctx.stroke();
        ctx.globalAlpha = 1;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // Event listeners
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize);

    // Start animation
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isMobile, isDarkMode]); // Add isDarkMode as dependency

  // Return null for mobile devices - no background at all
  // Wait for hook to initialize to prevent hydration mismatch
  if (isMobile === undefined || isMobile) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ 
        zIndex: 5,
        background: "transparent" 
      }}
    />
  );
};

export default GeometricBackground;