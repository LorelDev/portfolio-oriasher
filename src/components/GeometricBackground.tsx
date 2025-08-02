import { useEffect, useRef } from "react";

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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shapesRef = useRef<Shape[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const orientationRef = useRef({ gamma: 0, beta: 0 });
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    updateCanvasSize();

    // Profile image gradient colors - very subtle hollow shapes
    const colors = [
      'rgba(59, 130, 246, 0.02)',  // blue-500
      'rgba(99, 102, 241, 0.02)',  // indigo-500
      'rgba(139, 92, 246, 0.02)',  // violet-500
      'rgba(168, 85, 247, 0.02)',  // purple-500
      'rgba(192, 192, 192, 0.015)', // light gray
      'rgba(255, 255, 255, 0.015)', // white
    ];

    // Initialize shapes
    const initShapes = () => {
      shapesRef.current = [];
      const shapeCount = Math.min(20, Math.floor((canvas.width * canvas.height) / 50000));
      
      for (let i = 0; i < shapeCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        
        shapesRef.current.push({
          x,
          y,
          baseX: x,
          baseY: y,
          size: Math.random() * 80 + 40,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.008,
          type: ['triangle', 'circle', 'square', 'diamond', 'hexagon'][Math.floor(Math.random() * 5)] as Shape['type'],
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random() * 0.04 + 0.02,
          dx: (Math.random() - 0.5) * 0.1,
          dy: (Math.random() - 0.5) * 0.1,
        });
      }
    };

    initShapes();

    // Mouse movement handler - adds expansion effect from mouse position
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      // Add expansion effect from mouse position
      shapesRef.current.forEach(shape => {
        const distance = Math.sqrt(
          Math.pow(shape.x - mouseX, 2) + Math.pow(shape.y - mouseY, 2)
        );
        
        if (distance < 200) {
          const force = (200 - distance) / 200;
          const angle = Math.atan2(shape.y - mouseY, shape.x - mouseX);
          shape.dx += Math.cos(angle) * force * 0.02;
          shape.dy += Math.sin(angle) * force * 0.02;
        }
      });
    };

    // Device orientation handler for mobile
    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        // Clamp values to reasonable range
        orientationRef.current.gamma = Math.max(-30, Math.min(30, e.gamma));
        orientationRef.current.beta = Math.max(-30, Math.min(30, e.beta));
      }
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
        
        // Apply friction to slow down movement
        shape.dx *= 0.995;
        shape.dy *= 0.995;

        // Wrap around edges
        if (shape.x < -shape.size) shape.x = canvas.width + shape.size;
        if (shape.x > canvas.width + shape.size) shape.x = -shape.size;
        if (shape.y < -shape.size) shape.y = canvas.height + shape.size;
        if (shape.y > canvas.height + shape.size) shape.y = -shape.size;

        // Apply device orientation on mobile (subtle drift effect)
        if (window.innerWidth <= 768) {
          const tiltInfluence = 0.008;
          shape.dx += orientationRef.current.gamma * tiltInfluence;
          shape.dy += orientationRef.current.beta * tiltInfluence;
        }

        // Set style for hollow shapes
        ctx.strokeStyle = shape.color;
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = shape.opacity;

        // Draw hollow shape (stroke only, no fill)
        switch (shape.type) {
          case 'triangle':
            drawTriangle(ctx, shape.x, shape.y, shape.size, shape.rotation);
            break;
          case 'circle':
            drawCircle(ctx, shape.x, shape.y, shape.size);
            break;
          case 'square':
            drawSquare(ctx, shape.x, shape.y, shape.size, shape.rotation);
            break;
          case 'diamond':
            drawDiamond(ctx, shape.x, shape.y, shape.size, shape.rotation);
            break;
          case 'hexagon':
            drawHexagon(ctx, shape.x, shape.y, shape.size, shape.rotation);
            break;
        }

        ctx.stroke();
        ctx.globalAlpha = 1;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // Event listeners
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('deviceorientation', handleDeviceOrientation, { passive: true });
    window.addEventListener('resize', handleResize);

    // Request permission for device orientation on iOS
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      (DeviceOrientationEvent as any).requestPermission();
    }

    // Start animation
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

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