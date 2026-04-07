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
