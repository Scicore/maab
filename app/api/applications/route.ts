import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";

const schema = z.object({
  jobId: z.string().min(1),
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email().max(200),
  phone: z.string().min(1).max(50),
  countryOfResidence: z.string().min(1).max(100),
  city: z.string().min(1).max(100),
  nationality: z.string().max(100).optional().nullable(),
  currentJobTitle: z.string().max(200).optional().nullable(),
  currentEmployer: z.string().max(200).optional().nullable(),
  yearsExperience: z.number().int().min(0).max(60).optional().nullable(),
  highestQualification: z.string().max(200).optional().nullable(),
  university: z.string().max(200).optional().nullable(),
  skills: z.string().max(2000).optional().nullable(),
  coverLetter: z.string().min(1).max(8000),
  declaredAccurate: z.boolean(),
  declaredUnderstand: z.boolean(),
  declaredConsent: z.boolean(),
});

async function generateTicket(): Promise<string> {
  const year = new Date().getFullYear();
  for (let i = 0; i < 5; i++) {
    const count = await prisma.application.count({
      where: {
        createdAt: {
          gte: new Date(year, 0, 1),
          lt: new Date(year + 1, 0, 1),
        },
      },
    });
    const seq = count + 1 + i;
    const ticket = "MAAB-" + year + "-" + String(seq).padStart(6, "0");
    const exists = await prisma.application.findUnique({ where: { ticket } });
    if (!exists) return ticket;
  }
  return "MAAB-" + year + "-" + Date.now().toString(36).toUpperCase();
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Invalid form data" },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Confirm the job is published
    const job = await prisma.job.findUnique({ where: { id: data.jobId } });
    if (!job || job.status !== "PUBLISHED") {
      return NextResponse.json(
        { ok: false, error: "This position is not accepting applications" },
        { status: 400 }
      );
    }

    // Prevent duplicate application for same email + job
    const existing = await prisma.application.findFirst({
      where: {
        jobId: data.jobId,
        email: data.email.toLowerCase().trim(),
      },
    });
    if (existing) {
      return NextResponse.json(
        { ok: false, error: "You have already applied for this position" },
        { status: 400 }
      );
    }

    const ticket = await generateTicket();

    const application = await prisma.application.create({
      data: {
        ticket,
        jobId: data.jobId,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email.toLowerCase().trim(),
        phone: data.phone,
        countryOfResidence: data.countryOfResidence,
        city: data.city,
        nationality: data.nationality || null,
        currentJobTitle: data.currentJobTitle || null,
        currentEmployer: data.currentEmployer || null,
        yearsExperience: data.yearsExperience ?? null,
        highestQualification: data.highestQualification || null,
        university: data.university || null,
        skills: data.skills || null,
        declaredAccurate: data.declaredAccurate,
        declaredUnderstand: data.declaredUnderstand,
        declaredConsent: data.declaredConsent,
        status: "SUBMITTED",
        submittedAt: new Date(),
        ipAddress:
          req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null,
        userAgent: req.headers.get("user-agent") ?? null,
      },
    });

    // Store cover letter as an ApplicationNote visible to admin
    await prisma.applicationNote.create({
      data: {
        applicationId: application.id,
        authorId: (await prisma.user.findFirst({
          where: { role: "SUPER_ADMIN" },
          select: { id: true },
        }))?.id ?? "",
        body: "Cover Letter:\n\n" + data.coverLetter,
        internal: true,
      },
    }).catch(() => {
      // If no user exists for the FK, skip - not critical
    });

    // Record status history
    await prisma.applicationStatusHistory.create({
      data: {
        applicationId: application.id,
        toStatus: "SUBMITTED",
        note: "Application received",
      },
    });

    // Notify admins
    await prisma.notification.create({
      data: {
        kind: "APPLICATION_NEW",
        title: "New application: " + job.title,
        body: data.firstName + " " + data.lastName + " (" + ticket + ")",
        link: "/admin/applications/" + application.id,
      },
    });

    return NextResponse.json({ ok: true, ticket: application.ticket });
  } catch (err) {
    console.error("[applications] error", err);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 }
    );
  }
}