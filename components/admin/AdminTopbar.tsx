"use client";

import { signOut, useSession } from "next-auth/react";
import { LogOut, Bell, Search } from "lucide-react";

export function AdminTopbar() {
  const { data: session } = useSession();

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 flex-shrink-0">
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <Search className="w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search…"
          className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          className="relative flex h-9 w-9 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
          <div className="text-right leading-none hidden sm:block">
            <div className="text-sm font-medium text-slate-900">
              {session?.user?.name || "Admin"}
            </div>
            <div className="text-[0.6875rem] text-slate-500 mt-1 uppercase tracking-wider">
              {(session?.user as { role?: string })?.role || "ADMIN"}
            </div>
          </div>
          <div className="h-8 w-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm font-medium">
            {(session?.user?.name || "A").charAt(0).toUpperCase()}
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="flex h-9 w-9 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-red-600 transition-colors"
            aria-label="Sign out"
            title="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}