# Light Minimalist Redesign — Design Spec
**Date:** 2026-04-08  
**Project:** Smart Trucking Services Inc. website  
**Scope:** Visual redesign of all pages — no new routes, no data changes, no functional changes.

---

## Goal

Replace the current dark-navy-heavy look with a clean, modern, light minimalist aesthetic. The orange + navy brand identity is preserved; the treatment flips from dark-dominant to light-dominant.

---

## Design Decisions

| Element | Current | New |
|---|---|---|
| Page background | `bg-navy` (`#0A1628`) | White `#F8FAFC` |
| Section backgrounds | `bg-navy` / `bg-navy-mid` | White or light gray `#F1F5F9` |
| Body text | `text-white` / `text-slate` | `text-slate-700` / `text-slate-500` |
| Section headings | `text-white` | `text-navy` (`#0A1628`) |
| Navbar | Transparent → dark, no scroll behavior | `bg-white` sticky, subtle shadow on scroll |
| Hero background | Full-screen dark photo + `bg-navy/80` overlay | Light background + truck photo at `opacity-10` as texture |
| Service cards | `bg-navy border-steel` dark fill | `bg-white border border-slate-200 shadow-sm hover:shadow-md` |
| StatsBar | `bg-navy-mid border-steel` | Light gray `bg-slate-100` or white, navy text |
| TrainingCTA | Orange gradient section | Light orange tint `bg-orange-50` with navy text |
| TestimonialsSection | Dark navy bg | White or `bg-slate-50` |
| ContactStrip | Dark navy | Stays dark navy (same as footer — intentional anchor) |
| Footer | `bg-navy` | Unchanged — keeps dark anchor at bottom |

---

## Color Usage After Redesign

- `--color-navy` (`#0A1628`): headings, footer background, navbar logo, dark text
- `--color-orange` (`#F97316`): CTA buttons, icon backgrounds, hover accents, badges
- `--color-slate` (`#94A3B8`): secondary/body text (light contexts use `text-slate-600` / `text-slate-500`)
- White (`#F8FAFC`): page background, card backgrounds
- Light gray (`#F1F5F9`): alternating section backgrounds

---

## Component-by-Component Changes

### Navbar (`components/layout/Navbar.tsx`)
- Background: `bg-white` (was transparent/dark)
- Add `useScrolled` state: on scroll > 10px, add `shadow-sm border-b border-slate-100`
- Nav links: `text-slate-600 hover:text-navy`
- CTA button: `bg-orange text-white`
- Logo text: `text-navy` with `text-orange` accent

### HeroSection (`components/blocks/HeroSection.tsx`)
- Remove `bg-navy/80` dark overlay div
- Add `bg-white` base to the section
- Truck photo: change overlay to `bg-white/90` (photo bleeds through faintly at ~10% visibility)
- Badge: `bg-orange/10 border-orange/30 text-orange` — unchanged
- Headline: `text-navy` (was `text-white`)
- Subtext: `text-slate-600` (was `text-slate`)
- Primary CTA: unchanged (`bg-orange text-white`)
- Secondary CTA: `border-slate-300 text-navy hover:border-navy`
- Phone line: `text-slate-500`, number stays `text-orange`

### StatsBar (`components/blocks/StatsBar.tsx`)
- Background: `bg-slate-100 border-y border-slate-200` (was `bg-navy-mid border-steel`)
- Stat values: `text-navy`
- Labels: `text-slate-500`

### ServicesGrid (`components/blocks/ServicesGrid.tsx`)
- Section background: `bg-white` (was `bg-navy-mid`)
- Section label: `text-orange` — unchanged
- Section heading: `text-navy`
- Section subtext: `text-slate-500`
- Cards: `bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-orange/40`
- Icon container: `bg-orange/10` — unchanged
- Card title: `text-navy group-hover:text-orange`
- Card body: `text-slate-500`
- "Learn more" link: `text-orange` — unchanged

### WhyUsSection (`components/blocks/WhyUsSection.tsx`)
- Background: `bg-slate-50` (alternating section rhythm)
- Heading: `text-navy`
- Body text: `text-slate-600`
- Feature icons/accents: orange — unchanged

### TrainingCTA (`components/blocks/TrainingCTA.tsx`)
- Background: replace orange gradient with `bg-orange-50` (very light orange tint)
- Heading: `text-navy`
- Body text: `text-slate-600`
- Course list items: `text-navy`
- CTA button: `bg-orange text-white` — unchanged

### TestimonialsSection (`components/blocks/TestimonialsSection.tsx`)
- Background: `bg-white`
- Heading: `text-navy`
- Quote cards: `bg-slate-50 border border-slate-200`
- Quote text: `text-slate-700`
- Author name: `text-navy`
- Stars: `text-orange` — unchanged

### ContactStrip (`components/blocks/ContactStrip.tsx`)
- Background: **stays `bg-navy`** (intentional dark anchor, same as footer)
- Text: `text-white` — unchanged

### PageHero (`components/blocks/PageHero.tsx`)
- Background: `bg-slate-100` (was dark navy)
- Heading: `text-navy`
- Breadcrumb/subtext: `text-slate-500`

### ServiceDetail (`components/blocks/ServiceDetail.tsx`)
- Page background: white (inherits from body)
- Sidebar CTA card: `bg-orange/5 border border-orange/20`
- Related cards: same style as ServicesGrid cards

### Footer (`components/layout/Footer.tsx`)
- **No changes** — stays `bg-navy`

---

## Alternating Section Rhythm (homepage)

| Section | Background |
|---|---|
| Hero | White (photo texture) |
| StatsBar | `bg-slate-100` |
| ServicesGrid | `bg-white` |
| WhyUs | `bg-slate-50` |
| TrainingCTA | `bg-orange-50` |
| Testimonials | `bg-white` |
| ContactStrip | `bg-navy` (dark anchor) |

---

## Files to Change

1. `components/layout/Navbar.tsx`
2. `components/blocks/HeroSection.tsx`
3. `components/blocks/StatsBar.tsx`
4. `components/blocks/ServicesGrid.tsx`
5. `components/blocks/WhyUsSection.tsx`
6. `components/blocks/TrainingCTA.tsx`
7. `components/blocks/TestimonialsSection.tsx`
8. `components/blocks/PageHero.tsx`
9. `components/blocks/ServiceDetail.tsx`
10. `app/globals.css` — update `body` background to `#F8FAFC`

**No changes needed:** ContactStrip, Footer, ContactForm, data files, routes, metadata.

---

## Out of Scope

- No new pages or routes
- No changes to copy/content
- No changes to fonts or font tokens
- No animation changes
- No mobile-specific layout changes (responsive classes stay as-is)
