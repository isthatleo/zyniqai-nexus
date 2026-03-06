import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTheme } from "./ThemeProvider";
import { ArrowDown } from "lucide-react";
import { animate, stagger } from "animejs";
import CharacterReveal from "./CharacterReveal";

const AnimatedRing = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const size = Math.min(canvas.parentElement?.clientWidth || 500, 500);
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const colors = [
      { color: "hsl(145, 63%, 49%)", start: 0, end: 0.25 },
      { color: "hsl(45, 93%, 58%)", start: 0.25, end: 0.4 },
      { color: "hsl(0, 72%, 63%)", start: 0.4, end: 0.6 },
      { color: "hsl(187, 72%, 55%)", start: 0.6, end: 0.8 },
      { color: "hsl(217, 91%, 60%)", start: 0.8, end: 1.0 },
    ];

    const draw = () => {
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;
      const baseRadius = Math.min(w, h) * 0.38;
      time += 0.003;

      colors.forEach((seg) => {
        const startAngle = seg.start * Math.PI * 2 - Math.PI / 2 + time;
        const endAngle = seg.end * Math.PI * 2 - Math.PI / 2 + time;
        ctx.beginPath();
        ctx.arc(cx, cy, baseRadius, startAngle, endAngle);
        ctx.strokeStyle = seg.color;
        ctx.lineWidth = 3;
        ctx.lineCap = "round";
        ctx.stroke();
      });

      ctx.beginPath();
      ctx.arc(cx, cy, baseRadius * 0.85, 0, Math.PI * 2);
      ctx.strokeStyle = resolvedTheme === "light" ? "hsl(240, 5%, 80%)" : "hsl(240, 4%, 22%)";
      ctx.lineWidth = 1;
      ctx.stroke();

      for (let i = 0; i < 60; i++) {
        const angle = (i / 60) * Math.PI * 2 - Math.PI / 2 + time * 0.5;
        const inner = baseRadius * 0.88;
        const outer = baseRadius * (i % 5 === 0 ? 0.95 : 0.92);
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(angle) * inner, cy + Math.sin(angle) * inner);
        ctx.lineTo(cx + Math.cos(angle) * outer, cy + Math.sin(angle) * outer);
        ctx.strokeStyle = resolvedTheme === "light" ? "hsl(240, 5%, 75%)" : "hsl(240, 4%, 28%)";
        ctx.lineWidth = i % 5 === 0 ? 1.5 : 0.5;
        ctx.stroke();
      }

      const dotCount = 40;
      for (let i = 0; i < dotCount; i++) {
        const angle = (i / dotCount) * Math.PI * 2 + time * 1.5;
        const r = baseRadius * (0.3 + 0.35 * Math.abs(Math.sin(angle * 3 + time * 2)));
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;
        const size = 2 + Math.sin(time * 3 + i) * 1;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(0, 72%, 63%)`;
        ctx.fill();
      }

      const barCount = 20;
      for (let i = 0; i < barCount; i++) {
        const y = cy - baseRadius * 0.3 + (i / barCount) * baseRadius * 0.6;
        const barWidth = baseRadius * (0.2 + 0.5 * Math.abs(Math.sin(i * 0.5 + time * 2)));
        const x = cx - barWidth / 2;
        ctx.fillStyle = `hsla(0, 72%, 63%, ${0.15 + 0.15 * Math.sin(i + time * 2)})`;
        ctx.fillRect(x, y, barWidth, 1.5);
      }

      const innerGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, baseRadius * 0.28);
      innerGrad.addColorStop(0, resolvedTheme === "light" ? "hsl(240, 5%, 95%)" : "hsl(240, 6%, 12%)");
      innerGrad.addColorStop(1, resolvedTheme === "light" ? "hsl(240, 5%, 92%)" : "hsl(240, 6%, 8%)");
      ctx.beginPath();
      ctx.arc(cx, cy, baseRadius * 0.22, 0, Math.PI * 2);
      ctx.fillStyle = innerGrad;
      ctx.fill();

      animationId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [resolvedTheme]);

  return <canvas ref={canvasRef} className="w-full max-w-[500px] aspect-square" />;
};

const HeroSection = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Anime.js stagger for hero text elements
    if (textRef.current) {
      const els = textRef.current.querySelectorAll(".hero-anim");
      animate(els, {
        opacity: [0, 1],
        translateY: [40, 0],
        duration: 1200,
        delay: stagger(150, { start: 300 }),
        ease: "outExpo",
      });
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-4 items-center min-h-[calc(100vh-4rem)]">
          {/* Left: Text */}
          <div ref={textRef} className="text-center lg:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="hero-anim text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight"
            >
              All-in-one
              <br />
              <CharacterReveal text="AI systems" className="gradient-text" staggerDelay={40} />
              <br />
              engine.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hero-anim mt-6 text-base sm:text-lg text-muted-foreground max-w-md mx-auto lg:mx-0 leading-relaxed"
            >
              A fast and flexible AI infrastructure
              <br className="hidden sm:block" />
              partner to power your enterprise.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hero-anim mt-8 flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start"
            >
              <Link
                to="/contact"
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all text-center"
              >
                Get Started
              </Link>
              <a
                href="#features"
                className="w-full sm:w-auto px-6 py-2.5 rounded-full border border-border/60 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-all flex items-center justify-center gap-2"
              >
                Learn more <ArrowDown size={14} />
              </a>
            </motion.div>
          </div>

          {/* Right: Animated Ring */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex justify-center lg:justify-end"
          >
            <AnimatedRing />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
