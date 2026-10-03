import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "MAAB's privacy policy — how we handle information collected through this website.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="border-b border-line bg-surface">
        <div className="container-wide py-16 lg:py-24">
          <div className="eyebrow-line text-xs font-semibold uppercase tracking-[0.18em] text-accent mb-4">
            Legal
          </div>
          <h1 className="text-h1 max-w-3xl mb-4">Privacy Policy</h1>
          <p className="text-ink-soft">Last updated: [Date to be confirmed]</p>
        </div>
      </section>

      <Section containerSize="tight">
        <div className="space-y-8 text-ink-soft leading-relaxed">
          <div>
            <h2 className="text-h3 text-ink mb-3">1. Introduction</h2>
            <p>
              This Privacy Policy describes how MAAB ("we", "us", "our")
              collects, uses, and protects information submitted through this
              website. The final policy will be published once reviewed and
              approved by MAAB.
            </p>
          </div>
          <div>
            <h2 className="text-h3 text-ink mb-3">2. Information We Collect</h2>
            <p>
              We collect information that you voluntarily submit through
              contact forms, partnership inquiry forms, or by contacting us
              directly. This may include your name, company, email address,
              phone number, country, and the content of your message.
            </p>
          </div>
          <div>
            <h2 className="text-h3 text-ink mb-3">3. How We Use Information</h2>
            <p>
              Information submitted through this website is used to respond to
              inquiries, evaluate partnership opportunities, and communicate
              with you regarding your submission.
            </p>
          </div>
          <div>
            <h2 className="text-h3 text-ink mb-3">4. Sharing of Information</h2>
            <p>
              We do not sell personal information. Information may be shared
              with service providers acting on our behalf, or where required by
              law.
            </p>
          </div>
          <div>
            <h2 className="text-h3 text-ink mb-3">5. Your Rights</h2>
            <p>
              You may request access, correction, or deletion of the
              information you have submitted, subject to applicable law.
              Contact details for such requests will be published here.
            </p>
          </div>
          <div>
            <h2 className="text-h3 text-ink mb-3">6. Contact</h2>
            <p>
              Questions about this Privacy Policy may be directed to MAAB
              through the contact page.
            </p>
          </div>
          <div className="border border-dashed border-line rounded-md p-4 bg-surface text-sm text-ink-muted">
            This is a placeholder policy. Final wording must be reviewed by
            MAAB's legal counsel before publication.
          </div>
        </div>
      </Section>
    </>
  );
}