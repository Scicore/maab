import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Handshake, Globe2, TrendingUp, Users } from "lucide-react";
import { PartnershipForm } from "@/components/forms/PartnershipForm";
import { prisma } from "@/lib/db";
import { supabaseAdmin, STORAGE_BUCKET } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

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

async function getPublishedPartners() {
  const partners = await prisma.partner.findMany({
    where: { status: "PUBLISHED" },
    orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
    take: 12,
  });

  // Generate signed URLs for logos
  const withUrls = await Promise.all(
    partners.map(async (p) => {
      let logoUrl: string | null = null;
      if (p.logoPath && supabaseAdmin) {
        const { data } = await supabaseAdmin.storage
          .from(STORAGE_BUCKET)
          .createSignedUrl(p.logoPath, 60 * 60 * 24); // 24h
        logoUrl = data?.signedUrl ?? null;
      }
      return { ...p, logoUrl };
    })
  );

  return withUrls;
}

export default async function PartnershipsPage() {
  const partners = await getPublishedPartners();

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
        <SectionHeader
          eyebrow="Our Partners"
          title="Working with organizations across markets."
          description={
            partners.length === 0
              ? "Verified partner information will be published here as it becomes available."
              : "MAAB works with the following organizations across international markets."
          }
        />

        {partners.length === 0 ? (
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[3/2] flex items-center justify-center border border-dashed border-line rounded-md bg-white/70 text-[0.6875rem] uppercase tracking-[0.14em] text-ink-muted"
              >
                Partner Logo
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {partners.map((partner) => {
              const inner = (
                <div className="bg-white border border-line rounded-lg p-6 h-full flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated hover:border-navy-300">
                  {partner.logoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={partner.logoUrl}
                      alt={partner.name}
                      className="h-14 w-auto object-contain mb-4"
                    />
                  ) : (
                    <div className="h-14 w-14 rounded-md bg-navy-900 text-white flex items-center justify-center text-lg font-semibold mb-4">
                      {partner.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="font-medium text-ink text-sm leading-snug">
                    {partner.name}
                  </div>
                  {partner.country && (
                    <div className="text-xs text-ink-muted mt-1">
                      {partner.country}
                    </div>
                  )}
                </div>
              );

              return partner.website ? (
                <a
                  key={partner.id}
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  {inner}
                </a>
              ) : (
                <div key={partner.id} className="h-full">
                  {inner}
                </div>
              );
            })}
          </div>
        )}
      </Section>

      <Section className="bg-white">
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