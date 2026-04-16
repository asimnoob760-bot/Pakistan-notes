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
      return NextResponse.json(
        { success: false, error: "Subject not found" },
        { status: 404 }
      );
    }

    subject.chapters.push({
      slug: body.slug,
      name: body.name,
      description: body.description || "",
      sections: []
    });

    fs.writeFileSync(filePath, JSON.stringify(json, null, 2));

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}