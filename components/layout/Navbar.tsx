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
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
        scrolled ? "shadow-sm border-b border-slate-100" : ""
      }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-navy font-heading font-bold text-lg">
            <Truck className="text-orange w-6 h-6" />
            <span>Smart <span className="text-orange">Trucking</span></span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Services dropdown */}
            <div className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
              <button
                className="flex items-center gap-1 text-slate-600 hover:text-navy text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange rounded"
                aria-expanded={servicesOpen}
                aria-haspopup="true"
              >
                Services <ChevronDown className="w-4 h-4" />
              </button>
              {servicesOpen && (
                <div className="absolute top-full left-0 mt-0 w-64 bg-white border border-slate-200 rounded-lg shadow-lg pt-3 pb-2 z-50">
                  {services.map((s) => (
                    <Link key={s.href} href={s.href} className="block px-4 py-2 text-sm text-slate-600 hover:text-navy hover:bg-slate-50 transition-colors">
                      {s.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Training dropdown */}
            <div className="relative" onMouseEnter={() => setTrainingOpen(true)} onMouseLeave={() => setTrainingOpen(false)}>
              <button
                className="flex items-center gap-1 text-slate-600 hover:text-navy text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange rounded"
                aria-expanded={trainingOpen}
                aria-haspopup="true"
              >
                Training <ChevronDown className="w-4 h-4" />
              </button>
              {trainingOpen && (
                <div className="absolute top-full left-0 mt-0 w-56 bg-white border border-slate-200 rounded-lg shadow-lg pt-3 pb-2 z-50">
                  {trainingLinks.map((t) => (
                    <Link key={t.href} href={t.href} className="block px-4 py-2 text-sm text-slate-600 hover:text-navy hover:bg-slate-50 transition-colors">
                      {t.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <a href="https://smarttesting.ca" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-navy text-sm font-medium transition-colors">
              Drug Testing
            </a>
            <Link href="/renewals" className="text-slate-600 hover:text-navy text-sm font-medium transition-colors">Renewals</Link>
            <Link href="/downloads" className="text-slate-600 hover:text-navy text-sm font-medium transition-colors">Downloads</Link>
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="https://clientportal.smartrucking.ca" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-navy text-xs transition-colors">
              Client Portal
            </a>
            <Link href="/employee/login" className="text-slate-500 hover:text-navy text-xs transition-colors">
              Employee Portal
            </Link>
            <Link href="/contact" className="bg-orange hover:bg-orange-light text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2">
              Contact Us
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange rounded"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
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
    </motion.nav>
  );
}
