import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const fs = await import("fs").then((m) => m.promises);
    const filePath = process.cwd() + "/messages.json";

    try {
      const data = await fs.readFile(filePath, "utf-8");
      const messages = JSON.parse(data);
      return NextResponse.json(messages);
    } catch {
      return NextResponse.json([]);
    }
  } catch (error) {
    console.error("Error reading messages:", error);
    return NextResponse.json(
      { error: "Failed to read messages" },
      { status: 500 }
    );
  }
}
