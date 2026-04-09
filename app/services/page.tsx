import Link from "next/link";
import { services } from "@/data/services";
import { PageHero } from "@/components/blocks/PageHero";
import { ArrowRight, Building2, Flag, Fuel, Truck, Car, FileText, FileCheck, ShieldCheck, CreditCard, Leaf } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description: "Full-spectrum trucking compliance, permits, and authority services for Canadian and US-bound carriers.",
  alternates: { canonical: "https://smartrucking.ca/services" },
  openGraph: {
    title: "Trucking Services | Smart Trucking Services Inc.",
    description: "Full-spectrum trucking compliance, permits, and authority services for Canadian and US-bound carriers.",
    url: "https://smartrucking.ca/services",
    images: [{ url: "/images/hero-bg.jpg", width: 1920, height: 1280, alt: "Smart Trucking Services" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trucking Services | Smart Trucking Services Inc.",
    description: "Full-spectrum trucking compliance, permits, and authority services for Canadian and US-bound carriers.",
  },
};

const iconMap: Record<string, React.ElementType> = {
  Building2, Flag, Fuel, Truck, Car, FileText, FileCheck, ShieldCheck, CreditCard, Leaf,
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Our Services"
        description="Everything your trucking operation needs — permits, authorities, registrations, and compliance — under one roof."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = iconMap[service.icon] ?? Building2;
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group border border-gray-200 hover:border-orange rounded-xl p-6 transition-all"
                >
                  <div className="w-12 h-12 bg-orange/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-orange" />
                  </div>
                  <h2 className="font-heading font-semibold text-navy text-lg group-hover:text-orange transition-colors">
                    {service.title}
                  </h2>
                  <p className="text-gray-500 text-sm mt-2">{service.shortDescription}</p>
                  <div className="flex items-center gap-1 text-orange text-sm mt-4 font-medium">
                    Learn more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
