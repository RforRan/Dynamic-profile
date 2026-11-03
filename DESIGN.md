# Design System
## Dynamic Developer Portfolio (Cyberpunk Impeccable Motion)

<!-- impeccable:design-schema 1 -->

## Visual World: Cyberpunk Neural Mainframe (Neon Blue & Cyber Yellow)
A high-tech, futuristic cyberpunk user interface combining the mathematical layout precision of **IMPECCABLE** with the sharp, erratic motion design of **ANIME.JS**. The UI embodies an industrial, neon-infused terminal aesthetic while avoiding generic tropes.

### 1. Cyberpunk Design Tokens
* **Canvas Ground:** `#040711` (Deep Dark Asphalt)
* **Panel Surfaces:** `#0D1322` & `#11192C` (Gritty High-Tech Carbon Panels)
* **Primary Neon Accents:**
  * Cyber Yellow: `#FCEE09` (Primary high-voltage telemetry & buttons)
  * Neon Cyan / Blue: `#00F0FF` (Circuit lines, interactive borders, status indicators)
* **Secondary Neon Accent:**
  * Neon Magenta / Hot Pink: `#FF0055` (Failsafe alerts & chromatic glitch trails)
* **Grid & Scanlines:** 40px telemetry background grid + CRT scanline texture overlay (`pointer-events: none`).

### 2. Industrial UI Anatomy
* **Chamfered Corners (`cyber-clip`, `cyber-clip-br`):**
  Mathematical polygon clip-paths simulating stamped military-industrial carbon chassis.
* **Telemetry HUD Elements:**
  * Crosshairs (`+`) and technical hex memory markers (`HEX_0x...`).
  * Terminal diagnostic headers (`SYS.ONLINE`, `NODE: AP-SOUTHEAST`, `RUNTIME: ASTRO.SSG`).
* **Typography:**
  * Geometric Tech Display: `Orbitron` & `Share Tech Mono` for titles, metrics, and labels.
  * Body & Descriptions: `JetBrains Mono` and `Inter` for clarity.
  * Tabular numeric alignment (`font-variant-numeric: tabular-nums`).

### 3. Anime.js Cyberpunk Motion Rules
1. **The "Glitch & Flicker" Effect:**
   Keyframed irregular durations (50ms - 200ms) with steps easing (`steps(4)` / `steps(5)`), rapidly cycling `opacity: [0, 1, 0.2, 1, 0.6, 1]` and micro `skewX: [0, -2, 2, 0]` to simulate hardware power surges.
2. **High-Speed Aggressive Easing:**
   `easeOutExpo` for sudden snaps followed by immediate stops; eliminating sluggish animations.
3. **Sequential Grid Boot-Up (`anime.stagger`):**
   Rapid 20ms–30ms stagger timeline simulating system initialization:
   * Circuit lines draw in via `strokeDashoffset`.
   * Telemetry counters count up rapidly.
   * Project cards stagger-boot with scale and micro-snap.
4. **Interactive Hover Surge:**
   Card mouse-enter triggers erratic glitch transform, neon cyan glow surge, and title chromatic flash.
5. **Periodic Ambient Telemetry Pulse:**
   Random intervals (3s - 7s) trigger micro-flicker on status beacons and terminal headers.
