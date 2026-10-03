"use client";

import { useState, FormEvent } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function PartnershipForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    // Placeholder — wire to real endpoint (e.g., /api/partnerships) once backend is ready.
    await new Promise((r) => setTimeout(r, 800));
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className="text-center py-6">
        <CheckCircle2 className="w-12 h-12 text-accent mx-auto mb-4" />
        <h3 className="text-h3 mb-2">Thank you — inquiry received.</h3>
        <p className="text-ink-soft">
          MAAB will review your submission and respond through the contact
          details you provided.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full border border-line rounded-md px-3.5 py-2.5 text-[0.9375rem] text-ink bg-white focus:outline-none focus:border-navy-900 focus:ring-1 focus:ring-navy-900 transition-colors";

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Full Name" required>
          <input type="text" name="name" required className={inputClass} />
        </Field>
        <Field label="Company" required>
          <input type="text" name="company" required className={inputClass} />
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Position">
          <input type="text" name="position" className={inputClass} />
        </Field>
        <Field label="Country" required>
          <input type="text" name="country" required className={inputClass} />
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Email" required>
          <input type="email" name="email" required className={inputClass} />
        </Field>
        <Field label="Phone">
          <input type="tel" name="phone" className={inputClass} />
        </Field>
      </div>

      <Field label="Partnership Type" required>
        <select name="partnershipType" required className={inputClass} defaultValue="">
          <option value="" disabled>
            Select a partnership type
          </option>
          <option>Strategic Partnership</option>
          <option>International Collaboration</option>
          <option>Business Development</option>
          <option>Professional Network</option>
          <option>Other</option>
        </select>
      </Field>

      <Field label="Message" required>
        <textarea name="message" rows={5} required className={inputClass} />
      </Field>

      {status === "error" && (
        <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-md px-3.5 py-2.5">
          Something went wrong. Please try again, or reach out directly through
          the contact page.
        </div>
      )}

      <div className="pt-2">
        <Button
          type="submit"
          size="lg"
          disabled={status === "submitting"}
          className="w-full sm:w-auto"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Submitting…
            </>
          ) : (
            "Submit Partnership Inquiry"
          )}
        </Button>
      </div>

      <p className="text-xs text-ink-muted pt-2">
        By submitting this form, you agree to MAAB contacting you regarding your
        inquiry. Spam protection may be applied at the point of submission.
      </p>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted mb-2">
        {label}
        {required && <span className="text-accent ml-1">*</span>}
      </span>
      {children}
    </label>
  );
}