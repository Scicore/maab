"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function NewUserPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      email: String(data.get("email") || ""),
      name: String(data.get("name") || ""),
      password: String(data.get("password") || ""),
      role: String(data.get("role") || "ADMIN"),
    };

    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Failed");
      }
      router.push("/admin/users");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  }

  const inputClass =
    "w-full border border-slate-300 rounded-md px-3.5 py-2.5 text-[0.9375rem] text-slate-900 bg-white focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors";

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-slate-900">Add User</h1>
        <p className="text-slate-500 text-sm mt-1">
          Create a new admin account. Password must be at least 12 characters.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6 max-w-xl">
        {error && (
          <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-md px-3.5 py-2.5">
            {error}
          </div>
        )}

        <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-5">
          <Field label="Full Name" required>
            <input
              type="text"
              name="name"
              required
              className={inputClass}
            />
          </Field>

          <Field label="Email" required>
            <input
              type="email"
              name="email"
              required
              className={inputClass}
            />
          </Field>

          <Field label="Password" required>
            <input
              type="password"
              name="password"
              required
              minLength={12}
              className={inputClass}
            />
            <p className="text-xs text-slate-500 mt-1.5">
              Minimum 12 characters. User should change it after first login.
            </p>
          </Field>

          <Field label="Role" required>
            <select name="role" required className={inputClass} defaultValue="ADMIN">
              <option value="SUPER_ADMIN">Super Admin - full access</option>
              <option value="ADMIN">Administrator - full content + users</option>
              <option value="RECRUITER">Recruiter - jobs + applications</option>
              <option value="REVIEWER">Reviewer - assigned applications only</option>
              <option value="CONTENT_MANAGER">Content Manager - news + media</option>
              <option value="SUPPORT">Support - messages + inquiries</option>
            </select>
          </Field>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 bg-slate-900 text-white text-sm font-medium px-5 py-2.5 rounded-md hover:bg-slate-800 disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create User"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </span>
      {children}
    </label>
  );
}