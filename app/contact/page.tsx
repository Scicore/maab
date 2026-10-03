import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { MapPin, Mail, Phone, Clock } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact MAAB — international business and professional services company headquartered in Texas, United States.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-navy-900 text-white">
        <div className="container-wide py-20 lg:py-28">
          <div className="eyebrow-line text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-brass mb-5">
            Contact
          </div>
          <h1 className="text-h1 max-w-3xl mb-7 text-white">
            Get in touch with MAAB.
          </h1>
          <p className="text-lg text-white/70 leading-relaxed max-w-2xl">
            For general inquiries, partnership discussions, or press, please
            use the form below or reach out through the contact details provided.
          </p>
        </div>
      </section>

      <Section className="bg-white">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5 space-y-5">
            {[
              { icon: MapPin, label: "Headquarters", value: "Texas, United States", note: "[Official address to be provided]" },
              { icon: Mail, label: "Email", value: "[Official email to be provided]" },
              { icon: Phone, label: "Phone", value: "[Official phone to be provided]" },
              { icon: Clock, label: "Business Hours", value: "[Business hours to be provided]" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.label}>
                  <div className="flex gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-md bg-navy-900 text-white flex-shrink-0">
                      <Icon className="w-5 h-5" />
                    </span>
                    <div>
                      <div className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-ink-muted mb-1.5">
                        {item.label}
                      </div>
                      <div className="text-ink font-medium">{item.value}</div>
                      {item.note && (
                        <div className="text-ink-muted text-sm mt-1">{item.note}</div>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="lg:col-span-7">
            <Card className="!p-8 sm:!p-10">
              <div className="font-mono text-xs text-brass mb-3">01 — GENERAL</div>
              <h2 className="text-h3 mb-6">General Inquiry</h2>
              <ContactForm />
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}