import { useEffect, useRef, useCallback } from "react";
import { animate, stagger } from "animejs";

// Staggered fade-in for grid items
export function useStaggerFadeIn(selector: string, options?: { delay?: number; duration?: number; stagger?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    const targets = containerRef.current.querySelectorAll(selector);
    if (!targets.length) return;

    animate(targets, {
      opacity: [0, 1],
      translateY: [30, 0],
      duration: options?.duration || 800,
      delay: stagger(options?.stagger || 100, { start: options?.delay || 200 }),
      ease: "outExpo",
    });
  }, [selector, options?.delay, options?.duration, options?.stagger]);

  return containerRef;
}

// Counter animation for numbers
export function useCountUp(targetValue: number, duration = 2000) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  const triggerAnimate = useCallback(() => {
    if (!ref.current || hasAnimated.current) return;
    hasAnimated.current = true;
    const obj = { value: 0 };
    animate(obj, {
      value: targetValue,
      duration,
      ease: "outExpo",
      onUpdate: () => {
        if (ref.current) ref.current.textContent = Math.round(obj.value).toLocaleString();
      },
    });
  }, [targetValue, duration]);

  return { ref, animate: triggerAnimate };
}

// Floating animation for elements
export function useFloat(selector: string) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const targets = containerRef.current.querySelectorAll(selector);
    if (!targets.length) return;

    animate(targets, {
      translateY: [-8, 8],
      duration: 3000,
      alternate: true,
      loop: true,
      ease: "inOutSine",
      delay: stagger(400),
    });
  }, [selector]);

  return containerRef;
}

// Pulse ring animation
export function usePulseRing() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    animate(ref.current, {
      scale: [1, 1.15, 1],
      opacity: [0.6, 1, 0.6],
      duration: 3000,
      loop: true,
      ease: "inOutQuad",
    });
  }, []);

  return ref;
}

// Scroll-triggered animation
export function useScrollReveal(options?: { threshold?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate(el.children, {
            opacity: [0, 1],
            translateY: [40, 0],
            duration: 900,
            delay: stagger(80),
            ease: "outExpo",
          });
          observer.unobserve(el);
        }
      },
      { threshold: options?.threshold || 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [options?.threshold]);

  return ref;
}

// Hover scale animation
export function useHoverScale(selector: string) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const els = containerRef.current.querySelectorAll(selector);
    
    els.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        animate(el, {
          scale: 1.05,
          duration: 300,
          ease: "outExpo",
        });
      });
      el.addEventListener("mouseleave", () => {
        animate(el, {
          scale: 1,
          duration: 300,
          ease: "outExpo",
        });
      });
    });
  }, [selector]);

  return containerRef;
}

export { animate, stagger };
