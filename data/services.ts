export type Service = {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  bullets: string[];
  icon: string;
  relatedSlugs: string[];
};

export const services: Service[] = [
  {
    slug: "company-registration",
    title: "Company Registration",
    shortDescription: "Set up your new trucking corporation — numbered or named.",
    fullDescription:
      "At STS Inc we specialize in setting up a new corporation for you. You can choose between a numbered corporation or a name corporation. We handle the NUANS name search, federal and provincial registration, and all required documentation to get your trucking business legally established.",
    bullets: [
      "Numbered or named corporation",
      "NUANS name search",
      "Federal and provincial registration",
      "Certificate of Incorporation",
      "Business number registration (CRA)",
    ],
    icon: "Building2",
    relatedSlugs: ["us-canada-authorities", "irp-frp-registration"],
  },
  {
    slug: "us-canada-authorities",
    title: "US & Canada Authorities",
    shortDescription: "Obtain all operating authorities needed to run cross-border.",
    fullDescription:
      "Smart Trucking Services Inc helps carriers obtain the operating authorities required to legally transport goods across the US-Canada border and within Canada. Our team handles FMCSA filings, MC numbers, BOC-3 process agent filings, and Canadian carrier codes.",
    bullets: [
      "FMCSA Motor Carrier (MC) number",
      "USDOT number registration",
      "BOC-3 process agent filing",
      "Canadian carrier code (NSC)",
      "Province-specific operating licences",
    ],
    icon: "Flag",
    relatedSlugs: ["company-registration", "irp-frp-registration"],
  },
  {
    slug: "fuel-tax-ifta",
    title: "Fuel Tax & IFTA Reporting",
    shortDescription: "Accurate quarterly IFTA filings and fuel tax compliance.",
    fullDescription:
      "The International Fuel Tax Agreement (IFTA) requires carriers operating in multiple jurisdictions to file quarterly fuel tax returns. STS Inc prepares and files your IFTA returns accurately and on time, ensuring compliance and minimizing penalties.",
    bullets: [
      "Quarterly IFTA return preparation and filing",
      "Fuel tax audit support",
      "Multi-jurisdiction fuel tax calculations",
      "IFTA licence and decal procurement",
      "Record-keeping guidance",
    ],
    icon: "Fuel",
    relatedSlugs: ["irp-frp-registration", "us-canada-authorities"],
  },
  {
    slug: "oversize-permits",
    title: "Oversize & Overweight Permits",
    shortDescription: "Annual, temporary, and superload permits for oversize loads.",
    fullDescription:
      "STS Inc can help you obtain all oversize and overweight permits required to move non-standard loads across US and Canadian highways. We handle annual blanket permits, single-trip permits, and complex superload permits.",
    bullets: [
      "Annual oversize blanket permits",
      "Temporary oversize permits",
      "Temporary superload permits",
      "Temporary trip and fuel permits",
      "Multi-province / multi-state routing",
    ],
    icon: "Truck",
    relatedSlugs: ["us-canada-authorities", "irp-frp-registration"],
  },
  {
    slug: "irp-frp-registration",
    title: "IRP & FRP Registration",
    shortDescription: "Commercial fleet licensing — IRP apportioned and FRP plates.",
    fullDescription:
      "The International Registration Plan (IRP) allows commercial vehicles to travel in multiple jurisdictions under a single apportioned registration. STS Inc handles your IRP application, renewals, fleet additions, and Ontario FRP (Fleet Registration Program) plates.",
    bullets: [
      "IRP apportioned plate registration",
      "Fleet additions and deletions",
      "Annual IRP renewals",
      "Ontario FRP plate registration",
      "Weight group changes",
    ],
    icon: "Car",
    relatedSlugs: ["us-canada-authorities", "fuel-tax-ifta"],
  },
  {
    slug: "ace-emanifest-us-to-canada",
    title: "ACE eManifest (US → Canada)",
    shortDescription: "Electronic pre-arrival manifests for US-bound shipments entering Canada.",
    fullDescription:
      "Every commercial vehicle approaching the US border must submit an ACE eManifest at least 1 hour prior to arrival. STS Inc prepares and submits ACE eManifests on your behalf, ensuring compliant and smooth border crossings into the United States.",
    bullets: [
      "ACE eManifest preparation and submission",
      "1-hour pre-arrival filing compliance",
      "Cargo and crew documentation",
      "Amendment and cancellation handling",
      "CBSA and CBP compliance review",
    ],
    icon: "FileText",
    relatedSlugs: ["aci-emanifest-canada-to-us", "ctpat-pip-fast"],
  },
  {
    slug: "aci-emanifest-canada-to-us",
    title: "ACI eManifest (Canada → US)",
    shortDescription: "Advance Commercial Information filings for Canada-bound shipments.",
    fullDescription:
      "The Advance Commercial Information (ACI) program makes Canada's border processes more secure and compatible with North American standards. STS Inc submits ACI eManifest notices on your behalf for all commercial shipments entering Canada.",
    bullets: [
      "ACI eManifest preparation and submission",
      "Pre-arrival review program (PARS)",
      "Cargo and conveyance reporting",
      "CBSA compliance guidance",
      "Amendment handling",
    ],
    icon: "FileCheck",
    relatedSlugs: ["ace-emanifest-us-to-canada", "ctpat-pip-fast"],
  },
  {
    slug: "ctpat-pip-fast",
    title: "C-TPAT, PIP & FAST Certifications",
    shortDescription: "Security certifications for expedited cross-border processing.",
    fullDescription:
      "C-TPAT (US) and PIP (Canada) are voluntary supply chain security programs that, when combined, qualify carriers for the Free and Secure Trade (FAST) program — enabling expedited border processing. STS Inc guides your company through the application and certification process.",
    bullets: [
      "C-TPAT application and enrollment",
      "PIP (Partners in Protection) application",
      "FAST lane eligibility documentation",
      "Security profile development",
      "Ongoing compliance support",
    ],
    icon: "ShieldCheck",
    relatedSlugs: ["fast-card-visa", "ace-emanifest-us-to-canada"],
  },
  {
    slug: "fast-card-visa",
    title: "FAST Card & US Visa",
    shortDescription: "FAST card applications and US visa assistance for drivers.",
    fullDescription:
      "The FAST card allows pre-approved, low-risk drivers to use dedicated FAST lanes at the border. STS Inc assists drivers with FAST card applications and provides guidance on US visa requirements for commercial drivers.",
    bullets: [
      "FAST card application preparation",
      "Background check documentation guidance",
      "US B1 visa application assistance",
      "Nexus card guidance",
      "Driver eligibility review",
    ],
    icon: "CreditCard",
    relatedSlugs: ["ctpat-pip-fast", "ace-emanifest-us-to-canada"],
  },
  {
    slug: "moe-easr",
    title: "MOE & EASR Application",
    shortDescription: "Ontario Ministry of Environment and EASR registration services.",
    fullDescription:
      "STS Inc assists Ontario carriers with Ministry of Environment (MOE) Environmental Activity and Sector Registry (EASR) applications, required for certain transportation and storage activities under Ontario environmental regulations.",
    bullets: [
      "EASR registration preparation",
      "Environmental compliance review",
      "MOE filing and submission",
      "Ongoing regulatory monitoring",
    ],
    icon: "Leaf",
    relatedSlugs: ["company-registration", "us-canada-authorities"],
  },
];
