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
      <label htmlFor="search" className="text-sm font-medium text-[#2c2c2c]">
        Search by chapter, question, mnemonic, or topic
      </label>
      <input
        id="search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className="mt-2 w-full rounded-lg border border-[#e8e0d5] bg-[#FAF7F2] px-4 py-2 text-sm text-[#2c2c2c] outline-none transition focus:border-[#8B9A6B]"
        placeholder="e.g. equations of motion"
      />

      <div className="mt-5 space-y-3">
        {filtered.length === 0 ? (
          <p className="text-sm text-[#6b6b6b]">No matching study items found.</p>
        ) : (
          filtered.map((item) => (
            <Link
              href={item.href}
              key={`${item.href}-${item.snippet}`}
              className="block rounded-xl border border-[#e8e0d5] bg-[#FAF7F2] p-4 transition hover:border-[#8B9A6B]"
            >
              <p className="text-xs uppercase tracking-wide text-[#8B9A6B] font-medium">{item.type}</p>
              <h2 className="mt-1 text-sm font-medium text-[#2c2c2c]">{item.title}</h2>
              <p className="mt-1 text-sm text-[#6b6b6b]">{item.snippet}</p>
              <p className="mt-2 text-xs text-[#6b6b6b]">
                {item.subject} / {item.chapter}
              </p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
