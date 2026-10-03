import type { Metadata } from "next";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { MapPin, Users, Handshake, Building2, Globe2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Global Presence",
  description:
    "MAAB is headquartered in Texas, United States. Our network extends across international markets through clients, partners, and business relationships.",
  alternates: { canonical: "/global-presence" },
};

const regions = [
  { name: "North America", note: "Headquarters and base of operations. MAAB is headquartered in Texas, United States.", primary: true },
  { name: "Africa", note: "Clients, partners, and business connections across the region." },
  { name: "Europe", note: "Clients, partners, and business connections across the region." },
  { name: "Middle East", note: "Clients, partners, and business connections across the region." },
  { name: "Asia", note: "Clients, partners, and business connections across the region." },
];

const categories = [
  { icon: Users, title: "Clients", text: "Organizations and businesses MAAB serves across markets." },
  { icon: Handshake, title: "Partners", text: "Companies, institutions, and professionals MAAB works with." },
  { icon: Building2, title: "Business Connections", text: "Relationships that support cross-border business activity." },
  { icon: Globe2, title: "Markets Served", text: "Regions where MAAB’s services and partnerships are engaged." },
];

export default function GlobalPresencePage() {
  return (
    <>
      <section className="bg-navy-900 text-white">
        <div className="container-wide py-20 lg:py-28">
          <div className="eyebrow-line text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-brass mb-5">
            Global Presence
          </div>
          <h1 className="text-h1 max-w-3xl mb-7 text-white">
            Headquartered in Texas. Working internationally.
          </h1>
          <p className="text-lg text-white/70 leading-relaxed max-w-2xl">
            MAAB is based in Texas, United States. Our network extends across
            international markets through clients, partners, and business
            relationships.
          </p>
        </div>
      </section>

      <Section className="bg-white">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="Headquarters"
              title="Texas, United States"
              description="MAAB operates from Texas and serves clients, partners, and organizations across international markets."
            />
            <div className="mt-8 flex items-center gap-3 text-ink-soft">
              <MapPin className="w-5 h-5 text-brass" />
              <span>Texas, United States</span>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative aspect-[16/10] rounded-lg border border-line bg-sea-100 overflow-hidden grid-lines">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center px-6">
                  <div className="font-mono text-xs uppercase tracking-[0.2em] text-ink-muted mb-4">
                    Network Overview
                  </div>
                  <div className="text-h3 font-semibold text-ink">
                    Serving clients and partners across international markets.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-sea-100">
        <SectionHeader
          eyebrow="Markets"
          title="Regions in our network."
          description="The list below reflects regions where MAAB has clients, partners, and business relationships. It does not imply physical offices in every region."
        />
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {regions.map((r) => (
            <Card key={r.name} className={r.primary ? "border-navy-900 !border-2" : ""}>
              <div className="flex items-center justify-between mb-5">
                <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-brass">
                  Region
                </span>
                {r.primary && (
                  <span className="text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-white bg-navy-900 px-2 py-0.5 rounded">
                    Headquarters
                  </span>
                )}
              </div>
              <h3 className="text-h3 mb-2">{r.name}</h3>
              <p className="text-ink-soft text-[0.9375rem] leading-relaxed">{r.note}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-white">
        <SectionHeader
          eyebrow="Network Structure"
          title="How our international activity is organized."
        />
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((c) => {
            const Icon = c.icon;
            return (
              <Card key={c.title}>
                <span className="flex h-11 w-11 items-center justify-center rounded-md bg-navy-900 text-white mb-5">
                  <Icon className="w-5 h-5" />
                </span>
                <h3 className="text-[1.0625rem] font-semibold mb-2">{c.title}</h3>
                <p className="text-ink-soft text-[0.9375rem] leading-relaxed">{c.text}</p>
              </Card>
            );
          })}
        </div>
      </Section>

      <section className="bg-navy-950 text-white">
        <div className="container-wide py-24 lg:py-32">
          <div className="max-w-3xl">
            <div className="eyebrow-line text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-brass mb-5">
              Work With Us
            </div>
            <h2 className="text-h2 text-white mb-6">
              Working with MAAB across borders.
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-10">
              If your organization is exploring cross-border collaboration or
              professional services in an international market, MAAB welcomes
              the conversation.
            </p>
            <Button href="/contact" size="lg" withArrow>
              Start a Conversation
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}