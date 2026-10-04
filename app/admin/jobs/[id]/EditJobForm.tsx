"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Trash2 } from "lucide-react";

type Job = {
  id: string;
  title: string;
  department: string;
  location: string;
  country: string;
  employmentType: string;
  workMode: string;
  salaryRange: string;
  description: string;
  responsibilities: string;
  requirements: string;
  qualifications: string;
  experience: string;
  positionsOpen: number;
  status: string;
};

export function EditJobForm({ job }: { job: Job }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      title: String(data.get("title") || ""),
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
      const res = await fetch(`/api/admin/jobs/${job.id}`, {
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

  async function onDelete() {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/jobs/${job.id}`, { method: "DELETE" });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Failed");
      router.push("/admin/jobs");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
      setLoading(false);
      setConfirmDelete(false);
    }
  }

  const inputClass =
    "w-full border border-slate-300 rounded-md px-3.5 py-2.5 text-[0.9375rem] text-slate-900 bg-white focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors";

  return (
    <form onSubmit={onSubmit} className="space-y-6 max-w-3xl">
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
        <Field label="Job Title" required>
          <input type="text" name="title" defaultValue={job.title} required className={inputClass} />
        </Field>

        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Department" required>
            <input type="text" name="department" defaultValue={job.department} required className={inputClass} />
          </Field>
          <Field label="Country" required>
            <input type="text" name="country" defaultValue={job.country} required className={inputClass} />
          </Field>
        </div>

        <Field label="Location" required>
          <input type="text" name="location" defaultValue={job.location} required className={inputClass} />
        </Field>

        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Employment Type" required>
            <select name="employmentType" defaultValue={job.employmentType} required className={inputClass}>
              <option value="FULL_TIME">Full-time</option>
              <option value="PART_TIME">Part-time</option>
              <option value="CONTRACT">Contract</option>
              <option value="INTERNSHIP">Internship</option>
            </select>
          </Field>
          <Field label="Work Mode" required>
            <select name="workMode" defaultValue={job.workMode} required className={inputClass}>
              <option value="ONSITE">On-site</option>
              <option value="HYBRID">Hybrid</option>
              <option value="REMOTE">Remote</option>
            </select>
          </Field>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Salary Range">
            <input type="text" name="salaryRange" defaultValue={job.salaryRange} className={inputClass} />
          </Field>
          <Field label="Positions Open">
            <input type="number" name="positionsOpen" defaultValue={job.positionsOpen} min={1} className={inputClass} />
          </Field>
        </div>

        <Field label="Experience">
          <input type="text" name="experience" defaultValue={job.experience} className={inputClass} />
        </Field>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-5">
        <Field label="Description" required>
          <textarea name="description" rows={4} defaultValue={job.description} required className={inputClass} />
        </Field>
        <Field label="Responsibilities" required>
          <textarea name="responsibilities" rows={5} defaultValue={job.responsibilities} required className={inputClass} />
        </Field>
        <Field label="Requirements" required>
          <textarea name="requirements" rows={5} defaultValue={job.requirements} required className={inputClass} />
        </Field>
        <Field label="Qualifications" required>
          <textarea name="qualifications" rows={5} defaultValue={job.qualifications} required className={inputClass} />
        </Field>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <Field label="Status" required>
          <select name="status" defaultValue={job.status} required className={inputClass}>
            <option value="DRAFT">Draft — not visible publicly</option>
            <option value="PUBLISHED">Published — visible on careers page</option>
            <option value="CLOSED">Closed — no longer accepting applications</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </Field>
      </div>

      <div className="flex items-center justify-between gap-3">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 bg-slate-900 text-white text-sm font-medium px-5 py-2.5 rounded-md hover:bg-slate-800 disabled:opacity-60"
        >
          {loading ? (<><Loader2 className="w-4 h-4 animate-spin" />Saving…</>) : "Save Changes"}
        </button>

        {!confirmDelete ? (
          <button
            type="button"
            onClick={() => setConfirmDelete(true)}
            className="inline-flex items-center gap-2 border border-red-200 text-red-700 text-sm font-medium px-4 py-2.5 rounded-md hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        ) : (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-600">Are you sure?</span>
            <button
              type="button"
              onClick={onDelete}
              disabled={loading}
              className="bg-red-600 text-white px-3 py-1.5 rounded-md hover:bg-red-700 disabled:opacity-60"
            >
              Yes, delete
            </button>
            <button
              type="button"
              onClick={() => setConfirmDelete(false)}
              className="text-slate-600 hover:text-slate-900"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </form>
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