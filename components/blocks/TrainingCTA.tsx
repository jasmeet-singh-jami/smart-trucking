"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

const courses = [
  "Logbook Rules & Regulations",
  "Dispatch Training",
  "Drug & Alcohol Supervisor Training",
  "Dangerous Goods (TDG)",
  "Defensive Driving",
];

export function TrainingCTA() {
  return (
    <section
      className="py-20"
      style={{
        background: "linear-gradient(135deg, var(--color-orange) 0%, var(--color-orange-light) 50%, #EA580C 100%)",
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
