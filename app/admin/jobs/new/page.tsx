"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function NewJobPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      title: String(data.get("title") || ""),
      slug: slugify(String(data.get("title") || "")),
      department: String(data.get("department") || ""),
      location: String(data.get("location") || ""),
      country: String(data.get("country") || ""),
      employmentType: String(data.get("employmentType") || "FULL_TIME"),
      workMode: String(data.get("workMode") || "ONSITE"),
      salaryRange: String(data.get("salaryRange") || "") || null,
      description: String(data.get("description") || ""),
      responsibilities: String(data.get("responsibilities") || ""),
      requirements: String(data.get("requirements") || ""),
      qualifications: String(data.get("qualifications") || ""),
      experience: String(data.get("experience") || "") || null,
      positionsOpen: Number(data.get("positionsOpen") || 1),
      status: String(data.get("status") || "DRAFT"),
    };

    try {
      const res = await fetch("/api/admin/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Failed");
      router.push("/admin/jobs");
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
        <h1 className="text-2xl font-semibold text-slate-900">Create Job</h1>
        <p className="text-slate-500 text-sm mt-1">
          Fill in the details. Save as Draft first, then publish when ready.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6 max-w-3xl">
        {error && (
          <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-md px-3.5 py-2.5">
            {error}
          </div>
        )}

        <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-5">
          <Field label="Job Title" required>
            <input
              type="text"
              name="title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={inputClass}
            />
            {title && (
              <p className="text-xs text-slate-500 mt-1.5">
                URL slug: <span className="font-mono">{slugify(title)}</span>
              </p>
            )}
          </Field>

          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Department" required>
              <input type="text" name="department" required className={inputClass} />
            </Field>
            <Field label="Country" required>
              <input type="text" name="country" required className={inputClass} />
            </Field>
          </div>

          <Field label="Location" required>
            <input type="text" name="location" required className={inputClass} />
          </Field>

          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Employment Type" required>
              <select name="employmentType" required className={inputClass} defaultValue="FULL_TIME">
                <option value="FULL_TIME">Full-time</option>
                <option value="PART_TIME">Part-time</option>
                <option value="CONTRACT">Contract</option>
                <option value="INTERNSHIP">Internship</option>
              </select>
            </Field>
            <Field label="Work Mode" required>
              <select name="workMode" required className={inputClass} defaultValue="ONSITE">
                <option value="ONSITE">On-site</option>
                <option value="HYBRID">Hybrid</option>
                <option value="REMOTE">Remote</option>
              </select>
            </Field>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Salary Range (optional)">
              <input type="text" name="salaryRange" placeholder="e.g. $60,000 - $80,000" className={inputClass} />
            </Field>
            <Field label="Positions Open">
              <input type="number" name="positionsOpen" defaultValue={1} min={1} className={inputClass} />
            </Field>
          </div>

          <Field label="Experience (optional)">
            <input type="text" name="experience" placeholder="e.g. 3+ years" className={inputClass} />
          </Field>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-5">
          <Field label="Description" required>
            <textarea name="description" rows={4} required className={inputClass} />
          </Field>
          <Field label="Responsibilities" required>
            <textarea name="responsibilities" rows={5} required className={inputClass} />
          </Field>
          <Field label="Requirements" required>
            <textarea name="requirements" rows={5} required className={inputClass} />
          </Field>
          <Field label="Qualifications" required>
            <textarea name="qualifications" rows={5} required className={inputClass} />
          </Field>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <Field label="Status" required>
            <select name="status" required className={inputClass} defaultValue="DRAFT">
              <option value="DRAFT">Draft — not visible publicly</option>
              <option value="PUBLISHED">Published — visible on careers page</option>
            </select>
          </Field>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 bg-slate-900 text-white text-sm font-medium px-5 py-2.5 rounded-md hover:bg-slate-800 disabled:opacity-60"
          >
            {loading ? (<><Loader2 className="w-4 h-4 animate-spin" />Creating…</>) : "Create Job"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
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