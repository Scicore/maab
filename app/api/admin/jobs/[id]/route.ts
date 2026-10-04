import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { authOptions } from "@/lib/auth";

const updateSchema = z.object({
  title: z.string().min(1).max(200),
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
  status: z.enum(["DRAFT", "PUBLISHED", "CLOSED", "ARCHIVED"]),
});

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return null;
  return session;
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

    const before = await prisma.job.findUnique({ where: { id: params.id } });
    if (!before) {
      return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
    }

    const data = parsed.data;
    const publishing = data.status === "PUBLISHED" && before.status !== "PUBLISHED";
    const closing = data.status === "CLOSED" && before.status !== "CLOSED";

    const job = await prisma.job.update({
      where: { id: params.id },
      data: {
        ...data,
        publishedAt: publishing ? new Date() : before.publishedAt,
        closedAt: closing ? new Date() : before.closedAt,
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: (session.user as { id?: string }).id,
        action: "UPDATE_JOB",
        resource: "Job",
        resourceId: job.id,
        before: JSON.stringify({ status: before.status, title: before.title }),
        after: JSON.stringify({ status: job.status, title: job.title }),
      },
    });

    return NextResponse.json({ ok: true, job });
  } catch (err) {
    console.error("[admin/jobs/:id] error", err);
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
    const before = await prisma.job.findUnique({ where: { id: params.id } });
    if (!before) {
      return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
    }

    await prisma.job.delete({ where: { id: params.id } });

    await prisma.auditLog.create({
      data: {
        userId: (session.user as { id?: string }).id,
        action: "DELETE_JOB",
        resource: "Job",
        resourceId: params.id,
        before: JSON.stringify({ title: before.title }),
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[admin/jobs/:id] delete error", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}