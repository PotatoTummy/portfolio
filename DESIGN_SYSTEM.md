# Design System & Web Implementation Guide
**Project:** Samad Kausar — Portfolio 2026  
**Status:** Living Design Language & Engineering Standard  
**Single Source of Truth:** `src/styles/theme.ts`

---

## 1. Core Visual Principles

### 1.1 Contrast & High-Craft Legibility
- **Never render low-contrast text:** All body and header text must meet or exceed WCAG AA contrast standards.
- Dark canvas (`#0B0B0A` or project gradient): Text defaults to `#F3F3EE` or electric cyan (`#00D4FF`), with muted elements no lower than `rgba(243, 243, 238, 0.75)`.
- Light canvas (`#EFEAE4`): Text defaults to deep charcoal (`#121211`), with secondary annotations at `#0284C7` (deep cerulean blue). Never fade text below 60% opacity.

### 1.2 Viewport Integrity & Overlap Prevention
- **Safe Viewport Zones:** Fixed/sticky stages (e.g. Hero, Studio, System Console, Contact) must strictly bound elements so hardware mockups and typography never collide or get clipped by browser chrome or floating action buttons.
- **Dedicated Columns & Z-Indexing:** Never place large text elements and action card stacks at the same vertical coordinates without wrapping constraints.
- **Mobile First Scalability:** All clamp scales must have safe minimums (e.g. `clamp(32px, 6vw, 96px)`) to prevent overflow on mobile displays (`< 640px`).

---

## 2. Color Palette & Thematic Mapping

### 2.1 Global Core Palette
| Token | Hex / Value | Role |
| :--- | :--- | :--- |
| `bgDark` | `#0B0B0A` | Primary obsidian background |
| `bgWarmCream` | `#EFEAE4` | Editorial warm paper transition canvas |
| `primaryBlue` | `#00D4FF` | Electric cyan brand accent & active state |
| `deepBlue` | `#0284C7` | Cerulean blue for editorial light canvas |
| `textLight` | `#F3F3EE` | High-contrast light text |
| `textDark` | `#121211` | Deep charcoal for warm cream canvas |

### 2.2 Project-Specific Thematic Palettes (Selected Work)
Every project possesses its own unique, rich, colorful background reflecting its domain:

1. **Nestys Multi-Portal Ecosystem (`nestys`)**:
   - *Domain:* Enterprise microservices, B2B order pipelines & video moderation.
   - *Palette:* Deep Sapphire to Electric Cyan (`#021226` → `#07294D` → `#00D4FF`).
   - *Accent:* `#00D4FF` (Electric Cyan).

2. **Scrollr / LinkPlay (`scrollr`)**:
   - *Domain:* Vertical video player & cinematic media streaming.
   - *Palette:* Midnight Violet to Electric Hot Pink (`#18022B` → `#3B0D59` → `#FF007A`).
   - *Accent:* `#FF2E93` (Neon Rose / Magenta).

3. **WoKataa / Kite Clash (`wokataa`)**:
   - *Domain:* Real-time multiplayer card gaming & sub-40ms WebSocket sync.
   - *Palette:* Midnight Forest to Cyber Jade (`#012217` → `#064E3B` → `#10B981`).
   - *Accent:* `#10B981` (Cyber Emerald).

4. **Earth Air Condition (`earth-air`)**:
   - *Domain:* Commercial HVAC enterprise & clean climate tech.
   - *Palette:* Solar Bronze to Warm Amber (`#261102` → `#5C2B04` → `#F59E0B`).
   - *Accent:* `#F59E0B` (Solar Amber).

5. **UrbanArena Platform (`urban-arena`)**:
   - *Domain:* Sports facility reservation & multi-tenant venue management.
   - *Palette:* Night Stadium Indigo to Electric Violet (`#17042B` → `#3B0D66` → `#A855F7`).
   - *Accent:* `#A855F7` (Electric Amethyst).

### 2.3 Contact Page Color Mandate
- **All contact text must be blue (`#00D4FF`).**
- **On hover, any interactive contact element smoothly transitions to pure white (`#FFFFFF`).**
- Zero text collision: The cycling multilingual greeting is positioned with clear separation from the contact email and navigation links.

---

## 3. Motion & Animation Standards

### 3.1 Scroll-Driven Scrubbing
- Scrub animations must map cleanly to bounded section progress `[0, 1]`.
- Always use easing curves (e.g., cubic-bezier or smooth Hermite step `t * t * (3 - 2 * t)`) to prevent abrupt visual jumps.

### 3.2 3D Device Alignment
- **Straight, Non-Tilted Portals:** For zoom portals (such as the MacBook Pro System Console), devices must be rendered straight on (`rotateX = 0`, `rotateY = 0`), aligned symmetrically in the center of the viewport.
- **Realistic Laptop Motion Cycle:**
  1. Closed lid (`-90°` or folded) on initial entry.
  2. Lid opens smoothly as user scrolls into the section (`0°` upright open).
  3. Screen display illuminates.
  4. Camera zooms cleanly and directly into the center of the screen display, without skewing off-center into corners or charts.

### 3.3 Reel Swipe Mechanics (Scrollr Simulation)
- Reel cards must execute a **full 100% vertical swipe** (`0%` → `-100%` → `-200%`) when scrolling through the mobile showcase, simulating genuine gesture-driven reel transitions rather than a tiny nudge.

---

## 4. Engineering & Web Best Practices

1. **Zero Cumulative Layout Shift (CLS = 0):** All images and 3D device containers must specify explicit aspect ratios or reserved bounding envelopes.
2. **GPU Acceleration:** Transform properties (`translate3d`, `scale`, `rotateX/Y`) must employ `transform-gpu` or `will-change` sparingly to maintain 60 FPS on high-density displays.
3. **Accessibility:** Form fields, links, and buttons must provide clear keyboard `:focus-visible` styling (`outline: 2px solid #00D4FF`).
4. **Single Source of Truth:** Import color tokens and themes directly from `@/styles/theme` rather than hardcoding ad-hoc hex values.

