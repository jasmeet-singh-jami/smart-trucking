import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Geist } from "next/font/google";
import "./globals.css";
import { LocalBusinessJsonLd } from "@/components/JsonLd";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://smartrucking.ca"),
  title: {
    default: "Smart Trucking Services Inc. | Trucking Compliance & Permits",
    template: "%s | Smart Trucking Services Inc.",
  },
  description:
    "Canada's trusted trucking consultants. Company registration, US/Canada authorities, IFTA, oversize permits, eManifest, and training — all from Brampton, ON.",
  openGraph: {
    title: "Smart Trucking Services Inc.",
    description:
      "Canada's one-stop shop for trucking compliance, permits, authorities, and training. Serving US-Canada carriers since 2014.",
    url: "https://smartrucking.ca",
    siteName: "Smart Trucking Services Inc.",
    locale: "en_CA",
    type: "website",
    images: [
      {
        url: "/images/hero-bg.jpg",
        width: 1920,
        height: 1280,
        alt: "Smart Trucking Services Inc. — Brampton, ON",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Smart Trucking Services Inc.",
    description:
      "Canada's one-stop shop for trucking compliance, permits, authorities, and training.",
    images: ["/images/hero-bg.jpg"],
  },
  alternates: {
    canonical: "https://smartrucking.ca",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        inter.variable,
        jakarta.variable,
        "font-sans",
        geist.variable
      )}
    >
      <head>
        <link
          rel="preload"
          as="image"
          href="/images/hero-bg.jpg"
          fetchPriority="high"
        />
      </head>
      <body>
        <LocalBusinessJsonLd />
        {children}
      </body>
    </html>
  );
}
