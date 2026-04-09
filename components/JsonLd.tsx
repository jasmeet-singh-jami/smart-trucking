// LocalBusiness structured data for Google rich results
export function LocalBusinessJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Smart Trucking Services Inc.",
    alternateName: "STS Inc",
    url: "https://smartrucking.ca",
    logo: "https://smartrucking.ca/images/hero-bg.jpg",
    image: "https://smartrucking.ca/images/hero-bg.jpg",
    description:
      "Canada's one-stop shop for trucking compliance, permits, authorities, and training. Serving US-Canada carriers from Brampton, ON since 2014.",
    telephone: ["+1-905-581-6105", "+1-905-791-0010"],
    faxNumber: "+1-289-401-5257",
    email: "info@smartruckingservices.com",
    foundingDate: "2014",
    address: {
      "@type": "PostalAddress",
      streetAddress: "1 Gateway Blvd. Unit #303",
      addressLocality: "Brampton",
      addressRegion: "ON",
      postalCode: "L6T 0G3",
      addressCountry: "CA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 43.7201,
      longitude: -79.7201,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "17:00",
      },
    ],
    areaServed: [
      { "@type": "Country", name: "Canada" },
      { "@type": "Country", name: "United States" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Trucking Compliance Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Company Registration" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "US & Canada Authorities" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Fuel Tax & IFTA" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Oversize Permits" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "IRP & FRP Registration" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "ACE / ACI eManifest" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "C-TPAT / PIP / FAST" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Log Book Training" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Dispatch Training" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Dangerous Goods (TDG)" } },
      ],
    },
    sameAs: [
      "https://smarttesting.ca",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
