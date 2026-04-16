import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site-shell";
import { getChapter, getSubject } from "@/lib/data";
import { ChapterContentClient } from "./chapter-content";

type ChapterPageProps = {
  params: Promise<{ subjectSlug: string; chapterSlug: string }>;
};

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { subjectSlug, chapterSlug } = await params;
  const subject = getSubject(subjectSlug);
  const chapter = getChapter(subjectSlug, chapterSlug);

  if (!subject || !chapter) {
    notFound();
  }

  return (
    <SiteShell>
      {/* Header with Breadcrumbs */}
      <section className="mb-8">
        <div className="flex items-center gap-2 text-sm text-[#6b6b6b] mb-4">
          <Link href="/" className="hover:text-[#8B9A6B] transition-colors">Home</Link>
          <span>/</span>
          <Link href={`/subject/${subjectSlug}`} className="hover:text-[#8B9A6B] transition-colors">{subject.name}</Link>
          <span>/</span>
          <span className="text-[#2c2c2c]">{chapter.name.split(":")[0]}</span>
        </div>
        <p className="text-sm text-[#8B9A6B] font-medium mb-2">{subject.name} - Class 11</p>
        <h1 className="text-3xl md:text-4xl font-serif text-[#2c2c2c] mb-3">
          {chapter.name.includes(":") ? chapter.name.split(":")[1].trim() : chapter.name}
        </h1>
        <p className="text-lg text-[#6b6b6b] max-w-2xl">{chapter.description}</p>
      </section>

      {/* Chapter Stats */}
      <section className="mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#FFFBF7] border border-[#e8e0d5] rounded-xl p-4 text-center">
            <p className="text-2xl font-serif text-[#8B9A6B]">{chapter.longQuestions?.length || 0}</p>
            <p className="text-xs text-[#6b6b6b]">Long Questions</p>
          </div>
          <div className="bg-[#FFFBF7] border border-[#e8e0d5] rounded-xl p-4 text-center">
            <p className="text-2xl font-serif text-[#B8A5A0]">{chapter.shortQuestions?.length || 0}</p>
            <p className="text-xs text-[#6b6b6b]">Short Questions</p>
          </div>
          <div className="bg-[#FFFBF7] border border-[#e8e0d5] rounded-xl p-4 text-center">
            <p className="text-2xl font-serif text-[#8B9A6B]">{chapter.mcqs?.length || 0}</p>
            <p className="text-xs text-[#6b6b6b]">MCQs</p>
          </div>
          <div className="bg-[#FFFBF7] border border-[#e8e0d5] rounded-xl p-4 text-center">
            <p className="text-2xl font-serif text-[#6b6b6b]">∞</p>
            <p className="text-xs text-[#6b6b6b]">Resources</p>
          </div>
        </div>
      </section>

      {/* Chapter Content with Tabs */}
      <ChapterContentClient 
        chapter={chapter} 
        subjectSlug={subjectSlug} 
        subjectName={subject.name} 
      />
    </SiteShell>
  );
}
