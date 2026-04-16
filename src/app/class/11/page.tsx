"use client";

import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { useEffect, useState } from "react";

const subjects = [
  {
    slug: "biology",
    name: "Biology",
    description: "Living organisms, cell structure, genetics, and more",
    chapters: 12,
    color: "#8B9A6B"
  },
  {
    slug: "chemistry",
    name: "Chemistry",
    description: "Atomic structure, chemical bonding, organic chemistry",
    chapters: 11,
    color: "#B8A5A0"
  },
  {
    slug: "physics",
    name: "Physics",
    description: "Mechanics, thermodynamics, waves, and modern physics",
    chapters: 10,
    color: "#9CAF88"
  },
  {
    slug: "mathematics",
    name: "Mathematics",
    description: "Algebra, calculus, trigonometry, and geometry",
    chapters: 14,
    color: "#A89F91"
  }
];

export default function Class11Page() {
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
          <span>Class 11</span>
        </div>
        <h1 
          className={`text-3xl md:text-4xl font-serif text-[#2c2c2c] mb-3 transition-all duration-700 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Class 11 Notes
        </h1>
        <p 
          className={`text-lg text-[#6b6b6b] max-w-2xl transition-all duration-700 delay-100 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Complete study notes for all FSc Pre-Medical and Pre-Engineering subjects.
        </p>
      </section>

      {/* Subject Cards */}
      <section className="grid gap-6 md:grid-cols-2">
        {subjects.map((subject, index) => (
          <Link
            key={subject.slug}
            href={`/class/11/${subject.slug}`}
            className={`group bg-[#FFFBF7] border border-[#e8e0d5] rounded-xl p-6 transition-all duration-300 hover:border-[${subject.color}] hover:shadow-lg hover:-translate-y-1 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ 
              transitionDelay: mounted ? `${200 + index * 100}ms` : '0ms',
              borderColor: 'var(--border-color)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = subject.color}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e8e0d5'}
          >
            <div className="flex items-start justify-between mb-4">
              <div 
                className="h-12 w-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${subject.color}15` }}
              >
                <svg className="h-6 w-6" style={{ color: subject.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <span 
                className="px-3 py-1 rounded-full text-sm font-medium"
                style={{ backgroundColor: `${subject.color}15`, color: subject.color }}
              >
                {subject.chapters} Chapters
              </span>
            </div>
            
            <h3 
              className="text-xl font-serif text-[#2c2c2c] mb-2 transition-colors"
              style={{ ['--hover-color' as string]: subject.color }}
            >
              {subject.name}
            </h3>
            
            <p className="text-[#6b6b6b] text-sm mb-4">
              {subject.description}
            </p>
            
            <div className="flex items-center text-sm" style={{ color: subject.color }}>
              <span className="font-medium">View all chapters</span>
              <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </section>

      {/* Quick Info */}
      <section className="mt-12 bg-[#FFFBF7] border border-[#e8e0d5] rounded-xl p-6">
        <h2 className="text-lg font-serif text-[#2c2c2c] mb-3">About Class 11 Notes</h2>
        <ul className="space-y-2 text-sm text-[#6b6b6b]">
          <li className="flex items-center gap-2">
            <svg className="h-4 w-4 text-[#8B9A6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Long questions with detailed explanations
          </li>
          <li className="flex items-center gap-2">
            <svg className="h-4 w-4 text-[#8B9A6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Short questions with mnemonics
          </li>
          <li className="flex items-center gap-2">
            <svg className="h-4 w-4 text-[#8B9A6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Interactive MCQs with instant feedback
          </li>
          <li className="flex items-center gap-2">
            <svg className="h-4 w-4 text-[#8B9A6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Handwritten notes and diagrams
          </li>
        </ul>
      </section>
    </SiteShell>
  );
}
