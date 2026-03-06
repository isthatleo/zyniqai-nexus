import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

interface CharacterRevealProps {
  text: string;
  className?: string;
  staggerDelay?: number;
  duration?: number;
}

const CharacterReveal = ({
  text,
  className = "",
  staggerDelay = 50,
  duration = 800,
}: CharacterRevealProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const chars = container.querySelectorAll(".reveal-char");
    
    // Trigger animation on mount
    const timer = setTimeout(() => {
      animate(chars, {
        opacity: [0, 1],
        translateY: [20, 0],
        duration,
        delay: stagger(staggerDelay),
        ease: "outExpo",
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [staggerDelay, duration]);

  return (
    <div ref={containerRef} className={`inline-block ${className}`}>
      {text.split("").map((char, i) => (
        <span key={i} className="reveal-char inline-block opacity-0">
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
};

export default CharacterReveal;
