import { redirect } from "next/navigation";

type ChapterPageProps = {
  params: Promise<{ classId: string; subjectSlug: string; chapterSlug: string }>;
};

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { subjectSlug, chapterSlug } = await params;
  redirect(`/subject/${subjectSlug}/${chapterSlug}`);
}
