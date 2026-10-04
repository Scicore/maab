import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import { supabaseAdmin, STORAGE_BUCKET } from "@/lib/supabase-admin";

// Allowed MIME types per category
const IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg+xml",
];

const DOC_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ...IMAGE_TYPES,
];

// 5 MB default, 10 MB for documents
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const MAX_DOC_BYTES = 10 * 1024 * 1024;

function detectCategory(mime: string): "image" | "document" | null {
  if (IMAGE_TYPES.includes(mime)) return "image";
  if (DOC_TYPES.includes(mime)) return "document";
  return null;
}

function sanitizeFilename(name: string): string {
  return name
    .replace(/[^\w.\-]/g, "_")
    .replace(/_+/g, "_")
    .slice(0, 120);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  if (!supabaseAdmin) {
    return NextResponse.json(
      { ok: false, error: "Storage is not configured" },
      { status: 500 }
    );
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = String(formData.get("folder") || "misc").replace(
      /[^\w\-]/g,
      ""
    );

    if (!file) {
      return NextResponse.json(
        { ok: false, error: "No file provided" },
        { status: 400 }
      );
    }

    const category = detectCategory(file.type);
    if (!category) {
      return NextResponse.json(
        { ok: false, error: `Unsupported file type: ${file.type}` },
        { status: 400 }
      );
    }

    const maxBytes = category === "image" ? MAX_IMAGE_BYTES : MAX_DOC_BYTES;
    if (file.size > maxBytes) {
      return NextResponse.json(
        {
          ok: false,
          error: `File too large. Max ${Math.round(maxBytes / 1024 / 1024)} MB.`,
        },
        { status: 400 }
      );
    }
    const buffer = Buffer.from(await file.arrayBuffer());

    // Aggressively sanitize filename: strip ALL non-ASCII characters.
    // Filenames must be Latin-1 safe for HTTP header transport.
    const rawName = file.name || "file";
    const asciiName = rawName
      .normalize("NFKD")
      .replace(/[^\x20-\x7E]/g, "") // strip everything non-printable-ASCII
      .replace(/[^\w.\-]/g, "_")
      .replace(/_+/g, "_")
      .slice(-80); // keep last 80 chars (preserves extension)

    const safeName = asciiName || "file";
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).slice(2, 8);
    const path = `${folder}/${timestamp}-${random}-${safeName}`;
    const { error: uploadError } = await supabaseAdmin.storage
      .from(STORAGE_BUCKET)
      .upload(path, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error("[upload] supabase error", uploadError);
      return NextResponse.json(
        { ok: false, error: uploadError.message },
        { status: 500 }
      );
    }

    // Record in Media table
    const media = await prisma.media.create({
      data: {
        filename: path,
        originalName: file.name,
        mimeType: file.type,
        sizeBytes: file.size,
        storagePath: path,
        folder,
        uploadedById: (session.user as { id?: string }).id ?? null,
      },
    });

    // Generate a signed URL valid for 1 hour (for preview)
    const { data: signed } = await supabaseAdmin.storage
      .from(STORAGE_BUCKET)
      .createSignedUrl(path, 60 * 60);

    return NextResponse.json({
      ok: true,
      media: {
        id: media.id,
        path,
        originalName: file.name,
        mimeType: file.type,
        sizeBytes: file.size,
        previewUrl: signed?.signedUrl ?? null,
      },
    });
  } catch (err) {
    console.error("[upload] error", err);
    return NextResponse.json(
      { ok: false, error: "Upload failed" },
      { status: 500 }
    );
  }
}