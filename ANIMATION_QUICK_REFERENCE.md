# VÆRØX Animation System — Quick Reference Guide

## 🎯 Motion Level: 3/10 (Premium, Minimal)

All animations are **purposeful, not decorative**. Users notice craftsmanship, not motion.

---

## 🎬 Quick Animation Reference

### 1. Hero Entrance (First Load Only)

**Where:** Home page hero section  
**What:** Logo, metadata, heading, description, buttons fade & slide up  
**How:** Staggered by 60–80ms between elements  
**Duration:** 600ms total

**CSS Classes:**

```
animate-hero-logo          (0ms delay)
animate-hero-metadata      (60ms delay)
animate-hero-heading       (120ms delay)
animate-hero-description   (180ms delay)
animate-hero-buttons       (240ms delay)
```

---

### 2. Card Hover (Projects, Services, Why)

**Where:** All card grids  
**What:** Lift 2px, border brightens, arrow nudges right  
**How:** On hover, translateY(-2px) + arrow translateX(3px)  
**Duration:** 200ms

**CSS Classes:**

```
transition-all duration-200 ease-out hover:translate-y-[-2px]
group-hover:translate-x-[3px]  (for arrows)
```

**Example:**

```tsx
<article className="transition-all duration-200 ease-out hover:translate-y-[-2px]">
  <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-[3px]">
    View →
  </span>
</article>
```

---

### 3. Navigation Underline (Desktop)

**Where:** Top navigation links  
**What:** Underline grows left-to-right on hover  
**How:** CSS scaleX transform with transform-origin: left  
**Duration:** 200ms

**CSS Implementation:**

```css
.nav-link-underline::after {
  transform: scaleX(0);
  transform-origin: left;
}
.nav-link-underline:hover::after {
  transform: scaleX(1);
}
```

---

### 4. Scroll-In Sections (Once Per Visit)

**Where:** Project grid, services grid, why section  
**What:** Fade in + slide up when scrolled into view  
**How:** Use `useScrollReveal()` hook on section  
**Duration:** 300ms

**Implementation:**

```tsx
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export function MySection() {
  const ref = useScrollReveal();

  return (
    <section ref={ref} className="mt-10 mb-24">
      {/* Content animates when scrolled into view */}
    </section>
  );
}
```

---

### 5. Command Palette Modal

**Where:** Search palette (Cmd+K)  
**What:** Modal scales in (0.98 → 1), backdrop fades  
**How:** Modal entrance + backdrop entrance keyframes  
**Duration:** 220ms

**CSS Classes:**

```
data-[state=open]:animate-modal-entrance
data-[state=open]:animate-backdrop-entrance
```

---

### 6. Button Hover Scale

**Where:** All interactive buttons  
**What:** Subtle scale up (1.0 → 1.01)  
**How:** CSS scale transform on hover  
**Duration:** 180ms

**CSS:**

```
transition: transform 180ms ease-out;
hover:scale(1.01)
```

---

## 📊 Animation Timings

| Action            | Duration          | Easing        |
| ----------------- | ----------------- | ------------- |
| Hero entrance     | 600ms (staggered) | ease-standard |
| Card hover        | 200ms             | ease-out      |
| Nav underline     | 200ms             | ease-out      |
| Scroll reveal     | 300ms             | ease-out      |
| Modal entrance    | 220ms             | ease-out      |
| Button scale      | 180ms             | ease-out      |
| Color transitions | 160–200ms         | ease-out      |

---

## 🎨 CSS Variables Used

```css
--vx-dur-micro: 80ms --vx-dur-ui: 160ms --vx-dur-layout: 240ms
  --vx-ease-standard: cubic-bezier(0.2, 0.6, 0.2, 1);
```

---

## 🚫 DO NOT ADD

The following are **explicitly forbidden** to maintain 3/10 motion level:

- ❌ Floating logos or objects
- ❌ Particle effects
- ❌ Animated gradients
- ❌ Constant animation loops
- ❌ Scroll hijacking
- ❌ Mouse followers
- ❌ Parallax scrolling
- ❌ Glassmorphism animations
- ❌ Bouncy/spring easing
- ❌ Long durations (>300ms for interactions)
- ❌ Shadows that animate
- ❌ Multiple simultaneous animations on same element

---

## ♿ Accessibility

All animations **respect `prefers-reduced-motion`**:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

Users who prefer reduced motion will see **no animations**. Test:

```bash
# macOS
System Preferences > Accessibility > Display > Reduce motion

# Windows
Settings > Ease of Access > Display > Show animations
```

---

## 🔧 Adding New Animations

### 1. Keep it purposeful

- Does it improve hierarchy? ✅ Add it.
- Does it give interaction feedback? ✅ Add it.
- Is it decorative? ❌ Don't add it.

### 2. Follow timing guidelines

- Hover states: 180–200ms
- Entrance animations: 300–600ms
- Transitions: Use existing durations

### 3. Use CSS first

```tsx
// ✅ Good - CSS transition
<button className="transition-colors duration-180 ease-out hover:bg-surface">Click me</button>;

// ❌ Bad - JavaScript animation
const [isHovering, setIsHovering] = useState(false);
// (avoid if possible)
```

### 4. Test with prefers-reduced-motion

```tsx
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (prefersReduced) {
  // Skip animation
} else {
  // Apply animation
}
```

---

## 📈 Performance Checklist

- [x] All animations use `transform` and `opacity` (GPU-accelerated)
- [x] No layout-triggering properties animated (width, height, padding)
- [x] No JavaScript animation loops
- [x] Smooth 60fps on modern hardware
- [x] Mobile-friendly durations
- [x] No jank on scroll
- [x] Prefers-reduced-motion support

---

## 🧪 Testing Animations

### Visual Testing

1. Open site in dev tools (F12)
2. Hover over cards, nav links, buttons
3. Open search palette (Cmd+K / Ctrl+K)
4. Scroll through sections
5. Verify smooth, snappy feel

### Accessibility Testing

1. Enable "Reduce motion" in OS settings
2. Reload page
3. Verify animations do NOT play

### Performance Testing

1. Open DevTools Performance tab
2. Record interaction (e.g., hover)
3. Verify 60fps (16.67ms frames)
4. Check for layout thrashing

---

## 📋 Keyframe Reference

All keyframes defined in `src/styles.css`:

```css
@keyframes vx-hero-entrance {
} /* Fade + slide up */
@keyframes vx-scroll-reveal {
} /* Fade + slide up */
@keyframes vx-modal-entrance {
} /* Scale + fade */
@keyframes vx-backdrop-entrance {
} /* Fade backdrop */
@keyframes vx-menu-entrance {
} /* Slide down + fade */
@keyframes vx-underline-grow {
} /* ScaleX left-to-right */
@keyframes vx-arrow-nudge {
} /* TranslateX right */
```

---

## 🎓 Design Philosophy

### Why 3/10?

- **1-2/10:** No animations (boring, less polished)
- **3-4/10:** Refined, purposeful ← **VÆRØX TARGET**
- **5-6/10:** Noticeable, still professional
- **7-8/10:** Animation-heavy, user notices motion
- **9-10/10:** Decorative, flashy (not enterprise)

### The Test

**Ideal feedback after visiting VÆRØX:**

- ✅ "Feels polished and trustworthy"
- ✅ "Professional, high-quality"
- ✅ "Smooth experience"
- ❌ "Cool animations!" (means we added too much)

---

## 📚 Files to Reference

| File                                   | Purpose                      |
| -------------------------------------- | ---------------------------- |
| `src/lib/animations.ts`                | Animation constants & config |
| `src/hooks/use-scroll-reveal.ts`       | Scroll reveal hook           |
| `src/styles.css`                       | Keyframes & CSS utilities    |
| `src/components/home/hero.tsx`         | Hero entrance example        |
| `src/components/home/project-grid.tsx` | Card hover example           |
| `src/components/shell/top-nav.tsx`     | Nav underline example        |

---

## ✅ Checklist for New Features

Before adding animations to new components:

- [ ] Animation is purposeful (not decorative)
- [ ] Duration is 180–300ms
- [ ] Easing is ease-out or ease-in-out
- [ ] Uses `transform` or `opacity` (GPU-friendly)
- [ ] Respects `prefers-reduced-motion`
- [ ] Tested at 60fps
- [ ] Tested with reduced motion enabled
- [ ] Documented in this guide
- [ ] No layout thrashing
- [ ] No shadows or non-GPU properties animated

---

**Last Updated:** July 3, 2026  
**Motion Level:** 3/10 (Premium, Minimal, Refined)  
**Status:** ✅ Production Ready
