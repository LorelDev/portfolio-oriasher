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

    // Profile image gradient colors - blue to purple with better visibility
    const colors = [
      'rgba(59, 130, 246, 0.3)',  // blue-500
      'rgba(99, 102, 241, 0.3)',  // indigo-500
      'rgba(139, 92, 246, 0.3)',  // violet-500
      'rgba(168, 85, 247, 0.3)',  // purple-500
      'rgba(192, 192, 192, 0.2)', // light gray
      'rgba(255, 255, 255, 0.2)', // white
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
          size: Math.random() * 60 + 30,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.01,
          type: ['triangle', 'circle', 'square', 'diamond', 'hexagon'][Math.floor(Math.random() * 5)] as Shape['type'],
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random() * 0.3 + 0.2,
          dx: (Math.random() - 0.5) * 0.8,
          dy: (Math.random() - 0.5) * 0.8,
        });
      }
    };

    initShapes();

    // Mouse movement handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
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

        // Wrap around edges
        if (shape.x < -shape.size) shape.x = canvas.width + shape.size;
        if (shape.x > canvas.width + shape.size) shape.x = -shape.size;
        if (shape.y < -shape.size) shape.y = canvas.height + shape.size;
        if (shape.y > canvas.height + shape.size) shape.y = -shape.size;

        // Calculate parallax effect based on distance from center
        let offsetX = 0;
        let offsetY = 0;
        
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const distanceFromCenter = Math.sqrt(
          Math.pow(shape.baseX - centerX, 2) + Math.pow(shape.baseY - centerY, 2)
        );
        const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
        const parallaxStrength = (distanceFromCenter / maxDistance) * 0.5 + 0.2;

        // Desktop: mouse parallax
        if (window.innerWidth > 768) {
          const mouseInfluence = 0.15 * parallaxStrength;
          
          offsetX = (mouseRef.current.x - centerX) * mouseInfluence;
          offsetY = (mouseRef.current.y - centerY) * mouseInfluence;
        } else {
          // Mobile: device orientation - shapes move toward device tilt direction
          const orientationInfluence = 8 * parallaxStrength; // Increased for better visibility
          // Gamma controls left/right tilt, Beta controls forward/backward tilt
          offsetX = orientationRef.current.gamma * orientationInfluence;
          offsetY = orientationRef.current.beta * orientationInfluence;
        }

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