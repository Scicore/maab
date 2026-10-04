import Link from "next/link";
import { prisma } from "@/lib/db";
import { Plus, Handshake } from "lucide-react";

export const dynamic = "force-dynamic";

const statusStyles: Record<string, string> = {
  DRAFT: "bg-slate-100 text-slate-700",
  PUBLISHED: "bg-green-100 text-green-800",
  REVIEW: "bg-amber-100 text-amber-800",
  ARCHIVED: "bg-slate-200 text-slate-500",
};

export default async function AdminPartnersPage() {
  const partners = await prisma.partner.findMany({
    orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Partners</h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage partners displayed on the public partnerships page
          </p>
        </div>
        <Link
          href="/admin/partners/new"
          className="inline-flex items-center gap-2 bg-slate-900 text-white text-sm font-medium px-4 py-2.5 rounded-md hover:bg-slate-800"
        >
          <Plus className="w-4 h-4" />
          New Partner
        </Link>
      </div>

      {partners.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-lg p-12 text-center">
          <Handshake className="w-10 h-10 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-600 font-medium mb-1">No partners yet</p>
          <p className="text-slate-500 text-sm mb-6">Add your first partner to display on the public site</p>
          <Link
            href="/admin/partners/new"
            className="inline-flex items-center gap-2 bg-slate-900 text-white text-sm font-medium px-4 py-2.5 rounded-md hover:bg-slate-800"
          >
            <Plus className="w-4 h-4" />
            Add Partner
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Name</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Country</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Type</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Order</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Status</th>
                <th className="text-right text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {partners.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="px-5 py-4">
                    <div className="font-medium text-slate-900">{p.name}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{p.slug}</div>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-600">{p.country || "—"}</td>
                  <td className="px-5 py-4 text-sm text-slate-600">{p.partnershipType || "—"}</td>
                  <td className="px-5 py-4 text-sm text-slate-600">{p.displayOrder}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[0.6875rem] font-semibold uppercase tracking-wider ${statusStyles[p.status] ?? ""}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      href={`/admin/partners/${p.id}`}
                      className="text-sm font-medium text-slate-900 hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}