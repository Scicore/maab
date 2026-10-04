import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function ApplyPage({
  params,
}: {
  params: { jobId: string };
}) {
  const job = await prisma.job.findUnique({ where: { id: params.jobId } });
  if (!job || job.status !== "PUBLISHED") notFound();

  return (
    <>
      <section className="bg-navy-900 text-white">
        <div className="container-wide py-16 lg:py-20">
          <Link
            href={`/careers/${job.slug}`}
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to position
          </Link>

          <div className="eyebrow-line text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-brass mb-5">
            Application
          </div>
          <h1 className="text-h1 max-w-3xl mb-5 text-white">{job.title}</h1>
          <p className="text-lg text-white/70 leading-relaxed max-w-2xl">
            The full multi-step application form is coming next. For now, this
            page confirms the position is accepting applications.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-wide py-20">
          <div className="max-w-xl mx-auto text-center">
            <FileText className="w-12 h-12 text-ink-muted mx-auto mb-6" />
            <h2 className="text-h3 mb-4">Application form coming soon</h2>
            <p className="text-ink-soft leading-relaxed mb-8">
              The multi-step application process (personal details, education,
              experience, documents, references, and job-specific questions)
              will be added in the next feature. Check back shortly.
            </p>
            <Link
              href="/careers"
              className="inline-flex items-center gap-2 bg-navy-900 text-white text-sm font-medium px-5 py-3 rounded-md hover:bg-navy-800 transition-colors"
            >
              Back to all positions
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}