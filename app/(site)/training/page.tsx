import Link from "next/link";
import { training } from "@/data/training";
import { PageHero } from "@/components/blocks/PageHero";
import { ArrowRight, BookOpen, Radio, ShieldAlert, AlertTriangle, Car } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Training",
  description: "Professional trucking training courses: log book, dispatch, TDG, defensive driving, and drug & alcohol supervisor training.",
  alternates: { canonical: "https://smartrucking.ca/training" },
  openGraph: {
    title: "Trucking Training Programs | Smart Trucking Services Inc.",
    description: "Log book, dispatch, TDG, defensive driving, and drug & alcohol supervisor training for drivers and carriers.",
    url: "https://smartrucking.ca/training",
    images: [{ url: "/images/hero-bg.jpg", width: 1920, height: 1280, alt: "Smart Trucking Training Programs" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trucking Training Programs | Smart Trucking Services Inc.",
    description: "Log book, dispatch, TDG, defensive driving, and drug & alcohol supervisor training.",
  },
};

const iconMap: Record<string, React.ElementType> = {
  BookOpen, Radio, ShieldAlert, AlertTriangle, Car,
};

export default function TrainingPage() {
  return (
    <>
      <PageHero
        title="Training Programs"
        description="Classroom, on-site, and online training for drivers, dispatchers, and supervisors."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Training" }]}
      />
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {training.map((course) => {
              const Icon = iconMap[course.icon] ?? BookOpen;
              return (
                <Link
                  key={course.slug}
                  href={`/training/${course.slug}`}
                  className="group border border-slate-200 hover:border-orange rounded-xl p-6 transition-all"
                >
                  <div className="w-12 h-12 bg-orange/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-orange" />
                  </div>
                  <h2 className="font-heading font-semibold text-navy text-lg group-hover:text-orange transition-colors">
                    {course.title}
                  </h2>
                  <p className="text-slate-500 text-sm mt-2">{course.shortDescription}</p>
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
