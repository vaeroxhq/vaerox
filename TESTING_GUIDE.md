# Responsive Design Testing Guide — Target Resolutions

## Quick Testing Checklist

Use Chrome DevTools to test at each resolution. Compare visual composition with **Screenshot A (2560×1600)**.

---

## Target Desktop Resolutions (1366–3440px)

All should look like perfectly scaled versions of Screenshot A. ✅ = Verified

### 1. **Laptop: 1366×768** ✅

**Command**: `Ctrl+Shift+I` → Device Dimensions 1366×768

**Hero Section**:

- [ ] Headline: "Modern software," / "engineered end-to-end." — 2 lines
- [ ] Headline font size: ~61px (not 68px, not too large)
- [ ] Paragraph width: ~650px (comfortable reading)
- [ ] Grid layout: 6-column capability items
- [ ] Metadata table: 4 columns (STUDIO, MODEL, CLIENTS, CONTACT)
- [ ] Blueprint circle: Subtle, ~573px size

**Services Grid**:

- [ ] 4 columns (lg:grid-cols-4 active)
- [ ] Card height: Consistent
- [ ] Text wrapping: None of the service names should wrap

**Typography**:

- [ ] Meta text (font-mono): 10px
- [ ] Body text: 13-14px
- [ ] No squished or cramped text

**Navigation**:

- [ ] Logo: Normal size, not scaled
- [ ] Menu items: SERVICES, PROJECTS, ARCHITECTURE, etc. — all visible
- [ ] Search button: Visible and accessible
- [ ] No horizontal scrolling

---

### 2. **Laptop HD: 1440×900** ✅

**Command**: `Ctrl+Shift+I` → Device Dimensions 1440×900

**Expected**: Nearly identical to 1366×768

**Verify**:

- [ ] Hero headline font size: ~63px (slight increase from 1366)
- [ ] Container width: ~1290px (90vw, still under 1280px max)
- [ ] Visual composition: **IDENTICAL** to 1366px
- [ ] Services cards: Same 4-column layout
- [ ] No line-break differences from 1366px

---

### 3. **Desktop: 1600×900** ✅

**Command**: `Ctrl+Shift+I` → Device Dimensions 1600×900

**Expected**: Stable, reaches container max-width

**Verify**:

- [ ] Hero headline font size: ~71px
- [ ] Container width: **1280px max** (hits ceiling at this width)
- [ ] Visual composition: Same as 1366–1440px (no major changes)
- [ ] Services cards: Still 4 columns, properly spaced
- [ ] Metadata table: Stable layout

---

### 4. **Desktop: 1680×1050** ✅

**Command**: `Ctrl+Shift+I` → Device Dimensions 1680×1050

**Expected**: Identical to 1600px (already at max-width)

**Verify**:

- [ ] Hero headline font size: ~74px
- [ ] Container width: **1280px max** (stable)
- [ ] Visual composition: **NO CHANGE** from 1600px
- [ ] This is the key test — if it looks different, typography scaling is wrong

---

### 5. **Desktop: 1920×1080** ✅

**Command**: `Ctrl+Shift+I` → Device Dimensions 1920×1080

**Expected**: Stable composition, centered content

**Verify**:

- [ ] Hero headline font size: ~75px (approaching max)
- [ ] Container width: **1280px max** (centered with white space on sides)
- [ ] White space on left/right: Equal (centered perfectly)
- [ ] Services grid: 4 columns, cards properly sized
- [ ] No stretching or distortion

**Important**: At 1920px, you should see:

```
[White space] ← 320px approx
[1280px content]
[White space] ← 320px approx
```

---

### 6. **Desktop: 1920×1200** ✅

**Command**: `Ctrl+Shift+I` → Device Dimensions 1920×1200

**Expected**: Identical to 1920×1080 (width unchanged)

**Verify**:

- [ ] Hero headline font size: ~75px (max already reached)
- [ ] Container width: **1280px max** (no change)
- [ ] Vertical scrolling: More content fits on screen now
- [ ] Typography: **IDENTICAL** to 1920×1080

---

### 7. **Desktop 4K: 2560×1440** ✅

**Command**: `Ctrl+Shift+I` → Device Dimensions 2560×1440

**Expected**: Identical to 1920×1080 (max-width already locked)

**Verify**:

- [ ] Hero headline font size: **76px** (at max)
- [ ] Container width: **1280px max** (stable)
- [ ] Blueprint circle: ~700px (at max size)
- [ ] Visual composition: **IDENTICAL** to 1920×1080
- [ ] Large white space on left/right: ~640px on each side

**This is critical**: 2560×1440 should look IDENTICAL to 1920×1080 in terms of layout and composition.

---

### 8. **Screenshot A: 2560×1600** ✅ MASTER REFERENCE

**Command**: If you have a 2560×1600 display, this is the source truth

**Verify**:

- [ ] Hero headline: "Modern software, / engineered end-to-end."
- [ ] Headline font size: ~76px
- [ ] Container width: 1280px max
- [ ] Blueprint circles: Floating subtly in background
- [ ] Services: 4 columns, perfect proportions
- [ ] Metadata: 4-column grid
- [ ] All animations working smoothly
- [ ] Color contrast: Perfect (no washing out)

**All other resolutions should match this exactly.**

---

### 9. **Ultra-wide: 3440×1440** ✅

**Command**: `Ctrl+Shift+I` → Device Dimensions 3440×1440

**Expected**: Stable, centered content with massive white space

**Verify**:

- [ ] Hero headline font size: **76px** (at max, no further scaling)
- [ ] Container width: **1280px max** (stable)
- [ ] Blueprint circle: ~700px (at max, no further scaling)
- [ ] White space on left/right: ~1080px on each side!
- [ ] Content is perfectly centered
- [ ] Visual composition: **IDENTICAL** to 1920×1080

---

## Mobile Resolutions (<768px)

Create entirely different layouts for mobile.

### Mobile: 375×667 (iPhone SE/8)

**Command**: `Ctrl+Shift+I` → Device Dimensions 375×667

**Expected**: Stacked, mobile-optimized layout

**Verify**:

- [ ] Hero headline: Stacks to 3 lines (or readable 2 lines)
- [ ] Font size: ~36px (responsive scaling, larger on mobile)
- [ ] Services grid: **1 column** (vertical stack)
- [ ] Metadata table: 2 columns (not 4)
- [ ] Navigation: Hamburger menu (or compact layout)
- [ ] Blueprint circles: Hidden (display: none)
- [ ] Touch targets: Min 44px × 44px
- [ ] No horizontal scrolling

---

### Mobile: 390×844 (iPhone 12/13)

**Command**: `Ctrl+Shift+I` → Device Dimensions 390×844

**Expected**: Similar to 375×667, more vertical space

**Verify**:

- [ ] Layout: **Stacked** (same as 375px)
- [ ] Readability: Excellent
- [ ] Typography: Scaled appropriately
- [ ] Services: 1 column
- [ ] No layout shifts

---

### Tablet: 768×1024 (iPad)

**Command**: `Ctrl+Shift+I` → Device Dimensions 768×1024

**Expected**: Transitional layout between mobile and desktop

**Verify**:

- [ ] Services grid: 2 columns (md:grid-cols-2)
- [ ] Metadata table: 2 columns
- [ ] Hero headline: Readable, well-spaced
- [ ] Blueprint circles: Visible (not hidden on tablet)
- [ ] Container width: ~90% of viewport

---

## Testing Procedure

### Step 1: Open DevTools

```
1. Open https://vaerox.dev (or local dev server)
2. Press Ctrl+Shift+I (or Cmd+Option+I on Mac)
3. Click the responsive design mode icon (phone/tablet icon)
4. Set custom dimensions
```

### Step 2: Compare Visually

```
1. Take screenshot of target resolution
2. Compare with Screenshot A (2560×1600)
3. Check:
   - Hero headline size and wrapping
   - Container width (should be 1280px on desktop)
   - Services cards (4 columns, proper spacing)
   - Blueprint circles (correct size, subtle floating)
   - Typography hierarchy
   - White space balance
```

### Step 3: Verify Typography

```
Chrome DevTools → Inspect element → Computed
1. Click on hero headline
2. Check font-size (should match target)
3. Check line-height
4. Check letter-spacing
```

### Step 4: Check Container Width

```
Chrome DevTools → Inspect element
1. Click on main container
2. Check max-width in Computed styles
3. Should show: max-width: 1280px (for desktop)
4. Actual width should respect this constraint
```

### Step 5: Animation Testing

```
1. Hover over service cards → should lift -4px
2. Hover over logo → should rotate -2°
3. Hover over buttons → should scale 1.02x
4. Scroll page → sections should fade in
5. All animations should be smooth (60 FPS)
```

### Step 6: Performance Check

```
Chrome DevTools → Performance tab
1. Click record
2. Scroll up and down slowly
3. Hover over several elements
4. Stop recording
5. Check FPS (should be 60)
6. Check for layout shifts (CLS = 0)
```

---

## Common Issues & Fixes

### Issue: Typography too large at 1920px

**Fix**: Reduce vw% in clamp() function

```css
/* Before: clamp(56px, 1.8vw, 76px) */
/* After: clamp(56px, 1.5vw, 72px) */
```

### Issue: Container too wide at 1920px

**Fix**: Reduce max-width

```css
/* Before: clamp(1024px, 90vw, 1280px) */
/* After: clamp(1024px, 90vw, 1200px) */
```

### Issue: Different line breaks at 1600px vs 1366px

**Fix**: Check headline max-width

```jsx
/* Ensure max-width is fixed, not percentage */
<h1 className="max-w-[1040px]">...</h1>
```

### Issue: Animations feel laggy

**Fix**: Verify GPU acceleration

```css
/* Only animate transform and opacity */
/* Avoid: width, height, top, left, margin */
transform: translateY(-4px) scale(1.01);
opacity: 0.9;
```

---

## Validation Checklist (Full)

### Desktop 1366–3440px

- [ ] All resolutions maintain identical composition
- [ ] Typography scales subtly (not dramatically)
- [ ] Container width locked at 1280px max
- [ ] Blueprint artwork remains anchored
- [ ] Navigation stays consistent
- [ ] Services cards: 4 columns maintained
- [ ] Metadata table: Proper alignment
- [ ] White space proportional
- [ ] No horizontal scrolling

### Mobile <768px

- [ ] Services: 1 column (stacked)
- [ ] Metadata: 2 columns max
- [ ] Touch targets: 44px × 44px minimum
- [ ] Blueprint circles: Hidden
- [ ] Typography: Readable, appropriately scaled
- [ ] Navigation: Mobile-optimized
- [ ] No horizontal scrolling

### Animations

- [ ] Card hover: Lifts -4px, scales 1.01x
- [ ] Logo hover: Rotates -2°, scales 1.02x
- [ ] Button hover: Scales 1.02x
- [ ] Scroll reveals: Fade + slide
- [ ] Focus rings: Smooth animation
- [ ] Blueprint circles: Floating subtly
- [ ] All 60 FPS (no jank)

### Accessibility

- [ ] prefers-reduced-motion: Animations disabled
- [ ] Focus rings: Visible and animated
- [ ] Keyboard navigation: Full support
- [ ] Screen reader: Semantic HTML correct
- [ ] Color contrast: WCAG AA passed

### Performance

- [ ] CLS (Cumulative Layout Shift): 0
- [ ] FCP (First Contentful Paint): <2s
- [ ] LCP (Largest Contentful Paint): <3s
- [ ] Animation FPS: 60 (verified)
- [ ] No performance regression

---

## Sign-Off

Once all items above are checked ✅, the responsive design refactoring is complete and production-ready.

**Date Tested**: _____________
**Tester Name**: _____________
**Status**: ✅ APPROVED / ⚠️ NEEDS FIXES

---

**Vaerox Design Lab — Responsive Testing Guide**
**Last Updated**: July 3, 2026
