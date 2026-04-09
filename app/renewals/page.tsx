import { PageHero } from "@/components/blocks/PageHero";
import { ContactStrip } from "@/components/blocks/ContactStrip";
import { CheckCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Renewals",
  description: "STS Inc tracks all your trucking permits, authorities, and licences — IFTA, IRP, USDOT, oversize permits — so you never miss a renewal deadline.",
  alternates: { canonical: "https://smartrucking.ca/renewals" },
  openGraph: {
    title: "Permit & Authority Renewals | Smart Trucking Services Inc.",
    description: "Never miss a renewal — STS Inc tracks IFTA, IRP, USDOT, oversize permits, C-TPAT, and more for Canadian and US carriers.",
    url: "https://smartrucking.ca/renewals",
    images: [{ url: "/images/hero-bg.jpg", width: 1920, height: 1280, alt: "Trucking Permit Renewals" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Permit & Authority Renewals | Smart Trucking Services Inc.",
    description: "Never miss a renewal — STS Inc tracks all your permits and authorities.",
  },
};

const tracked = [
  "IFTA licence and decal renewals",
  "IRP apportioned plate renewals",
  "USDOT and MC number biennial updates",
  "Oversize and overweight permit renewals",
  "Provincial operating licence renewals",
  "C-TPAT and PIP certification renewals",
  "Ontario FRP plate renewals",
  "Drug testing programme renewals",
];

export default function RenewalsPage() {
  return (
    <>
      <PageHero
        title="Renewal Ahead — Stay Compliant"
        description="STS Inc tracks all your permits, authorities, and licences so you never miss a renewal deadline."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Renewals" }]}
      />
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-600 text-lg leading-relaxed mb-10">
            Maintaining compliance means staying on top of dozens of renewal dates across multiple regulatory bodies. Smart Trucking Services Inc tracks all the existing permits and authorities of its clients to ensure timely renewal — so you can focus on running your business.
          </p>
          <h2 className="font-heading font-bold text-navy text-2xl mb-6">What We Track</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {tracked.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-orange mt-0.5 shrink-0" />
                <span className="text-gray-700 text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <ContactStrip />
    </>
  );
}
