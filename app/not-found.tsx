import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-[60vh] flex items-center">
      <div className="container-wide py-20 text-center">
        <div className="eyebrow-line text-xs font-semibold uppercase tracking-[0.18em] text-brass mb-4 inline-block">
          Error 404
        </div>
        <h1 className="text-h1 mb-5">This page could not be found.</h1>
        <p className="text-ink-soft text-lg leading-relaxed max-w-xl mx-auto mb-8">
          The page you are looking for may have been moved, renamed, or is no
          longer available. Please use the navigation above or return to the
          homepage.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-navy-900 text-white text-base font-medium px-6 py-3.5 rounded-md hover:bg-navy-800 transition-colors"
          >
            Back to Homepage
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center border border-line text-navy-900 text-base font-medium px-6 py-3.5 rounded-md hover:border-navy-300 hover:bg-surface transition-colors"
          >
            Contact MAAB
          </Link>
        </div>
      </div>
    </section>
  );
}