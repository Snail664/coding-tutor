import { handleAuth, handleCallback } from "@auth0/nextjs-auth0";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const afterCallback = async (req, session) => {
  // state param omitted from function signature
  const userFields = {
    auth0_sid: session.user.sid,
    auth0_sub: session.user.sub,
    auth0_given_name: session.user.given_name,
    auth0_family_name: session.user.family_name,
    auth0_name: session.user.name,
    auth0_picture: session.user.picture,
    auth0_email: session.user.email,
    auth0_email_verified: session.user.email_verified,
  };

  // create or update user in database
  try {
    await prisma.user.upsert({
      where: { auth0_sub: session.user.sub },
      update: userFields,
      create: userFields,
    });
    return session;
  } catch (error) {
    console.error("Error in afterCallback:", error);
    return session;
  }
};

export const GET = handleAuth({
  callback: async (req, res) => {
    try {
      return await handleCallback(req, res, { afterCallback });
    } catch (error) {
      console.error("Error in handleAuth callback:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
});
