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
              key={t.name}
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
