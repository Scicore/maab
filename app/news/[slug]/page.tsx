import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

type Props = { params: { slug: string } };

const articles: Record<
  string,
  {
    title: string;
    category: string;
    date: string;
    author: string;
    excerpt: string;
    body: string[];
  }
> = {
  "welcome-to-maab": {
    title: "Welcome to MAAB",
    category: "Company News",
    date: "January 15, 2026",
    author: "MAAB Editorial",
    excerpt:
      "An introduction to MAAB and our commitment to building trusted connections across international markets.",
    body: [
      "This is a demonstration article. Final editorial content will be published here once approved by MAAB.",
      "MAAB is an international business and professional services company headquartered in Texas, United States. The company works with clients, partners, and organizations across international markets.",
      "Further detail on the company's services, industries, and partnerships will be published as official information becomes available.",
    ],
  },
  "international-perspective": {
    title: "The Value of an International Perspective in Business",
    category: "Insights",
    date: "February 1, 2026",
    author: "MAAB Editorial",
    excerpt:
      "How cross-border awareness shapes long-term business relationships and durable partnerships.",
    body: [
      "This is a demonstration article. Final editorial content will be published here once approved by MAAB.",
      "An international perspective helps organizations anticipate context, understand local operating environments, and build relationships that endure beyond single transactions.",
    ],
  },
  "partnership-approach": {
    title: "MAAB's Approach to Partnership",
    category: "Partnerships",
    date: "February 20, 2026",
    author: "MAAB Editorial",
    excerpt:
      "A structured, transparent approach to building partnerships across markets and sectors.",
    body: [
      "This is a demonstration article. Final editorial content will be published here once approved by MAAB.",
      "MAAB's partnerships are built on alignment of interests, mutual respect, and clear expectations. Specific partnership case studies will be published as they are verified.",
    ],
  },
  "responsible-business": {
    title: "Responsible Business in a Changing Global Economy",
    category: "Business",
    date: "March 10, 2026",
    author: "MAAB Editorial",
    excerpt:
      "Why professional standards and responsible practice are the foundation of lasting international relationships.",
    body: [
      "This is a demonstration article. Final editorial content will be published here once approved by MAAB.",
      "Responsible business practice is not a constraint on growth — it is the foundation on which durable international relationships are built.",
    ],
  },
};

export function generateMetadata({ params }: Props): Metadata {
  const article = articles[params.slug];
  if (!article) return { title: "Article not found" };
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/news/${params.slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.date,
      authors: [article.author],
    },
  };
}

export default function ArticlePage({ params }: Props) {
  const article = articles[params.slug];
  if (!article) notFound();

  return (
    <>
      <section className="bg-navy-900 text-white">
        <div className="container-wide py-16 lg:py-24">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to News &amp; Insights
          </Link>

          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-brass">
              {article.category}
            </span>
            <span className="text-white/40">·</span>
            <span className="inline-flex items-center gap-1.5 text-[0.8125rem] text-white/60">
              <Calendar className="w-3.5 h-3.5" />
              {article.date}
            </span>
            <span className="text-white/40">·</span>
            <span className="inline-flex items-center gap-1.5 text-[0.8125rem] text-white/60">
              <User className="w-3.5 h-3.5" />
              {article.author}
            </span>
          </div>

          <h1 className="text-h1 max-w-4xl mb-6 text-white">{article.title}</h1>
          <p className="text-lg text-white/70 leading-relaxed max-w-3xl">
            {article.excerpt}
          </p>
        </div>
      </section>

      <Section className="bg-white">
        <article className="max-w-3xl mx-auto">
          <div className="aspect-[16/9] bg-sea-100 border border-line rounded-lg grid-lines mb-12" />
          <div className="space-y-6 text-lg text-ink-soft leading-relaxed">
            {article.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-line flex flex-wrap items-center justify-between gap-4">
            <span className="text-sm text-ink-muted">
              This is demo content until real editorial is provided.
            </span>
            <Button href="/news" variant="secondary">
              All Articles
            </Button>
          </div>
        </article>
      </Section>
    </>
  );
}