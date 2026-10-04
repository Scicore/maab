import { prisma } from "@/lib/db";
import { Mail, Building2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const [contacts, partnerships] = await Promise.all([
    prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" }, take: 100 }),
    prisma.partnershipInquiry.findMany({ orderBy: { createdAt: "desc" }, take: 100 }),
  ]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-slate-900">Messages & Inquiries</h1>
        <p className="text-slate-500 text-sm mt-1">
          Every contact message and partnership inquiry submitted through the public website
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Mail className="w-4 h-4 text-slate-500" />
            <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
              Contact Messages ({contacts.length})
            </h2>
          </div>

          {contacts.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-lg p-8 text-center text-slate-500 text-sm">
              No contact messages yet.
            </div>
          ) : (
            <div className="space-y-3">
              {contacts.map((m) => (
                <div key={m.id} className="bg-white border border-slate-200 rounded-lg p-5">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <div className="font-medium text-slate-900">{m.name}</div>
                      <div className="text-sm text-slate-500">{m.email}</div>
                    </div>
                    <div className="text-xs text-slate-400 whitespace-nowrap">
                      {new Date(m.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  {m.company && <div className="text-xs text-slate-500 mb-2">Company: {m.company}</div>}
                  <div className="text-sm font-medium text-slate-700 mb-2">{m.subject}</div>
                  <p className="text-sm text-slate-600 whitespace-pre-wrap">{m.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="w-4 h-4 text-slate-500" />
            <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
              Partnership Inquiries ({partnerships.length})
            </h2>
          </div>

          {partnerships.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-lg p-8 text-center text-slate-500 text-sm">
              No partnership inquiries yet.
            </div>
          ) : (
            <div className="space-y-3">
              {partnerships.map((p) => (
                <div key={p.id} className="bg-white border border-slate-200 rounded-lg p-5">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <div className="font-medium text-slate-900">{p.name}</div>
                      <div className="text-sm text-slate-500">{p.email}</div>
                    </div>
                    <div className="text-xs text-slate-400 whitespace-nowrap">
                      {new Date(p.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-xs text-slate-500 space-y-0.5 mb-3">
                    <div>Company: {p.company}</div>
                    <div>Country: {p.country}</div>
                    <div>Type: {p.partnershipType}</div>
                  </div>
                  <p className="text-sm text-slate-600 whitespace-pre-wrap">{p.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}