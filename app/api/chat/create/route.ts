import { NextResponse } from "next/server";
import { authMiddleware } from "@/app/middleware/auth";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/**
 * Handles POST requests to create a new chat.
 *
 * Request Body:
 * - messages: Array of message objects, each containing a role and content.
 *
 * Response:
 * - Returns the created chat object in JSON format.
 */
export async function POST(request: Request) {
  const { error, response, session } = await authMiddleware();
  if (error) return response;

  if (!session) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }

  try {
    const { messages } = await request.json();

    // Validate the presence of required fields
    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Invalid input data" },
        { status: 400 }
      );
    }

    // Create a new chat entry
    const chat = await prisma.chat.create({
      data: {
        userId: session.user.sub,
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
    console.error("Error creating chat:", error);
    return NextResponse.json({ error: "Internal server error" });
  }
}
