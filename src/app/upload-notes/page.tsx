"use client";

import { useState } from "react";
import { subjectCatalog } from "@/lib/data";
import { SiteShell } from "@/components/site-shell";

export default function UploadNotesPage() {
  const [subjectSlug, setSubjectSlug] = useState("");
  const [chapterSlug, setChapterSlug] = useState("");
  const [contentType, setContentType] = useState("long-question");
  const [question, setQuestion] = useState("");
  const [marks, setMarks] = useState(10);
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Get available chapters based on selected subject
  const selectedSubject = subjectCatalog.find((s) => s.slug === subjectSlug);
  const chapters = selectedSubject?.chapters || [];

  // Reset chapter when subject changes
  const handleSubjectChange = (slug: string) => {
    setSubjectSlug(slug);
    setChapterSlug("");
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    let content: any = {};

    switch (contentType) {
      case "long-question":
        content = { question, marks };
        break;
      case "short-question":
        content = { question };
        break;
      case "mcq":
        content = {
          question,
          options: options.filter((o) => o.trim() !== ""),
          correctAnswer
        };
        break;
    }

    try {
      const response = await fetch("/api/add-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subjectSlug,
          chapterSlug,
          contentType,
          content
        })
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: "success", text: "✓ Note published successfully!" });
        // Reset form
        setQuestion("");
        setMarks(10);
        setOptions(["", "", "", ""]);
        setCorrectAnswer(0);
      } else {
        setMessage({ type: "error", text: data.error || "Failed to publish note" });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Network error. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SiteShell>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <section className="mb-8">
          <h1 className="text-3xl md:text-4xl font-serif text-[#2c2c2c] mb-3">
            Upload Notes
          </h1>
          <p className="text-lg text-[#6b6b6b]">
            Add new questions and content directly to the database.
          </p>
        </section>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Subject Dropdown */}
          <div className="bg-[#FFFBF7] border border-[#e8e0d5] rounded-xl p-6">
            <label className="block text-sm font-medium text-[#2c2c2c] mb-3">
              Subject <span className="text-red-500">*</span>
            </label>
            <select
              value={subjectSlug}
              onChange={(e) => handleSubjectChange(e.target.value)}
              required
              className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#e8e0d5] rounded-lg text-[#2c2c2c] focus:outline-none focus:border-[#8B9A6B] transition-colors"
            >
              <option value="">Select a subject...</option>
              {subjectCatalog.map((subject) => (
                <option key={subject.slug} value={subject.slug}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>

          {/* Chapter Dropdown */}
          <div className="bg-[#FFFBF7] border border-[#e8e0d5] rounded-xl p-6">
            <label className="block text-sm font-medium text-[#2c2c2c] mb-3">
              Chapter <span className="text-red-500">*</span>
            </label>
            <select
              value={chapterSlug}
              onChange={(e) => setChapterSlug(e.target.value)}
              required
              disabled={!subjectSlug}
              className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#e8e0d5] rounded-lg text-[#2c2c2c] focus:outline-none focus:border-[#8B9A6B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">Select a chapter...</option>
              {chapters.map((chapter) => (
                <option key={chapter.slug} value={chapter.slug}>
                  {chapter.name}
                </option>
              ))}
            </select>
            {!subjectSlug && (
              <p className="text-xs text-[#6b6b6b] mt-2">
                Select a subject first to see available chapters.
              </p>
            )}
          </div>

          {/* Content Type */}
          <div className="bg-[#FFFBF7] border border-[#e8e0d5] rounded-xl p-6">
            <label className="block text-sm font-medium text-[#2c2c2c] mb-3">
              Content Type <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: "long-question", label: "Long Question", icon: "📄" },
                { id: "short-question", label: "Short Question", icon: "📝" },
                { id: "mcq", label: "MCQ", icon: "🔘" }
              ].map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setContentType(type.id)}
                  className={`p-4 rounded-lg border text-sm font-medium transition-all ${
                    contentType === type.id
                      ? "bg-[#8B9A6B] text-white border-[#8B9A6B]"
                      : "bg-[#FAF7F2] border-[#e8e0d5] text-[#6b6b6b] hover:border-[#8B9A6B]"
                  }`}
                >
                  <span className="block text-2xl mb-1">{type.icon}</span>
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Question Content */}
          <div className="bg-[#FFFBF7] border border-[#e8e0d5] rounded-xl p-6">
            <label className="block text-sm font-medium text-[#2c2c2c] mb-3">
              Question <span className="text-red-500">*</span>
            </label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
              rows={contentType === "short-question" ? 3 : 5}
              placeholder={
                contentType === "long-question"
                  ? "Enter detailed long question..."
                  : contentType === "short-question"
                  ? "Enter short question..."
                  : "Enter MCQ question..."
              }
              className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#e8e0d5] rounded-lg text-[#2c2c2c] focus:outline-none focus:border-[#8B9A6B] transition-colors resize-none"
            />
          </div>

          {/* Long Question: Marks */}
          {contentType === "long-question" && (
            <div className="bg-[#FFFBF7] border border-[#e8e0d5] rounded-xl p-6">
              <label className="block text-sm font-medium text-[#2c2c2c] mb-3">
                Marks
              </label>
              <input
                type="number"
                value={marks}
                onChange={(e) => setMarks(parseInt(e.target.value) || 0)}
                min={1}
                max={20}
                className="w-32 px-4 py-3 bg-[#FAF7F2] border border-[#e8e0d5] rounded-lg text-[#2c2c2c] focus:outline-none focus:border-[#8B9A6B] transition-colors"
              />
            </div>
          )}

          {/* MCQ: Options */}
          {contentType === "mcq" && (
            <div className="bg-[#FFFBF7] border border-[#e8e0d5] rounded-xl p-6 space-y-4">
              <label className="block text-sm font-medium text-[#2c2c2c]">
                Options <span className="text-red-500">*</span>
              </label>
              {options.map((option, index) => (
                <div key={index} className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="correctAnswer"
                    checked={correctAnswer === index}
                    onChange={() => setCorrectAnswer(index)}
                    className="w-4 h-4 text-[#8B9A6B] focus:ring-[#8B9A6B]"
                  />
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder={`Option ${String.fromCharCode(65 + index)}`}
                    required
                    className="flex-1 px-4 py-2 bg-[#FAF7F2] border border-[#e8e0d5] rounded-lg text-[#2c2c2c] focus:outline-none focus:border-[#8B9A6B] transition-colors"
                  />
                  {correctAnswer === index && (
                    <span className="text-xs text-[#8B9A6B] font-medium bg-[#8B9A6B]/10 px-2 py-1 rounded">
                      Correct
                    </span>
                  )}
                </div>
              ))}
              <p className="text-xs text-[#6b6b6b]">
                Select the radio button next to the correct answer.
              </p>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting || !subjectSlug || !chapterSlug || !question.trim()}
              className="w-full py-4 bg-[#8B9A6B] text-white rounded-lg hover:bg-[#7a8a5a] transition-colors font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Publishing...
                </>
              ) : (
                <>
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  Publish Note
                </>
              )}
            </button>
          </div>

          {/* Success/Error Message */}
          {message && (
            <div
              className={`p-4 rounded-lg text-center ${
                message.type === "success"
                  ? "bg-[#8B9A6B]/10 border border-[#8B9A6B]/30 text-[#8B9A6B]"
                  : "bg-red-50 border border-red-200 text-red-600"
              }`}
            >
              {message.text}
            </div>
          )}
        </form>

        {/* Quick Stats */}
        <section className="mt-12 bg-[#8B9A6B]/10 border border-[#8B9A6B]/20 rounded-xl p-6">
          <h3 className="text-lg font-serif text-[#2c2c2c] mb-4">Current Database Stats</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-serif text-[#8B9A6B]">{subjectCatalog.length}</p>
              <p className="text-xs text-[#6b6b6b]">Subjects</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-serif text-[#8B9A6B]">
                {subjectCatalog.reduce((acc, s) => acc + s.chapters.length, 0)}
              </p>
              <p className="text-xs text-[#6b6b6b]">Chapters</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-serif text-[#8B9A6B]">
                {subjectCatalog.reduce(
                  (acc, s) =>
                    acc + s.chapters.reduce((cAcc, c) => cAcc + (c.longQuestions?.length || 0), 0),
                  0
                )}
              </p>
              <p className="text-xs text-[#6b6b6b]">Long Questions</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-serif text-[#8B9A6B]">
                {subjectCatalog.reduce(
                  (acc, s) =>
                    acc + s.chapters.reduce((cAcc, c) => cAcc + (c.mcqs?.length || 0), 0),
                  0
                )}
              </p>
              <p className="text-xs text-[#6b6b6b]">MCQs</p>
            </div>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
