import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import { supabaseAdmin, STORAGE_BUCKET } from "@/lib/supabase-admin";

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/svg+xml"];
const DOC_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ...IMAGE_TYPES,
];

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const MAX_DOC_BYTES = 10 * 1024 * 1024;

function detectCategory(mime: string): "image" | "document" | null {
  if (IMAGE_TYPES.includes(mime)) return "image";
  if (DOC_TYPES.includes(mime)) return "document";
  return null;
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  if (!supabaseAdmin) {
    return NextResponse.json(
      { ok: false, error: "Storage not configured" },
      { status: 500 }
    );
  }

  try {
    const contentType = req.headers.get("content-type") || "";

    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json(
        { ok: false, error: "Expected multipart" },
        { status: 400 }
      );
    }

    const boundaryMatch = contentType.match(/boundary=(?:"([^"]+)"|([^;]+))/);
    const boundary = boundaryMatch?.[1] || boundaryMatch?.[2];
    if (!boundary) {
      return NextResponse.json(
        { ok: false, error: "No boundary" },
        { status: 400 }
      );
    }

    const arrayBuffer = await req.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);
    const parts = parseMultipart(bytes, boundary);

    let fileBytes: Uint8Array | null = null;
    let fileMime = "application/octet-stream";
    let folder = "misc";

    for (const part of parts) {
      if (part.name === "file") {
        fileBytes = part.data;
        if (part.contentType) fileMime = part.contentType;
      } else if (part.name === "folder") {
        folder =
          new TextDecoder().decode(part.data).replace(/[^\w\-]/g, "") ||
          "misc";
      }
    }

    if (!fileBytes || fileBytes.length === 0) {
      return NextResponse.json(
        { ok: false, error: "No file" },
        { status: 400 }
      );
    }

    const category = detectCategory(fileMime);
    if (!category) {
      return NextResponse.json(
        { ok: false, error: "Unsupported type: " + fileMime },
        { status: 400 }
      );
    }

    const maxBytes = category === "image" ? MAX_IMAGE_BYTES : MAX_DOC_BYTES;
    if (fileBytes.length > maxBytes) {
      return NextResponse.json(
        { ok: false, error: "File too large" },
        { status: 400 }
      );
    }

    const ext = fileMime.split("/")[1]?.replace("jpeg", "jpg") || "bin";
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).slice(2, 10);
    const finalName = "upload-" + timestamp + "-" + random + "." + ext;
    const path = folder + "/" + finalName;

    const buffer = Buffer.from(fileBytes);

    const { error: uploadError } = await supabaseAdmin.storage
      .from(STORAGE_BUCKET)
      .upload(path, buffer, { contentType: fileMime, upsert: false });

    if (uploadError) {
      console.error("[upload] supabase error", uploadError);
      return NextResponse.json(
        { ok: false, error: uploadError.message },
        { status: 500 }
      );
    }

    const media = await prisma.media.create({
      data: {
        filename: finalName,
        originalName: finalName,
        mimeType: fileMime,
        sizeBytes: fileBytes.length,
        storagePath: path,
        folder,
        uploadedById: (session.user as { id?: string }).id ?? null,
      },
    });

    const { data: signed } = await supabaseAdmin.storage
      .from(STORAGE_BUCKET)
      .createSignedUrl(path, 60 * 60);

    return NextResponse.json({
      ok: true,
      media: {
        id: media.id,
        path,
        originalName: finalName,
        mimeType: fileMime,
        sizeBytes: fileBytes.length,
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

type Part = { name: string; contentType?: string; data: Uint8Array };

function parseMultipart(bytes: Uint8Array, boundary: string): Part[] {
  const parts: Part[] = [];
  const encoder = new TextEncoder();
  const boundaryBytes = encoder.encode("--" + boundary);
  const crlf = encoder.encode("\r\n");
  const doubleCrlf = encoder.encode("\r\n\r\n");

  const indices: number[] = [];
  for (let i = 0; i <= bytes.length - boundaryBytes.length; i++) {
    let match = true;
    for (let j = 0; j < boundaryBytes.length; j++) {
      if (bytes[i + j] !== boundaryBytes[j]) {
        match = false;
        break;
      }
    }
    if (match) indices.push(i);
  }

  for (let i = 0; i < indices.length - 1; i++) {
    const start = indices[i] + boundaryBytes.length + crlf.length;
    const end = indices[i + 1] - crlf.length;

    let headerEnd = -1;
    for (let j = start; j <= end - doubleCrlf.length; j++) {
      let ok = true;
      for (let k = 0; k < doubleCrlf.length; k++) {
        if (bytes[j + k] !== doubleCrlf[k]) {
          ok = false;
          break;
        }
      }
      if (ok) {
        headerEnd = j;
        break;
      }
    }
    if (headerEnd === -1) continue;

    const headerText = new TextDecoder().decode(bytes.slice(start, headerEnd));
    const nameMatch = headerText.match(/name="([^"]+)"/);
    const ctMatch = headerText.match(/Content-Type:\s*([^\r\n]+)/i);

    const bodyStart = headerEnd + doubleCrlf.length;
    const bodyEnd = end;
    if (bodyEnd <= bodyStart) continue;

    parts.push({
      name: nameMatch?.[1] || "",
      contentType: ctMatch?.[1]?.trim(),
      data: bytes.slice(bodyStart, bodyEnd),
    });
  }

  return parts;
}