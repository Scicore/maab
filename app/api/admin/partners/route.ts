import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { authOptions } from "@/lib/auth";

const schema = z.object({
  name: z.string().min(1).max(200),
  slug: z.string().min(1).max(200),
  description: z.string().max(2000).nullable(),
  website: z.string().max(500).nullable(),
  country: z.string().max(100).nullable(),
  partnershipType: z.string().max(100).nullable(),
  logoPath: z.string().max(500).nullable(),
  status: z.enum(["DRAFT", "PUBLISHED", "REVIEW", "ARCHIVED"]),
  displayOrder: z.number().int().min(0).max(9999),
});

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "Invalid data" }, { status: 400 });
    }

    const data = parsed.data;

    // Ensure unique slug
    const existing = await prisma.partner.findUnique({ where: { slug: data.slug } });
    const slug = existing
      ? `${data.slug}-${Date.now().toString(36)}`
      : data.slug;

    const partner = await prisma.partner.create({
      data: { ...data, slug },
    });

    await prisma.auditLog.create({
      data: {
        userId: (session.user as { id?: string }).id,
        action: "CREATE_PARTNER",
        resource: "Partner",
        resourceId: partner.id,
        after: JSON.stringify({ name: partner.name, status: partner.status }),
      },
    });

    return NextResponse.json({ ok: true, partner });
  } catch (err) {
    console.error("[admin/partners] error", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}