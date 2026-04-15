import Link from "next/link";
import type { ReactNode } from "react";

type SiteShellProps = {
  children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-slate-50/90 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/" className="text-base font-semibold tracking-tight text-slate-900">
            Pakistan Notes
          </Link>
          <nav className="flex items-center gap-5 text-sm text-slate-600">
            <Link href="/" className="transition hover:text-slate-900">
              Subjects
            </Link>
            <Link href="/search" className="transition hover:text-slate-900">
              Search
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 sm:py-14 page-enter">{children}</main>
    </div>
  );
}
