"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { MediaUploader } from "@/components/admin/MediaUploader";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function NewPartnerPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [logo, setLogo] = useState<{ path: string } | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get("name") || ""),
      slug: slugify(String(data.get("name") || "")),
      description: String(data.get("description") || "") || null,
      website: String(data.get("website") || "") || null,
      country: String(data.get("country") || "") || null,
      partnershipType: String(data.get("partnershipType") || "") || null,
      logoPath: logo?.path ?? null,
      status: String(data.get("status") || "DRAFT"),
      displayOrder: Number(data.get("displayOrder") || 0),
    };

    try {
      const res = await fetch("/api/admin/partners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Failed");
      router.push("/admin/partners");
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
        <h1 className="text-2xl font-semibold text-slate-900">Add Partner</h1>
        <p className="text-slate-500 text-sm mt-1">
          Partners marked PUBLISHED will appear on the public site
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6 max-w-3xl">
        {error && (
          <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-md px-3.5 py-2.5">
            {error}
          </div>
        )}

        <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-5">
          <Field label="Partner Name" required>
            <input
              type="text"
              name="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
            />
            {name && (
              <p className="text-xs text-slate-500 mt-1.5">
                Slug: <span className="font-mono">{slugify(name)}</span>
              </p>
            )}
          </Field>

          <Field label="Logo">
            <MediaUploader
              folder="partners"
              accept="image/*"
              value={null}
              onChange={(media) => setLogo(media)}
              label="Upload logo"
            />
          </Field>

          <Field label="Description">
            <textarea name="description" rows={3} className={inputClass} />
          </Field>

          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Country">
              <input type="text" name="country" className={inputClass} />
            </Field>
            <Field label="Partnership Type">
              <input
                type="text"
                name="partnershipType"
                placeholder="e.g. Strategic, Distribution"
                className={inputClass}
              />
            </Field>
          </div>

          <Field label="Website">
            <input
              type="url"
              name="website"
              placeholder="https://"
              className={inputClass}
            />
          </Field>

          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Display Order">
              <input
                type="number"
                name="displayOrder"
                defaultValue={0}
                min={0}
                className={inputClass}
              />
            </Field>
            <Field label="Status" required>
              <select name="status" required className={inputClass} defaultValue="DRAFT">
                <option value="DRAFT">Draft — hidden</option>
                <option value="PUBLISHED">Published — visible publicly</option>
              </select>
            </Field>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 bg-slate-900 text-white text-sm font-medium px-5 py-2.5 rounded-md hover:bg-slate-800 disabled:opacity-60"
          >
            {loading ? (<><Loader2 className="w-4 h-4 animate-spin" />Creating…</>) : "Create Partner"}
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