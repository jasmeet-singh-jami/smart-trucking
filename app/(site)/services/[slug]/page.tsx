import { notFound } from "next/navigation";
import { services } from "@/data/services";
import { PageHero } from "@/components/blocks/PageHero";
import { ServiceDetail } from "@/components/blocks/ServiceDetail";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.shortDescription,
    alternates: { canonical: `https://smartrucking.ca/services/${slug}` },
    openGraph: {
      title: `${service.title} | Smart Trucking Services Inc.`,
      description: service.shortDescription,
      url: `https://smartrucking.ca/services/${slug}`,
      images: [{ url: "/images/hero-bg.jpg", width: 1920, height: 1280, alt: service.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} | Smart Trucking Services Inc.`,
      description: service.shortDescription,
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  return (
    <>
      <PageHero
        title={service.title}
        description={service.shortDescription}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
      />
      <ServiceDetail item={service} allItems={services} basePath="/services" category="Services" />
    </>
  );
}
