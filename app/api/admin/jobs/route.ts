import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { authOptions } from "@/lib/auth";

const schema = z.object({
  title: z.string().min(1).max(200),
  slug: z.string().min(1).max(200),
  department: z.string().min(1).max(100),
  location: z.string().min(1).max(200),
  country: z.string().min(1).max(100),
  employmentType: z.enum(["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP"]),
  workMode: z.enum(["ONSITE", "HYBRID", "REMOTE"]),
  salaryRange: z.string().max(200).nullable(),
  description: z.string().min(1),
  responsibilities: z.string().min(1),
  requirements: z.string().min(1),
  qualifications: z.string().min(1),
  experience: z.string().max(200).nullable(),
  positionsOpen: z.number().int().min(1).max(999),
  status: z.enum(["DRAFT", "PUBLISHED"]),
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
      return NextResponse.json(
        { ok: false, error: "Invalid form data", issues: parsed.error.issues },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Ensure slug is unique
    const existing = await prisma.job.findUnique({ where: { slug: data.slug } });
    const slug = existing
      ? `${data.slug}-${Date.now().toString(36)}`
      : data.slug;

    const job = await prisma.job.create({
      data: {
        ...data,
        slug,
        publishedAt: data.status === "PUBLISHED" ? new Date() : null,
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: (session.user as { id?: string }).id,
        action: "CREATE_JOB",
        resource: "Job",
        resourceId: job.id,
        after: JSON.stringify({ title: job.title, status: job.status }),
      },
    });

    return NextResponse.json({ ok: true, job });
  } catch (err) {
    console.error("[admin/jobs] error", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}