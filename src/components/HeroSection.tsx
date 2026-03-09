import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowDown } from "lucide-react";
import CharacterReveal from "./CharacterReveal";

import skyBg from "@/assets/hero/sky.jpg";
import mountain1 from "@/assets/hero/mountain-1.png";
import mountain1B from "@/assets/hero/mountain-1-2.png";
import mountain2 from "@/assets/hero/mountain-2.png";
import planets from "@/assets/hero/planets.png";
import astronaut from "@/assets/hero/astronaut.png";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.4 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

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
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.85], [0, 0.65]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[100svh] overflow-hidden bg-[hsl(220,25%,5%)]"
    >
      {/* Sky */}
      <motion.div className="absolute inset-0 z-[0] will-change-transform" style={{ y: skyY }}>
        <img src={skyBg} alt="" className="w-full h-[115%] object-cover object-top" loading="eager" />
      </motion.div>

      {/* Vignette */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 0%, transparent 40%, hsl(220 25% 4% / 0.5) 100%)" }}
      />

      {/* Planets */}
      <motion.div className="absolute inset-0 z-[2] will-change-transform" style={{ y: planetsY }}>
        <img src={planets} alt="" className="w-full h-full object-cover object-center opacity-65" />
      </motion.div>

      {/* Astronaut — bigger, responsive positioning */}
      <motion.div
        className="absolute z-[3] will-change-transform
          right-[0%] top-[38%] w-[62%]
          sm:right-[1%] sm:top-[6%] sm:w-[40%]
          md:right-[3%] md:top-[4%] md:w-[34%]
          lg:right-[5%] lg:top-[2%] lg:w-[30%]
          xl:right-[7%] xl:top-[1%] xl:w-[27%]
          max-w-[580px]"
        style={{ y: astronautY, rotate: astronautRotate }}
        initial={{ opacity: 0, y: -160, rotate: -18 }}
        animate={{ opacity: 1, y: 0, rotate: 8 }}
        transition={{ duration: 2.4, delay: 0.3, ease: "easeOut" }}
      >
        <motion.div
          className="absolute -inset-[25%] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, hsl(var(--primary) / 0.38) 0%, hsl(var(--primary) / 0.14) 40%, transparent 70%)",
            filter: "blur(45px)",
          }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.img
          src={astronaut}
          alt="Falling astronaut"
          className="relative w-full drop-shadow-2xl"
          style={{ filter: "drop-shadow(0 24px 90px hsl(var(--primary) / 0.45))" }}
          animate={{ y: [0, 18, 0], rotate: [0, 3, -2, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Mountains */}
      <motion.div className="absolute bottom-0 left-0 right-0 z-[4] will-change-transform" style={{ y: mountain2Y }}>
        <img src={mountain2} alt="" className="w-full h-auto object-cover object-bottom" />
      </motion.div>
      <motion.div className="absolute bottom-0 left-0 right-0 z-[5] will-change-transform" style={{ y: mountain1BY }}>
        <img src={mountain1B} alt="" className="w-full h-auto object-cover object-bottom" />
      </motion.div>
      <motion.div className="absolute bottom-0 left-0 right-0 z-[6] will-change-transform" style={{ y: mountain1Y }}>
        <img src={mountain1} alt="" className="w-full h-auto object-cover object-bottom" />
      </motion.div>

      {/* Scroll darkening overlay */}
      <motion.div
        className="absolute inset-0 z-[7] bg-background pointer-events-none"
        style={{ opacity: overlayOpacity }}
      />

      {/* Bottom gradient — below content */}
      <div className="absolute bottom-0 left-0 right-0 h-[38%] z-[8] pointer-events-none bg-gradient-to-t from-background via-background/65 to-transparent" />

      {/* Hero Content — highest z-index */}
      <div className="relative z-[10] w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-24 sm:pt-28 lg:pt-32 pb-32 sm:pb-36">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ y: textY }}
          className="max-w-[90%] sm:max-w-xl mx-auto sm:mx-0 text-center sm:text-left will-change-transform"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/20 bg-white/[0.07] backdrop-blur-sm mb-5 sm:mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse flex-shrink-0" />
            <span className="text-[11px] font-mono font-medium text-white/85 tracking-wider whitespace-nowrap">
              AI Infrastructure Partner · Cape Town
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-[clamp(2.6rem,7.5vw,5.5rem)] font-bold leading-[1.05] tracking-tight text-white"
          >
            All-in-one
            <br />
            <CharacterReveal
              text="AI systems"
              className="bg-gradient-to-r from-[hsl(var(--gold))] via-[hsl(var(--primary))] to-[hsl(var(--purple-accent))] bg-clip-text text-transparent"
              staggerDelay={40}
            />
            <br />
            engine.
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="mt-5 sm:mt-6 text-[clamp(0.88rem,2.2vw,1.05rem)] text-white/70 max-w-[380px] sm:max-w-none mx-auto sm:mx-0 leading-relaxed"
          >
            A fast and flexible AI infrastructure
            <br className="hidden sm:block" />
            partner to power your enterprise.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="mt-7 sm:mt-9 flex flex-col sm:flex-row items-center gap-3 justify-center sm:justify-start"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/contact"
                className="inline-block w-full sm:w-auto px-7 py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all shadow-xl shadow-primary/30"
              >
                Get Started
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <a
                href="#features"
                className="inline-flex items-center gap-2 w-full sm:w-auto px-7 py-3 rounded-full border border-white/25 text-sm font-medium text-white/85 hover:text-white hover:border-white/50 transition-all backdrop-blur-sm hover:bg-white/5 justify-center"
              >
                Learn more <ArrowDown size={14} />
              </a>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="mt-10 sm:mt-14 flex items-center gap-8 sm:gap-12 justify-center sm:justify-start"
          >
            {[
              { value: "40+", label: "AI Models" },
              { value: "6", label: "Industries" },
              { value: "99.9%", label: "Uptime SLA" },
            ].map((stat, i) => (
              <div key={stat.label} className="text-center sm:text-left">
                <div className="text-xl sm:text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-[10px] sm:text-xs text-white/50 font-mono tracking-wide mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
