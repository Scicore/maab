"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  FileText,
  Handshake,
  Image,
  Newspaper,
  Mail,
  Building2,
  UserCog,
  ScrollText,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/applications", label: "Applications", icon: FileText },
  { href: "/admin/jobs", label: "Jobs", icon: Briefcase },
  { href: "/admin/applicants", label: "Applicants", icon: Users },
  { href: "/admin/partners", label: "Partners", icon: Handshake },
  { href: "/admin/media", label: "Media", icon: Image },
  { href: "/admin/news", label: "News", icon: Newspaper },
  { href: "/admin/messages", label: "Messages", icon: Mail },
  { href: "/admin/partnerships", label: "Partnerships", icon: Building2 },
  { href: "/admin/users", label: "Users", icon: UserCog },
  { href: "/admin/audit-logs", label: "Audit Logs", icon: ScrollText },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 border-r border-slate-800 flex flex-col h-screen sticky top-0">
      <div className="h-16 flex items-center gap-2.5 px-5 border-b border-slate-800 flex-shrink-0">
        <span className="flex h-8 w-8 items-center justify-center rounded-md bg-white text-slate-900 font-semibold text-sm">
          M
        </span>
        <div className="flex flex-col leading-none">
          <span className="text-sm font-semibold text-white tracking-wider">
            MAAB
          </span>
          <span className="text-[0.625rem] tracking-widest text-slate-500 uppercase mt-0.5">
            Admin
          </span>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        {nav.map((item) => {
          const Icon = item.icon;
          const active = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-5 py-2.5 text-sm transition-colors border-l-2",
                active
                  ? "bg-slate-800 text-white border-white"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50 border-transparent"
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800 text-[0.6875rem] text-slate-500">
        © 2026 MAAB
      </div>
    </aside>
  );
}