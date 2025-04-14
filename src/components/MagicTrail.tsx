
import { useEffect, useRef } from "react";

const MagicTrail = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const particles: {
      x: number;
      y: number;
      size: number;
      alpha: number;
      dx: number;
      dy: number;
      life: number;
    }[] = [];
    
    const addParticles = (x: number, y: number, amount: number, lastX?: number, lastY?: number) => {
      const dx = lastX ? (x - lastX) * 0.05 : 0;
      const dy = lastY ? (y - lastY) * 0.05 : 0;
      
      for (let i = 0; i < amount; i++) {
        const size = Math.random() * 3 + 2;
        const alpha = Math.random() * 0.3 + 0.1;
        const offsetX = Math.random() * 6 - 3;
        const offsetY = Math.random() * 6 - 3;
        const velocityX = dx * (Math.random() * 0.5 + 0.5) + (Math.random() * 0.4 - 0.2);
        const velocityY = dy * (Math.random() * 0.5 + 0.5) + (Math.random() * 0.4 - 0.2);
        
        particles.push({
          x: x + offsetX,
          y: y + offsetY,
          size,
          alpha,
          dx: velocityX,
          dy: velocityY,
          life: Math.random() * 30 + 30
        });
      }
    };
    
    let lastX: number | undefined;
    let lastY: number | undefined;
    let isActive = false;
    let lastEmitTime = 0;
    
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      isActive = true;
      const clientX = (e as TouchEvent).touches
        ? (e as TouchEvent).touches[0].clientX
        : (e as MouseEvent).clientX;
      const clientY = (e as TouchEvent).touches
        ? (e as TouchEvent).touches[0].clientY
        : (e as MouseEvent).clientY;
      
      // Throttle emission rate
      const now = Date.now();
      if (now - lastEmitTime > (e.type === 'touchmove' ? 32 : 16)) {
        addParticles(clientX, clientY, e.type === 'touchmove' ? 2 : 3, lastX, lastY);
        lastEmitTime = now;
        lastX = clientX;
        lastY = clientY;
      }
    };
    
    // Reset when pointer leaves window
    const handlePointerLeave = () => {
      isActive = false;
      lastX = undefined;
      lastY = undefined;
    };
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("touchmove", handlePointerMove, { passive: true });
    window.addEventListener("mouseleave", handlePointerLeave);
    document.addEventListener("touchend", handlePointerLeave);
    window.addEventListener("resize", handleResize);
    
    const animate = () => {
      // Apply a semi-transparent clear for a trailing effect
      ctx.fillStyle = "rgba(15, 15, 15, 0.92)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        p.x += p.dx;
        p.y += p.dy;
        p.life -= 1;
        p.alpha *= 0.96;
        
        // Glow effect
        ctx.globalCompositeOperation = "lighter";
        ctx.beginPath();
        
        // Create a radial gradient for a subtle glow
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${p.alpha})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalCompositeOperation = "source-over";
        
        // Remove dead particles
        if (p.life <= 0 || p.alpha < 0.01) {
          particles.splice(i, 1);
          i--;
        }
      }
      
      // Add ambient particles occasionally when mouse isn't active
      if (!isActive && Math.random() < 0.03 && particles.length < 50) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        addParticles(x, y, 1);
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("mouseleave", handlePointerLeave);
      document.removeEventListener("touchend", handlePointerLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ 
        zIndex: 10,
        background: "transparent" 
      }}
    />
  );
};

export default MagicTrail;
