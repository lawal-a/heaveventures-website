# Heave Ventures — Design System

Design reference for heaveventures.com. Everything here maps directly to CSS custom properties in `styles.css`.

---

## Colour Palette

| Token               | Hex       | Usage                                      |
|---------------------|-----------|--------------------------------------------|
| `--bg`              | `#121212` | Page background, section `--dark`          |
| `--bg-dark`         | `#0d0d0d` | Footer background                          |
| `--bg-card`         | `#1a1a1a` | Cards on dark sections                     |
| `--bg-charcoal`     | `#1e1e1e` | Alternating section background             |
| `--green-deep`      | `#1b4d27` | Service cards, dark-green sections, accents|
| `--green-mid`       | `#2d7a3a` | Secondary green, timeline gradients        |
| `--green-accent`    | `#4abe5c` | Primary interactive colour, labels, icons  |
| `--green-light`     | `#6ee07e` | Button hover states                        |
| `--white`           | `#ffffff` | Headings, logo, nav active                 |
| `--off-white`       | `#e8e8e8` | Body text default                          |
| `--muted`           | `#888888` | Footer links, secondary text              |
| `--border`          | `rgba(255,255,255,0.08)` | Card and divider borders   |
| `--border-green`    | `rgba(74,190,92,0.25)`   | Card hover borders         |

### Background usage rule
- Hero, Why We Exist, Services, Software, Contact → `--bg` (`#121212`)
- Approach, Case Studies → `--bg-charcoal` (`#1e1e1e`)
- About, Why Heave Ventures → `--green-deep` (`#1b4d27`)

---

## Typography

Font: **Inter** via Google Fonts (weights 300, 400, 500, 600, 700, 800).

| Role         | Size (clamp / rem)           | Weight | Tracking       |
|--------------|------------------------------|--------|----------------|
| Hero H1      | clamp(2.4rem, 5.5vw, 4.5rem) | 700    | –0.03em        |
| Section H2   | clamp(1.75rem, 3.5vw, 2.875rem) | 700 | –0.025em       |
| Card H3      | 1.0625rem                    | 600    | —              |
| Feature H4   | 0.9375rem                    | 600    | —              |
| Body large   | 1.0625rem                    | 400    | —              |
| Body default | 0.875rem–0.9375rem           | 400    | —              |
| Label        | 0.6875rem                    | 700    | +0.14em (caps) |
| Nav links    | 0.8125rem                    | 500    | —              |

**Colour rule:** All headings use `--white`. All body copy uses `rgba(232,232,232,0.72)` (approximately 72% opacity on `--off-white`). Labels always use `--green-accent`.

---

## Spacing Scale

Based on an 8px unit. Section vertical padding lives in `--section-py`.

| Token           | Value  |
|-----------------|--------|
| `--section-py`  | 112px (desktop) → 80px (≤820px) → 64px (≤480px) |
| Container gap   | 32px horizontal (20px on ≤480px) |
| Card padding    | 28px–40px depending on card size |
| Grid gap        | 18px–24px standard; 72px for two-column copy+stats |

---

## Border Radius

| Token     | Value | Used on                          |
|-----------|-------|----------------------------------|
| `--r-sm`  | 6px   | Buttons, nav CTA, badge tags     |
| `--r-md`  | 10px  | (reserved, not yet used)         |
| `--r-lg`  | 16px  | Cards, panels, stat cards        |

---

## Geometric Motifs

Taken directly from the slide deck.

### Triangle Grid
A 5×5 grid of right-triangle polygons in three green shades (`--green-deep`, `--green-mid`, `--green-accent`). Used in:
- **Hero** — top-right, `opacity: 0.52`, responsive width `clamp(360px, 50%, 640px)`
- **Contact CTA** — corner accent triangles at 0.5–0.7 opacity

### Dot Grid
Shrinking circles in a matrix pattern (heavier → lighter top-left to bottom-right). Used in the About / Stats section location card.

### Chevron Notch (service cards)
`clip-path: polygon(0 0, calc(100% - 22px) 0, 100% 22px, 100% 100%, 22px 100%, 0 calc(100% - 22px))` — creates a cut corner effect matching the deck's service card shapes. **Do not add `border-radius` to service cards** — clip-path overrides it.

---

## Layout Grid

```
Max container width: 1200px
Horizontal padding:  32px (20px mobile)
```

| Section             | Grid columns                           |
|---------------------|----------------------------------------|
| Hero                | Full-width flex, text left-aligned     |
| About               | 2-col (1fr 1fr), gap 72px             |
| Why We Exist        | 3-col (repeat 3, 1fr), gap 20px       |
| Services            | 3-col (repeat 3, 1fr), gap 20px       |
| Approach            | Single column, max-width 720px centred |
| Clients             | 5-col (repeat 5, 1fr), gap 18px       |
| Case Studies        | 2-col (1fr 1fr), gap 24px             |
| Software            | 2-col (240px 1fr), gap 72px           |
| Why Heave           | 4-col (repeat 4, 1fr), gap 20px       |
| Footer              | 2-col (280px 1fr), gap 64px           |

---

## Responsive Breakpoints

| Breakpoint | Behaviour changes                                                    |
|------------|----------------------------------------------------------------------|
| ≤1060px    | Clients → 3-col; Why Heave → 2-col; Footer nav → 4-col (stacks brand) |
| ≤960px     | About → 1-col; Why We Exist → 2-col; Services → 2-col; Software → 1-col |
| ≤820px     | Nav collapses to hamburger; Hero geo opacity drops; section-py → 80px |
| ≤760px     | Case Studies → 1-col; Footer nav → 2-col                            |
| ≤580px     | Why cards → 1-col; Steps → narrower columns                         |
| ≤540px     | Services → 1-col; Why Heave → 1-col                                 |
| ≤520px     | About stats → 1-col                                                  |
| ≤480px     | Hero actions stack; contact actions stack; section-py → 64px        |

---

## Animation

| Pattern           | Implementation                                          |
|-------------------|---------------------------------------------------------|
| Scroll reveal     | `.reveal` → `IntersectionObserver` adds `.visible`. Stagger per sibling: `idx × 80ms` delay |
| Button hover      | `translateY(-2px)` + `box-shadow` over 220ms            |
| Card hover        | `translateY(-4px)` or `-5px` over 280ms                 |
| Arrow nudge       | `translateX(5px)` on service card arrow hover           |
| Hero scroll pulse | CSS keyframe `scrollPulse` — fade-in/out scale line     |
| Nav active        | JS `IntersectionObserver` toggles `.active` class       |

Easing tokens:
- `--ease`: `cubic-bezier(.22,.68,0,1.2)` — slight overshoot (spring feel)
- `--ease-out`: `cubic-bezier(0,0,.2,1)` — fast-in, slow-out (standard decel)

---

## Section Header Pattern

Every section title block uses the same structure:

```html
<div class="section-header reveal">
  <p class="label">Section label in caps</p>
  <h2>Headline text</h2>
</div>
```

- Default: centred, `max-width: 600px`, `margin: 0 auto 72px`
- The `.section-header` is always a `.reveal` element

---

## Buttons

Two variants:

| Class          | Background         | Text colour | Hover                         |
|----------------|--------------------|-------------|-------------------------------|
| `.btn--primary`| `--green-accent`   | `#0c1a0e`   | `--green-light`, lift + glow  |
| `.btn--ghost`  | transparent        | `--off-white`| `--green-accent` border+text |

Size modifier: `.btn--lg` → `padding: 16px 34px; font-size: 0.9375rem`

---

## Logo Mark

SVG-only. A 2×2 grid of rectangles with triangle cutouts creating the overlapping H-like monogram:
- Top-left and bottom-right: `--green-accent`
- Top-right and bottom-left: `--green-mid`
- Triangle cutouts match background colour

---

## Do / Don't

| Do | Don't |
|----|-------|
| Use `--green-accent` for interactive labels and CTAs | Mix green shades arbitrarily — use tokens |
| Use `clip-path` notch on service cards | Add `border-radius` to service cards (clip-path overrides it) |
| Keep all section headers centred | Arbitrarily left-align section headers |
| Use Inter at defined weights | Use weights outside 400/500/600/700/800 |
| All SVG icons as inline SVG | Load SVG icons as `<img>` (breaks colour theming) |
| `rgba(232,232,232,0.72)` for body copy on dark | Use pure white `#fff` for body copy |
