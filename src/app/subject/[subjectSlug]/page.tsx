import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site-shell";
import { getSubject } from "@/lib/data";

type SubjectPageProps = {
  params: Promise<{ subjectSlug: string }>;
};

export default async function SubjectPage({ params }: SubjectPageProps) {
  const { subjectSlug } = await params;
  const subject = getSubject(subjectSlug);

  if (!subject) {
    notFound();
  }

  return (
    <SiteShell>
      <section className="rounded-3xl border border-slate-200/90 bg-white p-8 sm:p-10">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">{subject.name}</h1>
        <p className="mt-2 text-sm text-slate-600">
          Chapters for classes {subject.classLevels.join(", ")}.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        {subject.chapters.map((chapter, index) => (
          <Link
            key={chapter.slug}
            href={`/subject/${subject.slug}/${chapter.slug}`}
            className="flex items-center justify-between rounded-2xl border border-slate-200/90 bg-white px-5 py-4 transition duration-300 hover:border-slate-300"
          >
            <div>
              <p className="text-[11px] uppercase tracking-[0.08em] text-slate-500">
                Chapter {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-1 text-base font-semibold text-slate-900">{chapter.name}</h2>
            </div>
            <span className="text-xs text-slate-500">Open</span>
          </Link>
        ))}
      </section>
    </SiteShell>
  );
}
