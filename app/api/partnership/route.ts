import { NextResponse } from "next/server";

// Placeholder API route for partnership inquiries.
// Wire this to an email service or CRM once MAAB has confirmed the destination.

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const required = ["name", "company", "country", "email", "partnershipType", "message"];
    for (const field of required) {
      if (!body[field] || String(body[field]).trim().length === 0) {
        return NextResponse.json(
          { ok: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // TODO: integrate email / CRM here.

    console.log("[partnership] new submission", {
      name: body.name,
      company: body.company,
      country: body.country,
      email: body.email,
      partnershipType: body.partnershipType,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[partnership] error", err);
    return NextResponse.json(
      { ok: false, error: "Invalid request" },
      { status: 500 }
    );
  }
}