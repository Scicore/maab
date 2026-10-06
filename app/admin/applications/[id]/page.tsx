import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { StatusControl } from "./StatusControl";

export const dynamic = "force-dynamic";

export default async function ApplicationDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const app = await prisma.application.findUnique({
    where: { id: params.id },
    include: {
      job: { select: { title: true, department: true, location: true, country: true } },
      notes: {
        orderBy: { createdAt: "desc" },
        include: { author: { select: { name: true, email: true } } },
      },
      statusHistory: {
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!app) notFound();

  return (
    <div>
      <div className="mb-8">
        <div className="font-mono text-sm text-slate-500 mb-2">
          {app.ticket}
        </div>
        <h1 className="text-2xl font-semibold text-slate-900">
          {app.firstName} {app.lastName}
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Applying for <strong>{app.job.title}</strong>
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN — Applicant details */}
        <div className="lg:col-span-2 space-y-6">
          <Section title="Personal Information">
            <Row label="Full Name" value={app.firstName + " " + app.lastName} />
            <Row label="Email" value={app.email} />
            <Row label="Phone" value={app.phone} />
            <Row label="Country" value={app.countryOfResidence} />
            <Row label="City" value={app.city} />
            {app.nationality && <Row label="Nationality" value={app.nationality} />}
          </Section>

          <Section title="Professional Information">
            {app.currentJobTitle && <Row label="Current Title" value={app.currentJobTitle} />}
            {app.currentEmployer && <Row label="Current Employer" value={app.currentEmployer} />}
            {app.yearsExperience !== null && (
              <Row label="Years of Experience" value={String(app.yearsExperience)} />
            )}
            {app.highestQualification && (
              <Row label="Highest Qualification" value={app.highestQualification} />
            )}
            {app.university && <Row label="University" value={app.university} />}
            {app.skills && (
              <div className="py-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  Skills
                </div>
                <p className="text-sm text-slate-700 whitespace-pre-wrap">
                  {app.skills}
                </p>
              </div>
            )}
          </Section>

          {app.notes.length > 0 && (
            <Section title="Cover Letter & Notes">
              {app.notes.map((n) => (
                <div key={n.id} className="py-3 border-b border-slate-100 last:border-0">
                  <div className="text-xs text-slate-500 mb-2">
                    {n.author?.name || "System"} -{" "}
                    {new Date(n.createdAt).toLocaleString()}
                  </div>
                  <p className="text-sm text-slate-700 whitespace-pre-wrap">
                    {n.body}
                  </p>
                </div>
              ))}
            </Section>
          )}

          {app.statusHistory.length > 0 && (
            <Section title="Timeline">
              <div className="border-l-2 border-slate-200 pl-6 space-y-5">
                {app.statusHistory.map((h) => (
                  <div key={h.id} className="relative">
                    <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-slate-900 border-2 border-white" />
                    <div className="text-xs text-slate-500">
                      {new Date(h.createdAt).toLocaleString()}
                    </div>
                    <div className="text-sm font-medium text-slate-900 mt-0.5">
                      {h.toStatus.replace(/_/g, " ")}
                    </div>
                    {h.note && (
                      <div className="text-sm text-slate-600 mt-1">{h.note}</div>
                    )}
                  </div>
                ))}
              </div>
            </Section>
          )}
        </div>

        {/* RIGHT COLUMN — Status control */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
              Current Status
            </div>
            <div className="text-lg font-semibold text-slate-900 mb-6">
              {app.status.replace(/_/g, " ")}
            </div>
            <StatusControl applicationId={app.id} currentStatus={app.status} />
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
              Position
            </div>
            <div className="text-sm text-slate-700 space-y-1.5">
              <div>{app.job.title}</div>
              <div className="text-slate-500">{app.job.department}</div>
              <div className="text-slate-500">
                {app.job.location}, {app.job.country}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4">
        {title}
      </h2>
      <div className="divide-y divide-slate-100">{children}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="py-3 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
      <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 sm:w-48 flex-shrink-0">
        {label}
      </div>
      <div className="text-sm text-slate-800 break-words">{value}</div>
    </div>
  );
}