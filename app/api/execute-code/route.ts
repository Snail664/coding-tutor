import axios from "axios";
import { NextResponse } from "next/server";

// Handle GET requests
export async function GET() {
  return NextResponse.json({
    message: "Post to this endpoint the code you want to run and the language",
  });
}

// Handle POST requests (if needed)
export async function POST(request: Request) {
  const data = await request.json();
  const pistonUrl = process.env.PISTON_API_URL || "http://localhost:2000";
  const pistonResponse = await axios.post(
    `${pistonUrl}/api/v2/execute`,
    {
      language: data["language"],
      version: data["version"],
      files: [{ name: "script", content: data["code"] }],
    },
    {
      headers: process.env.PISTON_API_KEY
        ? { Authorization: `Bearer ${process.env.PISTON_API_KEY}` }
        : {},
    }
  );

  return NextResponse.json(pistonResponse.data);
}
