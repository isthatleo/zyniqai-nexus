import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

interface HoverSplitTextProps {
  text: string;
  className?: string;
  splitDirection?: "horizontal" | "vertical";
  animationDuration?: number;
}

const HoverSplitText = ({
  text,
  className = "",
  splitDirection = "horizontal",
  animationDuration = 400,
}: HoverSplitTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const chars = container.querySelectorAll(".split-char");

    const handleMouseEnter = () => {
      chars.forEach((char) => {
        const span = char.querySelector("span");
        if (span) {
          animate(span, {
            translateX: splitDirection === "horizontal" ? "100%" : 0,
            translateY: splitDirection === "vertical" ? "100%" : 0,
            duration: animationDuration,
            ease: "easeInOutQuad",
          });
        }
      });
    };

    const handleMouseLeave = () => {
      chars.forEach((char) => {
        const span = char.querySelector("span");
        if (span) {
          animate(span, {
            translateX: 0,
            translateY: 0,
            duration: animationDuration,
            ease: "easeInOutQuad",
          });
        }
      });
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [splitDirection, animationDuration]);

  return (
    <div ref={containerRef} className={`inline-block cursor-pointer ${className}`}>
      {text.split("").map((char, i) => (
        <span key={i} className="split-char inline-block overflow-hidden">
          <span className="inline-block">
            {char === " " ? "\u00A0" : char}
          </span>
        </span>
      ))}
    </div>
  );
};

export default HoverSplitText;
