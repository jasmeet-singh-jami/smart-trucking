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
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <div className="text-center mb-12">
          <span className="text-orange text-xs font-semibold uppercase tracking-widest">Our Services</span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-navy mt-2">Everything We Handle</h2>
          <p className="text-slate-500 mt-3 max-w-xl mx-auto">
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
                  className="group flex flex-col gap-4 bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-orange/40 rounded-xl p-6 transition-all"
                >
                  <div className="w-12 h-12 bg-orange/10 rounded-lg flex items-center justify-center group-hover:bg-orange/20 transition-colors">
                    <Icon className="w-6 h-6 text-orange" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-navy text-base group-hover:text-orange transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate-500 text-sm mt-1 leading-relaxed">{service.shortDescription}</p>
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
