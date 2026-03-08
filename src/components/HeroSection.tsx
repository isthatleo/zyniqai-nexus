import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowDown } from "lucide-react";
import { animate, stagger } from "animejs";
import CharacterReveal from "./CharacterReveal";

import skyBg from "@/assets/hero/sky.jpg";
import mountain1 from "@/assets/hero/mountain-1.png";
import mountain2 from "@/assets/hero/mountain-2.png";
import planets from "@/assets/hero/planets.png";
import codingPov from "@/assets/hero/coding-pov.png";

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax layers at different speeds
  const skyY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const planetsY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const mountain2Y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const mountain1Y = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const codingY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [0, 0.6]);

  useEffect(() => {
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
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Layer 0: Sky background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: skyY }}
      >
        <img
          src={skyBg}
          alt=""
          className="w-full h-full object-cover scale-110"
        />
      </motion.div>

      {/* Layer 1: Planets floating */}
      <motion.div
        className="absolute inset-0 z-[1]"
        style={{ y: planetsY }}
      >
        <img
          src={planets}
          alt=""
          className="w-full h-full object-cover opacity-70"
        />
      </motion.div>

      {/* Layer 2: Coding POV - floating center-right */}
      <motion.div
        className="absolute z-[2] right-[5%] top-[15%] w-[45%] max-w-[650px] hidden lg:block"
        style={{ y: codingY }}
        initial={{ opacity: 0, x: 60, rotateY: -10 }}
        animate={{ opacity: 1, x: 0, rotateY: 0 }}
        transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
      >
        <img
          src={codingPov}
          alt="Code editor"
          className="w-full drop-shadow-2xl"
          style={{ filter: "drop-shadow(0 20px 60px rgba(0,0,0,0.5))" }}
        />
      </motion.div>

      {/* Layer 3: Mountain back (with planet) */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-[3]"
        style={{ y: mountain2Y }}
      >
        <img
          src={mountain2}
          alt=""
          className="w-full object-cover object-bottom"
        />
      </motion.div>

      {/* Layer 4: Mountain front */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-[4]"
        style={{ y: mountain1Y }}
      >
        <img
          src={mountain1}
          alt=""
          className="w-full object-cover object-bottom"
        />
      </motion.div>

      {/* Scroll darkening overlay */}
      <motion.div
        className="absolute inset-0 z-[5] bg-background pointer-events-none"
        style={{ opacity: overlayOpacity }}
      />

      {/* Content */}
      <div className="relative z-[6] w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <motion.div
          ref={textRef}
          className="text-center lg:text-left max-w-2xl"
          style={{ y: textY }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="hero-anim text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-white drop-shadow-lg"
          >
            All-in-one
            <br />
            <CharacterReveal
              text="AI systems"
              className="bg-gradient-to-r from-[hsl(45,93%,58%)] via-[hsl(0,72%,63%)] to-[hsl(280,70%,60%)] bg-clip-text text-transparent"
              staggerDelay={40}
            />
            <br />
            engine.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-anim mt-6 text-base sm:text-lg text-white/80 max-w-md mx-auto lg:mx-0 leading-relaxed drop-shadow-md"
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
              className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-all text-center shadow-lg"
            >
              Get Started
            </Link>
            <a
              href="#features"
              className="w-full sm:w-auto px-6 py-2.5 rounded-full border border-white/30 text-sm font-medium text-white/90 hover:text-white hover:border-white/60 transition-all flex items-center justify-center gap-2 backdrop-blur-sm"
            >
              Learn more <ArrowDown size={14} />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade into page */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-[7]" />
    </section>
  );
};

export default HeroSection;
