import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

interface StaggeredGridProps {
  children: React.ReactNode;
  columns?: number;
  staggerAmount?: number;
  triggerOnScroll?: boolean;
}

const StaggeredGrid = ({
  children,
  columns = 3,
  staggerAmount = 100,
  triggerOnScroll = true,
}: StaggeredGridProps) => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const items = grid.querySelectorAll("[data-stagger-item]");

    const triggerAnimation = () => {
      animate(items, {
        opacity: [0, 1],
        translateY: [30, 0],
        scale: [0.9, 1],
        duration: 800,
        delay: stagger(staggerAmount, { start: 100 }),
        ease: "outExpo",
      });
    };

    if (triggerOnScroll) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            triggerAnimation();
            observer.unobserve(grid);
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(grid);
      return () => observer.disconnect();
    } else {
      triggerAnimation();
    }
  }, [staggerAmount, triggerOnScroll]);

  return (
    <div
      ref={gridRef}
      className={`grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-${columns}`}
    >
      {children}
    </div>
  );
};

export default StaggeredGrid;
