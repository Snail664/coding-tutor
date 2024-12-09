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
  console.log('coming: ', data)
  const pistonResponse = await axios.post("https://emkc.org/api/v2/piston/execute", {
      language: data["language"],
      version: data['version'],
      files: [{ name: "script", content: data["code"] }],
    });

  return NextResponse.json(pistonResponse.data);
}
