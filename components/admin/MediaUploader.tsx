"use client";

import { useState, useRef } from "react";
import { Loader2, Upload, X, ImageIcon } from "lucide-react";

type UploadedMedia = {
  id: string;
  path: string;
  originalName: string;
  mimeType: string;
  sizeBytes: number;
  previewUrl: string | null;
};

export function MediaUploader({
  folder,
  accept = "image/*",
  value,
  onChange,
  label = "Upload file",
}: {
  folder: string;
  accept?: string;
  value?: UploadedMedia | null;
  onChange: (media: UploadedMedia | null) => void;
  label?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [uploaded, setUploaded] = useState<UploadedMedia | null>(value ?? null);

  async function handleFile(file: File) {
    setError("");

    // Sanitize filename BEFORE building FormData.
    // The multipart header is Latin-1 only, so non-ASCII names break fetch().
    const extMatch = file.name.match(/\.[a-zA-Z0-9]+$/);
    const ext = extMatch ? extMatch[0] : ".png";
    const baseName =
      file.name
        .replace(/\.[^.]+$/, "")
        .normalize("NFKD")
        .replace(/[^\x20-\x7E]/g, "")
        .replace(/[^\w.\-]/g, "_")
        .replace(/_+/g, "_")
        .replace(/^_|_$/g, "")
        .slice(0, 60) || "file";

    const safeFileName = `${baseName}${ext}`;
    const safeFile = new File([file], safeFileName, { type: file.type });

    setUploading(true);

    const fd = new FormData();
    fd.append("file", safeFile);
    fd.append("folder", folder);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: fd,
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Upload failed");

      setUploaded(json.media);
      onChange(json.media);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  function remove() {
    setUploaded(null);
    onChange(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div>
      {uploaded ? (
        <div className="border border-slate-200 rounded-md p-4 flex items-center gap-4 bg-slate-50">
          {uploaded.mimeType.startsWith("image/") && uploaded.previewUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={uploaded.previewUrl}
              alt=""
              className="h-16 w-16 object-cover rounded border border-slate-200 bg-white"
            />
          ) : (
            <div className="h-16 w-16 rounded border border-slate-200 bg-white flex items-center justify-center">
              <ImageIcon className="w-6 h-6 text-slate-400" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-slate-900 truncate">
              {uploaded.originalName}
            </div>
            <div className="text-xs text-slate-500">
              {Math.round(uploaded.sizeBytes / 1024)} KB - uploaded
            </div>
          </div>
          <button
            type="button"
            onClick={remove}
            className="flex h-8 w-8 items-center justify-center rounded-md text-slate-400 hover:text-red-600 hover:bg-white"
            aria-label="Remove file"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-full border-2 border-dashed border-slate-300 rounded-md px-4 py-6 flex flex-col items-center gap-2 hover:border-slate-400 hover:bg-slate-50 transition-colors disabled:opacity-60"
        >
          {uploading ? (
            <>
              <Loader2 className="w-5 h-5 text-slate-400 animate-spin" />
              <span className="text-sm text-slate-500">Uploading...</span>
            </>
          ) : (
            <>
              <Upload className="w-5 h-5 text-slate-400" />
              <span className="text-sm font-medium text-slate-700">{label}</span>
              <span className="text-xs text-slate-500">
                Click to select - max 5 MB
              </span>
            </>
          )}
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />

      {error && (
        <p className="text-xs text-red-600 mt-2">{error}</p>
      )}
    </div>
  );
}