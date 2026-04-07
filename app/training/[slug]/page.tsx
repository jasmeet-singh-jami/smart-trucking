import { notFound } from "next/navigation";
import { training } from "@/data/training";
import { PageHero } from "@/components/blocks/PageHero";
import { ServiceDetail } from "@/components/blocks/ServiceDetail";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return training.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = training.find((t) => t.slug === slug);
  if (!course) return {};
  return {
    title: `${course.title} | Smart Trucking Services Inc`,
    description: course.shortDescription,
  };
}

export default async function TrainingDetailPage({ params }: Props) {
  const { slug } = await params;
  const course = training.find((t) => t.slug === slug);
  if (!course) notFound();

  return (
    <>
      <PageHero
        title={course.title}
        description={course.shortDescription}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Training", href: "/training" },
          { label: course.title },
        ]}
      />
      <ServiceDetail item={course} allItems={training} basePath="/training" category="Training" />
    </>
  );
}
