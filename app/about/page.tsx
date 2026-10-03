import type { Metadata } from "next";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { PlaceholderBadge } from "@/components/ui/PlaceholderBadge";
import { companyInformation } from "@/lib/company";
import {
  Compass,
  Target,
  Eye,
  ShieldCheck,
  Users,
  Globe2,
  Scale,
  HeartHandshake,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About MAAB",
  description:
    "MAAB is an international business and professional services company headquartered in Texas, United States.",
  alternates: { canonical: "/about" },
};

const values = [
  { icon: ShieldCheck, title: "Integrity", text: "Straightforward communication and honest dealings." },
  { icon: Users, title: "Respect", text: "Consideration for clients, partners, and colleagues." },
  { icon: Globe2, title: "International Perspective", text: "Awareness of markets, cultures, and operating environments." },
  { icon: Scale, title: "Responsibility", text: "A considered approach to compliance and conduct." },
  { icon: HeartHandshake, title: "Long-Term Focus", text: "Durable relationships over short-term transactions." },
  { icon: Compass, title: "Professionalism", text: "Careful process, clear communication, and consistency." },
];

const timeline = [
  { year: "[Year]", title: "[Milestone to be confirmed]", text: "Company milestones will be published once verified by MAAB." },
  { year: "[Year]", title: "[Milestone to be confirmed]", text: "Company milestones will be published once verified by MAAB." },
  { year: "[Year]", title: "[Milestone to be confirmed]", text: "Company milestones will be published once verified by MAAB." },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-line bg-sea-100">
        <div className="container-wide py-20 lg:py-28">
          <div className="eyebrow-line text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-brass mb-5">
            About MAAB
          </div>
          <h1 className="text-h1 max-w-3xl mb-7">
            An international business and professional services company headquartered in Texas.
          </h1>
          <p className="text-lg text-ink-soft leading-relaxed max-w-2xl">
            MAAB works with clients, partners, and organizations across
            international markets. This page provides an overview of the
            company’s identity, values, and perspective.
          </p>
        </div>
      </section>

      <Section className="bg-white">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5">
            <div className="eyebrow-line text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-brass mb-5">
              Who We Are
            </div>
            <h2 className="text-h2">A company built for cross-border work.</h2>
          </div>
          <div className="lg:col-span-7 space-y-5 text-ink-soft leading-relaxed text-lg">
            <p>
              MAAB is an international business and professional services
              company based in Texas, United States. The company works with a
              range of clients, partners, and organizations across markets.
            </p>
            <p>
              The company’s operating approach emphasizes professional
              standards, transparent communication, and long-term relationships.
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-sea-100">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5">
            <div className="eyebrow-line text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-brass mb-5">
              Our Story
            </div>
            <h2 className="text-h2">Where MAAB is today.</h2>
          </div>
          <div className="lg:col-span-7 space-y-5 text-ink-soft leading-relaxed text-lg">
            <p>
              MAAB’s story is being written. Verified milestones, formation
              details, and institutional background will be published here as
              official information becomes available.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <PlaceholderBadge>Founded: {companyInformation.founded}</PlaceholderBadge>
              <PlaceholderBadge>Founder: {companyInformation.founder}</PlaceholderBadge>
              <PlaceholderBadge>Type: {companyInformation.companyType}</PlaceholderBadge>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-white">
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="!p-9">
            <div className="flex items-center gap-3 mb-5">
              <span className="flex h-11 w-11 items-center justify-center rounded-md bg-navy-900 text-white">
                <Target className="w-5 h-5" />
              </span>
              <h2 className="text-h3">Our Mission</h2>
            </div>
            <p className="text-ink-soft leading-relaxed text-lg">
              To connect people, businesses, and opportunities through
              professional services and international partnerships, delivered
              with consistent standards and long-term commitment.
            </p>
          </Card>
          <Card className="!p-9">
            <div className="flex items-center gap-3 mb-5">
              <span className="flex h-11 w-11 items-center justify-center rounded-md bg-navy-900 text-white">
                <Eye className="w-5 h-5" />
              </span>
              <h2 className="text-h3">Our Vision</h2>
            </div>
            <p className="text-ink-soft leading-relaxed text-lg">
              To be a trusted international partner for organizations seeking
              professional services, cross-border collaboration, and durable
              business relationships.
            </p>
          </Card>
        </div>
      </Section>

      <Section className="bg-sea-100">
        <SectionHeader
          eyebrow="Our Values"
          title="The principles behind how we work."
        />
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <div
                key={v.title}
                className="bg-white border border-line rounded-lg p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated hover:border-navy-300"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-md bg-navy-900 text-white mb-5">
                  <Icon className="w-5 h-5" />
                </span>
                <h3 className="text-[1.0625rem] font-semibold mb-2">{v.title}</h3>
                <p className="text-ink-soft text-[0.9375rem] leading-relaxed">{v.text}</p>
              </div>
            );
          })}
        </div>
      </Section>

      <Section className="bg-white">
        <SectionHeader
          eyebrow="Leadership"
          title="Leadership information"
          description="MAAB’s leadership details will be published once confirmed. No biographical information is displayed until it is verified."
        />
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="text-center !p-9">
              <div className="w-20 h-20 rounded-full bg-sea-100 border border-line mx-auto mb-5 flex items-center justify-center text-ink-muted">
                <Users className="w-6 h-6" />
              </div>
              <div className="font-semibold text-ink mb-1">[Name to be provided]</div>
              <div className="text-ink-muted text-sm mb-4">[Role to be provided]</div>
              <PlaceholderBadge>Pending verification</PlaceholderBadge>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-navy-950 text-white">
        <div className="eyebrow-line text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-brass mb-5">
          Our Journey
        </div>
        <h2 className="text-h2 text-white mb-14 max-w-2xl">Company timeline</h2>
        <div className="grid sm:grid-cols-3 gap-10 max-w-4xl">
          {timeline.map((item, i) => (
            <div key={i} className="border-t border-white/15 pt-6">
              <div className="text-brass font-mono text-sm mb-3">{item.year}</div>
              <h3 className="text-[1.0625rem] font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-white/60 text-[0.9375rem] leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="eyebrow-line text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-brass mb-5 inline-block">
            Global Perspective
          </div>
          <h2 className="text-h2 mb-6">Working across borders.</h2>
          <p className="text-ink-soft text-lg leading-relaxed mb-10">
            MAAB approaches its work with an international outlook, working
            with clients, partners, and organizations across markets.
          </p>
          <Button href="/global-presence" size="lg" withArrow>
            View Global Presence
          </Button>
        </div>
      </Section>
    </>
  );
}