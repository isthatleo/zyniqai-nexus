import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowDown } from "lucide-react";
import { animate, stagger } from "animejs";
import CharacterReveal from "./CharacterReveal";

import skyBg from "@/assets/hero/sky.jpg";
import mountain1 from "@/assets/hero/mountain-1.png";
import mountain1B from "@/assets/hero/mountain-1-2.png";
import mountain2 from "@/assets/hero/mountain-2.png";
import planets from "@/assets/hero/planets.png";
import astronaut from "@/assets/hero/astronaut.png";

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const skyY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const planetsY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const mountain2Y = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const mountain1BY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const mountain1Y = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);
  const astronautY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const astronautRotate = useTransform(scrollYProgress, [0, 1], [8, 30]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "45%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.85], [0, 0.65]);

  useEffect(() => {
    if (textRef.current) {
      const els = textRef.current.querySelectorAll(".hero-anim");
      animate(els, {
        opacity: [0, 1],
        translateY: [40, 0],
        duration: 1200,
        delay: stagger(150, { start: 400 }),
        ease: "outExpo",
      });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[100svh] flex items-center justify-center overflow-hidden bg-[hsl(220,25%,5%)]"
    >
      {/* Layer 0: Sky background — full cover, anchored top */}
      <motion.div
        className="absolute inset-0 z-0 will-change-transform"
        style={{ y: skyY }}
      >
        <img
          src={skyBg}
          alt=""
          className="w-full h-[115%] object-cover object-top"
          loading="eager"
        />
      </motion.div>

      {/* Subtle dark vignette */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, transparent 40%, hsl(220 25% 4% / 0.45) 100%)",
        }}
      />

      {/* Layer 1: Planets */}
      <motion.div
        className="absolute inset-0 z-[2] will-change-transform"
        style={{ y: planetsY }}
      >
        <img
          src={planets}
          alt=""
          className="w-full h-full object-cover object-center opacity-65 sm:opacity-70"
        />
      </motion.div>

      {/* Layer 2: Astronaut — responsive size & position */}
      <motion.div
        className="absolute z-[3]
          right-[1%] top-[10%] w-[42%]
          sm:right-[4%] sm:top-[8%] sm:w-[36%]
          md:right-[6%] md:top-[7%] md:w-[30%]
          lg:right-[7%] lg:top-[6%] lg:w-[26%]
          max-w-[440px] will-change-transform"
        style={{ y: astronautY, rotate: astronautRotate }}
        initial={{ opacity: 0, y: -140, rotate: -18 }}
        animate={{ opacity: 1, y: 0, rotate: 8 }}
        transition={{ duration: 2.2, delay: 0.5, ease: "easeOut" }}
      >
        {/* Coral halo glow */}
        <motion.div
          className="absolute -inset-[25%] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--primary) / 0.38) 0%, hsl(var(--primary) / 0.14) 40%, transparent 70%)",
            filter: "blur(45px)",
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.65, 1, 0.65] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.img
          src={astronaut}
          alt="Falling astronaut"
          className="relative w-full drop-shadow-2xl"
          style={{
            filter: "drop-shadow(0 24px 90px hsl(var(--primary) / 0.45))",
          }}
          animate={{ y: [0, 16, 0], rotate: [0, 3, -2, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Layer 3: Mountain back */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-[4] will-change-transform"
        style={{ y: mountain2Y }}
      >
        <img
          src={mountain2}
          alt=""
          className="w-full h-auto object-cover object-bottom min-h-[30vw] sm:min-h-0"
        />
      </motion.div>

      {/* Layer 3.5: Mountain mid */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-[5] will-change-transform"
        style={{ y: mountain1BY }}
      >
        <img
          src={mountain1B}
          alt=""
          className="w-full h-auto object-cover object-bottom"
        />
      </motion.div>

      {/* Layer 4: Mountain front */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-[6] will-change-transform"
        style={{ y: mountain1Y }}
      >
        <img
          src={mountain1}
          alt=""
          className="w-full h-auto object-cover object-bottom"
        />
      </motion.div>

      {/* Scroll darkening overlay */}
      <motion.div
        className="absolute inset-0 z-[7] bg-background pointer-events-none"
        style={{ opacity: overlayOpacity }}
      />

      {/* Content */}
      <div className="relative z-[8] w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-28 sm:pt-32 lg:pt-36 pb-20 sm:pb-24">
        <motion.div
          ref={textRef}
          className="text-center sm:text-left max-w-xl mx-auto sm:mx-0"
          style={{ y: textY }}
        >
          {/* Tag badge */}
          <motion.div
            className="hero-anim inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm mb-5 text-[11px] font-mono font-medium text-white/70 tracking-wider opacity-0"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            AI Infrastructure Partner · Cape Town
          </motion.div>

          <h1
            className="hero-anim text-[clamp(2.4rem,7vw,5rem)] font-bold leading-[1.06] tracking-tight text-white drop-shadow-lg opacity-0"
          >
            All-in-one
            <br />
            <CharacterReveal
              text="AI systems"
              className="bg-gradient-to-r from-gold via-coral to-[hsl(var(--purple-accent))] bg-clip-text text-transparent"
              staggerDelay={40}
            />
            <br />
            engine.
          </h1>

          <p
            className="hero-anim mt-5 sm:mt-6 text-[clamp(0.9rem,2.2vw,1.1rem)] text-white/75 max-w-md mx-auto sm:mx-0 leading-relaxed drop-shadow-md opacity-0"
          >
            A fast and flexible AI infrastructure
            <br className="hidden sm:block" />
            partner to power your enterprise.
          </p>

          <div
            className="hero-anim mt-7 sm:mt-9 flex flex-col sm:flex-row items-center gap-3 justify-center sm:justify-start opacity-0"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/contact"
                className="w-full sm:w-auto px-7 py-3 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all text-center shadow-xl shadow-primary/30"
              >
                Get Started
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <a
                href="#features"
                className="w-full sm:w-auto px-7 py-3 rounded-full border border-white/25 text-sm font-medium text-white/85 hover:text-white hover:border-white/50 transition-all flex items-center justify-center gap-2 backdrop-blur-sm hover:bg-white/5"
              >
                Learn more <ArrowDown size={14} />
              </a>
            </motion.div>
          </div>

          {/* Stats row */}
          <motion.div
            className="hero-anim mt-10 sm:mt-12 flex items-center gap-8 justify-center sm:justify-start opacity-0"
          >
            {[
              { value: "40+", label: "AI Models" },
              { value: "6", label: "Industries" },
              { value: "99.9%", label: "Uptime SLA" },
            ].map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <div className="text-xl sm:text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-[10px] sm:text-xs text-white/50 font-mono tracking-wide mt-0.5">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade — taller to fully blend into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 sm:h-52 bg-gradient-to-t from-background via-background/80 to-transparent z-[9] pointer-events-none" />
    </section>
  );
};

export default HeroSection;
