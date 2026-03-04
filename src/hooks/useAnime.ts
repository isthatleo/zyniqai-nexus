import { useEffect, useRef, useCallback } from "react";
import { animate, stagger } from "animejs";

// Staggered fade-in for grid items
export function useStaggerFadeIn(selector: string, options?: { delay?: number; duration?: number; stagger?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    const targets = containerRef.current.querySelectorAll(selector);
    if (!targets.length) return;

    anime({
      targets,
      opacity: [0, 1],
      translateY: [30, 0],
      duration: options?.duration || 800,
      delay: anime.stagger(options?.stagger || 100, { start: options?.delay || 200 }),
      easing: "easeOutExpo",
    });
  }, [selector, options?.delay, options?.duration, options?.stagger]);

  return containerRef;
}

// Counter animation for numbers
export function useCountUp(targetValue: number, duration = 2000) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  const animate = useCallback(() => {
    if (!ref.current || hasAnimated.current) return;
    hasAnimated.current = true;
    const obj = { value: 0 };
    anime({
      targets: obj,
      value: targetValue,
      round: 1,
      duration,
      easing: "easeOutExpo",
      update: () => {
        if (ref.current) ref.current.textContent = obj.value.toLocaleString();
      },
    });
  }, [targetValue, duration]);

  return { ref, animate };
}

// SVG line drawing animation
export function useSVGDraw() {
  const ref = useRef<SVGElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const paths = ref.current.querySelectorAll("path, line, circle, polyline");
    if (!paths.length) return;

    anime({
      targets: paths,
      strokeDashoffset: [anime.setDashoffset, 0],
      duration: 2000,
      delay: anime.stagger(200),
      easing: "easeInOutQuad",
    });
  }, []);

  return ref;
}

// Floating animation for elements
export function useFloat(selector: string) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const targets = containerRef.current.querySelectorAll(selector);
    if (!targets.length) return;

    anime({
      targets,
      translateY: [-8, 8],
      duration: 3000,
      direction: "alternate",
      loop: true,
      easing: "easeInOutSine",
      delay: anime.stagger(400),
    });
  }, [selector]);

  return containerRef;
}

// Pulse ring animation
export function usePulseRing() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    anime({
      targets: ref.current,
      scale: [1, 1.15, 1],
      opacity: [0.6, 1, 0.6],
      duration: 3000,
      loop: true,
      easing: "easeInOutQuad",
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
          anime({
            targets: el.children,
            opacity: [0, 1],
            translateY: [40, 0],
            duration: 900,
            delay: anime.stagger(80),
            easing: "easeOutExpo",
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

// Typewriter effect
export function useTypewriter(text: string, speed = 50) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.textContent = "";
    let i = 0;
    const interval = setInterval(() => {
      if (ref.current && i < text.length) {
        ref.current.textContent += text[i];
        i++;
      } else {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return ref;
}

// Morph / scale-in animation on hover trigger
export function useHoverScale(selector: string) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const els = containerRef.current.querySelectorAll(selector);
    
    els.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        anime({
          targets: el,
          scale: 1.05,
          duration: 300,
          easing: "easeOutExpo",
        });
      });
      el.addEventListener("mouseleave", () => {
        anime({
          targets: el,
          scale: 1,
          duration: 300,
          easing: "easeOutExpo",
        });
      });
    });
  }, [selector]);

  return containerRef;
}

export default anime;
