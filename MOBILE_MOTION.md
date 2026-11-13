# Mobile Motion System & Architecture Guide (`MOBILE_MOTION.md`)

**Target Viewport:** Mobile screens (`≤ 768px` / touch devices)  
**Standard:** 60 FPS on mid-range Android & iOS Safari devices with zero layout thrashing.

---

## 1. Core Mobile Animation Rules

1. **Hardware-Accelerated Properties Only:**
   - Animate **ONLY** `transform` (`x`, `y`, `scale`, `rotate`) and `opacity`.
   - **NEVER** animate `width`, `height`, `top`, `left`, `margin`, or `padding`. Use CSS Grid 0fr→1fr for expanding heights.
2. **Zero Blur & Backdrop-Filter on Active Mobile Scroll:**
   - Do **NOT** apply `backdrop-filter: blur(...)` to scrolling elements or active cards.
   - Use high-contrast solid or semi-transparent backgrounds (`rgba(18, 18, 17, 0.95)`).
3. **Shadow Budget:**
   - Replace deep multi-layered `box-shadow` with a single 1px border (`border-white/10`) and a subtle gradient tint.
4. **Pause Offscreen Animations:**
   - All continuous animations (live FPS graph, radar sweeps, video loops) must unmount or pause when offscreen using `IntersectionObserver` or Framer Motion's `useInView`.
5. **Prefers-Reduced-Motion Compliance:**
   - When active, swap all translation (`y: 16 → 0`) to immediate opacity fades without visual movement.

---

## 2. Touch-Native Easter Eggs Gesture Map (7/7 Secrets)

| # | Secret ID | Desktop Trigger | **Mobile Touch Equivalent** | Feedback & Payoff |
|---|---|---|---|---|
| **01** | `konami` | Keyboard ↑↑↓↓←→←→BA | **Virtual Gamepad Modal / Swipe Pad:** Tap gamepad button in Secrets Hub or swipe combo | Unlocks `/archive` with haptic vibration `navigator.vibrate([60, 60, 120])` |
| **02** | `perf` | Type "perf" / Cmd+K | **Double-Tap Status / Hero FPS Chart:** Double-tap IST Online pill or Hero FPS graph | Slides up Live Web Vitals HUD |
| **03** | `blueprint` | Type "blueprint" | **Long-Press on Brand Logo:** Hold "SK" logo for 500ms | Haptic buzz `navigator.vibrate(10)` & toggles layout bounds |
| **04** | `diagram` | Press "D" on keyboard | **Triple-Tap on Project Card / Architecture [D] button** | Opens interactive System Architecture sheet |
| **05** | `console` | DevTools Console (F12) | **In-App Mobile Dev Terminal:** Tap "Dev Terminal" in Secrets Hub | Interactive bash sheet with recruiter letter & ASCII art |
| **06** | `archive` | Type "archive" | **5-Tap Sequence on Footer Badge:** Tap "Portfolio 2026" 5 times | Warps directly to `/archive` |
| **07** | `hello` | 5 clicks on "Hello." | **5-Tap Sequence on Greeting Card:** Tap the multilingual greeting 5 times | Animated progress counter (`1/5... 5/5`) & unlock reward |

---

## 3. Section Motion Implementations

- **Hero:** Line-by-line `fadeUp` reveal, stacked 44px+ touch CTAs, device orientation / gentle float for monitor dashboard. Live FPS graph throttled to 10fps SVG update.
- **Studio (Reels):** CSS horizontal scroll-snap inside phone frame (`scroll-snap-type: x mandatory`). Real finger momentum, zero JS scroll math, dots driven by `IntersectionObserver`.
- **Engineering Approach:** Stacked overlapping sticky cards (`position: sticky; top: X`). Single-shot code typewriter on entry.
- **Selected Work:** Swipeable horizontal snap cards (one project per screen), CSS grid accordion for Engineering Receipts, bottom-sheet Architecture viewer.
- **Contact / Footer:** Auto-hiding bottom action bar on scroll-down, reveal on scroll-up. Bottom-sheet Menu.
