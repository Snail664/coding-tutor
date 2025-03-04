import { getSession } from "@auth0/nextjs-auth0";
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

    // Update the session with the new walkthrough status
    session.user.isWalkthroughEnabled = user.isWalkthroughEnabled;
    
    // Create a new response with the updated session
    const response = new NextResponse(
      JSON.stringify({ isWalkthroughEnabled: user.isWalkthroughEnabled }), 
      { 
        status: 200,
        headers: {
          "Content-Type": "application/json",
        }
      }
    );

    // Set the session cookie
    response.cookies.set("appSession", JSON.stringify(session), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Error updating user walkthrough status", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
