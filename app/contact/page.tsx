import { PageHero } from "@/components/blocks/PageHero";
import { ContactForm } from "@/components/blocks/ContactForm";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Smart Trucking Services Inc. Call 905-581-6105 or send us a message from our Brampton, ON office.",
  alternates: { canonical: "https://smartrucking.ca/contact" },
  openGraph: {
    title: "Contact Smart Trucking Services Inc.",
    description: "Call 905-581-6105 or send us a message. Office at 1 Gateway Blvd. Unit #303, Brampton, ON.",
    url: "https://smartrucking.ca/contact",
    images: [{ url: "/images/hero-bg.jpg", width: 1920, height: 1280, alt: "Contact Smart Trucking Services" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Smart Trucking Services Inc.",
    description: "Call 905-581-6105 or send us a message. Office in Brampton, ON.",
  },
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
