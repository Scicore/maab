import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import { supabaseAdmin, STORAGE_BUCKET } from "@/lib/supabase-admin";

const updateSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(2000).nullable(),
  website: z.string().max(500).nullable(),
  country: z.string().max(100).nullable(),
  partnershipType: z.string().max(100).nullable(),
  logoPath: z.string().max(500).nullable(),
  status: z.enum(["DRAFT", "PUBLISHED", "REVIEW", "ARCHIVED"]),
  displayOrder: z.number().int().min(0).max(9999),
});

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  return session?.user ? session : null;
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = updateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "Invalid data" }, { status: 400 });
    }

    const before = await prisma.partner.findUnique({ where: { id: params.id } });
    if (!before) {
      return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
    }

    const partner = await prisma.partner.update({
      where: { id: params.id },
      data: parsed.data,
    });

    await prisma.auditLog.create({
      data: {
        userId: (session.user as { id?: string }).id,
        action: "UPDATE_PARTNER",
        resource: "Partner",
        resourceId: partner.id,
        before: JSON.stringify({ name: before.name, status: before.status }),
        after: JSON.stringify({ name: partner.name, status: partner.status }),
      },
    });

    return NextResponse.json({ ok: true, partner });
  } catch (err) {
    console.error("[admin/partners/:id] error", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const before = await prisma.partner.findUnique({ where: { id: params.id } });
    if (!before) {
      return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
    }

    // Soft-archive instead of hard delete if there's a logo file
    await prisma.partner.update({
      where: { id: params.id },
      data: { status: "ARCHIVED" },
    });

    // Delete logo from storage if it exists
    if (before.logoPath && supabaseAdmin) {
      await supabaseAdmin.storage.from(STORAGE_BUCKET).remove([before.logoPath]);
    }

    await prisma.auditLog.create({
      data: {
        userId: (session.user as { id?: string }).id,
        action: "ARCHIVE_PARTNER",
        resource: "Partner",
        resourceId: params.id,
        before: JSON.stringify({ name: before.name }),
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[admin/partners/:id] delete error", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}