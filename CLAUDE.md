# CLAUDE.md — Heave Ventures Website

This file tells Claude Code how to work with this repository.

---

## Project Overview

Static website for **Heave Ventures** (heaveventures.com). Three files, no build tool, no framework.

```
index.html   — all page markup (single page)
styles.css   — full design system + layout
script.js    — scroll reveal, nav, stat counters
DESIGN.md    — design system reference
CLAUDE.md    — this file
```

---

## Architecture

**No build step.** Open `index.html` directly in a browser, or `open index.html` from the terminal. There is no `npm install`, no `package.json`, no bundler.

Fonts are loaded from Google Fonts via `<link>` in `<head>`. All icons are inline SVG. No external libraries or CDN scripts beyond the Google Font.

---

## Making Changes

### Adding a new section

1. Write the HTML block in `index.html` following the pattern:
   ```html
   <section class="[name] section--[dark|charcoal|dark-green]" id="[name]">
     <div class="container">
       <div class="section-header reveal">
         <p class="label">SECTION LABEL</p>
         <h2>Section headline</h2>
       </div>
       <!-- section content -->
     </div>
   </section>
   ```
2. Add corresponding CSS in `styles.css` under a clearly labelled comment block.
3. If the section needs a nav link, add it to both the main `<nav class="nav__links">` and the `<nav class="footer__nav">` footer.

### Editing copy

All copy is in `index.html`. No CMS, no data files.

### Colours and spacing

All values live in `:root` custom properties at the top of `styles.css`. **Never hardcode a colour or spacing value** — always use a token or derive from an existing token. See `DESIGN.md` for the full token table.

---

## Conventions

- **BEM-lite naming**: block `section-name`, element `section-name__part`, modifier `section-name--variant`.
- **Reveal animation**: Add `class="reveal"` to any element that should animate in on scroll. The `IntersectionObserver` in `script.js` picks it up automatically and staggers siblings by `80ms × index`.
- **Section backgrounds**: Use the three helper classes `section--dark`, `section--charcoal`, `section--dark-green` to alternate section backgrounds. Never set background directly on a section.
- **Icons**: Always inline SVG. Use `width` and `height` attributes on the `<svg>`. Stroke colour should be `#4abe5c` (or `#0c1a0e` for dark-background accent cards). Never use `<img>` for icons.
- **SVGs are not `display: block` globally** — that was a bug that got fixed. Only `img` elements are block by default. SVG icons flow with text naturally.
- **Service cards**: Use `clip-path` for the chevron notch. Do not add `border-radius` — clip-path overrides it.
- **Hero content**: `hero__content` is a plain `div` inside a `div.container`, not the container itself. Do not merge them or the hero text will center instead of left-align.

---

## Responsive Design

Breakpoints are documented in `DESIGN.md`. The most important ones:

- `≤820px` — hamburger nav kicks in; hero geo fades
- `≤960px` — most 3-col and 2-col grids collapse to single column
- `≤480px` — button stacks, contact actions stack, base padding shrinks

Always add mobile breakpoints when adding a new multi-column layout. Pattern:
```css
.new-grid { grid-template-columns: repeat(3, 1fr); gap: 20px; }
@media (max-width: 960px) { .new-grid { grid-template-columns: 1fr 1fr; } }
@media (max-width: 580px) { .new-grid { grid-template-columns: 1fr; } }
```

---

## Content Reference

All content comes from the **Heave Ventures 2026 Intro Deck**.

| Section          | Source slide |
|------------------|--------------|
| Hero             | Slide 1      |
| About / Stats    | Slide 2      |
| Why We Exist     | Slide 3      |
| What We Do       | Slide 4      |
| Our Approach     | Slide 5      |
| Who We Serve     | Slide 6      |
| Case Studies     | Slides 7–10  |
| Software         | Slide 11     |
| Why Heave        | Slide 12     |
| Contact          | Slide 13     |

### Key details

- Email: `theteam@heaveventures.com`
- Phone: `+234 902 261 8668`
- HQ: Yaba, Lagos, Nigeria
- Products: Zimara.org · Hub One (hubone.heaveventures.com) · InnovateX (innovatex.africa) · VentureOS

---

## What Not To Do

- Do not add a JS framework (React, Vue, etc.) without discussing it — the current zero-dependency approach is intentional for performance and simplicity.
- Do not add `!important` except on nav CTA overrides where specificity conflicts are unavoidable.
- Do not inline styles in HTML (`style="..."`).
- Do not introduce a CSS reset library — the existing `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }` is sufficient.
- Do not change font weights to values not in the Google Fonts load string (`300;400;500;600;700;800`).
- Do not commit API keys, tokens, or secrets of any kind.
