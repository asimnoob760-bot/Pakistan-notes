import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "src/data/content-punjab-board.json");

// ImgBB API Configuration
const IMGBB_API_KEY = "faab013e9d85d75a099ab95e0d5ec384";
const IMGBB_UPLOAD_URL = "https://api.imgbb.com/1/upload";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    
    const file = formData.get("file") as File;
    const subjectSlug = formData.get("subjectSlug") as string;
    const chapterSlug = formData.get("chapterSlug") as string;
    const questionId = formData.get("questionId") as string;

    if (!file || !subjectSlug || !chapterSlug || !questionId) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { success: false, error: "File must be an image" },
        { status: 400 }
      );
    }

    // Validate file size (ImgBB free tier limit is ~32MB, but we'll keep 5MB for safety)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: "File size must be less than 5MB" },
        { status: 400 }
      );
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString("base64");

    // Upload to ImgBB
    const imgbbFormData = new FormData();
    imgbbFormData.append("key", IMGBB_API_KEY);
    imgbbFormData.append("image", base64Image);
    imgbbFormData.append("expiration", "0"); // 0 = never expire
    imgbbFormData.append("name", `${subjectSlug}-${chapterSlug}-${questionId}-${Date.now()}`);

    const imgbbResponse = await fetch(IMGBB_UPLOAD_URL, {
      method: "POST",
      body: imgbbFormData,
    });

    const imgbbData = await imgbbResponse.json();

    if (!imgbbData.success) {
      console.error("ImgBB upload failed:", imgbbData);
      return NextResponse.json(
        { success: false, error: imgbbData.error?.message || "Failed to upload to ImgBB" },
        { status: 500 }
      );
    }

    // Get the direct image URL from ImgBB response
    // Prefer the direct URL over the display URL
    const imageUrl = imgbbData.data.url;

    // Update JSON data
    const fileData = fs.readFileSync(dataFilePath, "utf-8");
    const json = JSON.parse(fileData);

    const subject = json.subjects.find((s: any) => s.slug === subjectSlug);
    if (!subject) {
      return NextResponse.json(
        { success: false, error: "Subject not found" },
        { status: 404 }
      );
    }

    const chapter = subject.chapters.find((c: any) => c.slug === chapterSlug);
    if (!chapter) {
      return NextResponse.json(
        { success: false, error: "Chapter not found" },
        { status: 404 }
      );
    }

    const question = chapter.longQuestions?.find((q: any) => q.id === questionId);
    if (!question) {
      return NextResponse.json(
        { success: false, error: "Question not found" },
        { status: 404 }
      );
    }

    // Add imageUrl to question (support both legacy single image and new multi-image array)
    if (!question.imageUrls) {
      question.imageUrls = [];
    }
    question.imageUrls.push(imageUrl);
    
    // Also update legacy field for backward compatibility
    question.imageUrl = imageUrl;

    // Write back to JSON file
    fs.writeFileSync(dataFilePath, JSON.stringify(json, null, 2));

    return NextResponse.json({
      success: true,
      imageUrl,
      message: "Image uploaded and saved successfully",
    });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { success: false, error: "Server error during upload" },
      { status: 500 }
    );
  }
}
