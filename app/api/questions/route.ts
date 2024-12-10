import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const questions = await prisma.question.findMany({
      include: {
        templateCodes: true,
        testCases: true,
      },
    });

    const response = NextResponse.json(questions);
    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch (error) {
    console.error("Error fetching questions:", error);
    return NextResponse.json({ error: "Internal server error" });
  }
}
