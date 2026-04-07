# Smart Trucking Services Inc — Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete modern Next.js 15 website for Smart Trucking Services Inc that runs on localhost:3000 and exports to a static `/out` folder.

**Architecture:** Next.js 15 App Router with `output: 'export'` for fully static generation. All content lives in TypeScript data files (`data/services.ts`, `data/training.ts`). 21st.dev components are installed via shadcn CLI and customized with the STS color palette.

**Tech Stack:** Next.js 15, Tailwind CSS v4, Framer Motion, shadcn/ui, 21st.dev components, Lucide React, next/font/google (Plus Jakarta Sans + Inter)

---

## File Map

| File | Responsibility |
|------|---------------|
| `app/layout.tsx` | Root layout — mounts Navbar + Footer, loads fonts, sets base HTML |
| `app/globals.css` | Tailwind v4 `@theme` tokens, base styles |
| `app/page.tsx` | Homepage — assembles all block sections |
| `app/about/page.tsx` | About Us page |
| `app/services/page.tsx` | Services index — grid of all 9 services |
| `app/services/[slug]/page.tsx` | Dynamic service detail — reads from `data/services.ts` |
| `app/training/page.tsx` | Training index — grid of all 5 courses |
| `app/training/[slug]/page.tsx` | Dynamic training detail — reads from `data/training.ts` |
| `app/contact/page.tsx` | Contact form + address + map |
| `app/downloads/page.tsx` | PDF downloads list |
| `app/renewals/page.tsx` | Renewals info page |
| `data/services.ts` | Service content array (9 services) |
| `data/training.ts` | Training content array (5 courses) |
| `components/layout/Navbar.tsx` | Sticky nav with dropdown menus, scroll-aware bg |
| `components/layout/Footer.tsx` | 4-column dark footer |
| `components/blocks/HeroSection.tsx` | Full-viewport hero with dual CTAs |
| `components/blocks/StatsBar.tsx` | 4 animated stat counters |
| `components/blocks/ServicesGrid.tsx` | 3×3 icon card grid |
| `components/blocks/WhyUsSection.tsx` | Bento grid "Why Choose Us" |
| `components/blocks/TrainingCTA.tsx` | Orange gradient training promo band |
| `components/blocks/TestimonialsSection.tsx` | Animated testimonial cards |
| `components/blocks/ContactStrip.tsx` | Bottom CTA strip with phone + button |
| `components/blocks/PageHero.tsx` | Reusable inner-page dark hero banner |
| `components/blocks/ServiceDetail.tsx` | Service/training detail layout (content + sticky CTA + related) |
| `components/blocks/ContactForm.tsx` | Name/email/phone/message form with mailto |
| `components/blocks/StatCounter.tsx` | Single animated count-up number |
| `next.config.ts` | `output: 'export'`, image unoptimized |
| `public/images/hero-bg.jpg` | Hero background (truck/highway from Unsplash) |
| `public/uploads/` | PDF downloads |

---

## Task 1: Scaffold Next.js 15 Project

**Files:**
- Create: `next.config.ts`
- Create: `app/globals.css`
- Create: `app/layout.tsx`

- [ ] **Step 1: Create the Next.js project**

Run in `d:/GenAI/smart-trucking`:
```bash
npx create-next-app@latest . --typescript --eslint --app --no-src-dir --no-tailwind --import-alias "@/*"
```
When prompted, answer: TypeScript=Yes, ESLint=Yes, App Router=Yes, src directory=No, import alias=`@/*`.

Expected output: `Success! Created smart-trucking`

- [ ] **Step 2: Install core dependencies**

```bash
npm install framer-motion lucide-react
npm install @tailwindcss/postcss tailwindcss@next
```

Expected: packages added with no errors.

- [ ] **Step 3: Install Tailwind v4 and PostCSS config**

Create `postcss.config.mjs`:
```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
```

- [ ] **Step 4: Configure static export**

Replace `next.config.ts` with:
```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

- [ ] **Step 5: Verify dev server starts**

```bash
npm run dev
```
Expected: `Ready on http://localhost:3000` — open browser and confirm Next.js default page loads.

- [ ] **Step 6: Commit**

```bash
git init
git add .
git commit -m "feat: scaffold Next.js 15 project with static export"
```

---

## Task 2: Tailwind v4 Theme Tokens + Fonts

**Files:**
- Create: `app/globals.css`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Write globals.css with Tailwind v4 theme**

Create `app/globals.css`:
```css
@import "tailwindcss";

@theme {
  --color-navy: #0A1628;
  --color-navy-mid: #112240;
  --color-orange: #F97316;
  --color-orange-light: #FB923C;
  --color-white: #F8FAFC;
  --color-slate: #94A3B8;
  --color-steel: #1E3A5F;

  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  --font-heading: var(--font-jakarta), var(--font-inter), ui-sans-serif, sans-serif;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--color-navy);
  color: var(--color-white);
  font-family: var(--font-sans);
}
```

- [ ] **Step 2: Load fonts in root layout**

Create `app/layout.tsx`:
```tsx
import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Smart Trucking Services Inc | Trucking Compliance & Permits",
  description:
    "Canada's one-stop shop for trucking compliance, permits, authorities, and training. Serving US-Canada carriers from Brampton, ON since 2014.",
  openGraph: {
    title: "Smart Trucking Services Inc",
    description: "One-stop shop for trucking compliance, permits & training.",
    url: "https://smartrucking.ca",
    siteName: "Smart Trucking Services Inc",
    locale: "en_CA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Create stub Navbar and Footer so layout compiles**

Create `components/layout/Navbar.tsx`:
```tsx
export function Navbar() {
  return <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-navy/80 backdrop-blur" />;
}
```

Create `components/layout/Footer.tsx`:
```tsx
export function Footer() {
  return <footer className="bg-navy border-t border-steel py-8 text-center text-slate text-sm">© 2026 Smart Trucking Services Inc.</footer>;
}
```

- [ ] **Step 4: Verify colors render**

```bash
npm run dev
```
Open `http://localhost:3000` — page background should be dark navy (`#0A1628`). Check browser devtools that `--color-navy` is defined on `:root`.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: add Tailwind v4 theme tokens and font setup"
```

---

## Task 3: Install shadcn/ui + 21st.dev Components

**Files:**
- Creates: `components/ui/` (multiple files installed by CLI)
- Creates: `lib/utils.ts`

- [ ] **Step 1: Initialize shadcn/ui**

```bash
npx shadcn@latest init
```
When prompted: Style=Default, Base color=Slate, CSS variables=Yes.

Expected: `components/ui/` folder created, `lib/utils.ts` added.

- [ ] **Step 2: Install 21st.dev Floating Header (Navbar base)**

```bash
npx shadcn@latest add "https://21st.dev/r/sshahaider/floating-header"
```
Expected: `components/ui/floating-header.tsx` created.

- [ ] **Step 3: Install 21st.dev Modern Hero**

```bash
npx shadcn@latest add "https://21st.dev/r/shadcnblockscom/modern-hero"
```
Expected: `components/ui/modern-hero.tsx` (or `components/blocks/modern-hero.tsx`) created.

- [ ] **Step 4: Install remaining 21st.dev components**

Run all in sequence:
```bash
npx shadcn@latest add "https://21st.dev/r/tailark/features-1"
npx shadcn@latest add "https://21st.dev/r/kokonutd/bento-grid"
npx shadcn@latest add "https://21st.dev/r/bankkroll/animated-testimonials"
npx shadcn@latest add "https://21st.dev/r/shadcnblockscom/logos3"
npx shadcn@latest add "https://21st.dev/r/shadcnblockscom/footer2"
npx shadcn@latest add "https://21st.dev/r/kokonutd/button-colorful"
npx shadcn@latest add "https://21st.dev/r/magicui/animated-shiny-text"
```
Expected: corresponding files appear in `components/ui/` or `components/blocks/`.

- [ ] **Step 5: Note installed file paths**

Run:
```bash
find components -name "*.tsx" | sort
```
Note the actual filenames for each 21st.dev component — they may differ slightly from the spec. Update import paths in later tasks to match actual filenames.

- [ ] **Step 6: Verify build still compiles**

```bash
npm run dev
```
Expected: no TypeScript errors, dev server starts on `localhost:3000`.

- [ ] **Step 7: Commit**

```bash
git add .
git commit -m "feat: install shadcn/ui and 21st.dev components"
```

---

## Task 4: Content Data Files

**Files:**
- Create: `data/services.ts`
- Create: `data/training.ts`

- [ ] **Step 1: Create data/services.ts with all 9 services**

Create `data/services.ts`:
```ts
export type Service = {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  bullets: string[];
  icon: string;
  relatedSlugs: string[];
};

export const services: Service[] = [
  {
    slug: "company-registration",
    title: "Company Registration",
    shortDescription: "Set up your new trucking corporation — numbered or named.",
    fullDescription:
      "At STS Inc we specialize in setting up a new corporation for you. You can choose between a numbered corporation or a name corporation. We handle the NUANS name search, federal and provincial registration, and all required documentation to get your trucking business legally established.",
    bullets: [
      "Numbered or named corporation",
      "NUANS name search",
      "Federal and provincial registration",
      "Certificate of Incorporation",
      "Business number registration (CRA)",
    ],
    icon: "Building2",
    relatedSlugs: ["us-canada-authorities", "irp-frp-registration"],
  },
  {
    slug: "us-canada-authorities",
    title: "US & Canada Authorities",
    shortDescription: "Obtain all operating authorities needed to run cross-border.",
    fullDescription:
      "Smart Trucking Services Inc helps carriers obtain the operating authorities required to legally transport goods across the US-Canada border and within Canada. Our team handles FMCSA filings, MC numbers, BOC-3 process agent filings, and Canadian carrier codes.",
    bullets: [
      "FMCSA Motor Carrier (MC) number",
      "USDOT number registration",
      "BOC-3 process agent filing",
      "Canadian carrier code (NSC)",
      "Province-specific operating licences",
    ],
    icon: "Flag",
    relatedSlugs: ["company-registration", "irp-frp-registration"],
  },
  {
    slug: "fuel-tax-ifta",
    title: "Fuel Tax & IFTA Reporting",
    shortDescription: "Accurate quarterly IFTA filings and fuel tax compliance.",
    fullDescription:
      "The International Fuel Tax Agreement (IFTA) requires carriers operating in multiple jurisdictions to file quarterly fuel tax returns. STS Inc prepares and files your IFTA returns accurately and on time, ensuring compliance and minimizing penalties.",
    bullets: [
      "Quarterly IFTA return preparation and filing",
      "Fuel tax audit support",
      "Multi-jurisdiction fuel tax calculations",
      "IFTA licence and decal procurement",
      "Record-keeping guidance",
    ],
    icon: "Fuel",
    relatedSlugs: ["irp-frp-registration", "us-canada-authorities"],
  },
  {
    slug: "oversize-permits",
    title: "Oversize & Overweight Permits",
    shortDescription: "Annual, temporary, and superload permits for oversize loads.",
    fullDescription:
      "STS Inc can help you obtain all oversize and overweight permits required to move non-standard loads across US and Canadian highways. We handle annual blanket permits, single-trip permits, and complex superload permits.",
    bullets: [
      "Annual oversize blanket permits",
      "Temporary oversize permits",
      "Temporary superload permits",
      "Temporary trip and fuel permits",
      "Multi-province / multi-state routing",
    ],
    icon: "TruckIcon",
    relatedSlugs: ["us-canada-authorities", "irp-frp-registration"],
  },
  {
    slug: "irp-frp-registration",
    title: "IRP & FRP Registration",
    shortDescription: "Commercial fleet licensing — IRP apportioned and FRP plates.",
    fullDescription:
      "The International Registration Plan (IRP) allows commercial vehicles to travel in multiple jurisdictions under a single apportioned registration. STS Inc handles your IRP application, renewals, fleet additions, and Ontario FRP (Fleet Registration Program) plates.",
    bullets: [
      "IRP apportioned plate registration",
      "Fleet additions and deletions",
      "Annual IRP renewals",
      "Ontario FRP plate registration",
      "Weight group changes",
    ],
    icon: "Car",
    relatedSlugs: ["us-canada-authorities", "fuel-tax-ifta"],
  },
  {
    slug: "ace-emanifest-us-to-canada",
    title: "ACE eManifest (US → Canada)",
    shortDescription: "Electronic pre-arrival manifests for US-bound shipments entering Canada.",
    fullDescription:
      "Every commercial vehicle approaching the US border must submit an ACE eManifest at least 1 hour prior to arrival. STS Inc prepares and submits ACE eManifests on your behalf, ensuring compliant and smooth border crossings into the United States.",
    bullets: [
      "ACE eManifest preparation and submission",
      "1-hour pre-arrival filing compliance",
      "Cargo and crew documentation",
      "Amendment and cancellation handling",
      "CBSA and CBP compliance review",
    ],
    icon: "FileText",
    relatedSlugs: ["aci-emanifest-canada-to-us", "ctpat-pip-fast"],
  },
  {
    slug: "aci-emanifest-canada-to-us",
    title: "ACI eManifest (Canada → US)",
    shortDescription: "Advance Commercial Information filings for Canada-bound shipments.",
    fullDescription:
      "The Advance Commercial Information (ACI) program makes Canada's border processes more secure and compatible with North American standards. STS Inc submits ACI eManifest notices on your behalf for all commercial shipments entering Canada.",
    bullets: [
      "ACI eManifest preparation and submission",
      "Pre-arrival review program (PARS)",
      "Cargo and conveyance reporting",
      "CBSA compliance guidance",
      "Amendment handling",
    ],
    icon: "FileCheck",
    relatedSlugs: ["ace-emanifest-us-to-canada", "ctpat-pip-fast"],
  },
  {
    slug: "ctpat-pip-fast",
    title: "C-TPAT, PIP & FAST Certifications",
    shortDescription: "Security certifications for expedited cross-border processing.",
    fullDescription:
      "C-TPAT (US) and PIP (Canada) are voluntary supply chain security programs that, when combined, qualify carriers for the Free and Secure Trade (FAST) program — enabling expedited border processing. STS Inc guides your company through the application and certification process.",
    bullets: [
      "C-TPAT application and enrollment",
      "PIP (Partners in Protection) application",
      "FAST lane eligibility documentation",
      "Security profile development",
      "Ongoing compliance support",
    ],
    icon: "ShieldCheck",
    relatedSlugs: ["fast-card-visa", "ace-emanifest-us-to-canada"],
  },
  {
    slug: "fast-card-visa",
    title: "FAST Card & US Visa",
    shortDescription: "FAST card applications and US visa assistance for drivers.",
    fullDescription:
      "The FAST card allows pre-approved, low-risk drivers to use dedicated FAST lanes at the border. STS Inc assists drivers with FAST card applications and provides guidance on US visa requirements for commercial drivers.",
    bullets: [
      "FAST card application preparation",
      "Background check documentation guidance",
      "US B1 visa application assistance",
      "Nexus card guidance",
      "Driver eligibility review",
    ],
    icon: "CreditCard",
    relatedSlugs: ["ctpat-pip-fast", "ace-emanifest-us-to-canada"],
  },
  {
    slug: "moe-easr",
    title: "MOE & EASR Application",
    shortDescription: "Ontario Ministry of Environment and EASR registration services.",
    fullDescription:
      "STS Inc assists Ontario carriers with Ministry of Environment (MOE) Environmental Activity and Sector Registry (EASR) applications, required for certain transportation and storage activities under Ontario environmental regulations.",
    bullets: [
      "EASR registration preparation",
      "Environmental compliance review",
      "MOE filing and submission",
      "Ongoing regulatory monitoring",
    ],
    icon: "Leaf",
    relatedSlugs: ["company-registration", "us-canada-authorities"],
  },
];
```

- [ ] **Step 2: Create data/training.ts with all 5 courses**

Create `data/training.ts`:
```ts
import type { Service } from "./services";

export const training: Service[] = [
  {
    slug: "logbook",
    title: "Log Book Training & Auditing",
    shortDescription: "Hours of Service training and log book audit services for drivers.",
    fullDescription:
      "STS Inc offers comprehensive Hours of Service (HOS) training for commercial drivers operating under US DOT and Transport Canada regulations. We also provide log book auditing to identify and correct violations before an audit.",
    bullets: [
      "Classroom training for Hours of Service regulations",
      "On-site HOS training for your drivers",
      "Log book auditing (US & Canada)",
      "Log falsification detection and correction",
      "ELD compliance guidance",
    ],
    icon: "BookOpen",
    relatedSlugs: ["dispatch", "drug-alcohol-supervisor"],
  },
  {
    slug: "dispatch",
    title: "Dispatch Training",
    shortDescription: "Professional dispatcher training covering operations and compliance.",
    fullDescription:
      "This training module teaches dispatchers the soft and hard skills needed to do their job successfully. The program covers load planning, hours of service, driver communication, trip planning, and regulatory compliance.",
    bullets: [
      "Load planning and trip optimization",
      "Hours of Service compliance for dispatchers",
      "Driver communication best practices",
      "Hazmat and dangerous goods awareness",
      "Carrier compliance documentation",
    ],
    icon: "Radio",
    relatedSlugs: ["logbook", "dangerous-goods"],
  },
  {
    slug: "drug-alcohol-supervisor",
    title: "Supervisor Drug & Alcohol Training",
    shortDescription: "DOT-compliant reasonable suspicion training for supervisors.",
    fullDescription:
      "US DOT regulations require supervisors of commercial motor vehicle drivers to receive training on alcohol and controlled substance misuse. STS Inc delivers this mandated training in a classroom or online format.",
    bullets: [
      "DOT-required reasonable suspicion training",
      "Alcohol misuse recognition",
      "Controlled substance symptom identification",
      "Documentation and reporting procedures",
      "Available classroom and online",
    ],
    icon: "ShieldAlert",
    relatedSlugs: ["logbook", "defensive-driving"],
  },
  {
    slug: "dangerous-goods",
    title: "Transportation of Dangerous Goods",
    shortDescription: "TDG certification training for shipping, receiving, and transport.",
    fullDescription:
      "Only personnel with TDG training can transport, receive, or ship dangerous goods under Canadian law. STS Inc provides classroom and on-site TDG training covering all classes of dangerous goods.",
    bullets: [
      "TDG certification for drivers, shippers, receivers",
      "Classification of dangerous goods",
      "Proper documentation and placarding",
      "Emergency response procedures",
      "Classroom and on-site delivery options",
    ],
    icon: "AlertTriangle",
    relatedSlugs: ["dispatch", "logbook"],
  },
  {
    slug: "defensive-driving",
    title: "Defensive Driving",
    shortDescription: "Proven defensive driving program to reduce collisions and injuries.",
    fullDescription:
      "The Defensive Driving Course is an established, proven program designed to produce fewer company-vehicle collisions, less absenteeism due to injuries, and reduced vehicle operating costs. Available for all commercial vehicle operators.",
    bullets: [
      "Collision avoidance techniques",
      "Hazard recognition and response",
      "Winter and adverse weather driving",
      "Reduced insurance premiums (many providers)",
      "Certificate issued upon completion",
    ],
    icon: "Car",
    relatedSlugs: ["drug-alcohol-supervisor", "logbook"],
  },
];
```

- [ ] **Step 3: Verify TypeScript types compile**

```bash
npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add data/
git commit -m "feat: add services and training content data"
```

---

## Task 5: Navbar Component

**Files:**
- Modify: `components/layout/Navbar.tsx`

- [ ] **Step 1: Build the full Navbar**

Replace `components/layout/Navbar.tsx`:
```tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Menu, X, Truck } from "lucide-react";

const services = [
  { label: "Company Registration", href: "/services/company-registration" },
  { label: "US & Canada Authorities", href: "/services/us-canada-authorities" },
  { label: "Fuel Tax & IFTA", href: "/services/fuel-tax-ifta" },
  { label: "Oversize Permits", href: "/services/oversize-permits" },
  { label: "IRP & FRP Registration", href: "/services/irp-frp-registration" },
  { label: "ACE eManifest (US→CA)", href: "/services/ace-emanifest-us-to-canada" },
  { label: "ACI eManifest (CA→US)", href: "/services/aci-emanifest-canada-to-us" },
  { label: "C-TPAT / PIP / FAST", href: "/services/ctpat-pip-fast" },
  { label: "FAST Card & US Visa", href: "/services/fast-card-visa" },
  { label: "MOE & EASR", href: "/services/moe-easr" },
];

const trainingLinks = [
  { label: "Log Book Training", href: "/training/logbook" },
  { label: "Dispatch Training", href: "/training/dispatch" },
  { label: "Drug & Alcohol Supervisor", href: "/training/drug-alcohol-supervisor" },
  { label: "Dangerous Goods (TDG)", href: "/training/dangerous-goods" },
  { label: "Defensive Driving", href: "/training/defensive-driving" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [trainingOpen, setTrainingOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-navy shadow-lg" : "bg-transparent"
      }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-white font-heading font-bold text-lg">
            <Truck className="text-orange w-6 h-6" />
            <span>Smart <span className="text-orange">Trucking</span></span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Services dropdown */}
            <div className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
              <button className="flex items-center gap-1 text-white/80 hover:text-white text-sm font-medium transition-colors">
                Services <ChevronDown className="w-4 h-4" />
              </button>
              {servicesOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-navy-mid border border-steel rounded-lg shadow-xl py-2 z-50">
                  {services.map((s) => (
                    <Link key={s.href} href={s.href} className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-steel/30 transition-colors">
                      {s.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Training dropdown */}
            <div className="relative" onMouseEnter={() => setTrainingOpen(true)} onMouseLeave={() => setTrainingOpen(false)}>
              <button className="flex items-center gap-1 text-white/80 hover:text-white text-sm font-medium transition-colors">
                Training <ChevronDown className="w-4 h-4" />
              </button>
              {trainingOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-navy-mid border border-steel rounded-lg shadow-xl py-2 z-50">
                  {trainingLinks.map((t) => (
                    <Link key={t.href} href={t.href} className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-steel/30 transition-colors">
                      {t.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <a href="https://smarttesting.ca" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white text-sm font-medium transition-colors">
              Drug Testing
            </a>
            <Link href="/renewals" className="text-white/80 hover:text-white text-sm font-medium transition-colors">Renewals</Link>
            <Link href="/downloads" className="text-white/80 hover:text-white text-sm font-medium transition-colors">Downloads</Link>
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="https://clientportal.smartrucking.ca" target="_blank" rel="noopener noreferrer" className="text-slate hover:text-white text-xs transition-colors">
              Client Portal
            </a>
            <a href="https://admin.smartrucking.ca" target="_blank" rel="noopener noreferrer" className="text-slate hover:text-white text-xs transition-colors">
              Employee
            </a>
            <Link href="/contact" className="bg-orange hover:bg-orange-light text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
              Contact Us
            </Link>
          </div>

          {/* Mobile toggle */}
          <button className="lg:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-navy-mid border-t border-steel px-4 pb-4">
          <div className="pt-4 space-y-3">
            <p className="text-slate text-xs uppercase tracking-widest">Services</p>
            {services.map((s) => (
              <Link key={s.href} href={s.href} className="block text-sm text-white/80 hover:text-white" onClick={() => setMobileOpen(false)}>
                {s.label}
              </Link>
            ))}
            <p className="text-slate text-xs uppercase tracking-widest pt-2">Training</p>
            {trainingLinks.map((t) => (
              <Link key={t.href} href={t.href} className="block text-sm text-white/80 hover:text-white" onClick={() => setMobileOpen(false)}>
                {t.label}
              </Link>
            ))}
            <div className="pt-2 space-y-2 border-t border-steel">
              <a href="https://smarttesting.ca" target="_blank" rel="noopener noreferrer" className="block text-sm text-white/80">Drug Testing ↗</a>
              <Link href="/renewals" className="block text-sm text-white/80" onClick={() => setMobileOpen(false)}>Renewals</Link>
              <Link href="/downloads" className="block text-sm text-white/80" onClick={() => setMobileOpen(false)}>Downloads</Link>
              <Link href="/contact" className="block text-center bg-orange text-white text-sm font-semibold px-4 py-2 rounded-lg" onClick={() => setMobileOpen(false)}>
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      )}
    </motion.nav>
  );
}
```

- [ ] **Step 2: Verify Navbar renders**

```bash
npm run dev
```
Open `http://localhost:3000` — confirm sticky navbar appears, background changes on scroll, dropdowns open on hover.

- [ ] **Step 3: Commit**

```bash
git add components/layout/Navbar.tsx
git commit -m "feat: build sticky navbar with dropdowns and mobile menu"
```

---

## Task 6: Footer Component

**Files:**
- Modify: `components/layout/Footer.tsx`

- [ ] **Step 1: Build the 4-column Footer**

Replace `components/layout/Footer.tsx`:
```tsx
import Link from "next/link";
import { Truck, Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-navy border-t border-steel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Truck className="text-orange w-6 h-6" />
              <span className="font-heading font-bold text-white text-lg">
                Smart <span className="text-orange">Trucking</span>
              </span>
            </div>
            <p className="text-slate text-sm leading-relaxed">
              Smart Trucking Services Inc — your one-stop shop for trucking compliance, permits, and training. Serving carriers across Canada and the US since 2014.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: "About Us", href: "/about" },
                { label: "Contact Us", href: "/contact" },
                { label: "Downloads", href: "/downloads" },
                { label: "Renewals", href: "/renewals" },
                { label: "Drug Testing", href: "https://smarttesting.ca", external: true },
              ].map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-slate hover:text-white text-sm transition-colors">
                      {link.label} ↗
                    </a>
                  ) : (
                    <Link href={link.href} className="text-slate hover:text-white text-sm transition-colors">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">Services</h4>
            <ul className="space-y-2">
              {[
                { label: "Company Registration", href: "/services/company-registration" },
                { label: "US & Canada Authorities", href: "/services/us-canada-authorities" },
                { label: "Fuel Tax & IFTA", href: "/services/fuel-tax-ifta" },
                { label: "Oversize Permits", href: "/services/oversize-permits" },
                { label: "IRP & FRP Registration", href: "/services/irp-frp-registration" },
              ].map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="text-slate hover:text-white text-sm transition-colors">
                    {s.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services" className="text-orange hover:text-orange-light text-sm transition-colors">
                  View All Services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-slate text-sm">
                <MapPin className="w-4 h-4 text-orange mt-0.5 shrink-0" />
                <span>1 Gateway Blvd. Unit #303<br />Brampton, ON, L6T 0G3</span>
              </li>
              <li className="flex items-center gap-2 text-slate text-sm">
                <Phone className="w-4 h-4 text-orange shrink-0" />
                <a href="tel:9055816105" className="hover:text-white transition-colors">905-581-6105</a>
              </li>
              <li className="flex items-center gap-2 text-slate text-sm">
                <Phone className="w-4 h-4 text-orange shrink-0" />
                <a href="tel:9057910010" className="hover:text-white transition-colors">905-791-0010</a>
              </li>
              <li className="flex items-center gap-2 text-slate text-sm">
                <Mail className="w-4 h-4 text-orange shrink-0" />
                <a href="mailto:info@smartruckingservices.com" className="hover:text-white transition-colors break-all">
                  info@smartruckingservices.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-steel flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-slate text-xs">© 2026 Smart Trucking Services Inc. All Rights Reserved.</p>
          <div className="flex gap-4">
            <a href="https://clientportal.smartrucking.ca" target="_blank" rel="noopener noreferrer" className="text-slate hover:text-white text-xs transition-colors">
              Client Portal
            </a>
            <a href="https://admin.smartrucking.ca" target="_blank" rel="noopener noreferrer" className="text-slate hover:text-white text-xs transition-colors">
              Employee Login
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Verify Footer renders**

```bash
npm run dev
```
Open `http://localhost:3000` and scroll to the bottom — confirm 4-column footer with correct links and contact info.

- [ ] **Step 3: Commit**

```bash
git add components/layout/Footer.tsx
git commit -m "feat: build 4-column dark footer"
```

---

## Task 7: StatCounter Component

**Files:**
- Create: `components/blocks/StatCounter.tsx`

- [ ] **Step 1: Create the animated StatCounter**

Create `components/blocks/StatCounter.tsx`:
```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

type Props = {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  duration?: number;
};

export function StatCounter({ value, suffix = "", prefix = "", label, duration = 2000 }: Props) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = Math.ceil(value / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-heading font-bold text-white">
        {prefix}{count}{suffix}
      </div>
      <div className="text-slate text-sm mt-1">{label}</div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/blocks/StatCounter.tsx
git commit -m "feat: add animated StatCounter component"
```

---

## Task 8: PageHero Component

**Files:**
- Create: `components/blocks/PageHero.tsx`

- [ ] **Step 1: Create the reusable PageHero**

Create `components/blocks/PageHero.tsx`:
```tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Crumb = { label: string; href?: string };

type Props = {
  title: string;
  description?: string;
  breadcrumbs?: Crumb[];
};

export function PageHero({ title, description, breadcrumbs }: Props) {
  return (
    <section className="bg-navy pt-24 pb-16 relative overflow-hidden">
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle, #F97316 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-1 text-slate text-sm mb-4">
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1">
                {i > 0 && <ChevronRight className="w-3 h-3" />}
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-white transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <motion.h1
          className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            className="text-slate text-lg mt-4 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/blocks/PageHero.tsx
git commit -m "feat: add reusable PageHero component"
```

---

## Task 9: Homepage — HeroSection

**Files:**
- Create: `components/blocks/HeroSection.tsx`
- Add: `public/images/hero-bg.jpg`

- [ ] **Step 1: Download hero background image**

Download a high-resolution truck/highway image from Unsplash (no login needed):
```bash
curl -L "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1920&q=80" -o public/images/hero-bg.jpg
```
Expected: `public/images/hero-bg.jpg` created (~200-400KB).

- [ ] **Step 2: Create HeroSection**

Create `components/blocks/HeroSection.tsx`:
```tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Phone } from "lucide-react";

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: "url('/images/hero-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-navy/80" />

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle, #F97316 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 bg-orange/10 border border-orange/30 text-orange text-sm font-medium px-4 py-2 rounded-full mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="w-2 h-2 bg-orange rounded-full animate-pulse" />
          Canada's Trusted Trucking Consultants
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Your One-Stop Shop for{" "}
          <span className="text-orange">Trucking Compliance</span> & Permits
        </motion.h1>

        {/* Subtext */}
        <motion.p
          className="text-slate text-lg sm:text-xl mt-6 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Serving US-Canada carriers from Brampton, ON since 2014. Expert consulting
          for permits, authorities, training, and compliance.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-orange hover:bg-orange-light text-white font-semibold px-8 py-4 rounded-xl transition-colors text-base shadow-lg shadow-orange/20"
          >
            <Phone className="w-5 h-5" />
            Get a Free Consultation
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 border border-white/30 hover:border-white text-white font-semibold px-8 py-4 rounded-xl transition-colors text-base backdrop-blur-sm"
          >
            Explore Services
          </Link>
        </motion.div>

        {/* Phone number */}
        <motion.p
          className="text-slate text-sm mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Or call us directly:{" "}
          <a href="tel:9055816105" className="text-orange hover:text-orange-light font-medium transition-colors">
            905-581-6105
          </a>
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center pt-2">
          <div className="w-1 h-3 bg-white/50 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 3: Verify hero renders**

```bash
npm run dev
```
Open `http://localhost:3000` — confirm full-viewport hero with background image, headline, and dual CTAs visible.

- [ ] **Step 4: Commit**

```bash
git add components/blocks/HeroSection.tsx public/images/
git commit -m "feat: build full-viewport hero section"
```

---

## Task 10: Homepage — StatsBar

**Files:**
- Create: `components/blocks/StatsBar.tsx`

- [ ] **Step 1: Create StatsBar**

Create `components/blocks/StatsBar.tsx`:
```tsx
import { StatCounter } from "./StatCounter";

export function StatsBar() {
  return (
    <section className="bg-navy-mid border-y border-steel py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <StatCounter value={10} suffix="+" label="Years Experience" />
          <StatCounter value={500} suffix="+" label="Clients Served" />
          <StatCounter value={2} prefix="" suffix=" Countries" label="US & Canada Coverage" />
          <StatCounter value={24} suffix="h" label="Response Time" />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/blocks/StatsBar.tsx
git commit -m "feat: add animated stats bar"
```

---

## Task 11: Homepage — ServicesGrid

**Files:**
- Create: `components/blocks/ServicesGrid.tsx`

- [ ] **Step 1: Create ServicesGrid**

Create `components/blocks/ServicesGrid.tsx`:
```tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Building2, Flag, Fuel, Truck, Car, FileText,
  FileCheck, ShieldCheck, CreditCard, Leaf, ArrowRight,
} from "lucide-react";
import { services } from "@/data/services";

const iconMap: Record<string, React.ElementType> = {
  Building2, Flag, Fuel, Truck: Truck, Car, FileText,
  FileCheck, ShieldCheck, CreditCard, Leaf,
};

export function ServicesGrid() {
  return (
    <section className="bg-navy-mid py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <div className="text-center mb-12">
          <span className="text-orange text-xs font-semibold uppercase tracking-widest">What We Do</span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white mt-2">Our Services</h2>
          <p className="text-slate mt-3 max-w-xl mx-auto">
            Full-spectrum trucking compliance, permits, and authority services for Canadian and US-bound carriers.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] ?? Building2;
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
              >
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex flex-col gap-4 bg-navy border border-steel hover:border-orange/50 rounded-xl p-6 transition-all hover:shadow-lg hover:shadow-orange/5"
                >
                  <div className="w-12 h-12 bg-orange/10 rounded-lg flex items-center justify-center group-hover:bg-orange/20 transition-colors">
                    <Icon className="w-6 h-6 text-orange" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-white text-base group-hover:text-orange transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate text-sm mt-1 leading-relaxed">{service.shortDescription}</p>
                  </div>
                  <div className="flex items-center gap-1 text-orange text-sm font-medium mt-auto">
                    Learn more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/blocks/ServicesGrid.tsx
git commit -m "feat: build services grid with animated cards"
```

---

## Task 12: Homepage — WhyUsSection

**Files:**
- Create: `components/blocks/WhyUsSection.tsx`

- [ ] **Step 1: Create WhyUsSection using bento grid layout**

Create `components/blocks/WhyUsSection.tsx`:
```tsx
"use client";

import { motion } from "framer-motion";
import { Clock, Package, Bell, Globe } from "lucide-react";

const items = [
  {
    icon: Clock,
    title: "10+ Years of Experience",
    description:
      "Since 2014, Smart Trucking Services Inc has helped hundreds of carriers navigate complex US and Canadian trucking regulations. Our team brings deep expertise in Motor Carrier and DOT operations so you don't have to.",
    large: true,
  },
  {
    icon: Package,
    title: "One-Stop Shop",
    description: "From company registration to IFTA filings — everything under one roof.",
    large: false,
  },
  {
    icon: Bell,
    title: "Timely Renewal Tracking",
    description: "We track all your permits and authorities and alert you before they expire.",
    large: false,
  },
  {
    icon: Globe,
    title: "US + Canada Coverage",
    description: "We handle both sides of the border — FMCSA, USDOT, and provincial authorities.",
    large: false,
  },
];

export function WhyUsSection() {
  return (
    <section className="bg-navy py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-orange text-xs font-semibold uppercase tracking-widest">Why Choose Us</span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white mt-2">
            The STS Advantage
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Large cell */}
          <motion.div
            className="lg:col-span-2 bg-navy-mid border border-steel rounded-2xl p-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-14 h-14 bg-orange/10 rounded-xl flex items-center justify-center mb-6">
              <Clock className="w-7 h-7 text-orange" />
            </div>
            <h3 className="font-heading font-bold text-2xl text-white mb-3">{items[0].title}</h3>
            <p className="text-slate leading-relaxed">{items[0].description}</p>
          </motion.div>

          {/* Small cells */}
          {items.slice(1).map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                className="bg-navy-mid border border-steel rounded-2xl p-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i + 1) * 0.1 }}
              >
                <div className="w-12 h-12 bg-orange/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-orange" />
                </div>
                <h3 className="font-heading font-semibold text-white text-lg mb-2">{item.title}</h3>
                <p className="text-slate text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/blocks/WhyUsSection.tsx
git commit -m "feat: build bento-style Why Us section"
```

---

## Task 13: Homepage — TrainingCTA + TestimonialsSection + ContactStrip

**Files:**
- Create: `components/blocks/TrainingCTA.tsx`
- Create: `components/blocks/TestimonialsSection.tsx`
- Create: `components/blocks/ContactStrip.tsx`

- [ ] **Step 1: Create TrainingCTA**

Create `components/blocks/TrainingCTA.tsx`:
```tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

const courses = [
  "Log Book Training & Auditing",
  "Dispatch Training",
  "Supervisor Drug & Alcohol Training",
  "Transportation of Dangerous Goods (TDG)",
  "Defensive Driving",
];

export function TrainingCTA() {
  return (
    <section
      className="py-20"
      style={{
        background: "linear-gradient(135deg, #F97316 0%, #FB923C 50%, #EA580C 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-white/70 text-xs font-semibold uppercase tracking-widest">Professional Development</span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white mt-2 mb-4">
              Train Your Team
            </h2>
            <p className="text-white/80 text-lg">
              STS Inc is your one-stop shop for all trucking training requirements. We offer classroom, on-site, and online training options.
            </p>
            <Link
              href="/training"
              className="inline-flex items-center gap-2 bg-white text-orange font-bold px-8 py-4 rounded-xl mt-8 hover:bg-white/90 transition-colors shadow-lg"
            >
              View All Training Programs
            </Link>
          </motion.div>

          <motion.ul
            className="space-y-3"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {courses.map((course) => (
              <li key={course} className="flex items-center gap-3 text-white font-medium">
                <CheckCircle className="w-5 h-5 text-white/70 shrink-0" />
                {course}
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create TestimonialsSection**

Create `components/blocks/TestimonialsSection.tsx`:
```tsx
"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Smart Trucking Services made our US authority setup seamless. They handled every document and kept us informed every step of the way. Highly recommended.",
    name: "Harpreet S.",
    company: "HS Freight Inc.",
  },
  {
    quote:
      "We've been using STS for our IFTA filings for three years. Never missed a deadline, always accurate. Best decision we made for our compliance.",
    name: "Gurpreet D.",
    company: "GD Transport Ltd.",
  },
  {
    quote:
      "The TDG training for our team was excellent — professional, thorough, and very practical. Our drivers felt confident and prepared.",
    name: "Mandeep K.",
    company: "MK Carriers",
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-navy-mid py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-orange text-xs font-semibold uppercase tracking-widest">Client Feedback</span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white mt-2">
            What Our Clients Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="bg-navy border border-steel rounded-2xl p-6 flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Quote className="w-8 h-8 text-orange mb-4" />
              <p className="text-slate leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-6 pt-4 border-t border-steel">
                <p className="text-white font-semibold text-sm">{t.name}</p>
                <p className="text-slate text-xs">{t.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create ContactStrip**

Create `components/blocks/ContactStrip.tsx`:
```tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Phone, MessageSquare } from "lucide-react";

export function ContactStrip() {
  return (
    <section className="bg-navy border-t border-steel py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white">
            Ready to Get Started?
          </h2>
          <p className="text-slate mt-3 text-lg">
            Speak with one of our trained and professional consultants today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <a
              href="tel:9055816105"
              className="inline-flex items-center gap-2 bg-navy-mid border border-steel hover:border-orange text-white font-semibold px-8 py-4 rounded-xl transition-colors"
            >
              <Phone className="w-5 h-5 text-orange" />
              905-581-6105
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-orange hover:bg-orange-light text-white font-semibold px-8 py-4 rounded-xl transition-colors shadow-lg shadow-orange/20"
            >
              <MessageSquare className="w-5 h-5" />
              Send Us a Message
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add components/blocks/TrainingCTA.tsx components/blocks/TestimonialsSection.tsx components/blocks/ContactStrip.tsx
git commit -m "feat: add training CTA, testimonials, and contact strip sections"
```

---

## Task 14: Homepage Assembly

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Assemble homepage**

Replace `app/page.tsx`:
```tsx
import { HeroSection } from "@/components/blocks/HeroSection";
import { StatsBar } from "@/components/blocks/StatsBar";
import { ServicesGrid } from "@/components/blocks/ServicesGrid";
import { WhyUsSection } from "@/components/blocks/WhyUsSection";
import { TrainingCTA } from "@/components/blocks/TrainingCTA";
import { TestimonialsSection } from "@/components/blocks/TestimonialsSection";
import { ContactStrip } from "@/components/blocks/ContactStrip";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <ServicesGrid />
      <WhyUsSection />
      <TrainingCTA />
      <TestimonialsSection />
      <ContactStrip />
    </>
  );
}
```

- [ ] **Step 2: Verify full homepage renders**

```bash
npm run dev
```
Open `http://localhost:3000` and scroll through the full page. Verify: hero, stats, services grid, why us bento, training CTA, testimonials, contact strip, footer all display correctly.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: assemble complete homepage"
```

---

## Task 15: ServiceDetail Component + Dynamic Service Pages

**Files:**
- Create: `components/blocks/ServiceDetail.tsx`
- Create: `app/services/[slug]/page.tsx`
- Create: `app/services/page.tsx`

- [ ] **Step 1: Create ServiceDetail layout component**

Create `components/blocks/ServiceDetail.tsx`:
```tsx
import Link from "next/link";
import { CheckCircle, Phone, ArrowRight } from "lucide-react";
import type { Service } from "@/data/services";

type Props = {
  item: Service;
  allItems: Service[];
  basePath: string;  // "/services" or "/training"
  category: string;  // "Services" or "Training"
};

export function ServiceDetail({ item, allItems, basePath, category }: Props) {
  const related = allItems.filter((s) => item.relatedSlugs.includes(s.slug));

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2">
            <p className="text-gray-600 leading-relaxed text-base mb-6">{item.fullDescription}</p>
            <h2 className="text-navy font-heading font-bold text-xl mb-4">What's Included</h2>
            <ul className="space-y-3">
              {item.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-orange mt-0.5 shrink-0" />
                  <span className="text-gray-700">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sticky CTA sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-navy rounded-2xl p-6 text-white">
              <h3 className="font-heading font-bold text-lg mb-2">Need Help With This?</h3>
              <p className="text-slate text-sm mb-6">
                Our consultants are ready to assist you with {item.title.toLowerCase()}.
              </p>
              <a
                href="tel:9055816105"
                className="flex items-center gap-2 bg-orange hover:bg-orange-light text-white font-semibold px-4 py-3 rounded-xl transition-colors w-full justify-center mb-3"
              >
                <Phone className="w-4 h-4" />
                905-581-6105
              </a>
              <Link
                href="/contact"
                className="flex items-center gap-2 border border-steel hover:border-orange text-white font-semibold px-4 py-3 rounded-xl transition-colors w-full justify-center text-sm"
              >
                Send a Message
              </Link>
              <p className="text-slate text-xs text-center mt-4">Mon–Fri, 9am–5pm EST</p>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-16 pt-12 border-t border-gray-200">
            <h2 className="font-heading font-bold text-navy text-2xl mb-6">Related {category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`${basePath}/${rel.slug}`}
                  className="group border border-gray-200 hover:border-orange rounded-xl p-5 transition-all"
                >
                  <h3 className="font-heading font-semibold text-navy group-hover:text-orange text-base transition-colors">
                    {rel.title}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">{rel.shortDescription}</p>
                  <div className="flex items-center gap-1 text-orange text-sm mt-3 font-medium">
                    Learn more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create dynamic service detail page**

Create `app/services/[slug]/page.tsx`:
```tsx
import { notFound } from "next/navigation";
import { services } from "@/data/services";
import { PageHero } from "@/components/blocks/PageHero";
import { ServiceDetail } from "@/components/blocks/ServiceDetail";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: `${service.title} | Smart Trucking Services Inc`,
    description: service.shortDescription,
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  return (
    <>
      <PageHero
        title={service.title}
        description={service.shortDescription}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
      />
      <ServiceDetail item={service} allItems={services} basePath="/services" category="Services" />
    </>
  );
}
```

- [ ] **Step 3: Create services index page**

Create `app/services/page.tsx`:
```tsx
import Link from "next/link";
import { services } from "@/data/services";
import { PageHero } from "@/components/blocks/PageHero";
import { ArrowRight, Building2, Flag, Fuel, Truck, Car, FileText, FileCheck, ShieldCheck, CreditCard, Leaf } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Smart Trucking Services Inc",
  description: "Full-spectrum trucking compliance, permits, and authority services for Canadian and US-bound carriers.",
};

const iconMap: Record<string, React.ElementType> = {
  Building2, Flag, Fuel, Truck, Car, FileText, FileCheck, ShieldCheck, CreditCard, Leaf,
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Our Services"
        description="Everything your trucking operation needs — permits, authorities, registrations, and compliance — under one roof."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = iconMap[service.icon] ?? Building2;
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group border border-gray-200 hover:border-orange rounded-xl p-6 transition-all"
                >
                  <div className="w-12 h-12 bg-orange/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-orange" />
                  </div>
                  <h2 className="font-heading font-semibold text-navy text-lg group-hover:text-orange transition-colors">
                    {service.title}
                  </h2>
                  <p className="text-gray-500 text-sm mt-2">{service.shortDescription}</p>
                  <div className="flex items-center gap-1 text-orange text-sm mt-4 font-medium">
                    Learn more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 4: Verify service pages load**

```bash
npm run dev
```
Open `http://localhost:3000/services` — confirm grid of 9 service cards.
Open `http://localhost:3000/services/company-registration` — confirm PageHero, full description, bullets, sticky CTA, related services.

- [ ] **Step 5: Commit**

```bash
git add components/blocks/ServiceDetail.tsx app/services/
git commit -m "feat: build services index and dynamic detail pages"
```

---

## Task 16: Training Pages

**Files:**
- Create: `app/training/page.tsx`
- Create: `app/training/[slug]/page.tsx`

- [ ] **Step 1: Create training index page**

Create `app/training/page.tsx`:
```tsx
import Link from "next/link";
import { training } from "@/data/training";
import { PageHero } from "@/components/blocks/PageHero";
import { ArrowRight, BookOpen, Radio, ShieldAlert, AlertTriangle, Car } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Training | Smart Trucking Services Inc",
  description: "Professional trucking training courses: log book, dispatch, TDG, defensive driving, and drug & alcohol supervisor training.",
};

const iconMap: Record<string, React.ElementType> = {
  BookOpen, Radio, ShieldAlert, AlertTriangle, Car,
};

export default function TrainingPage() {
  return (
    <>
      <PageHero
        title="Training Programs"
        description="Classroom, on-site, and online training for drivers, dispatchers, and supervisors."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Training" }]}
      />
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {training.map((course) => {
              const Icon = iconMap[course.icon] ?? BookOpen;
              return (
                <Link
                  key={course.slug}
                  href={`/training/${course.slug}`}
                  className="group border border-gray-200 hover:border-orange rounded-xl p-6 transition-all"
                >
                  <div className="w-12 h-12 bg-orange/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-orange" />
                  </div>
                  <h2 className="font-heading font-semibold text-navy text-lg group-hover:text-orange transition-colors">
                    {course.title}
                  </h2>
                  <p className="text-gray-500 text-sm mt-2">{course.shortDescription}</p>
                  <div className="flex items-center gap-1 text-orange text-sm mt-4 font-medium">
                    Learn more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Create dynamic training detail page**

Create `app/training/[slug]/page.tsx`:
```tsx
import { notFound } from "next/navigation";
import { training } from "@/data/training";
import { PageHero } from "@/components/blocks/PageHero";
import { ServiceDetail } from "@/components/blocks/ServiceDetail";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return training.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = training.find((t) => t.slug === slug);
  if (!course) return {};
  return {
    title: `${course.title} | Smart Trucking Services Inc`,
    description: course.shortDescription,
  };
}

export default async function TrainingDetailPage({ params }: Props) {
  const { slug } = await params;
  const course = training.find((t) => t.slug === slug);
  if (!course) notFound();

  return (
    <>
      <PageHero
        title={course.title}
        description={course.shortDescription}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Training", href: "/training" },
          { label: course.title },
        ]}
      />
      <ServiceDetail item={course} allItems={training} basePath="/training" category="Training" />
    </>
  );
}
```

- [ ] **Step 3: Verify training pages**

```bash
npm run dev
```
Open `http://localhost:3000/training` — confirm 5 course cards.
Open `http://localhost:3000/training/logbook` — confirm detail page with bullets and sticky CTA.

- [ ] **Step 4: Commit**

```bash
git add app/training/
git commit -m "feat: build training index and dynamic detail pages"
```

---

## Task 17: Contact Page

**Files:**
- Create: `app/contact/page.tsx`
- Create: `components/blocks/ContactForm.tsx`

- [ ] **Step 1: Create ContactForm component**

Create `components/blocks/ContactForm.tsx`:
```tsx
"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get("name");
    const email = data.get("email");
    const phone = data.get("phone");
    const message = data.get("message");
    const subject = encodeURIComponent(`Website Inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:info@smartruckingservices.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Send className="w-8 h-8 text-orange" />
        </div>
        <h3 className="font-heading font-bold text-navy text-xl mb-2">Message Sent!</h3>
        <p className="text-gray-500">Your email client should have opened. We'll be in touch shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-navy mb-1">Full Name *</label>
          <input
            name="name"
            required
            type="text"
            placeholder="John Smith"
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-orange transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-navy mb-1">Phone Number</label>
          <input
            name="phone"
            type="tel"
            placeholder="905-555-0100"
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-orange transition-colors"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-navy mb-1">Email Address *</label>
        <input
          name="email"
          required
          type="email"
          placeholder="you@company.com"
          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-orange transition-colors"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-navy mb-1">Message *</label>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Tell us how we can help your trucking business..."
          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-orange transition-colors resize-none"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-orange hover:bg-orange-light text-white font-semibold py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
      >
        <Send className="w-5 h-5" />
        Send Message
      </button>
    </form>
  );
}
```

- [ ] **Step 2: Create contact page**

Create `app/contact/page.tsx`:
```tsx
import { PageHero } from "@/components/blocks/PageHero";
import { ContactForm } from "@/components/blocks/ContactForm";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Smart Trucking Services Inc",
  description: "Get in touch with Smart Trucking Services Inc. Call 905-581-6105 or send us a message.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact Us"
        description="Speak with one of our professional consultants today. We're here to help."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact Us" }]}
      />
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h2 className="font-heading font-bold text-navy text-2xl mb-6">Send Us a Message</h2>
              <ContactForm />
            </div>

            {/* Info */}
            <div>
              <h2 className="font-heading font-bold text-navy text-2xl mb-6">Our Office</h2>
              <ul className="space-y-5 mb-8">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-orange/10 rounded-lg flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-orange" />
                  </div>
                  <div>
                    <p className="font-semibold text-navy text-sm">Address</p>
                    <p className="text-gray-500 text-sm mt-1">1 Gateway Blvd. Unit #303<br />Brampton, ON, L6T 0G3</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-orange/10 rounded-lg flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-orange" />
                  </div>
                  <div>
                    <p className="font-semibold text-navy text-sm">Phone</p>
                    <a href="tel:9055816105" className="text-gray-500 text-sm hover:text-orange transition-colors block mt-1">905-581-6105</a>
                    <a href="tel:9057910010" className="text-gray-500 text-sm hover:text-orange transition-colors block">905-791-0010</a>
                    <p className="text-gray-400 text-xs mt-1">Fax: 289-401-5257</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-orange/10 rounded-lg flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-orange" />
                  </div>
                  <div>
                    <p className="font-semibold text-navy text-sm">Email</p>
                    <a href="mailto:info@smartruckingservices.com" className="text-gray-500 text-sm hover:text-orange transition-colors mt-1 block">
                      info@smartruckingservices.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-orange/10 rounded-lg flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-orange" />
                  </div>
                  <div>
                    <p className="font-semibold text-navy text-sm">Hours</p>
                    <p className="text-gray-500 text-sm mt-1">Monday – Friday: 9:00 AM – 5:00 PM EST</p>
                  </div>
                </li>
              </ul>

              {/* Google Maps embed */}
              <div className="rounded-xl overflow-hidden border border-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2883.8204874234584!2d-79.72012!3d43.72012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b15c65e7f9b9b%3A0x1234567890abcdef!2s1+Gateway+Blvd+%23303%2C+Brampton%2C+ON+L6T+0G3!5e0!3m2!1sen!2sca!4v1"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Smart Trucking Services Inc location"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 3: Verify contact page**

```bash
npm run dev
```
Open `http://localhost:3000/contact` — confirm two-column layout, form fields, address/phone/email info, map embed.

- [ ] **Step 4: Commit**

```bash
git add app/contact/ components/blocks/ContactForm.tsx
git commit -m "feat: build contact page with form and office info"
```

---

## Task 18: Downloads, Renewals, and About Pages

**Files:**
- Create: `app/downloads/page.tsx`
- Create: `app/renewals/page.tsx`
- Create: `app/about/page.tsx`

- [ ] **Step 1: Create Downloads page**

Create `app/downloads/page.tsx`:
```tsx
import { PageHero } from "@/components/blocks/PageHero";
import { Download } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Downloads | Smart Trucking Services Inc",
  description: "Download forms and documents for Smart Trucking Services Inc.",
};

const downloads = [
  {
    name: "NUANS Name Search Authorization Form",
    description: "Required for new corporation name registration.",
    file: "/uploads/NUANS NAME SEARCH AUTHORIZATION FORM.pdf",
  },
  {
    name: "Drug Test Account Opening Form",
    description: "Open a drug testing account with Smart Testing.",
    file: "/uploads/DRUG TEST ACCOUNT OPENING FORM-new.pdf",
  },
  {
    name: "New Incorporation Registration Form",
    description: "Start the process for your new trucking company incorporation.",
    file: "/uploads/New Incorporation Registration Form.pdf",
  },
  {
    name: "Credit Card Authorization Form",
    description: "Authorize credit card payments for STS services.",
    file: "/uploads/Credit Card Authorization Form.pdf",
  },
];

export default function DownloadsPage() {
  return (
    <>
      <PageHero
        title="Downloads"
        description="Click on a link below to download the form you need."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Downloads" }]}
      />
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="divide-y divide-gray-100">
            {downloads.map((doc) => (
              <div key={doc.name} className="flex items-center justify-between py-5 gap-4">
                <div>
                  <p className="font-heading font-semibold text-navy text-base">{doc.name}</p>
                  <p className="text-gray-500 text-sm mt-1">{doc.description}</p>
                </div>
                <a
                  href={doc.file}
                  download
                  className="inline-flex items-center gap-2 bg-orange hover:bg-orange-light text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors shrink-0"
                >
                  <Download className="w-4 h-4" />
                  Download
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Create Renewals page**

Create `app/renewals/page.tsx`:
```tsx
import { PageHero } from "@/components/blocks/PageHero";
import { ContactStrip } from "@/components/blocks/ContactStrip";
import { CheckCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Renewal Ahead | Smart Trucking Services Inc",
  description: "Stay compliant — STS Inc tracks all your permits and authorities for timely renewals.",
};

const tracked = [
  "IFTA licence and decal renewals",
  "IRP apportioned plate renewals",
  "USDOT and MC number biennial updates",
  "Oversize and overweight permit renewals",
  "Provincial operating licence renewals",
  "C-TPAT and PIP certification renewals",
  "Ontario FRP plate renewals",
  "Drug testing programme renewals",
];

export default function RenewalsPage() {
  return (
    <>
      <PageHero
        title="Renewal Ahead — Stay Compliant"
        description="STS Inc tracks all your permits, authorities, and licences so you never miss a renewal deadline."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Renewals" }]}
      />
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-600 text-lg leading-relaxed mb-10">
            Maintaining compliance means staying on top of dozens of renewal dates across multiple regulatory bodies. Smart Trucking Services Inc tracks all the existing permits and authorities of its clients to ensure timely renewal — so you can focus on running your business.
          </p>
          <h2 className="font-heading font-bold text-navy text-2xl mb-6">What We Track</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {tracked.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-orange mt-0.5 shrink-0" />
                <span className="text-gray-700 text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <ContactStrip />
    </>
  );
}
```

- [ ] **Step 3: Create About page**

Create `app/about/page.tsx`:
```tsx
import { PageHero } from "@/components/blocks/PageHero";
import { ContactStrip } from "@/components/blocks/ContactStrip";
import { StatsBar } from "@/components/blocks/StatsBar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Smart Trucking Services Inc",
  description: "Learn about Smart Trucking Services Inc — Canada's one-stop shop for trucking compliance since 2014.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About Smart Trucking Services Inc"
        description="Your one-stop shop for all trucking services — established 2014, Brampton, ON."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
      />
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div>
            <h2 className="font-heading font-bold text-navy text-2xl mb-4">Who We Are</h2>
            <p className="text-gray-600 leading-relaxed">
              Smart Trucking Services Inc is one of the leading Canadian companies providing services to trucking companies irrespective of their size. We are a one-stop shop for all solutions to the trucking industry, with many satisfied clients. We are a professionally managed company with years of experience in the trucking industry.
            </p>
          </div>
          <div>
            <h2 className="font-heading font-bold text-navy text-2xl mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              Our mission is to provide our clients with the highest quality of service at affordable rates. We are committed to providing the highest quality of service at the most economical costs with our professional and expert advice. We strive to be the best in the industry. We are not satisfied until you are. Let's work together to grow.
            </p>
          </div>
          <div>
            <h2 className="font-heading font-bold text-navy text-2xl mb-4">Our Expertise</h2>
            <p className="text-gray-600 leading-relaxed">
              Whether you are a new entrant or an established carrier, we believe that safety is a requirement as well as a good business practice. Our innovative safety solutions help you sustain your business and grow by staying compliant. At STS Inc our team of dedicated consultants has many years of experience in Motor Carrier and DOT operations, so you can rely on our quality commercial trucking consulting services.
            </p>
          </div>
        </div>
      </section>
      <StatsBar />
      <ContactStrip />
    </>
  );
}
```

- [ ] **Step 4: Verify all three pages load**

```bash
npm run dev
```
- `http://localhost:3000/downloads` — confirm 4 download rows with buttons
- `http://localhost:3000/renewals` — confirm tracked items list
- `http://localhost:3000/about` — confirm 3 text sections + stats + contact strip

- [ ] **Step 5: Commit**

```bash
git add app/downloads/ app/renewals/ app/about/
git commit -m "feat: build downloads, renewals, and about pages"
```

---

## Task 19: Static Build Verification

**Files:**
- No new files — final verification pass

- [ ] **Step 1: Run full TypeScript check**

```bash
npx tsc --noEmit
```
Expected: zero errors. If errors appear, fix them before continuing.

- [ ] **Step 2: Run static build**

```bash
npm run build
```
Expected output includes:
```
Route (app)                              Size
┌ ○ /                                   ...
├ ○ /about                              ...
├ ○ /contact                            ...
├ ○ /downloads                          ...
├ ○ /renewals                           ...
├ ○ /services                           ...
├ ● /services/[slug]                    ...
├ ○ /training                           ...
└ ● /training/[slug]                    ...
```
All routes should show ○ (static) or ● (SSG). No λ (server) routes.

- [ ] **Step 3: Verify /out folder was created**

```bash
ls out/
```
Expected: `index.html`, `about/`, `services/`, `training/`, `contact/`, `downloads/`, `renewals/` directories all present.

- [ ] **Step 4: Serve static output to confirm it runs offline**

```bash
npx serve out -p 3001
```
Open `http://localhost:3001` — confirm the full site works from the static export (no Next.js dev server). Navigate to several pages including `/services/company-registration` and `/training/logbook`.

- [ ] **Step 5: Final commit**

```bash
git add .
git commit -m "feat: complete Smart Trucking Services website — all pages, static build verified"
```

---

## Self-Review Checklist

**Spec coverage:**
- ✅ All 9 service routes (Task 15)
- ✅ All 5 training routes (Task 16)
- ✅ Homepage with all 7 sections (Tasks 9–14)
- ✅ Navbar with dropdowns + portal links (Task 5)
- ✅ 4-column footer (Task 6)
- ✅ Contact page with form + map (Task 17)
- ✅ Downloads page with 4 PDFs (Task 18)
- ✅ Renewals page (Task 18)
- ✅ About page (Task 18)
- ✅ Dark navy + orange color palette (Task 2)
- ✅ Plus Jakarta Sans + Inter fonts (Task 2)
- ✅ Framer Motion animations throughout (Tasks 5, 8, 9, 11, 12, 13)
- ✅ Static export `output: 'export'` (Task 1)
- ✅ `generateStaticParams` on dynamic routes (Tasks 15, 16)
- ✅ `generateMetadata` on every page (Tasks 14–18)
- ✅ 21st.dev component install commands (Task 3)
- ✅ StatCounter count-up animation (Task 7)
- ✅ PageHero reusable component (Task 8)
- ✅ ServiceDetail reusable for both services and training (Task 15)
- ✅ Contact form with mailto action (Task 17)
- ✅ Portal links subtle in Navbar and Footer (Tasks 5, 6)
