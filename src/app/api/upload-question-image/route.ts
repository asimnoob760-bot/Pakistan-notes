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

    // Check if fetch succeeded
    if (!imgbbResponse.ok) {
      console.error("ImgBB HTTP error:", imgbbResponse.status, imgbbResponse.statusText);
      return NextResponse.json(
        { success: false, error: `ImgBB returned HTTP ${imgbbResponse.status}` },
        { status: 500 }
      );
    }

    const imgbbData = await imgbbResponse.json();
    console.log("ImgBB response:", JSON.stringify(imgbbData, null, 2));

    if (!imgbbData.success) {
      console.error("ImgBB upload failed:", imgbbData);
      return NextResponse.json(
        { success: false, error: imgbbData.error?.message || imgbbData.error?.code || "Failed to upload to ImgBB" },
        { status: 500 }
      );
    }

    // Get the direct image URL from ImgBB response
    // Try multiple possible URL fields
    const imageUrl = imgbbData.data?.url || imgbbData.data?.display_url || imgbbData.data?.image?.url;
    
    if (!imageUrl) {
      console.error("No URL found in ImgBB response:", imgbbData);
      return NextResponse.json(
        { success: false, error: "Invalid response from ImgBB - no image URL found" },
        { status: 500 }
      );
    }

    // Update JSON data - try to save, but return success even if local save fails
    let saveSuccess = false;
    let saveError = null;
    
    try {
      const fileData = fs.readFileSync(dataFilePath, "utf-8");
      const json = JSON.parse(fileData);

      const subject = json.subjects.find((s: any) => s.slug === subjectSlug);
      const chapter = subject?.chapters.find((c: any) => c.slug === chapterSlug);
      const question = chapter?.longQuestions?.find((q: any) => q.id === questionId);
      
      if (question) {
        // Add imageUrl to question (support both legacy single image and new multi-image array)
        if (!question.imageUrls) {
          question.imageUrls = [];
        }
        question.imageUrls.push(imageUrl);
        
        // Also update legacy field for backward compatibility
        question.imageUrl = imageUrl;

        // Write back to JSON file
        fs.writeFileSync(dataFilePath, JSON.stringify(json, null, 2));
        saveSuccess = true;
      } else {
        saveError = "Question not found in local data, but image was uploaded to ImgBB";
      }
    } catch (err) {
      console.error("Local save error:", err);
      saveError = "Failed to save to local database, but image was uploaded to ImgBB";
    }

    // Always return success if ImgBB upload worked - client can use the URL
    return NextResponse.json({
      success: true,
      imageUrl,
      message: saveSuccess 
        ? "Image uploaded and saved successfully" 
        : (saveError || "Image uploaded to ImgBB but not saved locally"),
      saved: saveSuccess,
      warning: saveError,
    });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { success: false, error: "Server error during upload" },
      { status: 500 }
    );
  }
}
