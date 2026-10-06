import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/db";
import { ApplicationForm } from "./ApplicationForm";

export const dynamic = "force-dynamic";

export default async function ApplyPage({
  params,
}: {
  params: { jobId: string };
}) {
  const job = await prisma.job.findUnique({
    where: { id: params.jobId },
    select: { id: true, title: true, slug: true, department: true, location: true, country: true, status: true },
  });

  if (!job || job.status !== "PUBLISHED") notFound();

  return (
    <>
      <section className="bg-navy-900 text-white">
        <div className="container-wide py-14 lg:py-20">
          <Link
            href={"/careers/" + job.slug}
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to position
          </Link>

          <div className="eyebrow-line text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-brass mb-5">
            Application
          </div>
          <h1 className="text-h1 max-w-3xl mb-4 text-white">{job.title}</h1>
          <p className="text-white/70">
            {job.department} - {job.location}, {job.country}
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-wide py-14 lg:py-20">
          <div className="max-w-3xl mx-auto">
            <ApplicationForm jobId={job.id} jobTitle={job.title} />
          </div>
        </div>
      </section>
    </>
  );
}