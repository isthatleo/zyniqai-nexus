import { useScroll, useSpring, motion } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[100] pointer-events-none"
      style={{
        scaleX,
        transformOrigin: "0% 50%",
        background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--gold-light)), hsl(var(--coral-light)))",
      }}
    />
  );
};

export default ScrollProgress;
