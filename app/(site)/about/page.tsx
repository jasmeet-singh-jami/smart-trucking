import { PageHero } from "@/components/blocks/PageHero";
import { ContactStrip } from "@/components/blocks/ContactStrip";
import { StatsBar } from "@/components/blocks/StatsBar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Smart Trucking Services Inc — Canada's one-stop shop for trucking compliance, permits, and training since 2014. Based in Brampton, ON.",
  alternates: { canonical: "https://smartrucking.ca/about" },
  openGraph: {
    title: "About Smart Trucking Services Inc.",
    description: "Professionally managed trucking consultants with years of experience in Motor Carrier and DOT operations. Serving carriers since 2014.",
    url: "https://smartrucking.ca/about",
    images: [{ url: "/images/hero-bg.jpg", width: 1920, height: 1280, alt: "About Smart Trucking Services Inc." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Smart Trucking Services Inc.",
    description: "Canada's one-stop shop for trucking compliance and training since 2014, based in Brampton, ON.",
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About Smart Trucking Services Inc"
        description="Your one-stop shop for all trucking services — established 2014, Brampton, ON."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
      />
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div>
            <h2 className="font-heading font-bold text-navy text-2xl mb-4">Who We Are</h2>
            <p className="text-gray-600 leading-relaxed">
              Smart Trucking Services Inc is one of the leading Canadian companies providing services to trucking companies irrespective of their size. We are a one-stop shop for all solutions to the trucking industry, with many satisfied clients. We are a professionally managed company with years of experience in the trucking industry.
            </p>
          </div>
          <div>
            <h2 className="font-heading font-bold text-navy text-2xl mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              Our mission is to provide our clients with the highest quality of service at affordable rates. We are committed to providing the highest quality of service at the most economical costs with our professional and expert advice. We strive to be the best in the industry. We are not satisfied until you are. Let's work together to grow.
            </p>
          </div>
          <div>
            <h2 className="font-heading font-bold text-navy text-2xl mb-4">Our Expertise</h2>
            <p className="text-gray-600 leading-relaxed">
              Whether you are a new entrant or an established carrier, we believe that safety is a requirement as well as a good business practice. Our innovative safety solutions help you sustain your business and grow by staying compliant. At STS Inc our team of dedicated consultants has many years of experience in Motor Carrier and DOT operations, so you can rely on our quality commercial trucking consulting services.
            </p>
          </div>
        </div>
      </section>
      <StatsBar />
      <ContactStrip />
    </>
  );
}
