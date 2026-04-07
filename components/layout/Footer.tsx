import Link from "next/link";
import { Truck, Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-navy border-t border-steel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Truck className="text-orange w-6 h-6" />
              <span className="font-heading font-bold text-white text-lg">
                Smart <span className="text-orange">Trucking</span>
              </span>
            </div>
            <p className="text-slate text-sm leading-relaxed">
              Smart Trucking Services Inc — your one-stop shop for trucking compliance, permits, and training. Serving carriers across Canada and the US since 2014.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: "About Us", href: "/about" },
                { label: "Contact Us", href: "/contact" },
                { label: "Downloads", href: "/downloads" },
                { label: "Renewals", href: "/renewals" },
                { label: "Drug Testing", href: "https://smarttesting.ca", external: true },
              ].map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-slate hover:text-white text-sm transition-colors">
                      {link.label} ↗
                    </a>
                  ) : (
                    <Link href={link.href} className="text-slate hover:text-white text-sm transition-colors">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">Services</h4>
            <ul className="space-y-2">
              {[
                { label: "Company Registration", href: "/services/company-registration" },
                { label: "US & Canada Authorities", href: "/services/us-canada-authorities" },
                { label: "Fuel Tax & IFTA", href: "/services/fuel-tax-ifta" },
                { label: "Oversize Permits", href: "/services/oversize-permits" },
                { label: "IRP & FRP Registration", href: "/services/irp-frp-registration" },
              ].map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="text-slate hover:text-white text-sm transition-colors">
                    {s.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services" className="text-orange hover:text-orange-light text-sm transition-colors">
                  View All Services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-slate text-sm">
                <MapPin className="w-4 h-4 text-orange mt-0.5 shrink-0" />
                <span>1 Gateway Blvd. Unit #303<br />Brampton, ON, L6T 0G3</span>
              </li>
              <li className="flex items-center gap-2 text-slate text-sm">
                <Phone className="w-4 h-4 text-orange shrink-0" />
                <a href="tel:9055816105" className="hover:text-white transition-colors">905-581-6105</a>
              </li>
              <li className="flex items-center gap-2 text-slate text-sm">
                <Phone className="w-4 h-4 text-orange shrink-0" />
                <a href="tel:9057910010" className="hover:text-white transition-colors">905-791-0010</a>
              </li>
              <li className="flex items-center gap-2 text-slate text-sm">
                <Mail className="w-4 h-4 text-orange shrink-0" />
                <a href="mailto:info@smartruckingservices.com" className="hover:text-white transition-colors break-all">
                  info@smartruckingservices.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-steel flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-slate text-xs">© 2026 Smart Trucking Services Inc. All Rights Reserved.</p>
          <div className="flex gap-4">
            <a href="https://clientportal.smartrucking.ca" target="_blank" rel="noopener noreferrer" className="text-slate hover:text-white text-xs transition-colors">
              Client Portal
            </a>
            <a href="https://admin.smartrucking.ca" target="_blank" rel="noopener noreferrer" className="text-slate hover:text-white text-xs transition-colors">
              Employee Login
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
