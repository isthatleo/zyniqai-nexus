import { useEffect, useRef } from "react";

interface GradientWaveAnimationProps {
  color: string;
}

const GradientWaveAnimation = ({ color }: GradientWaveAnimationProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const width = 280;
    const height = 210;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    let time = 0;
    let animId: number;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.03;

      // Create multiple wave layers
      for (let layer = 0; layer < 5; layer++) {
        const phaseOffset = layer * 0.4;
        const yOffset = (height / 6) * (layer + 0.5);

        // Create gradient for this layer
        const gradient = ctx.createLinearGradient(0, yOffset - 20, 0, yOffset + 20);

        // Parse HSL color and adjust opacity/saturation based on layer
        const opacity = 0.15 - layer * 0.02;
        const colorWithOpacity = color.replace(")", ` / ${opacity})`).replace("hsl(", "hsla(");
        
        gradient.addColorStop(0, `hsla(0, 0%, 100%, 0)`);
        gradient.addColorStop(0.5, colorWithOpacity);
        gradient.addColorStop(1, `hsla(0, 0%, 100%, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();

        // Draw wavy line using sine waves at different frequencies
        for (let x = 0; x <= width; x += 5) {
          const wave1 = Math.sin((x * 0.01 + time) + phaseOffset) * 8;
          const wave2 = Math.sin((x * 0.005 + time * 0.7) + phaseOffset) * 6;
          const y = yOffset + wave1 + wave2;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        // Close the path to create a filled wave
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        ctx.fill();
      }

      // Add subtle radial glow in center
      const glowGradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width / 1.5);
      glowGradient.addColorStop(0, color.replace(")", ` / 0.1)`).replace("hsl(", "hsla("));
      glowGradient.addColorStop(1, color.replace(")", ` / 0)`).replace("hsl(", "hsla("));
      
      ctx.fillStyle = glowGradient;
      ctx.fillRect(0, 0, width, height);

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, [color]);

  return <canvas ref={canvasRef} className="mx-auto" />;
};

export default GradientWaveAnimation;
