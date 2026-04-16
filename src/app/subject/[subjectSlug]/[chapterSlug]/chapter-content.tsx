"use client";

import { useState } from "react";
import Link from "next/link";
import type { ChapterContent } from "@/lib/data";
import { MCQQuiz } from "@/components/mcq-quiz";

type ChapterContentProps = {
  chapter: ChapterContent;
  subjectSlug: string;
  subjectName: string;
};

export function ChapterContentClient({ chapter, subjectSlug, subjectName }: ChapterContentProps) {
  const [activeTab, setActiveTab] = useState("long-questions");

  const tabs = [
    { id: "long-questions", label: "Long Questions", count: chapter.longQuestions?.length || 0 },
    { id: "short-questions", label: "Short Questions", count: chapter.shortQuestions?.length || 0 },
    { id: "mcqs", label: "MCQs", count: chapter.mcqs?.length || 0 },
    { id: "mnemonics", label: "Mnemonics", count: 0 },
  ];

  return (
    <div>
      {/* Tabs Navigation */}
      <section className="mb-8">
        <div className="bg-[#FFFBF7] border border-[#e8e0d5] rounded-xl p-2 overflow-x-auto">
          <nav className="flex gap-1 min-w-max">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium rounded-lg transition-colors whitespace-nowrap flex items-center gap-2 ${
                  activeTab === tab.id
                    ? "bg-[#8B9A6B] text-white"
                    : "text-[#6b6b6b] hover:text-[#2c2c2c] hover:bg-[#e8e0d5]/30"
                }`}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    activeTab === tab.id ? "bg-white/20" : "bg-[#e8e0d5]"
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </section>

      {/* Tab Content */}
      <section>
        {/* Long Questions Tab */}
        {activeTab === "long-questions" && (
          <div className="space-y-4">
            {chapter.longQuestions && chapter.longQuestions.length > 0 ? (
              chapter.longQuestions.map((lq, index) => (
                <div
                  key={lq.id}
                  className="bg-[#FFFBF7] border border-[#e8e0d5] rounded-xl p-6 hover:border-[#8B9A6B] transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <span className="h-8 w-8 rounded-lg bg-[#8B9A6B]/10 flex items-center justify-center text-sm font-medium text-[#8B9A6B] flex-shrink-0">
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <p className="text-[#2c2c2c] font-medium mb-2">{lq.question}</p>
                      <span className="inline-flex items-center px-2 py-1 bg-[#B8A5A0]/10 text-[#B8A5A0] rounded text-xs font-medium">
                        {lq.marks} marks
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-[#FFFBF7] border border-[#e8e0d5] rounded-xl p-8 text-center">
                <p className="text-[#6b6b6b]">Long questions coming soon for this chapter.</p>
              </div>
            )}
          </div>
        )}

        {/* Short Questions Tab */}
        {activeTab === "short-questions" && (
          <div className="bg-[#FFFBF7] border border-[#e8e0d5] rounded-xl p-6">
            {chapter.shortQuestions && chapter.shortQuestions.length > 0 ? (
              <div className="grid gap-3 md:grid-cols-2">
                {chapter.shortQuestions.map((sq, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-[#FAF7F2] rounded-lg border border-[#e8e0d5]/50 hover:border-[#8B9A6B] transition-colors"
                  >
                    <span className="h-6 w-6 rounded bg-[#B8A5A0]/10 flex items-center justify-center text-xs font-medium text-[#B8A5A0] flex-shrink-0">
                      {index + 1}
                    </span>
                    <p className="text-[#2c2c2c] text-sm">{sq}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-[#6b6b6b]">Short questions coming soon for this chapter.</p>
              </div>
            )}
          </div>
        )}

        {/* MCQs Tab */}
        {activeTab === "mcqs" && (
          <MCQQuiz mcqs={chapter.mcqs || []} chapterName={chapter.name} />
        )}

        {/* Mnemonics Tab */}
        {activeTab === "mnemonics" && (
          <div className="bg-[#FFFBF7] border border-[#e8e0d5] rounded-xl p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#8B9A6B]/10 mb-4">
              <svg className="w-8 h-8 text-[#8B9A6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-lg font-serif text-[#2c2c2c] mb-2">Mnemonics Coming Soon</h3>
            <p className="text-[#6b6b6b] max-w-md mx-auto">
              Memory aids and tricks for this chapter are being prepared. Check back soon!
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
