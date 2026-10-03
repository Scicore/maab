import { NextResponse } from "next/server";

// Placeholder API route for contact form submissions.
// Wire this to an email service (Resend, SendGrid, Postmark) or CRM
// (HubSpot, Salesforce) once MAAB has confirmed the destination.

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Basic validation
    const required = ["name", "email", "subject", "message"];
    for (const field of required) {
      if (!body[field] || String(body[field]).trim().length === 0) {
        return NextResponse.json(
          { ok: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // TODO: integrate email delivery / CRM here.
    // Example (uncomment once configured):
    // await resend.emails.send({ ... });

    console.log("[contact] new submission", {
      name: body.name,
      email: body.email,
      company: body.company,
      subject: body.subject,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] error", err);
    return NextResponse.json(
      { ok: false, error: "Invalid request" },
      { status: 500 }
    );
  }
}