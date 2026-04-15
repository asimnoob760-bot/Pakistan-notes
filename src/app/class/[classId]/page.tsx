import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { subjectCatalog } from "@/lib/data";

type ClassPageProps = {
  params: Promise<{ classId: string }>;
};

export default async function ClassPage({ params }: ClassPageProps) {
  const { classId } = await params;

  return (
    <SiteShell>
      <section className="rounded-3xl border border-slate-200/90 bg-white p-8 sm:p-10">
        <p className="text-sm text-slate-600">Class {classId}</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          Subject Selection
        </h1>
      </section>

      <section className="mt-6 grid gap-4 sm:grid-cols-2">
        {subjectCatalog.map((subject) => (
          <Link
            key={subject.slug}
            href={`/subject/${subject.slug}`}
            className="rounded-2xl border border-slate-200 bg-white p-5 transition duration-200 hover:border-slate-300"
          >
            <h2 className="text-lg font-semibold text-slate-900">{subject.name}</h2>
            <p className="mt-2 text-sm text-slate-600">{subject.chapters.length} chapters</p>
          </Link>
        ))}
      </section>
    </SiteShell>
  );
}
