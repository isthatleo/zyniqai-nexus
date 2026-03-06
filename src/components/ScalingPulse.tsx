import { useEffect, useRef } from "react";

interface ScalingPulseProps {
  color: string;
}

const ScalingPulse = ({ color }: ScalingPulseProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const pulses = container.querySelectorAll(".pulse-ring");
    pulses.forEach((pulse, i) => {
      const keyframes = [
        { transform: "scale(0.5)", opacity: 1 },
        { transform: "scale(1.5)", opacity: 0 },
      ];

      const timing = {
        duration: 1500,
        iterations: Infinity,
        delay: i * 400,
        easing: "ease-out",
      };

      pulse.animate(keyframes, timing);
    });
  }, []);

  return (
    <div ref={containerRef} className="relative w-24 h-24 flex items-center justify-center">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="pulse-ring absolute rounded-full border-2"
          style={{
            borderColor: color,
            width: "60px",
            height: "60px",
          }}
        />
      ))}
      <div
        className="w-4 h-4 rounded-full z-10"
        style={{ backgroundColor: color }}
      />
    </div>
  );
};

export default ScalingPulse;
