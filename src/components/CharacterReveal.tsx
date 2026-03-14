import { motion, type Variants } from "framer-motion";

interface CharacterRevealProps {
  text: string;
  className?: string;
  staggerDelay?: number;
  duration?: number;
}

const containerVariants: Variants = {
  hidden: { },
  visible: { 
    transition: { 
      staggerChildren: 0.05 
    } 
  },
};

const charVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  },
};

const CharacterReveal = ({
  text,
  className = "",
  staggerDelay = 50,
}: CharacterRevealProps) => {
  return (
    <motion.div 
      className={`inline-block ${className} isolate [contain:paint]`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      viewport={{ once: true }}
      custom={staggerDelay}
    >
      {text.split('').map((char, i) => (
          <motion.span 
          key={i} 
          variants={charVariants}
          className="inline-block will-change-all [transform:none!important]"
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default CharacterReveal;
