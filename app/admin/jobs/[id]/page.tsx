import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { EditJobForm } from "./EditJobForm";

export const dynamic = "force-dynamic";

export default async function EditJobPage({
  params,
}: {
  params: { id: string };
}) {
  const job = await prisma.job.findUnique({ where: { id: params.id } });
  if (!job) notFound();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-slate-900">Edit Job</h1>
        <p className="text-slate-500 text-sm mt-1">
          Update details, publish, close, or delete this job
        </p>
      </div>
      <EditJobForm
        job={{
          id: job.id,
          title: job.title,
          department: job.department,
          location: job.location,
          country: job.country,
          employmentType: job.employmentType,
          workMode: job.workMode,
          salaryRange: job.salaryRange ?? "",
          description: job.description,
          responsibilities: job.responsibilities,
          requirements: job.requirements,
          qualifications: job.qualifications,
          experience: job.experience ?? "",
          positionsOpen: job.positionsOpen,
          status: job.status,
        }}
      />
    </div>
  );
}