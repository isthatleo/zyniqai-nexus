import { useEffect, useRef } from "react";

interface RotatingBurstProps {
  color: string;
}

const RotatingBurst = ({ color }: RotatingBurstProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const circles = container.querySelectorAll(".burst-circle");
    circles.forEach((circle, i) => {
      const angle = (i / circles.length) * 360;
      const keyframes = [
        { transform: `rotate(${angle}deg) translateX(40px)`, opacity: 1 },
        { transform: `rotate(${angle + 360}deg) translateX(40px)`, opacity: 1 },
      ];

      const timing = {
        duration: 2000 + i * 200,
        iterations: Infinity,
        easing: "linear",
      };

      circle.animate(keyframes, timing);
    });
  }, []);

  return (
    <div ref={containerRef} className="relative w-20 h-20 flex items-center justify-center">
      <div className="absolute w-full h-full">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="burst-circle absolute w-2 h-2 rounded-full"
            style={{ backgroundColor: color, top: "50%", left: "50%" }}
          />
        ))}
      </div>
      <div
        className="w-3 h-3 rounded-full"
        style={{ backgroundColor: color }}
      />
    </div>
  );
};

export default RotatingBurst;
