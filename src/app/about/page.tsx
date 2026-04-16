"use client";

import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { useEffect, useState } from "react";

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <SiteShell>
      {/* Header */}
      <section className="mb-12">
        <div className="flex items-center gap-2 text-sm text-[#6b6b6b] mb-4">
          <Link href="/" className="hover:text-[#8B9A6B] transition-colors">Home</Link>
          <span>/</span>
          <span>About</span>
        </div>
        <h1 
          className={`text-3xl md:text-4xl font-serif text-[#2c2c2c] mb-3 transition-all duration-700 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          About PakNotes
        </h1>
      </section>

      {/* Content */}
      <section className="max-w-3xl">
        <div className="space-y-8">
          <div 
            className={`transition-all duration-700 delay-100 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <h2 className="text-xl font-serif text-[#2c2c2c] mb-3">Who is this for?</h2>
            <p className="text-[#6b6b6b] leading-relaxed">
              PakNotes is built for Pakistani students preparing for Class 11 and 12 board examinations 
              under the Punjab Board. Whether you&apos;re in FSc Pre-Medical or Pre-Engineering, 
              you&apos;ll find organized, comprehensive notes covering all major subjects.
            </p>
          </div>

          <div 
            className={`transition-all duration-700 delay-200 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <h2 className="text-xl font-serif text-[#2c2c2c] mb-3">Why was this made?</h2>
            <p className="text-[#6b6b6b] leading-relaxed">
              I remember the struggle of board exam preparation - hunting for quality notes, 
              buying expensive guide books, and still not finding everything in one place. 
              PakNotes exists to solve that problem: one website with all the content you need, 
              organized properly, completely free.
            </p>
          </div>

          <div 
            className={`transition-all duration-700 delay-300 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <h2 className="text-xl font-serif text-[#2c2c2c] mb-3">What makes this different?</h2>
            <ul className="space-y-3 text-[#6b6b6b]">
              <li className="flex items-start gap-3">
                <svg className="h-5 w-5 text-[#8B9A6B] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span><strong>Completely Free:</strong> No subscriptions, no hidden fees, no &quot;premium content&quot; walls.</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="h-5 w-5 text-[#8B9A6B] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span><strong>No Ads:</strong> We won&apos;t bombard you with distractions. Focus on studying, not closing popups.</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="h-5 w-5 text-[#8B9A6B] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span><strong>No Tracking:</strong> We don&apos;t collect your data or sell it to anyone. Your privacy matters.</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="h-5 w-5 text-[#8B9A6B] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span><strong>Mobile-First:</strong> Works perfectly on low-end Android phones with slow internet.</span>
              </li>
            </ul>
          </div>

          <div 
            className={`bg-[#8B9A6B]/10 border border-[#8B9A6B]/20 rounded-xl p-6 transition-all duration-700 delay-400 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <h2 className="text-xl font-serif text-[#2c2c2c] mb-3">How can you help?</h2>
            <p className="text-[#6b6b6b] leading-relaxed mb-4">
              Found a mistake? Have suggestions? Want to contribute notes? I&apos;d love to hear from you.
              This project grows better with community input.
            </p>
            <p className="text-[#6b6b6b] text-sm">
              Email: <a href="mailto:hello@paknotes.pk" className="text-[#8B9A6B] hover:underline">hello@paknotes.pk</a>
            </p>
          </div>

          <div 
            className={`transition-all duration-700 delay-500 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <p className="text-[#6b6b6b] text-sm italic">
              &ldquo;Built for Pakistani students by someone who remembers the struggle.&rdquo;
            </p>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
