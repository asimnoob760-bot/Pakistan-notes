import contentJson from "@/data/content.json";

export type FileResource = {
  id: string;
  title: string;
  provider: "pdf" | "google-drive";
  viewUrl: string;
  downloadUrl: string;
  note?: string;
};

export type SectionId =
  | "long-questions"
  | "short-questions-mnemonics"
  | "paper-presentation-tips";

export type SectionContent = {
  id: SectionId;
  title: string;
  placeholder: string;
  files: FileResource[];
  externalLinks: FileResource[];
};

export type ChapterContent = {
  slug: string;
  name: string;
  description: string;
  sections: SectionContent[];
};

export type SubjectContent = {
  slug: string;
  name: string;
  classLevels: string[];
  chapters: ChapterContent[];
};

type ContentFileShape = {
  subjects: SubjectContent[];
};

const contentData = contentJson as ContentFileShape;

export const subjectCatalog = contentData.subjects;

export function getSubject(subjectSlug: string) {
  return subjectCatalog.find((subject) => subject.slug === subjectSlug);
}

export function getChapter(subjectSlug: string, chapterSlug: string) {
  const subject = getSubject(subjectSlug);
  return subject?.chapters.find((chapter) => chapter.slug === chapterSlug);
}

export type SearchDocument = {
  title: string;
  snippet: string;
  href: string;
  subject: string;
  chapter: string;
  type: string;
};

export function buildSearchDocuments(): SearchDocument[] {
  const docs: SearchDocument[] = [];
  for (const subject of subjectCatalog) {
    for (const chapter of subject.chapters) {
      const href = `/subject/${subject.slug}/${chapter.slug}`;
      docs.push({
        title: `${subject.name} / ${chapter.name}`,
        snippet: chapter.description,
        href,
        subject: subject.name,
        chapter: chapter.name,
        type: "Chapter",
      });
      for (const section of chapter.sections) {
        docs.push({
          title: `${chapter.name}: ${section.title}`,
          snippet: section.placeholder,
          href,
          subject: subject.name,
          chapter: chapter.name,
          type: "Section",
        });
      }
    }
  }
  return docs;
}
