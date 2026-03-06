import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

interface TypewriterEffectProps {
  text: string;
  className?: string;
}

const TypewriterEffect = ({ text, className = "" }: TypewriterEffectProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear and create spans for each character
    containerRef.current.innerHTML = text
      .split("")
      .map((char) => `<span class="char">${char === " " ? "&nbsp;" : char}</span>`)
      .join("");

    const chars = containerRef.current.querySelectorAll(".char");

    animate(chars, {
      opacity: [0, 1],
      translateY: [10, 0],
      duration: 50,
      delay: stagger(40),
      ease: "easeOutQuad",
    });
  }, [text]);

  return <div ref={containerRef} className={className} />;
};

export default TypewriterEffect;
