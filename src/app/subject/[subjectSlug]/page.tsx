import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site-shell";
import { getSubject } from "@/lib/data";
import { SubjectPageClient } from "./subject-page-client";

type SubjectPageProps = {
  params: Promise<{ subjectSlug: string }>;
};

export default async function SubjectPage({ params }: SubjectPageProps) {
  const { subjectSlug } = await params;
  const subject = getSubject(subjectSlug);

  if (!subject) {
    notFound();
  }

  return <SubjectPageClient subject={subject} />;
}
