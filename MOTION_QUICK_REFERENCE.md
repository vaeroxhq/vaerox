# Premium Motion System — Quick Reference

## Animation Utilities Cheat Sheet

### Card Interactions

```jsx
// Service, project, or standard cards
<div className="animate-card-hover-elevation">{/* Lifts -4px and scales 1.01x on hover */}</div>
```

**Effect**: Smooth elevation + subtle scale + shadow
**Timing**: 240ms
**Best for**: Cards, tiles, boxes

### Button CTAs

```jsx
// Primary call-to-action buttons
<button className="animate-button-cta-hover">Book a call →</button>
```

**Effect**: Scales 1.02x on hover, 0.98x on active
**Timing**: 200ms
**Best for**: Primary actions, links

### Logo/Brand Interaction

```jsx
// Logo or brand elements
<a to="/" className="animate-logo-hover">
  <Logo />
</a>
```

**Effect**: Rotates -2° and scales 1.02x on hover
**Timing**: 300ms
**Best for**: Logo, hero mark, brand elements

### Background Floating

```jsx
// Decorative SVG or floating elements
<svg className="animate-float-subtle">{/* Floats up/down 8px continuously */}</svg>
```

**Effect**: Continuous vertical float
**Timing**: 6s infinite
**Best for**: Background artwork, circles, decorations

### Scroll Reveal

```jsx
// Use with useScrollReveal hook
const ref = useScrollReveal();
<section ref={ref} className="mt-10 mb-24">
  {/* Fades + slides up when scrolled into view */}
</section>;
```

**Effect**: Fade in + translateY slide
**Timing**: 300ms one-time
**Best for**: Sections, grids, main content

### Focus Ring Animation

```jsx
// Form elements
<input className="animate-focus-ring" />
```

**Effect**: Smooth focus ring with 2px/4px outline
**Timing**: 160ms
**Best for**: Form inputs, focusable elements

### Link Hover Glow

```jsx
// Text links
<a href="#" className="hover-text-glow">
  Link text
</a>
```

**Effect**: Subtle text shadow on hover
**Timing**: 200ms
**Best for**: Hyperlinks, navigation

---

## Timing Reference

| Use Case                 | Duration | Easing   | CSS Variable      |
| ------------------------ | -------- | -------- | ----------------- |
| Micro interactions       | 80ms     | ease-out | `--vx-dur-micro`  |
| UI states (hover, focus) | 160ms    | standard | `--vx-dur-ui`     |
| Layout changes           | 240ms    | standard | `--vx-dur-layout` |
| Route transitions        | 400ms    | standard | `--vx-dur-route`  |

Standard easing: `cubic-bezier(0.2, 0.6, 0.2, 1)` (smooth, refined)

---

## Color & Theme Utilities

### Semantic Colors

```css
--bg-canvas: Background --bg-surface: Slightly raised --bg-raised: Cards/modals --bg-hover: Hover
  state --text-1: Primary text (white) --text-2: Secondary text (bright gray) --text-3: Tertiary
  text (dim gray) --line-1: Primary borders --line-2: Secondary borders --line-3: Subtle borders;
```

### Focus Ring

```css
--focus-ring: Keyboard focus color (white/black);
```

---

## Responsive Typography

### Using Adaptive Typography

```jsx
<h1 className="text-display-adaptive">
  Modern software, engineered end-to-end.
</h1>

<p className="text-md-adaptive">
  Description paragraph scaling smoothly
</p>
```

**Supported sizes:**

- `text-display-adaptive` (56px–76px)
- `text-3xl-adaptive` (36px–48px)
- `text-2xl-adaptive` (28px–38px)
- `text-xl-adaptive` (22px–30px)
- `text-lg-adaptive` (18px–24px)
- `text-md-adaptive` (15px–19px)
- `text-sm-adaptive` (13px–17px)
- `text-xs-adaptive` (11px–15px)

All scale subtly from 1366px to 2560px, then hold stable.

---

## Container Widths

```jsx
// Use adaptive container (home page)
<div className="w-adaptive mx-auto px-8">
  {/* clamped 1024px–1280px */}
</div>

// Use shell width (content pages)
<div className="w-shell mx-auto px-6 md:px-10 lg:px-16">
  {/* clamped to 1280px */}
</div>

// Use prose width (article text)
<article className="max-w-[720px]">
  {/* Fixed width, no clamping */}
</article>
```

---

## Accessibility Best Practices

### Respecting Reduced Motion

All animations automatically respect `prefers-reduced-motion: reduce`:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
  }
}
```

Users with motion sensitivity experience:

- No animations
- Instant transitions
- Identical functionality

### Keyboard Navigation

- Focus rings visible and animated
- Tab order logical
- No keyboard traps
- Arrow keys supported in components

### Screen Readers

- `aria-hidden="true"` on decorative elements
- Semantic HTML
- ARIA labels where needed
- Form labels associated

---

## Common Patterns

### Card Grid with Hover

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-line-1">
  {items.map((item) => (
    <a href={`/${item.slug}`} className="bg-canvas px-4 py-4 group animate-card-hover-elevation">
      <h3 className="text-[17px] group-hover:text-text-1 transition-micro">{item.name}</h3>
      <span className="group-hover:translate-x-[3px] transition-transform">→</span>
    </a>
  ))}
</div>
```

### Scroll Reveal Section

```jsx
export function MySection() {
  const ref = useScrollReveal();

  return (
    <section ref={ref} className="mt-10 mb-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-line-1">
        {items.map((item) => (
          <article key={item.id} className="bg-canvas p-4">
            {/* Content */}
          </article>
        ))}
      </div>
    </section>
  );
}
```

### Premium Button

```jsx
<button className="font-mono text-[11px] text-text-1 uppercase tracking-[0.14em] animate-button-cta-hover">
  Take action →
</button>
```

### Navigation Link with Underline

```jsx
<Link
  to="/services"
  className="relative px-4 font-mono text-[11px] uppercase transition-colors hover:text-text-1"
>
  Services
  <span className="absolute bottom-0 left-4 right-4 h-px bg-text-3 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
</Link>
```

---

## Performance Tips

### ✅ Do Use

- `transform` for movement
- `opacity` for visibility
- `filter` (light usage) for effects
- `transition` on interactive elements

### ❌ Don't Use

- Animating `width`, `height`, `margin`
- Animating `top`, `left`, `right`, `bottom`
- Heavy `box-shadow` animations
- Multiple simultaneous animations on same element

### Debugging Performance

```javascript
// Check if animations are smooth
Performance.mark("animation-start");
// ... animation happens ...
Performance.mark("animation-end");
Performance.measure("animation", "animation-start", "animation-end");
```

Use Chrome DevTools Performance tab to verify 60 FPS.

---

## Adding New Animations

1. **Define keyframe** in `styles.css`:

```css
@keyframes vx-your-animation {
  from {
    /* styles */
  }
  to {
    /* styles */
  }
}
```

2. **Create utility**:

```css
@utility animate-your-animation {
  animation: vx-your-animation 240ms var(--vx-ease-standard) both;
}
```

3. **Use in component**:

```jsx
<element className="animate-your-animation">
```

---

## Motion Philosophy

This system follows these principles:

1. **Purposeful**: Every animation serves a UX purpose
2. **Subtle**: Motion enhances but doesn't distract
3. **Consistent**: Same timing and easing throughout
4. **Accessible**: Respects user preferences
5. **Premium**: Inspired by Apple, Linear, Stripe
6. **Performant**: GPU-accelerated, 60 FPS
7. **Restrained**: 5-7 interactions, not excessive

---

## Resources

- **CSS Easing Reference**: https://easings.net/
- **Animation Performance**: https://web.dev/animations-guide/
- **Accessibility**: https://www.w3.org/WAI/WCAG21/Understanding/
- **prefers-reduced-motion**: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion

---

## Troubleshooting

### Animations feel laggy

- Check that only `transform` and `opacity` are animated
- Verify 60 FPS in DevTools Performance
- Reduce animation count on same element

### Animations not showing

- Verify `prefers-reduced-motion` isn't enabled
- Check that timing value isn't 0ms
- Ensure animation class is applied to correct element
- Check browser console for errors

### Focus rings not visible

- Verify `:focus-visible` selector is supported
- Check that `--focus-ring` color contrasts with background
- Ensure `outline-offset: 2px` is present

### Mobile animations feel slow

- Check device performance with DevTools
- Consider reducing motion intensity on touch devices
- Test on actual mobile device, not just emulation

---

## Version History

- **v1.0** (July 2026): Initial premium motion system
  - 7 core keyframes
  - Card hover elevation
  - Logo rotation
  - Button interactions
  - Scroll reveals
  - Focus ring animation
  - Background floating

---

**Last Updated**: July 3, 2026
**Maintained by**: Vaerox Design Lab
**Status**: Production Ready ✅
