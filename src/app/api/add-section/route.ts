import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src/data/content.json");

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const fileData = fs.readFileSync(filePath, "utf-8");
    const json = JSON.parse(fileData);

    const subject = json.subjects.find(
      (s: any) => s.slug === body.subjectSlug
    );

    if (!subject) {
      return NextResponse.json({ success: false, error: "Subject not found" }, { status: 404 });
    }

    const chapter = subject.chapters.find(
      (c: any) => c.slug === body.chapterSlug
    );

    if (!chapter) {
      return NextResponse.json({ success: false, error: "Chapter not found" }, { status: 404 });
    }

    chapter.sections.push({
      id: body.sectionId,
      title: body.title,
      placeholder: body.placeholder || "",
      files: body.files || [],
      externalLinks: body.externalLinks || []
    });

    fs.writeFileSync(filePath, JSON.stringify(json, null, 2));

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}