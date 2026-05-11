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
        <p className="text-slate-500">Your email client should have opened. We'll be in touch shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium text-navy mb-1">Full Name *</label>
          <input
            id="contact-name"
            name="name"
            required
            type="text"
            placeholder="John Smith"
            className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-orange transition-colors"
          />
        </div>
        <div>
          <label htmlFor="contact-phone" className="block text-sm font-medium text-navy mb-1">Phone Number</label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            placeholder="905-555-0100"
            className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-orange transition-colors"
          />
        </div>
      </div>
      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-navy mb-1">Email Address *</label>
        <input
          id="contact-email"
          name="email"
          required
          type="email"
          placeholder="you@company.com"
          className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-orange transition-colors"
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-navy mb-1">Message *</label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          placeholder="Tell us how we can help your trucking business..."
          className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-orange transition-colors resize-none"
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
