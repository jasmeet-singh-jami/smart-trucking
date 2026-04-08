import Link from "next/link";
import { CheckCircle, Phone, ArrowRight } from "lucide-react";
import type { Service } from "@/data/services";

type Props = {
  item: Service;
  allItems: Service[];
  basePath: string;  // "/services" or "/training"
  category: string;  // "Services" or "Training"
};

export function ServiceDetail({ item, allItems, basePath, category }: Props) {
  const related = allItems.filter((s) => item.relatedSlugs.includes(s.slug));

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2">
            <p className="text-gray-600 leading-relaxed text-base mb-6">{item.fullDescription}</p>
            <h2 className="text-navy font-heading font-bold text-xl mb-4">What's Included</h2>
            <ul className="space-y-3">
              {item.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-orange mt-0.5 shrink-0" />
                  <span className="text-gray-700">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sticky CTA sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-orange/5 border border-orange/20 rounded-2xl p-6">
              <h3 className="font-heading font-bold text-navy text-lg mb-2">Need Help With This?</h3>
              <p className="text-slate-500 text-sm mb-6">
                Our consultants are ready to assist you with {item.title.toLowerCase()}.
              </p>
              <a
                href="tel:9055816105"
                className="flex items-center gap-2 bg-orange hover:bg-orange-light text-white font-semibold px-4 py-3 rounded-xl transition-colors w-full justify-center mb-3"
              >
                <Phone className="w-4 h-4" />
                905-581-6105
              </a>
              <Link
                href="/contact"
                className="flex items-center gap-2 border border-slate-300 hover:border-orange text-navy font-semibold px-4 py-3 rounded-xl transition-colors w-full justify-center text-sm"
              >
                Send a Message
              </Link>
              <p className="text-slate-400 text-xs text-center mt-4">Mon–Fri, 9am–5pm EST</p>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-16 pt-12 border-t border-gray-200">
            <h2 className="font-heading font-bold text-navy text-2xl mb-6">Related {category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`${basePath}/${rel.slug}`}
                  className="group border border-gray-200 hover:border-orange rounded-xl p-5 transition-all"
                >
                  <h3 className="font-heading font-semibold text-navy group-hover:text-orange text-base transition-colors">
                    {rel.title}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">{rel.shortDescription}</p>
                  <div className="flex items-center gap-1 text-orange text-sm mt-3 font-medium">
                    Learn more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
