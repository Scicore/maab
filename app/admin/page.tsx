import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [
    totalApplications,
    newApplications,
    underReview,
    shortlisted,
    rejected,
    openJobs,
    totalPartners,
    publishedNews,
    contactMessages,
    partnershipRequests,
  ] = await Promise.all([
    prisma.application.count(),
    prisma.application.count({ where: { status: "SUBMITTED" } }),
    prisma.application.count({ where: { status: "UNDER_REVIEW" } }),
    prisma.application.count({ where: { status: "SHORTLISTED" } }),
    prisma.application.count({ where: { status: "NOT_SELECTED" } }),
    prisma.job.count({ where: { status: "PUBLISHED" } }),
    prisma.partner.count({ where: { status: "PUBLISHED" } }),
    prisma.newsArticle.count({ where: { status: "PUBLISHED" } }),
    prisma.contactMessage.count({ where: { status: "NEW" } }),
    prisma.partnershipInquiry.count({ where: { status: "NEW" } }),
  ]);

  const stats = [
    { label: "Total Applications", value: totalApplications },
    { label: "New Applications", value: newApplications, accent: true },
    { label: "Under Review", value: underReview },
    { label: "Shortlisted", value: shortlisted },
    { label: "Rejected", value: rejected },
    { label: "Open Jobs", value: openJobs },
    { label: "Total Partners", value: totalPartners },
    { label: "Published News", value: publishedNews },
    { label: "Contact Messages", value: contactMessages, accent: true },
    { label: "Partnership Requests", value: partnershipRequests, accent: true },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">
          Overview of MAAB&apos;s administrative data
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white border border-slate-200 rounded-lg p-5"
          >
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">
              {s.label}
            </div>
            <div
              className={
                s.accent
                  ? "text-3xl font-semibold text-amber-600"
                  : "text-3xl font-semibold text-slate-900"
              }
            >
              {s.value}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid lg:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <h2 className="text-sm font-semibold text-slate-900 mb-4">
            Quick Actions
          </h2>
          <p className="text-sm text-slate-500">
            Use the sidebar to manage applications, jobs, partners, news, and
            more.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <h2 className="text-sm font-semibold text-slate-900 mb-4">
            Getting Started
          </h2>
          <ul className="space-y-2 text-sm text-slate-500">
            <li>• Create your first job posting under Jobs</li>
            <li>• Upload media under Media</li>
            <li>• Add partners under Partners</li>
            <li>• Publish news articles under News</li>
          </ul>
        </div>
      </div>
    </div>
  );
}