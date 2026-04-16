import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  const body = await req.json();

  const filePath = path.join(process.cwd(), "src/data/content.json");
  const fileData = fs.readFileSync(filePath, "utf-8");
  const json = JSON.parse(fileData);

  json.subjects.push({
    slug: body.slug,
    name: body.name,
    classLevels: body.classLevels || [],
    chapters: []
  });

  fs.writeFileSync(filePath, JSON.stringify(json, null, 2));

  return NextResponse.json({ success: true });
}