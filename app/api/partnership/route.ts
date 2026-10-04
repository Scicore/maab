import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";

const schema = z.object({
  name: z.string().min(1).max(200),
  company: z.string().min(1).max(200),
  position: z.string().max(200).optional().nullable(),
  country: z.string().min(1).max(100),
  email: z.string().email().max(200),
  phone: z.string().max(50).optional().nullable(),
  partnershipType: z.string().min(1).max(100),
  message: z.string().min(1).max(5000),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "Invalid form data" }, { status: 400 });
    }

    const data = parsed.data;

    await prisma.partnershipInquiry.create({
      data: {
        name: data.name,
        company: data.company,
        position: data.position ?? null,
        country: data.country,
        email: data.email,
        phone: data.phone ?? null,
        partnershipType: data.partnershipType,
        message: data.message,
        ipAddress: req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null,
        userAgent: req.headers.get("user-agent") ?? null,
      },
    });

    await prisma.notification.create({
      data: {
        kind: "PARTNERSHIP_INQUIRY",
        title: "New partnership inquiry",
        body: `${data.name} from ${data.company} (${data.country})`,
        link: "/admin/partnerships",
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[partnership] error", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}