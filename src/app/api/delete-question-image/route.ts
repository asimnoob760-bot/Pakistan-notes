import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "src/data/content-punjab-board.json");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { subjectSlug, chapterSlug, questionId, imageIndex } = body;

    if (!subjectSlug || !chapterSlug || !questionId || typeof imageIndex !== "number") {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Read current data
    const fileData = fs.readFileSync(dataFilePath, "utf-8");
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

    // Find question
    const question = chapter.longQuestions?.find((q: any) => q.id === questionId);
    if (!question) {
      return NextResponse.json(
        { success: false, error: "Question not found" },
        { status: 404 }
      );
    }

    // Check if image exists at the specified index
    if (!question.imageUrls || imageIndex < 0 || imageIndex >= question.imageUrls.length) {
      return NextResponse.json(
        { success: false, error: "Image not found at specified index" },
        { status: 404 }
      );
    }

    // Remove image from array
    const deletedUrl = question.imageUrls[imageIndex];
    question.imageUrls.splice(imageIndex, 1);

    // Update legacy imageUrl field if needed
    if (question.imageUrls.length === 0) {
      // No images left, clean up
      delete question.imageUrls;
      delete question.imageUrl;
    } else if (question.imageUrl === deletedUrl) {
      // Update legacy field to point to first remaining image
      question.imageUrl = question.imageUrls[0];
    }

    // Write back to JSON file
    fs.writeFileSync(dataFilePath, JSON.stringify(json, null, 2));

    return NextResponse.json({
      success: true,
      message: "Image deleted successfully",
      deletedUrl,
    });
  } catch (err) {
    console.error("Delete error:", err);
    return NextResponse.json(
      { success: false, error: "Server error during deletion" },
      { status: 500 }
    );
  }
}
