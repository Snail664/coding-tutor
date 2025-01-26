import { getSession } from "@auth0/nextjs-auth0";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  const session = await getSession();
  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { auth0_sub: session.user.sub },
      select: {
        auth0_sub: true,
        auth0_sid: true,
        auth0_name: true,
        auth0_email: true,
        auth0_picture: true,
        isWalkthroughEnabled: true,
        // Add other fields you need
      },
    });

    return new Response(JSON.stringify(user), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
