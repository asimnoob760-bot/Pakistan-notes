import type { ReactNode } from "react";

type SectionCardProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export function SectionCard({ title, description, children }: SectionCardProps) {
  return (
    <section className="rounded-xl border border-[#e8e0d5] bg-[#FFFBF7] p-6 sm:p-7">
      <h2 className="text-xl font-serif text-[#2c2c2c]">{title}</h2>
      {description ? <p className="mt-2 text-sm text-[#6b6b6b]">{description}</p> : null}
      <div className="mt-6">{children}</div>
    </section>
  );
}
