import { getSession } from "@auth0/nextjs-auth0";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface WalkthroughRequestData {
  isWalkthroughEnabled: boolean;
}

export async function POST(req: Request) {
  const session = await getSession();
  const user = session?.user;
  const data: WalkthroughRequestData = await req.json();

  console.log("req got: ", data);

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    await prisma.user.update({
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

    // update session with new walkthrough status
    session.user.isWalkthroughEnabled = data.isWalkthroughEnabled;
    return new Response("Walkthrough status updated", { status: 200 });
  } catch (error) {
    console.error("Error updating user walkthrough status", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
