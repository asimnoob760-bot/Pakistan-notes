import type { ReactNode } from "react";

type SectionCardProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export function SectionCard({ title, description, children }: SectionCardProps) {
  return (
    <section className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-7">
      <h2 className="text-xl font-semibold tracking-tight text-slate-900">{title}</h2>
      {description ? <p className="mt-2 text-sm text-slate-600">{description}</p> : null}
      <div className="mt-6">{children}</div>
    </section>
  );
}
