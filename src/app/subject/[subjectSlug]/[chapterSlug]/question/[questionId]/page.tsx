import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site-shell";
import { getSubject, getChapter, getLongQuestion } from "@/lib/data";
import { QuestionDetailClient } from "./question-detail-client";

type QuestionPageProps = {
  params: Promise<{
    subjectSlug: string;
    chapterSlug: string;
    questionId: string;
  }>;
};

export default async function QuestionDetailPage({ params }: QuestionPageProps) {
  const { subjectSlug, chapterSlug, questionId } = await params;

  const subject = getSubject(subjectSlug);
  const chapter = getChapter(subjectSlug, chapterSlug);
  const question = getLongQuestion(subjectSlug, chapterSlug, questionId);

  if (!subject || !chapter || !question) {
    notFound();
  }

  return (
    <SiteShell>
      {/* Breadcrumbs */}
      <section className="mb-6">
        <div className="flex items-center gap-2 text-sm text-[#6b6b6b] flex-wrap">
          <Link href="/" className="hover:text-[#8B9A6B] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href={`/subject/${subjectSlug}`}
            className="hover:text-[#8B9A6B] transition-colors"
          >
            {subject.name}
          </Link>
          <span>/</span>
          <Link
            href={`/subject/${subjectSlug}/${chapterSlug}`}
            className="hover:text-[#8B9A6B] transition-colors"
          >
            {chapter.name.includes(":") ? chapter.name.split(":")[1].trim() : chapter.name}
          </Link>
          <span>/</span>
          <span className="text-[#2c2c2c]">Question {questionId.split("-").pop()?.replace(/\D/g, "") || ""}</span>
        </div>
      </section>

      {/* Question Header */}
      <section className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 bg-[#B8A5A0]/10 text-[#B8A5A0] rounded-full text-sm font-medium">
            {question.marks} marks
          </span>
          <span className="px-3 py-1 bg-[#8B9A6B]/10 text-[#8B9A6B] rounded-full text-sm font-medium">
            Long Question
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-serif text-[#2c2c2c] leading-relaxed">
          {question.question}
        </h1>
      </section>

      {/* Question Detail with Image */}
      <QuestionDetailClient
        question={question}
        subjectSlug={subjectSlug}
        chapterSlug={chapterSlug}
      />

      {/* Navigation Footer */}
      <section className="mt-12 pt-8 border-t border-[#e8e0d5]">
        <div className="flex items-center justify-between">
          <Link
            href={`/subject/${subjectSlug}/${chapterSlug}`}
            className="flex items-center gap-2 text-[#6b6b6b] hover:text-[#8B9A6B] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to All Questions
          </Link>
          <span className="text-sm text-[#6b6b6b]">
            {subject.name} • {chapter.name.split(":")[0]}
          </span>
        </div>
      </section>
    </SiteShell>
  );
}
