
import { useEffect, useRef } from "react";

interface LiveDotsBackgroundProps {
  color?: string;
}

const LiveDotsBackground = ({ color = "#ffffff" }: LiveDotsBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const dots: {
      x: number;
      y: number;
      alpha: number;
      pulse: number;
    }[] = [];

    const size = 2;
    const spacing = 35;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Reset dots array when resizing
      dots.length = 0;
      
      for (let x = 0; x < canvas.width; x += spacing) {
        for (let y = 0; y < canvas.height; y += spacing) {
          dots.push({
            x,
            y,
            alpha: Math.random() * 0.05,
            pulse: Math.random() * 0.003 + 0.001,
          });
        }
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach(dot => {
        dot.alpha += dot.pulse;
        if (dot.alpha > 0.05 || dot.alpha < 0.01) dot.pulse *= -1;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, size, 0, 2 * Math.PI);
        
        // Format the alpha value as a hex string (00-FF)
        const alphaHex = Math.floor(dot.alpha * 255).toString(16).padStart(2, '0');
        ctx.fillStyle = `${color}${alphaHex}`;
        ctx.fill();
      });
      requestAnimationFrame(animate);
    };

    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [color]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -10,
        pointerEvents: "none",
        mixBlendMode: "lighten",
      }}
    />
  );
};

export default LiveDotsBackground;
