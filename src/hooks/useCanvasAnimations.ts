import { useEffect, useRef } from "react";

interface AnimatedBackgroundConfig {
  particleCount?: number;
  color?: string;
  speed?: number;
  maxSize?: number;
  minSize?: number;
}

export const useAnimatedBackground = (config: AnimatedBackgroundConfig = {}) => {
  const {
    particleCount = 50,
    color = "hsl(0, 72%, 63%)",
    speed = 0.5,
    maxSize = 4,
    minSize = 1,
  } = config;

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
    }> = [];

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.parentElement?.clientWidth || 800;
      canvas.height = canvas.parentElement?.clientHeight || 600;
      ctx.scale(dpr, dpr);
    };

    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * (canvas.width / (window.devicePixelRatio || 1)),
          y: Math.random() * (canvas.height / (window.devicePixelRatio || 1)),
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          size: Math.random() * (maxSize - minSize) + minSize,
          alpha: Math.random() * 0.5 + 0.3,
        });
      }
    };

    resize();
    initParticles();
    window.addEventListener("resize", resize);

    let animationId: number;

    const animate = () => {
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);
      ctx.clearRect(0, 0, w, h);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.fillStyle = color.replace(")", `, ${p.alpha})`).replace("hsl(", "hsla(");
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [particleCount, color, speed, maxSize, minSize]);

  return canvasRef;
};

export const useGridAnimation = (gridSize: number = 12) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const size = 280;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    const rows = gridSize;
    const cols = gridSize;
    const dotSize = 3;
    const gap = size / (rows + 1);
    let time = 0;
    let animId: number;

    const getPos = (i: number) => ({
      x: (i % cols + 1) * gap,
      y: (Math.floor(i / cols) + 1) * gap,
    });

    const dist = (i: number, from: number) => {
      const a = getPos(i);
      const b = getPos(from);
      return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
    };

    const animate = () => {
      ctx.clearRect(0, 0, size, size);

      const fromIndex = Math.floor(Math.sin(time * 0.005) * rows * cols * 0.5 + rows * cols * 0.5);
      const color = `hsl(0, 72%, ${50 + Math.sin(time * 0.01) * 13}%)`;

      for (let i = 0; i < rows * cols; i++) {
        const pos = getPos(i);
        const distance = dist(i, fromIndex);
        const strength = Math.max(0, 1 - distance / 300);

        ctx.fillStyle = color;
        ctx.globalAlpha = 0.3 + strength * 0.7;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, dotSize + strength * 3, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      time += 1;
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animId);
  }, [gridSize]);

  return canvasRef;
};
