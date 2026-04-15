"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { SearchDocument } from "@/lib/data";

type SearchClientProps = {
  documents: SearchDocument[];
};

export function SearchClient({ documents }: SearchClientProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return documents.slice(0, 12);
    }

    return documents
      .filter((doc) => {
        const haystack = `${doc.title} ${doc.snippet} ${doc.subject} ${doc.chapter} ${doc.type}`.toLowerCase();
        return haystack.includes(normalized);
      })
      .slice(0, 24);
  }, [documents, query]);

  return (
    <div>
      <label htmlFor="search" className="text-sm font-medium text-slate-800">
        Search by chapter, question, mnemonic, or topic
      </label>
      <input
        id="search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400"
        placeholder="e.g. equations of motion"
      />

      <div className="mt-5 space-y-3">
        {filtered.length === 0 ? (
          <p className="text-sm text-slate-600">No matching study items found.</p>
        ) : (
          filtered.map((item) => (
            <Link
              href={item.href}
              key={`${item.href}-${item.snippet}`}
              className="block rounded-xl border border-slate-200 bg-white p-4 transition hover:border-slate-300"
            >
              <p className="text-xs uppercase tracking-wide text-slate-500">{item.type}</p>
              <h2 className="mt-1 text-sm font-semibold text-slate-900">{item.title}</h2>
              <p className="mt-1 text-sm text-slate-700">{item.snippet}</p>
              <p className="mt-2 text-xs text-slate-500">
                {item.subject} / {item.chapter}
              </p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
