import { redirect } from "next/navigation";

type SubjectPageProps = {
  params: Promise<{ classId: string; subjectSlug: string }>;
};

export default async function SubjectPage({ params }: SubjectPageProps) {
  const { subjectSlug } = await params;
  redirect(`/subject/${subjectSlug}`);
}
