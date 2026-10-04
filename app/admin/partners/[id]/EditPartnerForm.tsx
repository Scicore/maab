"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Trash2 } from "lucide-react";
import { MediaUploader } from "@/components/admin/MediaUploader";

type Partner = {
  id: string;
  name: string;
  description: string;
  website: string;
  country: string;
  partnershipType: string;
  logoPath: string | null;
  status: string;
  displayOrder: number;
};

export function EditPartnerForm({ partner }: { partner: Partner }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [confirmArchive, setConfirmArchive] = useState(false);
  const [logoPath, setLogoPath] = useState(partner.logoPath);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Fetch a signed preview URL for the existing logo on mount
  useEffect(() => {
    if (!partner.logoPath) return;
    fetch(`/api/admin/media/preview?path=${encodeURIComponent(partner.logoPath)}`)
      .then((r) => r.json())
      .then((json) => {
        if (json.ok && json.url) setPreviewUrl(json.url);
      })
      .catch(() => {});
  }, [partner.logoPath]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get("name") || ""),
      description: String(data.get("description") || "") || null,
      website: String(data.get("website") || "") || null,
      country: String(data.get("country") || "") || null,
      partnershipType: String(data.get("partnershipType") || "") || null,
      logoPath: logoPath,
      status: String(data.get("status") || "DRAFT"),
      displayOrder: Number(data.get("displayOrder") || 0),
    };

    try {
      const res = await fetch(`/api/admin/partners/${partner.id}`, {
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

  async function onArchive() {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/partners/${partner.id}`, { method: "DELETE" });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Failed");
      router.push("/admin/partners");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Archive failed");
      setLoading(false);
      setConfirmArchive(false);
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
        <Field label="Partner Name" required>
          <input type="text" name="name" required defaultValue={partner.name} className={inputClass} />
        </Field>

        <Field label="Logo">
          {logoPath && previewUrl ? (
            <div className="border border-slate-200 rounded-md p-4 flex items-center gap-4 bg-slate-50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl}
                alt=""
                className="h-16 w-16 object-cover rounded border border-slate-200 bg-white"
              />
              <div className="flex-1">
                <div className="text-sm font-medium text-slate-900">Current logo</div>
                <div className="text-xs text-slate-500 truncate">{logoPath}</div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setLogoPath(null);
                  setPreviewUrl(null);
                }}
                className="text-xs text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          ) : (
            <MediaUploader
              folder="partners"
              accept="image/*"
              value={null}
              onChange={(media) => {
                setLogoPath(media?.path ?? null);
                setPreviewUrl(media?.previewUrl ?? null);
              }}
              label="Upload new logo"
            />
          )}
        </Field>

        <Field label="Description">
          <textarea name="description" rows={3} defaultValue={partner.description} className={inputClass} />
        </Field>

        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Country">
            <input type="text" name="country" defaultValue={partner.country} className={inputClass} />
          </Field>
          <Field label="Partnership Type">
            <input type="text" name="partnershipType" defaultValue={partner.partnershipType} className={inputClass} />
          </Field>
        </div>

        <Field label="Website">
          <input type="url" name="website" defaultValue={partner.website} className={inputClass} />
        </Field>

        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Display Order">
            <input type="number" name="displayOrder" defaultValue={partner.displayOrder} min={0} className={inputClass} />
          </Field>
          <Field label="Status" required>
            <select name="status" defaultValue={partner.status} required className={inputClass}>
              <option value="DRAFT">Draft — hidden</option>
              <option value="PUBLISHED">Published — visible publicly</option>
              <option value="REVIEW">In review</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </Field>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 bg-slate-900 text-white text-sm font-medium px-5 py-2.5 rounded-md hover:bg-slate-800 disabled:opacity-60"
        >
          {loading ? (<><Loader2 className="w-4 h-4 animate-spin" />Saving…</>) : "Save Changes"}
        </button>

        {!confirmArchive ? (
          <button
            type="button"
            onClick={() => setConfirmArchive(true)}
            className="inline-flex items-center gap-2 border border-red-200 text-red-700 text-sm font-medium px-4 py-2.5 rounded-md hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
            Archive
          </button>
        ) : (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-600">Archive this partner?</span>
            <button
              type="button"
              onClick={onArchive}
              disabled={loading}
              className="bg-red-600 text-white px-3 py-1.5 rounded-md hover:bg-red-700 disabled:opacity-60"
            >
              Yes, archive
            </button>
            <button
              type="button"
              onClick={() => setConfirmArchive(false)}
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