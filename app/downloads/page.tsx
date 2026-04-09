import { PageHero } from "@/components/blocks/PageHero";
import { Download } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Downloads",
  description: "Download forms and documents from Smart Trucking Services Inc. — NUANS, drug test, incorporation, and credit card authorization forms.",
  alternates: { canonical: "https://smartrucking.ca/downloads" },
  openGraph: {
    title: "Download Forms | Smart Trucking Services Inc.",
    description: "NUANS name search, drug test account, new incorporation registration, and credit card authorization forms.",
    url: "https://smartrucking.ca/downloads",
    images: [{ url: "/images/hero-bg.jpg", width: 1920, height: 1280, alt: "Smart Trucking Downloads" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Download Forms | Smart Trucking Services Inc.",
    description: "Download trucking compliance forms and documents from STS Inc.",
  },
};

const downloads = [
  {
    name: "NUANS Name Search Authorization Form",
    description: "Required for new corporation name registration.",
    file: "/uploads/NUANS NAME SEARCH AUTHORIZATION FORM.pdf",
  },
  {
    name: "Drug Test Account Opening Form",
    description: "Open a drug testing account with Smart Testing.",
    file: "/uploads/DRUG TEST ACCOUNT OPENING FORM-new.pdf",
  },
  {
    name: "New Incorporation Registration Form",
    description: "Start the process for your new trucking company incorporation.",
    file: "/uploads/New Incorporation Registration Form.pdf",
  },
  {
    name: "Credit Card Authorization Form",
    description: "Authorize credit card payments for STS services.",
    file: "/uploads/Credit Card Authorization Form.pdf",
  },
];

export default function DownloadsPage() {
  return (
    <>
      <PageHero
        title="Downloads"
        description="Click on a link below to download the form you need."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Downloads" }]}
      />
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="divide-y divide-gray-100">
            {downloads.map((doc) => (
              <div key={doc.name} className="flex items-center justify-between py-5 gap-4">
                <div>
                  <p className="font-heading font-semibold text-navy text-base">{doc.name}</p>
                  <p className="text-gray-500 text-sm mt-1">{doc.description}</p>
                </div>
                <a
                  href={doc.file}
                  download
                  className="inline-flex items-center gap-2 bg-orange hover:bg-orange-light text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors shrink-0"
                >
                  <Download className="w-4 h-4" />
                  Download
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
