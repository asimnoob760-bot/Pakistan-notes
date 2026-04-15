import Link from "next/link";
import type { FileResource } from "@/lib/data";

type FileResourceCardProps = {
  resource: FileResource;
};

export function FileResourceCard({ resource }: FileResourceCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4">
      <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-slate-500">
        {resource.provider === "google-drive" ? "Google Drive" : "PDF"}
      </p>
      <h4 className="mt-1 text-sm font-semibold text-slate-900">{resource.title}</h4>
      {resource.note ? <p className="mt-1 text-xs text-slate-600">{resource.note}</p> : null}
      <div className="mt-4 flex items-center gap-2">
        <Link
          href={resource.viewUrl}
          target="_blank"
          className="inline-flex rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-slate-400"
        >
          View
        </Link>
        <Link
          href={resource.downloadUrl}
          target="_blank"
          className="inline-flex rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-slate-700"
        >
          Download
        </Link>
      </div>
    </article>
  );
}
