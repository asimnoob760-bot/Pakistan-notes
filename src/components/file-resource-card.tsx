import Link from "next/link";
import type { FileResource } from "@/lib/data";

type FileResourceCardProps = {
  resource: FileResource;
};

export function FileResourceCard({ resource }: FileResourceCardProps) {
  return (
    <article className="rounded-xl border border-[#e8e0d5] bg-[#FAF7F2] p-4 hover:border-[#8B9A6B] transition-colors">
      <div className="flex items-center gap-2 mb-2">
        <svg className="h-4 w-4 text-[#8B9A6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {resource.provider === "google-drive" ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          )}
        </svg>
        <p className="text-xs font-medium text-[#8B9A6B]">
          {resource.provider === "google-drive" ? "Google Drive" : "PDF"}
        </p>
      </div>
      <h4 className="text-sm font-medium text-[#2c2c2c]">{resource.title}</h4>
      {resource.note ? <p className="mt-1 text-xs text-[#6b6b6b]">{resource.note}</p> : null}
      <div className="mt-4 flex items-center gap-2">
        <Link
          href={resource.viewUrl}
          target="_blank"
          className="inline-flex rounded-lg border border-[#e8e0d5] px-3 py-1.5 text-xs font-medium text-[#6b6b6b] transition hover:border-[#8B9A6B] hover:text-[#8B9A6B]"
        >
          View
        </Link>
        <Link
          href={resource.downloadUrl}
          target="_blank"
          className="inline-flex rounded-lg bg-[#8B9A6B] px-3 py-1.5 text-xs font-medium text-white transition hover:bg-[#7a8a5a]"
        >
          Download
        </Link>
      </div>
    </article>
  );
}
