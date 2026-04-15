import { SearchClient } from "@/components/search-client";
import { SiteShell } from "@/components/site-shell";
import { buildSearchDocuments } from "@/lib/data";

export default function SearchPage() {
  const documents = buildSearchDocuments();

  return (
    <SiteShell>
      <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          Search chapters and questions
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Find important questions and quick revision points without browsing every chapter.
        </p>
      </section>

      <section className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-6">
        <SearchClient documents={documents} />
      </section>
    </SiteShell>
  );
}
