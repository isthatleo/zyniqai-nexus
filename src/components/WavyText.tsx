import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

interface WavyTextProps {
  text: string;
  className?: string;
  staggerDelay?: number;
}

const WavyText = ({ text, className = "", staggerDelay = 50 }: WavyTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const chars = container.querySelectorAll(".char");
    
    const handleMouseEnter = () => {
      animate(chars, {
        translateY: [0, -10, 0],
        duration: 500,
        delay: stagger(staggerDelay),
        ease: "easeInOutQuad",
      });
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    return () => container.removeEventListener("mouseenter", handleMouseEnter);
  }, [staggerDelay]);

  return (
    <div ref={containerRef} className={`inline-block cursor-pointer ${className}`}>
      {text.split("").map((char, i) => (
        <span key={i} className="char inline-block">
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
};

export default WavyText;
