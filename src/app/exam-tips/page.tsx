"use client";

import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { useEffect, useState } from "react";

export default function ExamTipsPage() {
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
          <span>Exam Tips</span>
        </div>
        <h1 
          className={`text-3xl md:text-4xl font-serif text-[#2c2c2c] mb-3 transition-all duration-700 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Exam Tips & Paper Format
        </h1>
        <p 
          className={`text-lg text-[#6b6b6b] max-w-2xl transition-all duration-700 delay-100 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Everything you need to know about Punjab Board exam format and preparation strategy.
        </p>
      </section>

      {/* Paper Format Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-serif text-[#2c2c2c] mb-6">Punjab Board Paper Format</h2>
        
        <div className="grid gap-6 md:grid-cols-3">
          {/* MCQs Card */}
          <div className="bg-[#FFFBF7] border border-[#e8e0d5] rounded-xl p-6">
            <div className="h-12 w-12 rounded-xl bg-[#8B9A6B]/10 flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-[#8B9A6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2l2-2m-6 6l-2-2m2 2l2 2m-2 2l2-2" />
              </svg>
            </div>
            <h3 className="text-lg font-serif text-[#2c2c2c] mb-2">Section A: MCQs</h3>
            <div className="space-y-2 text-sm text-[#6b6b6b]">
              <p><strong>Questions:</strong> 17 MCQs</p>
              <p><strong>Marks:</strong> 17 marks (1 each)</p>
              <p><strong>Time:</strong> ~20 minutes</p>
              <p className="text-[#8B9A6B]"><strong>Attempt:</strong> All compulsory</p>
            </div>
          </div>

          {/* Short Questions Card */}
          <div className="bg-[#FFFBF7] border border-[#e8e0d5] rounded-xl p-6">
            <div className="h-12 w-12 rounded-xl bg-[#B8A5A0]/10 flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-[#B8A5A0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-serif text-[#2c2c2c] mb-2">Section B: Short Questions</h3>
            <div className="space-y-2 text-sm text-[#6b6b6b]">
              <p><strong>Questions:</strong> 22 short questions</p>
              <p><strong>Marks:</strong> 44 marks (2 each)</p>
              <p><strong>Time:</strong> ~50 minutes</p>
              <p className="text-[#8B9A6B]"><strong>Attempt:</strong> Any 22 out of 26</p>
            </div>
          </div>

          {/* Long Questions Card */}
          <div className="bg-[#FFFBF7] border border-[#e8e0d5] rounded-xl p-6">
            <div className="h-12 w-12 rounded-xl bg-[#9CAF88]/10 flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-[#9CAF88]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-serif text-[#2c2c2c] mb-2">Section C: Long Questions</h3>
            <div className="space-y-2 text-sm text-[#6b6b6b]">
              <p><strong>Questions:</strong> 5 detailed questions</p>
              <p><strong>Marks:</strong> 39 marks (5, 8, 8, 9, 9)</p>
              <p><strong>Time:</strong> ~70 minutes</p>
              <p className="text-[#8B9A6B]"><strong>Attempt:</strong> Any 3 out of 5</p>
            </div>
          </div>
        </div>
      </section>

      {/* Total Marks Summary */}
      <section className="mb-12 bg-[#8B9A6B]/10 border border-[#8B9A6B]/20 rounded-xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-serif text-[#2c2c2c] mb-1">Total Paper Breakdown</h3>
            <p className="text-sm text-[#6b6b6b]">Punjab Board Class 11 Examination</p>
          </div>
          <div className="flex gap-8 text-center">
            <div>
              <div className="text-3xl font-serif text-[#8B9A6B]">100</div>
              <div className="text-sm text-[#6b6b6b]">Total Marks</div>
            </div>
            <div>
              <div className="text-3xl font-serif text-[#8B9A6B]">2h 40m</div>
              <div className="text-sm text-[#6b6b6b]">Time Allowed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Preparation Strategy */}
      <section className="mb-12">
        <h2 className="text-2xl font-serif text-[#2c2c2c] mb-6">Preparation Strategy</h2>
        
        <div className="space-y-6">
          <div className="bg-[#FFFBF7] border border-[#e8e0d5] rounded-xl p-6">
            <h3 className="text-lg font-serif text-[#2c2c2c] mb-3">1. Start with Past Papers</h3>
            <p className="text-[#6b6b6b]">
              Solve at least 5 years of past papers to understand the pattern. Focus on frequently asked topics 
              and questions that appear multiple times across different years.
            </p>
          </div>

          <div className="bg-[#FFFBF7] border border-[#e8e0d5] rounded-xl p-6">
            <h3 className="text-lg font-serif text-[#2c2c2c] mb-3">2. Master the MCQs</h3>
            <p className="text-[#6b6b6b]">
              MCQs are the easiest marks to secure. Practice them daily from all chapters. 
              Remember: 17 marks in just 20 minutes means 1 minute per question.
            </p>
          </div>

          <div className="bg-[#FFFBF7] border border-[#e8e0d5] rounded-xl p-6">
            <h3 className="text-lg font-serif text-[#2c2c2c] mb-3">3. Short Questions Strategy</h3>
            <p className="text-[#6b6b6b]">
              You get 26 questions and need to attempt 22. Read all questions first, 
              attempt the easiest ones first. Leave the difficult ones for last.
            </p>
          </div>

          <div className="bg-[#FFFBF7] border border-[#e8e0d5] rounded-xl p-6">
            <h3 className="text-lg font-serif text-[#2c2c2c] mb-3">4. Long Questions Planning</h3>
            <p className="text-[#6b6b6b]">
              You have 5 questions and must attempt 3. Choose questions from chapters you are most 
              confident about. The 9-mark questions usually require detailed diagrams and explanations.
            </p>
          </div>
        </div>
      </section>

      {/* Time Management */}
      <section>
        <h2 className="text-2xl font-serif text-[#2c2c2c] mb-6">Time Management</h2>
        
        <div className="bg-[#FFFBF7] border border-[#e8e0d5] rounded-xl p-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#e8e0d5]">
                <th className="text-left py-3 text-[#2c2c2c] font-medium">Section</th>
                <th className="text-left py-3 text-[#2c2c2c] font-medium">Time Allocated</th>
                <th className="text-left py-3 text-[#2c2c2c] font-medium">Strategy</th>
              </tr>
            </thead>
            <tbody className="text-[#6b6b6b]">
              <tr className="border-b border-[#e8e0d5]/50">
                <td className="py-3">MCQs (Section A)</td>
                <td className="py-3">20 minutes</td>
                <td className="py-3">Don&apos;t spend more than 1 minute per question</td>
              </tr>
              <tr className="border-b border-[#e8e0d5]/50">
                <td className="py-3">Short Questions (Section B)</td>
                <td className="py-3">50 minutes</td>
                <td className="py-3">~2 minutes per question including reading</td>
              </tr>
              <tr className="border-b border-[#e8e0d5]/50">
                <td className="py-3">Long Questions (Section C)</td>
                <td className="py-3">70 minutes</td>
                <td className="py-3">~23 minutes per question for detailed answers</td>
              </tr>
              <tr>
                <td className="py-3 font-medium">Buffer Time</td>
                <td className="py-3 font-medium">20 minutes</td>
                <td className="py-3 font-medium">For review and difficult questions</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </SiteShell>
  );
}
