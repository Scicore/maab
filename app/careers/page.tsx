import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Users, Globe2, GraduationCap, Briefcase, MapPin, Clock } from "lucide-react";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Build your future with MAAB. Explore opportunities with an international business and professional services company.",
  alternates: { canonical: "/careers" },
};

const reasons = [
  { icon: Globe2, title: "International Work", text: "Work that spans markets, cultures, and regions." },
  { icon: Users, title: "Professional Environment", text: "A workplace built around clear standards and mutual respect." },
  { icon: GraduationCap, title: "Development", text: "Opportunities to grow alongside the company." },
  { icon: Briefcase, title: "Meaningful Roles", text: "Positions with real responsibility and long-term potential." },
];

const employmentLabel: Record<string, string> = {
  FULL_TIME: "Full-time",
  PART_TIME: "Part-time",
  CONTRACT: "Contract",
  INTERNSHIP: "Internship",
};

const workModeLabel: Record<string, string> = {
  ONSITE: "On-site",
  HYBRID: "Hybrid",
  REMOTE: "Remote",
};

export default async function CareersPage() {
  const jobs = await prisma.job.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <>
      <section className="bg-navy-900 text-white">
        <div className="container-wide py-20 lg:py-28">
          <div className="eyebrow-line text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-brass mb-5">
            Careers
          </div>
          <h1 className="text-h1 max-w-3xl mb-7 text-white">
            Build Your Future With MAAB.
          </h1>
          <p className="text-lg text-white/70 leading-relaxed max-w-2xl">
            MAAB is interested in connecting talented people with opportunities
            as the company grows. Where roles are available, they will be
            listed with clear information about the position, location, and
            requirements.
          </p>
        </div>
      </section>

      <Section className="bg-white">
        <SectionHeader eyebrow="Why Work With MAAB" title="What we look for and what we offer." />
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((r) => {
            const Icon = r.icon;
            return (
              <Card key={r.title} className="transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated hover:border-navy-300">
                <span className="flex h-11 w-11 items-center justify-center rounded-md bg-navy-900 text-white mb-5">
                  <Icon className="w-5 h-5" />
                </span>
                <h3 className="text-[1.0625rem] font-semibold mb-2">{r.title}</h3>
                <p className="text-ink-soft text-[0.9375rem] leading-relaxed">{r.text}</p>
              </Card>
            );
          })}
        </div>
      </Section>

      <Section className="bg-sea-100">
        <SectionHeader
          eyebrow="Opportunities"
          title="Current openings"
          description="Verified positions will appear here. When no positions are listed, MAAB is not actively hiring through this page."
        />

        {jobs.length === 0 ? (
          <Card className="mt-14 !p-14 text-center">
            <div className="max-w-lg mx-auto">
              <Briefcase className="w-10 h-10 text-ink-muted mx-auto mb-6" />
              <h3 className="text-h3 mb-3">There are currently no open positions.</h3>
              <p className="text-ink-soft leading-relaxed mb-2">
                Please check back later. When roles are available, they will be
                published with clear information about the position, location,
                and requirements.
              </p>
            </div>
          </Card>
        ) : (
          <div className="mt-14 grid gap-5">
            {jobs.map((job) => (
              <Link
                key={job.id}
                href={`/careers/${job.slug}`}
                className="group bg-white border border-line rounded-lg p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated hover:border-navy-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                  <div className="flex-1">
                    <h3 className="text-h3 mb-3 group-hover:text-brass transition-colors">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-soft">
                      <span className="inline-flex items-center gap-1.5">
                        <Briefcase className="w-4 h-4 text-ink-muted" />
                        {job.department}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-ink-muted" />
                        {job.location}, {job.country}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-ink-muted" />
                        {employmentLabel[job.employmentType]} · {workModeLabel[job.workMode]}
                      </span>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-navy-900 group-hover:text-brass transition-colors whitespace-nowrap">
                    View Position →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Section>

      <section className="bg-navy-950 text-white">
        <div className="container-wide py-24 lg:py-32">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <div className="eyebrow-line text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-brass mb-5">
                International Talent
              </div>
              <h2 className="text-h2 text-white mb-5">Submit your profile.</h2>
              <p className="text-white/70 text-lg leading-relaxed">
                If you are an experienced professional interested in future
                opportunities, you are welcome to reach out through the contact
                page.
              </p>
            </div>
            <div className="lg:col-span-5 lg:text-right">
              <Button href="/contact" size="lg" withArrow>
                Submit Your Profile
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}