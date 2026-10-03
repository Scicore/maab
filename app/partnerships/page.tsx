import type { Metadata } from "next";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Handshake, Globe2, TrendingUp, Users } from "lucide-react";
import { PartnershipForm } from "@/components/forms/PartnershipForm";

export const metadata: Metadata = {
  title: "Partnerships",
  description:
    "MAAB works with businesses, organizations, professionals, and international partners. Submit a partnership inquiry.",
  alternates: { canonical: "/partnerships" },
};

const pillars = [
  { icon: Handshake, title: "Strategic Partnerships", text: "Long-term relationships with organizations that share MAAB's standards and approach." },
  { icon: Globe2, title: "International Collaboration", text: "Cross-border work with businesses and institutions across regions." },
  { icon: TrendingUp, title: "Business Development", text: "Joint work that supports growth in relevant markets and sectors." },
  { icon: Users, title: "Professional Networks", text: "Connections with professionals, advisors, and specialists where relevant." },
];

export default function PartnershipsPage() {
  return (
    <>
      <section className="bg-navy-900 text-white">
        <div className="container-wide py-20 lg:py-28">
          <div className="eyebrow-line text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-brass mb-5">
            Partnerships
          </div>
          <h1 className="text-h1 max-w-3xl mb-7 text-white">
            Partner with MAAB.
          </h1>
          <p className="text-lg text-white/70 leading-relaxed max-w-2xl">
            MAAB works with businesses, organizations, professionals, and
            international partners. If your organization is interested in
            exploring a partnership, we welcome the conversation.
          </p>
        </div>
      </section>

      <Section className="bg-white">
        <SectionHeader
          eyebrow="How We Partner"
          title="Four pillars of MAAB partnership."
        />
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <Card
                key={p.title}
                className="transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated hover:border-navy-300"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-md bg-navy-900 text-white mb-5">
                  <Icon className="w-5 h-5" />
                </span>
                <h3 className="text-[1.0625rem] font-semibold mb-2">{p.title}</h3>
                <p className="text-ink-soft text-[0.9375rem] leading-relaxed">{p.text}</p>
              </Card>
            );
          })}
        </div>
      </Section>

      <Section className="bg-sea-100">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="Partner With MAAB"
              title="Submit a partnership inquiry."
              description="Complete the form and MAAB will review your inquiry. All fields marked with an asterisk are required."
            />
          </div>
          <div className="lg:col-span-7">
            <Card className="!p-8 sm:!p-10">
              <PartnershipForm />
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}