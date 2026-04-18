"use client";

import { useState } from "react";
import Link from "next/link";
import type { ChapterContent } from "@/lib/data";

// Helper to safely render answer with newlines
function AnswerText({ text }: { text: string }) {
  if (!text) return <span className="text-[#6b6b6b] italic">No answer provided yet.</span>;
  return (
    <div className="whitespace-pre-wrap">
      {text.split('\n').map((line, i) => (
        <span key={i}>
          {line}
          {i < text.split('\n').length - 1 && <br />}
        </span>
      ))}
    </div>
  );
}

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
                <Link
                  key={lq.id}
                  href={`/subject/${subjectSlug}/${chapter.slug}/question/${lq.id}`}
                  className="block bg-[#FFFBF7] border border-[#e8e0d5] rounded-xl p-6 hover:border-[#8B9A6B] hover:shadow-md transition-all group cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <span className="h-8 w-8 rounded-lg bg-[#8B9A6B]/10 flex items-center justify-center text-sm font-medium text-[#8B9A6B] flex-shrink-0">
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <p className="text-[#2c2c2c] font-medium">{lq.question}</p>
                      {lq.imageUrl && (
                        <div className="flex items-center gap-2 mt-2">
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#8B9A6B]/10 text-[#8B9A6B] rounded text-xs font-medium">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Has Solution
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
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
          <div className="space-y-4">
            {/* Combined Download Button */}
            {chapter.shortQuestionsCombinedImage && (
              <div className="bg-[#8B9A6B]/10 border border-[#8B9A6B]/20 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-[#8B9A6B] flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-[#2c2c2c]">All Short Questions in One Image</p>
                    <p className="text-sm text-[#6b6b6b]">Download the complete set</p>
                  </div>
                </div>
                <a
                  href={chapter.shortQuestionsCombinedImage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#8B9A6B] text-white rounded-lg hover:bg-[#7a8a5a] transition-colors text-sm font-medium flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download
                </a>
              </div>
            )}

            {chapter.shortQuestions && chapter.shortQuestions.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {chapter.shortQuestions.map((sq, index) => (
                  <div
                    key={sq.id}
                    className="flex flex-col gap-3 p-4 bg-[#FFFBF7] rounded-xl border border-[#e8e0d5] hover:border-[#8B9A6B] transition-colors"
                  >
                    {/* Question */}
                    <div className="flex items-start gap-3">
                      <span className="h-6 w-6 rounded bg-[#B8A5A0] flex items-center justify-center text-xs font-medium text-white flex-shrink-0">
                        {index + 1}
                      </span>
                      <p className="text-[#2c2c2c] font-medium">{sq.question}</p>
                    </div>

                    {/* Answer */}
                    <div className="ml-9 pl-3 border-l-2 border-[#e8e0d5]">
                      <p className="text-xs text-[#8B9A6B] font-medium mb-1 uppercase tracking-wide">Answer</p>
                      <div className="text-sm text-[#2c2c2c]">
                        <AnswerText text={sq.answer} />
                      </div>

                      {/* Answer Images */}
                      {sq.imageUrls && sq.imageUrls.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {sq.imageUrls.map((url, imgIndex) => (
                            <a
                              key={imgIndex}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2 py-1 bg-[#8B9A6B]/10 text-[#8B9A6B] rounded text-xs font-medium hover:bg-[#8B9A6B]/20 transition-colors"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              Image {imgIndex + 1}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-[#FFFBF7] border border-[#e8e0d5] rounded-xl p-8 text-center">
                <p className="text-[#6b6b6b]">Short questions coming soon for this chapter.</p>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
