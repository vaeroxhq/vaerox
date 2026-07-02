/**
 * VÆRØX Animation Library — Premium, Minimal Motion System
 * Motion Level: 3/10 (refined, crafted, never jarring)
 *
 * Design Principles:
 * - Animations serve interaction feedback, hierarchy, or orientation
 * - Duration: 180–300ms (snappy, not sluggish)
 * - Easing: ease-out, ease-in-out (never ease-in alone)
 * - Respect prefers-reduced-motion automatically
 * - No decorative motion, no constant movement
 */

/**
 * Intersection Observer hook for scroll-triggered animations
 * Observes elements and triggers animation once when they scroll into view
 * Prevents replay on subsequent scrolls (one-shot behavior)
 */
export function useScrollReveal() {
  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("scroll-reveal-active");
        // Unobserve after first intersection to prevent replay
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(handleIntersection, {
    threshold: 0.1, // Trigger when 10% of element is visible
    rootMargin: "0px 0px -50px 0px", // Trigger slightly before fully in view
  });

  return observer;
}

/**
 * Utility: Check if user prefers reduced motion
 * Used for conditional animation application
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Hero entrance stagger sequence
 * Applied via CSS classes with staggered delays
 * Each element fades in and translates up
 */
export const HERO_STAGGER_DELAYS = {
  logo: "0ms",
  metadata: "60ms",
  heading: "120ms",
  description: "180ms",
  buttons: "240ms",
} as const;

/**
 * Navigation underline expansion
 * Grows from left to right on hover
 * Pure CSS via ::after pseudo-element
 */
export const NAV_UNDERLINE_DURATION = "200ms";
export const NAV_UNDERLINE_EASING = "ease-out";

/**
 * Card hover animations
 * Lift 2px + border brighten + arrow nudge
 */
export const CARD_HOVER_CONFIG = {
  liftDistance: "2px",
  arrowDistance: "3px",
  duration: "200ms",
  easing: "ease-out",
} as const;

/**
 * Button hover animations
 * Scale 1 → 1.01 (1% scale), subtle color transition
 */
export const BUTTON_HOVER_CONFIG = {
  scale: 1.01,
  duration: "180ms",
  easing: "ease-out",
} as const;

/**
 * Command palette animations
 * Modal scales in (0.98 → 1) while backdrop fades
 */
export const COMMAND_PALETTE_CONFIG = {
  duration: "220ms",
  easing: "ease-out",
  scaleFrom: 0.98,
  scaleTo: 1,
} as const;

/**
 * Scroll-in section animation
 * Fades and translates up on scroll into view
 */
export const SCROLL_SECTION_CONFIG = {
  duration: "300ms",
  easing: "ease-out",
  translateDistance: "12px",
} as const;

/**
 * Mobile menu animations
 * Slide and fade in from top or side
 */
export const MOBILE_MENU_CONFIG = {
  duration: "250ms",
  easing: "ease-out",
  translateDistance: "20px",
} as const;
