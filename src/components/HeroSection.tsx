import { useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowDown } from "lucide-react";

import skyBg from "@/assets/hero/sky.jpg";
import mountain1 from "@/assets/hero/mountain-1.png";
import mountain1B from "@/assets/hero/mountain-1-2.png";
import mountain2 from "@/assets/hero/mountain-2.png";
import planets from "@/assets/hero/planets.png";
import astronaut from "@/assets/hero/astronaut.png";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.45 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const skyY        = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const planetsY    = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const mountain2Y  = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const mountain1BY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const mountain1Y  = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);
  const astronautY  = useTransform(scrollYProgress, [0, 1], ["0%", "160%"]);
  const astronautX  = useTransform(scrollYProgress, [0.3, 0.7], ["0%", "-30%"]);
  const astronautRotate = useTransform(scrollYProgress, [0, 1], [0, 22]);
  const textY       = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const overlayOpacity  = useTransform(scrollYProgress, [0, 0.85], [0, 0.65]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[100svh] bg-[hsl(220,25%,5%)]"
    >
      {/* Sky + planets */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        <motion.div className="absolute inset-0" style={{ y: skyY }}>
          <img src={skyBg} alt="" className="w-full h-[115%] object-cover object-top" loading="eager" />
        </motion.div>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 0%, transparent 40%, hsl(220 25% 4% / 0.5) 100%)" }} />
        <motion.div className="absolute inset-0" style={{ y: planetsY }}>
          <img src={planets} alt="" className="w-full h-full object-cover object-center opacity-65" />
        </motion.div>
      </div>

      {/* Astronaut */}
      <motion.div
        className="absolute pointer-events-none z-[3] right-[-3%] top-[3%] w-[64%] sm:right-[0%] sm:top-[6%] sm:w-[44%] md:right-[2%] md:top-[4%] md:w-[37%] lg:right-[4%] lg:top-[1%] lg:w-[33%] xl:right-[6%] xl:top-[0%] max-w-[660px]"
        style={{ y: astronautY, x: astronautX }}
      >
        <motion.div initial={{ opacity: 0, y: -240 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 2.6, delay: 0.25, ease: "easeOut" }}>
          <motion.div style={{ rotate: astronautRotate }}>
            <motion.div animate={{ y: [0, 18, 0] }} transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}>
              <motion.div
                className="absolute -inset-[25%] rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(circle, hsl(var(--primary) / 0.38) 0%, hsl(var(--primary) / 0.14) 40%, transparent 70%)",
                  filter: "blur(48px)",
                }}
                animate={{ scale: [1, 1.14, 1], opacity: [0.55, 1, 0.55] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <img
                src={astronaut}
                alt="Floating astronaut"
                className="relative w-full"
                style={{ filter: "drop-shadow(0 20px 80px hsl(var(--primary) / 0.42))" }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Mountains */}
      <div className="absolute inset-0 z-[5] overflow-hidden pointer-events-none">
        <motion.div className="absolute bottom-0 left-0 right-0" style={{ y: mountain2Y }}>
          <img src={mountain2} alt="" className="w-full h-auto object-cover object-bottom" />
        </motion.div>
        <motion.div className="absolute bottom-0 left-0 right-0" style={{ y: mountain1BY }}>
          <img src={mountain1B} alt="" className="w-full h-auto object-cover object-bottom" />
        </motion.div>
        <motion.div className="absolute bottom-0 left-0 right-0" style={{ y: mountain1Y }}>
          <img src={mountain1} alt="" className="w-full h-auto object-cover object-bottom" />
        </motion.div>
        <motion.div className="absolute inset-0 bg-background" style={{ opacity: overlayOpacity }} />
        <div className="absolute bottom-0 left-0 right-0 h-[42%] bg-gradient-to-t from-background via-background/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-[10] w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-24 lg:pb-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ y: textY }}
          className="max-w-[88%] sm:max-w-xl mx-auto sm:mx-0 text-center sm:text-left"
        >
          <motion.div
            variants={itemVariants}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <span className="text-xs font-medium tracking-widest uppercase text-primary mb-4 block">AI Engine</span>
            <h1 className="text-[clamp(3rem,8.5vw,6rem)] md:text-6xl font-display font-bold leading-[1.04] tracking-tight text-white mb-4">
              All-in-one <br></br><span className="gradient-text" style={{
                background: "linear-gradient(90deg, hsl(40,72%,63%), hsl(0,72%,63%), hsl(280,83%,68%))",
                backgroundClip: "text",
                WebkitBackgroundClip: "text !important",
                WebkitTextFillColor: "transparent !important",
                fontWeight: "bold",
              }}>AI systems</span><br></br>
               engine.
            </h1>
          </motion.div>

          <motion.p variants={itemVariants} className="mt-4 sm:mt-6 text-[clamp(1rem,2.6vw,1.125rem)] text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A fast and flexible AI infrastructure partner to power your enterprise.
          </motion.p>

          <motion.div variants={itemVariants} className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center gap-3 justify-center sm:justify-start">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center w-full sm:w-auto px-7 py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all shadow-xl shadow-primary/30"
              >
                Get Started
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
              <a href="#features" className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3 rounded-full border border-white/25 text-sm font-medium text-white/85 hover:text-white hover:border-white/50 transition-all backdrop-blur-sm hover:bg-white/5">
                Learn more <ArrowDown size={14} />
              </a>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-8 sm:mt-12 flex items-center gap-7 sm:gap-12 justify-center sm:justify-start">
            {[
              { value: "40+", label: "AI Models" },
              { value: "6", label: "Industries" },
              { value: "99.9%", label: "Uptime SLA" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                className="text-center sm:text-left"
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <div className="text-xl sm:text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-[10px] sm:text-xs text-white/50 font-mono tracking-wide mt-0.5">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
