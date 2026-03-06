import { useAnimatedBackground } from "@/hooks/useCanvasAnimations";

interface AnimatedBackgroundProps {
  particleCount?: number;
  color?: string;
  speed?: number;
  className?: string;
  opacity?: number;
}

const AnimatedBackground = ({
  particleCount = 30,
  color = "hsl(0, 72%, 63%)",
  speed = 0.3,
  className = "",
  opacity = 0.1,
}: AnimatedBackgroundProps) => {
  const canvasRef = useAnimatedBackground({
    particleCount,
    color,
    speed,
    maxSize: 4,
    minSize: 1,
  });

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ opacity, pointerEvents: "none" }}
    />
  );
};

export default AnimatedBackground;
