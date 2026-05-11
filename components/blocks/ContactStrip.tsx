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
              className="inline-flex items-center gap-2 bg-navy-mid border border-steel hover:border-orange text-white font-semibold px-8 py-4 rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
            >
              <Phone className="w-5 h-5 text-orange" />
              905-581-6105
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-orange hover:bg-orange-light text-white font-semibold px-8 py-4 rounded-xl transition-colors shadow-lg shadow-orange/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
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
