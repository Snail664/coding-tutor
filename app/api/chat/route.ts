import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { userId, messages } = await request.json();

    // Create a new chat entry
    const chat = await prisma.chat.create({
      data: {
        userId,
        messages: {
          create: messages.map((msg: { role: string; content: string }) => ({
            role: msg.role,
            content: msg.content,
          })),
        },
      },
    });

    return NextResponse.json(chat);
  } catch (error) {
    console.error("Error saving chat history:", error);
    return NextResponse.json({ error: "Internal server error" });
  }
}
