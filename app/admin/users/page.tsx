import Link from "next/link";
import { prisma } from "@/lib/db";
import { Plus, UserCog } from "lucide-react";

export const dynamic = "force-dynamic";

const roleLabels: Record<string, string> = {
  SUPER_ADMIN: "Super Admin",
  ADMIN: "Administrator",
  RECRUITER: "Recruiter",
  REVIEWER: "Reviewer",
  CONTENT_MANAGER: "Content Manager",
  SUPPORT: "Support",
};

const statusStyles: Record<string, string> = {
  ACTIVE: "bg-green-100 text-green-800",
  SUSPENDED: "bg-amber-100 text-amber-800",
  DISABLED: "bg-slate-200 text-slate-500",
};

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    orderBy: [{ role: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Users</h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage administrator and staff accounts for the MAAB admin panel
          </p>
        </div>
        <Link
          href="/admin/users/new"
          className="inline-flex items-center gap-2 bg-slate-900 text-white text-sm font-medium px-4 py-2.5 rounded-md hover:bg-slate-800"
        >
          <Plus className="w-4 h-4" />
          Add User
        </Link>
      </div>

      {users.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-lg p-12 text-center">
          <UserCog className="w-10 h-10 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-600 font-medium mb-1">No users yet</p>
          <p className="text-slate-500 text-sm mb-6">
            Create additional admin accounts
          </p>
          <Link
            href="/admin/users/new"
            className="inline-flex items-center gap-2 bg-slate-900 text-white text-sm font-medium px-4 py-2.5 rounded-md hover:bg-slate-800"
          >
            <Plus className="w-4 h-4" />
            Add User
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">
                  Name
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">
                  Email
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">
                  Role
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">
                  Status
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">
                  Last Login
                </th>
                <th className="text-right text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50">
                  <td className="px-5 py-4">
                    <div className="font-medium text-slate-900">
                      {u.name || "-"}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-600">
                    {u.email}
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-600">
                    {roleLabels[u.role] || u.role}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={
                        "inline-flex items-center px-2 py-0.5 rounded text-[0.6875rem] font-semibold uppercase tracking-wider " +
                        (statusStyles[u.status] || "")
                      }
                    >
                      {u.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-xs text-slate-500">
                    {u.lastLoginAt
                      ? new Date(u.lastLoginAt).toLocaleString()
                      : "Never"}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      href={"/admin/users/" + u.id}
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