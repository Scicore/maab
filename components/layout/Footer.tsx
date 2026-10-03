import Link from "next/link";
import {
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  ArrowUpRight,
} from "lucide-react";
import { site } from "@/lib/site";

const columns = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Industries", href: "/industries" },
      { label: "Global Presence", href: "/global-presence" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Partnerships", href: "/partnerships" },
      { label: "Careers", href: "/careers" },
      { label: "News", href: "/news" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Use", href: "/terms-of-use" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-navy-950 text-white">
      <div className="h-[3px] w-full bg-gradient-to-r from-brass via-accent to-navy-800" />

      <div className="container-wide py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link href="/" className="flex items-center gap-3 mb-7">
              <span className="flex h-10 w-10 items-center justify-center rounded-md bg-white text-navy-900 font-serif font-semibold text-lg leading-none">
                M
              </span>
              <span className="flex flex-col leading-none">
                <span className="text-[1.125rem] font-semibold tracking-[0.16em]">
                  MAAB
                </span>
                <span className="text-[0.625rem] tracking-[0.22em] text-white/50 uppercase mt-1">
                  Texas · USA
                </span>
              </span>
            </Link>
            <p className="text-white/60 leading-relaxed text-[0.9375rem] max-w-sm mb-8">
              {site.shortDescription}
            </p>
            <div className="space-y-3.5 text-[0.875rem] text-white/70">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-brass flex-shrink-0" />
                <span>Texas, United States</span>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-0.5 text-brass flex-shrink-0" />
                <span className="text-white/50">
                  [Official email to be provided]
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-0.5 text-brass flex-shrink-0" />
                <span className="text-white/50">
                  [Official phone to be provided]
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 lg:gap-12">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-white/50 mb-5">
                  {col.title}
                </h3>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group inline-flex items-center gap-1.5 text-[0.9375rem] text-white/75 hover:text-white transition-colors"
                      >
                        {link.label}
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <p className="text-[0.8125rem] text-white/50">
            © 2026 MAAB. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            {[
              { Icon: Linkedin, label: "LinkedIn" },
              { Icon: Twitter, label: "Twitter" },
              { Icon: Facebook, label: "Facebook" },
              { Icon: Instagram, label: "Instagram" },
            ].map(({ Icon, label }) => (
              <span
                key={label}
                aria-label={label}
                title="[Official profile to be provided]"
                className="flex h-9 w-9 items-center justify-center rounded-md text-white/40 border border-white/10 hover:text-white hover:border-white/30 transition-colors cursor-default"
              >
                <Icon className="w-4 h-4" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}