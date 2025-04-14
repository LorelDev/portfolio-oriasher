
import { useEffect, useRef } from "react";

const DotField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    let dots: { x: number; y: number; baseX: number; baseY: number; speed: number; angle: number }[] = [];
    const radius = 120;
    const dotSize = 2;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initDots();
    };

    const initDots = () => {
      dots = [];
      const spacing = 30;
      for (let x = 0; x < canvas.width; x += spacing) {
        for (let y = 0; y < canvas.height; y += spacing) {
          // Add random speed and angle for constant gentle movement
          const speed = Math.random() * 0.5 + 0.1;
          const angle = Math.random() * Math.PI * 2;
          dots.push({ 
            x, 
            y, 
            baseX: x, 
            baseY: y,
            speed,
            angle
          });
        }
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let mouse = { x: -9999, y: -9999 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach(dot => {
        // Constant gentle movement (circular pattern)
        dot.angle += 0.01;
        const naturalMovementX = Math.cos(dot.angle) * dot.speed;
        const naturalMovementY = Math.sin(dot.angle) * dot.speed;
        
        // Cursor interaction
        const dx = mouse.x - dot.x;
        const dy = mouse.y - dot.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const force = Math.max((radius - dist) / radius, 0);

        // Increased maximum movement to 15px for more reactivity
        const maxOffset = 20;
        let offsetX = (dx / (dist || 1)) * force * maxOffset;
        let offsetY = (dy / (dist || 1)) * force * maxOffset;
        
        // Make dots move away from cursor (reversed direction)
        offsetX = -offsetX;
        offsetY = -offsetY;

        // Combine natural movement with cursor interaction
        const targetX = dot.baseX + naturalMovementX + offsetX;
        const targetY = dot.baseY + naturalMovementY + offsetY;
        
        // Faster animation response
        dot.x += (targetX - dot.x) * 0.2;
        dot.y += (targetY - dot.y) * 0.2;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dotSize, 0, Math.PI * 2);
        
        // Add subtle color variation based on movement and position
        const intensity = force * 25;
        const distanceFromBase = Math.sqrt(
          Math.pow(dot.x - dot.baseX, 2) + Math.pow(dot.y - dot.baseY, 2)
        );
        const alpha = Math.min(0.8 + distanceFromBase * 0.01, 1);
        const dotColor = `rgba(42, 42, 42, ${alpha})`;
        ctx.fillStyle = dotColor;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resizeCanvas);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed", // Changed from absolute to fixed so it covers the entire site
        top: 0,
        left: 0,
        zIndex: 1, // Ensure it sits above the background but below content
        width: "100%",
        height: "100%",
      }}
    />
  );
};

export default DotField;
