import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { authOptions } from "@/lib/auth";

const createSchema = z.object({
  email: z.string().email().max(200),
  name: z.string().min(1).max(200),
  password: z.string().min(12).max(200),
  role: z.enum([
    "SUPER_ADMIN",
    "ADMIN",
    "RECRUITER",
    "REVIEWER",
    "CONTENT_MANAGER",
    "SUPPORT",
  ]),
});

async function requireSuperAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return null;
  const role = (session.user as { role?: string }).role;
  if (role !== "SUPER_ADMIN" && role !== "ADMIN") return null;
  return session;
}

export async function POST(req: Request) {
  const session = await requireSuperAdmin();
  if (!session) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const parsed = createSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Invalid data" },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const email = data.email.toLowerCase().trim();

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { ok: false, error: "A user with that email already exists" },
        { status: 400 }
      );
    }

    const passwordHash = await bcrypt.hash(data.password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        name: data.name,
        passwordHash,
        role: data.role,
        status: "ACTIVE",
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: (session.user as { id?: string }).id,
        action: "CREATE_USER",
        resource: "User",
        resourceId: user.id,
        after: JSON.stringify({ email: user.email, role: user.role }),
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
    console.error("[admin/users] error", err);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 }
    );
  }
}