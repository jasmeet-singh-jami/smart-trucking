# Light Minimalist Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Flip the site from dark-navy-dominant to clean white/light with navy+orange as accents — no functional changes, visual only.

**Architecture:** Each component is updated independently. Changes are purely class/style swaps — no structural refactoring. The dark footer and ContactStrip remain as intentional dark anchors; everything above them becomes light.

**Tech Stack:** Next.js 16 App Router, Tailwind CSS v4 (utility classes generated from `@theme {}` tokens in `globals.css`), Framer Motion v11.

---

## Task 1: Global body background

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Update body background color**

In `app/globals.css`, change line 29:
```css
body {
  background-color: var(--color-white);   /* was var(--color-navy) */
  color: var(--color-navy);               /* was var(--color-white) */
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

- [ ] **Step 2: Verify dev server shows white background**

Run: `npm run dev` and open `http://localhost:3000`  
Expected: Page background is now white/light. Text will look wrong on many sections — that's expected. We fix each component in subsequent tasks.

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "feat: flip body background to light for minimalist redesign"
```

---

## Task 2: Navbar — white sticky with scroll shadow

**Files:**
- Modify: `components/layout/Navbar.tsx`

The navbar currently goes `bg-transparent` → `bg-navy` on scroll. We change it to `bg-white` always, adding a subtle `shadow-sm border-b border-slate-100` on scroll.

- [ ] **Step 1: Update nav container classes**

In `components/layout/Navbar.tsx`, replace the `className` on the `<motion.nav>` element (line 43–46):

```tsx
className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
  scrolled ? "shadow-sm border-b border-slate-100" : ""
}`}
```

- [ ] **Step 2: Update logo text**

Replace line 53–56:
```tsx
<Link href="/" className="flex items-center gap-2 text-navy font-heading font-bold text-lg">
  <Truck className="text-orange w-6 h-6" />
  <span>Smart <span className="text-orange">Trucking</span></span>
</Link>
```

- [ ] **Step 3: Update desktop nav link buttons**

Replace the Services dropdown trigger (line 62–64):
```tsx
<button className="flex items-center gap-1 text-slate-600 hover:text-navy text-sm font-medium transition-colors">
  Services <ChevronDown className="w-4 h-4" />
</button>
```

Replace the Training dropdown trigger (line 78–80):
```tsx
<button className="flex items-center gap-1 text-slate-600 hover:text-navy text-sm font-medium transition-colors">
  Training <ChevronDown className="w-4 h-4" />
</button>
```

Replace the Drug Testing link (line 92):
```tsx
<a href="https://smarttesting.ca" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-navy text-sm font-medium transition-colors">
  Drug Testing
</a>
```

Replace Renewals and Downloads links (lines 95–96):
```tsx
<Link href="/renewals" className="text-slate-600 hover:text-navy text-sm font-medium transition-colors">Renewals</Link>
<Link href="/downloads" className="text-slate-600 hover:text-navy text-sm font-medium transition-colors">Downloads</Link>
```

- [ ] **Step 4: Update right-side portal links**

Replace lines 101–105:
```tsx
<a href="https://clientportal.smartrucking.ca" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-navy text-xs transition-colors">
  Client Portal
</a>
<a href="https://admin.smartrucking.ca" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-navy text-xs transition-colors">
  Employee
</a>
```

- [ ] **Step 5: Update desktop dropdown menus**

Replace Services dropdown panel (lines 66–73):
```tsx
<div className="absolute top-full left-0 mt-1 w-64 bg-white border border-slate-200 rounded-lg shadow-lg py-2 z-50">
  {services.map((s) => (
    <Link key={s.href} href={s.href} className="block px-4 py-2 text-sm text-slate-600 hover:text-navy hover:bg-slate-50 transition-colors">
      {s.label}
    </Link>
  ))}
</div>
```

Replace Training dropdown panel (lines 82–89):
```tsx
<div className="absolute top-full left-0 mt-1 w-56 bg-white border border-slate-200 rounded-lg shadow-lg py-2 z-50">
  {trainingLinks.map((t) => (
    <Link key={t.href} href={t.href} className="block px-4 py-2 text-sm text-slate-600 hover:text-navy hover:bg-slate-50 transition-colors">
      {t.label}
    </Link>
  ))}
</div>
```

- [ ] **Step 6: Update mobile toggle button**

Replace line 113:
```tsx
<button className="lg:hidden text-navy" onClick={() => setMobileOpen(!mobileOpen)}>
```

- [ ] **Step 7: Update mobile menu panel**

Replace lines 121–144:
```tsx
{mobileOpen && (
  <div className="lg:hidden bg-white border-t border-slate-100 px-4 pb-4 shadow-lg">
    <div className="pt-4 space-y-3">
      <p className="text-slate-400 text-xs uppercase tracking-widest">Services</p>
      {services.map((s) => (
        <Link key={s.href} href={s.href} className="block text-sm text-slate-600 hover:text-navy" onClick={() => setMobileOpen(false)}>
          {s.label}
        </Link>
      ))}
      <p className="text-slate-400 text-xs uppercase tracking-widest pt-2">Training</p>
      {trainingLinks.map((t) => (
        <Link key={t.href} href={t.href} className="block text-sm text-slate-600 hover:text-navy" onClick={() => setMobileOpen(false)}>
          {t.label}
        </Link>
      ))}
      <div className="pt-2 space-y-2 border-t border-slate-100">
        <a href="https://smarttesting.ca" target="_blank" rel="noopener noreferrer" className="block text-sm text-slate-600">Drug Testing ↗</a>
        <Link href="/renewals" className="block text-sm text-slate-600" onClick={() => setMobileOpen(false)}>Renewals</Link>
        <Link href="/downloads" className="block text-sm text-slate-600" onClick={() => setMobileOpen(false)}>Downloads</Link>
        <Link href="/contact" className="block text-center bg-orange text-white text-sm font-semibold px-4 py-2 rounded-lg" onClick={() => setMobileOpen(false)}>
          Contact Us
        </Link>
      </div>
    </div>
  </div>
)}
```

- [ ] **Step 8: Verify in browser**

Open `http://localhost:3000` — navbar should be white, links slate, CTA orange. Scroll down — shadow appears. Mobile hamburger should be navy icon.

- [ ] **Step 9: Commit**

```bash
git add components/layout/Navbar.tsx
git commit -m "feat: redesign navbar to white sticky with scroll shadow"
```

---

## Task 3: HeroSection — light background with faded photo texture

**Files:**
- Modify: `components/blocks/HeroSection.tsx`

Current: dark photo + `bg-navy/80` overlay. New: white base, photo faded to ~10% via `bg-white/90` overlay.

- [ ] **Step 1: Replace the dark overlay div with a light one**

In `components/blocks/HeroSection.tsx`, replace line 18:
```tsx
{/* Light overlay — photo bleeds through at ~10% */}
<div className="absolute inset-0 bg-white/90" />
```

- [ ] **Step 2: Remove the dot grid (it was orange-on-dark, looks wrong on light)**

Delete lines 21–27 (the subtle dot grid div):
```tsx
{/* dot grid removed — not needed on light bg */}
```

- [ ] **Step 3: Update headline color**

Replace line 43:
```tsx
className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-navy leading-tight"
```

- [ ] **Step 4: Update subtext color**

Replace line 53:
```tsx
className="text-slate-600 text-lg sm:text-xl mt-6 max-w-2xl mx-auto"
```

- [ ] **Step 5: Update secondary CTA button**

Replace lines 77–82:
```tsx
<Link
  href="/services"
  className="inline-flex items-center gap-2 border border-slate-300 hover:border-navy text-navy font-semibold px-8 py-4 rounded-xl transition-colors text-base"
>
  Explore Services
</Link>
```

- [ ] **Step 6: Update phone line**

Replace lines 86–96:
```tsx
<motion.p
  className="text-slate-500 text-sm mt-6"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.6, delay: 0.5 }}
>
  Or call us directly:{" "}
  <a href="tel:9055816105" className="text-orange hover:text-orange-light font-medium transition-colors">
    905-581-6105
  </a>
</motion.p>
```

- [ ] **Step 7: Verify in browser**

`http://localhost:3000` — hero should be light with faint truck photo visible through white overlay, navy headline, orange CTAs.

- [ ] **Step 8: Commit**

```bash
git add components/blocks/HeroSection.tsx
git commit -m "feat: redesign hero to light background with faded photo texture"
```

---

## Task 4: StatsBar — light gray background with navy text

**Files:**
- Modify: `components/blocks/StatsBar.tsx`
- Modify: `components/blocks/StatCounter.tsx`

- [ ] **Step 1: Update StatsBar section background**

In `components/blocks/StatsBar.tsx`, replace line 5:
```tsx
<section className="bg-slate-100 border-y border-slate-200 py-10">
```

- [ ] **Step 2: Update StatCounter text colors**

In `components/blocks/StatCounter.tsx`, replace line 37:
```tsx
<div className="text-4xl font-heading font-bold text-navy">
```

Replace line 40:
```tsx
<div className="text-slate-500 text-sm mt-1">{label}</div>
```

- [ ] **Step 3: Verify in browser**

Stats bar at `http://localhost:3000` should be light gray, numbers navy.

- [ ] **Step 4: Commit**

```bash
git add components/blocks/StatsBar.tsx components/blocks/StatCounter.tsx
git commit -m "feat: redesign stats bar to light gray with navy text"
```

---

## Task 5: ServicesGrid — white section, outlined cards

**Files:**
- Modify: `components/blocks/ServicesGrid.tsx`

- [ ] **Step 1: Update section background and heading colors**

In `components/blocks/ServicesGrid.tsx`, replace line 18:
```tsx
<section className="bg-white py-20">
```

Replace line 23:
```tsx
<h2 className="font-heading font-bold text-3xl sm:text-4xl text-navy mt-2">Our Services</h2>
```

Replace line 24:
```tsx
<p className="text-slate-500 mt-3 max-w-xl mx-auto">
```

- [ ] **Step 2: Update card styles**

Replace line 43:
```tsx
className="group flex flex-col gap-4 bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-orange/40 rounded-xl p-6 transition-all"
```

- [ ] **Step 3: Update card title color**

Replace line 49:
```tsx
<h3 className="font-heading font-semibold text-navy text-base group-hover:text-orange transition-colors">
```

- [ ] **Step 4: Update card body text color**

Replace line 51:
```tsx
<p className="text-slate-500 text-sm mt-1 leading-relaxed">{service.shortDescription}</p>
```

- [ ] **Step 5: Verify in browser**

Services section should be white, cards outlined with soft shadow on hover.

- [ ] **Step 6: Commit**

```bash
git add components/blocks/ServicesGrid.tsx
git commit -m "feat: redesign services grid to white section with outlined cards"
```

---

## Task 6: WhyUsSection — slate-50 background, navy text

**Files:**
- Modify: `components/blocks/WhyUsSection.tsx`

- [ ] **Step 1: Update section background**

In `components/blocks/WhyUsSection.tsx`, replace line 32:
```tsx
<section className="bg-slate-50 py-20">
```

- [ ] **Step 2: Update section heading**

Replace line 37:
```tsx
<h2 className="font-heading font-bold text-3xl sm:text-4xl text-navy mt-2">
```

- [ ] **Step 3: Update large feature card**

Replace line 44:
```tsx
className="lg:col-span-2 bg-white border border-slate-200 shadow-sm rounded-2xl p-8"
```

Replace line 53:
```tsx
<h3 className="font-heading font-bold text-2xl text-navy mb-3">{items[0].title}</h3>
```

Replace line 54:
```tsx
<p className="text-slate-600 leading-relaxed">{items[0].description}</p>
```

- [ ] **Step 4: Update small feature cards**

Replace line 62:
```tsx
className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6"
```

Replace line 72:
```tsx
<h3 className="font-heading font-semibold text-navy text-lg mb-2">{item.title}</h3>
```

Replace line 73:
```tsx
<p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
```

- [ ] **Step 5: Verify in browser**

Why Us section should be light gray-50, cards white with soft borders.

- [ ] **Step 6: Commit**

```bash
git add components/blocks/WhyUsSection.tsx
git commit -m "feat: redesign why-us section to light with white cards"
```

---

## Task 7: TrainingCTA — light orange tint, navy text

**Files:**
- Modify: `components/blocks/TrainingCTA.tsx`

Currently uses an orange gradient background. New: very light orange tint (`bg-orange-50` = Tailwind's `#FFF7ED`), navy text.

Note: Tailwind v4 auto-generates `bg-orange-50` from Tailwind's default palette even without a custom token. Verify it renders before committing.

- [ ] **Step 1: Replace gradient background with light orange tint**

In `components/blocks/TrainingCTA.tsx`, replace lines 17–22:
```tsx
<section className="bg-orange-50 py-20">
```
(Remove the `style={{ background: "linear-gradient(...)" }}` prop entirely.)

- [ ] **Step 2: Update section label color**

Replace line 31:
```tsx
<span className="text-orange text-xs font-semibold uppercase tracking-widest">Professional Development</span>
```

- [ ] **Step 3: Update heading and body text**

Replace line 32:
```tsx
<h2 className="font-heading font-bold text-3xl sm:text-4xl text-navy mt-2 mb-4">
```

Replace line 35:
```tsx
<p className="text-slate-600 text-lg">
```

- [ ] **Step 4: Update CTA button**

Replace lines 38–43:
```tsx
<Link
  href="/training"
  className="inline-flex items-center gap-2 bg-orange hover:bg-orange-light text-white font-bold px-8 py-4 rounded-xl mt-8 transition-colors shadow-lg"
>
  View All Training Programs
</Link>
```

- [ ] **Step 5: Update course list items**

Replace line 54:
```tsx
<li key={course} className="flex items-center gap-3 text-navy font-medium">
```

Replace line 55:
```tsx
<CheckCircle className="w-5 h-5 text-orange shrink-0" />
```

- [ ] **Step 6: Verify in browser**

Training CTA section should be soft orange-tinted background, navy text, orange CTA button.

- [ ] **Step 7: Commit**

```bash
git add components/blocks/TrainingCTA.tsx
git commit -m "feat: redesign training CTA to light orange tint with navy text"
```

---

## Task 8: TestimonialsSection — white section, light cards

**Files:**
- Modify: `components/blocks/TestimonialsSection.tsx`

- [ ] **Step 1: Update section background and heading**

In `components/blocks/TestimonialsSection.tsx`, replace line 29:
```tsx
<section className="bg-white py-20">
```

Replace line 33:
```tsx
<h2 className="font-heading font-bold text-3xl sm:text-4xl text-navy mt-2">
```

- [ ] **Step 2: Update testimonial cards**

Replace line 42:
```tsx
className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col"
```

- [ ] **Step 3: Update quote text and divider**

Replace line 49:
```tsx
<p className="text-slate-700 leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
```

Replace line 50:
```tsx
<div className="mt-6 pt-4 border-t border-slate-200">
```

- [ ] **Step 4: Update author name and company**

Replace line 51:
```tsx
<p className="text-navy font-semibold text-sm">{t.name}</p>
```

Replace line 52:
```tsx
<p className="text-slate-400 text-xs">{t.company}</p>
```

- [ ] **Step 5: Verify in browser**

Testimonials section should be white, cards light gray-50 with border, dark navy author names.

- [ ] **Step 6: Commit**

```bash
git add components/blocks/TestimonialsSection.tsx
git commit -m "feat: redesign testimonials to white section with light cards"
```

---

## Task 9: PageHero — light slate background, navy text

**Files:**
- Modify: `components/blocks/PageHero.tsx`

Used on Services, Training, Contact, Downloads, Renewals, and About pages.

- [ ] **Step 1: Replace dark background and remove dot grid**

In `components/blocks/PageHero.tsx`, replace lines 17–26 (the `<section>` opening tag and the dot grid div):
```tsx
<section className="bg-slate-100 pt-24 pb-16 relative overflow-hidden">
```
Delete the entire dot grid `<div>` (lines 19–26):
```tsx
{/* dot grid removed */}
```

- [ ] **Step 2: Update breadcrumb colors**

Replace line 29:
```tsx
<nav className="flex items-center gap-1 text-slate-400 text-sm mb-4">
```

Replace line 34 (the breadcrumb link):
```tsx
<Link href={crumb.href} className="hover:text-navy transition-colors">
```

Replace line 37 (active crumb):
```tsx
<span className="text-navy">{crumb.label}</span>
```

- [ ] **Step 3: Update heading color**

Replace line 44:
```tsx
className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-navy"
```

- [ ] **Step 4: Update description text**

Replace line 53:
```tsx
className="text-slate-500 text-lg mt-4 max-w-2xl"
```

- [ ] **Step 5: Verify on an inner page**

Open `http://localhost:3000/services` — the page hero should be light gray, heading navy, breadcrumbs muted.

- [ ] **Step 6: Commit**

```bash
git add components/blocks/PageHero.tsx
git commit -m "feat: redesign page hero to light slate background with navy text"
```

---

## Task 10: ServiceDetail — light sidebar CTA card

**Files:**
- Modify: `components/blocks/ServiceDetail.tsx`

The main content area already uses white/gray text (it was partially light). The sticky sidebar CTA is dark navy — change it to a light card with an orange-tinted border.

- [ ] **Step 1: Update sidebar CTA card**

In `components/blocks/ServiceDetail.tsx`, replace line 35:
```tsx
<div className="sticky top-24 bg-orange/5 border border-orange/20 rounded-2xl p-6">
```

- [ ] **Step 2: Update sidebar heading and body text**

Replace line 36:
```tsx
<h3 className="font-heading font-bold text-navy text-lg mb-2">Need Help With This?</h3>
```

Replace line 37–39:
```tsx
<p className="text-slate-500 text-sm mb-6">
  Our consultants are ready to assist you with {item.title.toLowerCase()}.
</p>
```

- [ ] **Step 3: Update sidebar secondary button**

Replace lines 47–50:
```tsx
<Link
  href="/contact"
  className="flex items-center gap-2 border border-slate-300 hover:border-orange text-navy font-semibold px-4 py-3 rounded-xl transition-colors w-full justify-center text-sm"
>
  Send a Message
</Link>
```

- [ ] **Step 4: Update sidebar footer text**

Replace line 53:
```tsx
<p className="text-slate-400 text-xs text-center mt-4">Mon–Fri, 9am–5pm EST</p>
```

- [ ] **Step 5: Verify on a service detail page**

Open `http://localhost:3000/services/fuel-tax-ifta` — sidebar should be a soft orange-tinted card, not dark navy.

- [ ] **Step 6: Commit**

```bash
git add components/blocks/ServiceDetail.tsx
git commit -m "feat: redesign service detail sidebar to light orange-tinted card"
```

---

## Task 11: Final verification pass

- [ ] **Step 1: Check homepage section rhythm**

Open `http://localhost:3000` and scroll through. Verify alternating light sections:
- Hero: white + faint photo ✓
- StatsBar: slate-100 ✓
- Services: white ✓
- Why Us: slate-50 ✓
- Training CTA: orange-50 ✓
- Testimonials: white ✓
- ContactStrip: navy (dark anchor) ✓
- Footer: navy ✓

- [ ] **Step 2: Check inner pages**

- `http://localhost:3000/services` — PageHero light, cards outlined
- `http://localhost:3000/services/fuel-tax-ifta` — PageHero light, sidebar light orange card
- `http://localhost:3000/training` — same as services
- `http://localhost:3000/contact` — PageHero light
- `http://localhost:3000/about` — PageHero light
- `http://localhost:3000/downloads` — PageHero light
- `http://localhost:3000/renewals` — PageHero light

- [ ] **Step 3: Check navbar behavior**

At top of page: white bar, no shadow. After scrolling: shadow + border appear.

- [ ] **Step 4: Run static build to confirm no errors**

```bash
npm run build
```
Expected: build completes with 0 errors, all 25 routes static.

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "feat: complete light minimalist redesign — all components updated"
```
