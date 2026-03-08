import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

interface UseAnimateOnScrollOptions {
  threshold?: number;
  duration?: number;
  delay?: number;
  staggerAmount?: number;
  staggerDirection?: "start" | "end" | "center" | "first" | "last";
  ease?: string;
  once?: boolean;
}

export const useAnimateOnScroll = (options: UseAnimateOnScrollOptions = {}) => {
  const {
    threshold = 0.15,
    duration = 800,
    delay = 0,
    staggerAmount = 80,
    staggerDirection = "start",
    ease = "outExpo",
    once = true,
  } = options;

  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const children = element.querySelectorAll("[data-animate]");
          if (children.length > 0) {
            animate(children, {
              opacity: [0, 1],
              translateY: [30, 0],
              duration,
              delay: stagger(staggerAmount, { start: delay } as any),
              ease,
            });
          }
          if (once) observer.unobserve(element);
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, duration, delay, staggerAmount, staggerDirection, ease, once]);

  return elementRef;
};

export const useAnimateElements = () => {
  const animateWithStagger = (
    selector: string,
    props: any,
    options: UseAnimateOnScrollOptions = {}
  ) => {
    const {
      threshold = 0.15,
      duration = 800,
      delay = 0,
      staggerAmount = 80,
      staggerDirection = "start",
      ease = "outExpo",
      once = true,
    } = options;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.target) {
          const elements = (entry.target as HTMLElement).querySelectorAll(selector);
          if (elements.length > 0) {
            animate(elements, {
              ...props,
              duration,
              delay: stagger(staggerAmount, { start: delay } as any),
              ease,
            });
          }
          if (once) observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    return observer;
  };

  return { animateWithStagger };
};

export const useScrollReveal = (ref: React.RefObject<HTMLElement>, options: UseAnimateOnScrollOptions = {}) => {
  const {
    threshold = 0.15,
    duration = 800,
    delay = 0,
    staggerAmount = 80,
    ease = "outExpo",
    once = true,
  } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const children = element.querySelectorAll("[data-animate-item]");
          if (children.length > 0) {
            animate(children, {
              opacity: [0, 1],
              translateY: [40, 0],
              scale: [0.95, 1],
              duration,
              delay: stagger(staggerAmount, { start: delay }),
              ease,
            });
          }
          if (once) observer.unobserve(element);
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, threshold, duration, delay, staggerAmount, ease, once]);
};
