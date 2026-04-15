import { redirect } from "next/navigation";

type PrintPageProps = {
  params: Promise<{ classId: string; subjectSlug: string; chapterSlug: string }>;
};

export default async function PrintPage({ params }: PrintPageProps) {
  const { subjectSlug, chapterSlug } = await params;
  redirect(`/print/subject/${subjectSlug}/${chapterSlug}`);
}
