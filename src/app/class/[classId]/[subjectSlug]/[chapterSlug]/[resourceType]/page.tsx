import { redirect } from "next/navigation";

type ResourceType =
  | "top-questions"
  | "long-questions"
  | "mnemonics"
  | "paper-presentation"
  | "timing-strategy"
  | "quick-revision";

type ResourcePageProps = {
  params: Promise<{
    classId: string;
    subjectSlug: string;
    chapterSlug: string;
    resourceType: ResourceType;
  }>;
};

const validResources: ResourceType[] = [
  "top-questions",
  "long-questions",
  "mnemonics",
  "paper-presentation",
  "timing-strategy",
  "quick-revision",
];

export default async function ResourcePage({ params }: ResourcePageProps) {
  const { subjectSlug, chapterSlug, resourceType } = await params;
  if (!validResources.includes(resourceType)) {
    redirect(`/subject/${subjectSlug}/${chapterSlug}`);
  }
  const sectionAnchor =
    resourceType === "long-questions"
      ? "long-questions"
      : resourceType === "mnemonics" || resourceType === "top-questions"
        ? "short-questions-mnemonics"
        : "paper-presentation-tips";
  redirect(`/subject/${subjectSlug}/${chapterSlug}#${sectionAnchor}`);
}
