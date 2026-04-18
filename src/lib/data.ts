import contentJson from "@/data/content-punjab-board.json";

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
  | "short-questions"
  | "mcqs"
  | "mnemonics"
  | "numericals"
  | "paper-presentation-tips";

export type MCQ = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
};

export type LongQuestion = {
  id: string;
  question: string;
  marks: number;
  imageUrl?: string; // Legacy support
  imageUrls?: string[]; // Multi-image support
};

export type ShortQuestion = {
  id: string;
  question: string;
  answer: string;
  imageUrls?: string[];
};

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
  longQuestions?: LongQuestion[];
  shortQuestions?: ShortQuestion[];
  shortQuestionsCombinedImage?: string;
  mcqs?: MCQ[];
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

export function getMCQs(subjectSlug: string, chapterSlug: string): MCQ[] {
  const chapter = getChapter(subjectSlug, chapterSlug);
  return chapter?.mcqs || [];
}

export function getLongQuestions(subjectSlug: string, chapterSlug: string): LongQuestion[] {
  const chapter = getChapter(subjectSlug, chapterSlug);
  return chapter?.longQuestions || [];
}

export function getLongQuestion(subjectSlug: string, chapterSlug: string, questionId: string): LongQuestion | undefined {
  const longQuestions = getLongQuestions(subjectSlug, chapterSlug);
  return longQuestions.find((lq) => lq.id === questionId);
}

export function getShortQuestions(subjectSlug: string, chapterSlug: string): ShortQuestion[] {
  const chapter = getChapter(subjectSlug, chapterSlug);
  return chapter?.shortQuestions || [];
}

export function getShortQuestion(subjectSlug: string, chapterSlug: string, questionId: string): ShortQuestion | undefined {
  const shortQuestions = getShortQuestions(subjectSlug, chapterSlug);
  return shortQuestions.find((sq) => sq.id === questionId);
}

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
      // Add long questions to search
      if (chapter.longQuestions) {
        for (const lq of chapter.longQuestions) {
          docs.push({
            title: lq.question,
            snippet: `${lq.marks} marks question - ${chapter.name}`,
            href,
            subject: subject.name,
            chapter: chapter.name,
            type: "Long Question",
          });
        }
      }
      // Add short questions to search
      if (chapter.shortQuestions) {
        for (const sq of chapter.shortQuestions) {
          docs.push({
            title: sq.question,
            snippet: `Short question - ${chapter.name}`,
            href,
            subject: subject.name,
            chapter: chapter.name,
            type: "Short Question",
          });
        }
      }
    }
  }
  return docs;
}
