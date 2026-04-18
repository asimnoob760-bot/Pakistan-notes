"use client";

import Link from "next/link";
import { useState } from "react";
import type { ReactNode } from "react";
import { FeedbackButton } from "./feedback-button";
import { ThemeToggle } from "./theme-toggle";

type SiteShellProps = {
  children: ReactNode;
};

const navItems = [
  { href: "/class/11", label: "Class 11" },
  { href: "/past-papers", label: "Past Papers" },
  { href: "/exam-tips", label: "Exam Tips" },
  { href: "/about", label: "About" },
];

export function SiteShell({ children }: SiteShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF7F2] transition-colors duration-300 overflow-x-hidden">
      <header className="sticky top-0 z-20 border-b border-[#e8e0d5] bg-[#FFFBF7]/95 backdrop-blur-sm transition-colors duration-300">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 transition-opacity duration-200 hover:opacity-80 shrink-0">
            <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-[#8B9A6B] flex items-center justify-center shrink-0">
              <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span className="text-base sm:text-lg font-serif text-[#2c2c2c] whitespace-nowrap">PakNotes</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 lg:px-4 py-2 text-sm font-medium text-[#6b6b6b] transition-colors duration-200 hover:text-[#2c2c2c] hover:bg-[#e8e0d5]/30 rounded-md whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}
            {/* Theme Toggle */}
            <div className="ml-2 pl-2 border-l border-[#e8e0d5]">
              <ThemeToggle />
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-[#e8e0d5]/30 transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6 text-[#2c2c2c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-[#e8e0d5] bg-[#FFFBF7]/95">
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-base font-medium text-[#6b6b6b] hover:text-[#2c2c2c] hover:bg-[#e8e0d5]/30 rounded-lg transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </header>
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 box-border">{children}</main>
      <FeedbackButton />
    </div>
  );
}
