import type { Metadata } from "next";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { PlaceholderBadge } from "@/components/ui/PlaceholderBadge";
import { Briefcase, Handshake, Globe2, Network, Check, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services",
  description:
    "MAAB’s service portfolio is structured to cover professional services across multiple international markets.",
  alternates: { canonical: "/services" },
};

const services = [
  { icon: Briefcase, title: "[Service Area 01]", summary: "A structured service offering to be defined once MAAB’s official service catalogue is confirmed." },
  { icon: Handshake, title: "[Service Area 02]", summary: "A structured service offering to be defined once MAAB’s official service catalogue is confirmed." },
  { icon: Globe2, title: "[Service Area 03]", summary: "A structured service offering to be defined once MAAB’s official service catalogue is confirmed." },
  { icon: Network, title: "[Service Area 04]", summary: "A structured service offering to be defined once MAAB’s official service catalogue is confirmed." },
];

export default function ServicesPage() {
  return (
    <>
      <section className="border-b border-line bg-sea-100">
        <div className="container-wide py-20 lg:py-28">
          <div className="eyebrow-line text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-brass mb-5">
            Services
          </div>
          <h1 className="text-h1 max-w-3xl mb-7">
            Professional services structured for international work.
          </h1>
          <p className="text-lg text-ink-soft leading-relaxed max-w-2xl">
            MAAB’s service portfolio is being finalized. Each service area is
            structured to present scope, benefits, process, and industries
            served in a clear, professional format.
          </p>
        </div>
      </section>

      <Section className="bg-white">
        <SectionHeader
          eyebrow="What We Do"
          title="Service areas"
          description="The following service areas are placeholders. They will be replaced with MAAB’s official service definitions once confirmed."
        />

        <div className="mt-14 space-y-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <Card key={i} className="!p-8 sm:!p-10">
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
                  <div className="lg:col-span-5">
                    <div className="flex items-start gap-4 mb-5">
                      <span className="flex h-12 w-12 items-center justify-center rounded-md bg-navy-900 text-white flex-shrink-0">
                        <Icon className="w-5 h-5" />
                      </span>
                      <div>
                        <div className="font-mono text-xs text-ink-muted mb-1">
                          {String(i + 1).padStart(2, "0")}
                        </div>
                        <h3 className="text-h3 mb-2">{service.title}</h3>
                        <PlaceholderBadge>Editable content</PlaceholderBadge>
                      </div>
                    </div>
                    <p className="text-ink-soft leading-relaxed">{service.summary}</p>
                  </div>

                  <div className="lg:col-span-4">
                    <h4 className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-ink-muted mb-5">
                      Benefits
                    </h4>
                    <ul className="space-y-3">
                      {[1, 2, 3].map((n) => (
                        <li key={n} className="flex gap-3 text-[0.9375rem] text-ink-soft">
                          <Check className="w-4 h-4 text-brass flex-shrink-0 mt-0.5" />
                          <span>Benefit to be confirmed</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="lg:col-span-3">
                    <h4 className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-ink-muted mb-5">
                      Process
                    </h4>
                    <ol className="space-y-3 text-[0.9375rem] text-ink-soft">
                      <li className="flex gap-3">
                        <span className="text-brass font-mono font-medium">01</span>
                        <span>Discovery and scoping</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-brass font-mono font-medium">02</span>
                        <span>Engagement and delivery</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-brass font-mono font-medium">03</span>
                        <span>Ongoing support</span>
                      </li>
                    </ol>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-line flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="text-sm text-ink-muted">
                    <span className="font-medium text-ink">Industries served:</span> To be confirmed
                  </div>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-navy-900 hover:text-brass transition-colors"
                  >
                    Discuss this service
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </Section>

      <section className="bg-navy-950 text-white">
        <div className="container-wide py-24 lg:py-32">
          <div className="max-w-3xl">
            <div className="eyebrow-line text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-brass mb-5">
              Get In Touch
            </div>
            <h2 className="text-h2 text-white mb-6">
              Need to discuss a specific engagement?
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-10">
              MAAB welcomes conversations with organizations evaluating a
              service or exploring a partnership.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href="/contact" size="lg" withArrow>
                Contact MAAB
              </Button>
              <Button href="/partnerships" variant="secondary" size="lg">
                Partner With Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}