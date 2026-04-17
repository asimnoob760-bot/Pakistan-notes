"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { FeedbackButton } from "./feedback-button";
import { ThemeToggle } from "./theme-toggle";

type SiteShellProps = {
  children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="min-h-screen bg-[#FAF7F2] transition-colors duration-300">
      <header className="sticky top-0 z-20 border-b border-[#e8e0d5] bg-[#FFFBF7]/95 backdrop-blur-sm transition-colors duration-300">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 transition-opacity duration-200 hover:opacity-80">
            <div className="h-8 w-8 rounded-lg bg-[#8B9A6B] flex items-center justify-center">
              <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-serif text-[#2c2c2c]">PakNotes</span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-1">
            <Link 
              href="/class/11" 
              className="px-4 py-2 text-sm font-medium text-[#6b6b6b] transition-colors duration-200 hover:text-[#2c2c2c] hover:bg-[#e8e0d5]/30 rounded-md"
            >
              Class 11
            </Link>
            <Link 
              href="/past-papers" 
              className="px-4 py-2 text-sm font-medium text-[#6b6b6b] transition-colors duration-200 hover:text-[#2c2c2c] hover:bg-[#e8e0d5]/30 rounded-md"
            >
              Past Papers
            </Link>
            <Link 
              href="/exam-tips" 
              className="px-4 py-2 text-sm font-medium text-[#6b6b6b] transition-colors duration-200 hover:text-[#2c2c2c] hover:bg-[#e8e0d5]/30 rounded-md"
            >
              Exam Tips
            </Link>
            <Link 
              href="/about" 
              className="px-4 py-2 text-sm font-medium text-[#6b6b6b] transition-colors duration-200 hover:text-[#2c2c2c] hover:bg-[#e8e0d5]/30 rounded-md"
            >
              About
            </Link>
            {/* Theme Toggle */}
            <div className="ml-2 pl-2 border-l border-[#e8e0d5]">
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-8 sm:py-16">{children}</main>
      <FeedbackButton />
    </div>
  );
}
