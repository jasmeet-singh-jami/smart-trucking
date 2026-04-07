"use client";

import { motion } from "framer-motion";
import { Clock, Package, Bell, Globe } from "lucide-react";

const items = [
  {
    icon: Clock,
    title: "10+ Years of Experience",
    description:
      "Since 2014, Smart Trucking Services Inc has helped hundreds of carriers navigate complex US and Canadian trucking regulations. Our team brings deep expertise in Motor Carrier and DOT operations so you don't have to.",
  },
  {
    icon: Package,
    title: "One-Stop Shop",
    description: "From company registration to IFTA filings — everything under one roof.",
  },
  {
    icon: Bell,
    title: "Timely Renewal Tracking",
    description: "We track all your permits and authorities and alert you before they expire.",
  },
  {
    icon: Globe,
    title: "US + Canada Coverage",
    description: "We handle both sides of the border — FMCSA, USDOT, and provincial authorities.",
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
