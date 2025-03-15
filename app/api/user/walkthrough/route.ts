import { getSession, updateSession } from "@auth0/nextjs-auth0";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

interface WalkthroughRequestData {
  isWalkthroughEnabled: boolean;
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const data: WalkthroughRequestData = await req.json();
    console.log("req got: ", data);

    // Update the database
    const user = await prisma.user.update({
      where: {
        auth0_sub: session.user.sub,
      },
      data: {
        isWalkthroughEnabled: data.isWalkthroughEnabled,
      },
      select: {
        isWalkthroughEnabled: true,
      },
    });

    // Create a new response
    const response = NextResponse.json({ 
      isWalkthroughEnabled: user.isWalkthroughEnabled 
    });

    // Update the session
    await updateSession(req, response, {
      ...session,
      user: {
        ...session.user,
        isWalkthroughEnabled: user.isWalkthroughEnabled
      }
    });

    return response;
  } catch (error) {
    console.error("Error updating user walkthrough status", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
