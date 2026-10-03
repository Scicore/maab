import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { PlaceholderBadge } from "@/components/ui/PlaceholderBadge";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "News & Insights",
  description: "News, partnerships, business updates, and insights from MAAB.",
  alternates: { canonical: "/news" },
};

const articles = [
  { slug: "welcome-to-maab", title: "Welcome to MAAB", category: "Company News", date: "January 15, 2026", excerpt: "An introduction to MAAB and our commitment to building trusted connections across international markets." },
  { slug: "international-perspective", title: "The Value of an International Perspective in Business", category: "Insights", date: "February 1, 2026", excerpt: "How cross-border awareness shapes long-term business relationships and durable partnerships." },
  { slug: "partnership-approach", title: "MAAB's Approach to Partnership", category: "Partnerships", date: "February 20, 2026", excerpt: "A structured, transparent approach to building partnerships across markets and sectors." },
  { slug: "responsible-business", title: "Responsible Business in a Changing Global Economy", category: "Business", date: "March 10, 2026", excerpt: "Why professional standards and responsible practice are the foundation of lasting international relationships." },
];

export default function NewsPage() {
  return (
    <>
      <section className="bg-navy-900 text-white">
        <div className="container-wide py-20 lg:py-28">
          <div className="eyebrow-line text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-brass mb-5">
            News &amp; Insights
          </div>
          <h1 className="text-h1 max-w-3xl mb-7 text-white">
            Updates from MAAB.
          </h1>
          <p className="text-lg text-white/70 leading-relaxed max-w-2xl">
            Company news, partnership announcements, business updates, and
            insights. Articles shown below are demo content until real
            editorial content is provided.
          </p>
        </div>
      </section>

      <Section className="bg-white">
        <div className="flex items-center justify-between mb-10">
          <PlaceholderBadge>Demo content</PlaceholderBadge>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((a) => (
            <Link
              key={a.slug}
              href={`/news/${a.slug}`}
              className="group bg-white border border-line rounded-lg overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated hover:border-navy-300"
            >
              <div className="aspect-[16/9] bg-sea-100 border-b border-line grid-lines" />
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-brass">
                    {a.category}
                  </span>
                  <span className="text-[0.6875rem] text-ink-muted">{a.date}</span>
                </div>
                <h3 className="text-h3 mb-3">{a.title}</h3>
                <p className="text-ink-soft text-[0.9375rem] leading-relaxed mb-6">
                  {a.excerpt}
                </p>
                <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-navy-900 group-hover:text-brass transition-colors">
                  Read Article
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}