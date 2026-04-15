import { notFound } from "next/navigation";
import { getChapter, getSubject } from "@/lib/data";

type PrintPageProps = {
  params: Promise<{ subjectSlug: string; chapterSlug: string }>;
};

export default async function PrintSubjectChapterPage({ params }: PrintPageProps) {
  const { subjectSlug, chapterSlug } = await params;
  const subject = getSubject(subjectSlug);
  const chapter = getChapter(subjectSlug, chapterSlug);

  if (!subject || !chapter) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-4xl bg-white px-6 py-10 text-slate-900 print:px-0">
      <header className="border-b border-slate-200 pb-4">
        <p className="text-sm text-slate-600">{subject.name}</p>
        <h1 className="mt-1 text-2xl font-semibold">{chapter.name}</h1>
        <p className="mt-2 text-sm text-slate-600">{chapter.description}</p>
      </header>

      <div className="mt-6 space-y-5">
        {chapter.sections.map((section) => (
          <section key={section.id}>
            <h2 className="text-lg font-semibold">{section.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{section.placeholder}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
