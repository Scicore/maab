import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { authOptions } from "@/lib/auth";

const schema = z.object({
  status: z.enum([
    "SUBMITTED",
    "UNDER_REVIEW",
    "SHORTLISTED",
    "INTERVIEW",
    "ADDITIONAL_INFO_REQUIRED",
    "NOT_SELECTED",
    "WITHDRAWN",
    "HIRED",
  ]),
  note: z.string().max(2000).optional().nullable(),
});

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Invalid data" },
        { status: 400 }
      );
    }

    const before = await prisma.application.findUnique({
      where: { id: params.id },
    });
    if (!before) {
      return NextResponse.json(
        { ok: false, error: "Not found" },
        { status: 404 }
      );
    }

    const data = parsed.data;
    const userId = (session.user as { id?: string }).id ?? null;

    await prisma.application.update({
      where: { id: params.id },
      data: { status: data.status },
    });

    await prisma.applicationStatusHistory.create({
      data: {
        applicationId: params.id,
        fromStatus: before.status,
        toStatus: data.status,
        changedById: userId,
        note: data.note || null,
      },
    });

    if (data.note) {
      await prisma.applicationNote.create({
        data: {
          applicationId: params.id,
          authorId: userId || "",
          body: data.note,
          internal: true,
        },
      }).catch(() => {});
    }

    await prisma.auditLog.create({
      data: {
        userId: userId,
        action: "UPDATE_APPLICATION_STATUS",
        resource: "Application",
        resourceId: params.id,
        before: JSON.stringify({ status: before.status }),
        after: JSON.stringify({ status: data.status }),
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[admin/applications/status] error", err);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 }
    );
  }
}