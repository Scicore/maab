"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export function ApplicationForm({
  jobId,
  jobTitle,
}: {
  jobId: string;
  jobTitle: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      jobId,
      firstName: String(data.get("firstName") || ""),
      lastName: String(data.get("lastName") || ""),
      email: String(data.get("email") || ""),
      phone: String(data.get("phone") || ""),
      countryOfResidence: String(data.get("countryOfResidence") || ""),
      city: String(data.get("city") || ""),
      nationality: String(data.get("nationality") || ""),
      currentJobTitle: String(data.get("currentJobTitle") || ""),
      currentEmployer: String(data.get("currentEmployer") || ""),
      yearsExperience: Number(data.get("yearsExperience") || 0),
      highestQualification: String(data.get("highestQualification") || ""),
      university: String(data.get("university") || ""),
      skills: String(data.get("skills") || ""),
      coverLetter: String(data.get("coverLetter") || ""),
      declaredAccurate: data.get("declaredAccurate") === "on",
      declaredUnderstand: data.get("declaredUnderstand") === "on",
      declaredConsent: data.get("declaredConsent") === "on",
    };

    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Submission failed");
      }
      router.push("/careers/apply/" + jobId + "/success?ticket=" + json.ticket);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  }

  const inputClass =
    "w-full border border-line rounded-md px-3.5 py-2.5 text-[0.9375rem] text-ink bg-white focus:outline-none focus:border-navy-900 focus:ring-1 focus:ring-navy-900 transition-colors";

  return (
    <form onSubmit={onSubmit} className="space-y-10">
      {error && (
        <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-md px-4 py-3">
          {error}
        </div>
      )}

      <div className="bg-white border border-line rounded-lg p-8 space-y-6">
        <h2 className="text-h3">Personal Information</h2>

        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="First Name" required>
            <input type="text" name="firstName" required className={inputClass} />
          </Field>
          <Field label="Last Name" required>
            <input type="text" name="lastName" required className={inputClass} />
          </Field>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Email" required>
            <input type="email" name="email" required className={inputClass} />
          </Field>
          <Field label="Phone" required>
            <input type="tel" name="phone" required className={inputClass} />
          </Field>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          <Field label="Country" required>
            <input type="text" name="countryOfResidence" required className={inputClass} />
          </Field>
          <Field label="City" required>
            <input type="text" name="city" required className={inputClass} />
          </Field>
          <Field label="Nationality">
            <input type="text" name="nationality" className={inputClass} />
          </Field>
        </div>
      </div>

      <div className="bg-white border border-line rounded-lg p-8 space-y-6">
        <h2 className="text-h3">Professional Information</h2>

        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Current Job Title">
            <input type="text" name="currentJobTitle" className={inputClass} />
          </Field>
          <Field label="Current Employer">
            <input type="text" name="currentEmployer" className={inputClass} />
          </Field>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Years of Experience">
            <input type="number" name="yearsExperience" min={0} max={60} defaultValue={0} className={inputClass} />
          </Field>
          <Field label="Highest Qualification">
            <input type="text" name="highestQualification" placeholder="e.g. Bachelor Degree" className={inputClass} />
          </Field>
        </div>

        <Field label="University / Institution">
          <input type="text" name="university" className={inputClass} />
        </Field>

        <Field label="Key Skills">
          <textarea name="skills" rows={3} placeholder="Comma-separated list" className={inputClass} />
        </Field>
      </div>

      <div className="bg-white border border-line rounded-lg p-8 space-y-6">
        <h2 className="text-h3">Cover Letter</h2>
        <Field label="Why are you interested in this position?" required>
          <textarea name="coverLetter" rows={8} required className={inputClass} />
        </Field>
      </div>

      <div className="bg-white border border-line rounded-lg p-8 space-y-5">
        <h2 className="text-h3">Declarations</h2>

        <label className="flex gap-3 items-start text-[0.9375rem] text-ink-soft leading-relaxed">
          <input type="checkbox" name="declaredAccurate" required className="mt-1" />
          <span>
            I confirm that the information provided in this application is
            accurate and complete to the best of my knowledge. *
          </span>
        </label>

        <label className="flex gap-3 items-start text-[0.9375rem] text-ink-soft leading-relaxed">
          <input type="checkbox" name="declaredUnderstand" required className="mt-1" />
          <span>
            I understand that submitting this application does not guarantee
            employment, an interview, or selection. *
          </span>
        </label>

        <label className="flex gap-3 items-start text-[0.9375rem] text-ink-soft leading-relaxed">
          <input type="checkbox" name="declaredConsent" required className="mt-1" />
          <span>
            I consent to MAAB processing the information in this application
            for recruitment purposes. *
          </span>
        </label>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 bg-navy-900 text-white text-[0.9375rem] font-medium px-6 py-3.5 rounded-md hover:bg-navy-800 disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Application"
          )}
        </button>
      </div>
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
        {required && <span className="text-brass ml-1">*</span>}
      </span>
      {children}
    </label>
  );
}