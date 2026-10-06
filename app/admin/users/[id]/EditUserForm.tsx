"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Ban } from "lucide-react";

type User = {
  id: string;
  email: string;
  name: string;
  role: string;
  status: string;
};

export function EditUserForm({
  user,
  isSelf,
}: {
  user: User;
  isSelf: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [confirmDisable, setConfirmDisable] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const form = e.currentTarget;
    const data = new FormData(form);
    const newPassword = String(data.get("newPassword") || "");

    const payload = {
      name: String(data.get("name") || ""),
      role: String(data.get("role") || "ADMIN"),
      status: String(data.get("status") || "ACTIVE"),
      newPassword: newPassword.length > 0 ? newPassword : null,
    };

    try {
      const res = await fetch("/api/admin/users/" + user.id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Failed");
      setSuccess("Saved.");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function onDisable() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users/" + user.id, { method: "DELETE" });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Failed");
      router.push("/admin/users");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Disable failed");
      setLoading(false);
      setConfirmDisable(false);
    }
  }

  const inputClass =
    "w-full border border-slate-300 rounded-md px-3.5 py-2.5 text-[0.9375rem] text-slate-900 bg-white focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors";

  return (
    <form onSubmit={onSubmit} className="space-y-6 max-w-xl">
      {error && (
        <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-md px-3.5 py-2.5">
          {error}
        </div>
      )}
      {success && (
        <div className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-md px-3.5 py-2.5">
          {success}
        </div>
      )}

      <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-5">
        <Field label="Email">
          <input
            type="email"
            value={user.email}
            disabled
            className={inputClass + " bg-slate-50 cursor-not-allowed"}
          />
        </Field>

        <Field label="Full Name" required>
          <input type="text" name="name" required defaultValue={user.name} className={inputClass} />
        </Field>

        <Field label="Role" required>
          <select name="role" required defaultValue={user.role} className={inputClass}>
            <option value="SUPER_ADMIN">Super Admin</option>
            <option value="ADMIN">Administrator</option>
            <option value="RECRUITER">Recruiter</option>
            <option value="REVIEWER">Reviewer</option>
            <option value="CONTENT_MANAGER">Content Manager</option>
            <option value="SUPPORT">Support</option>
          </select>
        </Field>

        <Field label="Status" required>
          <select name="status" required defaultValue={user.status} className={inputClass}>
            <option value="ACTIVE">Active</option>
            <option value="SUSPENDED">Suspended</option>
            <option value="DISABLED">Disabled</option>
          </select>
        </Field>

        <Field label="New Password (optional)">
          <input type="password" name="newPassword" minLength={12} className={inputClass} />
          <p className="text-xs text-slate-500 mt-1.5">
            Leave blank to keep the current password.
          </p>
        </Field>
      </div>

      <div className="flex items-center justify-between gap-3">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 bg-slate-900 text-white text-sm font-medium px-5 py-2.5 rounded-md hover:bg-slate-800 disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </button>

        {!isSelf && (
          <>
            {!confirmDisable ? (
              <button
                type="button"
                onClick={() => setConfirmDisable(true)}
                className="inline-flex items-center gap-2 border border-red-200 text-red-700 text-sm font-medium px-4 py-2.5 rounded-md hover:bg-red-50"
              >
                <Ban className="w-4 h-4" />
                Disable Account
              </button>
            ) : (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-slate-600">Disable this user?</span>
                <button
                  type="button"
                  onClick={onDisable}
                  disabled={loading}
                  className="bg-red-600 text-white px-3 py-1.5 rounded-md hover:bg-red-700 disabled:opacity-60"
                >
                  Yes, disable
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmDisable(false)}
                  className="text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </form>
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