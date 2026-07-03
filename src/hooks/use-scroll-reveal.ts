/**
 * useScrollReveal — Intersection Observer hook for scroll-triggered animations
 * Observes elements and triggers animation once when they scroll into view
 * Prevents replay on subsequent scrolls (one-shot behavior)
 */

import { useEffect, useRef } from "react";

export function useScrollReveal<T extends HTMLElement = any>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Skip animation if user prefers reduced motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      element.classList.add("scroll-reveal-active");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("scroll-reveal-active");
            // Unobserve after first intersection to prevent replay
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: "0px 0px -50px 0px", // Trigger slightly before fully in view
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return ref;
}
