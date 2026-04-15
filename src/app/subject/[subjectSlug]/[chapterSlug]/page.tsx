import Link from "next/link";
import { notFound } from "next/navigation";
import { FileResourceCard } from "@/components/file-resource-card";
import { SectionCard } from "@/components/section-card";
import { SiteShell } from "@/components/site-shell";
import { getChapter, getSubject } from "@/lib/data";

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
      <section className="rounded-3xl border border-slate-200/90 bg-white p-8 sm:p-10">
        <p className="text-sm text-slate-600">{subject.name}</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">{chapter.name}</h1>
        <p className="mt-3 max-w-2xl text-sm text-slate-600">{chapter.description}</p>
      </section>

      <div className="mt-8 grid gap-6 lg:grid-cols-[240px_1fr]">
        <aside className="h-fit rounded-3xl border border-slate-200/90 bg-white p-5 lg:sticky lg:top-24">
          <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-slate-500">Sections</p>
          <nav className="mt-3 space-y-2 text-sm text-slate-700">
            {chapter.sections.map((section) => (
              <a key={section.id} href={`#${section.id}`} className="block rounded-lg px-2 py-1 transition hover:bg-slate-100">
                {section.title}
              </a>
            ))}
          </nav>
          <Link
            href={`/print/subject/${subjectSlug}/${chapterSlug}`}
            className="mt-4 inline-flex rounded-lg border border-slate-300 px-3 py-1.5 text-xs text-slate-700 transition hover:border-slate-400"
          >
            Printable view
          </Link>
        </aside>

        <div className="space-y-6">
          {chapter.sections.map((section) => (
            <div key={section.id} id={section.id}>
              <SectionCard title={section.title} description={section.placeholder}>
                <div className="space-y-5">
                  <div>
                    <h3 className="text-sm font-medium text-slate-900">Downloadable Files (PDF)</h3>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      {section.files.map((item) => (
                        <FileResourceCard key={item.id} resource={item} />
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-slate-900">External Links (Google Drive)</h3>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      {section.externalLinks.map((item) => (
                        <FileResourceCard key={item.id} resource={item} />
                      ))}
                    </div>
                  </div>
                </div>
              </SectionCard>
            </div>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
