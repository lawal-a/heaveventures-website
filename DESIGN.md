---
version: "1.0"
name: "Heave Ventures"
description: "Full design system for heaveventures.com — dark atmospheric base, editorial serif/sans type pairing, green accent, glass surfaces, grid blueprint aesthetic."
colors:
  primary: "#1F6B3A"
  secondary: "#E7E2DA"
  tertiary: "#1D7277"
  neutral: "#E7E2DA"
  background: "#141414"
  surface: "#1F6B3A"
  text-primary: "#E7E2DA"
  text-secondary: "#FFFFFF"
  border: "#E7E2DA"
  accent: "#1F6B3A"
typography:
  display-lg:
    fontFamily: "Newsreader"
    fontSize: "88px"
    fontWeight: 300
    lineHeight: "88px"
    letterSpacing: "-0.025em"
  body-md:
    fontFamily: "Inter"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: "26px"
  label-md:
    fontFamily: "Inter"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: "20px"
rounded:
  md: "4px"
spacing:
  base: "4px"
  sm: "1px"
  md: "4px"
  lg: "8px"
  xl: "10px"
  gap: "3px"
  card-padding: "48px"
  section-padding: "32px"
components:
  button-primary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.background}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    padding: "16px"
  button-secondary:
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.md}"
    padding: "10px"
  button-link:
    textColor: "{colors.secondary}"
    rounded: "0px"
    padding: "0px"
---

## Overview

Heave Ventures embodies a refined, high-contrast aesthetic that blends industrial precision with organic editorial warmth. The design logic centres on a "monolith and grid" composition — a dark, atmospheric base palette punctuated by purposeful, high-saturation green accents. The mood is professional, ambitious, and architectural, emphasising clarity and structural integrity in every element.

- **Mood:** Preserve a heave, ventures, embodies, refined, high-contrast tone — never default to a generic SaaS look.
- **Composition cues:** Grid · Full Bleed · Glassy · Strong grid lines

---

## Colors

The system uses a dark-mode-first palette with `#1F6B3A` as the main accent and `#E7E2DA` as the warm neutral foundation.

| Role | Value | Usage |
|------|-------|-------|
| **Primary** | `#1F6B3A` | Main accent, emphasis, action states, icon fills |
| **Secondary** | `#E7E2DA` | Warm neutral — primary button bg, body text |
| **Tertiary** | `#1D7277` | Reserved for supporting contrast moments |
| **Background** | `#141414` | Base page background |
| **Surface** | `#1F6B3A` / `#141414/80` | Card surfaces (glass or green tint) |
| **Text Primary** | `#E7E2DA` | Default body and UI copy |
| **Text Secondary** | `#FFFFFF` | Headings, high-emphasis content |
| **Border** | `rgba(231,226,218,0.10)` | Card and section borders |
| **Accent** | `#1F6B3A` | Interactive highlights |

**Gradient:**
```
bg-gradient-to-r from-[#1F6B3A] to-transparent via-[#E7E2DA]/40
```

**Opacity scale for body text on dark:**
- `text-[#E7E2DA]/70` — primary body copy
- `text-[#E7E2DA]/55` — secondary / supporting copy
- `text-[#E7E2DA]/45` — labels, metadata
- `text-[#E7E2DA]/28` — footer, de-emphasised text

---

## Typography

Pairs **Newsreader** (display/editorial) with **Inter** (UI/body). Google Fonts CDN.

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;1,6..72,300;1,6..72,400&display=swap" rel="stylesheet">
```

| Token | Family | Size | Weight | Line-height | Tracking |
|-------|--------|------|--------|-------------|---------- |
| `display-lg` | Newsreader | 88px | 300 | 88px | -0.025em |
| H1 (hero) | Inter | clamp(3.5rem→5.25rem) | 400 | 1.06 | tight |
| H2 (section) | Inter | clamp(2.5rem→3.25rem) | 400 | 1.15 | tight |
| H3 (card) | Inter | 1.125rem | 500–600 | 1.3 | — |
| `body-md` | Inter | 16px | 400 | 26px | — |
| `label-md` | Inter | 14px / 11px | 500–700 | 20px | +0.12–0.16em (caps) |

**Type rules:**
- Hero accents: Newsreader italic weight-300, colour `#1F6B3A` or `#E7E2DA/65`
- Section sub-headlines: Newsreader italic for the "soft" line, Inter normal for the "hard" line
- All section labels: uppercase, `tracking-widest`, `#E7E2DA/65`, 11–14px

---

## Layout

- **Max container width:** 1400px (`max-w-[1400px] mx-auto px-6 md:px-12`)
- **Column grid:** Visual structure reinforced by a persistent fixed overlay partitioning space into 25%, 50%, 75% columns + border-x container lines
- **Base unit:** 4px
- **Scale:** 1px, 4px, 8px, 10px, 12px, 16px, 20px, 24px
- **Section padding:** `py-24 md:py-32` (96px / 128px)
- **Card padding:** `p-10` (40px) to `p-12` (48px)
- **Gaps between grid items:** `gap-[3px]` — tight blueprint gap between tiles
- **Content width:** Full bleed within container

**Corner squares (framing accent):**
```html
<div class="absolute -left-[3px] top-24 w-[5px] h-[5px] border border-[#E7E2DA]/40 bg-[#141414]"></div>
```
Applied at four corners of the container lines overlay.

---

## Elevation & Depth

- **Surface recipe:** `bg-[#141414]/75 backdrop-blur-md` — glass first
- **Border:** `border border-[#E7E2DA]/10` default; `border-[#1F6B3A]/30` on hover/highlight
- **Radial glow:** `bg-[#1F6B3A]/10 blur-[150px]` fixed at top-right viewport — ambient green light source
- **Dot grid:** `radial-gradient(#E7E2DA 1px, transparent 1px)` at 32px × 32px, `opacity-[0.14]`
- **Shadows:** Direct drop-shadows are minimal — depth via gradient shells and border framing
- **Corner radius:** `rounded-[4px]` on all structural containers, cards, and buttons

### Gradient border shell (premium card treatment)
```html
<div class="relative p-[1px] rounded-[4px] overflow-hidden">
  <div class="absolute inset-0 bg-gradient-to-r from-[#1F6B3A] via-[#E7E2DA]/40 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
  <div class="relative bg-[#141414] rounded-[3px] p-8">
    <!-- content -->
  </div>
</div>
```

---

## Components

### Buttons

| Variant | Background | Text | Border | Radius |
|---------|-----------|------|--------|--------|
| **Primary** | `#E7E2DA` → `#FFFFFF` hover | `#141414` | none | `4px` |
| **Gradient border** | `#141414` with gradient shell | `#E7E2DA` | gradient shell | `4px` outer / `3px` inner |
| **Ghost / outline** | transparent | `#E7E2DA` | `border-[#E7E2DA]/20` | `4px` |

Padding: `px-8 py-4` standard · `px-10 py-5` large

### Section label
```html
<div class="flex items-center gap-3">
  <iconify-icon icon="solar:*-linear" width="18" class="text-[#1F6B3A]"></iconify-icon>
  <span class="text-xs uppercase tracking-widest text-[#E7E2DA]/65 font-medium">Label Text</span>
</div>
```

### Status dot (active indicator)
```html
<div class="w-1.5 h-1.5 rounded-full bg-[#1F6B3A] shadow-[0_0_8px_#1F6B3A]"></div>
```

### Logo mark
Three skewed bars: white (h-4), white (h-5/h-6), green (h-3/h-4). `-skew-x-12` on each.
```html
<div class="flex gap-[3px] h-6 items-end">
  <div class="w-2.5 h-5 bg-white -skew-x-12"></div>
  <div class="w-2.5 h-6 bg-white -skew-x-12"></div>
  <div class="w-2.5 h-4 bg-[#1F6B3A] -skew-x-12"></div>
</div>
```

### Stats display
```html
<div class="font-serif-news italic font-light text-white tracking-tight flex items-baseline gap-1 text-[5rem] leading-none">
  25<span class="text-3xl text-[#1F6B3A]">k</span>
</div>
```

---

## Shapes

| Token | Value | Used on |
|-------|-------|---------|
| Sharp | `4px` | All cards, buttons, badges, containers |
| Pill | `9999px` | Dot indicators only |
| None | `0px` | Link buttons |

Skewed shapes (`-skew-x-12`) reserved exclusively for logo bars.

---

## Iconography

- **Library:** Solar (via Iconify CDN)
- **Style:** Linear stroke only — no filled or duotone variants
- **Size:** 18px for section labels · 20–26px for feature icons · 24px for nav/UI
- **Colour:** `text-[#1F6B3A]` on dark surfaces

```html
<script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"></script>
<iconify-icon icon="solar:buildings-3-linear" width="18" class="text-[#1F6B3A]"></iconify-icon>
```

---

## Motion

| Pattern | Implementation |
|---------|---------------|
| Hero word reveal | GSAP `fromTo` — `y: 110%`, `rotateZ: 1.5deg` → `y: 0`, stagger `0.09s`, `power4.out` |
| Scroll fade-up | GSAP `ScrollTrigger` — `y: 38px`, `opacity: 0` → defaults, `start: "top 88%"` |
| Button hover | Tailwind `transition-colors` 200ms |
| Card hover | `transition-all duration-500` — border-color + background tint |
| Gradient border reveal | `opacity: 0.5` → `opacity: 1` on group-hover, `duration-500` |
| Marquee ticker | CSS `@keyframes marquee` — `translateX(0) → translateX(-50%)`, 32s linear infinite |

**Durations:** 150ms · 500ms · 700ms · 1100ms
**Libraries:** GSAP 3.12.2 + ScrollTrigger (CDN)

---

## Do's and Don'ts

### Do
- Use `#1F6B3A` as the single accent colour for all interactive and emphasis states
- Pair Newsreader italic with Inter normal for every section headline split
- Apply `gap-[3px]` between grid tile items — this is the blueprint gap
- Use `rounded-[4px]` consistently — don't introduce new radius values
- Keep all surfaces glass-first: `bg-[#141414]/75 backdrop-blur-md`
- Use Solar linear icons only — no other icon sets or styles
- Animate all new content sections with `.fade-up` + GSAP ScrollTrigger

### Don't
- Don't introduce extra accent colours — `#1D7277` is reserved for contrast moments only
- Don't mix shadow or blur recipes outside the established system
- Don't use filled or duotone Solar icons — linear only
- Don't add `border-radius` values other than `4px`, `3px` (gradient inner), or `9999px`
- Don't use `font-weight` values outside Inter's loaded set (300, 400, 500, 600)
- Don't add horizontal overflow — maintain `overflow-x-hidden` on `<body>` at all times
