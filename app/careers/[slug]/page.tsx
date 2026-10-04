import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Briefcase, MapPin, Clock, Calendar, Users } from "lucide-react";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/Button";

export const dynamic = "force-dynamic";

type Props = { params: { slug: string } };

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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const job = await prisma.job.findUnique({ where: { slug: params.slug } });
  if (!job) return { title: "Position not found" };
  return {
    title: `${job.title} — Careers`,
    description: job.description.slice(0, 160),
    alternates: { canonical: `/careers/${job.slug}` },
  };
}

export default async function JobPage({ params }: Props) {
  const job = await prisma.job.findUnique({ where: { slug: params.slug } });

  if (!job || job.status !== "PUBLISHED") notFound();

  const sections = [
    { title: "Description", body: job.description },
    { title: "Responsibilities", body: job.responsibilities },
    { title: "Requirements", body: job.requirements },
    { title: "Qualifications", body: job.qualifications },
  ];

  return (
    <>
      <section className="bg-navy-900 text-white">
        <div className="container-wide py-16 lg:py-24">
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Careers
          </Link>

          <div className="eyebrow-line text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-brass mb-5">
            {job.department}
          </div>

          <h1 className="text-h1 max-w-4xl mb-7 text-white">{job.title}</h1>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/70">
            <span className="inline-flex items-center gap-2">
              <MapPin className="w-4 h-4 text-brass" />
              {job.location}, {job.country}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="w-4 h-4 text-brass" />
              {employmentLabel[job.employmentType]}
            </span>
            <span className="inline-flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-brass" />
              {workModeLabel[job.workMode]}
            </span>
            {job.positionsOpen > 1 && (
              <span className="inline-flex items-center gap-2">
                <Users className="w-4 h-4 text-brass" />
                {job.positionsOpen} positions
              </span>
            )}
            {job.applicationDeadline && (
              <span className="inline-flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brass" />
                Closes {new Date(job.applicationDeadline).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-wide py-16 lg:py-20">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-8 space-y-10">
              {sections.map((s) => (
                <div key={s.title}>
                  <h2 className="text-h3 mb-4">{s.title}</h2>
                  <div className="text-ink-soft leading-relaxed whitespace-pre-wrap text-[1.0625rem]">
                    {s.body}
                  </div>
                </div>
              ))}
            </div>

            <aside className="lg:col-span-4">
              <div className="sticky top-28 bg-sea-100 border border-line rounded-lg p-7">
                <h3 className="text-[1.0625rem] font-semibold mb-4">
                  Position Summary
                </h3>

                <dl className="space-y-3 text-sm mb-6">
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink-muted">Department</dt>
                    <dd className="text-ink font-medium text-right">{job.department}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink-muted">Location</dt>
                    <dd className="text-ink font-medium text-right">
                      {job.location}, {job.country}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink-muted">Type</dt>
                    <dd className="text-ink font-medium text-right">
                      {employmentLabel[job.employmentType]}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink-muted">Mode</dt>
                    <dd className="text-ink font-medium text-right">
                      {workModeLabel[job.workMode]}
                    </dd>
                  </div>
                  {job.experience && (
                    <div className="flex justify-between gap-4">
                      <dt className="text-ink-muted">Experience</dt>
                      <dd className="text-ink font-medium text-right">{job.experience}</dd>
                    </div>
                  )}
                  {job.salaryRange && (
                    <div className="flex justify-between gap-4">
                      <dt className="text-ink-muted">Salary</dt>
                      <dd className="text-ink font-medium text-right">{job.salaryRange}</dd>
                    </div>
                  )}
                </dl>

                <Button href={`/careers/apply/${job.id}`} size="lg" className="w-full" withArrow>
                  Apply Now
                </Button>

                <p className="text-xs text-ink-muted mt-4 leading-relaxed">
                  You will need to complete a multi-step application. Have your
                  CV and supporting documents ready.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}