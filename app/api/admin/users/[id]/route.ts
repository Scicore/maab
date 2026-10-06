import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { authOptions } from "@/lib/auth";

const updateSchema = z.object({
  name: z.string().min(1).max(200),
  role: z.enum([
    "SUPER_ADMIN",
    "ADMIN",
    "RECRUITER",
    "REVIEWER",
    "CONTENT_MANAGER",
    "SUPPORT",
  ]),
  status: z.enum(["ACTIVE", "SUSPENDED", "DISABLED"]),
  newPassword: z.string().min(12).max(200).optional().nullable(),
});

async function requireSuperAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return null;
  const role = (session.user as { role?: string }).role;
  if (role !== "SUPER_ADMIN" && role !== "ADMIN") return null;
  return session;
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await requireSuperAdmin();
  if (!session) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const parsed = updateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Invalid data" },
        { status: 400 }
      );
    }

    const before = await prisma.user.findUnique({ where: { id: params.id } });
    if (!before) {
      return NextResponse.json(
        { ok: false, error: "Not found" },
        { status: 404 }
      );
    }

    const data = parsed.data;

    const updateData: {
      name: string;
      role: typeof data.role;
      status: typeof data.status;
      passwordHash?: string;
    } = {
      name: data.name,
      role: data.role,
      status: data.status,
    };

    if (data.newPassword) {
      updateData.passwordHash = await bcrypt.hash(data.newPassword, 12);
    }

    const user = await prisma.user.update({
      where: { id: params.id },
      data: updateData,
    });

    await prisma.auditLog.create({
      data: {
        userId: (session.user as { id?: string }).id,
        action: "UPDATE_USER",
        resource: "User",
        resourceId: user.id,
        before: JSON.stringify({ role: before.role, status: before.status }),
        after: JSON.stringify({ role: user.role, status: user.status }),
      },
    });

    return NextResponse.json({
      ok: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        status: user.status,
      },
    });
  } catch (err) {
    console.error("[admin/users/:id] error", err);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await requireSuperAdmin();
  if (!session) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    // Prevent deleting yourself
    if ((session.user as { id?: string }).id === params.id) {
      return NextResponse.json(
        { ok: false, error: "You cannot delete your own account" },
        { status: 400 }
      );
    }

    const before = await prisma.user.findUnique({ where: { id: params.id } });
    if (!before) {
      return NextResponse.json(
        { ok: false, error: "Not found" },
        { status: 404 }
      );
    }

    // Soft-disable rather than delete, to keep audit trail intact
    await prisma.user.update({
      where: { id: params.id },
      data: { status: "DISABLED" },
    });

    await prisma.auditLog.create({
      data: {
        userId: (session.user as { id?: string }).id,
        action: "DISABLE_USER",
        resource: "User",
        resourceId: params.id,
        before: JSON.stringify({ email: before.email, status: before.status }),
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[admin/users/:id] delete error", err);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 }
    );
  }
}