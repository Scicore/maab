import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use for the MAAB website.",
  alternates: { canonical: "/terms-of-use" },
};

export default function TermsOfUsePage() {
  return (
    <>
      <section className="border-b border-line bg-surface">
        <div className="container-wide py-16 lg:py-24">
          <div className="eyebrow-line text-xs font-semibold uppercase tracking-[0.18em] text-accent mb-4">
            Legal
          </div>
          <h1 className="text-h1 max-w-3xl mb-4">Terms of Use</h1>
          <p className="text-ink-soft">Last updated: [Date to be confirmed]</p>
        </div>
      </section>

      <Section containerSize="tight">
        <div className="space-y-8 text-ink-soft leading-relaxed">
          <div>
            <h2 className="text-h3 text-ink mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing this website, you agree to these Terms of Use. If
              you do not agree, please do not use the site. Final wording will
              be published once reviewed and approved by MAAB.
            </p>
          </div>
          <div>
            <h2 className="text-h3 text-ink mb-3">2. Use of the Website</h2>
            <p>
              This website and its content are provided for informational
              purposes. You agree not to misuse the site or interfere with its
              normal operation.
            </p>
          </div>
          <div>
            <h2 className="text-h3 text-ink mb-3">3. Intellectual Property</h2>
            <p>
              All content on this website — including text, graphics, and
              logos — is the property of MAAB or its licensors and is protected
              by applicable laws.
            </p>
          </div>
          <div>
            <h2 className="text-h3 text-ink mb-3">4. No Warranties</h2>
            <p>
              The website is provided "as is" without warranties of any kind.
              Information may be updated or changed without notice.
            </p>
          </div>
          <div>
            <h2 className="text-h3 text-ink mb-3">5. Limitation of Liability</h2>
            <p>
              To the extent permitted by law, MAAB is not liable for any
              indirect, incidental, or consequential damages arising from use
              of this website.
            </p>
          </div>
          <div>
            <h2 className="text-h3 text-ink mb-3">6. Changes</h2>
            <p>
              These terms may be updated from time to time. Continued use of
              the website after changes constitutes acceptance.
            </p>
          </div>
          <div>
            <h2 className="text-h3 text-ink mb-3">7. Contact</h2>
            <p>
              Questions about these Terms of Use may be directed to MAAB
              through the contact page.
            </p>
          </div>
          <div className="border border-dashed border-line rounded-md p-4 bg-surface text-sm text-ink-muted">
            This is a placeholder terms document. Final wording must be
            reviewed by MAAB's legal counsel before publication.
          </div>
        </div>
      </Section>
    </>
  );
}