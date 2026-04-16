import Link from "next/link";
import { SearchClient } from "@/components/search-client";
import { SiteShell } from "@/components/site-shell";
import { buildSearchDocuments } from "@/lib/data";

export default function SearchPage() {
  const documents = buildSearchDocuments();

  return (
    <SiteShell>
      {/* Header */}
      <section className="mb-8">
        <div className="flex items-center gap-2 text-sm text-[#6b6b6b] mb-4">
          <Link href="/" className="hover:text-[#8B9A6B] transition-colors">Home</Link>
          <span>/</span>
          <span>Search</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-serif text-[#2c2c2c] mb-3">
          Search
        </h1>
        <p className="text-lg text-[#6b6b6b] max-w-2xl">
          Find chapters, questions, and topics across all subjects.
        </p>
      </section>

      <section className="bg-[#FFFBF7] border border-[#e8e0d5] rounded-xl p-4 sm:p-6">
        <SearchClient documents={documents} />
      </section>
    </SiteShell>
  );
}
