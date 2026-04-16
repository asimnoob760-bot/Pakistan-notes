"use client";

import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { useEffect, useState } from "react";

const pastPapers = [
  {
    year: 2024,
    subjects: ["Biology", "Chemistry", "Physics", "Mathematics"],
    available: true
  },
  {
    year: 2023,
    subjects: ["Biology", "Chemistry", "Physics", "Mathematics"],
    available: true
  },
  {
    year: 2022,
    subjects: ["Biology", "Chemistry", "Physics", "Mathematics"],
    available: true
  },
  {
    year: 2021,
    subjects: ["Biology", "Chemistry", "Physics", "Mathematics"],
    available: true
  },
  {
    year: 2020,
    subjects: ["Biology", "Chemistry", "Physics", "Mathematics"],
    available: true
  },
  {
    year: 2019,
    subjects: ["Biology", "Chemistry", "Physics", "Mathematics"],
    available: true
  }
];

export default function PastPapersPage() {
  const [mounted, setMounted] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

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
          <span>Past Papers</span>
        </div>
        <h1 
          className={`text-3xl md:text-4xl font-serif text-[#2c2c2c] mb-3 transition-all duration-700 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Past Papers
        </h1>
        <p 
          className={`text-lg text-[#6b6b6b] max-w-2xl transition-all duration-700 delay-100 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Punjab Board examination papers with solutions and study notes.
        </p>
      </section>

      {/* Subject Filter */}
      <section className="mb-8">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedSubject(null)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedSubject === null 
                ? 'bg-[#8B9A6B] text-white' 
                : 'bg-[#FFFBF7] border border-[#e8e0d5] text-[#6b6b6b] hover:border-[#8B9A6B]'
            }`}
          >
            All Subjects
          </button>
          {["Biology", "Chemistry", "Physics", "Mathematics"].map((subject) => (
            <button
              key={subject}
              onClick={() => setSelectedSubject(subject)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedSubject === subject 
                  ? 'bg-[#8B9A6B] text-white' 
                  : 'bg-[#FFFBF7] border border-[#e8e0d5] text-[#6b6b6b] hover:border-[#8B9A6B]'
              }`}
            >
              {subject}
            </button>
          ))}
        </div>
      </section>

      {/* Years Grid */}
      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {pastPapers.map((paper, index) => (
          <div
            key={paper.year}
            className={`bg-[#FFFBF7] border border-[#e8e0d5] rounded-xl p-6 transition-all duration-300 hover:border-[#8B9A6B] hover:shadow-lg ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: mounted ? `${200 + index * 100}ms` : '0ms' }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-serif text-[#2c2c2c]">{paper.year}</h3>
              <span className="px-3 py-1 bg-[#8B9A6B]/10 text-[#8B9A6B] rounded-full text-xs font-medium">
                Punjab Board
              </span>
            </div>
            
            <div className="space-y-3 mb-6">
              {paper.subjects.map((subject) => (
                <div key={subject} className="flex items-center justify-between">
                  <span className="text-[#6b6b6b]">{subject}</span>
                  <div className="flex items-center gap-2">
                    <button className="text-xs text-[#8B9A6B] hover:underline">
                      Preview
                    </button>
                    <span className="text-[#e8e0d5]">|</span>
                    <button className="text-xs text-[#8B9A6B] hover:underline flex items-center gap-1">
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full py-3 bg-[#8B9A6B] text-white rounded-lg hover:bg-[#7a8a5a] transition-colors text-sm font-medium">
              Download All Papers
            </button>
          </div>
        ))}
      </section>

      {/* Note */}
      <section className="mt-12 bg-[#FFFBF7] border border-[#e8e0d5] rounded-xl p-6">
        <h2 className="text-lg font-serif text-[#2c2c2c] mb-3">About Past Papers</h2>
        <p className="text-sm text-[#6b6b6b] mb-4">
          All papers are sourced from Punjab Board examinations and include detailed solutions. 
          Papers are organized by year and subject for easy access.
        </p>
        <ul className="space-y-2 text-sm text-[#6b6b6b]">
          <li className="flex items-center gap-2">
            <svg className="h-4 w-4 text-[#8B9A6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Original board examination papers
          </li>
          <li className="flex items-center gap-2">
            <svg className="h-4 w-4 text-[#8B9A6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Detailed solutions and explanations
          </li>
          <li className="flex items-center gap-2">
            <svg className="h-4 w-4 text-[#8B9A6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Pattern analysis and important topics
          </li>
        </ul>
      </section>
    </SiteShell>
  );
}
