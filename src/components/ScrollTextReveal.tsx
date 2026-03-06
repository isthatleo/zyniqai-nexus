import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

interface ScrollTextRevealProps {
  text: string;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "p" | "span";
  staggerDelay?: number;
  duration?: number;
}

const ScrollTextReveal = ({ text, className = "", tag: Tag = "h2", staggerDelay = 30, duration = 600 }: ScrollTextRevealProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!containerRef.current || hasAnimated.current) return;
    const chars = containerRef.current.querySelectorAll(".scroll-char");
    if (!chars.length) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animate(chars, {
            opacity: [0, 1],
            translateY: [20, 0],
            filter: ["blur(8px)", "blur(0px)"],
            duration,
            delay: stagger(staggerDelay),
            ease: "outExpo",
          });
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [staggerDelay, duration]);

  const words = text.split(" ");

  return (
    <div ref={containerRef}>
      <Tag className={className}>
        {words.map((word, wi) => (
          <span key={wi} className="inline-block mr-[0.3em]">
            {word.split("").map((char, ci) => (
              <span key={`${wi}-${ci}`} className="scroll-char inline-block opacity-0">
                {char}
              </span>
            ))}
          </span>
        ))}
      </Tag>
    </div>
  );
};

export default ScrollTextReveal;
