# Smart Trucking Services Inc — Website Redesign Spec
**Date:** 2026-04-07  
**Status:** Approved  
**Stack:** Next.js 15 (App Router, static export) + Tailwind CSS v4 + Framer Motion + shadcn/ui + 21st.dev components

---

## 1. Overview

A complete ground-up redesign of smartrucking.ca — a Canadian trucking consulting company based in Brampton, ON. The current site is a 2014 PHP/Bootstrap brochure site. The new site runs on `localhost:3000` via `next dev` and exports to a static `/out` folder for deployment.

**Primary goals:**
- Lead generation: drive phone calls and contact form submissions from trucking companies
- Self-service: let visitors find the right service/training page and download forms
- Serve existing clients via subtle portal links (Employee + Client login) without distracting new visitors

---

## 2. Site Architecture

### Routes

```
/                                     Homepage
/about                                About Us
/services                             Services index (all services overview)
/services/company-registration
/services/us-canada-authorities
/services/fuel-tax-ifta
/services/oversize-permits
/services/irp-frp-registration
/services/ace-emanifest-us-to-canada
/services/aci-emanifest-canada-to-us
/services/ctpat-pip-fast
/services/fast-card-visa
/services/moe-easr
/training                             Training index (all courses overview)
/training/logbook
/training/dispatch
/training/drug-alcohol-supervisor
/training/dangerous-goods
/training/defensive-driving
/renewals                             Renewal tracker page
/downloads                            PDF forms download page
/contact                              Contact form + address + phone
```

External links (open in new tab):
- Drug Testing → https://smarttesting.ca/
- Employee Login → https://admin.smartrucking.ca/
- Client Login → https://clientportal.smartrucking.ca/

### Project File Structure

```
smart-trucking/
├── app/
│   ├── layout.tsx                    # Root layout: Navbar + Footer
│   ├── page.tsx                      # Homepage
│   ├── about/page.tsx
│   ├── services/
│   │   ├── page.tsx                  # Services index
│   │   └── [slug]/page.tsx           # Dynamic service detail (generateStaticParams)
│   ├── training/
│   │   ├── page.tsx                  # Training index
│   │   └── [slug]/page.tsx           # Dynamic training detail
│   ├── renewals/page.tsx
│   ├── downloads/page.tsx
│   └── contact/page.tsx
├── components/
│   ├── ui/                           # shadcn/ui + 21st.dev installed primitives
│   │   ├── floating-header.tsx
│   │   ├── modern-hero.tsx
│   │   ├── animated-testimonials.tsx
│   │   ├── button-colorful.tsx
│   │   ├── bento-grid.tsx
│   │   ├── logos3.tsx
│   │   ├── footer2.tsx
│   │   └── animated-shiny-text.tsx
│   ├── blocks/                       # Assembled page sections
│   │   ├── HeroSection.tsx
│   │   ├── ServicesGrid.tsx
│   │   ├── StatsBar.tsx
│   │   ├── WhyUsSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── TrainingCTA.tsx
│   │   ├── ContactStrip.tsx
│   │   ├── ContactForm.tsx
│   │   ├── PageHero.tsx
│   │   ├── ServiceDetail.tsx
│   │   └── StatCounter.tsx
│   └── layout/
│       ├── Navbar.tsx
│       └── Footer.tsx
├── data/
│   ├── services.ts                   # Service page content array
│   └── training.ts                   # Training page content array
├── public/
│   └── uploads/                      # PDF downloads
├── next.config.ts                    # output: 'export'
└── package.json
# Note: Tailwind v4 uses CSS-first config — no tailwind.config.ts needed.
# All theme tokens go in app/globals.css under @theme { ... }
```

---

## 3. Visual Design

### Color Palette (Tailwind CSS v4 tokens)

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-navy` | `#0A1628` | Primary background, navbar, footer |
| `--color-navy-mid` | `#112240` | Card backgrounds, alternating sections |
| `--color-orange` | `#F97316` | Primary CTA buttons, highlights |
| `--color-orange-light` | `#FB923C` | Gradient endpoints, icon fills |
| `--color-white` | `#F8FAFC` | Body text on dark, card text |
| `--color-slate` | `#94A3B8` | Subtext, labels, muted copy |
| `--color-steel` | `#1E3A5F` | Dividers, borders, card edges |

### Typography

- **Headings:** Plus Jakarta Sans — bold (700/800), geometric, modern
- **Body:** Inter — clean, readable at 14–16px
- **Section labels:** uppercase, 0.1em letter-spacing, `--color-orange` or `--color-slate`

### Motion Principles (Framer Motion)

- Hero heading/subtext: fade-up on load (staggered 0.1s delay)
- Service cards: `whileInView` fade-up with stagger on scroll
- Navbar: background transitions from transparent to `--color-navy` on scroll (useScroll)
- StatCounter: count-up animation triggered on scroll into view
- Page transitions: `AnimatePresence` fade between routes (opacity 0→1, 200ms)

---

## 4. 21st.dev Component Map

| Section | Component | Install Command |
|---------|-----------|----------------|
| Navbar | Floating Header (efferd) | `npx shadcn@latest add https://21st.dev/r/sshahaider/floating-header` |
| Hero | Modern Hero (shadcnblockscom) | `npx shadcn@latest add https://21st.dev/r/shadcnblockscom/modern-hero` |
| Services Grid | Features 1 (tailark) | `npx shadcn@latest add https://21st.dev/r/tailark/features-1` |
| Why Us | Bento Grid (kokonutd) | `npx shadcn@latest add https://21st.dev/r/kokonutd/bento-grid` |
| Testimonials | Animated Testimonials (bankkroll) | `npx shadcn@latest add https://21st.dev/r/bankkroll/animated-testimonials` |
| Client Logos | Logos3 (shadcnblockscom) — optional; use trucking association logos (PMTC, OTA, CITA) or omit if unavailable | `npx shadcn@latest add https://21st.dev/r/shadcnblockscom/logos3` |
| Footer | Footer2 (shadcnblockscom) | `npx shadcn@latest add https://21st.dev/r/shadcnblockscom/footer2` |
| CTA Buttons | Button Colorful (kokonutd) | `npx shadcn@latest add https://21st.dev/r/kokonutd/button-colorful` |
| Badges/Labels | Animated Shiny Text (magicui) | `npx shadcn@latest add https://21st.dev/r/magicui/animated-shiny-text` |

Custom components (built from scratch):
- `StatCounter` — Framer Motion count-up for stats (10+ Years, 500+ Clients, etc.)
- `PageHero` — reusable dark hero banner for inner pages
- `ContactForm` — name/email/phone/message with mailto action

---

## 5. Homepage Layout

### Section Order

1. **Navbar** — floating glass morphism, transparent on hero, solid navy on scroll
   - Left: Logo
   - Center: Services ▾ | Training ▾ | Drug Testing (external) | Renewals | Downloads
   - Right: Contact (orange button) | Client Portal (subtle ghost link) | Employee Login (subtle)

2. **Hero** — full viewport height, dark navy with semi-transparent truck/highway background image
   - Shiny badge: "Canada's Trusted Trucking Consultants"
   - H1: "Your One-Stop Shop for Trucking Compliance & Permits"
   - Subtext: "Serving US-Canada carriers from Brampton, ON since 2014"
   - Dual CTAs: [Get a Free Consultation] (orange, primary) + [Explore Services] (ghost outline)

3. **Stats Bar** — dark band directly below hero
   - 4 animated counters: "10+ Years Experience" | "500+ Clients Served" | "US & Canada" | "Same-Day Response"

4. **Services Grid** — "OUR SERVICES" section label, white on `--color-navy-mid` bg
   - 3×3 grid of icon cards (Lucide icons), each links to its service detail page
   - Services: Company Registration, US/Canada Authorities, Fuel Tax/IFTA, Oversize Permits, IRP/FRP Registration, ACE eManifest, ACI eManifest, C-TPAT/PIP/FAST, FAST Card & US Visa

5. **Why Us** — Bento grid on dark navy
   - 4 cells: "10+ Years Experience", "One-Stop Shop", "Timely Renewals Tracking", "US + Canada Coverage"
   - Largest cell features a short paragraph about STS expertise

6. **Training CTA** — orange-to-amber gradient band
   - Heading: "Train Your Team"
   - 5 course names listed with checkmarks
   - CTA: [View All Training Programs]

7. **Testimonials** — animated sliding cards on `--color-navy-mid`
   - 3 placeholder testimonials (real ones to be filled in by client)

8. **Contact Strip** — "Ready to Get Started?" on dark navy
   - Phone: 905-581-6105 | Tel: 905-791-0010
   - CTA: [Send Us a Message → /contact]

9. **Footer** — 4-column dark navy
   - Col 1: Logo + "Smart Trucking Services Inc. One-stop shop for all trucking services."
   - Col 2: Quick Links (About, Contact, Downloads, Important Links)
   - Col 3: Services (top 5 + "View All")
   - Col 4: Contact Info (address, phones, fax, email)
   - Bottom bar: © 2026 Smart Trucking Services Inc.

---

## 6. Inner Page Layout (Services & Training)

All service and training detail pages share this structure:

1. **PageHero** — dark navy, breadcrumb (Home > Services > [Name]), page title, 1-line description
2. **Content section** — white bg, H2 heading, descriptive paragraphs, bulleted "What's included" list
3. **Side CTA card** (sticky on desktop) — "Need help with [Service Name]? Call 905-581-6105" + contact button
4. **Related Services strip** — 3 cards linking to adjacent services

---

## 7. Data Model

### `data/services.ts`

```ts
export type Service = {
  slug: string
  title: string
  shortDescription: string
  fullDescription: string
  bullets: string[]
  icon: string          // Lucide icon name
  relatedSlugs: string[]
}

export const services: Service[] = [
  {
    slug: 'company-registration',
    title: 'Company Registration',
    shortDescription: 'Set up your new trucking corporation — numbered or named.',
    fullDescription: '...',
    bullets: ['Numbered or named corporation', 'NUANS name search', 'Federal and provincial registration'],
    icon: 'Building2',
    relatedSlugs: ['us-canada-authorities', 'irp-frp-registration'],
  },
  // ... all 9 services
]
```

### `data/training.ts`

Same shape as `services.ts` but for the 5 training courses.

---

## 8. Contact Page

- Left column: contact form (name, email, phone, message, submit button)
  - Form action: `mailto:info@smartruckingservices.com` (no backend required)
- Right column: address card, phone numbers, Google Maps embed (iframe)
- Address: 1 Gateway Blvd. Unit #303, Brampton, ON, L6T 0G3

---

## 9. Downloads Page

Static list of downloadable PDFs (mirrored from `/public/uploads/`):
- NUANS Name Search Authorization Form
- Drug Test Account Opening Form
- New Incorporation Registration Form
- Credit Card Authorization Form

Each row: file name + description + [Download PDF] button.

---

## 10. Renewals Page

Simple page with:
- PageHero: "Renewal Ahead — Stay Compliant"
- Description: STS tracks all permits/authorities for timely renewals
- Bulleted list of what STS monitors (IFTA, IRP plates, DOT authorities, etc.)
- Contact CTA: "Contact us to enroll in our renewal tracking service"

---

## 11. Technical Notes

- **Next.js config:** `output: 'export'` in `next.config.ts` — produces static HTML in `/out`
- **Tailwind v4:** CSS-first config — all theme tokens defined in `app/globals.css` using `@theme { }` block. No `tailwind.config.ts` needed.
- **Fonts:** Load Plus Jakarta Sans + Inter via `next/font/google`
- **Images:** Hero background from Unsplash (truck/highway). Stored in `/public/images/`
- **Icons:** Lucide React for all service icons
- **SEO:** `generateMetadata` on each page with title, description, OpenGraph
- **No backend required** — contact form uses mailto fallback
- **Dev:** `npm run dev` → localhost:3000
- **Build:** `npm run build` → static `/out` folder ready for cPanel/Nginx upload

---

## 12. Company Info (from site)

- **Name:** Smart Trucking Services Inc.
- **Address:** 1 Gateway Blvd. Unit #303, Brampton, ON, L6T 0G3
- **Phone:** 905-581-6105 / 905-791-0010
- **Fax:** 289-401-5257
- **Email:** info@smartruckingservices.com
- **Drug Testing:** smarttesting.ca
- **Employee portal:** admin.smartrucking.ca
- **Client portal:** clientportal.smartrucking.ca
