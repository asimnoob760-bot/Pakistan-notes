import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src/data/content-punjab-board.json");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { subjectSlug, chapterSlug, contentType, content } = body;

    // Read current data
    const fileData = fs.readFileSync(filePath, "utf-8");
    const json = JSON.parse(fileData);

    // Find subject
    const subject = json.subjects.find((s: any) => s.slug === subjectSlug);
    if (!subject) {
      return NextResponse.json(
        { success: false, error: "Subject not found" },
        { status: 404 }
      );
    }

    // Find chapter
    const chapter = subject.chapters.find((c: any) => c.slug === chapterSlug);
    if (!chapter) {
      return NextResponse.json(
        { success: false, error: "Chapter not found" },
        { status: 404 }
      );
    }

    // Initialize arrays if they don't exist
    if (!chapter.longQuestions) chapter.longQuestions = [];
    if (!chapter.shortQuestions) chapter.shortQuestions = [];
    if (!chapter.mcqs) chapter.mcqs = [];

    // Add content based on type
    switch (contentType) {
      case "long-question":
        chapter.longQuestions.push({
          id: `${subjectSlug}-${chapterSlug}-lq${chapter.longQuestions.length + 1}`,
          question: content.question,
          marks: content.marks || 10
        });
        break;

      case "short-question":
        chapter.shortQuestions.push({
          id: `${subjectSlug}-${chapterSlug}-sq${chapter.shortQuestions.length + 1}`,
          question: content.question,
          answer: content.answer || "",
          imageUrls: content.imageUrls || []
        });
        break;

      case "mcq":
        chapter.mcqs.push({
          id: `${subjectSlug}-${chapterSlug}-mcq${chapter.mcqs.length + 1}`,
          question: content.question,
          options: content.options || ["Option A", "Option B", "Option C", "Option D"],
          correctAnswer: content.correctAnswer || 0
        });
        break;

      default:
        return NextResponse.json(
          { success: false, error: "Invalid content type" },
          { status: 400 }
        );
    }

    // Write back to file
    fs.writeFileSync(filePath, JSON.stringify(json, null, 2));

    return NextResponse.json({ success: true, message: "Content added successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
