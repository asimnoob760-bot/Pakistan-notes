"use client";

import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { useEffect, useState } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <SiteShell>
      {/* Hero Section */}
      <section className="text-center py-12 md:py-16">
        <h1 
          className={`text-4xl md:text-5xl font-serif text-[#2c2c2c] mb-4 transition-all duration-700 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          PakNotes
        </h1>
        <p 
          className={`text-lg text-[#6b6b6b] max-w-xl mx-auto mb-2 transition-all duration-700 delay-100 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Free study notes for Pakistani students preparing for board exams.
        </p>
        <p 
          className={`text-base text-[#8B9A6B] transition-all duration-700 delay-200 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          No ads. No tracking. Just helpful content.
        </p>
      </section>

      {/* Entry Cards */}
      <section className="max-w-4xl mx-auto">
        <div className="grid gap-6 md:grid-cols-3">
          {/* Class 11 Notes Card */}
          <Link
            href="/class/11"
            className={`group bg-[#FFFBF7] border border-[#e8e0d5] rounded-xl p-8 transition-all duration-300 hover:border-[#8B9A6B] hover:shadow-lg hover:-translate-y-1 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: mounted ? '300ms' : '0ms' }}
          >
            <div className="mb-4 h-14 w-14 rounded-xl bg-[#8B9A6B]/10 flex items-center justify-center group-hover:bg-[#8B9A6B]/20 transition-colors">
              <svg className="h-7 w-7 text-[#8B9A6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-serif text-[#2c2c2c] mb-2 group-hover:text-[#8B9A6B] transition-colors">
              Class 11 Notes
            </h3>
            <p className="text-sm text-[#6b6b6b]">
              Biology, Chemistry, Physics & more
            </p>
          </Link>

          {/* Past Papers Card */}
          <Link
            href="/past-papers"
            className={`group bg-[#FFFBF7] border border-[#e8e0d5] rounded-xl p-8 transition-all duration-300 hover:border-[#8B9A6B] hover:shadow-lg hover:-translate-y-1 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: mounted ? '400ms' : '0ms' }}
          >
            <div className="mb-4 h-14 w-14 rounded-xl bg-[#B8A5A0]/10 flex items-center justify-center group-hover:bg-[#B8A5A0]/20 transition-colors">
              <svg className="h-7 w-7 text-[#B8A5A0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-serif text-[#2c2c2c] mb-2 group-hover:text-[#B8A5A0] transition-colors">
              Past Papers
            </h3>
            <p className="text-sm text-[#6b6b6b]">
              Punjab Board papers with solutions
            </p>
          </Link>

          {/* Exam Tips Card */}
          <Link
            href="/exam-tips"
            className={`group bg-[#FFFBF7] border border-[#e8e0d5] rounded-xl p-8 transition-all duration-300 hover:border-[#8B9A6B] hover:shadow-lg hover:-translate-y-1 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: mounted ? '500ms' : '0ms' }}
          >
            <div className="mb-4 h-14 w-14 rounded-xl bg-[#8B9A6B]/10 flex items-center justify-center group-hover:bg-[#8B9A6B]/20 transition-colors">
              <svg className="h-7 w-7 text-[#8B9A6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-serif text-[#2c2c2c] mb-2 group-hover:text-[#8B9A6B] transition-colors">
              Exam Tips
            </h3>
            <p className="text-sm text-[#6b6b6b]">
              Paper format & time management
            </p>
          </Link>
        </div>
      </section>

      {/* Footer Note */}
      <section 
        className={`text-center mt-16 text-sm text-[#6b6b6b] transition-all duration-700 ${
          mounted ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transitionDelay: mounted ? '600ms' : '0ms' }}
      >
        <p>Built for Pakistani students by someone who remembers the struggle.</p>
      </section>
    </SiteShell>
  );
}
