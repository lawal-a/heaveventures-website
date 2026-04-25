# CLAUDE.md — Heave Ventures Website

---

## Project Overview

Static website for **Heave Ventures** (heaveventures.com). Single `index.html` — no build tool, no framework, no `npm install`.

```
index.html    — all markup and inline scripts (single page)
DESIGN.md     — full design system reference
CLAUDE.md     — this file
.github/
  workflows/
    deploy.yml — Cloudflare Pages auto-deploy on push to main
```

`styles.css` and `script.js` have been removed. All styles are Tailwind utility classes. All JS is inline at the bottom of `index.html`.

---

## Tech Stack

| Concern | Tool | How it's loaded |
|---------|------|----------------|
| Utility CSS | Tailwind CSS (CDN) | `<script src="https://cdn.tailwindcss.com">` |
| Custom tokens | `tailwind.config` inline script | Immediately after Tailwind CDN tag |
| Icons | Iconify / Solar library | `<script src="https://code.iconify.design/...">` |
| Animations | GSAP 3.12.2 + ScrollTrigger | CDN `<script>` tags |
| Fonts | Google Fonts (Inter + Newsreader) | `<link>` in `<head>` |

No local asset files. No package.json. No build step. Everything is CDN or inline.

---

## Tailwind Config

Custom tokens are declared in the inline config block just after the Tailwind CDN script:

```html
<script>
  tailwind.config = {
    theme: {
      extend: {
        fontFamily: { serif: ['Newsreader', 'Georgia', 'serif'] },
        colors: {
          'hv-bg':    '#141414',
          'hv-green': '#1F6B3A',
          'hv-cream': '#E7E2DA',
          'hv-teal':  '#1D7277',
        }
      }
    }
  }
</script>
```

Use `hv-green`, `hv-cream`, etc. for semantic tokens. Use raw hex values (`text-[#1F6B3A]`) only for one-off opacity variants like `text-[#E7E2DA]/55`.

---

## Newsreader Font

Newsreader is applied via a custom CSS class, not Tailwind's font-serif utility (to avoid conflicts):

```html
<style>
  .font-serif-news { font-family: 'Newsreader', serif; }
</style>
```

Use `font-serif-news italic font-light` together for all editorial display text.

---

## Adding a New Section

1. Add the HTML block inside `<body>` in `index.html`, following the section pattern:

```html
<section id="section-id" class="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-32">

  <!-- Section label -->
  <div class="flex items-center gap-3 mb-16 fade-up">
    <iconify-icon icon="solar:ICON-linear" width="18" class="text-[#1F6B3A]"></iconify-icon>
    <span class="text-xs uppercase tracking-widest text-[#E7E2DA]/65 font-medium">Label</span>
  </div>

  <!-- Section headline -->
  <div class="mb-14 fade-up">
    <h2 class="text-4xl md:text-5xl font-normal tracking-tight leading-[1.15]">
      Hard line text <br/>
      <span class="font-serif-news italic font-light text-[#E7E2DA]/65">Soft italic line.</span>
    </h2>
  </div>

  <!-- Content -->

</section>
```

2. Add a nav link in both the desktop `<nav>` and the `#mobile-menu` nav.
3. Add `.fade-up` to any element that should animate in on scroll — GSAP picks it up automatically.

---

## Background Section Variants

Use these patterns to alternate between section backgrounds:

| Variant | Classes |
|---------|---------|
| Default dark | `relative z-10 max-w-[1400px] mx-auto ...` (no bg override) |
| Full-width mid-dark | `relative z-10 w-full border-y border-[#E7E2DA]/10 bg-[#141414]/55 backdrop-blur-md` |
| Full-width green tint | `relative z-10 w-full border-t border-[#E7E2DA]/10 bg-[#1F6B3A]/5` |
| Full-width glass | `relative z-10 w-full border-y border-[#E7E2DA]/10 bg-[#141414]/75 backdrop-blur-md` |

Always wrap the inner content in `<div class="max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-32">` for full-width sections.

---

## Cards

### Standard card
```html
<div class="border border-[#E7E2DA]/10 hover:border-[#1F6B3A]/40 rounded-[4px] p-10 bg-[#141414]/40 hover:bg-[#1F6B3A]/5 transition-all duration-500">
```

### Glass card with gradient hover overlay
```html
<div class="relative p-[1px] rounded-[4px] group">
  <div class="absolute inset-0 bg-gradient-to-b from-[#1F6B3A]/18 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[4px]"></div>
  <div class="relative bg-[#141414]/75 backdrop-blur-md border border-[#E7E2DA]/10 group-hover:border-[#1F6B3A]/30 rounded-[4px] p-10 h-full transition-colors duration-500">
    <!-- content -->
  </div>
</div>
```

### Gradient border shell (premium)
```html
<div class="relative p-[1px] rounded-[4px] overflow-hidden group inline-block">
  <div class="absolute inset-0 bg-gradient-to-r from-[#1F6B3A] via-[#E7E2DA]/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
  <a href="#" class="relative block bg-[#141414] hover:bg-[#161616] text-[#E7E2DA] px-8 py-4 rounded-[3px] text-sm">
    Button text
  </a>
</div>
```

---

## Icons

All icons use Iconify with the **Solar linear** set. Format: `solar:ICON-NAME-linear`.

```html
<iconify-icon icon="solar:buildings-3-linear" width="18" class="text-[#1F6B3A]"></iconify-icon>
```

- Section labels: `width="18"`
- Feature/service icons: `width="20"` to `width="26"`
- UI controls: `width="24"`
- Never use filled or duotone variants.

---

## Animations

### Scroll reveal (automatic)
Add `class="fade-up"` to any element. GSAP ScrollTrigger handles the rest — no extra JS needed.

```html
<div class="fade-up">...</div>
```

### Hero word reveal
Elements with `class="reveal-word"` inside the hero `<h1>` get the staggered word-reveal animation automatically on page load.

```html
<span class="overflow-hidden inline-block pb-1">
  <span class="reveal-word inline-block text-white font-normal">Word</span>
</span>
```

### Marquee ticker
Wrap items in a `div.marquee-track`. The CSS `@keyframes marquee` is defined in the `<style>` block in `<head>`. Always duplicate the content for a seamless loop.

---

## Deployment

**Cloudflare Pages** auto-deploys on every push to `main`.

```
git add .
git commit -m "your message"
git push
```

Site updates at heaveventures.com within ~30 seconds.

GitHub repo: `github.com/lawal-a/heaveventures-website`

---

## Business Details

| Field | Value |
|-------|-------|
| Email | theteam@heaveventures.com |
| Phone | +234 902 261 8668 |
| HQ | Yaba, Lagos, Nigeria |
| Website | heaveventures.com |
| Zimara | zimara.org |
| Hub One | hubone.heaveventures.com |
| InnovateX | innovatex.africa |

---

## What Not To Do

- **No `styles.css` or `script.js`** — those files are deleted. All styles = Tailwind classes. All JS = inline at bottom of `index.html`.
- **No `border-radius` outside `4px` / `3px` / `9999px`** — don't introduce new radius values.
- **No filled or duotone Solar icons** — linear stroke only.
- **No hardcoded hex colours** outside the established palette — use tokens or the documented opacity variants.
- **No `overflow-x` visible** — keep `overflow-x-hidden` on `<body>` at all times.
- **No new font weights** outside Inter's loaded set (300, 400, 500, 600).
- **No inline `style="..."` attributes** unless absolutely unavoidable (e.g. font-family fallback).
