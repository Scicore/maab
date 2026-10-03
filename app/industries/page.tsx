import type { Metadata } from "next";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { PlaceholderBadge } from "@/components/ui/PlaceholderBadge";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Sectors MAAB works with. Sector descriptions are editable and confirmed by MAAB.",
  alternates: { canonical: "/industries" },
};

const industries = [
  "Business & Professional Services",
  "Technology",
  "Logistics & Transportation",
  "International Trade",
  "Workforce & Talent",
  "Corporate Services",
];

export default function IndustriesPage() {
  return (
    <>
      <section className="bg-navy-900 text-white">
        <div className="container-wide py-20 lg:py-28">
          <div className="eyebrow-line text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-brass mb-5">
            Industries
          </div>
          <h1 className="text-h1 max-w-3xl mb-7 text-white">
            Sectors we work with.
          </h1>
          <p className="text-lg text-white/70 leading-relaxed max-w-2xl">
            MAAB works across a range of sectors. Each sector card below is
            fully editable and will be populated with verified information once
            confirmed by MAAB.
          </p>
        </div>
      </section>

      <Section className="bg-white">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((name, i) => (
            <Card
              key={name}
              className="transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated hover:border-navy-300"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-xs text-brass">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <PlaceholderBadge>Editable</PlaceholderBadge>
              </div>
              <h3 className="text-h3 mb-3">{name}</h3>
              <p className="text-ink-soft text-[0.9375rem] leading-relaxed">
                Sector description to be confirmed. This card is structured to
                present verified scope, capabilities, and relevant experience
                once official information is provided by MAAB.
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-sea-100">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <SectionHeader
              eyebrow="Cross-Sector Work"
              title="Capabilities that cut across sectors."
              description="MAAB’s work spans multiple sectors and markets. Details on specific engagements will be published as they are verified."
            />
          </div>
          <div className="lg:col-span-5 lg:text-right">
            <Button href="/contact" size="lg" withArrow>
              Discuss a Sector
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}