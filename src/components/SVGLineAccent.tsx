import { useEffect, useRef } from "react";

interface SVGLineAccentProps {
  color: string;
}

const SVGLineAccent = ({ color }: SVGLineAccentProps) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const lines = svg.querySelectorAll("line");
    lines.forEach((line, i) => {
      const length = line.getTotalLength();
      line.style.strokeDasharray = String(length);
      line.style.strokeDashoffset = String(length);

      const keyframes = [
        { strokeDashoffset: String(length) },
        { strokeDashoffset: "0" },
      ];

      const timing: KeyframeAnimationOptions = {
        duration: 1500,
        iterations: Infinity,
        direction: "alternate" as PlaybackDirection,
        easing: "ease-in-out",
        delay: i * 100,
      };

      line.animate(keyframes as Keyframe[], timing);
    });
  }, []);

  return (
    <svg
      ref={svgRef}
      width="80"
      height="80"
      viewBox="0 0 100 100"
      style={{ overflow: "visible" }}
    >
      <g stroke={color} strokeWidth="2" fill="none">
        <line x1="50" y1="10" x2="50" y2="90" />
        <line x1="10" y1="50" x2="90" y2="50" />
        <line x1="20" y1="20" x2="80" y2="80" />
        <line x1="80" y1="20" x2="20" y2="80" />
      </g>
    </svg>
  );
};

export default SVGLineAccent;
