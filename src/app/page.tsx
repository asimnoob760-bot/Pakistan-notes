import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { subjectCatalog } from "@/lib/data";

export default function Home() {
  return (
    <SiteShell>
      <section className="rounded-3xl border border-slate-200/90 bg-white p-8 sm:p-10">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Subject Library
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
          Choose a subject to manage chapter sections, downloadable files, and Google Drive links.
        </p>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-2">
        {subjectCatalog.map((subject) => (
          <Link
            key={subject.slug}
            href={`/subject/${subject.slug}`}
            className="rounded-3xl border border-slate-200/90 bg-white p-6 transition duration-300 ease-out hover:-translate-y-0.5 hover:border-slate-300"
          >
            <h2 className="text-xl font-semibold tracking-tight text-slate-900">{subject.name}</h2>
            <p className="mt-2 text-sm text-slate-600">{subject.chapters.length} placeholder chapters</p>
            <p className="mt-1 text-xs text-slate-500">{subject.classLevels.join(" / ")}</p>
          </Link>
        ))}
      </section>
    </SiteShell>
  );
}
