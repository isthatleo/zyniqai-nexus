import { useEffect, useRef } from "react";

interface SVGLineAnimationProps {
  width?: number;
  height?: number;
  strokeColor?: string;
  strokeWidth?: number;
  lineCount?: number;
  animationDuration?: number;
  className?: string;
}

const SVGLineAnimation = ({
  width = 300,
  height = 300,
  strokeColor = "#FF4B4B",
  strokeWidth = 2,
  lineCount = 30,
  animationDuration = 8,
  className = "",
}: SVGLineAnimationProps) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    let animationId: number;
    let time = 0;

    const animate = () => {
      time += 0.01;
      
      // Update all lines with animated strokeDashoffset
      const lines = svg.querySelectorAll("line");
      lines.forEach((line, i) => {
        const offset = (i / lineCount) * 360 + time * 100;
        line.style.strokeDashoffset = `${offset}`;
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationId);
  }, [lineCount]);

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      className={`${className}`}
    >
      {Array.from({ length: lineCount }).map((_, i) => {
        const angle = (i / lineCount) * Math.PI * 2;
        const radius = Math.min(width, height) / 2 - 20;
        const x1 = width / 2 + Math.cos(angle) * radius;
        const y1 = height / 2 + Math.sin(angle) * radius;
        const x2 = width / 2 - Math.cos(angle) * radius;
        const y2 = height / 2 - Math.sin(angle) * radius;

        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray="50 50"
            opacity="0.6"
          />
        );
      })}
    </svg>
  );
};

export default SVGLineAnimation;
