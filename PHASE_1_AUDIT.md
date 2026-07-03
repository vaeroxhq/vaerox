# PHASE 1 AUDIT — Complete Codebase Analysis

**Date**: July 3, 2026
**Status**: Audit Complete → Implementation Begins

---

## SECTION 1: GLOBAL TOKEN SYSTEM

### Current State
✓ Primitive tokens (colors, space, radius, motion) defined
✓ Semantic layer (dark/light mappings) implemented
✓ @theme inline for Tailwind integration
✓ Adaptive typography variables exist

### Issues Identified

#### Issue 1.1: Container Width System Is Correct But Underdocumented
- **Current**: `clamp(1024px, 90vw, 1280px)` for adaptive
- **Status**: ✓ Correct approach
- **Action**: Add breakpoint-specific container tokens for clarity

#### Issue 1.2: Typography Scaling Variables Scattered Across Breakpoints
- **Current**: Adaptive vars in root + separate mobile overrides in @media
- **Problem**: No clear reference for what each breakpoint gets
- **Action**: Create explicit breakpoint typography scale map

#### Issue 1.3: Missing Spacing Scale Reference
- **Current**: `--vx-space-1` through `--vx-space-12` defined
- **Problem**: No documentation of which spacing applies where
- **Action**: Create component spacing rules

#### Issue 1.4: Motion Tokens Exist But No Timing Matrix
- **Current**: `--vx-dur-micro`, `--vx-dur-ui`, `--vx-dur-layout`, `--vx-dur-route`
- **Problem**: No reference for which animation should use which duration
- **Action**: Create animation timing matrix

---

## SECTION 2: COMPONENT LAYER ANALYSIS

### Issue 2.1: Inline Styles Scattered Throughout
**Files Affected**: 
- `blueprint-overlay.tsx` (line 23, 32, 45) — SVG positioning
- `dossier-blocks.tsx` (line 296) — Rotation transform
- `evidence-blocks.tsx` (line 267) — Progress bar width
- `progress.tsx` (line 19) — Transform calculation
- `graph.tsx` (lines 303, 368, 378, 387) — Dimensions & positioning

**Problem**: Inline styles bypass design tokens
**Impact**: Cannot control animation/spacing globally
**Action**: Convert all inline styles to utility classes or CSS custom properties

### Issue 2.2: Magic Numbers in Components
**Examples**:
- `blueprint-overlay.tsx`: "Circle: ~20–25%", "Mark: ~10–12%" (undocumented vw values)
- `sidebar.tsx`: `SIDEBAR_WIDTH = "16rem"` (magic constant)
- `graph.tsx`: `min(78vh, 780px)`, `gridTemplateColumns: repeat(cols, ...)`
- `use-mobile.tsx`: `MOBILE_BREAKPOINT` hardcoded

**Problem**: Makes responsive behavior unpredictable
**Action**: Create breakpoint and dimension token constants

### Issue 2.3: Responsive Grid Systems Are Manual
**Files Affected**:
- `architecture.diagrams.$slug.tsx` (line 136)
- `architecture.index.tsx` (line 237)

**Problem**: Dynamic `gridTemplateColumns` computation bypasses design system
**Action**: Create responsive grid utility classes

### Issue 2.4: SVG Dimensions Not Tokenized
**Files Affected**:
- `graph.tsx`: Pattern widths (40px), heights (780px), radii (variable `r`)
- `blueprint-overlay.tsx`: Circle/mark sizing via clamp()

**Problem**: SVG dimensions aren't part of design token system
**Action**: Create SVG dimension and pattern tokens

---

## SECTION 3: RESPONSIVE SYSTEM ISSUES

### Issue 3.1: Breakpoint Inconsistency
**Current Implementation**:
- Mobile: `<768px` (correct)
- Tablet: `768–1279px` (implied)
- Desktop: `>=1280px` (implied)

**Problem**: 
- No shared breakpoint constants
- Each component defines breakpoints independently
- Tailwind uses default breakpoints, not VÆRØX breakpoints

**Action**: Create unified breakpoint token system

### Issue 3.2: Container Query Support Missing
**Current**: No container queries used
**Problem**: Components can't adapt to parent width
**Action**: Evaluate and implement container queries for better modularity

### Issue 3.3: Typography Scaling Calculation Opacity
**Current**: 8 separate `clamp()` functions with different vw% values
**Problem**: Difficult to adjust all at once
**Action**: Create typography scale token with systematic vw% progression

### Issue 3.4: Mobile Typography Overrides Scattered
**Location**: Bottom of `styles.css` (line 890+) in `@media (max-width: 767px)`
**Problem**: Duplicated token redefinition; hard to maintain
**Action**: Create dedicated mobile typography scale tokens

---

## SECTION 4: ANIMATION SYSTEM AUDIT

### Issue 4.1: Animation Timing Inconsistency
**Found Timings**:
- Hero entrance: 600ms
- Scroll reveal: 300ms
- Modal entrance: 220ms
- Menu entrance: 250ms
- Card hover: 240ms
- Logo hover: 300ms
- Button hover: 200ms
- Float: 6s infinite

**Problem**: No clear hierarchy; hard to predict motion behavior
**Action**: Create semantic animation duration system with timing matrix

### Issue 4.2: Easing Functions Limited
**Current**: Only `cubic-bezier(0.2, 0.6, 0.2, 1)` (non-standard easing)
**Problem**: Doesn't match common motion libraries (Material Design, Apple)
**Action**: Add easing function variants (ease-in, ease-out, ease-sharp)

### Issue 4.3: Animation Performance Hints Incomplete
**Current**: Only `will-change` on some animations
**Problem**: Not all frequently animated elements optimized
**Action**: Add `will-change` to all GPU-accelerated animations

### Issue 4.4: No Animation Delay Tokens
**Current**: Delays hardcoded in keyframes (0ms, 60ms, 120ms, etc.)
**Problem**: Can't adjust entrance sequence without editing keyframes
**Action**: Create delay token system

---

## SECTION 5: SPACING & LAYOUT INCONSISTENCIES

### Issue 5.1: Padding/Margin Magic Numbers
**Examples Found**:
- `card-hover`: No explicit padding rules
- Components use various padding values: `p-5`, `p-6`, `px-4`, `py-3`, `px-8`, etc.
- Inconsistent between sections

**Problem**: Visual hierarchy breaks across pages
**Action**: Create spacing matrix for all component types

### Issue 5.2: Gap Values Vary by Context
**Found Values**: No consistent `gap-` usage across grids
**Problem**: Card spacing unpredictable
**Action**: Define grid gap scale (4px, 8px, 16px, 24px, 32px)

### Issue 5.3: Section Vertical Spacing
**Current**: Inconsistent `mt-` and `mb-` values across pages
**Problem**: Rhythm broken; pages feel disjointed
**Action**: Create section spacing tokens

---

## SECTION 6: COLOR & CONTRAST ISSUES

### Issue 6.1: Semantic Color Usage Incomplete
**Current**: 5 state colors defined (success, warning, danger, info, neutral)
**Problem**: No accent colors, focus states not all defined
**Action**: Complete semantic color palette

### Issue 6.2: Dark/Light Parity Not Tested
**Current**: Light mode colors defined but not visually verified
**Problem**: Light mode may have contrast issues
**Action**: Test color contrast in both light and dark modes

---

## SECTION 7: ACCESSIBILITY GAPS

### Issue 7.1: Focus Ring Animations Not Consistent
**Current**: `animate-focus-ring` exists but not applied everywhere
**Problem**: Keyboard navigation lacks visual feedback
**Action**: Audit all interactive elements for focus styles

### Issue 7.2: Touch Target Sizes
**Current**: No minimum touch target enforcement
**Problem**: Small buttons (<44px) fail mobile UX
**Action**: Add minimum dimensions for touch targets

### Issue 7.3: prefers-reduced-motion Implementation
**Current**: Global rule exists
**Problem**: Not tested across all animations
**Action**: Verify all 15+ animations respect preference

---

## SECTION 8: CODE QUALITY ISSUES

### Issue 8.1: Component Prop Drilling
**Observed**: Components pass many className props
**Problem**: Hard to maintain consistent styling
**Action**: Create component style composition system

### Issue 8.2: Duplicated CSS Classes
**Current**: `card-hover`, `card-hover-on`, `card-hover-elevation` all similar
**Problem**: Maintenance nightmare
**Action**: Consolidate card styling

### Issue 8.3: Utility Class Explosion
**Current**: 94+ @utility definitions found
**Problem**: Overwhelming; some could be CSS variables instead
**Action**: Audit utilities; consolidate where possible

### Issue 8.4: SVG Styling Scattered
**Problem**: SVG stroke/fill colors hardcoded in components
**Action**: Create SVG styling system

---

## SECTION 9: PERFORMANCE ISSUES

### Issue 9.1: Layout Shift Candidates
**Found**: Inline style computations in:
- `progress.tsx` — Dynamic transform
- `graph.tsx` — Dynamic grid columns
- `blueprint-overlay.tsx` — SVG positioning

**Problem**: May cause CLS issues
**Action**: Audit and optimize

### Issue 9.2: Animation GPU Acceleration Incomplete
**Current**: Transform + opacity animated
**Problem**: Some components may animate other properties
**Action**: Audit all @keyframes for non-GPU-safe properties

### Issue 9.3: No Lazy Loading or Code Splitting Strategy
**Current**: All components imported statically
**Problem**: Bundle size not optimized
**Action**: Identify lazy-load candidates

---

## SECTION 10: INTEGRATION ISSUES

### Issue 10.1: Tailwind Prefix Unused
**Config**: `"prefix": ""` in components.json
**Problem**: No namespace protection
**Action**: Evaluate if prefix needed

### Issue 10.2: Shadcn Components Override
**Current**: Shadcn compatibility layer in @theme
**Problem**: May conflict with VÆRØX design
**Action**: Audit shadcn usage; replace if necessary

### Issue 10.3: TanStack Start SSR Not Optimized
**Current**: No specific SSR style optimization
**Problem**: Flash of unstyled content possible
**Action**: Verify CSS-in-JS strategy

---

## AUDIT SUMMARY

| Category | Issues Found | Severity |
|----------|--------------|----------|
| Global Tokens | 4 | Medium |
| Components | 4 | High |
| Responsive | 4 | High |
| Animation | 4 | Medium |
| Spacing/Layout | 3 | High |
| Color/Contrast | 2 | Medium |
| Accessibility | 3 | High |
| Code Quality | 4 | Medium |
| Performance | 3 | High |
| Integration | 3 | Low |

**Total Issues**: 34  
**Critical Path Items**: 18  
**Estimated Refactoring Effort**: 8–12 hours

---

## PHASE 1 IMPLEMENTATION PLAN

### Phase 1B: Design Token System Creation
1. ✓ Audit complete (this document)
2. Create breakpoint tokens
3. Create component spacing matrix
4. Create typography scale matrix
5. Create animation timing matrix
6. Create animation delay tokens
7. Document all tokens in CSS

### Phase 1C: Global CSS Refactoring
1. Consolidate animation utilities
2. Remove duplicated CSS
3. Add missing focus states
4. Create responsive grid utilities
5. Optimize CSS size

---

**Status**: Ready for Phase 1B → Implementation
