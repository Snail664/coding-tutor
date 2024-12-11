import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { authMiddleware } from "@/app/middleware/auth";

/**
 * Handles POST requests to add messages to an existing chat.
 *
 * Request Body:
 * - chatId: ID of the existing chat to update.
 * - messages: Array of message objects, each containing a role and content.
 *
 * Response:
 * - Returns the updated chat object in JSON format.
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
    const { chatId, messages } = await request.json();
    console.log("api data: ", chatId, messages);

    // Validate the presence of required fields
    if (!chatId || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Invalid input data" },
        { status: 400 }
      );
    }

    // Verify chat ownership
    const chat = await prisma.chat.findUnique({
      where: { id: chatId },
      select: { userId: true },
    });

    if (!chat || chat.userId !== session.user.sid) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Insert a message into an existing chat
    const updatedChat = await prisma.chat.update({
      where: { id: chatId },
      data: {
        messages: {
          create: messages.map((msg: { role: string; content: string }) => ({
            role: msg.role,
            content: msg.content,
          })),
        },
      },
    });

    return NextResponse.json(updatedChat);
  } catch (error) {
    console.error("Error adding message to chat:", error);
    return NextResponse.json({ error: "Internal server error" });
  }
}
