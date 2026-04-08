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
    <section className="bg-slate-100 pt-24 pb-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-1 text-slate-400 text-sm mb-4">
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1">
                {i > 0 && <ChevronRight className="w-3 h-3" />}
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-navy transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-navy">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <motion.h1
          className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-navy"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            className="text-slate-500 text-lg mt-4 max-w-2xl"
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
