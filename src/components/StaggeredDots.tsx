import { useEffect, useRef } from "react";

interface StaggeredDotsProps {
  color: string;
}

const StaggeredDots = ({ color }: StaggeredDotsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const dots = container.querySelectorAll(".dot");
    dots.forEach((dot, i) => {
      const delay = i * 100;
      const keyframes = [
        { transform: "scale(0)", opacity: 0 },
        { transform: "scale(1)", opacity: 1 },
        { transform: "scale(0)", opacity: 0 },
      ];

      const timing = {
        duration: 1200,
        iterations: Infinity,
        delay,
        easing: "ease-in-out",
      };

      dot.animate(keyframes, timing);
    });
  }, []);

  return (
    <div ref={containerRef} className="flex gap-3 items-center justify-center">
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="dot w-3 h-3 rounded-full"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
};

export default StaggeredDots;
