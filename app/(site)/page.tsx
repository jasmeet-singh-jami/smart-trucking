import type { Metadata } from "next";
import { ScrollHomepage } from "@/components/blocks/ScrollHomepage";

export const metadata: Metadata = {
  title: "Smart Trucking Services Inc. | Trucking Compliance & Permits",
  description:
    "Canada's trusted trucking consultants. Company registration, US/Canada authorities, IFTA, oversize permits, eManifest, and training — all from Brampton, ON.",
  alternates: { canonical: "https://smartrucking.ca" },
  openGraph: {
    title: "Smart Trucking Services Inc. | Trucking Compliance & Permits",
    description:
      "Canada's trusted trucking consultants. Company registration, US/Canada authorities, IFTA, oversize permits, eManifest, and training.",
    url: "https://smartrucking.ca",
    siteName: "Smart Trucking Services Inc.",
    locale: "en_CA",
    type: "website",
    images: [{ url: "/images/hero-bg.jpg", width: 1920, height: 1280, alt: "Smart Trucking Services Inc." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Smart Trucking Services Inc. | Trucking Compliance & Permits",
    description: "Canada's trusted trucking consultants for permits, authorities, IFTA, eManifest, and training.",
    images: ["/images/hero-bg.jpg"],
  },
};

export default function HomePage() {
  return <ScrollHomepage />;
}
