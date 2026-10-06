import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default function SuccessPage({
  searchParams,
}: {
  searchParams: { ticket?: string };
}) {
  const ticket = searchParams.ticket || "";

  return (
    <section className="bg-white">
      <div className="container-wide py-20 lg:py-28">
        <div className="max-w-2xl mx-auto text-center">
          <CheckCircle2 className="w-16 h-16 text-brass mx-auto mb-6" />
          <h1 className="text-h1 mb-5">Application Submitted</h1>
          <p className="text-lg text-ink-soft leading-relaxed mb-10">
            Thank you for applying to MAAB. Your application has been
            successfully received and will be reviewed by our team.
          </p>

          <div className="bg-sea-100 border border-line rounded-lg p-8 mb-8 text-left">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brass mb-3">
              Your Application Ticket
            </div>
            <div className="font-mono text-2xl font-semibold text-ink mb-5 break-all">
              {ticket || "MAAB-XXXX-XXXXXX"}
            </div>
            <p className="text-sm text-ink-soft leading-relaxed">
              <strong>Keep this ticket number.</strong> You will need it to
              reference your application. We will contact you via email about
              the status of your application.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/careers"
              className="inline-flex items-center gap-2 bg-navy-900 text-white text-sm font-medium px-5 py-3 rounded-md hover:bg-navy-800 transition-colors"
            >
              Back to Careers
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 border border-line text-navy-900 text-sm font-medium px-5 py-3 rounded-md hover:border-navy-300 hover:bg-sea-100 transition-colors"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}