import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Globe2,
  Handshake,
  ShieldCheck,
  Users,
  Scale,
  Compass,
  Briefcase,
  Network,
} from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const regions = [
  "Texas", "United States", "Africa", "Europe", "Middle East", "Asia", "Global",
];

const trustPoints = [
  { icon: Globe2, title: "International Perspective", text: "A cross-border outlook shaped by working with clients, partners, and relationships across multiple regions." },
  { icon: ShieldCheck, title: "Professional Standards", text: "Clear communication, careful process, and consistency in how engagements are handled." },
  { icon: Handshake, title: "Strategic Partnerships", text: "Long-term relationships built on alignment of interests, mutual respect, and reliability." },
  { icon: Users, title: "Client-Centered Approach", text: "Attention to each client’s context, objectives, and operating environment." },
  { icon: Scale, title: "Responsible Business", text: "A considered approach to compliance, conduct, and long-term reputation." },
  { icon: Compass, title: "Long-Term Relationships", text: "A preference for durable engagement over short-term transactions." },
];

const serviceIcons = [Briefcase, Handshake, Globe2, Network];
const serviceCards = [
  { title: "[Service Area 01]", description: "A structured service offering to be defined once MAAB’s official service catalogue is confirmed." },
  { title: "[Service Area 02]", description: "A structured service offering to be defined once MAAB’s official service catalogue is confirmed." },
  { title: "[Service Area 03]", description: "A structured service offering to be defined once MAAB’s official service catalogue is confirmed." },
  { title: "[Service Area 04]", description: "A structured service offering to be defined once MAAB’s official service catalogue is confirmed." },
];

export default function HomePage() {
  return (
    <>
      <ScrollReveal />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-navy-950 text-white">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=2400&q=80"
            alt=""
            fill
            priority
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/40" />
        </div>

        <div className="relative container-wide">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center py-24 lg:py-40">
            <div className="lg:col-span-7">
              <div className="eyebrow-line text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-brass mb-6">
                MAAB · Texas, United States
              </div>
              <h1 className="text-display text-white mb-7">
                Building Trusted Connections Across Markets
              </h1>
              <p className="text-lg lg:text-xl text-white/75 leading-relaxed max-w-2xl mb-10">
                MAAB connects people, businesses, and opportunities through
                professional services, international partnerships, and
                solutions designed for a changing global economy.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button href="/about" size="lg" withArrow>
                  Explore MAAB
                </Button>
                <Link
                  href="/partnerships"
                  className="inline-flex items-center gap-2 border border-white/20 text-white font-medium px-6 py-3.5 rounded-md hover:bg-white/5 hover:border-white/40 transition-colors text-base"
                >
                  Partner With Us
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 hidden lg:block">
              <div className="border-l border-white/15 pl-8 space-y-6">
                {[
                  { k: "01", v: "Headquartered in Texas, United States" },
                  { k: "02", v: "Working with clients and partners internationally" },
                  { k: "03", v: "Professional services across sectors" },
                ].map((row) => (
                  <div key={row.k} className="flex gap-5">
                    <div className="text-brass font-mono text-sm pt-0.5">{row.k}</div>
                    <div className="text-white/80 text-[0.9375rem] leading-relaxed">{row.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── INTRO ─────────────────────────────────────────── */}
      <Section className="bg-white">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-20">
          <div className="lg:col-span-5">
            <div className="eyebrow-line text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-brass mb-5">
              Who We Are
            </div>
            <h2 className="text-h2 mb-6">
              A professional services company built for a global economy.
            </h2>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-navy-900 font-medium hover:text-accent transition-colors"
            >
              About MAAB
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="lg:col-span-7 space-y-5 text-ink-soft leading-relaxed text-lg">
            <p>
              MAAB is an international business and professional services
              company headquartered in Texas, United States. The company works
              with clients, partners, and organizations across international
              markets.
            </p>
            <p>
              MAAB’s work is built around clear professional standards,
              long-term relationships, and a practical approach to operating
              across borders. Further detail on the company’s services,
              industries, and partnerships will be published as official
              information becomes available.
            </p>
          </div>
        </div>
      </Section>

      {/* ── WHAT WE DO ────────────────────────────────────── */}
      <Section className="bg-sea-100">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <SectionHeader
            eyebrow="What We Do"
            title="Service areas"
            className="!max-w-2xl"
          />
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-navy-900 font-medium hover:text-accent transition-colors"
          >
            View all services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {serviceCards.map((card, i) => {
            const Icon = serviceIcons[i];
            return (
              <Link
                key={card.title}
                href="/services"
                className="group bg-white border border-line rounded-lg p-7 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated hover:border-navy-300"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-md bg-navy-900 text-white mb-6">
                  <Icon className="w-5 h-5" />
                </span>
                <h3 className="text-h3 mb-3">{card.title}</h3>
                <p className="text-ink-soft leading-relaxed text-[0.9375rem] mb-6">
                  {card.description}
                </p>
                <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-navy-900 group-hover:text-accent transition-colors">
                  Learn More
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </Section>

      {/* ── GLOBAL REACH ─────────────────────────────────── */}
      <Section className="bg-white">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="Global Reach"
              title="Serving clients and partners across international markets."
              description="MAAB’s network extends through clients, partners, and business relationships across regions. MAAB does not claim physical offices in every market shown."
            />
          </div>
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-line border border-line rounded-lg overflow-hidden">
              {regions.map((r, i) => (
                <div
                  key={r}
                  className={`bg-white px-6 py-8 ${i === 0 ? "bg-navy-900 text-white" : ""}`}
                >
                  <div className={`text-[0.6875rem] font-mono uppercase tracking-[0.16em] mb-3 ${i === 0 ? "text-brass" : "text-ink-muted"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className={`text-[0.9375rem] font-medium ${i === 0 ? "text-white" : "text-ink"}`}>
                    {r}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ── WHY MAAB ──────────────────────────────────────── */}
      <Section className="bg-navy-950 text-white">
        <div className="max-w-3xl mb-16">
          <div className="eyebrow-line text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-brass mb-5">
            Why MAAB
          </div>
          <h2 className="text-h2 text-white mb-5">
            Reasons clients and partners choose to work with us.
          </h2>
          <p className="text-white/60 text-lg leading-relaxed">
            These principles describe how MAAB approaches its work and its
            relationships. Specific claims will be supported by verified
            information as it becomes available.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-14">
          {trustPoints.map((point) => {
            const Icon = point.icon;
            return (
              <div key={point.title}>
                <span className="flex h-11 w-11 items-center justify-center rounded-md bg-white/[0.06] border border-white/10 text-brass mb-6">
                  <Icon className="w-5 h-5" />
                </span>
                <h3 className="text-[1.0625rem] font-semibold mb-3 text-white">
                  {point.title}
                </h3>
                <p className="text-white/60 leading-relaxed text-[0.9375rem]">
                  {point.text}
                </p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* ── PARTNERSHIPS ─────────────────────────────────── */}
      <Section className="bg-sea-100">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6">
            <SectionHeader
              eyebrow="Our Partners"
              title="We work with businesses, organizations, and professionals."
              description="MAAB’s partnership network is built through long-term, transparent relationships with organizations across international markets. Verified partner logos will be published here once approved."
            />
            <div className="mt-8">
              <Button href="/partnerships" withArrow>
                Explore Partnership
              </Button>
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-[3/2] flex items-center justify-center border border-dashed border-line rounded-md bg-white/70 text-[0.6875rem] uppercase tracking-[0.14em] text-ink-muted"
                >
                  Partner Logo
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ── CAREERS ──────────────────────────────────────── */}
      <Section className="bg-white">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <div className="eyebrow-line text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-brass mb-5">
              Careers
            </div>
            <h2 className="text-h2 mb-6">Build Your Future With MAAB</h2>
            <p className="text-ink-soft text-lg leading-relaxed mb-3 max-w-2xl">
              MAAB is interested in connecting talented people with
              opportunities as the company grows. Where roles are available,
              they will be listed with clear information about the position,
              location, and requirements.
            </p>
            <p className="text-ink-muted text-[0.9375rem]">
              There are currently no open positions. Please check back later.
            </p>
          </div>
          <div className="lg:col-span-5 lg:text-right">
            <Button href="/careers" size="lg" withArrow>
              View Opportunities
            </Button>
          </div>
        </div>
      </Section>

      {/* ── FINAL CTA ─────────────────────────────────────── */}
      <section className="bg-navy-950 text-white">
        <div className="container-wide py-24 lg:py-32">
          <div className="max-w-3xl">
            <div className="eyebrow-line text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-brass mb-6">
              Get In Touch
            </div>
            <h2 className="text-h1 text-white mb-6">
              Let’s Build Something That Matters
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-10">
              Whether you are exploring a partnership, evaluating a service, or
              representing an organization, MAAB welcomes a conversation.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href="/contact" size="lg" withArrow>
                Contact MAAB
              </Button>
              <Link
                href="/partnerships"
                className="inline-flex items-center gap-2 border border-white/20 text-white font-medium px-6 py-3.5 rounded-md hover:bg-white/5 hover:border-white/40 transition-colors text-base"
              >
                Become a Partner
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}