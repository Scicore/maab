"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { navigation } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-line shadow-[0_1px_0_rgba(13,21,38,0.04)]"
          : "bg-white border-b border-line"
      )}
    >
      <div className="h-[3px] w-full bg-gradient-to-r from-brass via-accent to-navy-900" />

      <div className="container-wide">
        <div className="flex h-16 lg:h-[4.5rem] items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 group"
            aria-label="MAAB home"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-navy-900 text-white font-serif font-semibold text-lg leading-none transition-transform group-hover:scale-[1.03]">
              M
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-[1.0625rem] font-semibold tracking-[0.16em] text-ink">
                MAAB
              </span>
              <span className="text-[0.625rem] tracking-[0.22em] text-ink-muted uppercase mt-1">
                Texas · USA
              </span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5">
            {navigation.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-3 py-2 text-[0.875rem] font-medium rounded-md transition-colors",
                    active
                      ? "text-navy-900"
                      : "text-ink-soft hover:text-navy-900"
                  )}
                >
                  {item.label}
                  {active && (
                    <span className="absolute left-3 right-3 -bottom-[1px] h-[2px] bg-brass rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <Link
              href="/partnerships"
              className="group inline-flex items-center gap-1.5 bg-navy-900 text-white text-sm font-medium px-4 py-2.5 rounded-md transition-colors hover:bg-navy-800"
            >
              Partner With Us
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="lg:hidden flex h-10 w-10 items-center justify-center rounded-md text-ink hover:bg-sea-100"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "lg:hidden fixed inset-x-0 top-[calc(4rem+3px)] z-40 bg-white border-b border-line transition-all duration-300 overflow-hidden",
          open ? "max-h-[calc(100dvh-4rem)] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-5 py-6 overflow-y-auto max-h-[calc(100dvh-4rem)]">
          <nav className="flex flex-col">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-3.5 text-[0.9375rem] font-medium text-ink-soft hover:text-navy-900 border-b border-line last:border-0"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-6">
            <Link
              href="/partnerships"
              className="flex w-full items-center justify-center gap-2 bg-navy-900 text-white text-sm font-medium px-5 py-3 rounded-md"
            >
              Partner With Us
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}