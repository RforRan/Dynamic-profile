# Design System
## Dynamic Developer Portfolio (Impeccable Craft Specification)

<!-- impeccable:design-schema 1 -->

## Visual World: The Precision Workbench (Obsidian & Signal)
An authentic, developer-first aesthetic rooted in precision engineering, code aesthetics, and high-readability telemetry. The interface recedes into a deep, focused dark canvas, letting the developer's work and open-source metrics lead from the first viewport.

### 1. Color Palette & Surfaces
Strictly calibrated to WCAG 2.1 AA (contrast ratio $\ge 4.5:1$ for body text, $\ge 3:1$ for large headings).

* **Ground / Canvas:**
  * Background Root: `#090d16` (Deep Obsidian / Midnight Void)
  * Card Surface: `#0f172a` (Elevated Slate Dark)
  * Card Border: `rgba(255, 255, 255, 0.08)` (Subtle, crisp structure)
  * Card Border Hover: `rgba(56, 189, 248, 0.35)` (Luminous Cyan Focus)

* **Typography & Content:**
  * Foreground Primary: `#f8fafc` (Slate 50 - Ultra high contrast)
  * Foreground Secondary: `#94a3b8` (Slate 400 - Clear metadata, $\ge 4.8:1$ contrast)
  * Foreground Tertiary / Muted: `#64748b` (Slate 500)

* **Telemetry & Signal Accents:**
  * Star & Metric Accent: `#fbbf24` (Amber 400)
  * Fork & Graph Accent: `#94a3b8` (Slate 400)
  * Live Sync Status Indicator: `#10b981` (Emerald 500 - Pulsing beacon)
  * Focus Ring: `#38bdf8` (Sky 400 with 2px offset)

### 2. Typography & Hierarchy
* **Font Family:**
  * Headings & UI: System font stack / Modernist Sans (`Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`)
  * Data & Metrics: Monospace numerals with `tabular-nums` (`ui-monospace, SFMono-Regular, "Cascadia Code", "Fira Code", monospace`)
* **Scale & Rhythm:**
  * Display / Name: `text-3xl` to `text-4xl` (Mobile to Desktop), `font-bold`, `tracking-tight`
  * Section Headers: `text-2xl`, `font-semibold`, `text-slate-100`
  * Project Title: `text-lg`, `font-semibold`, `text-slate-100`
  * Body & Description: `text-sm`, `leading-relaxed`, `text-slate-400`
  * Badges & Tags: `text-xs`, `font-medium`, `tracking-wide`

### 3. Craft Floor Rules (Hard Constraints)
Per Impeccable Craft Floor:
1. **No Gradient Text:** Headlines rely on optical scale, weight, and contrast.
2. **No Kicker / Eyebrow Text:** Let the headings speak with their own structural weight.
3. **No Emoji as Icons:** All indicators use clean, inline vector SVG paths with consistent stroke geometry.
4. **No Heavy Fake Glassmorphism:** Clean dark cards with subtle borders and authentic elevation.
5. **Full Browser Surface Polish:**
   * Custom selection highlight (`::selection { background: rgba(56, 189, 248, 0.25); color: #f8fafc; }`).
   * Custom smooth scrollbar with dark track and slate thumb.
   * Visible, accessible focus rings on all interactive elements (`focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900`).

### 4. Layout & Responsive Composition
* **Container:** Max-width `max-w-6xl`, centered with fluid horizontal padding (`px-4 sm:px-6 lg:px-8`).
* **Header / Profile Section:** Compact hero containing avatar/identicon, owner handle (`@RforRan`), concise positioning, sync telemetry pill, and direct GitHub profile button.
* **Filter & Stats Bar:** Real-time project counter, sort status, and language breakdown.
* **Project Grid:**
  * Mobile (`< 640px`): 1 column
  * Tablet (`640px - 1024px`): 2 columns
  * Desktop (`> 1024px`): 3 columns
* **Project Card Anatomy:**
  * Top: Repository Name + External Link indicator
  * Middle: Repository Description (2-3 lines with clean truncate/wrap)
  * Bottom: Primary Language Badge + Star count + Fork count
